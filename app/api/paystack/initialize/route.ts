import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { applicationId } = await req.json();

        if (!applicationId) {
            return NextResponse.json(
                { ok: false, error: "Application ID is required" },
                { status: 400 }
            );
        }

        const application = await prisma.membershipApplication.findUnique({
            where: { id: applicationId },
            include: { category: true },
        });

        if (!application || !application.category) {
            return NextResponse.json(
                { ok: false, error: "Application or category not found" },
                { status: 404 }
            );
        }

        if (!application.email) {
            return NextResponse.json(
                { ok: false, error: "Applicant email is required" },
                { status: 400 }
            );
        }

        const amount = Math.round(application.category.annualFee * 100);

        const res = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: application.email,
                amount,
                currency: "KES",
                callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/apply/payment/callback`,
                metadata: {
                    applicationId: application.id,
                    fullName: application.fullName,
                    category: application.category.name,
                },
            }),
        });

        const data = await res.json();

        if (!res.ok || !data.status) {
            return NextResponse.json(
                {
                    ok: false,
                    error: data.message || "Failed to initialize payment",
                },
                { status: 400 }
            );
        }

        await prisma.membershipApplication.update({
            where: { id: application.id },
            data: {
                paymentReference: data.data.reference,
                paymentStatus: "PENDING",
            },
        });

        return NextResponse.json({
            ok: true,
            authorizationUrl: data.data.authorization_url,
            reference: data.data.reference,
        });
    } catch (error) {
        console.error("PAYSTACK_INIT_ERROR", error);

        return NextResponse.json(
            { ok: false, error: "Failed to initialize payment" },
            { status: 500 }
        );
    }
}
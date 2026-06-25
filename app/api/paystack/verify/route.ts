import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const reference = searchParams.get("reference");

        if (!reference) {
            return NextResponse.json(
                { ok: false, error: "Missing payment reference" },
                { status: 400 }
            );
        }

        const secretKey = process.env.PAYSTACK_SECRET_KEY;

        if (!secretKey) {
            return NextResponse.json(
                { ok: false, error: "Paystack secret key missing" },
                { status: 500 }
            );
        }

        const verifyRes = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${secretKey}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        const paystackData = await verifyRes.json();

        if (!verifyRes.ok || !paystackData.status) {
            return NextResponse.json(
                { ok: false, error: "Payment verification failed" },
                { status: 400 }
            );
        }

        if (paystackData.data.status !== "success") {
            return NextResponse.json(
                {
                    ok: false,
                    error: "Payment was not successful",
                    paymentStatus: paystackData.data.status,
                },
                { status: 400 }
            );
        }

        const application = await prisma.membershipApplication.findFirst({
            where: {
                paymentReference: reference,
            },
            include: {
                category: true,
            },
        });

        if (!application) {
            return NextResponse.json(
                { ok: false, error: "Application not found" },
                { status: 404 }
            );
        }

        const updatedApplication = await prisma.membershipApplication.update({
            where: {
                id: application.id,
            },
            data: {
                paymentStatus: "PAID",
                status: "PENDING",
            },
            include: {
                category: true,
            },
        });

        return NextResponse.json({
            ok: true,
            application: updatedApplication,
            reference,
        });
    } catch (error) {
        console.error("PAYSTACK_VERIFY_ERROR", error);

        return NextResponse.json(
            { ok: false, error: "Failed to verify payment" },
            { status: 500 }
        );
    }
}
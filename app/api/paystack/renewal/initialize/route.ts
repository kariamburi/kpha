import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { memberId } = await req.json();

        if (!memberId) {
            return NextResponse.json(
                { ok: false, error: "Member ID is required" },
                { status: 400 }
            );
        }

        const member = await prisma.member.findUnique({
            where: { id: memberId },
            include: { category: true },
        });

        if (!member) {
            return NextResponse.json(
                { ok: false, error: "Member not found" },
                { status: 404 }
            );
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const secretKey = process.env.PAYSTACK_SECRET_KEY;

        if (!secretKey) {
            return NextResponse.json(
                { ok: false, error: "Paystack secret key missing" },
                { status: 500 }
            );
        }

        const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: member.email,
                amount: Math.round(member.category.annualFee * 100),
                callback_url: `${appUrl}/member/renewal/callback`,
                metadata: {
                    memberId: member.id,
                    type: "MEMBERSHIP_RENEWAL",
                },
            }),
        });

        const data = await paystackRes.json();

        if (!paystackRes.ok || !data.status) {
            return NextResponse.json(
                { ok: false, error: data.message || "Failed to initialize renewal payment" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            ok: true,
            authorizationUrl: data.data.authorization_url,
            reference: data.data.reference,
        });
    } catch (error) {
        console.error("RENEWAL_INITIALIZE_ERROR", error);

        return NextResponse.json(
            { ok: false, error: "Failed to initialize renewal payment" },
            { status: 500 }
        );
    }
}
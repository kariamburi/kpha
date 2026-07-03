import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, verifyToken } from "@/lib/jwt";
import { canAccessDashboard } from "@/lib/roles";

type PendingOtpToken = {
    id: string; // member id
    userId?: string; // temporary old AdminLoginOtp link
    email: string;
    role: string;
    purpose?: string;
};

function hashOtp(otp: string) {
    return crypto.createHash("sha256").update(otp).digest("hex");
}

export async function POST(req: Request) {
    try {
        const { otp } = await req.json();
        const cleanOtp = String(otp || "").trim();

        if (!/^\d{6}$/.test(cleanOtp)) {
            return NextResponse.json(
                { ok: false, error: "Enter a valid 6-digit OTP" },
                { status: 400 }
            );
        }

        const cookieStore = await cookies();
        const pendingToken = cookieStore.get("ahpk_admin_otp_token")?.value;

        if (!pendingToken) {
            return NextResponse.json(
                { ok: false, error: "OTP session expired. Login again." },
                { status: 401 }
            );
        }

        const payload = verifyToken<PendingOtpToken>(pendingToken);

        if (!payload?.id || payload.purpose !== "ADMIN_OTP") {
            return NextResponse.json(
                { ok: false, error: "Invalid OTP session. Login again." },
                { status: 401 }
            );
        }

        const member = await prisma.member.findUnique({
            where: { id: payload.id },
        });

        if (
            !member ||
            member.adminStatus !== "ACTIVE" ||
            !member.adminRole ||
            !canAccessDashboard(member.adminRole)
        ) {
            return NextResponse.json(
                { ok: false, error: "Account cannot access admin portal." },
                { status: 403 }
            );
        }

        if (!member.userId) {
            return NextResponse.json(
                { ok: false, error: "OTP record is not linked. Login again." },
                { status: 401 }
            );
        }

        const loginOtp = await prisma.adminLoginOtp.findFirst({
            where: {
                userId: member.userId,
                email: member.email || payload.email,
                used: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (!loginOtp || loginOtp.otpHash !== hashOtp(cleanOtp)) {
            return NextResponse.json(
                { ok: false, error: "Invalid or expired OTP" },
                { status: 401 }
            );
        }

        await prisma.adminLoginOtp.update({
            where: { id: loginOtp.id },
            data: { used: true },
        });

        const token = signToken({
            id: member.id,
            email: member.email,
            role: member.adminRole,
        });

        const res = NextResponse.json({
            ok: true,
            user: {
                id: member.id,
                name: member.fullName,
                email: member.email,
                role: member.adminRole,
                status: member.adminStatus,
            },
        });

        res.cookies.set("ahpk_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        res.cookies.set("ahpk_admin_otp_token", "", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 0,
        });

        return res;
    } catch (error) {
        console.error("VERIFY_ADMIN_OTP_ERROR", error);

        return NextResponse.json(
            { ok: false, error: "Something went wrong" },
            { status: 500 }
        );
    }
}
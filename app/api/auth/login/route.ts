import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signToken } from "@/lib/jwt";
import { canAccessDashboard } from "@/lib/roles";
import { sendMail } from "@/lib/mail";

function generateOtp() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function hashOtp(otp: string) {
    return crypto.createHash("sha256").update(otp).digest("hex");
}

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const normalizedEmail = String(email || "").trim().toLowerCase();

        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (!user) {
            return NextResponse.json(
                { ok: false, error: "Invalid email or password" },
                { status: 401 }
            );
        }

        if (user.status !== "ACTIVE") {
            return NextResponse.json(
                { ok: false, error: "Your account is disabled. Contact Super Admin." },
                { status: 403 }
            );
        }

        if (!canAccessDashboard(user.role)) {
            return NextResponse.json(
                { ok: false, error: "This account cannot access the admin portal." },
                { status: 403 }
            );
        }

        const validPassword = await verifyPassword(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { ok: false, error: "Invalid email or password" },
                { status: 401 }
            );
        }

        console.log("LOGIN_USER", {
            email: user.email,
            role: user.role,
            status: user.status,
        });

        const settings = await prisma.systemSetting.upsert({
            where: { id: "main" },
            update: {},
            create: { id: "main" },
        });

        if (settings.adminOtpEnabled) {
            const otp = generateOtp();

            await prisma.adminLoginOtp.updateMany({
                where: {
                    userId: user.id,
                    used: false,
                },
                data: {
                    used: true,
                },
            });

            await prisma.adminLoginOtp.create({
                data: {
                    userId: user.id,
                    email: user.email,
                    otpHash: hashOtp(otp),
                    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                },
            });

            const pendingToken = signToken({
                id: user.id,
                email: user.email,
                role: user.role,
                purpose: "ADMIN_OTP",
            } as any);

            const res = NextResponse.json({
                ok: true,
                requiresOtp: true,
                message: "OTP sent to your email.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                },
            });

            res.cookies.delete("ahpk_token");
            res.cookies.delete("ahpk_admin_otp_token");

            res.cookies.set("ahpk_admin_otp_token", pendingToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 60 * 10,
            });

            await sendMail({
                to: user.email,
                subject: "AHPK Admin Login OTP",
                html: `
                    <div style="font-family:Arial,sans-serif;line-height:1.6">
                        <h2>AHPK Admin Login Verification</h2>
                        <p>Your login OTP is:</p>
                        <p style="font-size:28px;font-weight:800;letter-spacing:6px;color:#C1121F">${otp}</p>
                        <p>This code expires in 10 minutes.</p>
                        <p>If you did not try to login, ignore this email.</p>
                    </div>
                `,
            });

            return res;
        }

        const token = signToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        const res = NextResponse.json({
            ok: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
            },
        });

        res.cookies.delete("ahpk_token");
        res.cookies.delete("ahpk_admin_otp_token");

        res.cookies.set("ahpk_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return res;
    } catch (error) {
        console.error("LOGIN_ERROR", error);

        return NextResponse.json(
            { ok: false, error: "Something went wrong" },
            { status: 500 }
        );
    }
}
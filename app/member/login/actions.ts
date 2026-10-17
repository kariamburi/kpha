"use server";

import { randomInt } from "node:crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { signToken } from "@/lib/jwt";
import { setMemberSession } from "../session";

function generateOtp(): string {
    return String(randomInt(100000, 1000000));
}

function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60_000);
}

export async function sendMemberLoginOtp(formData: FormData) {
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const idNumber = String(formData.get("idNumber") || "").trim();

    if (!email || !idNumber) {
        redirect("/member/login?error=invalid");
    }

    // Eligibility relies on an approved application with matching identity.
    // Old payment-status and consent flags are not login requirements.
    const application = await prisma.membershipApplication.findFirst({
        where: {
            email: { equals: email, mode: "insensitive" },
            idNumber: { equals: idNumber },
            status: "APPROVED",
        },
        orderBy: { createdAt: "desc" },
    });

    if (!application) {
        redirect("/member/login?error=invalid");
    }

    // Current membership category may legitimately differ from the
    // applicant's original category. Don't reject on category mismatch.
    const member = await prisma.member.findFirst({
        where: { email: { equals: email, mode: "insensitive" } },
        orderBy: { createdAt: "desc" },
    });

    if (!member?.email) {
        redirect("/member/login?error=not-found");
    }

    const otp = generateOtp();

    await prisma.memberLoginOtp.create({
        data: {
            memberId: member.id,
            email: member.email,
            otp,
            expiresAt: addMinutes(new Date(), 10),
        },
    });

    // Keep the existing deployment flag behavior. Never expose OTP in the UI.
    if (process.env.DISABLE_MEMBER_EMAIL_OTP === "true") {
        // In non-email mode, retrieve the code securely from server logs.
        // Do not enable this option for public production access.
        console.log("AHPK MEMBER LOGIN OTP:", otp);
    } else {
        await sendMail({
            to: member.email,
            subject: "AHPK Member Portal Login Code",
            html: `
              <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
                <h2 style="color:#C1121F;">AHPK Member Portal Login Code</h2>
                <p>Dear ${escapeHtml(member.fullName || "Member")},</p>
                <p>Your login verification code is:</p>
                <div style="font-size:30px;font-weight:900;letter-spacing:6px;color:#C1121F;margin:20px 0;">${otp}</div>
                <p>This code expires in 10 minutes.</p>
                <p>Regards,<br/>AHPK Secretariat</p>
              </div>
            `,
        });
    }

    redirect(
        `/member/login/verify?memberId=${encodeURIComponent(member.id)}&email=${encodeURIComponent(member.email)}`,
    );
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (char) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[char] || char);
}

export async function verifyMemberLoginOtp(formData: FormData) {
    const memberId = String(formData.get("memberId") || "").trim();
    const otp = String(formData.get("otp") || "").trim();

    if (!memberId || !/^\d{6}$/.test(otp)) {
        redirect("/member/login?error=invalid");
    }

    const record = await prisma.memberLoginOtp.findFirst({
        where: {
            memberId,
            otp,
            used: false,
            expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: "desc" },
    });

    if (!record) {
        redirect(`/member/login/verify?memberId=${encodeURIComponent(memberId)}&error=invalid-otp`);
    }

    // Mark the code as used only if it hasn't already been consumed.
    const consumed = await prisma.memberLoginOtp.updateMany({
        where: { id: record.id, used: false, expiresAt: { gt: new Date() } },
        data: { used: true },
    });

    if (consumed.count !== 1) {
        redirect(`/member/login/verify?memberId=${encodeURIComponent(memberId)}&error=invalid-otp`);
    }

    await setMemberSession(memberId);

    const member = await prisma.member.findUnique({
        where: { id: memberId },
        select: { id: true, email: true, adminRole: true, adminStatus: true },
    });

    if (
        member?.adminStatus === "ACTIVE" &&
        member.adminRole &&
        ["SUPER_ADMIN", "ADMIN", "FINANCE"].includes(member.adminRole)
    ) {
        const cookieStore = await cookies();
        const token = signToken({
            id: member.id,
            email: member.email,
            role: member.adminRole,
        });
        cookieStore.set("ahpk_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
    }

    redirect("/member/dashboard");
}

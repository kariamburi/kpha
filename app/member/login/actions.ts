"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { setMemberSession } from "../session";

function generateOtp() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function addMinutes(date: Date, minutes: number) {
    const next = new Date(date);
    next.setMinutes(next.getMinutes() + minutes);
    return next;
}

export async function sendMemberLoginOtp(formData: FormData) {
    const email = String(formData.get("email") || "").trim();
    const idNumber = String(formData.get("idNumber") || "").trim();

    const application = await prisma.membershipApplication.findFirst({
        where: {
            email: {
                equals: email,
                mode: "insensitive",
            },
            idNumber: {
                equals: idNumber,
            },
            status: "APPROVED",
            paymentStatus: "PAID",
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (!application) {
        redirect("/member/login?error=invalid");
    }

    const member = await prisma.member.findFirst({
        where: {
            email: {
                equals: application.email || email,
                mode: "insensitive",
            },
            categoryId: application.categoryId || undefined,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (!member || !member.email) {
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

    if (process.env.DISABLE_MEMBER_EMAIL_OTP === "true") {
        console.log("====================================");
        console.log("AHPK MEMBER LOGIN OTP:", otp);
        console.log("MEMBER EMAIL:", member.email);
        console.log("====================================");
    } else {
        await sendMail({
            to: member.email,
            subject: "AHPK Member Portal Login Code",
            html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
                <h2 style="color:#C1121F;">AHPK Member Portal Login Code</h2>
                <p>Dear ${member.fullName || "Member"},</p>
                <p>Your login verification code is:</p>
                <div style="font-size:30px;font-weight:900;letter-spacing:6px;color:#C1121F;margin:20px 0;">
                    ${otp}
                </div>
                <p>This code expires in 10 minutes.</p>
                <p>Regards,<br/>AHPK Secretariat</p>
            </div>
        `,
        });
    }

    redirect(`/member/login/verify?memberId=${member.id}&email=${encodeURIComponent(member.email)}`);
}

export async function verifyMemberLoginOtp(formData: FormData) {
    const memberId = String(formData.get("memberId") || "").trim();
    const otp = String(formData.get("otp") || "").trim();

    if (!memberId || !otp) {
        redirect("/member/login?error=invalid");
    }

    const record = await prisma.memberLoginOtp.findFirst({
        where: {
            memberId,
            otp,
            used: false,
            expiresAt: {
                gt: new Date(),
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (!record) {
        redirect(`/member/login/verify?memberId=${memberId}&error=invalid-otp`);
    }

    await prisma.memberLoginOtp.update({
        where: { id: record.id },
        data: { used: true },
    });

    await setMemberSession(memberId);

    redirect("/member/dashboard");
}
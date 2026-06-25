"use server";

import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";

function addOneYear(date: Date) {
    const next = new Date(date);
    next.setFullYear(next.getFullYear() + 1);
    return next;
}

async function generateMemberNumber() {
    const year = new Date().getFullYear();
    const count = await prisma.member.count();

    return `AHPK-${year}-${String(count + 1).padStart(5, "0")}`;
}

async function generateCertificateNumber() {
    const year = new Date().getFullYear();
    const count = await prisma.certificate.count();

    return `CERT-${year}-${String(count + 1).padStart(5, "0")}`;
}

function generateVerificationCode() {
    return `AHPK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function approveApplication(applicationId: string) {
    const application = await prisma.membershipApplication.findUnique({
        where: { id: applicationId },
    });

    if (!application) {
        return { ok: false, error: "Application not found" };
    }

    if (!application.categoryId) {
        return { ok: false, error: "Membership category is required" };
    }

    if (application.paymentStatus !== "PAID") {
        return {
            ok: false,
            error: "Application cannot be approved before payment is confirmed",
        };
    }

    if (application.status === "APPROVED") {
        return { ok: true };
    }

    const memberNumber = await generateMemberNumber();
    const certificateNumber = await generateCertificateNumber();
    const verificationCode = generateVerificationCode();
    const joinDate = new Date();
    const expiryDate = addOneYear(joinDate);

    const result = await prisma.$transaction(async (tx) => {
        const member = await tx.member.create({
            data: {
                userId: application.userId || null,
                fullName: application.fullName,
                email: application.email,
                phone: application.phone,
                categoryId: application.categoryId!,
                memberNumber,
                joinDate,
                expiryDate,
                status: "ACTIVE",
            },
        });

        const certificate = await tx.certificate.create({
            data: {
                memberId: member.id,
                certificateNumber,
                issueDate: joinDate,
                expiryDate,
                verificationCode,
            },
        });

        await tx.membershipApplication.update({
            where: { id: applicationId },
            data: { status: "APPROVED" },
        });

        return { member, certificate };
    });

    await createAuditLog({
        action: "APPLICATION_APPROVED",
        entityType: "MembershipApplication",
        entityId: application.id,
        metadata: {
            memberId: result.member.id,
            memberNumber: result.member.memberNumber,
            certificateId: result.certificate.id,
            certificateNumber: result.certificate.certificateNumber,
            applicantEmail: application.email,
        },
    });

    if (application.email) {
        await sendMail({
            to: application.email,
            subject: "AHPK Membership Application Approved",
            html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2 style="color:#C1121F;">Membership Approved</h2>

          <p>Dear ${application.fullName || "Member"},</p>

          <p>
            Congratulations. Your AHPK membership application has been approved.
          </p>

          <p>
            Your member profile and certificate are now available in the member portal.
          </p>

          <p>
            Login using your email address and ID / Passport number.
          </p>

          <p>Regards,<br/>AHPK Secretariat</p>
        </div>
      `,
        });

        await createAuditLog({
            action: "APPLICATION_APPROVAL_EMAIL_SENT",
            entityType: "MembershipApplication",
            entityId: application.id,
            metadata: {
                to: application.email,
            },
        });
    }

    revalidatePath(`/dashboard/applications/${applicationId}`);
    revalidatePath("/dashboard/applications");
    revalidatePath("/dashboard/members");
    revalidatePath("/dashboard/certificates");
    revalidatePath("/dashboard/audit-logs");

    return { ok: true };
}

export async function rejectApplication(applicationId: string) {
    const application = await prisma.membershipApplication.update({
        where: { id: applicationId },
        data: { status: "REJECTED" },
    });

    await createAuditLog({
        action: "APPLICATION_REJECTED",
        entityType: "MembershipApplication",
        entityId: application.id,
        metadata: {
            applicantEmail: application.email,
            applicantName: application.fullName,
        },
    });

    revalidatePath(`/dashboard/applications/${applicationId}`);
    revalidatePath("/dashboard/applications");
    revalidatePath("/dashboard/audit-logs");

    return { ok: true };
}
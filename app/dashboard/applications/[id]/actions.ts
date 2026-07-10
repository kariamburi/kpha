"use server";

import { sendMail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

function addOneYear(date: Date) {
    const next = new Date(date);
    next.setFullYear(next.getFullYear() + 1);
    return next;
}

async function generateMemberNumber() {
    const year = new Date().getFullYear();

    const lastMember = await prisma.member.findFirst({
        where: {
            memberNumber: {
                startsWith: `AHPK-${year}-`,
            },
        },
        orderBy: {
            memberNumber: "desc",
        },
        select: {
            memberNumber: true,
        },
    });

    let nextNumber = 1;

    if (lastMember?.memberNumber) {
        const currentNumber = Number(
            lastMember.memberNumber.split("-").pop()
        );

        if (!Number.isNaN(currentNumber)) {
            nextNumber = currentNumber + 1;
        }
    }

    return `AHPK-${year}-${String(nextNumber).padStart(5, "0")}`;
}

async function generateCertificateNumber() {
    const year = new Date().getFullYear();

    const lastCertificate = await prisma.certificate.findFirst({
        where: {
            certificateNumber: {
                startsWith: `CERT-${year}-`,
            },
        },
        orderBy: {
            certificateNumber: "desc",
        },
        select: {
            certificateNumber: true,
        },
    });

    let nextNumber = 1;

    if (lastCertificate?.certificateNumber) {
        const currentNumber = Number(
            lastCertificate.certificateNumber.split("-").pop()
        );

        if (!Number.isNaN(currentNumber)) {
            nextNumber = currentNumber + 1;
        }
    }

    return `CERT-${year}-${String(nextNumber).padStart(5, "0")}`;
}

function generateVerificationCode() {
    return `AHPK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function approveApplication(applicationId: string) {
    try {
        if (!applicationId) {
            return {
                ok: false,
                error: "Application ID is required.",
            };
        }

        const application = await prisma.membershipApplication.findUnique({
            where: {
                id: applicationId,
            },
            include: {
                category: true,
            },
        });

        if (!application) {
            return {
                ok: false,
                error: "Application not found.",
            };
        }

        if (!application.categoryId) {
            return {
                ok: false,
                error: "Membership category is required.",
            };
        }

        if (application.paymentStatus !== "PAID") {
            return {
                ok: false,
                error:
                    "Application cannot be approved before payment is confirmed.",
            };
        }

        /*
         * Prevent duplicate approval.
         */
        if (application.status === "APPROVED") {
            return {
                ok: true,
                message: "Application is already approved.",
            };
        }

        /*
         * Check whether a member was already created during a previous
         * approval attempt.
         */
        const existingMember = application.email
            ? await prisma.member.findFirst({
                where: {
                    email: {
                        equals: application.email,
                        mode: "insensitive",
                    },
                },
                select: {
                    id: true,
                    memberNumber: true,
                },
            })
            : null;

        if (existingMember) {
            await prisma.membershipApplication.update({
                where: {
                    id: applicationId,
                },
                data: {
                    status: "APPROVED",
                },
            });

            revalidateApprovalPages(applicationId);

            return {
                ok: true,
                message: `Application approved. Existing member ${existingMember.memberNumber} was found.`,
            };
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
                    fullName: application.fullName || "Unnamed Member",
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
                where: {
                    id: applicationId,
                },
                data: {
                    status: "APPROVED",
                },
            });

            return {
                member,
                certificate,
            };
        });

        /*
         * Approval should remain successful even if audit logging fails.
         */
        try {
            await createAuditLog({
                action: "APPLICATION_APPROVED",
                entityType: "MembershipApplication",
                entityId: application.id,
                metadata: {
                    memberId: result.member.id,
                    memberNumber: result.member.memberNumber,
                    certificateId: result.certificate.id,
                    certificateNumber:
                        result.certificate.certificateNumber,
                    applicantEmail: application.email,
                },
            });
        } catch (auditError) {
            console.error(
                "APPLICATION_APPROVAL_AUDIT_ERROR",
                auditError
            );
        }

        /*
         * Do not make email failure cause approval failure.
         */
        if (application.email) {
            try {
                await sendMail({
                    to: application.email,
                    subject:
                        "AHPK Membership Application Approved",
                    html: `
                        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
                            <h2 style="color:#C1121F;">
                                Membership Approved
                            </h2>

                            <p>
                                Dear ${application.fullName || "Member"},
                            </p>

                            <p>
                                Congratulations. Your AHPK membership
                                application has been approved.
                            </p>

                            <p>
                                Your member profile and certificate are
                                now available in the member portal.
                            </p>

                            <p>
                                Login using your email address and
                                ID / Passport number.
                            </p>

                            <p>
                                Member Number:
                                <strong>${result.member.memberNumber}</strong>
                            </p>

                            <p>
                                Regards,<br />
                                AHPK Secretariat
                            </p>
                        </div>
                    `,
                });

                try {
                    await createAuditLog({
                        action:
                            "APPLICATION_APPROVAL_EMAIL_SENT",
                        entityType:
                            "MembershipApplication",
                        entityId: application.id,
                        metadata: {
                            to: application.email,
                        },
                    });
                } catch (auditError) {
                    console.error(
                        "APPROVAL_EMAIL_AUDIT_ERROR",
                        auditError
                    );
                }
            } catch (mailError) {
                console.error(
                    "APPLICATION_APPROVAL_EMAIL_ERROR",
                    mailError
                );

                /*
                 * The approval remains successful.
                 */
            }
        }

        revalidateApprovalPages(applicationId);

        return {
            ok: true,
            message: "Application approved successfully.",
        };
    } catch (error) {
        console.error("APPROVE_APPLICATION_ERROR", error);

        let errorMessage =
            "Failed to approve application. Check the server logs.";

        if (error instanceof Error) {
            if (
                error.message.includes(
                    "Unique constraint failed"
                )
            ) {
                errorMessage =
                    "A member, member number, or certificate with the same details already exists.";
            } else {
                errorMessage = error.message;
            }
        }

        return {
            ok: false,
            error: errorMessage,
        };
    }
}

export async function rejectApplication(applicationId: string) {
    try {
        if (!applicationId) {
            return {
                ok: false,
                error: "Application ID is required.",
            };
        }

        const application =
            await prisma.membershipApplication.findUnique({
                where: {
                    id: applicationId,
                },
            });

        if (!application) {
            return {
                ok: false,
                error: "Application not found.",
            };
        }

        if (application.status === "APPROVED") {
            return {
                ok: false,
                error:
                    "An approved application cannot be rejected.",
            };
        }

        if (application.status === "REJECTED") {
            return {
                ok: true,
                message: "Application is already rejected.",
            };
        }

        const rejectedApplication =
            await prisma.membershipApplication.update({
                where: {
                    id: applicationId,
                },
                data: {
                    status: "REJECTED",
                },
            });

        try {
            await createAuditLog({
                action: "APPLICATION_REJECTED",
                entityType: "MembershipApplication",
                entityId: rejectedApplication.id,
                metadata: {
                    applicantEmail:
                        rejectedApplication.email,
                    applicantName:
                        rejectedApplication.fullName,
                },
            });
        } catch (auditError) {
            console.error(
                "APPLICATION_REJECTION_AUDIT_ERROR",
                auditError
            );
        }

        revalidatePath(
            `/dashboard/applications/${applicationId}`
        );
        revalidatePath("/dashboard/applications");
        revalidatePath("/dashboard/audit-logs");

        return {
            ok: true,
            message: "Application rejected successfully.",
        };
    } catch (error) {
        console.error("REJECT_APPLICATION_ERROR", error);

        return {
            ok: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to reject application.",
        };
    }
}

function revalidateApprovalPages(applicationId: string) {
    revalidatePath(
        `/dashboard/applications/${applicationId}`
    );
    revalidatePath("/dashboard/applications");
    revalidatePath("/dashboard/members");
    revalidatePath("/dashboard/certificates");
    revalidatePath("/dashboard/audit-logs");
}
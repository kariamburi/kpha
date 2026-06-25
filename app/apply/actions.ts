"use server";

import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

type DraftPayload = {
    applicationId?: string;
    data: {
        fullName?: string;
        email?: string;
        phone?: string;
        idNumber?: string;
        categoryId?: string;
        qualification?: string;
        institution?: string;
        position?: string;
        experience?: string;
        idDocumentUrl?: string;
        qualificationDocUrl?: string;
        cvDocumentUrl?: string;
    };
};

export async function saveApplicationDraft(payload: DraftPayload) {
    try {
        const data = {
            fullName: payload.data.fullName || null,
            email: payload.data.email || null,
            phone: payload.data.phone || null,
            idNumber: payload.data.idNumber || null,
            categoryId: payload.data.categoryId || null,
            qualification: payload.data.qualification || null,
            institution: payload.data.institution || null,
            position: payload.data.position || null,
            experience: payload.data.experience || null,
            idDocumentUrl: payload.data.idDocumentUrl || undefined,
            qualificationDocUrl: payload.data.qualificationDocUrl || undefined,
            cvDocumentUrl: payload.data.cvDocumentUrl || undefined,
        };

        const isNew = !payload.applicationId;

        const application = payload.applicationId
            ? await prisma.membershipApplication.update({
                where: { id: payload.applicationId },
                data,
            })
            : await prisma.membershipApplication.create({
                data,
            });

        if (isNew) {
            await createAuditLog({
                action: "APPLICATION_DRAFT_CREATED",
                entityType: "MembershipApplication",
                entityId: application.id,
                metadata: {
                    fullName: application.fullName,
                    email: application.email,
                    phone: application.phone,
                },
            });
        }

        return {
            ok: true,
            applicationId: application.id,
        };
    } catch (error) {
        console.error("SAVE_APPLICATION_DRAFT_ERROR", error);

        return {
            ok: false,
            error: "Failed to save application",
        };
    }
}

export async function completeFreeApplication(applicationId: string) {
    try {
        if (!applicationId) {
            return {
                ok: false,
                error: "Application ID is required.",
            };
        }

        const application = await prisma.membershipApplication.findUnique({
            where: { id: applicationId },
            include: { category: true },
        });

        if (!application) {
            return {
                ok: false,
                error: "Application not found.",
            };
        }

        if (!application.category) {
            return {
                ok: false,
                error: "Membership category is required.",
            };
        }

        if (application.category.annualFee > 0) {
            return {
                ok: false,
                error: "This category requires payment.",
            };
        }

        const updated = await prisma.membershipApplication.update({
            where: { id: applicationId },
            data: {
                paymentStatus: "PAID",
                paymentReference: `FREE-${applicationId}`,
            },
        });

        await createAuditLog({
            action: "FREE_APPLICATION_COMPLETED",
            entityType: "MembershipApplication",
            entityId: updated.id,
            metadata: {
                fullName: updated.fullName,
                email: updated.email,
                category: application.category.name,
                paymentStatus: updated.paymentStatus,
                paymentReference: updated.paymentReference,
            },
        });

        return {
            ok: true,
            applicationId: updated.id,
        };
    } catch (error) {
        console.error("COMPLETE_FREE_APPLICATION_ERROR", error);

        return {
            ok: false,
            error: "Failed to complete free application.",
        };
    }
}
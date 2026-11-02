"use server";

import { prisma } from "@/lib/prisma";
import { missingApplicationRequirements, normalizeIdentity } from "./application-validation";
import { createAuditLog } from "@/lib/audit";
import { notifyAdminsOfPendingApplication } from "@/lib/application-notifications";

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
        employer?: string;

        experience?: string;

        dataProtectionConsent?: boolean;

        idDocumentUrl?: string;
        qualificationDocUrl?: string;
        cvDocumentUrl?: string;
    };
};

export async function saveApplicationDraft(
    payload: DraftPayload,
) {
    try {
        // Do not let the public application flow edit a previously completed record.
        if (payload.applicationId) {
            const current = await prisma.membershipApplication.findUnique({
                where: { id: payload.applicationId },
                select: { paymentStatus: true },
            });
            if (!current) return { ok: false, error: "Application not found." };
            if (current.paymentStatus === "PAID") {
                return { ok: false, error: "This application has already been submitted and cannot be edited." };
            }
        } else {
            // Preliminary protection only: add a DB uniqueness constraint.
            // Never automatically return an existing application's ID to an unauthenticated user.
            const id = normalizeIdentity(payload.data.idNumber);
            const email = (payload.data.email || "").trim().toLowerCase();
            const existing = await prisma.membershipApplication.findFirst({
                where: { OR: [
                    ...(id ? [{ idNumber: { equals: id } }] : []),
                    ...(email ? [{ email: { equals: email } }] : []),
                ] }, select: { id: true },
            });
            if (existing) {
                return { ok: false, error: "An application with these details already exists. Contact the Secretariat to resume or check its status." };
            }
        }

        const consent =
            Boolean(
                payload.data
                    .dataProtectionConsent,
            );

        /*
         * We preserve the first consent timestamp.
         *
         * If an existing application already has
         * consentedAt, do not replace it every time
         * the draft is saved.
         */
        let existingConsentedAt:
            | Date
            | null = null;

        if (payload.applicationId) {
            const existing =
                await prisma.membershipApplication.findUnique({
                    where: {
                        id:
                            payload.applicationId,
                    },

                    select: {
                        consentedAt:
                            true,
                    },
                });

            existingConsentedAt =
                existing?.consentedAt ||
                null;
        }

        const data = {
            fullName:
                payload.data.fullName ||
                null,

            email:
                payload.data.email?.trim().toLowerCase() ||
                null,

            phone:
                payload.data.phone ||
                null,

            idNumber:
                normalizeIdentity(payload.data.idNumber) ||
                null,

            categoryId:
                payload.data
                    .categoryId ||
                null,

            /*
             * Education
             */
            qualification:
                payload.data
                    .qualification ||
                null,

            institution:
                payload.data
                    .institution ||
                null,

            /*
             * Current employment
             */
            position:
                payload.data.position ||
                null,

            employer:
                payload.data.employer ||
                null,

            /*
             * Professional experience
             * Free-text, not years.
             */
            experience:
                payload.data
                    .experience ||
                null,

            /*
             * Data protection consent
             */
            dataProtectionConsent:
                consent,

            consentedAt:
                consent
                    ? existingConsentedAt ||
                    new Date()
                    : null,

            /*
             * Documents
             *
             * Keep existing uploaded values when
             * fields are omitted from a draft save.
             */
            idDocumentUrl:
                payload.data
                    .idDocumentUrl ||
                undefined,

            qualificationDocUrl:
                payload.data
                    .qualificationDocUrl ||
                undefined,

            cvDocumentUrl:
                payload.data
                    .cvDocumentUrl ||
                undefined,
        };

        const isNew =
            !payload.applicationId;

        const application =
            payload.applicationId
                ? await prisma.membershipApplication.update({
                    where: {
                        id:
                            payload.applicationId,
                    },

                    data,
                })
                : await prisma.membershipApplication.create({
                    data,
                });

        if (isNew) {
            await createAuditLog({
                action:
                    "APPLICATION_DRAFT_CREATED",

                entityType:
                    "MembershipApplication",

                entityId:
                    application.id,

                metadata: {
                    fullName:
                        application.fullName,

                    email:
                        application.email,

                    phone:
                        application.phone,
                },
            });
        }

        return {
            ok: true,
            applicationId:
                application.id,
        };
    } catch (error) {
        console.error(
            "SAVE_APPLICATION_DRAFT_ERROR",
            error,
        );

        return {
            ok: false,
            error:
                "Failed to save application",
        };
    }
}

export async function completeFreeApplication(
    applicationId: string,
) {
    try {
        if (!applicationId) {
            return {
                ok: false,
                error:
                    "Application ID is required.",
            };
        }

        const application =
            await prisma.membershipApplication.findUnique({
                where: {
                    id:
                        applicationId,
                },

                include: {
                    category:
                        true,
                },
            });

        if (!application) {
            return {
                ok: false,
                error:
                    "Application not found.",
            };
        }

        if (!application.category) {
            return {
                ok: false,
                error:
                    "Membership category is required.",
            };
        }

        if (
            application.category
                .annualFee > 0
        ) {
            return {
                ok: false,
                error:
                    "This category requires payment.",
            };
        }

        // Require the complete record, including all uploaded documents.
        const missing = missingApplicationRequirements(application);
        if (missing.length) return { ok: false, error: `Complete these requirements before submitting: ${missing.join(", ")}.` };

        /*
         * Required professional information.
         */
        if (
            !application.qualification ||
            !application.institution ||
            !application.position ||
            !application.employer ||
            !application.experience
        ) {
            return {
                ok: false,
                error:
                    "Please complete your education, current employment and professional experience details.",
            };
        }

        /*
         * Consent is mandatory.
         */
        if (
            !application.dataProtectionConsent
        ) {
            return {
                ok: false,
                error:
                    "Data protection consent is required before submitting the application.",
            };
        }

        /*
         * Prevent duplicate notifications if the
         * browser submits the completion request
         * more than once.
         */
        const alreadyCompleted =
            application.paymentStatus ===
            "PAID" &&
            application.paymentReference ===
            `FREE-${applicationId}`;

        const updated =
            alreadyCompleted
                ? application
                : await prisma.membershipApplication.update({
                    where: {
                        id:
                            applicationId,
                    },

                    data: {
                        paymentStatus:
                            "PAID",

                        paymentReference:
                            `FREE-${applicationId}`,

                        consentedAt:
                            application.consentedAt ||
                            new Date(),
                    },

                    include: {
                        category:
                            true,
                    },
                });

        if (!alreadyCompleted) {
            /*
             * Audit successful completion.
             */
            try {
                await createAuditLog({
                    action:
                        "FREE_APPLICATION_COMPLETED",

                    entityType:
                        "MembershipApplication",

                    entityId:
                        updated.id,

                    metadata: {
                        fullName:
                            updated.fullName,

                        email:
                            updated.email,

                        category:
                            application
                                .category
                                .name,

                        paymentStatus:
                            updated.paymentStatus,

                        paymentReference:
                            updated.paymentReference,

                        dataProtectionConsent:
                            updated.dataProtectionConsent,

                        consentedAt:
                            updated.consentedAt,
                    },
                });
            } catch (
            auditError
            ) {
                console.error(
                    "FREE_APPLICATION_AUDIT_ERROR",
                    auditError,
                );
            }

            /*
             * =================================================
             * ADMIN EMAIL NOTIFICATION
             * =================================================
             *
             * Failure to send an email must NOT fail
             * the applicant's completed application.
             */
            await notifyAdminsOfPendingApplication({
                applicationId:
                    updated.id,

                fullName:
                    updated.fullName,

                email:
                    updated.email,

                phone:
                    updated.phone,

                categoryName:
                    application
                        .category
                        .name,

                position:
                    updated.position,

                employer:
                    updated.employer,
            });
        }

        return {
            ok: true,
            applicationId:
                updated.id,
        };
    } catch (error) {
        console.error(
            "COMPLETE_FREE_APPLICATION_ERROR",
            error,
        );

        return {
            ok: false,
            error:
                "Failed to complete free application.",
        };
    }
}
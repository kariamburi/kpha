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
                payload.data.email ||
                null,

            phone:
                payload.data.phone ||
                null,

            idNumber:
                payload.data.idNumber ||
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

        /*
         * Required professional information
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
         * Data protection consent must be recorded
         * before final submission.
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

        const updated =
            await prisma.membershipApplication.update({
                where: {
                    id:
                        applicationId,
                },

                data: {
                    paymentStatus:
                        "PAID",

                    paymentReference:
                        `FREE-${applicationId}`,

                    /*
                     * Ensure consent timestamp exists
                     * when application is finalized.
                     */
                    consentedAt:
                        application.consentedAt ||
                        new Date(),
                },
            });

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
                    application.category
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
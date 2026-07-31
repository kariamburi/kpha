"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

function getRequiredValue(
    formData: FormData,
    name: string,
) {
    const value = String(
        formData.get(name) || "",
    ).trim();

    if (!value) {
        throw new Error(`${name} is required.`);
    }

    return value;
}

function revalidateEventPages(
    eventId: string,
    eventSlug?: string,
) {
    revalidatePath(
        `/dashboard/website/events/${eventId}/registrations`,
    );

    revalidatePath(
        "/dashboard/website/events",
    );

    revalidatePath("/events");

    if (eventSlug) {
        revalidatePath(`/events/${eventSlug}`);
        revalidatePath(
            `/events/${eventSlug}/book`,
        );
    }
}

export async function confirmRegistration(
    formData: FormData,
) {
    const registrationId =
        getRequiredValue(
            formData,
            "registrationId",
        );

    const registration =
        await prisma.eventRegistration.findUnique({
            where: {
                id: registrationId,
            },
            include: {
                event: true,
            },
        });

    if (!registration) {
        throw new Error(
            "Event registration not found.",
        );
    }

    if (
        registration.status === "CANCELLED"
    ) {
        throw new Error(
            "A cancelled registration cannot be confirmed. Restore it first.",
        );
    }

    const updated =
        await prisma.eventRegistration.update({
            where: {
                id: registration.id,
            },
            data: {
                status: "CONFIRMED",
            },
        });

    await createAuditLog({
        action:
            "EVENT_REGISTRATION_CONFIRMED",
        entityType:
            "EventRegistration",
        entityId: updated.id,
        metadata: {
            bookingNumber:
                updated.bookingNumber,
            participantName:
                updated.fullName,
            eventId:
                registration.event.id,
            eventTitle:
                registration.event.title,
        },
    });

    revalidateEventPages(
        registration.event.id,
        registration.event.slug,
    );
}

export async function markRegistrationPaid(
    formData: FormData,
) {
    const registrationId =
        getRequiredValue(
            formData,
            "registrationId",
        );

    const paymentReference = String(
        formData.get("paymentReference") ||
        "",
    ).trim();

    const registration =
        await prisma.eventRegistration.findUnique({
            where: {
                id: registrationId,
            },
            include: {
                event: true,
            },
        });

    if (!registration) {
        throw new Error(
            "Event registration not found.",
        );
    }

    if (
        registration.status === "CANCELLED"
    ) {
        throw new Error(
            "A cancelled registration cannot be marked as paid.",
        );
    }

    const updated =
        await prisma.eventRegistration.update({
            where: {
                id: registration.id,
            },
            data: {
                status: "CONFIRMED",
                paymentStatus: "PAID",
                paymentMethod: "MANUAL",
                paymentReference:
                    paymentReference ||
                    registration.paymentReference ||
                    `MANUAL-${Date.now()}`,
                paidAt:
                    registration.paidAt ||
                    new Date(),
            },
        });

    await createAuditLog({
        action:
            "EVENT_REGISTRATION_MANUALLY_PAID",
        entityType:
            "EventRegistration",
        entityId: updated.id,
        metadata: {
            bookingNumber:
                updated.bookingNumber,
            participantName:
                updated.fullName,
            amount: updated.amount,
            eventId:
                registration.event.id,
            eventTitle:
                registration.event.title,
            paymentReference:
                updated.paymentReference,
        },
    });

    revalidateEventPages(
        registration.event.id,
        registration.event.slug,
    );
}

export async function cancelRegistration(
    formData: FormData,
) {
    const registrationId =
        getRequiredValue(
            formData,
            "registrationId",
        );

    const registration =
        await prisma.eventRegistration.findUnique({
            where: {
                id: registrationId,
            },
            include: {
                event: true,
            },
        });

    if (!registration) {
        throw new Error(
            "Event registration not found.",
        );
    }

    const updated =
        await prisma.eventRegistration.update({
            where: {
                id: registration.id,
            },
            data: {
                status: "CANCELLED",
            },
        });

    await createAuditLog({
        action:
            "EVENT_REGISTRATION_CANCELLED",
        entityType:
            "EventRegistration",
        entityId: updated.id,
        metadata: {
            bookingNumber:
                updated.bookingNumber,
            participantName:
                updated.fullName,
            eventId:
                registration.event.id,
            eventTitle:
                registration.event.title,
        },
    });

    revalidateEventPages(
        registration.event.id,
        registration.event.slug,
    );
}

export async function restoreRegistration(
    formData: FormData,
) {
    const registrationId =
        getRequiredValue(
            formData,
            "registrationId",
        );

    const registration =
        await prisma.eventRegistration.findUnique({
            where: {
                id: registrationId,
            },
            include: {
                event: true,
            },
        });

    if (!registration) {
        throw new Error(
            "Event registration not found.",
        );
    }

    const status =
        registration.paymentStatus === "PAID"
            ? "CONFIRMED"
            : "PENDING";

    await prisma.eventRegistration.update({
        where: {
            id: registration.id,
        },
        data: {
            status,
        },
    });

    await createAuditLog({
        action:
            "EVENT_REGISTRATION_RESTORED",
        entityType:
            "EventRegistration",
        entityId: registration.id,
        metadata: {
            bookingNumber:
                registration.bookingNumber,
            participantName:
                registration.fullName,
            restoredStatus: status,
            eventId:
                registration.event.id,
            eventTitle:
                registration.event.title,
        },
    });

    revalidateEventPages(
        registration.event.id,
        registration.event.slug,
    );
}
"use server";

import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function registerForEvent(formData: FormData) {
    const eventId = String(formData.get("eventId") || "");

    if (!eventId) {
        throw new Error("Event is required.");
    }

    const cookieStore = await cookies();
    const memberId = cookieStore.get("memberId")?.value;

    if (!memberId) {
        throw new Error("Please login to register.");
    }

    const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { registrations: true },
    });

    if (!event || !event.published) {
        throw new Error("Event not found.");
    }

    if (event.capacity && event.registrations.length >= event.capacity) {
        throw new Error("This event is already full.");
    }

    const registration = await prisma.eventRegistration.upsert({
        where: {
            eventId_memberId: {
                eventId,
                memberId,
            },
        },
        update: {},
        create: {
            eventId,
            memberId,
        },
    });

    await createAuditLog({
        action: "EVENT_REGISTERED",
        entityType: "Event",
        entityId: event.id,
        metadata: {
            registrationId: registration.id,
            memberId,
            eventTitle: event.title,
            eventDate: event.eventDate,
        },
    });

    revalidatePath(`/events/${event.slug}`);
    revalidatePath("/member/dashboard");
    revalidatePath("/dashboard/audit-logs");
}
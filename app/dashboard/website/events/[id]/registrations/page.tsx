import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import RegistrationsClient from "./RegistrationsClient";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EventRegistrationsPage({
    params,
}: PageProps) {
    const { id } = await params;

    const event = await prisma.event.findUnique({
        where: {
            id,
        },
        include: {
            registrations: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!event) {
        notFound();
    }

    const registrations = event.registrations.map(
        (registration) => ({
            id: registration.id,
            bookingNumber: registration.bookingNumber,
            fullName: registration.fullName,
            phone: registration.phone,
            email: registration.email,
            organisation: registration.organisation,
            membershipNumber:
                registration.membershipNumber,
            paymentDetails:
                registration.paymentDetails,
            amount: registration.amount,
            status: registration.status,
            paymentStatus:
                registration.paymentStatus,
            paymentMethod:
                registration.paymentMethod,
            paymentReference:
                registration.paymentReference,
            paidAt:
                registration.paidAt?.toISOString() ??
                null,
            createdAt:
                registration.createdAt.toISOString(),
        }),
    );

    return (
        <RegistrationsClient
            event={{
                id: event.id,
                title: event.title,
                slug: event.slug,
                venue: event.venue,
                eventDate:
                    event.eventDate.toISOString(),
                capacity: event.capacity,
                fee: event.fee ?? 0,
            }}
            registrations={registrations}
        />
    );
}
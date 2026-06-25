import { prisma } from "@/lib/prisma";
import { deleteEvent, saveEvent } from "./actions";
import EventsClient from "./EventsClient";


export default async function AdminEventsPage() {
    const events = await prisma.event.findMany({
        orderBy: { eventDate: "desc" },
        include: {
            registrations: true,
        },
    });

    return (
        <EventsClient
            events={events}
            saveEvent={saveEvent}
            deleteEvent={deleteEvent}
        />
    );
}
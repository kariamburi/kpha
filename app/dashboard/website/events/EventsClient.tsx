"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Modal from "../../components/Modal";

type EventItem = {
    id: string;
    title: string;
    slug: string;
    description: string;
    venue: string | null;
    eventDate: Date;
    endDate: Date | null;
    imageUrl: string | null;
    cpdPoints: number | null;
    capacity: number | null;
    fee: number | null;
    published: boolean;
    registrations: { id: string }[];
};

export default function EventsClient({
    events,
    saveEvent,
    deleteEvent,
}: {
    events: EventItem[];
    saveEvent: (formData: FormData) => void;
    deleteEvent: (formData: FormData) => void;
}) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

    function openAddModal() {
        setSelectedEvent(null);
        setOpen(true);
    }

    function openEditModal(event: EventItem) {
        setSelectedEvent(event);
        setOpen(true);
    }

    function closeModal() {
        setSelectedEvent(null);
        setOpen(false);
    }

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesSearch =
                !q ||
                event.title.toLowerCase().includes(q.toLowerCase()) ||
                event.venue?.toLowerCase().includes(q.toLowerCase()) ||
                event.slug.toLowerCase().includes(q.toLowerCase());

            const matchesStatus =
                !status ||
                (status === "PUBLISHED" && event.published) ||
                (status === "DRAFT" && !event.published);

            return matchesSearch && matchesStatus;
        });
    }, [events, q, status]);

    const totalRegistrations = events.reduce(
        (sum, event) => sum + event.registrations.length,
        0
    );

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <Link
                    href="/dashboard/website"
                    className="text-sm font-black text-[#C1121F] hover:text-red-800"
                >
                    ← Back to Website CMS
                </Link>

                <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <p className="text-sm font-black text-slate-500">
                            AHPK Website CMS
                        </p>

                        <h1 className="mt-1 text-3xl font-black text-slate-950">
                            Events & CPD
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Create, publish, and manage AHPK trainings, workshops, events and
                            CPD activities.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openAddModal}
                        className="rounded-2xl cursor-pointer bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-800"
                    >
                        + Add Event
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Events" value={events.length.toString()} />
                <StatCard
                    title="Published"
                    value={events.filter((event) => event.published).length.toString()}
                />
                <StatCard
                    title="Drafts"
                    value={events.filter((event) => !event.published).length.toString()}
                />
                <StatCard title="Registrations" value={totalRegistrations.toString()} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Events
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search title, venue or slug..."
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Status</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="DRAFT">Draft</option>
                    </select>

                    <button
                        type="button"
                        onClick={() => {
                            setQ("");
                            setStatus("");
                        }}
                        className="h-10 cursor-pointer rounded-md border border-slate-300 px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Events List
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total {filteredEvents.length} event
                            {filteredEvents.length === 1 ? "" : "s"} found
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Event</Th>
                                <Th>Venue</Th>
                                <Th>Date</Th>
                                <Th>Fee</Th>
                                <Th>CPD</Th>
                                <Th>Registrations</Th>
                                <Th>Status</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredEvents.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-5 py-8 text-center text-slate-500"
                                    >
                                        No events found.
                                    </td>
                                </tr>
                            ) : (
                                filteredEvents.map((event) => (
                                    <tr key={event.id} className="border-b hover:bg-slate-50">
                                        <td className="px-2 py-2">
                                            <div className="flex items-center gap-3">
                                                <div className="h-14 w-20 overflow-hidden rounded-xl bg-slate-100">
                                                    {event.imageUrl ? (
                                                        <img
                                                            src={event.imageUrl}
                                                            alt={event.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-xs font-black text-slate-400">
                                                            CPD
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {event.title}
                                                    </p>
                                                    <p className="text-[11px] text-slate-500">
                                                        /events/{event.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {event.venue || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-700">
                                            {formatDateTime(event.eventDate)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-700">
                                            {event.fee && event.fee > 0
                                                ? `KES ${event.fee.toLocaleString("en-KE")}`
                                                : "Free"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            {event.cpdPoints || 0}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            {event.registrations.length}
                                            {event.capacity ? ` / ${event.capacity}` : ""}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <EventStatusBadge published={event.published} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/events/${event.slug}`}
                                                    target="_blank"
                                                    className="rounded bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    View
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(event)}
                                                    className="rounded cursor-pointer bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    Edit
                                                </button>

                                                <form action={deleteEvent}>
                                                    <input type="hidden" name="id" value={event.id} />
                                                    <button className="rounded cursor-pointer bg-red-50 px-3 py-1.5 text-[12px] font-bold text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white">
                                                        Delete
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <Modal
                open={open}
                onClose={closeModal}
                title={selectedEvent ? "Edit Event" : "Add Event"}
                subtitle={
                    selectedEvent
                        ? "Update this AHPK event, training, workshop or CPD activity."
                        : "Create a new AHPK event, training, workshop or CPD activity."
                }
            >
                <form
                    action={async (formData) => {
                        try {
                            await saveEvent(formData);
                            closeModal();
                        } catch (error) {
                            console.error(error);
                            alert(
                                error instanceof Error
                                    ? error.message
                                    : "Failed to save event."
                            );
                        }
                    }}
                    className="space-y-4"
                >
                    {selectedEvent && (
                        <input type="hidden" name="id" value={selectedEvent.id} />
                    )}

                    <Input
                        name="title"
                        required
                        placeholder="Event title"
                        defaultValue={selectedEvent?.title || ""}
                    />

                    <Input
                        name="venue"
                        placeholder="Venue"
                        defaultValue={selectedEvent?.venue || ""}
                    />

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <label className="block text-sm font-black text-slate-700">
                            Event Featured Image
                        </label>

                        {selectedEvent?.imageUrl ? (
                            <div className="mt-3 flex items-center gap-3">
                                <img
                                    src={selectedEvent.imageUrl}
                                    alt={selectedEvent.title}
                                    className="h-20 w-28 rounded-xl border border-slate-200 object-cover"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-slate-700">
                                        Current image
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Upload another image to replace it.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-3 rounded-xl border border-dashed border-slate-300 p-4 text-sm font-semibold text-slate-500">
                                No image selected.
                            </div>
                        )}

                        <input
                            type="hidden"
                            name="existingImageUrl"
                            value={selectedEvent?.imageUrl || ""}
                        />

                        <input
                            type="file"
                            name="image"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-[#C1121F] file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
                        />

                        <p className="mt-2 text-xs font-semibold text-slate-500">
                            Upload JPG, PNG or WEBP. Maximum size 2MB.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Input
                            name="eventDate"
                            type="datetime-local"
                            required
                            defaultValue={toDateTimeLocal(selectedEvent?.eventDate || null)}
                        />

                        <Input
                            name="endDate"
                            type="datetime-local"
                            defaultValue={toDateTimeLocal(selectedEvent?.endDate || null)}
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Input
                            name="cpdPoints"
                            type="number"
                            placeholder="CPD Points"
                            defaultValue={selectedEvent?.cpdPoints ?? 0}
                        />

                        <Input
                            name="capacity"
                            type="number"
                            placeholder="Capacity"
                            defaultValue={selectedEvent?.capacity ?? 0}
                        />

                        <Input
                            name="fee"
                            type="number"
                            placeholder="Fee"
                            defaultValue={selectedEvent?.fee ?? 0}
                        />
                    </div>

                    <textarea
                        name="description"
                        required
                        rows={5}
                        placeholder="Event description"
                        defaultValue={selectedEvent?.description || ""}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <label className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <input
                            name="published"
                            type="checkbox"
                            defaultChecked={
                                selectedEvent ? selectedEvent.published : true
                            }
                        />
                        Published
                    </label>

                    <button className="w-full cursor-pointer rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800">
                        {selectedEvent ? "Update Event" : "Save Event"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold text-white/65">{title}</p>
            <h2 className="mt-2 text-2xl font-black">{value}</h2>
        </div>
    );
}

function EventStatusBadge({ published }: { published: boolean }) {
    return published ? (
        <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700">
            Published
        </span>
    ) : (
        <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700">
            Draft
        </span>
    );
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
            {children}
        </th>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
        />
    );
}

function formatDateTime(date: Date) {
    return new Date(date).toLocaleString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function toDateTimeLocal(value: Date | string | null) {
    if (!value) return "";

    const date = new Date(value);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);

    return localDate.toISOString().slice(0, 16);
}
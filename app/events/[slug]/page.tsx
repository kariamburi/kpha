import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";
import { registerForEvent } from "./actions";
import {
    ArrowLeft,
    BadgeCheck,
    CalendarDays,
    GraduationCap,
    MapPin,
    Ticket,
    Users,
} from "lucide-react";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
        where: { slug },
    });

    if (!event || !event.published) {
        return {
            title: "Event Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const description =
        event.description?.replace(/\s+/g, " ").slice(0, 160) ||
        "View AHPK events, trainings, workshops and CPD activities for hospitality professionals in Kenya.";

    return {
        title: event.title,
        description,
        alternates: {
            canonical: `/events/${event.slug}`,
        },
        openGraph: {
            title: event.title,
            description,
            url: `/events/${event.slug}`,
            type: "article",
            images: event.imageUrl
                ? [
                    {
                        url: event.imageUrl,
                        width: 1200,
                        height: 630,
                        alt: event.title,
                    },
                ]
                : ["/images/og-image.jpg"],
        },
        twitter: {
            card: "summary_large_image",
            title: event.title,
            description,
            images: event.imageUrl ? [event.imageUrl] : ["/images/og-image.jpg"],
        },
    };
}

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function formatDateTime(date: Date) {
    return date.toLocaleString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default async function EventDetailsPage({ params }: Props) {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
        where: { slug },
        include: {
            registrations: true,
        },
    });

    if (!event || !event.published) {
        notFound();
    }

    const cookieStore = await cookies();
    const memberId = cookieStore.get("memberId")?.value;

    const alreadyRegistered = memberId
        ? event.registrations.some((r) => r.memberId === memberId)
        : false;

    const isFull =
        event.capacity !== null &&
        event.capacity !== undefined &&
        event.registrations.length >= event.capacity;

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <PublicNavbar />

            <section className="relative overflow-hidden bg-[#111111] text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-45"
                    style={{
                        backgroundImage: `url('${event.imageUrl || "/login-hero.png"}')`,
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#C1121F]/50" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-sm font-black text-white/80 hover:text-[#F3C64E]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Events
                    </Link>

                    <p className="mt-8 text-sm font-black uppercase tracking-[0.45em] text-[#F3C64E]">
                        Event Details
                    </p>

                    <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        {event.title}
                    </h1>

                    <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">
                        <HeroBadge icon={CalendarDays} text={formatDateTime(event.eventDate)} />

                        {event.venue && <HeroBadge icon={MapPin} text={event.venue} />}

                        {event.cpdPoints ? (
                            <HeroBadge icon={GraduationCap} text={`${event.cpdPoints} CPD Points`} />
                        ) : null}

                        <HeroBadge
                            icon={Ticket}
                            text={
                                event.fee && event.fee > 0
                                    ? `KES ${event.fee.toLocaleString()}`
                                    : "Free Event"
                            }
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1fr_380px]">
                <article className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    {event.imageUrl && (
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="mb-8 h-[420px] w-full rounded-[24px] object-cover"
                        />
                    )}

                    <p className="text-sm font-black uppercase tracking-[0.35em] text-[#C1121F]">
                        About this Event
                    </p>

                    <h2 className="mt-3 text-3xl font-black text-slate-950">
                        Event Overview
                    </h2>

                    <div className="mt-6 whitespace-pre-line text-lg font-semibold leading-9 text-slate-600">
                        {event.description}
                    </div>
                </article>

                <aside className="h-fit rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl lg:sticky lg:top-28">
                    <div className="rounded-3xl bg-[#111111] p-6 text-white">
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#F3C64E]">
                            Registration
                        </p>

                        <h2 className="mt-3 text-2xl font-black">
                            Reserve Your Spot
                        </h2>

                        <p className="mt-3 text-sm font-semibold leading-6 text-white/65">
                            Login as a member to register for this event or CPD activity.
                        </p>
                    </div>

                    <div className="mt-6 space-y-4 text-sm">
                        <InfoRow label="Date" value={formatDate(event.eventDate)} icon={CalendarDays} />

                        {event.venue && (
                            <InfoRow label="Venue" value={event.venue} icon={MapPin} />
                        )}

                        <InfoRow
                            label="Fee"
                            value={
                                event.fee && event.fee > 0
                                    ? `KES ${event.fee.toLocaleString()}`
                                    : "Free"
                            }
                            icon={Ticket}
                        />

                        <InfoRow
                            label="CPD Points"
                            value={`${event.cpdPoints || 0}`}
                            icon={GraduationCap}
                        />

                        <InfoRow
                            label="Capacity"
                            value={event.capacity ? String(event.capacity) : "Unlimited"}
                            icon={Users}
                        />

                        <InfoRow
                            label="Registered"
                            value={String(event.registrations.length)}
                            icon={BadgeCheck}
                        />
                    </div>

                    {alreadyRegistered ? (
                        <button
                            disabled
                            className="mt-6 w-full rounded-2xl bg-green-100 px-5 py-4 text-sm font-black text-green-700"
                        >
                            ✓ Already Registered
                        </button>
                    ) : isFull ? (
                        <button
                            disabled
                            className="mt-6 w-full rounded-2xl bg-slate-200 px-5 py-4 text-sm font-black text-slate-500"
                        >
                            Event Full
                        </button>
                    ) : memberId ? (
                        <form action={registerForEvent}>
                            <input type="hidden" name="eventId" value={event.id} />

                            <button
                                type="submit"
                                className="mt-6 w-full cursor-pointer rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800"
                            >
                                Register for Event
                            </button>
                        </form>
                    ) : (
                        <Link
                            href="/member/login"
                            className="mt-6 block rounded-2xl bg-[#C1121F] px-5 py-4 text-center text-sm font-black text-white transition hover:bg-red-800"
                        >
                            Login to Register
                        </Link>
                    )}
                </aside>
            </section>

            <PublicFooter />
        </main>
    );
}

function HeroBadge({
    icon: Icon,
    text,
}: {
    icon: React.ElementType;
    text: string;
}) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white backdrop-blur">
            <Icon className="h-4 w-4 text-[#F3C64E]" />
            {text}
        </span>
    );
}

function InfoRow({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string;
    icon: React.ElementType;
}) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#C1121F]">
                    <Icon className="h-4 w-4" />
                </span>

                <span className="font-bold text-slate-500">{label}</span>
            </div>

            <span className="text-right font-black text-slate-900">{value}</span>
        </div>
    );
}
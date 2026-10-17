// app/events/page.tsx

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Home,
  MapPin,
  Ticket,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { prisma } from "@/lib/prisma";

import {
  dateRange,
  eventFilters,
  eventStatus,
  excerpt,
  feeText,
} from "../lib/public-content";

const pagePath = "/events";

export const metadata: Metadata = {
  title: "Events | Association of Hotel Professionals Kenya",
  description:
    "Discover AHPK conferences, training, workshops, AGMs and hospitality events.",

  alternates: {
    canonical: pagePath,
  },

  openGraph: {
    title:
      "Events | Association of Hotel Professionals Kenya",
    description:
      "Discover AHPK conferences, workshops, professional training, AGMs and hospitality industry programmes.",
    url: pagePath,
    siteName:
      "Association of Hotel Professionals Kenya",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/events-hero.webp",
        width: 1536,
        height: 1024,
        alt: "AHPK hospitality professionals attending an event",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AHPK Events",
    description:
      "Conferences, workshops, training and professional programmes by AHPK.",
    images: ["/events-hero.webp"],
  },
};

type EventsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

type EventWithRegistrations = Awaited<ReturnType<typeof fetchEventType>>[number];

// Type-only helper: not executed during page rendering.
function fetchEventType() {
  return prisma.event.findMany({
    include: { _count: { select: { registrations: true } } },
  });
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const query = await searchParams;
  const status = eventStatus(query.status);
  const now = new Date();

  const events = await prisma.event.findMany({
    where: {
      published: true,
      ...(status === "upcoming" ? { eventDate: { gte: now } } : {}),
      ...(status === "past" ? { eventDate: { lt: now } } : {}),
    },
    orderBy: { eventDate: status === "past" ? "desc" : "asc" },
    include: { _count: { select: { registrations: true } } },
  });

  const activeHref =
    status === "upcoming" ? "/events?status=upcoming" :
      status === "past" ? "/events?status=past" : "/events";
  const pageTitle = status === "upcoming" ? "Upcoming Events" :
    status === "past" ? "Past Events" : "Events";
  const countLabel = `${events.length} ${events.length === 1 ? "event" : "events"}`;

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <EventsJsonLd events={events} />
      <PageHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 pb-5 pt-5 sm:px-6 lg:px-8">
          <Breadcrumb />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                AHPK <span className="text-[#C8102E]">{pageTitle}</span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Discover AHPK conferences, workshops, training and networking opportunities.
              </p>
            </div>
            <Link
              href="/events/calendar"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
            >
              <CalendarDays className="h-4 w-4" /> Event Calendar
            </Link>
          </div>
          <nav aria-label="Event filters" className="mt-5 flex flex-wrap items-center gap-2">
            {eventFilters.map((filter) => {
              const active = activeHref === filter.href;
              return (
                <Link
                  key={filter.href}
                  href={filter.href}
                  aria-current={active ? "page" : undefined}
                  className={active
                    ? "rounded-lg bg-[#C8102E] px-4 py-2 text-sm font-bold text-white"
                    : "rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#C8102E] hover:text-[#C8102E]"}
                >
                  {filter.label}
                </Link>
              );
            })}
            <span className="ml-auto text-xs font-semibold text-slate-500">{countLabel}</span>
          </nav>
        </div>
      </section>

      <section className="py-7 sm:py-9">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <EmptyEvents status={status} />
          ) : (
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          )}
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}

function EventCard({ event }: { event: EventWithRegistrations }) {
  const isFull = event.capacity !== null && event._count.registrations >= event.capacity;
  return (
    <article className="group min-w-0 border-b border-slate-200 pb-5">
      <Link href={`/events/${event.slug}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8102E]">
        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-100 text-[#C8102E]">
              <CalendarDays className="h-10 w-10" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="pt-3">
          <p className="text-xs font-bold uppercase tracking-wide text-[#C8102E]">
            {formatCategory(event.category)}
          </p>
          <h2 className="mt-1.5 line-clamp-2 text-lg font-extrabold leading-snug text-slate-950 transition group-hover:text-[#C8102E]">
            {event.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {excerpt(event.description, 120)}
          </p>
          <div className="mt-3 space-y-1.5 text-sm text-slate-600">
            <p className="flex items-start gap-2">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
              <span>{dateRange(event.eventDate, event.endDate)}</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
              <span>{event.venue || "Venue to be announced"}</span>
            </p>
            <p className="flex items-start gap-2">
              <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
              <span>{feeText(event.fee)}</span>
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-200 pt-3">
            <span className={isFull ? "text-xs font-bold text-amber-700" : "text-xs font-bold text-emerald-700"}>
              {isFull ? "Fully booked" : "Registration open"}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C8102E]">
              View event <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function EmptyEvents({ status }: { status: string }) {
  const title = status === "upcoming" ? "No upcoming events" :
    status === "past" ? "No past events" : "No events found";
  return (
    <div className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-slate-50 px-5 py-10 text-center">
      <CalendarDays className="mx-auto h-8 w-8 text-[#C8102E]" />
      <h2 className="mt-3 text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Published AHPK events will appear here when added through the website dashboard.
      </p>
      {status !== "all" && (
        <Link href="/events" className="mt-4 inline-flex rounded-lg bg-[#C8102E] px-5 py-2.5 text-sm font-bold text-white hover:bg-red-800">
          View all events
        </Link>
      )}
    </div>
  );
}

function formatCategory(category: string) {
  return category.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function PageHeader() {
  return (
    <header
      className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
      style={
        {
          "--header-height": "88px",
        } as CSSProperties
      }
    >
      <div className="mx-auto flex h-[82px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="AHPK homepage"
          className="shrink-0"
        >
          <Image
            src={Logo}
            alt="Association of Hotel Professionals Kenya"
            width={92}
            height={92}
            priority
            className="h-[66px] w-[66px] object-contain sm:h-[72px] sm:w-[72px]"
          />
        </Link>

        <div className="ml-auto flex items-center">
          <DesktopNavigation />
        </div>
      </div>
    </header>
  );
}

function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 transition hover:text-[#C8102E]"
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      <ChevronRight className="h-4 w-4 text-slate-300" />

      <span
        className="text-[#C8102E]"
        aria-current="page"
      >
        Events
      </span>
    </nav>
  );
}

function EventsJsonLd({
  events,
}: {
  events: Awaited<
    ReturnType<typeof fetchEventType>
  >;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://ahpk.or.ke/events#page",
    url: "https://ahpk.or.ke/events",
    name: "AHPK Events",
    description:
      "Conferences, training, workshops, AGMs and hospitality professional programmes organised by AHPK.",

    mainEntity: {
      "@type": "ItemList",
      itemListElement: events.map(
        (event, index) => ({
          "@type": "ListItem",
          position: index + 1,

          item: {
            "@type": "Event",
            name: event.title,
            url: `https://ahpk.or.ke/events/${event.slug}`,
            startDate:
              event.eventDate.toISOString(),
            endDate:
              event.endDate?.toISOString(),
            image:
              event.imageUrl ||
              undefined,
            description: excerpt(
              event.description,
              180,
            ),

            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",

            eventStatus:
              "https://schema.org/EventScheduled",

            location: event.venue
              ? {
                "@type": "Place",
                name: event.venue,
              }
              : undefined,

            offers: {
              "@type": "Offer",
              price:
                event.fee ?? 0,
              priceCurrency: "KES",
              availability:
                "https://schema.org/InStock",
              url: `https://ahpk.or.ke/events/${event.slug}`,
            },
          },
        }),
      ),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
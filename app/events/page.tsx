// app/events/page.tsx

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  CalendarDays,
  ChevronRight,
  Clock3,
  GraduationCap,
  Home,
  MapPin,
  Ticket,
  Users,
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
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function EventsPage({
  searchParams,
}: EventsPageProps) {
  const query = await searchParams;
  const status = eventStatus(query.status);
  const now = new Date();

  const events = await prisma.event.findMany({
    where: {
      published: true,

      ...(status === "upcoming"
        ? {
          eventDate: {
            gte: now,
          },
        }
        : {}),

      ...(status === "past"
        ? {
          eventDate: {
            lt: now,
          },
        }
        : {}),
    },

    orderBy: {
      eventDate:
        status === "past"
          ? "desc"
          : "asc",
    },

    include: {
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });
  //const featuredEvent = events[0] ?? null;
  const otherEvents = events.slice(1);
  const activeHref =
    status === "upcoming"
      ? "/events?status=upcoming"
      : status === "past"
        ? "/events?status=past"
        : "/events";

  const pageTitle =
    status === "upcoming"
      ? "Upcoming Events"
      : status === "past"
        ? "Past Events"
        : "Events";

  const eventCountLabel =
    events.length === 1
      ? "1 published event"
      : `${events.length} published events`;
  const upcomingEvents = events.filter(
    (event) => event.eventDate >= now,
  );

  const pastEvents = events.filter(
    (event) => event.eventDate < now,
  );

  const featuredEvent =
    upcomingEvents[0] || pastEvents[0] || null;

  const remainingUpcomingEvents =
    featuredEvent
      ? upcomingEvents.filter(
        (event) => event.id !== featuredEvent.id,
      )
      : upcomingEvents;
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <EventsJsonLd events={events} />

      <PageHeader />

      <EventsHero
        title={pageTitle}
        activeHref={activeHref}
        eventCountLabel={eventCountLabel}
      />

      <EventsContent
        events={events}
        status={status}
      />

      <PublicFooter />
    </main>
  );
}
function FeaturedEvent({
  event,
}: EventCardProps) {
  const isFull =
    event.capacity !== null &&
    event._count.registrations >= event.capacity;

  return (
    <article className="group border-b border-slate-300 pb-10">
      <Link
        href={`/events/${event.slug}`}
        className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:items-start"
      >
        <div className="aspect-[16/9] overflow-hidden bg-slate-200">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-950 text-white">
              <CalendarDays className="h-14 w-14" />
            </div>
          )}
        </div>

        <div>
          <p className="border-l-4 border-[#C8102E] pl-3 text-xs font-black uppercase tracking-[0.16em] text-[#C8102E]">
            Featured event
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 transition group-hover:text-[#C8102E] sm:text-4xl">
            {event.title}
          </h2>

          <p className="mt-4 text-base font-medium leading-8 text-slate-600">
            {excerpt(event.description, 220)}
          </p>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm font-bold text-slate-600">
            <p className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
              {dateRange(
                event.eventDate,
                event.endDate,
              )}
            </p>

            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
              {event.venue ||
                "Venue to be announced"}
            </p>

            <p className="flex items-start gap-3">
              <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
              {feeText(event.fee)}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span
              className={
                isFull
                  ? "text-sm font-black text-amber-700"
                  : "text-sm font-black text-emerald-700"
              }
            >
              {isFull
                ? "Registration full"
                : "Registration available"}
            </span>

            <span className="inline-flex items-center gap-2 text-sm font-black text-[#C8102E]">
              View event
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
function EventsHero({
  title,
  activeHref,
  eventCountLabel,
}: {
  title: string;
  activeHref: string;
  eventCountLabel: string;
}) {
  return (
    <>
      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
          <Breadcrumb />

          <div className="mt-7 flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Professional development and networking
              </p>

              <h1 className="mt-1 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                AHPK {title}
              </h1>
            </div>

            <p className="hidden text-sm font-bold text-slate-500 sm:block">
              {eventCountLabel}
            </p>
          </div>
        </div>
      </section>

      <nav
        aria-label="Event filters"
        className="border-b border-slate-300 bg-white"
      >
        <div className="mx-auto max-w-7xl overflow-x-auto px-5 sm:px-6 lg:px-8">
          <div className="flex min-w-max">
            {eventFilters.map((filter) => {
              const isActive =
                activeHref === filter.href;

              return (
                <Link
                  key={filter.href}
                  href={filter.href}
                  aria-current={
                    isActive ? "page" : undefined
                  }
                  className={
                    isActive
                      ? "border-b-4 border-[#C8102E] px-5 py-4 text-sm font-black text-slate-950"
                      : "border-b-4 border-transparent px-5 py-4 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-[#C8102E]"
                  }
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

function EventsContent({
  events,
  status,
}: {
  events: Awaited<
    ReturnType<typeof getEventResultType>
  >;
  status: string;
}) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
              AHPK calendar
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Explore Our Events
            </h2>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
              Discover opportunities for
              professional development,
              networking and hospitality industry
              engagement.
            </p>
          </div>

          <Link
            href="/events/calendar"
            className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E]"
          >
            <CalendarDays className="h-4 w-4" />
            View Event Calendar
          </Link>
        </div>

        {events.length === 0 ? (
          <EmptyEvents status={status} />
        ) : (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Helper used only to infer the result type of the Prisma query.
 */
async function getEventResultType() {
  return prisma.event.findMany({
    include: {
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });
}

type EventCardProps = {
  event: Awaited<
    ReturnType<typeof getEventResultType>
  >[number];
};

function EventCard({ event }: EventCardProps) {
  const isFull =
    event.capacity !== null &&
    event._count.registrations >= event.capacity;

  return (
    <article className="group border-t-4 border-transparent pt-3 transition hover:border-[#C8102E]">
      <Link
        href={`/events/${event.slug}`}
        className="block"
      >
        <div className="aspect-[16/9] overflow-hidden bg-slate-200">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-slate-950 text-white">
              <CalendarDays className="h-11 w-11" />
            </div>
          )}
        </div>

        <div className="pt-4">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#C8102E]">
            {formatCategory(event.category)}
          </p>

          <h3 className="mt-2 line-clamp-3 text-xl font-black leading-6 text-slate-950 transition group-hover:text-[#C8102E]">
            {event.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-600">
            {excerpt(event.description, 130)}
          </p>

          <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 text-xs font-bold text-slate-500">
            <p className="flex gap-2">
              <Clock3 className="h-4 w-4 shrink-0 text-[#C8102E]" />
              {dateRange(
                event.eventDate,
                event.endDate,
              )}
            </p>

            <p className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#C8102E]" />
              {event.venue ||
                "Venue to be announced"}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
            <span
              className={
                isFull
                  ? "text-xs font-black text-amber-700"
                  : "text-xs font-black text-emerald-700"
              }
            >
              {isFull
                ? "Fully booked"
                : "Registration open"}
            </span>

            <span className="text-xs font-black text-[#C8102E]">
              View event
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function EventDetail({
  icon: Icon,
  text,
}: {
  icon: typeof Clock3;
  text: string;
}) {
  return (
    <p className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C8102E]">
        <Icon className="h-4 w-4" />
      </span>

      <span className="pt-1 leading-6">
        {text}
      </span>
    </p>
  );
}

function EmptyEvents({
  status,
}: {
  status: string;
}) {
  const title =
    status === "upcoming"
      ? "No upcoming events"
      : status === "past"
        ? "No past events"
        : "No events found";

  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center sm:px-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
        <CalendarDays className="h-8 w-8" />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-slate-950">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-7 text-slate-600 sm:text-base">
        Published AHPK events will appear here
        automatically after they are added through
        the website dashboard.
      </p>

      {status !== "all" && (
        <Link
          href="/events"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white transition hover:bg-red-700"
        >
          View all events
        </Link>
      )}
    </div>
  );
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

function formatCategory(category: string) {
  return category
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

function EventsJsonLd({
  events,
}: {
  events: Awaited<
    ReturnType<typeof getEventResultType>
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
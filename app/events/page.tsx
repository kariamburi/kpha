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
    <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
      {/* Background image */}
      <div className="absolute inset-0 -z-30">
        <img
          src="/agm.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center lg:object-right"
        />
      </div>

      {/* Desktop white fade */}
      <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_29%,rgba(255,255,255,0.98)_42%,rgba(255,255,255,0.91)_56%,rgba(255,255,255,0.65)_71%,rgba(255,255,255,0.22)_88%,rgba(255,255,255,0)_100%)] lg:block" />

      {/* Mobile white fade */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.96)_58%,rgba(255,255,255,0.83)_80%,rgba(255,255,255,0.58)_100%)] lg:hidden" />

      {/* Right image contrast */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[28%] bg-gradient-to-l from-slate-950/20 to-transparent lg:block" />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-28 top-4 -z-10 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col px-5 py-7 sm:px-6 sm:py-8 lg:min-h-[calc(100svh-82px)] lg:px-8 lg:py-10">
        <Breadcrumb />

        <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-6">
          <div className="max-w-3xl lg:w-[61%]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                  AHPK Professional Events
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Connect, learn and grow
                </p>
              </div>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
              Hospitality

              <span className="mt-2 block text-[#C8102E]">
                {title}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              Connect with hospitality
              professionals through AHPK
              conferences, workshops, training
              programmes, webinars and annual
              general meetings.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              {eventFilters.map((filter) => {
                const isActive =
                  activeHref ===
                  filter.href;

                return (
                  <Link
                    key={filter.href}
                    href={filter.href}
                    aria-current={
                      isActive
                        ? "page"
                        : undefined
                    }
                    className={
                      isActive
                        ? "rounded-full border border-[#C8102E] bg-[#C8102E] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white shadow-sm transition sm:px-5 sm:text-[11px]"
                        : "rounded-full border border-slate-200 bg-white/85 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E] sm:px-5 sm:text-[11px]"
                    }
                  >
                    {filter.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-7 max-w-xl border-l-4 border-[#C8102E] bg-white/80 py-3 pl-5 pr-4 backdrop-blur-sm sm:mt-8">
              <p className="text-sm font-bold leading-6 text-slate-700">
                {eventCountLabel}. Event
                information, dates and
                registration details are managed
                through the official AHPK portal.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-20" />
    </section>
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
    event._count.registrations >=
    event.capacity;

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl">
      <Link
        href={`/events/${event.slug}`}
        className="block h-full"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-[#8f0d16] text-white">
              <CalendarDays className="h-12 w-12" />
            </div>
          )}

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
            <span className="rounded-full bg-white/90 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#C8102E] shadow-sm backdrop-blur">
              {formatCategory(event.category)}
            </span>

            {event.cpdPoints ? (
              <span className="rounded-full bg-slate-950/85 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white backdrop-blur">
                {event.cpdPoints} CPD points
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex h-[calc(100%-auto)] flex-col p-6 sm:p-7">
          <h3 className="text-xl font-extrabold leading-tight text-slate-950 transition group-hover:text-[#C8102E]">
            {event.title}
          </h3>

          <p className="mt-3 text-sm font-medium leading-7 text-slate-500">
            {excerpt(
              event.description,
              145,
            )}
          </p>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm font-semibold text-slate-600">
            <EventDetail
              icon={Clock3}
              text={dateRange(
                event.eventDate,
                event.endDate,
              )}
            />

            <EventDetail
              icon={MapPin}
              text={
                event.venue ||
                "Venue to be announced"
              }
            />

            <EventDetail
              icon={Ticket}
              text={feeText(event.fee)}
            />

            <EventDetail
              icon={Users}
              text={
                event.capacity
                  ? `${event._count.registrations}/${event.capacity} registered`
                  : `${event._count.registrations} registered`
              }
            />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
            <span
              className={
                isFull
                  ? "rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700"
                  : "rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700"
              }
            >
              {isFull
                ? "Registration full"
                : "Registration available"}
            </span>

            <span className="inline-flex items-center gap-1 text-sm font-extrabold text-[#C8102E]">
              View event

              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
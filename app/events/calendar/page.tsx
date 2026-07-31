// app/events/calendar/page.tsx

import type { CSSProperties } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Clock3,
  Home,
  MapPin,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { dateRange } from "@/app/lib/public-content";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Calendar | AHPK",
  description:
    "Browse upcoming AHPK conferences, training programmes, workshops and hospitality events by month.",
  alternates: {
    canonical: "/events/calendar",
  },
};

export default async function CalendarPage() {
  const now = new Date();

  const events = await prisma.event.findMany({
    where: {
      published: true,
      eventDate: {
        gte: now,
      },
    },

    orderBy: {
      eventDate: "asc",
    },
  });

  const groups = events.reduce<
    Record<string, typeof events>
  >((all, event) => {
    const key = new Intl.DateTimeFormat(
      "en-KE",
      {
        month: "long",
        year: "numeric",
      },
    ).format(event.eventDate);

    if (!all[key]) {
      all[key] = [];
    }

    all[key].push(event);

    return all;
  }, {});

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PageHeader />

      {/* Calendar masthead */}
      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-6 sm:py-9 lg:px-8">
          <Breadcrumb />

          <div className="mt-7 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Plan ahead
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Event Calendar
              </h1>

              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
                Browse upcoming AHPK conferences,
                training programmes, workshops and
                professional hospitality events by month.
              </p>
            </div>

            <div className="border-l-4 border-[#C8102E] pl-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                Upcoming events
              </p>

              <p className="mt-1 text-2xl font-black text-slate-950">
                {events.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar navigation */}
      <div className="border-b border-slate-300 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-5 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="border-b-4 border-transparent py-4 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-[#C8102E]"
          >
            All Events
          </Link>

          <Link
            href="/events?status=upcoming"
            className="border-b-4 border-transparent py-4 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:text-[#C8102E]"
          >
            Upcoming
          </Link>

          <span className="border-b-4 border-[#C8102E] py-4 text-sm font-black text-slate-950">
            Calendar
          </span>
        </div>
      </div>

      {/* Calendar content */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <EmptyCalendar />
          ) : (
            <div className="space-y-14">
              {Object.entries(groups).map(
                ([month, items]) => (
                  <section key={month}>
                    <div className="mb-5 flex items-center gap-4 border-b border-slate-300 pb-4">
                      <span className="flex h-11 w-11 items-center justify-center bg-[#C8102E] text-white">
                        <CalendarDays className="h-5 w-5" />
                      </span>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                          AHPK Calendar
                        </p>

                        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                          {month}
                        </h2>
                      </div>
                    </div>

                    <div className="divide-y divide-slate-300 border-t border-slate-300">
                      {items.map((event) => (
                        <CalendarEventRow
                          key={event.id}
                          event={event}
                        />
                      ))}
                    </div>
                  </section>
                ),
              )}
            </div>
          )}

          <div className="mt-14 border-t border-slate-300 pt-7">
            <Link
              href="/events"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-slate-300 px-5 text-sm font-black text-slate-800 transition hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse all events
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

type CalendarEvent = Awaited<
  ReturnType<typeof getCalendarEventsType>
>[number];

async function getCalendarEventsType() {
  return prisma.event.findMany();
}

function CalendarEventRow({
  event,
}: {
  event: CalendarEvent;
}) {
  const day = new Intl.DateTimeFormat(
    "en-KE",
    {
      day: "2-digit",
    },
  ).format(event.eventDate);

  const weekday = new Intl.DateTimeFormat(
    "en-KE",
    {
      weekday: "short",
    },
  ).format(event.eventDate);

  const category = formatCategory(
    event.category,
  );

  return (
    <article className="group">
      <Link
        href={`/events/${event.slug}`}
        className="grid gap-5 py-6 transition sm:grid-cols-[74px_minmax(0,1fr)_auto] sm:items-center"
      >
        {/* Date block */}
        <div className="flex h-[74px] w-[74px] shrink-0 flex-col items-center justify-center bg-slate-950 text-white transition group-hover:bg-[#C8102E]">
          <span className="text-2xl font-black leading-none">
            {day}
          </span>

          <span className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-300 group-hover:text-white/80">
            {weekday}
          </span>
        </div>

        {/* Event information */}
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#C8102E]">
            {category}
          </p>

          <h3 className="mt-2 text-xl font-black leading-6 text-slate-950 transition group-hover:text-[#C8102E] sm:text-2xl sm:leading-7">
            {event.title}
          </h3>

          <div className="mt-3 flex flex-col gap-2 text-sm font-semibold text-slate-500 sm:flex-row sm:flex-wrap sm:gap-x-5">
            <span className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />

              {event.venue ||
                "Venue to be announced"}
            </span>

            <span className="inline-flex items-start gap-2">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />

              {dateRange(
                event.eventDate,
                event.endDate,
              )}
            </span>
          </div>
        </div>

        {/* Open indicator */}
        <span className="hidden h-10 w-10 items-center justify-center border border-slate-300 text-slate-500 transition group-hover:border-[#C8102E] group-hover:bg-[#C8102E] group-hover:text-white sm:flex">
          <ChevronRight className="h-4 w-4" />
        </span>
      </Link>
    </article>
  );
}

function EmptyCalendar() {
  return (
    <section className="border-t-4 border-[#C8102E] bg-slate-50 px-6 py-14 text-center sm:px-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center bg-white text-[#C8102E] shadow-sm">
        <CalendarDays className="h-7 w-7" />
      </div>

      <h2 className="mt-5 text-2xl font-black text-slate-950">
        No upcoming calendar entries
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-7 text-slate-600 sm:text-base">
        Published AHPK events will appear here
        automatically after they are added through
        the events dashboard.
      </p>

      <Link
        href="/events"
        className="mt-7 inline-flex min-h-11 items-center justify-center bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-red-700"
      >
        Browse all events
      </Link>
    </section>
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

      <Link
        href="/events"
        className="transition hover:text-[#C8102E]"
      >
        Events
      </Link>

      <ChevronRight className="h-4 w-4 text-slate-300" />

      <span
        className="text-[#C8102E]"
        aria-current="page"
      >
        Calendar
      </span>
    </nav>
  );
}

function formatCategory(
  category: string,
) {
  return category
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}
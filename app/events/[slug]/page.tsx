// app/events/[slug]/page.tsx

import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
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
  excerpt,
  feeText,
} from "@/app/lib/public-content";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = await prisma.event.findFirst({
    where: {
      slug,
      published: true,
    },
    select: {
      title: true,
      description: true,
      imageUrl: true,
    },
  });

  if (!event) {
    return {
      title: "Event Not Found | AHPK",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = excerpt(event.description, 160);
  const canonical = `/events/${slug}`;
  const socialImage = event.imageUrl || "/events-hero.webp";

  return {
    title: `${event.title} | AHPK Events`,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${event.title} | AHPK Events`,
      description,
      url: canonical,
      siteName: "Association of Hotel Professionals Kenya",
      locale: "en_KE",
      type: "article",
      images: [
        {
          url: socialImage,
          alt: event.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${event.title} | AHPK Events`,
      description,
      images: [socialImage],
    },
  };
}

export default async function EventPage({
  params,
}: EventPageProps) {
  const { slug } = await params;

  const event = await prisma.event.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  const registrations = event._count.registrations;

  const remainingPlaces = event.capacity
    ? Math.max(event.capacity - registrations, 0)
    : null;

  const registrationPercentage = event.capacity
    ? Math.min(
      Math.round(
        (registrations / event.capacity) * 100,
      ),
      100,
    )
    : null;

  const isFullyBooked =
    event.capacity !== null &&
    event.capacity !== undefined &&
    registrations >= event.capacity;

  const heroImage =
    event.imageUrl || "/events-hero.webp";

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <EventJsonLd event={event} />

      <PageHeader />

      {/* EVENT HERO */}
      <EventHero
        title={event.title}
        description={excerpt(
          event.description,
          220,
        )}
        imageUrl={heroImage}
        category={formatCategory(event.category)}
        date={dateRange(
          event.eventDate,
          event.endDate,
        )}
        venue={
          event.venue ||
          "Venue to be announced"
        }
        fee={feeText(event.fee)}
        cpdPoints={event.cpdPoints}
      />

      {/* MAIN CONTENT */}
      <section className="bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <article className="min-w-0">
              {/* Mobile event information */}
              <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
                <CompactInfo
                  icon={<Clock3 />}
                  label="Date and time"
                  value={dateRange(
                    event.eventDate,
                    event.endDate,
                  )}
                />

                <CompactInfo
                  icon={<MapPin />}
                  label="Venue"
                  value={
                    event.venue ||
                    "Venue to be announced"
                  }
                />

                <CompactInfo
                  icon={<Ticket />}
                  label="Event fee"
                  value={feeText(event.fee)}
                />

                <CompactInfo
                  icon={<Users />}
                  label="Registration"
                  value={
                    event.capacity
                      ? `${registrations} of ${event.capacity} places taken`
                      : `${registrations} registered`
                  }
                />
              </div>

              {/* Event description */}
              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                  <CalendarDays className="h-6 w-6" />
                </div>

                <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                  Event overview
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  About This Event
                </h2>

                <div className="mt-6 h-px bg-slate-200" />

                <div className="mt-6 whitespace-pre-line text-base font-medium leading-8 text-slate-600">
                  {event.description}
                </div>
              </section>

              {/* Registration CTA */}
              <section className="mt-6 rounded-[24px] border border-red-100 bg-red-50/70 p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#C8102E] shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold text-slate-950">
                      Attend as an AHPK Member
                    </h2>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                      Sign in to your member
                      account to complete your
                      event registration and
                      access member-only event
                      information or materials.
                    </p>

                    {isFullyBooked ? (
                      <p className="mt-5 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-extrabold text-amber-800">
                        This event is currently
                        fully booked
                      </p>
                    ) : (
                      <Link
                        href="/member/login"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                      >
                        Member Login
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </section>

              {/* Back to events */}
              <div className="mt-6">
                <Link
                  href="/events"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Browse More Events
                </Link>
              </div>
            </article>

            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                    Event details
                  </p>

                  <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                    Event Information
                  </h2>
                </div>

                <div className="space-y-6 p-6">
                  <Info
                    icon={<Clock3 />}
                    label="Date and time"
                    value={dateRange(
                      event.eventDate,
                      event.endDate,
                    )}
                  />

                  <Info
                    icon={<MapPin />}
                    label="Venue"
                    value={
                      event.venue ||
                      "Venue to be announced"
                    }
                  />

                  <Info
                    icon={<Ticket />}
                    label="Event fee"
                    value={feeText(event.fee)}
                  />

                  <Info
                    icon={<Users />}
                    label="Registration"
                    value={
                      event.capacity
                        ? `${registrations} of ${event.capacity} places taken`
                        : `${registrations} registered`
                    }
                  />

                  {event.cpdPoints ? (
                    <Info
                      icon={
                        <CheckCircle2 />
                      }
                      label="CPD points"
                      value={`${event.cpdPoints} CPD points`}
                    />
                  ) : null}

                  {event.capacity &&
                    registrationPercentage !==
                    null ? (
                    <div className="border-t border-slate-200 pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                          Capacity
                        </p>

                        <p className="text-xs font-extrabold text-slate-600">
                          {
                            registrationPercentage
                          }
                          % filled
                        </p>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#C8102E]"
                          style={{
                            width: `${registrationPercentage}%`,
                          }}
                        />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-500">
                        {isFullyBooked
                          ? "This event is currently fully booked."
                          : `${remainingPlaces} ${remainingPlaces ===
                            1
                            ? "place"
                            : "places"
                          } remaining`}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-slate-200 bg-slate-50 p-5">
                  {isFullyBooked ? (
                    <div className="flex min-h-12 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 px-5 text-center text-sm font-extrabold text-amber-700">
                      Event Fully Booked
                    </div>
                  ) : (
                    <Link
                      href="/member/login"
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-5 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-700"
                    >
                      Register as a Member
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}

                  <p className="mt-3 text-center text-xs font-semibold leading-5 text-slate-400">
                    Member login may be
                    required to complete
                    registration.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

function EventHero({
  title,
  description,
  imageUrl,
  category,
  date,
  venue,
  fee,
  cpdPoints,
}: {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  venue: string;
  fee: string;
  cpdPoints: number | null;
}) {
  return (
    <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
      {/* Event-specific background image */}
      <div className="absolute inset-0 -z-30">
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center lg:object-right"
        />
      </div>

      {/* Desktop white-to-image fade */}
      <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_30%,rgba(255,255,255,0.98)_43%,rgba(255,255,255,0.91)_56%,rgba(255,255,255,0.65)_71%,rgba(255,255,255,0.22)_88%,rgba(255,255,255,0)_100%)] lg:block" />

      {/* Mobile overlay */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.96)_59%,rgba(255,255,255,0.84)_80%,rgba(255,255,255,0.6)_100%)] lg:hidden" />

      {/* Right-side contrast */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[28%] bg-gradient-to-l from-slate-950/25 to-transparent lg:block" />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-28 top-4 -z-10 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col px-5 py-7 sm:px-6 sm:py-8 lg:min-h-[calc(100svh-82px)] lg:px-8 lg:py-10">
        <EventBreadcrumb title={title} />

        <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-6">
          <div className="max-w-3xl lg:w-[61%]">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                <CalendarDays className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                  AHPK Professional Event
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {category}
                </p>
              </div>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              {description}
            </p>

            {/* Event detail pills */}
            <div className="mt-7 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              <HeroPill
                icon={<Clock3 />}
                label={date}
              />

              <HeroPill
                icon={<MapPin />}
                label={venue}
              />

              <HeroPill
                icon={<Ticket />}
                label={fee}
              />

              {cpdPoints ? (
                <HeroPill
                  icon={
                    <CheckCircle2 />
                  }
                  label={`${cpdPoints} CPD points`}
                />
              ) : null}
            </div>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              <Link
                href="/member/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-700"
              >
                Register for Event
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/events"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-6 text-sm font-extrabold text-slate-700 shadow-sm backdrop-blur transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E]"
              >
                <ArrowLeft className="h-4 w-4" />
                All Events
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fade into main content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-20" />
    </section>
  );
}

function HeroPill({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2.5 text-xs font-extrabold text-slate-700 shadow-sm backdrop-blur">
      <span className="shrink-0 text-[#C8102E] [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>

      <span className="truncate">{label}</span>
    </span>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E] [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>

      <div className="min-w-0 pt-0.5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-extrabold leading-6 text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function CompactInfo({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E] [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold leading-6 text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function EventBreadcrumb({
  title,
}: {
  title: string;
}) {
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
        className="max-w-[260px] truncate text-[#C8102E] sm:max-w-md"
        aria-current="page"
      >
        {title}
      </span>
    </nav>
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

function EventJsonLd({
  event,
}: {
  event: {
    title: string;
    slug: string;
    description: string;
    eventDate: Date;
    endDate: Date | null;
    imageUrl: string | null;
    venue: string | null;
    fee: number | null;
    capacity: number | null;
    _count: {
      registrations: number;
    };
  };
}) {
  const fullyBooked =
    event.capacity !== null &&
    event._count.registrations >=
    event.capacity;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `https://ahpk.or.ke/events/${event.slug}#event`,
    url: `https://ahpk.or.ke/events/${event.slug}`,
    name: event.title,
    description: excerpt(
      event.description,
      200,
    ),
    startDate: event.eventDate.toISOString(),
    endDate:
      event.endDate?.toISOString() ||
      undefined,
    image:
      event.imageUrl ||
      "https://ahpk.or.ke/events-hero.webp",
    eventStatus:
      "https://schema.org/EventScheduled",
    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    location: event.venue
      ? {
        "@type": "Place",
        name: event.venue,
      }
      : undefined,

    organizer: {
      "@type": "Organization",
      name: "Association of Hotel Professionals Kenya",
      url: "https://ahpk.or.ke",
    },

    offers: {
      "@type": "Offer",
      price: event.fee ?? 0,
      priceCurrency: "KES",
      availability: fullyBooked
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      url: `https://ahpk.or.ke/events/${event.slug}`,
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

function formatCategory(category: string) {
  return category
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}
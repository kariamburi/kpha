// app/events/[slug]/page.tsx
import type { CSSProperties } from "react";
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
} from "lucide-react";
import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { prisma } from "@/lib/prisma";
import { dateRange, excerpt, feeText } from "@/app/lib/public-content";
import NewsCarousel from "@/app/components/public/NewsCarousel";

type EventPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event: any = await prisma.event.findFirst({
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

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await prisma.event.findFirst({
    where: { slug, published: true },
    include: { _count: { select: { registrations: true } } },
  });
  if (!event) notFound();

  const registrations = event._count.registrations;
  const isFullyBooked = event.capacity !== null && registrations >= event.capacity;
  const relatedEvents = await prisma.event.findMany({
    where: { published: true, id: { not: event.id }, category: event.category },
    orderBy: { eventDate: "asc" },
    take: 12,
  });
  const bookingHref = `/events/${event.slug}/book`;

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <EventJsonLd event={event} />
      <PageHeader />

      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm">
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[#C8102E]"><Home className="h-4 w-4" />Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <Link href="/events" className="hover:text-[#C8102E]">Events</Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span aria-current="page" className="max-w-[260px] truncate text-[#C8102E] sm:max-w-xl">{event.title}</span>
          </nav>
          <div className="mt-4 max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#C8102E]">{formatCategory(event.category)}</p>
            <h1 className="mt-1.5 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">{event.title}</h1>
            <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-slate-600 sm:text-base sm:leading-7">
              {excerpt(event.description, 210)}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-600">
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#C8102E]" />{dateRange(event.eventDate, event.endDate)}</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[#C8102E]" />{event.venue || "Venue to be announced"}</span>
              <span className="inline-flex items-center gap-2"><Ticket className="h-4 w-4 text-[#C8102E]" />{feeText(event.fee)}</span>
              {event.cpdPoints ? <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C8102E]" />{event.cpdPoints} CPD points</span> : null}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pt-5 sm:px-6 lg:px-8">
        <div className="aspect-[16/7] max-h-[440px] w-full overflow-hidden bg-slate-100">
          <img src={event.imageUrl || "/events-hero.webp"} alt={event.title} className="h-full w-full object-cover" />
        </div>
      </div>

      <section className="py-7 sm:py-9">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-start lg:gap-9 lg:px-8">
          <article className="min-w-0">
            <div className="border-t-4 border-[#C8102E] pt-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-950">About This Event</h2>
              <div className="mt-3 whitespace-pre-line text-[15px] font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">{event.description}</div>
            </div>
            <div className="mt-6 border-t border-slate-200 pt-4 lg:hidden">
              <EventBooking fee={feeText(event.fee)} isFullyBooked={isFullyBooked} href={bookingHref} />
            </div>
            <Link href="/events" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E] hover:underline">
              <ArrowLeft className="h-4 w-4" /> Browse More Events
            </Link>
          </article>
          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <div className="border-t-4 border-[#C8102E] bg-slate-50 p-5">
              <EventBooking fee={feeText(event.fee)} isFullyBooked={isFullyBooked} href={bookingHref} />
            </div>
          </aside>
        </div>
      </section>

      {relatedEvents.length > 0 ? (
        <section className="border-t border-slate-200 bg-slate-50 py-7 sm:py-9">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-black tracking-tight text-slate-950">More AHPK Events</h2>
              <Link href="/events" className="inline-flex items-center gap-2 text-sm font-bold text-[#C8102E]">View all events <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-4">
              <NewsCarousel basePath="/events" actionLabel="View event" news={relatedEvents.map((relatedEvent) => ({
                id: relatedEvent.id,
                slug: relatedEvent.slug,
                imageUrl: relatedEvent.imageUrl,
                title: relatedEvent.title,
                description: excerpt(relatedEvent.description, 140),
                date: dateRange(relatedEvent.eventDate, relatedEvent.endDate),
              }))} />
            </div>
          </div>
        </section>
      ) : null}
      <PublicFooter />
    </main>
  );
}

function EventBooking({ fee, isFullyBooked, href }: {
  fee: string;
  isFullyBooked: boolean;
  href: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-black text-slate-950">Event Registration</h2>
      <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-700"><Ticket className="h-4 w-4 text-[#C8102E]" />{fee}</p>
      {isFullyBooked ? (
        <p className="mt-4 border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-extrabold text-amber-700">Event Fully Booked</p>
      ) : (
        <Link href={href} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#C8102E] px-5 text-sm font-extrabold text-white transition hover:bg-red-800">
          Book This Event <ArrowRight className="h-4 w-4" />
        </Link>
      )}
      <p className="mt-2 text-xs leading-5 text-slate-500">Complete your registration online.</p>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl" style={{ "--header-height": "88px" } as CSSProperties}>
      <div className="mx-auto flex h-[82px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="AHPK homepage" className="shrink-0">
          <Image src={Logo} alt="Association of Hotel Professionals Kenya" width={92} height={92} priority className="h-[66px] w-[66px] object-contain sm:h-[72px] sm:w-[72px]" />
        </Link>
        <div className="ml-auto flex items-center"><DesktopNavigation /></div>
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
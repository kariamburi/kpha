import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { dateRange, feeText } from "@/app/lib/public-content";
import EventBookingForm from "./EventBookingForm";

type BookingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BookingPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = await prisma.event.findFirst({
    where: {
      slug,
      published: true,
    },
    select: {
      title: true,
      description: true,
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

  return {
    title: `Book ${event.title} | AHPK`,
    description: `Complete your registration for ${event.title}.`,
  };
}

export default async function EventBookingPage({
  params,
}: BookingPageProps) {
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

  const isFullyBooked =
    event.capacity !== null &&
    registrations >= event.capacity;

  const remainingPlaces =
    event.capacity !== null
      ? Math.max(event.capacity - registrations, 0)
      : null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-600 transition hover:text-[#C8102E]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to event
          </Link>

          <div className="mt-8 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
              AHPK event registration
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Book Your Place
            </h1>

            <p className="mt-4 text-lg font-medium leading-8 text-slate-600">
              Complete the registration form below to reserve your place for{" "}
              <strong className="text-slate-900">
                {event.title}
              </strong>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:px-8">
          <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Participant information
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Registration Form
              </h2>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                Enter the details of the person attending the event.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {isFullyBooked ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <h2 className="text-xl font-black text-amber-800">
                    This event is fully booked
                  </h2>

                  <p className="mt-2 text-sm font-semibold leading-7 text-amber-700">
                    Registration is no longer available because all places
                    have been reserved.
                  </p>

                  <Link
                    href={`/events/${event.slug}`}
                    className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-700 px-5 text-sm font-extrabold text-white"
                  >
                    Return to Event
                  </Link>
                </div>
              ) : (
                <EventBookingForm
                  eventId={event.id}
                  eventSlug={event.slug}
                  eventTitle={event.title}
                  fee={event.fee ?? 0}
                />
              )}
            </div>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
              {event.imageUrl ? (
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}

              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                  Booking summary
                </p>

                <h2 className="mt-3 text-xl font-black leading-tight text-slate-950">
                  {event.title}
                </h2>

                <div className="mt-6 space-y-5">
                  <SummaryItem
                    icon={<Clock3 />}
                    label="Date and time"
                    value={dateRange(
                      event.eventDate,
                      event.endDate,
                    )}
                  />

                  <SummaryItem
                    icon={<MapPin />}
                    label="Venue"
                    value={
                      event.venue ||
                      "Venue to be announced"
                    }
                  />

                  <SummaryItem
                    icon={<Ticket />}
                    label="Booking amount"
                    value={feeText(event.fee)}
                  />

                  <SummaryItem
                    icon={<Users />}
                    label="Availability"
                    value={
                      remainingPlaces !== null
                        ? `${remainingPlaces} ${remainingPlaces === 1
                          ? "place"
                          : "places"
                        } remaining`
                        : "Registration available"
                    }
                  />

                  {event.cpdPoints ? (
                    <SummaryItem
                      icon={<CheckCircle2 />}
                      label="CPD points"
                      value={`${event.cpdPoints} CPD points`}
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
              <CalendarDays className="h-6 w-6 text-[#C8102E]" />

              <h2 className="mt-4 text-lg font-black text-slate-950">
                Secure Online Booking
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                Paid event registrations are processed securely through
                Paystack. You will receive a payment confirmation after
                successful verification.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E] [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>

      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-extrabold leading-6 text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}
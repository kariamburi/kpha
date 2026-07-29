import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { EmptyState, PublicContentLayout } from "@/app/components/site/public-content-layout";
import { dateRange } from "@/app/lib/public-content";

export const metadata: Metadata = {
  title: "Event Calendar | AHPK",
  description: "View upcoming AHPK hospitality events by month.",
  alternates: { canonical: "/events/calendar" },
};

export default async function CalendarPage() {
  const events = await prisma.event.findMany({
    where: { published: true, eventDate: { gte: new Date() } },
    orderBy: { eventDate: "asc" },
  });

  const groups = events.reduce<Record<string, typeof events>>((all, event) => {
    const key = new Intl.DateTimeFormat("en-KE", { month: "long", year: "numeric" }).format(event.eventDate);
    (all[key] ??= []).push(event);
    return all;
  }, {});

  return (
    <PublicContentLayout eyebrow="Plan Ahead" title="Event Calendar" description="Browse all scheduled AHPK professional events by month.">
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {events.length === 0 ? (
          <EmptyState title="No upcoming calendar entries" text="Published events will appear here automatically." />
        ) : (
          <div className="space-y-10">
            {Object.entries(groups).map(([month, items]) => (
              <section key={month}>
                <h2 className="mb-4 flex items-center gap-3 text-2xl font-black"><CalendarDays className="text-[#C1121F]" />{month}</h2>
                <div className="space-y-3">
                  {items.map((event) => (
                    <Link key={event.id} href={`/events/${event.slug}`} className="grid gap-4 rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md sm:grid-cols-[80px_1fr_auto] sm:items-center">
                      <div className="rounded-xl bg-slate-950 p-3 text-center text-white">
                        <div className="text-2xl font-black">{new Intl.DateTimeFormat("en-KE", { day: "2-digit" }).format(event.eventDate)}</div>
                        <div className="text-[10px] font-black uppercase">{new Intl.DateTimeFormat("en-KE", { weekday: "short" }).format(event.eventDate)}</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-black">{event.title}</h3>
                        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-500"><MapPin className="size-4 text-[#C1121F]" />{event.venue || "Venue to be announced"}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-600">{dateRange(event.eventDate, event.endDate)}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </PublicContentLayout>
  );
}

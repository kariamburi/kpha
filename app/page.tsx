import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "./components/public/PublicNavbar";
import PublicFooter from "./components/public/PublicFooter";
import {
  BadgeCheck,
  CalendarDays,
  FileCheck,
  FileText,
  GraduationCap,
  LogIn,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { Metadata } from "next";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
export const metadata: Metadata = {
  title: "Association of Hotel Professionals Kenya",
  description:
    "The official website of the Association of Hotel Professionals Kenya, supporting hospitality professionals through membership, certification, CPD, ethics, and professional development.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [page, news, events, resources, leaders] = await Promise.all([
    prisma.websitePage.findUnique({ where: { slug: "home" } }),

    prisma.newsPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),

    prisma.event.findMany({
      where: { published: true },
      orderBy: { eventDate: "asc" },
      take: 3,
    }),

    prisma.resource.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),

    prisma.leader.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 4,
    }),
  ]);

  const heroImage = page?.imageUrl || "/login-hero.png";

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PublicNavbar />

      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/75 to-[#111111]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:py-28">
          <p className="text-sm font-black uppercase tracking-[0.45em] text-[#F3C64E]">
            AHPK Digital Portal
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {page?.title || "Empowering Hospitality Professionals in Kenya"}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/80">
            {page?.subtitle ||
              "Apply, renew, verify certificates, access CPD events and manage your professional membership in one secure digital portal."}
          </p>

          <div className="mx-auto items-center mt-10 max-w-6xl rounded-[32px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
              <form action="/directory" className="rounded-[24px] bg-white p-2 shadow-xl">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    {/**    <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />*/}

                    <input
                      name="q"
                      placeholder="Search member by name or member number..."
                      className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#C1121F] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex h-16 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-6 text-sm font-black text-white transition hover:bg-red-800"
                  >
                    <Search className="h-5 w-5 text-white" />
                    Search Member
                  </button>
                </div>
              </form>
            </div>

            <div className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-2 justify-items-center gap-3 md:grid-cols-3 lg:flex lg:flex-nowrap lg:items-center lg:justify-center lg:gap-6">
              <ServiceCard title="Apply" href="/apply" icon={UserPlus} />
              <ServiceCard title="Member Login" href="/member/login" icon={LogIn} />
              <ServiceCard title="Verify Certificate" href="/verify" icon={BadgeCheck} />
              <ServiceCard title="Events & CPD" href="/events" icon={CalendarDays} />
              <ServiceCard title="Resources" href="/resources" icon={FileText} />
              <ServiceCard title="Member Directory" href="/directory" icon={Users} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          <Feature
            icon={Users}
            title="Professional Membership"
            text="Apply, renew and manage your AHPK membership through a modern digital portal."
          />
          <Feature
            icon={FileCheck}
            title="Digital Certificates"
            text="Access membership certificates and allow employers or the public to verify authenticity."
          />
          <Feature
            icon={GraduationCap}
            title="CPD & Industry Events"
            text="Discover trainings, workshops and continuous professional development opportunities."
          />
        </div>
      </section>

      <section className="bg-[#F4F6F8] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader label="Latest Updates" title="News & Announcements" href="/news" />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {news.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-48 bg-slate-100">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-wide text-[#C1121F]">

                    {formatDate(post.createdAt)}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-slate-950">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm font-semibold leading-7 text-slate-500">
                    {post.excerpt || post.content}
                  </p>
                </div>
              </Link>
            ))}

            {news.length === 0 && <EmptyCard text="No news published yet." />}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          label="Professional Development"
          title="Upcoming Events & CPD"
          href="/events"
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden bg-slate-100">
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-red-50 text-[#C1121F]">
                    <CalendarDays className="h-14 w-14" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <p className="text-sm font-black text-[#C1121F]">
                  {formatDate(event.eventDate)}
                </p>

                <h3 className="mt-3 text-xl font-black text-slate-950">
                  {event.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm font-semibold leading-7 text-slate-500">
                  {event.description}
                </p>
              </div>
            </Link>
          ))}

          {events.length === 0 && <EmptyCard text="No events published yet." />}
        </div>
      </section>

      <section className="bg-[#111111] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            dark
            label="Resources Centre"
            title="Policies, Forms & Guides"
            href="/resources"
          />

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={resource.fileUrl}
                target="_blank"
                className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur transition hover:bg-white/15"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#F3C64E]">
                  <FileText className="h-6 w-6" />
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-wide text-[#F3C64E]">
                  {resource.category || "Resource"}
                </p>

                <h3 className="mt-3 text-lg font-black">{resource.title}</h3>

                <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-white/60">
                  {resource.description || "Download resource document."}
                </p>
              </Link>
            ))}

            {resources.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white/60">
                No resources published yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F6F8] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-[32px] bg-[#C1121F] text-white shadow-xl">
            <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center lg:p-12">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.35em] text-[#F3C64E]">
                  Join AHPK Today
                </p>

                <h2 className="mt-3 text-3xl font-black">
                  Advance your hospitality career with verified professional
                  membership.
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/80">
                  {page?.content ||
                    "AHPK provides a digital platform for applications, renewals, certificate verification and member services."}
                </p>
              </div>

              <Link
                href="/apply"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#C1121F] transition hover:bg-[#F3C64E]"
              >
                <UserPlus className="h-4 w-4" />
                Start Application
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

function ServiceCard({
  title,
  href,
  icon: Icon,
}: {
  title: string;
  href: string;
  icon: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[78px] w-full max-w-[150px] flex-col items-center justify-center rounded-2xl px-2 text-center transition hover:bg-white/10 lg:w-[120px]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition group-hover:bg-[#C1121F]">
        <Icon className="h-5 w-5" />
      </span>

      <span className="mt-2 text-[12px] font-black leading-tight text-white">
        {title}
      </span>
    </Link>
  );
}

function Feature({
  title,
  text,
  icon: Icon,
}: {
  title: string;
  text: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mt-6 text-2xl font-black text-slate-950">{title}</h3>

      <p className="mt-4 text-sm font-semibold leading-7 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function SectionHeader({
  label,
  title,
  href,
  dark,
}: {
  label: string;
  title: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p
          className={`text-sm font-black uppercase tracking-[0.35em] ${dark ? "text-[#F3C64E]" : "text-[#C1121F]"
            }`}
        >
          {label}
        </p>

        <h2
          className={`mt-2 text-3xl font-black ${dark ? "text-white" : "text-slate-950"
            }`}
        >
          {title}
        </h2>
      </div>

      <Link
        href={href}
        className={`text-sm font-black ${dark ? "text-white hover:text-[#F3C64E]" : "text-[#C1121F]"
          }`}
      >
        View all →
      </Link>
    </div>
  );
}

function EmptyCard({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm font-bold text-slate-500">
      {text}
    </div>
  );
}
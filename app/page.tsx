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
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#C1121F]/50" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.45em] text-[#F3C64E]">
              AHPK Digital Portal
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {page?.title || "Empowering Hospitality Professionals in Kenya"}
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/80">
              {page?.subtitle ||
                "Apply, renew, verify certificates, access CPD events and manage your professional membership in one secure digital portal."}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-8 py-4 text-sm font-black text-white shadow-xl transition hover:bg-red-800"
              >
                <UserPlus className="h-4 w-4" />
                Apply for Membership
              </Link>

              <Link
                href="/verify"
                className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#111111] transition hover:bg-[#F3C64E]"
              >
                <ShieldCheck className="h-4 w-4" />
                Verify Certificate
              </Link>

              <Link
                href="/member/login"
                className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
              >
                <LogIn className="h-4 w-4" />
                Member Login
              </Link>
            </div>
          </div>

          <div className="mt-12 max-w-6xl rounded-[30px] border border-white/10 bg-[#111827]/85 p-5 shadow-2xl backdrop-blur-xl">

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
              <ServiceCard title="Apply" href="/apply" icon={UserPlus} />
              <ServiceCard title="Member Login" href="/member/login" icon={LogIn} />
              <ServiceCard title="Verify Certificate" href="/verify" icon={BadgeCheck} />
              <ServiceCard title="Events & CPD" href="/events" icon={CalendarDays} />
              <ServiceCard title="Resources" href="/resources" icon={FileText} />
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
      className="group flex h-[86px] flex-col items-center justify-center rounded-2xl text-center transition hover:bg-white/10"
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
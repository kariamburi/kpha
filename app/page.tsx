import Link from "next/link";
import type { Metadata } from "next";
import type { ElementType } from "react";

import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  FileText,
  Handshake,
  LogIn,
  LucideIcon,
  Quote,
  Search,
  ShieldCheck,
  Target,
  UserPlus,
  Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import PublicFooter from "./components/public/PublicFooter";
import PublicHero from "./components/public/PublicHero";
import { DesktopNavigation } from "./components/site/desktop-navigation";
import PublicHeroLignt from "./components/public/PublicHeroLight";
import ProfessionalStandardsSlider from "./components/public/ProfessionalStandardsSlider";
import NewsCarousel from "./components/public/NewsCarousel";

export const metadata: Metadata = {
  title: "Association of Hotel Professionals Kenya",
  description:
    "The official website of the Association of Hotel Professionals Kenya, supporting hospitality professionals through membership, certification, CPD, ethics and professional development.",
  alternates: {
    canonical: "/",
  },
};

const professionalStandards = [
  {
    icon: Award,
    title: "Professional Attitude & Behaviour",
    description:
      "Promoting integrity, competence, responsibility and professional conduct in hospitality practice.",
    href: "/professional-standards/professional-attitude",
  },
  {
    icon: Handshake,
    title: "Relationships with Clients",
    description:
      "Encouraging honest, respectful and high-quality service in every professional client relationship.",
    href: "/professional-standards/client-relationships",
  },
  {
    icon: Users,
    title: "Professional Relationships",
    description:
      "Building constructive relationships among professionals, employers, institutions and industry partners.",
    href: "/professional-standards/professional-relationships",
  },
  {
    icon: ShieldCheck,
    title: "Ethics & Accountability",
    description:
      "Supporting ethical conduct, responsible leadership and professional accountability across the industry.",
    href: "/professional-standards/code-of-conduct",
  },
];

const purposePoints = [
  "Promote professionalism in Kenya’s hospitality industry",
  "Support continuous professional development",
  "Encourage ethical conduct and accountability",
  "Provide professional recognition to members",
  "Represent hospitality professionals in industry discussions",
  "Create networking and collaboration opportunities",
];

function formatDate(date: Date) {
  return date.toLocaleDateString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function Home() {
  const [page, news, events, leaders] = await Promise.all([
    prisma.websitePage.findUnique({
      where: { slug: "home" },
    }),
    prisma.newsPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 12,
    }),
    prisma.event.findMany({
      where: { published: true },
      orderBy: { eventDate: "asc" },
      take: 12,
    }),
    prisma.leader.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 4,
    }),
  ]);

  const welcomeTitle =
    page?.title || "Welcome to the Association of Hotel Professionals Kenya";

  const welcomeText =
    page?.content ||
    "AHPK is a professional association committed to advancing hospitality standards, ethical leadership, continuous development and industry collaboration in Kenya.";
  const quickServices = [
    {
      title: "Apply",
      href: "/apply",
      icon: UserPlus,
    },
    {
      title: "Member Login",
      href: "/member/login",
      icon: LogIn,
    },
    {
      title: "Verify Certificate",
      href: "/verify",
      icon: BadgeCheck,
    },
    {
      title: "Membership Renewal",
      href: "/member/renewal",
      icon: CalendarDays,
    },
    {
      title: "Events",
      href: "/events",
      icon: FileText,
    },
    {
      title: "Member Directory",
      href: "/directory",
      icon: Users,
    },
  ];
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <PublicHeroLignt welcomeTitle={welcomeTitle} welcomeText={welcomeText} />

      {/*<ProfessionalStandardsSlider />*/}



      <section className="relative overflow-hidden bg-slate-50 py-0 sm:py-2">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-20 h-64 w-64 rounded-full bg-red-100/45 blur-2xl" />
          <div className="absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-slate-200/60 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <CenteredSectionHeader
            label="Who We Are"
            title="A professional association serving Kenya’s hospitality industry"
            description="AHPK brings together hospitality professionals and practitioners committed to professional recognition, ethical practice, stronger industry standards and sustainable growth."
          />

          {/* Purpose and representation cards */}
          <div className="mt-3">
            <div className="overflow-hidden">
              <div className="grid">


                {/* QUICK SERVICES */}
                <div className="p-1 sm:p-2 lg:p-3">
                  <div className="mb-2 flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center justify-center text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C1121F]">
                        Quick access
                      </p>

                      <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                        Member services
                      </h2>
                    </div>


                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                    {quickServices.map(
                      (service) => (
                        <HeroServiceCard
                          key={
                            service.href
                          }
                          title={
                            service.title
                          }
                          href={
                            service.href
                          }
                          icon={
                            service.icon
                          }
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main association description */}

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-300 bg-white">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
              {/* Highlight panel */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#C8102E] to-[#8E0C22] p-6 text-white sm:p-7">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-black/10" />

                <div className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/70">
                    About the Association
                  </p>

                  <h3 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
                    Bringing together professionals and practitioners in Kenya’s hotel
                    and hospitality industry
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-7 text-white/80">
                    The Association of Hotel Professionals Kenya is a professional
                    body whose membership is drawn from key individual professionals
                    and practitioners in the hotel and hospitality industry.
                  </p>


                </div>
              </div>

              {/* Full description */}
              <div className="p-5 sm:p-6 lg:p-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C8102E]">
                  About the Association
                </p>



                <div className="mt-4 space-y-3 text-sm font-medium leading-7 text-slate-600 sm:text-base">


                  <p>
                    The Association is registered under the Societies Act and exists
                    to regulate, lobby for and safeguard the professional interests of
                    its members. It provides a recognised voice for professionals who
                    are actively employed, retired from service or working in
                    consultancy...
                  </p>

                  <p>
                    AHPK also reaches out to institutions of higher learning that
                    prepare undergraduate and professional students to join the
                    industry. Hospitality is one of the world’s fastest-growing
                    sectors and remains a major contributor to employment, economic
                    development and social progress.
                  </p>

                  <p>
                    The Association advocates for high standards of service delivery
                    and supports the development of training institutions that meet
                    internationally recognised hospitality standards, helping
                    strengthen Kenya’s position as a preferred tourism destination.
                  </p>
                </div>

                <div className="mt-5">
                  <Link
                    href="/about/who-we-are"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A80D27]"
                  >
                    Read More About Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>


          {/* Full description  <div className="mt-2 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">

          
            <div className="p-3 flex flex-col items-center justify-center text-center justify-center items-center sm:p-9 lg:p-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C8102E]">
                About the Association
              </p>

              <h3 className="mt-3 text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
                Bringing together professionals and practitioners in Kenya’s hotel
                and hospitality industry
              </h3>

              <div className="mt-4 space-y-3 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                <p>
                  The Association of Hotel Professionals Kenya is a professional
                  body whose membership is drawn from key individual professionals
                  and practitioners in the hotel and hospitality industry.
                </p>

                <p>
                  The Association is registered under the Societies Act and exists
                  to regulate, lobby for and safeguard the professional interests of
                  its members. It provides a recognised voice for professionals who
                  are actively employed, retired from service or working in
                  consultancy.
                </p>

                <p>
                  AHPK also reaches out to institutions of higher learning that
                  prepare undergraduate and professional students to join the
                  industry. Hospitality is one of the world’s fastest-growing
                  sectors and remains a major contributor to employment, economic
                  development and social progress.
                </p>

                <p>
                  The Association advocates for high standards of service delivery
                  and supports the development of training institutions that meet
                  internationally recognised hospitality standards, helping
                  strengthen Kenya’s position as a preferred tourism destination.
                </p>
              </div>

              <div className="mt-5">
                <Link
                  href="/about/who-we-are"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#A80D27]"
                >
                  Read More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>*/}

          {/* Key areas */}
          <div className="mt-4 rounded-xl border border-slate-300 bg-white p-5 sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C8102E]">
                What AHPK promotes
              </p>

              <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                Strengthening professionalism across the hospitality industry
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {purposePoints.map((point) => (
                <InformationPoint key={point} text={point} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/** 
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            label="Leadership"
            title="The Board of Management"
            description="Meet the professionals entrusted with the governance, strategic direction and stewardship of AHPK."
            href="/about/leadership/board"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.length > 0 ? (
              leaders.map((leader: any) => (
                <article
                  key={leader.id}
                  className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-72 overflow-hidden bg-slate-100">

                    {leader.imageUrl ? (
                      <img
                        src={leader.imageUrl}
                        alt={leader.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-red-50 text-[#C8102E]">
                        <Users className="h-16 w-16" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-lg font-extrabold text-slate-950">
                      {leader.name}
                    </h3>
                    <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#C8102E]">
                      {leader.position}
                    </p>
                    {leader.bio && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {leader.bio}
                      </p>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <EmptyCard text="Leadership profiles will appear here once published." />
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionLabel>Professional Membership</SectionLabel>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                Join a recognised professional community.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                Build professional credibility, access development
                opportunities and connect with hospitality professionals who
                share your commitment to quality and integrity.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/apply"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white transition hover:bg-[#A80D27]"
                >
                  Apply for Membership
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/members-section/constitution-rules/membership"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/5 px-6 text-sm font-extrabold text-white transition hover:bg-white hover:text-slate-950"
                >
                  Explore Membership
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard value="Professional" label="Recognition" icon={BadgeCheck} />
              <StatCard value="Continuous" label="Development" icon={Award} />
              <StatCard value="Industry" label="Networking" icon={Users} />
              <StatCard value="Ethical" label="Standards" icon={ShieldCheck} />
            </div>
          </div>
        </div>
      </section>
*/}
      <section className="bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            label="Latest Updates"
            title="News from AHPK"
            description="Follow association announcements, industry updates and professional stories."
            href="/news"
          />

          <div className="mt-5">
            {news.length > 0 ? (
              <NewsCarousel
                basePath="/news"
                actionLabel="Read article"
                news={news.map((post: any) => ({
                  id: post.id,
                  slug: post.slug,
                  imageUrl: post.imageUrl,
                  title: post.title,
                  description:
                    post.excerpt ||
                    post.content ||
                    "Read the latest update from AHPK.",
                  date: formatDate(post.createdAt),
                }))}
              />
            ) : (
              <EmptyCard text="Published news will appear here." />
            )}

          </div>
        </div>
      </section>

      <section className="bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            label="Events & CPD"
            title="Upcoming programmes"
            description="Participate in events, workshops and continuous professional development opportunities."
            href="/events"
          />

          <div className="mt-5">
            {events.length > 0 ? (
              <NewsCarousel
                basePath="/events"
                actionLabel="View event"
                news={events.map((event: any) => ({
                  id: event.id,
                  slug: event.slug,
                  imageUrl: event.imageUrl,
                  title: event.title,
                  description:
                    event.description ||
                    "View details for this AHPK event.",
                  date: formatDate(event.eventDate),
                }))}
              />) : (
              <EmptyCard text="Upcoming events will appear here once published." />
            )}
          </div>
        </div>
      </section>



      {/** <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#C8102E] to-[#8E0C22] px-7 py-12 text-white shadow-2xl sm:px-10 lg:px-14 lg:py-16">
            <Quote className="absolute right-8 top-8 h-20 w-20 text-white/10" />

            <div className="relative max-w-4xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/75">
                Become part of AHPK
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                Strengthen your professional profile and help shape the future of hospitality.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/85">
                Join a community committed to ethical practice, continuous learning and professional excellence.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/apply"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-[#C8102E] transition hover:bg-slate-100"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-extrabold text-white transition hover:bg-white hover:text-slate-950"
                >
                  Contact AHPK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <PublicFooter />
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C8102E]">
      {children}
    </p>
  );
}

function InformationPoint({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />
      <p className="text-sm font-bold leading-6 text-slate-700">{text}</p>
    </div>
  );
}


function HeroServiceCard({
  title,
  href,
  icon: Icon,
}: {
  title: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-[88px] flex-col justify-between rounded-lg border border-slate-300 bg-white p-3 transition duration-300 hover:border-[#C1121F] hover:bg-red-50/40"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-red-50 text-[#C1121F] transition group-hover:bg-[#C1121F] group-hover:text-white">
        <Icon
          className="h-5 w-5"
          aria-hidden="true"
        />
      </span>

      <span className="mt-3 flex items-end justify-between gap-2">
        <span className="text-sm font-extrabold leading-5 text-slate-900 transition group-hover:text-[#C1121F]">
          {title}
        </span>

        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#C1121F]" />
      </span>
    </Link>
  );
}
function EventCard({ href, image, title, description, date }: { href: string; image: string | null; title: string; description: string; date: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-red-50 text-[#C8102E]">
            <CalendarDays className="h-14 w-14" />
          </div>
        )}
        <div className="absolute bottom-4 left-4 rounded-xl bg-white px-4 py-3 shadow-lg">
          <p className="text-xs font-extrabold uppercase tracking-wide text-[#C8102E]">{date}</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="line-clamp-2 text-xl font-extrabold leading-snug text-slate-950">{title}</h3>
        <p className="mt-3 line-clamp-3 text-sm font-medium leading-7 text-slate-600">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
          View event
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function SectionHeader({ label, title, description, href }: { label: string; title: string; description: string; href: string }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600 sm:text-base">{description}</p>
      </div>
      <Link href={href} className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#C8102E] transition hover:text-[#8E0C22]">
        View all
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function CenteredSectionHeader({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}

function EmptyCard({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-7 text-center text-sm font-bold text-slate-500">
      {text}
    </div>
  );
}
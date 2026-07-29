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
  Quote,
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
      take: 3,
    }),
    prisma.event.findMany({
      where: { published: true },
      orderBy: { eventDate: "asc" },
      take: 3,
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

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <PublicHeroLignt />

      <ProfessionalStandardsSlider />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="relative overflow-hidden rounded-[30px] bg-slate-100 shadow-xl">
            <img
              src="/welcome.webp"
              alt="Hospitality professionals"
              className="h-[420px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/92 p-5 shadow-lg backdrop-blur-md">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C8102E]">
                AHPK at a glance
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                Recognition, professional growth, ethical standards and a
                stronger hospitality community.
              </p>
            </div>
          </div>

          <div>
            <SectionLabel>Welcome to AHPK</SectionLabel>

            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              {welcomeTitle}
            </h2>

            <div className="mt-6 space-y-5 text-base font-medium leading-8 text-slate-600">
              <p>{welcomeText}</p>
              <p>
                We bring together hospitality professionals, educators,
                managers and industry leaders who are committed to quality,
                credibility and responsible professional practice.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about/who-we-are"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white transition hover:bg-[#A80D27]"
              >
                Discover AHPK
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/apply"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-extrabold text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
              >
                Become a Member
                <UserPlus className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-red-100/50 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-slate-200/70 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <CenteredSectionHeader
            label="Who We Are"
            title="A professional association serving Kenya’s hospitality industry"
            description="AHPK brings together hospitality professionals and practitioners committed to professional recognition, ethical practice, stronger industry standards and sustainable growth."
          />

          {/* Purpose and representation cards */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <PurposeCard
              icon={Target}
              label="Professional Standards"
              title="Promoting recognised academic and professional standards"
              description="AHPK supports the development and re-introduction of strategic processes that establish appropriate academic, ethical and professional requirements for people working in institutions that manage hotels and hospitality facilities."
              href="/about/our-purpose"
            />

            <PurposeCard
              icon={Handshake}
              label="Industry Representation"
              title="Providing a professional voice for hospitality practitioners"
              description="The Association represents the interests of hospitality professionals by engaging industry institutions, public agencies, employers, training institutions and other professional bodies on matters affecting the sector."
              href="/about/our-objectives"
            />
          </div>

          {/* Main association description */}
          <div className="mt-10 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
              {/* Highlight panel */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#C8102E] to-[#8E0C22] p-8 text-white sm:p-10">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-black/10" />

                <div className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/70">
                    Our professional community
                  </p>

                  <h3 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                    Supporting hospitality professionals throughout their careers
                  </h3>

                  <p className="mt-5 text-sm font-medium leading-7 text-white/80">
                    Membership is drawn from active professionals, retired
                    practitioners, consultants, educators, managers and institutions
                    preparing future professionals to enter the hospitality industry.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                      <Users className="h-6 w-6 text-white" />
                      <p className="mt-3 text-sm font-extrabold">
                        Professional Community
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                      <ShieldCheck className="h-6 w-6 text-white" />
                      <p className="mt-3 text-sm font-extrabold">
                        Ethical Standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full description */}
              <div className="p-7 sm:p-9 lg:p-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C8102E]">
                  About the Association
                </p>

                <h3 className="mt-3 text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
                  Bringing together professionals and practitioners in Kenya’s hotel
                  and hospitality industry
                </h3>

                <div className="mt-6 space-y-5 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
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

                <div className="mt-8">
                  <Link
                    href="/about/who-we-are"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#A80D27]"
                  >
                    Read More About Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Key areas */}
          <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#C8102E]">
                What AHPK promotes
              </p>

              <h3 className="mt-3 text-2xl font-extrabold text-slate-950">
                Strengthening professionalism across the hospitality industry
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {purposePoints.map((point) => (
                <InformationPoint key={point} text={point} />
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            label="Latest Updates"
            title="News from AHPK"
            description="Follow association announcements, industry updates and professional stories."
            href="/news"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.length > 0 ? (
              news.map((post: any) => (
                <NewsCard
                  key={post.id}
                  href={`/news/${post.slug}`}
                  image={post.imageUrl}
                  title={post.title}
                  description={post.excerpt || post.content}
                  date={formatDate(post.createdAt)}
                />
              ))
            ) : (
              <EmptyCard text="Published news will appear here." />
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            label="Events & CPD"
            title="Upcoming programmes"
            description="Participate in events, workshops and continuous professional development opportunities."
            href="/events"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.length > 0 ? (
              events.map((event: any) => (
                <EventCard
                  key={event.id}
                  href={`/events/${event.slug}`}
                  image={event.imageUrl}
                  title={event.title}
                  description={event.description}
                  date={formatDate(event.eventDate)}
                />
              ))
            ) : (
              <EmptyCard text="Upcoming events will appear here once published." />
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
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
      </section>

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

function ServiceFeature({
  title,
  description,
  icon: Icon,
  href,
  number,
}: {
  title: string;
  description: string;
  icon: ElementType;
  href: string;
  number: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white hover:text-slate-950 hover:shadow-xl"
    >
      <span className="absolute right-5 top-4 text-5xl font-black text-white/10 transition group-hover:text-red-50">
        {number}
      </span>

      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#C8102E] transition group-hover:bg-[#C8102E] group-hover:text-white">
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-xl font-extrabold">{title}</h3>
        <p className="mt-4 text-sm font-medium leading-7 text-white/80 transition group-hover:text-slate-600">
          {description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold">
          Learn more
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function PurposeCard({
  icon: Icon,
  label,
  title,
  description,
  href,
}: {
  icon: ElementType;
  label: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-[#C8102E]/30 hover:shadow-xl"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E] transition group-hover:bg-[#C8102E] group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>
      <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C8102E]">
        {label}
      </p>
      <h3 className="mt-3 text-2xl font-extrabold text-slate-950">{title}</h3>
      <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
        {description}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
        Learn more
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: ElementType }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <Icon className="h-7 w-7 text-[#F4C84A]" />
      <p className="mt-5 text-2xl font-extrabold">{value}</p>
      <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
    </div>
  );
}

function NewsCard({ href, image, title, description, date }: { href: string; image: string | null; title: string; description: string; date: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-56 overflow-hidden bg-slate-100">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-red-50 text-[#C8102E]">
            <FileText className="h-14 w-14" />
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-[#C8102E]">{date}</p>
        <h3 className="mt-3 line-clamp-2 text-xl font-extrabold leading-snug text-slate-950">{title}</h3>
        <p className="mt-3 line-clamp-3 text-sm font-medium leading-7 text-slate-600">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
          Read article
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
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
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">{description}</p>
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
      <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h2>
      <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}

function EmptyCard({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm font-bold text-slate-500">
      {text}
    </div>
  );
}
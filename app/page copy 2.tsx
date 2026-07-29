import Link from "next/link";
import type { Metadata } from "next";
import type { ElementType } from "react";

import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  FileCheck,
  FileText,
  GraduationCap,
  Handshake,
  Quote,
  ShieldCheck,
  Target,
  UserPlus,
  Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import PublicNavbar from "./components/public/PublicNavbar";
import PublicFooter from "./components/public/PublicFooter";
import HomeHeroSlider from "./components/public/HomeHeroSlider";

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
      "Members are expected to demonstrate integrity, competence, responsibility and professional conduct in their work.",
    href: "/professional-standards/professional-attitude",
  },
  {
    icon: Handshake,
    title: "Relationships with Clients",
    description:
      "Hospitality professionals should serve clients honestly, respectfully and with a commitment to quality service.",
    href: "/professional-standards/client-relationships",
  },
  {
    icon: Users,
    title: "Professional Relationships",
    description:
      "Members should build respectful and constructive relationships with colleagues, employers and industry partners.",
    href: "/professional-standards/professional-relationships",
  },
  {
    icon: ShieldCheck,
    title: "Ethics & Accountability",
    description:
      "AHPK promotes ethical conduct, professional accountability and responsible industry leadership.",
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

export default async function Home() {
  const [page, news, events, resources, leaders] = await Promise.all([
    prisma.websitePage.findUnique({
      where: {
        slug: "home",
      },
    }),

    prisma.newsPost.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),

    prisma.event.findMany({
      where: {
        published: true,
      },
      orderBy: {
        eventDate: "asc",
      },
      take: 3,
    }),

    prisma.resource.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    }),

    prisma.leader.findMany({
      where: {
        active: true,
      },
      orderBy: [
        {
          order: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      take: 4,
    }),
  ]);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <PublicNavbar />

      {/* HERO SLIDER 
      <HomeHeroSlider />*/}

      {/* WELCOME TO AHPK 
      <section className="relative overflow-hidden bg-white pb-20 pt-24 lg:pb-24 lg:pt-28">
        <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-red-50 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-[32px] shadow-2xl">
              <img
                src="/images/home/about-ahpk.jpg"
                alt="Hospitality professionals working together"
                className="h-[500px] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 left-4 right-4 rounded-2xl border border-white/80 bg-white p-5 shadow-xl sm:left-auto sm:right-7 sm:w-[290px]">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                  <BadgeCheck className="h-6 w-6" />
                </span>

                <div>
                  <p className="text-lg font-extrabold text-slate-950">
                    Professional Recognition
                  </p>

                  <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                    Supporting hospitality professionals across Kenya.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>Welcome to AHPK</SectionLabel>

            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              The professional home of Kenya&apos;s hospitality community
            </h2>

            <p className="mt-6 text-base font-medium leading-8 text-slate-600">
              The Association of Hotel Professionals Kenya brings together
              professionals working across hotels, restaurants, tourism,
              education, consultancy and other hospitality-related sectors.
            </p>

            <p className="mt-5 text-base font-medium leading-8 text-slate-600">
              AHPK provides a recognised platform through which hospitality
              professionals can build their careers, participate in industry
              development and contribute to improved professional standards
              and service delivery.
            </p>

            <p className="mt-5 text-base font-medium leading-8 text-slate-600">
              Our membership includes professionals who are employed,
              self-employed, retired, working as consultants or preparing to
              enter the hospitality profession through recognised training
              institutions.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InformationPoint text="Professional recognition" />
              <InformationPoint text="Industry representation" />
              <InformationPoint text="Ethics and accountability" />
              <InformationPoint text="Career development" />
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about/who-we-are"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-7 py-4 text-sm font-extrabold text-white transition hover:bg-[#A80D27]"
              >
                Discover AHPK
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/apply"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-extrabold text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
              >
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>*/}

      {/* CORE MEMBER SERVICES 
      <section className="bg-[#F7F9FC] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <CenteredSectionHeader
            label="Member Services"
            title="Supporting every stage of your professional journey"
            description="Access membership, certification, professional development and verified member services through the AHPK digital portal."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ServiceFeature
              icon={Users}
              number="01"
              title="Professional Membership"
              description="Apply, renew and manage your professional membership through a secure digital platform."
              href="/membership"
            />

            <ServiceFeature
              icon={FileCheck}
              number="02"
              title="Digital Certificates"
              description="Access your membership certificate and allow employers or the public to verify its authenticity."
              href="/verify"
            />

            <ServiceFeature
              icon={GraduationCap}
              number="03"
              title="Events & CPD"
              description="Participate in training, workshops, conferences and continuous professional development programmes."
              href="/events"
            />
          </div>
        </div>
      </section>*/}

      {/* OUR PURPOSE 
      <section className="relative overflow-hidden bg-white py-20 lg:py-24">
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-red-50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <SectionLabel>Our Purpose</SectionLabel>

            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              Advancing professionalism and excellence in hospitality
            </h2>

            <p className="mt-6 text-base font-medium leading-8 text-slate-600">
              AHPK exists to promote the professional development, recognition
              and welfare of individuals working within Kenya&apos;s hospitality
              industry.
            </p>

            <p className="mt-5 text-base font-medium leading-8 text-slate-600">
              The association works with hospitality businesses, training
              institutions, government organisations, professional bodies and
              other industry stakeholders to strengthen standards and support
              responsible industry growth.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {purposePoints.map((point) => (
                <InformationPoint key={point} text={point} />
              ))}
            </div>

            <Link
              href="/about/our-purpose"
              className="mt-9 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E] transition hover:text-[#8E0C22]"
            >
              Learn more about our purpose
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[32px] shadow-xl">
              <img
                src="/images/home/our-purpose.jpg"
                alt="Hospitality professionals attending an industry meeting"
                className="h-[520px] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-7 -left-3 max-w-[310px] rounded-2xl border border-white/80 bg-white p-6 shadow-xl sm:left-7">
              <Target className="h-7 w-7 text-[#C8102E]" />

              <p className="mt-4 text-xl font-extrabold text-slate-950">
                Professional Growth
              </p>

              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                Promoting competence, ethical conduct and industry leadership.
              </p>
            </div>
          </div>
        </div>
      </section>*/}

      {/* PROFESSIONAL STANDARDS 
      <section className="relative overflow-hidden bg-[#FFF9F0] py-20 lg:py-24">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-red-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            label="Code of Conduct & Ethics"
            title="Professional standards that inspire public confidence"
            description="AHPK members are expected to uphold integrity, competence, responsibility and respectful professional relationships."
            href="/professional-standards/code-of-conduct"
          />

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {professionalStandards.map((standard) => {
              const Icon = standard.icon;

              return (
                <Link
                  key={standard.title}
                  href={standard.href}
                  className="group rounded-2xl border border-amber-200/80 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#C8102E]/30 hover:shadow-xl"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E] transition group-hover:bg-[#C8102E] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </span>

                  <h3 className="mt-6 text-xl font-extrabold leading-snug text-slate-950">
                    {standard.title}
                  </h3>

                  <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                    {standard.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
                    Read more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>*/}

      {/* MEMBERSHIP CTA 
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/home/membership-background.jpg"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#8D1026]/88" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7D0C20]/95 via-[#9B112B]/85 to-[#9B112B]/60" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 text-white sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#F8D45C]">
              Join AHPK Today
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Strengthen your professional credibility and industry network
            </h2>

            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/85">
              {page?.content ||
                "Become part of a recognised professional association committed to ethical standards, training, career growth and advancement of Kenya’s hospitality industry."}
            </p>
          </div>

          <Link
            href="/apply"
            className="inline-flex min-w-[205px] items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-extrabold text-[#A80D27] shadow-xl transition hover:-translate-y-0.5 hover:bg-[#F8D45C]"
          >
            <UserPlus className="h-4 w-4" />
            Start Application
          </Link>
        </div>
      </section>*/}

      {/* NEWS 
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            label="Latest Updates"
            title="News & Announcements"
            description="Stay informed about AHPK programmes, professional activities, industry developments and member achievements."
            href="/news"
          />

          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {news.map((post) => (
              <NewsCard
                key={post.id}
                href={`/news/${post.slug}`}
                image={post.imageUrl}
                title={post.title}
                description={
                  post.excerpt ||
                  post.content ||
                  "Read the latest update from AHPK."
                }
                date={formatDate(post.createdAt)}
              />
            ))}

            {news.length === 0 && (
              <EmptyCard text="No news has been published yet." />
            )}
          </div>
        </div>
      </section>*/}

      {/* EVENTS
      <section className="relative overflow-hidden bg-[#F7F9FC] py-20 lg:py-24">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_center,_rgba(200,16,46,0.07),_transparent_65%)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            label="Professional Development"
            title="Upcoming Events & CPD"
            description="Participate in events designed to strengthen professional knowledge, leadership, networking and industry collaboration."
            href="/events"
          />

          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                href={`/events/${event.slug}`}
                image={event.imageUrl}
                title={event.title}
                description={
                  event.description ||
                  "View more information about this AHPK event."
                }
                date={formatDate(event.eventDate)}
              />
            ))}

            {events.length === 0 && (
              <EmptyCard text="No upcoming events have been published." />
            )}
          </div>
        </div>
      </section> */}

      {/* LEADERSHIP 
      {leaders.length > 0 && (
        <section className="bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <CenteredSectionHeader
              label="AHPK Leadership"
              title="Meet our association leaders"
              description="Hospitality professionals providing strategic leadership and supporting the work of the association."
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {leaders.map((leader) => (
                <article
                  key={leader.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-72 overflow-hidden bg-slate-100">
                    {leader.imageUrl ? (
                      <img
                        src={leader.imageUrl}
                        alt={leader.name}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-red-50 text-[#C8102E]">
                        <Users className="h-14 w-14" />
                      </div>
                    )}
                  </div>

                  <div className="border-t-4 border-[#C8102E] p-5">
                    <h3 className="text-lg font-extrabold text-slate-950">
                      {leader.name}
                    </h3>

                    <p className="mt-1 text-sm font-bold text-[#C8102E]">
                      {leader.position}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/about/leadership/board"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E] transition hover:text-[#8E0C22]"
              >
                View AHPK leadership
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}*/}

      {/* RESOURCES 
      <section className="relative overflow-hidden bg-[#FFF9F0] py-20 lg:py-24">
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-red-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            label="Resources Centre"
            title="Policies, Forms & Guides"
            description="Access important association documents, professional standards, application forms, policies and member guides."
            href="/resources"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={resource.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-amber-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#C8102E]/30 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-[#B78109] transition group-hover:bg-[#C8102E] group-hover:text-white">
                  <FileText className="h-6 w-6" />
                </div>

                <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#C8102E]">
                  {resource.category || "Resource"}
                </p>

                <h3 className="mt-3 text-lg font-extrabold leading-snug text-slate-950">
                  {resource.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600">
                  {resource.description ||
                    "View or download this association resource."}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
                  Open resource
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}

            {resources.length === 0 && (
              <EmptyCard text="No resources have been published yet." />
            )}
          </div>
        </div>
      </section>*/}

      {/* ASSOCIATION STATEMENT 
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[30px] border border-slate-200 bg-[#F7F9FC] lg:grid-cols-[0.85fr_1.15fr]">
            <div className="min-h-[400px]">
              <img
                src="/images/home/hospitality-team.jpg"
                alt="Kenyan hospitality professionals"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center p-8 sm:p-10 lg:p-14">
              <div>
                <Quote className="h-11 w-11 text-[#C8102E]" />

                <p className="mt-6 text-xl font-bold leading-9 text-slate-800 sm:text-2xl">
                  Building a respected, ethical and highly skilled hospitality
                  profession that contributes meaningfully to service
                  excellence and national development.
                </p>

                <div className="mt-7 h-1 w-14 rounded-full bg-[#C8102E]" />

                <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.16em] text-slate-500">
                  Association of Hotel Professionals Kenya
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      {/* FINAL CTA 
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[30px] bg-[#C8102E] px-7 py-12 text-white shadow-xl sm:px-10 lg:px-14">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-white/10" />
            <div className="absolute -bottom-24 right-32 h-56 w-56 rounded-full bg-[#F4C84A]/20 blur-2xl" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#F8D45C]">
                  Professional Membership
                </p>

                <h2 className="mt-4 text-3xl font-extrabold leading-tight">
                  Become part of Kenya&apos;s professional hospitality community
                </h2>

                <p className="mt-4 text-base font-medium leading-8 text-white/80">
                  Access professional recognition, industry connections,
                  training opportunities and verified digital membership
                  services.
                </p>
              </div>

              <Link
                href="/apply"
                className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-extrabold text-[#C8102E] transition hover:bg-[#F8D45C]"
              >
                Apply for Membership
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
       <PublicFooter />
       */}


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
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#C8102E]/30 hover:shadow-xl"
    >
      <span className="absolute right-5 top-4 text-5xl font-black text-slate-100 transition group-hover:text-red-50">
        {number}
      </span>

      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E] transition group-hover:bg-[#C8102E] group-hover:text-white">
          <Icon className="h-7 w-7" />
        </div>

        <h3 className="mt-6 text-xl font-extrabold text-slate-950">{title}</h3>

        <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
          {description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
          Learn more
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function NewsCard({
  href,
  image,
  title,
  description,
  date,
}: {
  href: string;
  image: string | null;
  title: string;
  description: string;
  date: string;
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-56 overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-red-50 text-[#C8102E]">
            <FileText className="h-14 w-14" />
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-[#C8102E]">
          {date}
        </p>

        <h3 className="mt-3 line-clamp-2 text-xl font-extrabold leading-snug text-slate-950">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm font-medium leading-7 text-slate-600">
          {description}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
          Read article
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function EventCard({
  href,
  image,
  title,
  description,
  date,
}: {
  href: string;
  image: string | null;
  title: string;
  description: string;
  date: string;
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-red-50 text-[#C8102E]">
            <CalendarDays className="h-14 w-14" />
          </div>
        )}

        <div className="absolute bottom-4 left-4 rounded-xl bg-white px-4 py-3 shadow-lg">
          <p className="text-xs font-extrabold uppercase tracking-wide text-[#C8102E]">
            {date}
          </p>
        </div>
      </div>

      <div className="p-6">
        <h3 className="line-clamp-2 text-xl font-extrabold leading-snug text-slate-950">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm font-medium leading-7 text-slate-600">
          {description}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]">
          View event
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function SectionHeader({
  label,
  title,
  description,
  href,
}: {
  label: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <SectionLabel>{label}</SectionLabel>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h2>

        <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>

      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#C8102E] transition hover:text-[#8E0C22]"
      >
        View all
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function CenteredSectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <SectionLabel>{label}</SectionLabel>

      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">
        {description}
      </p>
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
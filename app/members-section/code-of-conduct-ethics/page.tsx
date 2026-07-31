// app/members-section/code-of-conduct-ethics/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  ChevronRight,
  CircleCheck,
  FileCheck2,
  Gavel,
  Handshake,
  Home,
  Scale,
  ShieldCheck,
  ShieldQuestion,
  UserRoundCheck,
  Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath =
  "/members-section/code-of-conduct-ethics";

export const metadata: Metadata = {
  title: "Code of Conduct & Ethics",
  description:
    "Explore the AHPK Code of Conduct and Ethics, including the professional pledge, client responsibilities, professional relationships, conduct standards and procedures for handling alleged violations.",
  keywords: [
    "AHPK code of conduct",
    "AHPK code of ethics",
    "hospitality ethics Kenya",
    "hotel professionals code of conduct",
    "professional ethics hospitality",
    "AHPK ethical standards",
    "Association of Hotel Professionals Kenya",
  ],
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title:
      "Code of Conduct & Ethics | Association of Hotel Professionals Kenya",
    description:
      "Review the ethical principles, professional conduct standards and accountability procedures guiding AHPK members.",
    url: pagePath,
    siteName:
      "Association of Hotel Professionals Kenya",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/executive-committee.webp",
        width: 1536,
        height: 1024,
        alt: "Hospitality professionals guided by ethical and professional standards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code of Conduct & Ethics | AHPK",
    description:
      "Explore AHPK ethical principles, professional standards and accountability procedures.",
    images: ["/executive-committee.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const ethicsSections = [
  {
    eyebrow: "Professional Pledge",
    title: "Code of Ethics & Conducts Pledge",
    description:
      "The ethical commitment made by members to act with integrity, competence, fairness and professional responsibility.",
    href:
      "/members-section/code-of-conduct-ethics/code-of-ethics-conducts-pledge",
    icon: BadgeCheck,
  },
  {
    eyebrow: "Client Responsibility",
    title: "Relationships with Clients",
    description:
      "Standards governing independence, confidentiality, honesty and professional responsibility in client relationships.",
    href:
      "/members-section/code-of-conduct-ethics/relationships-with-clients",
    icon: Handshake,
  },
  {
    eyebrow: "Professional Community",
    title: "Professional Relationships",
    description:
      "Principles guiding respectful, fair and constructive relationships between members, colleagues and other professionals.",
    href:
      "/members-section/code-of-conduct-ethics/professional-relationships",
    icon: Users,
  },
  {
    eyebrow: "Accountability",
    title: "Handling Alleged Violations",
    description:
      "The fair, confidential and constitutionally guided process for examining alleged breaches of professional conduct.",
    href:
      "/members-section/code-of-conduct-ethics/handling-alleged-violations",
    icon: Gavel,
  },
];

const ethicalPrinciples = [
  {
    title: "Integrity",
    description:
      "Members must act honestly, consistently and in a manner that protects public and professional trust.",
  },
  {
    title: "Professional Competence",
    description:
      "Members should maintain the knowledge, judgement and skills required to provide responsible professional service.",
  },
  {
    title: "Confidentiality",
    description:
      "Information received through professional relationships must be handled with discretion and proper authority.",
  },
  {
    title: "Objectivity",
    description:
      "Professional decisions should remain free from improper influence, bias or undisclosed conflicts of interest.",
  },
  {
    title: "Respect",
    description:
      "Members must treat clients, colleagues, employees and the public with dignity, fairness and professionalism.",
  },
  {
    title: "Accountability",
    description:
      "Members remain answerable for their conduct and must cooperate with legitimate professional review processes.",
  },
];

const professionalTests = [
  "Is the action lawful and consistent with the Constitution?",
  "Does it protect the dignity of the hospitality profession?",
  "Is it fair to clients, colleagues, employees and the public?",
  "Could the decision withstand transparent professional review?",
  "Does it preserve trust in the Association and its members?",
  "Is the member acting independently and without improper influence?",
  "Would the conduct remain acceptable if publicly disclosed?",
];

const responsibilities = [
  "Observe the Association's Constitution, rules and professional standards.",
  "Protect confidential and privileged information.",
  "Avoid conflicts of interest and disclose them where they arise.",
  "Represent qualifications, experience and services honestly.",
  "Treat clients, colleagues and the public fairly and respectfully.",
  "Cooperate with lawful and fair disciplinary procedures.",
];

export default function CodeOfConductEthicsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "Members Section",
            url: "/members-section",
          },
          {
            name: "Code of Conduct & Ethics",
            url: pagePath,
          },
        ]}
      />

      <CodeOfConductEthicsJsonLd />
      <PageHeader />

      {/* EDITORIAL MASTHEAD */}
      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
          <Breadcrumb />

          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="max-w-5xl">
              <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Professional Standards
              </p>

              <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                Code of Conduct
                <span className="block text-[#C8102E]">
                  &amp; Ethics
                </span>
              </h1>

              <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                The principles, professional duties
                and accountability standards that
                guide members of the Association of
                Hotel Professionals Kenya.
              </p>
            </div>

            <div className="border-t-4 border-slate-950 pt-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                Ethical Leadership
              </p>

              <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                Professional trust is built through
                integrity, competence, fairness,
                confidentiality and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE IMAGE */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
          <figure>
            <div className="aspect-[16/6] overflow-hidden bg-slate-200">
              <img
                src="/executive-committee.webp"
                alt="Hospitality professionals guided by ethical and professional standards"
                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
              />
            </div>

            <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
              Ethical conduct protects clients,
              strengthens professional relationships and
              preserves confidence in the hospitality
              profession.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* MAIN ETHICS SECTIONS */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="border-t-4 border-[#C8102E] pt-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
              Ethical Framework
            </p>

            <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <h2 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Explore the professional standards
              </h2>

              <p className="max-w-sm text-sm font-medium leading-7 text-slate-600">
                Each section explains a different
                part of the professional conduct
                expected from AHPK members.
              </p>
            </div>
          </div>

          <div className="mt-6 grid border-t border-slate-300 md:grid-cols-2">
            {ethicsSections.map((section, index) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group grid min-h-64 border-b border-slate-300 py-6 transition hover:bg-red-50/50 md:grid-cols-[64px_minmax(0,1fr)] md:border-r md:px-6 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n+1)]:pl-0"
                >
                  <p className="text-4xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </p>

                  <div className="mt-4 md:mt-0">
                    <Icon className="h-6 w-6 text-[#C8102E]" />

                    <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                      {section.eyebrow}
                    </p>

                    <h3 className="mt-2 text-2xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                      {section.title}
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                      {section.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-slate-950 transition group-hover:text-[#C8102E]">
                      Open Section
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE PRINCIPLES */}
      <section className="border-y border-slate-300 bg-slate-50 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div className="border-t-4 border-slate-950 pt-4">
              <ShieldCheck className="h-7 w-7 text-[#C8102E]" />

              <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Core Principles
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-950">
                The foundation of professional conduct
              </h2>

              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                These principles guide professional
                judgement, relationships and
                decision-making across the
                hospitality industry.
              </p>
            </div>

            <div className="grid border-t border-slate-300 sm:grid-cols-2">
              {ethicalPrinciples.map(
                (principle, index) => (
                  <article
                    key={principle.title}
                    className="group border-b border-slate-300 py-5 transition hover:bg-white sm:border-r sm:px-5 sm:[&:nth-child(2n)]:border-r-0"
                  >
                    <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </p>

                    <h3 className="mt-3 text-xl font-black text-slate-950">
                      {principle.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                      {principle.description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ETHICAL TESTS */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article>
              <div className="border-t-4 border-[#C8102E] pt-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                  Professional Judgement
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Seven tests for ethical conduct
                </h2>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                  Before acting, a member should be
                  able to answer these questions
                  honestly and confidently.
                </p>
              </div>

              <div className="mt-5 border-t border-slate-300">
                {professionalTests.map(
                  (test, index) => (
                    <div
                      key={test}
                      className="group grid gap-4 border-b border-slate-300 py-5 sm:grid-cols-[56px_28px_minmax(0,1fr)]"
                    >
                      <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </p>

                      <ShieldQuestion className="mt-1 h-5 w-5 text-[#C8102E]" />

                      <p className="text-sm font-semibold leading-7 text-slate-700 sm:text-base sm:leading-8">
                        {test}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </article>

            <aside className="space-y-5">
              <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                <Scale className="h-6 w-6 text-red-300" />

                <h2 className="mt-3 text-xl font-black">
                  Fair and Accountable
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                  Ethical review must remain
                  impartial, confidential and
                  consistent with the Constitution
                  and approved procedures.
                </p>
              </section>

              <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                <BookOpenCheck className="h-6 w-6 text-[#C8102E]" />

                <h2 className="mt-3 text-xl font-black text-slate-950">
                  Members Section
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  Return to the main Members
                  Section for membership,
                  constitutional and directory
                  resources.
                </p>

                <Link
                  href="/members-section"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]"
                >
                  View Members Section
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </section>

      {/* MEMBER RESPONSIBILITIES */}
      <section className="border-y border-slate-300 bg-slate-950 py-8 text-white sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div>
              <FileCheck2 className="h-7 w-7 text-red-300" />

              <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                Member Responsibility
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Duties every member must uphold
              </h2>
            </div>

            <div className="grid border-t border-slate-700 sm:grid-cols-2">
              {responsibilities.map(
                (responsibility, index) => (
                  <article
                    key={responsibility}
                    className="group flex min-h-28 items-start gap-4 border-b border-slate-700 py-5 sm:border-r sm:px-5 sm:[&:nth-child(2n)]:border-r-0"
                  >
                    <p className="text-3xl font-black leading-none text-slate-600 transition group-hover:text-red-300">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </p>

                    <div>
                      <CircleCheck className="h-5 w-5 text-red-300" />

                      <p className="mt-2 text-sm font-semibold leading-7 text-slate-200">
                        {responsibility}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

function CodeOfConductEthicsJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id":
      "https://ahpk.or.ke/members-section/code-of-conduct-ethics#webpage",
    url:
      "https://ahpk.or.ke/members-section/code-of-conduct-ethics",
    name: "Code of Conduct & Ethics",
    description:
      "AHPK professional conduct, ethical standards, client responsibilities, professional relationships and accountability procedures.",
    inLanguage: "en-KE",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://ahpk.or.ke/#website",
      name:
        "Association of Hotel Professionals Kenya",
      url: "https://ahpk.or.ke",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://ahpk.or.ke/#organization",
      name:
        "Association of Hotel Professionals Kenya",
      alternateName: "AHPK",
      url: "https://ahpk.or.ke",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "AHPK Code of Conduct and Ethics",
      numberOfItems: ethicsSections.length,
      itemListElement: ethicsSections.map(
        (section, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: section.title,
          description: section.description,
          url: `https://ahpk.or.ke${section.href}`,
        }),
      ),
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

function PageHeader() {
  return (
    <header
      className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
      style={
        {
          "--header-height": "88px",
        } as React.CSSProperties
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
        href="/members-section"
        className="transition hover:text-[#C8102E]"
      >
        Members Section
      </Link>

      <ChevronRight className="h-4 w-4 text-slate-300" />

      <span
        className="text-[#C8102E]"
        aria-current="page"
      >
        Code of Conduct &amp; Ethics
      </span>
    </nav>
  );
}
// app/members-section/constitution-rules/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  ChevronRight,
  FileCheck2,
  Gavel,
  Home,
  Landmark,
  Scale,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath =
  "/members-section/constitution-rules";

export const metadata: Metadata = {
  title: "Constitution & Rules",
  description:
    "Explore the AHPK Constitution and Rules, including the Association's objectives, membership provisions, elected Office Bearers, Executive Committee and wider governance framework.",
  keywords: [
    "AHPK constitution",
    "AHPK rules",
    "AHPK governance",
    "AHPK membership rules",
    "AHPK office bearers",
    "AHPK Executive Committee",
    "Association of Hotel Professionals Kenya",
  ],
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title:
      "Constitution & Rules | Association of Hotel Professionals Kenya",
    description:
      "Review the constitutional provisions governing AHPK's objectives, membership, leadership, committees and administration.",
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
        alt: "AHPK leadership and constitutional governance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Constitution & Rules | AHPK",
    description:
      "Explore AHPK's constitutional objectives, membership provisions and governance framework.",
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

const constitutionSections = [
  {
    eyebrow: "Association Purpose",
    title: "Objectives",
    description:
      "The constitutional aims that define the Association's purpose, mandate and contribution to Kenya's hospitality profession.",
    href:
      "/members-section/constitution-rules/objectives",
    icon: Landmark,
  },
  {
    eyebrow: "Member Framework",
    title: "Membership",
    description:
      "Eligibility, rights, privileges, responsibilities and disciplinary provisions governing AHPK membership.",
    href:
      "/members-section/constitution-rules/membership",
    icon: UserRoundCheck,
  },
  {
    eyebrow: "Elected Leadership",
    title: "Office Bearers & Duties",
    description:
      "The elected leadership offices and the constitutional responsibilities assigned to each Office Bearer.",
    href:
      "/members-section/constitution-rules/office-bearers-duties",
    icon: Gavel,
  },
  {
    eyebrow: "Committee Governance",
    title: "The Executive Committee",
    description:
      "Committee composition, powers, meetings, voting procedures and wider constitutional responsibilities.",
    href:
      "/members-section/constitution-rules/the-executive-committee",
    icon: Scale,
  },

];

const governancePrinciples = [
  {
    title: "Constitutional Compliance",
    description:
      "All Association activities, decisions and leadership responsibilities must remain consistent with the Constitution and approved rules.",
  },
  {
    title: "Member Participation",
    description:
      "Members exercise governance rights through elections, meetings, voting and participation in Association affairs.",
  },
  {
    title: "Accountable Leadership",
    description:
      "Office Bearers and committee members remain answerable to members for the proper exercise of their authority.",
  },
  {
    title: "Transparent Administration",
    description:
      "Records, accounts, notices and meeting procedures must be maintained according to constitutional requirements.",
  },
  {
    title: "Professional Integrity",
    description:
      "Leadership and governance should protect the reputation, objectives and ethical standing of the Association.",
  },
  {
    title: "Continuity of Governance",
    description:
      "Election, succession, vacancy and tenure provisions help maintain stable and effective Association leadership.",
  },
];

const constitutionalSafeguards = [
  "Elections and tenure must follow the approved constitutional process.",
  "General Meetings must satisfy notice and quorum requirements.",
  "Voting rights must be exercised personally where proxy voting is prohibited.",
  "Constitutional amendments require the prescribed member majority and regulatory consent.",
  "Association funds and records must remain properly managed and available for lawful inspection.",
  "Dissolution can only occur through the constitutional voting and quorum process.",
];

export default function ConstitutionRulesPage() {
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
            name: "Constitution & Rules",
            url: pagePath,
          },
        ]}
      />

      <ConstitutionRulesJsonLd />
      <PageHeader />

      {/* EDITORIAL MASTHEAD */}
      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
          <Breadcrumb />

          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="max-w-5xl">
              <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Association Governance
              </p>

              <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                Constitution
                <span className="block text-[#C8102E]">
                  &amp; Rules
                </span>
              </h1>

              <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                The constitutional framework defining
                AHPK&apos;s purpose, membership,
                elected leadership, committees and
                administrative responsibilities.
              </p>
            </div>

            <div className="border-t-4 border-slate-950 pt-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                Governing Framework
              </p>

              <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                The Constitution provides the legal
                and institutional foundation for
                responsible, transparent and
                member-led governance.
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
                alt="AHPK leadership and constitutional governance"
                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
              />
            </div>

            <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
              The Constitution guides the Association&apos;s
              leadership, membership, meetings,
              administration and long-term governance.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CONSTITUTION SECTIONS */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="border-t-4 border-[#C8102E] pt-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
              Constitutional Provisions
            </p>

            <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <h2 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Explore the governance framework
              </h2>

              <p className="max-w-sm text-sm font-medium leading-7 text-slate-600">
                Each section explains a core part of
                the Association&apos;s constitutional
                structure and member governance.
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-300">
            {constitutionSections.map(
              (section, index) => {
                const Icon = section.icon;

                return (
                  <Link
                    key={section.title}
                    href={section.href}
                    className="group grid gap-4 border-b border-slate-300 py-6 transition hover:bg-red-50/40 sm:grid-cols-[70px_42px_minmax(0,1fr)_28px] sm:items-start sm:px-4 sm:first:pl-0"
                  >
                    <p className="text-4xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </p>

                    <div className="flex h-9 w-9 items-center justify-center bg-slate-950 text-white transition group-hover:bg-[#C8102E]">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                        {section.eyebrow}
                      </p>

                      <h3 className="mt-1.5 text-2xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                        {section.title}
                      </h3>

                      <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                        {section.description}
                      </p>
                    </div>

                    <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#C8102E]" />
                  </Link>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* GOVERNANCE PRINCIPLES */}
      <section className="border-y border-slate-300 bg-slate-50 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div className="border-t-4 border-slate-950 pt-4">
              <ShieldCheck className="h-7 w-7 text-[#C8102E]" />

              <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Governance Principles
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-950">
                Standards supporting responsible leadership
              </h2>

              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                These principles shape how authority
                should be exercised, decisions should
                be made and members should participate
                in Association governance.
              </p>
            </div>

            <div className="grid border-t border-slate-300 sm:grid-cols-2">
              {governancePrinciples.map(
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

      {/* SAFEGUARDS */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article>
              <div className="border-t-4 border-[#C8102E] pt-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                  Constitutional Safeguards
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Rules protecting fair and lawful governance
                </h2>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                  The Constitution establishes
                  procedural safeguards for
                  elections, meetings, records,
                  amendments and major Association
                  decisions.
                </p>
              </div>

              <div className="mt-5 border-t border-slate-300">
                {constitutionalSafeguards.map(
                  (item, index) => (
                    <div
                      key={item}
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

                      <BadgeCheck className="mt-1 h-5 w-5 text-[#C8102E]" />

                      <p className="text-sm font-semibold leading-7 text-slate-700 sm:text-base sm:leading-8">
                        {item}
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
                  Member-Led Governance
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                  Members participate through
                  elections, meetings, voting,
                  constitutional review and lawful
                  access to Association records.
                </p>
              </section>

              <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                <BookOpenCheck className="h-6 w-6 text-[#C8102E]" />

                <h2 className="mt-3 text-xl font-black text-slate-950">
                  Members Section
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  Return to the main Members
                  Section for ethics, membership and
                  professional directory resources.
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

      {/* CONSTITUTIONAL COMMITMENT */}
      <section className="border-y border-slate-300 bg-slate-950 py-8 text-white sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div>
              <FileCheck2 className="h-7 w-7 text-red-300" />

              <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                Constitutional Commitment
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Governance founded on service and accountability
              </h2>
            </div>

            <div className="border-t border-slate-700 pt-5">
              <blockquote className="border-l-4 border-red-300 pl-5 text-lg font-bold leading-9 text-slate-100 sm:text-xl">
                The Constitution exists to protect
                the Association, guide its leaders,
                safeguard member participation and
                ensure that its affairs are conducted
                responsibly.
              </blockquote>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                <span>Purpose</span>
                <span>Membership</span>
                <span>Leadership</span>
                <span>Meetings</span>
                <span>Accountability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

function ConstitutionRulesJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id":
      "https://ahpk.or.ke/members-section/constitution-rules#webpage",
    url:
      "https://ahpk.or.ke/members-section/constitution-rules",
    name: "Constitution & Rules",
    description:
      "AHPK constitutional provisions governing objectives, membership, elected Office Bearers, the Executive Committee and wider Association governance.",
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
      name: "AHPK Constitution and Rules",
      numberOfItems: constitutionSections.length,
      itemListElement: constitutionSections.map(
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
        Constitution &amp; Rules
      </span>
    </nav>
  );
}
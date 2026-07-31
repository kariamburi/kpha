// app/members-section/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BookUser,
  Building2,
  ChevronRight,
  FileCheck2,
  Gavel,
  Home,
  Landmark,
  Scale,
  SearchCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath = "/members-section";

export const metadata: Metadata = {
  title: "Members Section",
  description:
    "Explore AHPK membership information, constitutional rules, professional ethics, member resources, governance provisions and the hospitality professionals directory.",
  keywords: [
    "AHPK members section",
    "AHPK membership",
    "AHPK constitution",
    "AHPK code of ethics",
    "hospitality professionals Kenya",
    "hotel professionals directory Kenya",
    "Association of Hotel Professionals Kenya",
  ],
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title:
      "Members Section | Association of Hotel Professionals Kenya",
    description:
      "Access AHPK membership information, constitutional provisions, professional ethics, governance resources and the members directory.",
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
        alt: "Association of Hotel Professionals Kenya members and leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Members Section | AHPK",
    description:
      "Explore AHPK membership, constitutional rules, ethics, governance and member resources.",
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

const primarySections = [
  {
    eyebrow: "Membership",
    title: "Membership Categories",
    description:
      "Explore the membership pathways available to hospitality professionals, students, fellows and honorary members.",
    href: "/members-section/membership-categories",
    icon: BadgeCheck,
  },
  {
    eyebrow: "Professional Standards",
    title: "Code of Conduct & Ethics",
    description:
      "Review the professional values, ethical expectations and conduct standards that guide every AHPK member.",
    href:
      "/members-section/code-of-conduct-ethics/code-of-ethics-conducts-pledge",
    icon: ShieldCheck,
  },
  {
    eyebrow: "Governance",
    title: "Constitution & Rules",
    description:
      "Understand the constitutional framework governing the Association, its membership, leadership and administration.",
    href:
      "/members-section/constitution-rules/objectives",
    icon: Landmark,
  },
  {
    eyebrow: "Professional Network",
    title: "Members Directory",
    description:
      "Find and verify hospitality professionals who form part of the AHPK professional community.",
    href: "/members-section/directory",
    icon: BookUser,
  },
];

const constitutionLinks = [
  {
    title: "Association Objectives",
    description:
      "The constitutional purpose and strategic objectives of AHPK.",
    href:
      "/members-section/constitution-rules/objectives",
    icon: Landmark,
  },
  {
    title: "Membership",
    description:
      "Membership rights, eligibility, privileges and responsibilities.",
    href:
      "/members-section/constitution-rules/membership",
    icon: Users,
  },
  {
    title: "Office Bearers & Duties",
    description:
      "Leadership offices and the duties assigned to each elected position.",
    href:
      "/members-section/constitution-rules/office-bearers-duties",
    icon: Gavel,
  },
  {
    title: "The Executive Committee",
    description:
      "Committee composition, authority, meetings and constitutional responsibilities.",
    href:
      "/members-section/constitution-rules/the-executive-committee",
    icon: Scale,
  },
];

const ethicsLinks = [
  {
    title: "Code of Ethics & Conducts Pledge",
    description:
      "The professional pledge and ethical standards expected of every member.",
    href:
      "/members-section/code-of-conduct-ethics/code-of-ethics-conducts-pledge",
  },
  {
    title: "Relationships with Clients",
    description:
      "Standards for independence, integrity and responsibility in client relationships.",
    href:
      "/members-section/code-of-conduct-ethics/relationships-with-clients",
  },
  {
    title: "Professional Relationships",
    description:
      "Principles governing conduct between colleagues and other professionals.",
    href:
      "/members-section/code-of-conduct-ethics/professional-relationships",
  },
  {
    title: "Handling Alleged Violations",
    description:
      "The fair and confidential process for addressing alleged ethical violations.",
    href:
      "/members-section/code-of-conduct-ethics/handling-alleged-violations",
  },
];

const memberValues = [
  "Professional Integrity",
  "Constitutional Compliance",
  "Continuous Development",
  "Service to the Industry",
  "Ethical Leadership",
  "Member Accountability",
];

export default function MembersSectionPage() {
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
            url: pagePath,
          },
        ]}
      />

      <MembersSectionJsonLd />
      <PageHeader />

      {/* EDITORIAL MASTHEAD */}
      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
          <Breadcrumb />

          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="max-w-5xl">
              <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Association Resources
              </p>

              <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                Members
                <span className="block text-[#C8102E]">
                  Section
                </span>
              </h1>

              <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                Access the constitutional,
                professional and membership resources
                that support AHPK members throughout
                their careers in hospitality.
              </p>
            </div>

            <div className="border-t-4 border-slate-950 pt-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                Professional Community
              </p>

              <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                AHPK brings hospitality professionals
                together through shared standards,
                ethical leadership and continuous
                professional development.
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
                alt="Association of Hotel Professionals Kenya members and leadership"
                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
              />
            </div>

            <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
              A professional community committed to
              integrity, competence, leadership and the
              advancement of Kenya&apos;s hospitality
              industry.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* PRIMARY RESOURCES */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="border-t-4 border-[#C8102E] pt-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
              Member Resources
            </p>

            <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <h2 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Start with the information you need
              </h2>

              <p className="max-w-sm text-sm font-medium leading-7 text-slate-600">
                Navigate membership, governance,
                ethics and professional verification
                from one central resource.
              </p>
            </div>
          </div>

          <div className="mt-6 grid border-t border-slate-300 md:grid-cols-2">
            {primarySections.map((section, index) => {
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

      {/* CONSTITUTION HUB */}
      <section className="border-y border-slate-300 bg-slate-50 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div className="border-t-4 border-slate-950 pt-4">
              <Landmark className="h-7 w-7 text-[#C8102E]" />

              <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Constitution &amp; Rules
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-950">
                Governance framework
              </h2>

              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                Review the provisions that define the
                Association&apos;s purpose,
                membership, elected leadership and
                administrative authority.
              </p>
            </div>

            <div className="border-t border-slate-300">
              {constitutionLinks.map(
                (item, index) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group grid gap-4 border-b border-slate-300 py-5 transition hover:bg-white sm:grid-cols-[48px_36px_minmax(0,1fr)_24px] sm:items-start sm:px-4"
                    >
                      <p className="text-2xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </p>

                      <Icon className="h-5 w-5 text-[#C8102E]" />

                      <div>
                        <h3 className="text-lg font-black text-slate-950 transition group-hover:text-[#C8102E]">
                          {item.title}
                        </h3>

                        <p className="mt-1.5 text-sm font-medium leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>

                      <ChevronRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#C8102E]" />
                    </Link>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ETHICS HUB */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <div className="border-t-4 border-[#C8102E] pt-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                  Code of Conduct &amp; Ethics
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Professional standards for every member
                </h2>
              </div>

              <div className="mt-5 border-t border-slate-300">
                {ethicsLinks.map(
                  (item, index) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group grid gap-4 border-b border-slate-300 py-5 transition hover:bg-red-50/40 sm:grid-cols-[56px_minmax(0,1fr)_24px] sm:items-start sm:px-4 sm:first:pl-0"
                    >
                      <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </p>

                      <div>
                        <h3 className="text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </div>

                      <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#C8102E]" />
                    </Link>
                  ),
                )}
              </div>
            </div>

            <aside className="space-y-5">
              <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                <ShieldCheck className="h-6 w-6 text-red-300" />

                <h2 className="mt-3 text-xl font-black">
                  Professional Integrity
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                  Membership carries a continuing
                  responsibility to uphold ethical
                  standards, professional competence
                  and public trust.
                </p>
              </section>

              <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                <SearchCheck className="h-6 w-6 text-[#C8102E]" />

                <h2 className="mt-3 text-xl font-black text-slate-950">
                  Verify a Professional
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  Confirm whether a hospitality
                  professional appears in the AHPK
                  member records.
                </p>

                <Link
                  href="/members-section/verify"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]"
                >
                  Open Verification
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </section>

      {/* MEMBER VALUES */}
      <section className="border-y border-slate-300 bg-slate-950 py-8 text-white sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <div>
              <FileCheck2 className="h-7 w-7 text-red-300" />

              <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                Member Commitment
              </p>

              <h2 className="mt-2 text-3xl font-black">
                Standards that strengthen the profession
              </h2>
            </div>

            <div className="grid border-t border-slate-700 sm:grid-cols-2">
              {memberValues.map((value, index) => (
                <div
                  key={value}
                  className="group flex min-h-24 items-start gap-4 border-b border-slate-700 py-5 sm:border-r sm:px-5 sm:[&:nth-child(2n)]:border-r-0"
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
                    <BookOpenCheck className="h-5 w-5 text-red-300" />

                    <h3 className="mt-2 text-sm font-black leading-6 text-white">
                      {value}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

function MembersSectionJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id":
      "https://ahpk.or.ke/members-section#webpage",
    url: "https://ahpk.or.ke/members-section",
    name: "Members Section",
    description:
      "AHPK membership, constitutional, ethical, governance and professional directory resources.",
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
      name: "AHPK Member Resources",
      numberOfItems: primarySections.length,
      itemListElement: primarySections.map(
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

      <span
        className="text-[#C8102E]"
        aria-current="page"
      >
        Members Section
      </span>
    </nav>
  );
}
// app/disclaimer/page.tsx

import type {
  CSSProperties,
  ReactNode,
} from "react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileCheck2,
  Home,
  Mail,
  MapPin,
  Phone,
  Scale,
  ShieldAlert,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { prisma } from "@/lib/prisma";

const pagePath = "/disclaimer";

export const metadata: Metadata = {
  title:
    "Membership Disclaimer & Fraud Warning",

  description:
    "Read the official AHPK membership disclaimer, certificate verification requirements, approved contacts, payment guidance and fraud prevention notice.",

  keywords: [
    "AHPK disclaimer",
    "AHPK membership verification",
    "AHPK fraud warning",
    "AHPK membership certificate",
    "hospitality professionals Kenya",
    "Association of Hotel Professionals Kenya",
  ],

  alternates: {
    canonical: pagePath,
  },

  openGraph: {
    title:
      "Membership Disclaimer & Fraud Warning | Association of Hotel Professionals Kenya",

    description:
      "Official guidance on AHPK membership, certificate issuance, approved contacts and protection against fraudulent membership schemes.",

    url: pagePath,
    siteName:
      "Association of Hotel Professionals Kenya",
    locale: "en_KE",
    type: "article",

    images: [
      {
        url: "/disclaimer-hero.webp",
        width: 1536,
        height: 1024,
        alt:
          "Official AHPK membership verification and fraud prevention guidance",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Membership Disclaimer & Fraud Warning | AHPK",
    description:
      "Official AHPK membership verification, payment and fraud prevention guidance.",
    images: ["/disclaimer-hero.webp"],
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

const membershipRules = [
  "Membership is exclusively available to qualifying hospitality and tourism professionals, including hospitality academia professionals.",

  "Every applicant must undergo the Association's official vetting and approval process.",

  "Membership certificates are issued only to qualified and approved members.",

  "Every membership certificate is valid for one year.",

  "Membership is renewed upon payment of the applicable annual subscription.",
];

const certificateRules = [
  "Membership certificates are not issued merely to support an employment or promotion application.",

  "Applicants from Kenya and other countries must satisfy the same membership threshold.",

  "Every certificate holder must be a bona fide member who has successfully completed the vetting process.",

  "Certificates may only be issued through the Association's approved membership process.",
];

const fraudWarnings = [
  "AHPK does not authorize unofficial organizations or individuals to register members.",

  "AHPK does not issue membership certificates through unauthorized agents.",

  "Prospective members are not required to make payment before approval.",

  "Any person collecting money while falsely claiming to represent AHPK is acting fraudulently.",

  "AHPK will not be responsible for losses arising from dealings with unauthorized persons or organizations.",
];

const officeBearers = [
  {
    office: "Chairman",
    name: "Robert M. Kinyua",
    phone: "0722 707 378",
    href: "tel:+254722707378",
  },

  {
    office: "Secretary",
    name: "Wilson Mwangi",
    phone: "0720 844 309",
    href: "tel:+254720844309",
  },

  {
    office: "Treasurer",
    name: "Charles Kinyua",
    phone: "0724 222 137",
    href: "tel:+254724222137",
  },
];

const pageNavigation = [
  [
    "#official-notice",
    "Official Notice",
  ],
  [
    "#membership-policy",
    "Membership Policy",
  ],
  [
    "#certificate-issuance",
    "Certificate Issuance",
  ],
  [
    "#fraud-warning",
    "Fraud Warning",
  ],
  [
    "#official-contacts",
    "Official Contacts",
  ],
  [
    "#banking-details",
    "Banking Details",
  ],
  [
    "#office-bearers",
    "Office Bearers",
  ],
  [
    "#joining-fees",
    "Joining Fees",
  ],
  [
    "#report-fraud",
    "Report Fraud",
  ],
] as const;

export default async function DisclaimerPage() {
  const contact =
    await prisma.contactSetting.findUnique({
      where: {
        id: "main",
      },
    });

  const address =
    contact?.address ||
    "The Clarion Hotel Building, Second Floor, Moi Avenue, Nairobi, Kenya";

  const email =
    contact?.email ||
    "info@ahpk.or.ke";

  const phone1 =
    contact?.phone1 ||
    "+254 722 707 370";

  const phone2 =
    contact?.phone2 || "";

  const displayedPhone = phone2
    ? `${phone1} / ${phone2}`
    : phone1;

  const phoneHref = phone1.replace(
    /[^\d+]/g,
    "",
  );

  const officialContacts = [
    {
      label: "Association",
      value:
        "Association of Hotel Professionals Kenya",
      icon: Building2,
    },

    {
      label: "Office Address",
      value: address,
      icon: MapPin,
    },

    {
      label: "Email Address",
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
    },

    {
      label: "Telephone",
      value: displayedPhone,
      href: `tel:${phoneHref}`,
      icon: Phone,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            url: "/",
          },
          {
            name: "Disclaimer",
            url: pagePath,
          },
        ]}
      />

      <DisclaimerJsonLd
        email={email}
        phone={phone1}
      />

      <PageHeader />

      {/* MASTHEAD */}
      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
          <Breadcrumb />

          <div className="mt-5 max-w-5xl">
            <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
              Official Public Notice
            </p>

            <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
              Membership Disclaimer
              <span className="block text-[#C8102E]">
                & Fraud Warning
              </span>
            </h1>

            <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Official guidance on AHPK
              membership, certificate
              issuance, approved communication
              channels, payment procedures and
              protection against fraudulent
              schemes.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/verify"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-[#A80D27]"
              >
                Verify Certificate

                <BadgeCheck className="h-4 w-4" />
              </Link>

              <Link
                href="#report-fraud"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-slate-300 px-6 text-sm font-black text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
              >
                Report Suspicious Activity

                <ArrowRight className="h-4 w-4" />
              </Link>
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
                src="/disclaimer-hero.webp"
                alt="Legal documents, scales of justice and verification symbols representing AHPK membership protection"
                className="h-full w-full object-cover object-center lg:object-right"
              />
            </div>

            <figcaption className="border-b border-slate-200 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
              AHPK membership certificates are
              issued only through the official
              application, vetting, approval and
              payment process.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
            <article className="min-w-0">
              {/* OFFICIAL NOTICE */}
              <section
                id="official-notice"
                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <SectionLabel>
                      Official Communication
                    </SectionLabel>

                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                      Disclaimer – AHPK
                      Membership
                    </h2>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 border border-slate-300 px-3 py-2 text-sm font-black text-slate-700">
                    <CalendarDays className="h-4 w-4 text-[#C8102E]" />

                    24 December 2024
                  </div>
                </div>

                <div className="mt-5 border-l-4 border-[#C8102E] bg-red-50 px-5 py-5 sm:px-6">
                  <p className="text-lg font-black text-slate-950">
                    Dear Industry
                    Professionals and Members
                    of the Public,
                  </p>

                  <p className="mt-3 text-[17px] leading-8 text-slate-700">
                    This notice clarifies
                    the official membership
                    and certificate issuance
                    procedures of the
                    Association of Hotel
                    Professionals Kenya and
                    warns the public against
                    unauthorized persons and
                    organizations falsely
                    claiming to represent the
                    Association.
                  </p>
                </div>
              </section>

              {/* MEMBERSHIP POLICY */}
              <section
                id="membership-policy"
                className="scroll-mt-28 border-t border-slate-300 py-8"
              >
                <EditorialHeading
                  icon={
                    UserRoundCheck
                  }
                  eyebrow="Membership requirements"
                  title="AHPK Membership Policy"
                  description="Membership is reserved for qualified hospitality and tourism professionals who successfully complete the Association's vetting and approval process."
                />

                <div className="mt-5 divide-y divide-slate-300 border-y border-slate-300">
                  {membershipRules.map(
                    (
                      rule,
                      index,
                    ) => (
                      <NumberedRule
                        key={
                          rule
                        }
                        number={
                          index +
                          1
                        }
                      >
                        {
                          rule
                        }
                      </NumberedRule>
                    ),
                  )}
                </div>
              </section>

              {/* CERTIFICATE ISSUANCE */}
              <section
                id="certificate-issuance"
                className="scroll-mt-28 border-t border-slate-300 py-8"
              >
                <EditorialHeading
                  icon={BadgeCheck}
                  eyebrow="Certificate verification"
                  title="Official Certificate Issuance"
                  description="AHPK certificates are issued only to applicants who meet the membership threshold and receive formal approval."
                />

                <div className="mt-4 space-y-4 text-[17px] leading-8 text-slate-700">
                  <p>
                    The Association
                    occasionally receives
                    requests from
                    professionals,
                    including persons from
                    other countries, seeking
                    AHPK certificates to
                    support employment or
                    promotion applications.
                  </p>

                  <p>
                    An AHPK membership
                    certificate cannot be
                    issued for that purpose
                    unless the applicant
                    qualifies and is formally
                    approved as a bona fide
                    member of the
                    Association.
                  </p>
                </div>

                <div className="mt-5 grid border-y border-slate-300 sm:grid-cols-2">
                  {certificateRules.map(
                    (
                      rule,
                      index,
                    ) => (
                      <CheckRule
                        key={
                          rule
                        }
                        text={
                          rule
                        }
                        bordered={
                          index <
                          certificateRules.length -
                          2
                        }
                      />
                    ),
                  )}
                </div>
              </section>

              {/* FRAUD WARNING */}
              <section
                id="fraud-warning"
                className="scroll-mt-28 border-t border-slate-300 py-8"
              >
                <div className="border-t-4 border-amber-600 bg-amber-50 p-5 sm:p-7">
                  <AlertTriangle className="h-7 w-7 text-amber-700" />

                  <SectionLabel className="mt-4 text-amber-800">
                    Important Fraud Warning
                  </SectionLabel>

                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                    Unauthorized Registrars
                    and Payment Requests
                  </h2>

                  <p className="mt-4 text-[17px] leading-8 text-slate-700">
                    AHPK has received
                    reports of fake
                    organizations and
                    individuals presenting
                    themselves as registrars
                    or representatives of
                    the Association and
                    requesting money in
                    exchange for membership
                    certificates.
                  </p>

                  <div className="mt-5 divide-y divide-amber-200 border-y border-amber-200">
                    {fraudWarnings.map(
                      (
                        warning,
                      ) => (
                        <div
                          key={
                            warning
                          }
                          className="flex gap-3 py-4"
                        >
                          <CircleAlert className="mt-1 h-5 w-5 shrink-0 text-amber-700" />

                          <p className="text-sm font-bold leading-7 text-slate-700 sm:text-base">
                            {
                              warning
                            }
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </section>

              {/* OFFICIAL CONTACTS */}
              <section
                id="official-contacts"
                className="scroll-mt-28 border-t border-slate-300 py-8"
              >
                <EditorialHeading
                  icon={ShieldCheck}
                  eyebrow="Verify all communication"
                  title="Official AHPK Contacts"
                  description="Members and applicants should verify membership communication using the official contacts listed below."
                />

                <div className="mt-5 divide-y divide-slate-300 border-y border-slate-300">
                  {officialContacts.map(
                    (item) => (
                      <OfficialContactRow
                        key={
                          item.label
                        }
                        icon={
                          item.icon
                        }
                        label={
                          item.label
                        }
                        value={
                          item.value
                        }
                        href={
                          item.href
                        }
                      />
                    ),
                  )}
                </div>
              </section>

              {/* BANKING */}
              <section
                id="banking-details"
                className="scroll-mt-28 border-t border-slate-300 py-8"
              >
                <EditorialHeading
                  icon={Banknote}
                  eyebrow="Official payment channel"
                  title="AHPK Banking Details"
                  description="Payments should only be made after membership approval and through the approved banking channel."
                />

                <div className="mt-5 border-y border-slate-950 bg-slate-950 text-white">
                  <div className="border-b border-white/15 px-5 py-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                      Official bank
                      account
                    </p>

                    <h3 className="mt-2 text-2xl font-black">
                      National Bank of
                      Kenya
                    </h3>
                  </div>

                  <div className="grid divide-y divide-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                    <BankDetail
                      label="Branch"
                      value="Moi Avenue"
                    />

                    <BankDetail
                      label="Account Number"
                      value="01285129908800"
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-3 border-l-4 border-[#C8102E] bg-red-50 px-5 py-4">
                  <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                  <p className="text-sm font-bold leading-7 text-slate-700">
                    Confirm payment
                    instructions directly
                    with AHPK before
                    transferring any funds.
                  </p>
                </div>
              </section>

              {/* OFFICE BEARERS */}
              <section
                id="office-bearers"
                className="scroll-mt-28 border-t border-slate-300 py-8"
              >
                <EditorialHeading
                  icon={Users}
                  eyebrow="Official representatives"
                  title="Association Office Bearers"
                  description="The following office bearers may be contacted to verify official AHPK communication."
                />

                <div className="mt-5 divide-y divide-slate-300 border-y border-slate-300">
                  {officeBearers.map(
                    (
                      officer,
                    ) => (
                      <div
                        key={
                          officer.office
                        }
                        className="grid gap-3 py-4 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-center"
                      >
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C8102E]">
                          {
                            officer.office
                          }
                        </p>

                        <p className="text-base font-black text-slate-950">
                          {
                            officer.name
                          }
                        </p>

                        <a
                          href={
                            officer.href
                          }
                          className="inline-flex w-fit items-center gap-2 text-sm font-black text-slate-600 transition hover:text-[#C8102E]"
                        >
                          <Phone className="h-4 w-4" />

                          {
                            officer.phone
                          }
                        </a>
                      </div>
                    ),
                  )}
                </div>
              </section>

              {/* JOINING FEES */}
              <section
                id="joining-fees"
                className="scroll-mt-28 border-t border-slate-300 py-8"
              >
                <div className="border-l-4 border-[#C8102E] bg-red-50 px-5 py-6 sm:px-7">
                  <BadgeCheck className="h-7 w-7 text-[#C8102E]" />

                  <SectionLabel className="mt-4">
                    Joining and
                    Subscription Fees
                  </SectionLabel>

                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                    No Payment Before
                    Approval
                  </h2>

                  <p className="mt-4 text-[17px] leading-8 text-slate-700">
                    AHPK does not ask
                    prospective members to
                    make payment before
                    their membership
                    application has been
                    vetted and approved.
                    After approval, the
                    applicant receives
                    official communication
                    explaining the
                    applicable joining and
                    subscription fees.
                  </p>
                </div>
              </section>

              {/* REPORT FRAUD */}
              <section
                id="report-fraud"
                className="scroll-mt-28 border-t border-slate-300 py-8"
              >
                <div className="border-t-4 border-[#C8102E] bg-slate-950 px-5 py-7 text-white sm:px-8">
                  <ShieldAlert className="h-7 w-7 text-red-300" />

                  <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                    Protect Yourself from
                    Fraud
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight">
                    Report Suspicious
                    Communication
                  </h2>

                  <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-slate-300">
                    Any phone call, email
                    or payment request that
                    does not originate from
                    the official contacts
                    listed on this page
                    should be ignored.
                    Suspicious demands
                    should be reported to
                    the appropriate law
                    enforcement authorities.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-red-700"
                    >
                      <Mail className="h-4 w-4" />

                      Verify by Email
                    </a>

                    <a
                      href={`tel:${phoneHref}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/40 px-6 text-sm font-black text-white transition hover:bg-white hover:text-slate-950"
                    >
                      <Phone className="h-4 w-4" />

                      Call AHPK
                    </a>
                  </div>
                </div>
              </section>

              {/* SIGNATURE */}
              <section className="border-t border-slate-300 py-8">
                <Scale className="h-8 w-8 text-[#C8102E]" />

                <p className="mt-5 text-[17px] leading-8 text-slate-700">
                  Issued on behalf of the
                  Association of Hotel
                  Professionals Kenya.
                </p>

                <div className="mt-6 border-t border-slate-300 pt-5">
                  <h2 className="text-xl font-black text-slate-950">
                    Robert M. Kinyua FAHPK
                  </h2>

                  <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                    Chairman
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    Association of Hotel
                    Professionals Kenya
                  </p>
                </div>
              </section>
            </article>

            {/* SIDEBAR */}
            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="border-t-4 border-[#C8102E]">
                <div className="border-b border-slate-300 py-3">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                    On This Page
                  </p>

                  <h2 className="mt-1.5 text-xl font-black text-slate-950">
                    Membership Disclaimer
                  </h2>
                </div>

                <nav
                  aria-label="Disclaimer page navigation"
                  className="divide-y divide-slate-200"
                >
                  {pageNavigation.map(
                    ([
                      href,
                      label,
                    ]) => (
                      <ArticleSideLink
                        key={
                          href
                        }
                        href={
                          href
                        }
                        label={
                          label
                        }
                      />
                    ),
                  )}
                </nav>
              </div>

              <section className="border-t-4 border-amber-600 bg-amber-50 p-5">
                <AlertTriangle className="h-6 w-6 text-amber-700" />

                <h2 className="mt-3 text-xl font-black text-slate-950">
                  Avoid Membership Fraud
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
                  Do not pay an agent,
                  registrar or organization
                  claiming that it can issue
                  an AHPK certificate without
                  official vetting and
                  approval.
                </p>
              </section>

              <section className="border-t-4 border-[#C8102E] bg-slate-50 p-5">
                <ShieldCheck className="h-6 w-6 text-[#C8102E]" />

                <h2 className="mt-3 text-xl font-black text-slate-950">
                  Verify Before Paying
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  Always confirm payment
                  details through AHPK&apos;s
                  official telephone number
                  or email address.
                </p>

                <a
                  href={`tel:${phoneHref}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]"
                >
                  Call {phone1}

                  <ArrowRight className="h-4 w-4" />
                </a>
              </section>

              <section className="border-t-4 border-slate-950 bg-slate-950 p-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                  Official Verification
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Check a Certificate
                </h2>

                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                  Use the AHPK certificate
                  verification service before
                  accepting any membership
                  certificate.
                </p>

                <Link
                  href="/verify"
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#C8102E] px-5 text-sm font-black text-white transition hover:bg-red-700"
                >
                  Verify Certificate

                  <BadgeCheck className="h-4 w-4" />
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

function PageHeader() {
  return (
    <header
      className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
      style={
        {
          "--header-height": "88px",
        } as CSSProperties
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
        Disclaimer
      </span>
    </nav>
  );
}

function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-black uppercase tracking-[0.22em] text-[#C8102E] ${className}`}
    >
      {children}
    </p>
  );
}

function EditorialHeading({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
          <Icon
            className="h-5 w-5"
            aria-hidden="true"
          />
        </div>

        <div>
          <SectionLabel>
            {eyebrow}
          </SectionLabel>

          <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
            {title}
          </h2>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-[17px] leading-8 text-slate-700">
        {description}
      </p>
    </div>
  );
}

function NumberedRule({
  number,
  children,
}: {
  number: number;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-3 py-4 sm:grid-cols-[52px_minmax(0,1fr)] sm:items-start">
      <p className="font-black text-[#C8102E]">
        {String(number).padStart(
          2,
          "0",
        )}
      </p>

      <p className="text-[17px] leading-8 text-slate-700">
        {children}
      </p>
    </div>
  );
}

function CheckRule({
  text,
  bordered,
}: {
  text: string;
  bordered: boolean;
}) {
  return (
    <div
      className={[
        "flex gap-3 px-0 py-4 sm:px-5",
        bordered
          ? "border-b border-slate-300"
          : "",
        "sm:border-b-0 sm:border-r sm:even:border-r-0",
      ].join(" ")}
    >
      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

      <p className="text-sm font-semibold leading-7 text-slate-700">
        {text}
      </p>
    </div>
  );
}

function OfficialContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="grid gap-3 py-4 sm:grid-cols-[44px_140px_minmax(0,1fr)] sm:items-start">
      <div className="flex h-10 w-10 items-center justify-center bg-slate-950 text-white">
        <Icon className="h-4 w-4" />
      </div>

      <p className="pt-2 text-xs font-black uppercase tracking-[0.15em] text-[#C8102E]">
        {label}
      </p>

      <p className="whitespace-pre-line pt-1 text-base font-black leading-7 text-slate-950">
        {value}
      </p>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a
      href={href}
      className="block transition hover:bg-slate-50"
    >
      {content}
    </a>
  );
}

function BankDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-5 py-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">
        {label}
      </p>

      <p className="mt-2 break-all text-lg font-black text-white">
        {value}
      </p>
    </div>
  );
}

function ArticleSideLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 py-3 text-sm font-bold text-slate-700 transition hover:text-[#C8102E]"
    >
      {label}

      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#C8102E]" />
    </Link>
  );
}

function DisclaimerJsonLd({
  email,
  phone,
}: {
  email: string;
  phone: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    "@id":
      "https://ahpk.or.ke/disclaimer#article",

    url:
      "https://ahpk.or.ke/disclaimer",

    headline:
      "AHPK Membership Disclaimer and Fraud Warning",

    description:
      "Official AHPK notice concerning membership eligibility, certificate issuance, approved contacts, joining fees and fraudulent membership schemes.",

    datePublished:
      "2024-12-24",

    dateModified:
      "2024-12-24",

    inLanguage: "en-KE",

    author: {
      "@type": "Person",
      name:
        "Robert M. Kinyua",
      jobTitle: "Chairman",
    },

    publisher: {
      "@type": "Organization",

      "@id":
        "https://ahpk.or.ke/#organization",

      name:
        "Association of Hotel Professionals Kenya",

      alternateName: "AHPK",

      url:
        "https://ahpk.or.ke",

      email,
      telephone: phone,
    },

    mainEntity: {
      "@type":
        "SpecialAnnouncement",

      name:
        "AHPK Membership Disclaimer and Fraud Warning",

      datePosted:
        "2024-12-24",

      text:
        "AHPK membership certificates are issued only to vetted and approved members. AHPK does not request payment before approval or authorize unofficial agents to issue membership certificates.",
    },

    image: {
      "@type": "ImageObject",

      url:
        "https://ahpk.or.ke/disclaimer-hero.webp",

      width: 1536,
      height: 1024,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            jsonLd,
          ),
      }}
    />
  );
}
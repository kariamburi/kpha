// app/disclaimer/page.tsx

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  AlertTriangle,
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

const pagePath = "/disclaimer";

export const metadata: Metadata = {
  title: "Membership Disclaimer & Fraud Warning",

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
    siteName: "Association of Hotel Professionals Kenya",
    locale: "en_KE",
    type: "article",
    images: [
      {
        url: "/disclaimer-hero.webp",
        width: 1536,
        height: 1024,
        alt: "Official membership verification and fraud prevention",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Membership Disclaimer & Fraud Warning | AHPK",
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

const officialContacts = [
  {
    label: "Association",
    value: "Association of Hotel Professionals–Kenya",
    icon: Building2,
  },
  {
    label: "Office",
    value: "The Clarion Hotel Building, Second Floor",
    icon: MapPin,
  },
  {
    label: "Postal Address",
    value: "P.O. Box 8747–00200, City Square, Nairobi",
    icon: Mail,
  },
  {
    label: "Telephone",
    value: "+254 722 707 370",
    href: "tel:+254722707370",
    icon: Phone,
  },
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

const sidebarItems = [
  ["#official-notice", "Official Notice"],
  ["#membership-policy", "Membership Policy"],
  ["#certificate-issuance", "Certificate Issuance"],
  ["#fraud-warning", "Fraud Warning"],
  ["#official-contacts", "Official Contacts"],
  ["#banking-details", "Banking Details"],
  ["#office-bearers", "Office Bearers"],
  ["#joining-fees", "Joining Fees"],
  ["#report-fraud", "Report Fraud"],
] as const;

export default function DisclaimerPage() {
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

      <DisclaimerJsonLd />

      <PageHeader />

      {/* FULL-SCREEN HERO */}
      <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
        {/* Background image */}
        <div className="absolute inset-0 -z-30">
          <img
            src="/disclaimer-hero.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center lg:object-right"
          />
        </div>

        {/* Desktop fade */}
        <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_31%,rgba(255,255,255,0.98)_43%,rgba(255,255,255,0.9)_56%,rgba(255,255,255,0.62)_71%,rgba(255,255,255,0.2)_88%,rgba(255,255,255,0)_100%)] lg:block" />

        {/* Mobile fade */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.96)_58%,rgba(255,255,255,0.8)_80%,rgba(255,255,255,0.5)_100%)] lg:hidden" />

        {/* Subtle right-side darkening */}
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[25%] bg-gradient-to-l from-slate-950/20 to-transparent lg:block" />

        {/* Decorative glow */}
        <div className="pointer-events-none absolute -left-28 top-4 -z-10 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col px-5 py-7 sm:px-6 sm:py-8 lg:min-h-[calc(100svh-82px)] lg:px-8 lg:py-10">
          <Breadcrumb />

          <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-6">
            <div className="max-w-3xl lg:w-[60%]">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                  <ShieldAlert className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                    Official Public Notice
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Membership Verification &amp; Fraud
                    Prevention
                  </p>
                </div>
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                Membership

                <span className="mt-2 block text-[#C8102E]">
                  Disclaimer
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                Official guidance on AHPK membership,
                certificate issuance, approved communication
                channels, payment procedures and protection
                against fraudulent schemes.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                {[
                  "Official Notice",
                  "Member Vetting",
                  "Certificate Verification",
                  "Fraud Prevention",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white/85 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur sm:px-4 sm:text-[11px]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 max-w-xl border-l-4 border-[#C8102E] bg-white/80 py-3 pl-5 pr-4 backdrop-blur-sm sm:mt-8">
                <p className="text-sm font-bold leading-6 text-slate-700">
                  AHPK does not request payment before
                  membership approval and does not authorize
                  unofficial agents to issue membership
                  certificates.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-20" />
      </section>

      {/* PAGE CONTENT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
            <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              {/* Notice heading */}
              <section
                id="official-notice"
                className="scroll-mt-28 border-b border-slate-200 p-6 sm:p-9 lg:p-12"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                      <FileCheck2 className="h-7 w-7" />
                    </div>

                    <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                      Official public communication
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                      Disclaimer – AHPK Membership
                    </h2>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <CalendarDays className="h-5 w-5 text-[#C8102E]" />

                    <span className="text-sm font-extrabold text-slate-700">
                      24 December 2024
                    </span>
                  </div>
                </div>

                <div className="mt-8 rounded-[22px] border border-red-100 bg-red-50/70 p-6 sm:p-7">
                  <p className="text-lg font-extrabold text-slate-950">
                    Dear Industry Professionals and Members
                    of the Public,
                  </p>

                  <p className="mt-4 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                    This notice clarifies the official
                    membership and certificate issuance
                    procedures of the Association of Hotel
                    Professionals–Kenya and warns the public
                    against unauthorized persons and
                    organizations falsely claiming to
                    represent the Association.
                  </p>
                </div>
              </section>

              <div className="space-y-12 p-6 sm:p-9 lg:p-12">
                {/* Membership policy */}
                <section
                  id="membership-policy"
                  className="scroll-mt-28"
                >
                  <SectionHeading
                    eyebrow="Membership requirements"
                    title="AHPK Membership Policy"
                    description="Membership is reserved for qualified hospitality and tourism professionals who successfully complete the Association's vetting and approval process."
                    icon={UserRoundCheck}
                  />

                  <div className="mt-7 space-y-4">
                    {membershipRules.map((rule, index) => (
                      <ProvisionCard
                        key={rule}
                        number={index + 1}
                        text={rule}
                      />
                    ))}
                  </div>
                </section>

                {/* Certificate issuance */}
                <section
                  id="certificate-issuance"
                  className="scroll-mt-28 border-t border-slate-200 pt-10"
                >
                  <SectionHeading
                    eyebrow="Certificate verification"
                    title="Official Certificate Issuance"
                    description="AHPK certificates are issued only to applicants who meet the membership threshold and receive formal approval."
                    icon={BadgeCheck}
                  />

                  <p className="mt-6 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                    The Association has received requests
                    from professionals, including persons
                    from other countries, seeking AHPK
                    certificates to support employment or
                    promotion applications. AHPK membership
                    certificates cannot be issued for this
                    purpose unless the applicant qualifies
                    and is approved as a bona fide member.
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {certificateRules.map((rule) => (
                      <div
                        key={rule}
                        className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                        <p className="text-sm font-semibold leading-7 text-slate-700">
                          {rule}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Fraud warning */}
                <section
                  id="fraud-warning"
                  className="scroll-mt-28 border-t border-slate-200 pt-10"
                >
                  <div className="rounded-[26px] border border-amber-200 bg-amber-50 p-6 sm:p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                      <AlertTriangle className="h-7 w-7" />
                    </div>

                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-amber-700">
                      Important fraud warning
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                      Unauthorized Registrars and Payment
                      Requests
                    </h2>

                    <p className="mt-4 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                      AHPK has received reports of fake
                      organizations and individuals
                      presenting themselves as registrars
                      or representatives of the
                      Association and requesting money in
                      exchange for membership
                      certificates.
                    </p>

                    <div className="mt-7 space-y-3">
                      {fraudWarnings.map((warning) => (
                        <div
                          key={warning}
                          className="flex gap-3 rounded-xl border border-amber-200 bg-white px-4 py-4"
                        >
                          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

                          <p className="text-sm font-bold leading-6 text-slate-700">
                            {warning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Official contacts */}
                <section
                  id="official-contacts"
                  className="scroll-mt-28 border-t border-slate-200 pt-10"
                >
                  <SectionHeading
                    eyebrow="Verify all communication"
                    title="Official AHPK Contacts"
                    description="Members and applicants should verify all membership communication using the contacts listed below."
                    icon={ShieldCheck}
                  />

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {officialContacts.map((contact) => {
                      const Icon = contact.icon;

                      return (
                        <div
                          key={contact.label}
                          className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                            <Icon className="h-5 w-5" />
                          </div>

                          <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                            {contact.label}
                          </p>

                          {contact.href ? (
                            <a
                              href={contact.href}
                              className="mt-2 block text-base font-extrabold leading-7 text-slate-950 transition hover:text-[#C8102E]"
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <p className="mt-2 text-base font-extrabold leading-7 text-slate-950">
                              {contact.value}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <ContactLink
                      label="Official email"
                      value="info@kenyahoteliers.com"
                      href="mailto:info@kenyahoteliers.com"
                    />

                    <ContactLink
                      label="Alternative email"
                      value="kenyahoteliers@gmail.com"
                      href="mailto:kenyahoteliers@gmail.com"
                    />
                  </div>
                </section>

                {/* Banking */}
                <section
                  id="banking-details"
                  className="scroll-mt-28 border-t border-slate-200 pt-10"
                >
                  <SectionHeading
                    eyebrow="Official payment channel"
                    title="AHPK Banking Details"
                    description="Payments should only be made after membership approval and through the approved banking channel."
                    icon={Banknote}
                  />

                  <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 text-white">
                    <div className="border-b border-white/10 px-6 py-5">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                        Official bank account
                      </p>

                      <h3 className="mt-2 text-xl font-extrabold">
                        National Bank of Kenya
                      </h3>
                    </div>

                    <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
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

                  <div className="mt-4 flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-5">
                    <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                    <p className="text-sm font-bold leading-7 text-slate-700">
                      Confirm the payment instructions
                      directly with AHPK before
                      transferring any funds.
                    </p>
                  </div>
                </section>

                {/* Office bearers */}
                <section
                  id="office-bearers"
                  className="scroll-mt-28 border-t border-slate-200 pt-10"
                >
                  <SectionHeading
                    eyebrow="Official representatives"
                    title="Association Office Bearers"
                    description="The following office bearers may be contacted to verify official AHPK communication."
                    icon={Users}
                  />

                  <div className="mt-7 grid gap-5 md:grid-cols-3">
                    {officeBearers.map((officer) => (
                      <div
                        key={officer.office}
                        className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                          <UserRoundCheck className="h-5 w-5" />
                        </div>

                        <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                          {officer.office}
                        </p>

                        <h3 className="mt-2 text-lg font-extrabold text-slate-950">
                          {officer.name}
                        </h3>

                        <a
                          href={officer.href}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-slate-600 transition hover:text-[#C8102E]"
                        >
                          <Phone className="h-4 w-4" />
                          {officer.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Joining fees */}
                <section
                  id="joining-fees"
                  className="scroll-mt-28 border-t border-slate-200 pt-10"
                >
                  <div className="rounded-[26px] border border-red-100 bg-red-50 p-6 sm:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
                      <BadgeCheck className="h-6 w-6" />
                    </div>

                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                      Joining and subscription fees
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                      No Payment Before Approval
                    </h2>

                    <p className="mt-4 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                      AHPK does not ask prospective
                      members to make any payment before
                      their membership application has
                      been vetted and approved. After
                      approval, the applicant will receive
                      official communication explaining
                      the applicable joining and
                      subscription fees.
                    </p>
                  </div>
                </section>

                {/* Report fraud */}
                <section
                  id="report-fraud"
                  className="scroll-mt-28 border-t border-slate-200 pt-10"
                >
                  <div className="rounded-[26px] bg-slate-950 p-7 text-white sm:p-9">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <ShieldAlert className="h-6 w-6" />
                    </div>

                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                      Protect yourself from fraud
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                      Report Suspicious Communication
                    </h2>

                    <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-white/75 sm:text-base sm:leading-8">
                      Any phone call, email or payment
                      request that does not originate from
                      the official contacts listed on this
                      page should be ignored. Suspicious
                      demands should be reported to the
                      appropriate law enforcement
                      authorities.
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="mailto:info@kenyahoteliers.com"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white transition hover:bg-red-700"
                      >
                        <Mail className="h-4 w-4" />
                        Verify by Email
                      </a>

                      <a
                        href="tel:+254722707370"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-extrabold text-white transition hover:bg-white/15"
                      >
                        <Phone className="h-4 w-4" />
                        Call AHPK
                      </a>
                    </div>
                  </div>
                </section>

                {/* Signature */}
                <section className="border-t border-slate-200 pt-10">
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
                    <Scale className="h-8 w-8 text-[#C8102E]" />

                    <p className="mt-6 text-sm font-medium leading-7 text-slate-600">
                      Issued on behalf of the Association
                      of Hotel Professionals–Kenya.
                    </p>

                    <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                      Robert M. Kinyua FAHPK
                    </h2>

                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#C8102E]">
                      Chairman
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      Association of Hotel
                      Professionals–Kenya
                    </p>
                  </div>
                </section>
              </div>
            </article>

            {/* SIDEBAR */}
            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                <div className="bg-[#C8102E] px-6 py-5 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                    On this page
                  </p>

                  <h2 className="mt-2 text-xl font-extrabold">
                    Membership Disclaimer
                  </h2>
                </div>

                <nav className="p-3">
                  {sidebarItems.map(
                    ([href, label], index) => (
                      <SidebarLink
                        key={href}
                        href={href}
                        label={label}
                        active={index === 0}
                      />
                    ),
                  )}
                </nav>
              </div>

              <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-6">
                <AlertTriangle className="h-8 w-8 text-amber-700" />

                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                  Avoid Membership Fraud
                </h2>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
                  Do not pay an agent, registrar or
                  organization claiming that it can issue an
                  AHPK certificate without official vetting
                  and approval.
                </p>
              </div>

              <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
                <ShieldCheck className="h-8 w-8 text-[#C8102E]" />

                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                  Verify Before Paying
                </h2>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                  Always confirm payment details through
                  AHPK&apos;s official telephone number or
                  email addresses.
                </p>

                <a
                  href="tel:+254722707370"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                >
                  Call +254 722 707 370
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof ShieldCheck;
}) {
  return (
    <div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
        <Icon className="h-6 w-6" />
      </div>

      <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
        {title}
      </h2>

      <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
        {description}
      </p>
    </div>
  );
}

function ProvisionCard({
  number,
  text,
}: {
  number: number;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E]">
        {String(number).padStart(2, "0")}
      </div>

      <p className="pt-1 text-sm font-semibold leading-7 text-slate-700 sm:text-base">
        {text}
      </p>
    </div>
  );
}

function ContactLink({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-200 hover:bg-red-50/40"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
        <Mail className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-all text-sm font-extrabold text-slate-950 transition group-hover:text-[#C8102E]">
          {value}
        </p>
      </div>
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
    <div className="px-6 py-6">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">
        {label}
      </p>

      <p className="mt-2 text-lg font-extrabold text-white">{value}</p>
    </div>
  );
}

function SidebarLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "group flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-[#C8102E]"
          : "group mt-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
      }
    >
      {label}

      <ChevronRight
        className={
          active
            ? "h-4 w-4"
            : "h-4 w-4 text-slate-300 transition group-hover:text-[#C8102E]"
        }
      />
    </Link>
  );
}

function DisclaimerJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://ahpk.or.ke/disclaimer#article",
    url: "https://ahpk.or.ke/disclaimer",
    headline: "AHPK Membership Disclaimer",
    description:
      "Official AHPK notice concerning membership eligibility, certificate issuance, approved contacts, joining fees and fraudulent membership schemes.",
    datePublished: "2024-12-24",
    dateModified: "2024-12-24",
    inLanguage: "en-KE",

    author: {
      "@type": "Person",
      name: "Robert M. Kinyua",
      jobTitle: "Chairman",
    },

    publisher: {
      "@type": "Organization",
      "@id": "https://ahpk.or.ke/#organization",
      name: "Association of Hotel Professionals Kenya",
      alternateName: "AHPK",
      url: "https://ahpk.or.ke",
    },

    mainEntity: {
      "@type": "SpecialAnnouncement",
      name: "AHPK Membership Disclaimer and Fraud Warning",
      datePosted: "2024-12-24",
      text: "AHPK membership certificates are issued only to vetted and approved members. AHPK does not request payment before approval or authorize unofficial agents to issue certificates.",
      category: "Membership Verification",
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

      <span className="text-[#C8102E]" aria-current="page">
        Disclaimer
      </span>
    </nav>
  );
}
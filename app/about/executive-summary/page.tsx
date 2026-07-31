// app/about/executive-summary/page.tsx

import type {
    CSSProperties,
    ReactNode,
} from "react";
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    ChevronRight,
    FileText,
    Home,
    ShieldCheck,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

export const metadata: Metadata = {
    title: "Executive Summary",

    description:
        "Read the Executive Summary of the Association of Hotel Professionals Kenya, including its formation, registration history and professional mandate.",

    keywords: [
        "AHPK Executive Summary",
        "Association of Hotel Professionals Kenya",
        "AHPK history",
        "AHPK formation",
        "AHPK registration",
        "hospitality professionals Kenya",
        "hotel professionals Kenya",
        "hospitality association Kenya",
    ],

    alternates: {
        canonical: "/about/executive-summary",
    },

    openGraph: {
        title:
            "Executive Summary | Association of Hotel Professionals Kenya",

        description:
            "Learn how AHPK was formed and established to represent hospitality professionals in Kenya.",

        url: "/about/executive-summary",

        siteName:
            "Association of Hotel Professionals Kenya",

        locale: "en_KE",
        type: "website",

        images: [
            {
                url: "/executive-summary.webp",
                width: 1536,
                height: 1024,
                alt:
                    "Hospitality professionals represented by AHPK",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title: "Executive Summary | AHPK",

        description:
            "Read about the formation and professional mandate of the Association of Hotel Professionals Kenya.",

        images: ["/executive-summary.webp"],
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

const summarySections = [
    {
        id: "formation",
        label: "Formation",
    },
    {
        id: "industry-context",
        label: "Industry Context",
    },
    {
        id: "professional-mandate",
        label: "Professional Mandate",
    },
    {
        id: "registration-process",
        label: "Registration Process",
    },
    {
        id: "association-name",
        label: "Association Name",
    },
];

export default function ExecutiveSummaryPage() {
    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: "Home",
                        url: "/",
                    },
                    {
                        name: "About AHPK",
                        url: "/about",
                    },
                    {
                        name: "Executive Summary",
                        url: "/about/executive-summary",
                    },
                ]}
            />

            <ExecutiveSummaryJsonLd />

            <PageHeader />

            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 max-w-5xl">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            About AHPK
                        </p>

                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                            Executive Summary
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            The background, formation,
                            registration history and
                            professional mandate of the
                            Association of Hotel Professionals
                            Kenya.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                href="/about/who-we-are"
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-[#A80D27]"
                            >
                                Who We Are

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/members-section/constitution-rules/membership"
                                className="inline-flex min-h-11 items-center justify-center border border-slate-300 px-6 text-sm font-black text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                            >
                                Explore Membership
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
                                src="/executive-summary.webp"
                                alt="Hospitality professionals represented by AHPK"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            AHPK was established to give
                            hospitality professionals in Kenya
                            a recognised, organised and
                            representative professional voice.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* SUMMARY INTRODUCTION */}
                            <section
                                id="executive-summary"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <FileText
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <SectionLabel>
                                            Official Overview
                                        </SectionLabel>

                                        <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                            Executive Summary
                                        </h2>
                                    </div>
                                </div>

                                <p className="mt-4 border-l-4 border-slate-300 pl-4 text-lg font-bold leading-8 text-slate-800 sm:text-xl sm:leading-9">
                                    AHPK emerged from a professional
                                    forum convened to establish a
                                    recognised association for
                                    hospitality professionals and
                                    strengthen their voice within
                                    Kenya&apos;s growing hospitality
                                    industry.
                                </p>
                            </section>

                            {/* FORMATION */}
                            <SummarySection
                                id="formation"
                                number="01"
                                eyebrow="The Beginning"
                                title="Formation of the Association"
                            >
                                <p>
                                    Following the forum held on{" "}
                                    <strong className="font-black text-slate-950">
                                        10 January 2015
                                    </strong>{" "}
                                    by hotel professional colleagues
                                    from the wider hospitality
                                    industry, an idea was proposed to
                                    form and register a professional
                                    association.
                                </p>

                                <p>
                                    The Association would be tasked
                                    with the mandate of regulating
                                    professional practice and giving
                                    a recognised voice to
                                    professionals working throughout
                                    the industry.
                                </p>

                                <p>
                                    This was especially important in
                                    relation to hospitality
                                    establishments including hotels,
                                    lodges, restaurants, bars, spas,
                                    country clubs, hospitals,
                                    entertainment businesses,
                                    meetings and convention
                                    industries.
                                </p>
                            </SummarySection>

                            {/* INDUSTRY CONTEXT */}
                            <SummarySection
                                id="industry-context"
                                number="02"
                                eyebrow="Industry Background"
                                title="Why Professional Representation Was Needed"
                            >
                                <p>
                                    It was felt that despite the
                                    tremendous gains achieved through
                                    the growth of the hospitality
                                    industry, the benefits from the
                                    industry&apos;s resources were
                                    disproportionately skewed in
                                    favour of investors and foreign
                                    expatriate workers.
                                </p>

                                <p>
                                    This situation was considered
                                    unfair when taking into account
                                    the social and economic
                                    contribution made by the sector.
                                    Hospitality is a labour-intensive
                                    industry, a major contributor to
                                    Kenya&apos;s gross domestic
                                    product and an important source
                                    of foreign exchange.
                                </p>

                                <p>
                                    It was further noted that the
                                    first group of locally trained
                                    professional managers had joined
                                    formal training in{" "}
                                    <strong className="font-black text-slate-950">
                                        1969
                                    </strong>{" "}
                                    at the former Hotel Training
                                    School based at the Technical
                                    University, formerly Kenya
                                    Polytechnic.
                                </p>

                                <p>
                                    Nevertheless, major hotel chains
                                    and travel-sector organisations
                                    continued to import expatriate
                                    labour despite the existence of
                                    highly qualified and experienced
                                    Kenyan managers and other
                                    professional cadres.
                                </p>

                                <p>
                                    This practice was considered to
                                    work against the
                                    government&apos;s policy of
                                    creating employment for trained
                                    and qualified home-grown
                                    professionals.
                                </p>

                                <p>
                                    It also resulted in significant
                                    capital outflow to other
                                    economies while Kenya remained a
                                    source of highly trained and
                                    skilled industry workers, even as
                                    professional opportunities
                                    remained difficult to secure
                                    locally.
                                </p>
                            </SummarySection>

                            {/* PROFESSIONAL MANDATE */}
                            <SummarySection
                                id="professional-mandate"
                                number="03"
                                eyebrow="Purpose"
                                title="The Association’s Professional Mandate"
                            >
                                <p>
                                    The Association&apos;s objective
                                    is to create community goodwill
                                    and provide its members with
                                    career development, professional
                                    growth and empowerment.
                                </p>

                                <p>
                                    It seeks to achieve this through
                                    networking, collaboration and
                                    business partnerships among
                                    members both within and outside
                                    the hospitality profession.
                                </p>

                                <div className="mt-5 grid border-y border-slate-300 sm:grid-cols-3">
                                    <SummaryFact
                                        label="Professional voice"
                                        value="Representation"
                                    />

                                    <SummaryFact
                                        label="Member development"
                                        value="Career growth"
                                    />

                                    <SummaryFact
                                        label="Industry network"
                                        value="Collaboration"
                                    />
                                </div>
                            </SummarySection>

                            {/* REGISTRATION PROCESS */}
                            <SummarySection
                                id="registration-process"
                                number="04"
                                eyebrow="Official Process"
                                title="The Registration Journey"
                            >
                                <p>
                                    The forum appointed a steering
                                    committee to pursue the idea and
                                    gave the committee the mandate
                                    to begin searching for a suitable
                                    association name.
                                </p>

                                <p>
                                    After securing an appropriate
                                    name, the committee was required
                                    to seek a letter of No Objection
                                    from the Tourism Regulatory
                                    Authority, a department within
                                    the Ministry of Tourism mandated
                                    to regulate and license
                                    operators and participants
                                    within the hotel and tourism
                                    industry.
                                </p>

                                <p>
                                    The committee initially settled
                                    on the name{" "}
                                    <strong className="font-black text-slate-950">
                                        “Association of Hospitality
                                        and Tourism Professionals”
                                    </strong>
                                    .
                                </p>

                                <p>
                                    A name search was initiated
                                    through a letter dated{" "}
                                    <strong className="font-black text-slate-950">
                                        12 January 2015
                                    </strong>
                                    , after which the proposed names
                                    were confirmed as available and
                                    reserved.
                                </p>

                                <p>
                                    On{" "}
                                    <strong className="font-black text-slate-950">
                                        5 June 2015
                                    </strong>
                                    , the Tourism Regulatory
                                    Authority issued a letter of No
                                    Objection under reference{" "}
                                    <strong className="font-black text-slate-950">
                                        TRA/1/14/(222)
                                    </strong>
                                    .
                                </p>

                                <div className="mt-5 grid border-y border-slate-300 sm:grid-cols-3">
                                    <SummaryFact
                                        label="Forum held"
                                        value="10 Jan 2015"
                                    />

                                    <SummaryFact
                                        label="Name search"
                                        value="12 Jan 2015"
                                    />

                                    <SummaryFact
                                        label="No objection"
                                        value="5 Jun 2015"
                                    />
                                </div>
                            </SummarySection>

                            {/* ASSOCIATION NAME */}
                            <SummarySection
                                id="association-name"
                                number="05"
                                eyebrow="Final Identity"
                                title="Adoption of the AHPK Name"
                            >
                                <p>
                                    When the interim official
                                    proceeded to file the formal
                                    registration of the Association,
                                    it was discovered that the
                                    previously reserved name was no
                                    longer available.
                                </p>

                                <p>
                                    Another association had already
                                    been registered using the name{" "}
                                    <strong className="font-black text-slate-950">
                                        “Tourism Professional
                                        Association”
                                    </strong>
                                    , and the committee was advised
                                    to select another name to avoid
                                    duplication or conflicts of
                                    interest.
                                </p>

                                <p>
                                    A further meeting was convened
                                    and several alternative names
                                    were proposed.
                                </p>

                                <p>
                                    It was eventually decided to
                                    adopt the name{" "}
                                    <strong className="font-black text-slate-950">
                                        “Association of Hotel
                                        Professionals Kenya”
                                    </strong>{" "}
                                    because the majority of the
                                    founder members came from hotel
                                    industry backgrounds.
                                </p>

                                <p>
                                    The Tourism Regulatory Authority
                                    later confirmed that there was
                                    no need to apply for another
                                    letter of No Objection because
                                    the original letter had already
                                    fulfilled the required
                                    objectives.
                                </p>

                                <p>
                                    The committee was instead
                                    requested to provide a copy of
                                    the new name for official filing
                                    purposes.
                                </p>

                                <div className="mt-5 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                        Final registered identity
                                    </p>

                                    <p className="mt-2 text-2xl font-black leading-tight text-slate-950">
                                        Association of Hotel
                                        Professionals Kenya
                                    </p>

                                    <p className="mt-1.5 text-sm font-bold text-slate-500">
                                        Commonly abbreviated as AHPK
                                    </p>
                                </div>
                            </SummarySection>

                            {/* NEXT PAGE */}
                            <section className="border-t border-slate-300 pt-5">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Continue reading
                                </p>

                                <Link
                                    href="/about/who-we-are"
                                    className="group mt-3 flex items-center justify-between gap-5 border-y border-slate-300 py-4"
                                >
                                    <div>
                                        <p className="text-sm font-bold text-slate-500">
                                            About the Association
                                        </p>

                                        <p className="mt-1 text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                                            Learn more about who we are
                                        </p>
                                    </div>

                                    <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
                                </Link>
                            </section>
                        </article>

                        {/* STICKY SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <div className="border-t-4 border-[#C8102E]">
                                <div className="border-b border-slate-300 py-3">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        On this page
                                    </p>

                                    <h2 className="mt-1.5 text-xl font-black text-slate-950">
                                        Executive Summary
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Executive Summary navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    {summarySections.map(
                                        (section) => (
                                            <ArticleSideLink
                                                key={section.id}
                                                href={`#${section.id}`}
                                                label={section.label}
                                            />
                                        ),
                                    )}
                                </nav>
                            </div>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <ShieldCheck
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    A professional voice
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    AHPK was established to
                                    represent, support and advance
                                    hospitality professionals in
                                    Kenya.
                                </p>

                                <Link
                                    href="/about/who-we-are"
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]"
                                >
                                    Who We Are

                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                    Membership
                                </p>

                                <h2 className="mt-2 text-xl font-black">
                                    Join the professional community
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Access professional
                                    recognition, development,
                                    networking and member services.
                                </p>

                                <Link
                                    href="/apply"
                                    className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#C8102E] px-5 text-sm font-black text-white transition hover:bg-red-700"
                                >
                                    Apply for Membership

                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </section>
                        </aside>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="border-t border-slate-300 bg-slate-950 py-8 text-white sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div className="max-w-4xl">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-300">
                                Be part of AHPK
                            </p>

                            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                                Help strengthen the professional
                                future of Kenya&apos;s hospitality
                                industry.
                            </h2>

                            <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-slate-300">
                                Join a recognised professional
                                association committed to
                                representation, development,
                                ethical practice and industry
                                collaboration.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                            <Link
                                href="/apply"
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-red-700"
                            >
                                Apply for Membership

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/about/who-we-are"
                                className="inline-flex min-h-11 items-center justify-center border border-white/40 px-6 text-sm font-black text-white transition hover:bg-white hover:text-slate-950"
                            >
                                Who We Are
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function SummarySection({
    id,
    number,
    eyebrow,
    title,
    children,
}: {
    id: string;
    number: string;
    eyebrow: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section
            id={id}
            className="scroll-mt-28 border-t border-slate-300 py-8"
        >
            <div className="grid gap-3 sm:grid-cols-[52px_minmax(0,1fr)]">
                <p className="text-3xl font-black leading-none text-slate-300">
                    {number}
                </p>

                <div>
                    <SectionLabel>
                        {eyebrow}
                    </SectionLabel>

                    <h2 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="mt-4 space-y-4 text-[17px] font-normal leading-8 text-slate-700 sm:text-lg sm:leading-9">
                {children}
            </div>
        </section>
    );
}

function SectionLabel({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
            {children}
        </p>
    );
}

function SummaryFact({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="border-b border-slate-300 px-0 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                {label}
            </p>

            <p className="mt-1.5 text-base font-black text-slate-950">
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

            <Link
                href="/about"
                className="transition hover:text-[#C8102E]"
            >
                About Us
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Executive Summary
            </span>
        </nav>
    );
}

function ExecutiveSummaryJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",

        "@type": "AboutPage",

        "@id":
            "https://ahpk.or.ke/about/executive-summary#webpage",

        url:
            "https://ahpk.or.ke/about/executive-summary",

        name:
            "Executive Summary | Association of Hotel Professionals Kenya",

        headline:
            "Executive Summary of the Association of Hotel Professionals Kenya",

        description:
            "The formation, registration history and professional mandate of the Association of Hotel Professionals Kenya.",

        inLanguage: "en-KE",

        isPartOf: {
            "@type": "WebSite",

            "@id":
                "https://ahpk.or.ke/#website",

            name:
                "Association of Hotel Professionals Kenya",

            url: "https://ahpk.or.ke",
        },

        about: {
            "@type": "Organization",

            "@id":
                "https://ahpk.or.ke/#organization",

            name:
                "Association of Hotel Professionals Kenya",

            alternateName: "AHPK",

            url: "https://ahpk.or.ke",
        },

        primaryImageOfPage: {
            "@type": "ImageObject",

            url:
                "https://ahpk.or.ke/executive-summary.webp",

            width: 1536,
            height: 1024,
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
// app/members-section/code-of-conduct-ethics/
// handling-alleged-violations/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    FileWarning,
    Home,
    Scale,
    ShieldCheck,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath =
    "/members-section/code-of-conduct-ethics/handling-alleged-violations";

export const metadata: Metadata = {
    title: "Handling Alleged Violations",

    description:
        "Read the AHPK procedures for filing, investigating and determining complaints involving alleged violations of the Code of Professional Conduct.",

    keywords: [
        "AHPK alleged violations",
        "AHPK complaints procedure",
        "AHPK disciplinary process",
        "hospitality professional conduct Kenya",
        "Association of Hotel Professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Handling Alleged Violations | Association of Hotel Professionals Kenya",
        description:
            "AHPK procedures for complaints, investigations, arbitration, confidentiality and disciplinary action.",
        url: pagePath,
        siteName:
            "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "article",
        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt: "AHPK professional conduct and disciplinary procedures",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Handling Alleged Violations | AHPK",
        description:
            "AHPK complaint, investigation and disciplinary procedures.",
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

const processSteps = [
    {
        title: "Filing a Complaint",
        description:
            "Any person, whether a member or non-member, may file a complaint of misconduct against a member. Misconduct is deemed to be any violation of the Code of Professional Conduct. A complaint may be formal or informal.",
    },
    {
        title: "Formal Complaint",
        description:
            "A formal complaint is a written statement of the alleged facts supported by evidence. The Chair transmits copies to the Professional Conduct Committee and the accused member, identifying the person who filed the complaint. After investigation, the Committee decides whether to dismiss the complaint or refer it, with recommendations, to the Executive Committee for hearing and decision.",
    },
    {
        title: "Informal Complaint",
        description:
            "Upon receiving an informal complaint, the Chair initiates a confidential inquiry to confirm its substance. Where reasonable grounds exist, the Chair formulates a statement of complaint and the accused member may submit an explanation or rebuttal within 30 days.",
    },
    {
        title: "Executive Committee Review",
        description:
            "Where the Professional Conduct Committee Chair and the Association Chair jointly determine that the charges are sufficiently serious, the Executive Committee reviews the matter and determines the appropriate next step.",
    },
    {
        title: "Arbitration and Decision",
        description:
            "The Executive Committee serves as an impartial arbitration committee and hears testimony from the Professional Conduct Committee and the accused member. Any member with a conflict of interest must be replaced, and all individuals serving on the arbitration committee must sign a non-conflict declaration.",
    },
    {
        title: "Confidentiality",
        description:
            "All matters concerning the filing and investigation of complaints remain confidential and are not made public until the final step of the procedure has been completed. Any committee member who breaches confidentiality may be disciplined.",
    },
];

const executiveActions = [
    "Dismiss the complaint.",
    "Request the Association Chair to obtain additional information required to reach a decision.",
    "Request the Association Chair to issue a warning or an immediate cease and desist order. If the same violation occurs after such an order has been communicated, a formal complaint will be entered against the offending member.",
];

const possibleDecisions = [
    "Dismissal of the complaint without prejudice.",
    "A letter of censure from the Association Chair.",
    "Suspension from the Association for a stated period.",
    "Expulsion from the Association.",
];

const exitRequirements = [
    "Return the Certificate of Membership and Association lapel pin to the Association office.",
    "Cease using the AHPK designation in association with their name, reports or any other communication.",
    "No longer represent themselves as a member of AHPK.",
    "Understand that no refund of membership or subscription fees, or any interest arising from them, will be payable.",
];

export default function HandlingAllegedViolationsPage() {
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
                        url:
                            "/members-section/code-of-conduct-ethics",
                    },
                    {
                        name: "Handling Alleged Violations",
                        url: pagePath,
                    },
                ]}
            />

            <HandlingViolationsJsonLd />

            <PageHeader />

            {/* PAGE HERO — FULL-SCREEN BACKGROUND IMAGE */}
            <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
                {/* Background image */}
                <div className="absolute inset-0 -z-30">
                    <img
                        src="/handling-alleged-violations.webp"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover object-center lg:object-right"
                    />
                </div>

                {/* Desktop: white content area fading into image */}
                <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_30%,rgba(255,255,255,0.98)_42%,rgba(255,255,255,0.9)_55%,rgba(255,255,255,0.65)_68%,rgba(255,255,255,0.32)_82%,rgba(255,255,255,0)_100%)] lg:block" />

                {/* Mobile/tablet overlay */}
                <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.96)_55%,rgba(255,255,255,0.78)_76%,rgba(255,255,255,0.45)_100%)] lg:hidden" />

                {/* Subtle darkening on far right */}
                <div className="absolute inset-y-0 right-0 -z-10 hidden w-[26%] bg-gradient-to-l from-slate-950/25 to-transparent lg:block" />

                {/* Decorative red glow */}
                <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-red-100/60 blur-3xl" />

                <div className="relative mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col px-5 py-7 sm:px-6 sm:py-8 lg:min-h-[calc(100svh-82px)] lg:px-8 lg:py-10">
                    <Breadcrumb />

                    {/* Content fills remaining height */}
                    <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-6">
                        <div className="max-w-3xl lg:w-[57%]">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                                    <FileWarning className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                                        Code of Conduct &amp; Ethics
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        Complaints and Disciplinary Procedure
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                                Handling Alleged

                                <span className="mt-2 block text-[#C8102E]">
                                    Violations
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                The procedures followed by AHPK when receiving,
                                investigating and deciding complaints involving alleged
                                professional misconduct.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                                {[
                                    "Fairness",
                                    "Confidentiality",
                                    "Investigation",
                                    "Impartiality",
                                    "Accountability",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-slate-200 bg-white/85 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur sm:px-4 sm:text-[11px]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-7 max-w-xl border-l-4 border-[#C8102E] bg-white/75 py-3 pl-5 pr-4 backdrop-blur-sm sm:mt-8">
                                <p className="text-sm font-bold leading-6 text-slate-700">
                                    Complaints are handled through confidential inquiry,
                                    impartial review and appropriate disciplinary action.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Smooth transition into next section */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-20" />
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        <article className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9 lg:p-12">
                            <div
                                id="complaints-process"
                                className="scroll-mt-28"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <FileWarning
                                        className="h-7 w-7"
                                        aria-hidden="true"
                                    />
                                </div>

                                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                    Complaints procedure
                                </p>

                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    Handling Alleged Violations
                                </h2>

                                <div className="mt-7 rounded-2xl border border-red-100 bg-red-50/70 p-6">
                                    <p className="text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                        Any person, member or
                                        non-member, may file a
                                        complaint of misconduct against
                                        an AHPK member. Misconduct is
                                        deemed to be any violation of
                                        the Code of Professional
                                        Conduct, and a complaint may be
                                        formal or informal.
                                    </p>
                                </div>

                                <ol className="mt-9 space-y-6">
                                    {processSteps.map(
                                        (step, index) => (
                                            <li
                                                key={step.title}
                                                id={`step-${index + 1}`}
                                                className="scroll-mt-28 rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E]">
                                                        {String(
                                                            index + 1,
                                                        ).padStart(
                                                            2,
                                                            "0",
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <div className="flex items-start gap-3">
                                                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                                                            <h3 className="text-lg font-extrabold leading-tight text-slate-950">
                                                                {
                                                                    step.title
                                                                }
                                                            </h3>
                                                        </div>

                                                        <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                                            {
                                                                step.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ),
                                    )}
                                </ol>

                                <section
                                    id="executive-actions"
                                    className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                                >
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Executive Committee options
                                    </p>

                                    <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                                        Actions Following Review
                                    </h3>

                                    <ul className="mt-6 space-y-4">
                                        {executiveActions.map(
                                            (action, index) => (
                                                <li
                                                    key={action}
                                                    className="flex gap-4 rounded-2xl border border-slate-200 p-5"
                                                >
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E]">
                                                        {index + 1}
                                                    </div>

                                                    <p className="text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                                        {action}
                                                    </p>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </section>

                                <section
                                    id="possible-decisions"
                                    className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                                >
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Possible outcomes
                                    </p>

                                    <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                                        Committee Decisions
                                    </h3>

                                    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                                        {possibleDecisions.map(
                                            (decision) => (
                                                <li
                                                    key={decision}
                                                    className="flex gap-3 rounded-2xl border border-slate-200 p-5"
                                                >
                                                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                                                    <p className="text-sm font-medium leading-7 text-slate-600">
                                                        {decision}
                                                    </p>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </section>

                                <section
                                    id="membership-exit"
                                    className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                                >
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Membership withdrawal or
                                        removal
                                    </p>

                                    <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                                        Requirements After Leaving
                                        AHPK
                                    </h3>

                                    <ul className="mt-6 space-y-4">
                                        {exitRequirements.map(
                                            (requirement, index) => (
                                                <li
                                                    key={
                                                        requirement
                                                    }
                                                    className="flex gap-4 rounded-2xl border border-slate-200 p-5"
                                                >
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E]">
                                                        {index + 1}
                                                    </div>

                                                    <p className="text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                                        {
                                                            requirement
                                                        }
                                                    </p>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </section>

                                <div className="mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
                                    <Link
                                        href="/members-section/code-of-conduct-ethics/professional-relationships"
                                        className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-200 hover:bg-red-50"
                                    >
                                        <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                        <span>
                                            <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                                Previous
                                            </span>

                                            <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                                Professional
                                                Relationships
                                            </span>
                                        </span>
                                    </Link>

                                    <Link
                                        href="/members-section/code-of-conduct-ethics/code-of-ethics-conduct-pledge"
                                        className="group flex min-h-24 items-center justify-end gap-4 rounded-2xl border border-slate-200 p-5 text-right transition hover:border-red-200 hover:bg-red-50"
                                    >
                                        <span>
                                            <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                                Next
                                            </span>

                                            <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                                Code of Ethics &amp;
                                                Conduct Pledge
                                            </span>
                                        </span>

                                        <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                    </Link>
                                </div>
                            </div>
                        </article>

                        {/* SIDE PANEL */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                                <div className="bg-[#C8102E] px-6 py-5 text-white">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                                        On this page
                                    </p>

                                    <h2 className="mt-2 text-xl font-extrabold">
                                        Complaint Process
                                    </h2>
                                </div>

                                <nav className="p-3">
                                    <Link
                                        href="#complaints-process"
                                        className="group flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-[#C8102E]"
                                    >
                                        Complaints Procedure
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>

                                    <Link
                                        href="#executive-actions"
                                        className="group mt-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
                                    >
                                        Executive Actions
                                        <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-[#C8102E]" />
                                    </Link>

                                    <Link
                                        href="#possible-decisions"
                                        className="group mt-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
                                    >
                                        Possible Decisions
                                        <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-[#C8102E]" />
                                    </Link>

                                    <Link
                                        href="#membership-exit"
                                        className="group mt-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
                                    >
                                        Leaving AHPK
                                        <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-[#C8102E]" />
                                    </Link>
                                </nav>
                            </div>

                            <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
                                <ShieldCheck
                                    className="h-8 w-8 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Fair and Confidential
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Complaints must be handled
                                    impartially, confidentially and in
                                    accordance with the Association’s
                                    established disciplinary
                                    procedures.
                                </p>

                                <Link
                                    href="/members-section/code-of-conduct-ethics"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    View Full Code
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function HandlingViolationsJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/code-of-conduct-ethics/handling-alleged-violations#article",
        url:
            "https://ahpk.or.ke/members-section/code-of-conduct-ethics/handling-alleged-violations",
        headline: "Handling Alleged Violations",
        description:
            "AHPK procedures for complaints, investigations, arbitration, confidentiality and disciplinary action.",
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

            <Link
                href="/members-section/code-of-conduct-ethics"
                className="transition hover:text-[#C8102E]"
            >
                Code of Conduct &amp; Ethics
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Handling Alleged Violations
            </span>
        </nav>
    );
}
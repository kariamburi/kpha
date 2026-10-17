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

            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 max-w-5xl">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            Code of Conduct &amp; Ethics
                        </p>

                        <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
                            Handling Alleged
                            <span className="text-[#C8102E]">
                                {"\u00A0"}Violations
                            </span>
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            The procedures followed by AHPK when
                            receiving, investigating and deciding
                            complaints involving alleged
                            professional misconduct.
                        </p>
                    </div>
                </div>
            </section>

            {/* FEATURE IMAGE */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
                    <figure>
                        <div className="aspect-[16/6] overflow-hidden bg-slate-200">
                            <img
                                src="/law_office_scene.webp"
                                alt="AHPK professional conduct and disciplinary procedures"
                                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
                            />
                        </div>

                        <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            Complaints are handled through
                            confidential inquiry, impartial review
                            and proportionate disciplinary action.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-5 sm:py-7">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* INTRODUCTION */}
                            <section
                                id="complaints-process"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-5 pt-3"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <FileWarning
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>

                                        <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                                            Handling Alleged Violations
                                        </h2>
                                    </div>
                                </div>

                                <blockquote className="mt-3 border-l-4 border-[#C8102E] bg-slate-50 px-4 py-3 text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                    Any person, member or
                                    non-member, may file a complaint
                                    of misconduct against an AHPK
                                    member. Misconduct is deemed to
                                    be any violation of the Code of
                                    Professional Conduct, and a
                                    complaint may be formal or
                                    informal.
                                </blockquote>
                            </section>

                            {/* PROCESS STEPS */}
                            <section className="border-t border-slate-300 py-5 sm:py-6">

                                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    From filing to final determination
                                </h2>

                                <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-600 sm:text-base">
                                    The disciplinary process
                                    progresses through complaint
                                    filing, confidential inquiry,
                                    investigation, review,
                                    arbitration and final decision.
                                </p>

                                <ul className="mt-3 list-disc space-y-0.5 pl-5 marker:text-[#C8102E]">
                                    {processSteps.map((step, index) => (
                                        <li key={step.title} id={`step-${index + 1}`} className="scroll-mt-28 py-1.5 text-sm leading-7 text-slate-700 sm:text-base">
                                            <span className="font-black text-slate-950">{step.title}:</span>{" "}{step.description}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* EXECUTIVE ACTIONS */}
                            <section
                                id="executive-actions"
                                className="scroll-mt-28 border-t border-slate-300 py-5 sm:py-6"
                            >

                                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    Actions Following Review
                                </h2>

                                <ul className="mt-3 list-disc space-y-0.5 pl-5 marker:text-[#C8102E]">
                                    {executiveActions.map(
                                        (action, index) => (
                                            <ListItem
                                                key={action}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                text={action}
                                            />
                                        ),
                                    )}
                                </ul>
                            </section>

                            {/* POSSIBLE DECISIONS */}
                            <section
                                id="possible-decisions"
                                className="scroll-mt-28 border-t border-slate-300 py-5 sm:py-6"
                            >

                                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    Committee Decisions
                                </h2>

                                <ul className="mt-3 list-disc space-y-0.5 pl-5 marker:text-[#C8102E]">
                                    {possibleDecisions.map(
                                        (decision, index) => (
                                            <DecisionItem
                                                key={decision}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                text={decision}
                                            />
                                        ),
                                    )}
                                </ul>
                            </section>

                            {/* EXIT REQUIREMENTS */}
                            <section
                                id="membership-exit"
                                className="scroll-mt-28 border-t border-slate-300 py-5 sm:py-6"
                            >

                                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    Requirements After Leaving AHPK
                                </h2>

                                <ul className="mt-3 list-disc space-y-0.5 pl-5 marker:text-[#C8102E]">
                                    {exitRequirements.map(
                                        (requirement, index) => (
                                            <ListItem
                                                key={requirement}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                text={requirement}
                                            />
                                        ),
                                    )}
                                </ul>
                            </section>

                            {/* GOVERNING PRINCIPLES */}
                            <section className="border-t border-slate-300 py-5 sm:py-6">

                                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    Safeguards within the process
                                </h2>

                                <ul className="mt-3 list-disc space-y-0.5 pl-5 marker:text-[#C8102E]">
                                    <PrincipleItem
                                        number="01"
                                        title="Confidentiality"
                                        description="Complaint details remain private until the final stage of the procedure has been completed."
                                    />

                                    <PrincipleItem
                                        number="02"
                                        title="Impartiality"
                                        description="Decision-makers must be free from conflicts and should sign appropriate non-conflict declarations."
                                    />

                                    <PrincipleItem
                                        number="03"
                                        title="Right to Respond"
                                        description="An accused member is given an opportunity to provide an explanation, rebuttal and testimony."
                                    />

                                    <PrincipleItem
                                        number="04"
                                        title="Proportionate Action"
                                        description="Outcomes may range from dismissal to censure, suspension or expulsion depending on the findings."
                                    />
                                </ul>
                            </section>


                        </article>

                        {/* EDITORIAL SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <section className="border-t-4 border-[#C8102E]">
                                <div className="border-b border-slate-300 py-3">

                                    <h2 className="mt-1.5 text-xl font-black text-slate-950">
                                        Complaint Process
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Complaint process page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <SidebarLink
                                        href="#complaints-process"
                                        label="Complaints Procedure"
                                        active
                                    />

                                    <SidebarLink
                                        href="#executive-actions"
                                        label="Executive Actions"
                                    />

                                    <SidebarLink
                                        href="#possible-decisions"
                                        label="Possible Decisions"
                                    />

                                    <SidebarLink
                                        href="#membership-exit"
                                        label="Leaving AHPK"
                                    />
                                </nav>
                            </section>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <Scale
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Fair Procedure
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    Reviews should be impartial,
                                    evidence-based and conducted in
                                    accordance with established
                                    disciplinary procedures.
                                </p>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <ShieldCheck
                                    className="h-6 w-6 text-red-300"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black">
                                    Fair and Confidential
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Complaints must be handled
                                    impartially, confidentially and
                                    through the Association&apos;s
                                    established procedures.
                                </p>

                                <Link
                                    href="/members-section/code-of-conduct-ethics"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-red-300 transition hover:text-white"
                                >
                                    View Full Code

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

function ListItem({ text }: { number: string; text: string }) {
    return <li className="py-1.5 text-sm leading-7 text-slate-700 sm:text-base">{text}</li>;
}

function DecisionItem({ text }: { number: string; text: string }) {
    return <li className="py-1.5 text-sm leading-7 text-slate-700 sm:text-base">{text}</li>;
}

function PrincipleItem({ title, description }: { number: string; title: string; description: string }) {
    return (
        <li className="py-1.5 text-sm leading-7 text-slate-700 sm:text-base">
            <strong className="font-black text-slate-950">{title}:</strong>{" "}{description}
        </li>
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
            className={[
                "group flex items-center justify-between gap-3 py-3 text-sm font-bold transition",
                active
                    ? "text-[#C8102E]"
                    : "text-slate-700 hover:translate-x-0.5 hover:text-[#C8102E]",
            ].join(" ")}
        >
            {label}

            <ChevronRight
                className={[
                    "h-4 w-4 shrink-0 transition",
                    active
                        ? "text-[#C8102E]"
                        : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-[#C8102E]",
                ].join(" ")}
            />
        </Link>
    );
}

function RelatedPageLink({
    href,
    eyebrow,
    title,
    direction,
}: {
    href: string;
    eyebrow: string;
    title: string;
    direction: "left" | "right";
}) {
    return (
        <Link
            href={href}
            className="group flex min-h-16 items-center gap-3 border-b border-slate-300 py-2.5 transition hover:bg-red-50/60 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
        >
            {direction === "left" ? (
                <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:-translate-x-1" />
            ) : null}

            <div
                className={
                    direction === "right"
                        ? "ml-auto text-right"
                        : ""
                }
            >
                <p className="text-[10px] font-black uppercase tracking-[0.17em] text-slate-400">
                    {eyebrow}
                </p>

                <h3 className="text-base font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>
            </div>

            {direction === "right" ? (
                <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
            ) : null}
        </Link>
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
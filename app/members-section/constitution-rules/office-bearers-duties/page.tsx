// app/members-section/constitution-rules/office-bearers-duties/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BookOpenCheck,
    ChevronRight,
    CircleCheck,
    ClipboardPenLine,
    Crown,
    FileText,
    HandCoins,
    Home,
    Landmark,
    Mail,
    Scale,
    ShieldCheck,
    UserRoundCheck,
    Users,
    WalletCards,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath =
    "/members-section/constitution-rules/office-bearers-duties";

export const metadata: Metadata = {
    title: "Office Bearers & Duties",

    description:
        "Learn about AHPK's elected Office Bearers, their constitutional eligibility requirements and the duties of the Chairman, Vice Chairman, Secretary, Assistant Secretary and Treasurer.",

    keywords: [
        "AHPK office bearers",
        "AHPK leadership duties",
        "AHPK chairman",
        "AHPK secretary",
        "AHPK treasurer",
        "hotel professionals association Kenya",
        "AHPK constitution and rules",
        "Association of Hotel Professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Office Bearers & Duties | Association of Hotel Professionals Kenya",
        description:
            "Explore AHPK's elected leadership positions, eligibility requirements and constitutional responsibilities.",
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
                alt: "AHPK executive leadership and office bearers",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Office Bearers & Duties | AHPK",
        description:
            "Learn about AHPK's elected office bearers and their constitutional leadership duties.",
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

const officeBearers = [
    {
        title: "Chairman",
        description:
            "Provides leadership, presides over meetings and represents the Association as its principal spokesperson.",
        icon: Crown,
    },
    {
        title: "Vice Chairman",
        description:
            "Supports the Chairman and performs the Chairman's duties whenever the Chairman is absent.",
        icon: Users,
    },
    {
        title: "Secretary",
        description:
            "Oversees correspondence, meeting records and the preservation of the Association's official proceedings.",
        icon: Mail,
    },
    {
        title: "Assistant Secretary",
        description:
            "Assists the Secretary and performs duties assigned by the Secretary or the Committee.",
        icon: ClipboardPenLine,
    },
    {
        title: "Treasurer",
        description:
            "Oversees the receipt, disbursement and proper recording of the Association's funds.",
        icon: WalletCards,
    },
];

const eligibilityRules = [
    "Every Office Bearer shall be a fully paid-up member of the Association.",
    "Office Bearers shall be elected at the Annual General Meeting.",
    "Each Office Bearer shall hold office from the date of election until the succeeding Annual General Meeting.",
    "An Office Bearer automatically ceases to hold office upon ceasing to be a member of the Association.",
];

const leadershipDuties = [
    {
        id: "chairman",
        title: "The Chairman",
        eyebrow: "Principal leadership",
        icon: Crown,
        duties: [
            "Preside over all meetings unless prevented by illness or another sufficient cause.",
            "Act as the official spokesperson of the Association.",
            "Cast an additional deciding vote where voting results in a tie.",
        ],
    },
    {
        id: "vice-chairman",
        title: "The Vice Chairman",
        eyebrow: "Deputy leadership",
        icon: Users,
        duties: [
            "Perform the duties of the Chairman whenever the Chairman is absent.",
            "Carry out any other functions delegated by the Chairman.",
        ],
    },
    {
        id: "secretary",
        title: "The Secretary",
        eyebrow: "Administration and records",
        icon: Mail,
        duties: [
            "Handle the official correspondence of the Association.",
            "In urgent matters where the Committee cannot be consulted, seek guidance from the Chairman or Vice Chairman on matters requiring higher authority.",
            "Keep accurate minutes of meetings and proceedings.",
            "Preserve the Association's official records and documentation.",
        ],
    },
    {
        id: "assistant-secretary",
        title: "The Assistant Secretary",
        eyebrow: "Secretarial support",
        icon: ClipboardPenLine,
        duties: [
            "Perform the duties of the Secretary whenever required.",
            "Carry out any other responsibilities assigned by the Secretary or the Committee.",
        ],
    },
    {
        id: "treasurer",
        title: "The Treasurer",
        eyebrow: "Financial stewardship",
        icon: HandCoins,
        duties: [
            "Receive and disburse all money belonging to the Association.",
            "Issue receipts for all money received or otherwise handled.",
            "Have unrestricted access to relevant financial information in order to confirm that proper books of account are maintained.",
            "Ensure that the Association's accounting records remain available for inspection.",
        ],
    },
];

const leadershipPrinciples = [
    "Accountability",
    "Integrity",
    "Transparency",
    "Service to Members",
    "Constitutional Compliance",
];


export default function OfficeBearersDutiesPage() {
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
                        url:
                            "/members-section/constitution-rules",
                    },
                    {
                        name: "Office Bearers & Duties",
                        url: pagePath,
                    },
                ]}
            />

            <OfficeBearersJsonLd />

            <PageHeader />

            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 max-w-5xl">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            Constitution &amp; Rules
                        </p>

                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                            Office Bearers
                            <span className="block text-[#C8102E]">
                                &amp; Their Duties
                            </span>
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            AHPK&apos;s elected leadership
                            positions and the constitutional
                            responsibilities entrusted to each
                            Office Bearer.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-300 pt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                            <span>Leadership</span>
                            <span>Governance</span>
                            <span>Accountability</span>
                            <span>Administration</span>
                            <span>Financial Stewardship</span>
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
                                src="/ahpk_boardroom_meeting.webp"
                                alt="AHPK executive leadership and office bearers"
                                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
                            />
                        </div>

                        <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            Office Bearers provide leadership,
                            governance and administrative oversight
                            in accordance with the Constitution.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* OVERVIEW */}
                            <section
                                id="office-bearers"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <Crown
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                            Association Leadership
                                        </p>

                                        <h2 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                            Elected Office Bearers
                                        </h2>
                                    </div>
                                </div>

                                <blockquote className="mt-5 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4 text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                    The Office Bearers provide
                                    strategic leadership, governance
                                    and administrative oversight of
                                    the Association. They are elected
                                    by members at the Annual General
                                    Meeting and serve until the
                                    succeeding Annual General Meeting
                                    in accordance with the
                                    Constitution.
                                </blockquote>
                            </section>

                            {/* LEADERSHIP POSITIONS */}
                            <section className="border-t border-slate-300 py-8">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Leadership Positions
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    The elected offices
                                </h2>

                                <div className="mt-5 border-t border-slate-300">
                                    {officeBearers.map(
                                        (office, index) => {
                                            const Icon = office.icon;

                                            return (
                                                <article
                                                    key={office.title}
                                                    className="group grid gap-4 border-b border-slate-300 py-6 sm:grid-cols-[64px_42px_minmax(0,1fr)] sm:items-start"
                                                >
                                                    <p className="text-4xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                                                        {String(
                                                            index + 1,
                                                        ).padStart(
                                                            2,
                                                            "0",
                                                        )}
                                                    </p>

                                                    <div className="flex h-9 w-9 items-center justify-center bg-slate-950 text-white transition group-hover:-translate-y-0.5 group-hover:bg-[#C8102E]">
                                                        <Icon className="h-4 w-4" />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-xl font-black leading-tight text-slate-950 transition group-hover:text-[#C8102E]">
                                                            {office.title}
                                                        </h3>

                                                        <p className="mt-2 text-[16px] font-medium leading-8 text-slate-700">
                                                            {office.description}
                                                        </p>
                                                    </div>
                                                </article>
                                            );
                                        },
                                    )}
                                </div>
                            </section>

                            {/* ELIGIBILITY */}
                            <section
                                id="eligibility"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Eligibility and Tenure"
                                    title="Requirements for All Office Bearers"
                                    description="Every elected Office Bearer must satisfy the Association's membership, election and tenure requirements."
                                    icon={UserRoundCheck}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    {eligibilityRules.map(
                                        (rule, index) => (
                                            <RuleItem
                                                key={rule}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                text={rule}
                                            />
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* DUTIES */}
                            <section
                                id="duties"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Constitutional Responsibilities"
                                    title="Duties of Office Bearers"
                                    description="Each office carries specific responsibilities designed to ensure effective leadership, administration and financial accountability."
                                    icon={FileText}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    {leadershipDuties.map(
                                        (office, index) => {
                                            const Icon = office.icon;

                                            return (
                                                <section
                                                    key={office.id}
                                                    id={office.id}
                                                    className="group scroll-mt-28 border-b border-slate-300 py-7"
                                                >
                                                    <div className="grid gap-4 sm:grid-cols-[64px_42px_minmax(0,1fr)] sm:items-start">
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
                                                                {office.eyebrow}
                                                            </p>

                                                            <h3 className="mt-1.5 text-2xl font-black text-slate-950">
                                                                {office.title}
                                                            </h3>

                                                            <ul className="mt-4 space-y-3">
                                                                {office.duties.map(
                                                                    (
                                                                        duty,
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                duty
                                                                            }
                                                                            className="flex gap-3"
                                                                        >
                                                                            <CircleCheck className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                                                                            <span className="text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                                                                                {
                                                                                    duty
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </section>
                                            );
                                        },
                                    )}
                                </div>
                            </section>

                            {/* LEADERSHIP PRINCIPLES */}
                            <section
                                id="leadership-principles"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Leadership Commitment
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    Leadership Responsibilities
                                </h2>

                                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                    Office Bearers are expected to
                                    exercise their authority in a
                                    manner that protects the
                                    Association, serves its members
                                    and upholds the Constitution.
                                </p>

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2">
                                    {leadershipPrinciples.map(
                                        (principle, index) => (
                                            <PrincipleItem
                                                key={principle}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                title={principle}
                                            />
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* GOVERNANCE CTA */}
                            <section className="border-t border-slate-300 py-8">
                                <div className="border-l-4 border-[#C8102E] bg-slate-950 px-5 py-6 text-white sm:px-6">
                                    <Scale className="h-6 w-6 text-red-300" />

                                    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                        Association Governance
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                                        Board of Management
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                                        Continue to the Board of
                                        Management and learn how
                                        AHPK&apos;s wider governance
                                        framework supports its
                                        leadership and operations.
                                    </p>

                                    <Link
                                        href="/about/executive-committee"
                                        className="group mt-5 inline-flex items-center gap-2 border-b border-red-300 pb-1 text-sm font-black text-red-300 transition hover:border-white hover:text-white"
                                    >
                                        View Board of Management

                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </section>

                            {/* PREVIOUS / NEXT */}
                            <section className="border-t border-slate-300 pt-5">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Continue Reading
                                </p>

                                <div className="mt-3 grid border-y border-slate-300 sm:grid-cols-2">
                                    <RelatedPageLink
                                        href="/members-section/constitution-rules/membership"
                                        eyebrow="Previous Section"
                                        title="Membership"
                                        direction="left"
                                    />

                                    <RelatedPageLink
                                        href="/about/executive-committee"
                                        eyebrow="Next Section"
                                        title="Board of Management"
                                        direction="right"
                                    />
                                </div>
                            </section>
                        </article>

                        {/* EDITORIAL SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <section className="border-t-4 border-[#C8102E]">
                                <div className="border-b border-slate-300 py-3">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        On This Page
                                    </p>

                                    <h2 className="mt-1.5 text-xl font-black text-slate-950">
                                        Office Bearers
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Office bearers page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <SidebarLink
                                        href="#office-bearers"
                                        label="Office Bearers"
                                        active
                                    />

                                    <SidebarLink
                                        href="#eligibility"
                                        label="Eligibility & Tenure"
                                    />

                                    <SidebarLink
                                        href="#chairman"
                                        label="Chairman"
                                    />

                                    <SidebarLink
                                        href="#vice-chairman"
                                        label="Vice Chairman"
                                    />

                                    <SidebarLink
                                        href="#secretary"
                                        label="Secretary"
                                    />

                                    <SidebarLink
                                        href="#assistant-secretary"
                                        label="Assistant Secretary"
                                    />

                                    <SidebarLink
                                        href="#treasurer"
                                        label="Treasurer"
                                    />

                                    <SidebarLink
                                        href="#leadership-principles"
                                        label="Leadership Principles"
                                    />
                                </nav>
                            </section>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <BookOpenCheck
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Constitution &amp; Rules
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    Review the constitutional
                                    framework governing AHPK&apos;s
                                    objectives, membership,
                                    leadership and administration.
                                </p>

                                <Link
                                    href="/members-section/constitution-rules"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]"
                                >
                                    View Constitution Section

                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </Link>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <ShieldCheck className="h-6 w-6 text-red-300" />

                                <h2 className="mt-2 text-xl font-black">
                                    Leadership Standard
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Every Office Bearer must remain
                                    a fully paid-up member and serve
                                    in accordance with the
                                    Constitution.
                                </p>
                            </section>
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
    icon: typeof Crown;
}) {
    return (
        <div>
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                        {eyebrow}
                    </p>

                    <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                        {title}
                    </h2>
                </div>
            </div>

            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                {description}
            </p>
        </div>
    );
}

function RuleItem({
    number,
    text,
}: {
    number: string;
    text: string;
}) {
    return (
        <article className="group grid gap-4 border-b border-slate-300 py-5 sm:grid-cols-[56px_minmax(0,1fr)] sm:items-start">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <p className="text-[16px] font-semibold leading-8 text-slate-700">
                {text}
            </p>
        </article>
    );
}

function PrincipleItem({
    number,
    title,
}: {
    number: string;
    title: string;
}) {
    return (
        <article className="group flex min-h-24 items-start gap-4 border-b border-slate-300 py-5 transition hover:bg-red-50/50 sm:border-r sm:px-5 sm:[&:nth-child(2n)]:border-r-0">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <div>
                <BadgeCheck className="h-5 w-5 text-[#C8102E]" />

                <h3 className="mt-2 text-sm font-black leading-6 text-slate-800">
                    {title}
                </h3>
            </div>
        </article>
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
            className="group flex min-h-24 items-center gap-3 border-b border-slate-300 py-4 transition hover:bg-red-50/60 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
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

                <h3 className="mt-1.5 text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>
            </div>

            {direction === "right" ? (
                <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
            ) : null}
        </Link>
    );
}

function OfficeBearersJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/constitution-rules/office-bearers-duties#article",
        url:
            "https://ahpk.or.ke/members-section/constitution-rules/office-bearers-duties",
        headline: "Office Bearers & Duties",
        description:
            "AHPK constitutional provisions governing the elected Office Bearers and the duties of the Chairman, Vice Chairman, Secretary, Assistant Secretary and Treasurer.",
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
            name: "AHPK Office Bearers and Duties",
            numberOfItems: leadershipDuties.length,
            itemListElement: leadershipDuties.map(
                (office, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                        "@type": "DefinedTerm",
                        name: office.title,
                        description: office.duties.join(" "),
                    },
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

            <Link
                href="/members-section/constitution-rules"
                className="transition hover:text-[#C8102E]"
            >
                Constitution &amp; Rules
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Office Bearers &amp; Duties
            </span>
        </nav>
    );
}
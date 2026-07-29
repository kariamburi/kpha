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
                        url: "/members-section/constitution-rules",
                    },
                    {
                        name: "Office Bearers & Duties",
                        url: pagePath,
                    },
                ]}
            />

            <OfficeBearersJsonLd />

            <PageHeader />

            {/* FULL-SCREEN HERO */}
            <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
                <div className="absolute inset-0 -z-30">
                    <img
                        src="/office-bearers-duties-hero.webp"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover object-center lg:object-right"
                    />
                </div>

                <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_30%,rgba(255,255,255,0.98)_42%,rgba(255,255,255,0.9)_55%,rgba(255,255,255,0.65)_68%,rgba(255,255,255,0.32)_82%,rgba(255,255,255,0)_100%)] lg:block" />

                <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.96)_55%,rgba(255,255,255,0.78)_76%,rgba(255,255,255,0.45)_100%)] lg:hidden" />

                <div className="absolute inset-y-0 right-0 -z-10 hidden w-[26%] bg-gradient-to-l from-slate-950/20 to-transparent lg:block" />

                <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-red-100/60 blur-3xl" />

                <div className="relative mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col px-5 py-7 sm:px-6 sm:py-8 lg:min-h-[calc(100svh-82px)] lg:px-8 lg:py-10">
                    <Breadcrumb />

                    <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-6">
                        <div className="max-w-3xl lg:w-[58%]">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                                    <Landmark className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                                        Constitution &amp; Rules
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        AHPK Leadership Framework
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                                Office Bearers
                                <span className="mt-2 block text-[#C8102E]">
                                    &amp; Their Duties
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                Learn about AHPK&apos;s elected
                                leadership positions and the
                                constitutional responsibilities
                                entrusted to each Office Bearer.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                                {[
                                    "Leadership",
                                    "Governance",
                                    "Accountability",
                                    "Administration",
                                    "Financial Stewardship",
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
                                    Office Bearers provide leadership,
                                    governance and administrative
                                    oversight in accordance with the
                                    Constitution.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-20" />
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        <article className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9 lg:p-12">
                            {/* OVERVIEW */}
                            <section
                                id="office-bearers"
                                className="scroll-mt-28"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <Crown
                                        className="h-7 w-7"
                                        aria-hidden="true"
                                    />
                                </div>

                                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                    Association leadership
                                </p>

                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    Elected Office Bearers
                                </h2>

                                <div className="mt-7 rounded-2xl border border-red-100 bg-red-50/70 p-6">
                                    <p className="text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                        The Office Bearers provide
                                        strategic leadership,
                                        governance and administrative
                                        oversight of the Association.
                                        They are elected by members at
                                        the Annual General Meeting and
                                        serve until the succeeding
                                        Annual General Meeting in
                                        accordance with the
                                        Constitution.
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                    {officeBearers.map((office) => {
                                        const Icon = office.icon;

                                        return (
                                            <div
                                                key={office.title}
                                                className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm"
                                            >
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <h3 className="mt-5 text-lg font-extrabold text-slate-950">
                                                    {office.title}
                                                </h3>

                                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                                    {office.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* ELIGIBILITY */}
                            <section
                                id="eligibility"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Eligibility and tenure"
                                    title="Requirements for All Office Bearers"
                                    description="Every elected Office Bearer must satisfy the Association's membership, election and tenure requirements."
                                    icon={UserRoundCheck}
                                />

                                <div className="mt-7 space-y-4">
                                    {eligibilityRules.map(
                                        (rule, index) => (
                                            <div
                                                key={rule}
                                                className="flex gap-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E]">
                                                    {String(
                                                        index + 1,
                                                    ).padStart(2, "0")}
                                                </div>

                                                <p className="pt-1 text-sm font-semibold leading-7 text-slate-700 sm:text-base">
                                                    {rule}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* DUTIES */}
                            <section
                                id="duties"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Constitutional responsibilities"
                                    title="Duties of Office Bearers"
                                    description="Each office carries specific responsibilities designed to ensure effective leadership, administration and financial accountability."
                                    icon={FileText}
                                />

                                <div className="mt-8 space-y-6">
                                    {leadershipDuties.map(
                                        (office, index) => {
                                            const Icon = office.icon;

                                            return (
                                                <section
                                                    key={office.id}
                                                    id={office.id}
                                                    className="scroll-mt-28 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                                                >
                                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                                            <Icon className="h-6 w-6" />
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-wrap items-center gap-3">
                                                                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                                                    {
                                                                        office.eyebrow
                                                                    }
                                                                </span>

                                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                                                                    {String(
                                                                        index +
                                                                        1,
                                                                    ).padStart(
                                                                        2,
                                                                        "0",
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                                                                {
                                                                    office.title
                                                                }
                                                            </h3>

                                                            <ul className="mt-5 space-y-3">
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

                                                                            <span className="text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
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
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 sm:p-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>

                                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Leadership commitment
                                    </p>

                                    <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                                        Leadership Responsibilities
                                    </h3>

                                    <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                        Office Bearers are expected to
                                        exercise their authority in a
                                        manner that protects the
                                        Association, serves its members
                                        and upholds the Constitution.
                                    </p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        {leadershipPrinciples.map(
                                            (principle) => (
                                                <div
                                                    key={principle}
                                                    className="flex items-center gap-3 rounded-xl border border-red-100 bg-white px-4 py-3"
                                                >
                                                    <BadgeCheck className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                                    <span className="text-sm font-bold text-slate-700">
                                                        {principle}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* CTA */}
                            <section className="mt-10 rounded-[24px] bg-slate-950 p-7 text-white sm:p-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                    <Scale className="h-6 w-6" />
                                </div>

                                <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                    Association governance
                                </p>

                                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                                    Board of Management
                                </h2>

                                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/70 sm:text-base">
                                    Continue to the Board of Management
                                    provisions and learn how AHPK&apos;s
                                    wider governance framework supports
                                    its leadership and operations.
                                </p>

                                <Link
                                    href="/about/executive-committee"
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-red-700"
                                >
                                    View Board of Management
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </section>

                            {/* PREVIOUS / NEXT */}
                            <div className="mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
                                <Link
                                    href="/members-section/constitution-rules/membership"
                                    className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Previous
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Membership
                                        </span>
                                    </span>
                                </Link>

                                <Link
                                    href="/about/executive-committee"
                                    className="group flex min-h-24 items-center justify-end gap-4 rounded-2xl border border-slate-200 p-5 text-right transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Next
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Board of Management
                                        </span>
                                    </span>

                                    <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                </Link>
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
                                        Office Bearers
                                    </h2>
                                </div>

                                <nav className="p-3">
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
                            </div>

                            <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
                                <BookOpenCheck
                                    className="h-8 w-8 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Constitution &amp; Rules
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Review the constitutional framework
                                    governing AHPK&apos;s objectives,
                                    membership, leadership and
                                    administration.
                                </p>

                                <Link
                                    href="/members-section/constitution-rules"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    View Constitution Section
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                                <ShieldCheck className="h-8 w-8 text-[#C8102E]" />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Leadership Standard
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Every Office Bearer must remain a
                                    fully paid-up member and serve in
                                    accordance with the Association&apos;s
                                    Constitution.
                                </p>
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
    icon: typeof Crown;
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
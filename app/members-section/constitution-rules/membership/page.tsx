// app/members-section/constitution-rules/membership/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BookOpenCheck,
    BookUser,
    ChevronRight,
    CircleCheck,
    GraduationCap,
    Home,
    Landmark,
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

const pagePath = "/members-section/constitution-rules/membership";

export const metadata: Metadata = {
    title: "Membership",

    description:
        "Learn about AHPK membership requirements, rights, privileges, eligibility criteria, subscriptions and constitutional membership rules.",

    keywords: [
        "AHPK membership",
        "AHPK constitution membership",
        "hotel professionals membership Kenya",
        "hospitality association Kenya",
        "AHPK membership requirements",
        "hospitality professionals Kenya",
        "Association of Hotel Professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Membership | Association of Hotel Professionals Kenya",
        description:
            "Explore AHPK membership eligibility, rights, privileges, responsibilities, subscriptions and constitutional provisions.",
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
                alt: "Members of the Association of Hotel Professionals Kenya",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Membership | AHPK",
        description:
            "Learn about AHPK membership eligibility, privileges, responsibilities and constitutional provisions.",
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

const membershipCategories = [
    "Honorary Member",
    "Fellow Member",
    "Student Member",
];

const membershipPrinciples = [
    "Professional integrity",
    "Constitutional compliance",
    "Active participation",
    "Continuous professional growth",
    "Respect for the Code of Ethics",
];

const sections = [
    {
        id: "membership-register",
        title: "Membership Register",
        description:
            "The name and address of every member shall be entered and maintained in the official register of the Association.",
        icon: BookUser,
    },
    {
        id: "personal-membership-rights",
        title: "Personal Membership Rights",
        description:
            "Membership rights and privileges are personal to each member and shall not be transferable or transmissible to another person.",
        icon: UserRoundCheck,
    },
    {
        id: "membership-privileges",
        title: "Membership Privileges",
        description:
            "Members shall enjoy only the rights and privileges specified for their approved membership category and criterion.",
        icon: BadgeCheck,
    },
];

const disciplinaryRules = [
    {
        title: "Expulsion",
        description:
            "A member may be expelled from the Association where the Executive Committee recommends removal in accordance with the Constitution.",
    },
    {
        title: "Resignation or Removal",
        description:
            "A person who resigns or is removed from membership shall not be entitled to a refund of any subscription already paid.",
    },
    {
        title: "Subscription Default",
        description:
            "Failure to pay membership subscriptions for more than six months shall automatically lead to expulsion from the Association.",
    },
];

export default function MembershipPage() {
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
                        name: "Membership",
                        url: pagePath,
                    },
                ]}
            />

            <MembershipJsonLd />

            <PageHeader />

            {/* FULL-SCREEN HERO */}
            <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
                <div className="absolute inset-0 -z-30">
                    <img
                        src="/membership-hero.webp"
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
                        <div className="max-w-3xl lg:w-[57%]">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                                    <Landmark className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                                        Constitution &amp; Rules
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        AHPK Membership Provisions
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                                Membership
                                <span className="mt-2 block text-[#C8102E]">
                                    Rights &amp; Responsibilities
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                AHPK membership is founded on
                                professional qualifications, ethical
                                conduct and a commitment to advancing
                                Kenya&apos;s hospitality industry.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                                {[
                                    "Eligibility",
                                    "Privileges",
                                    "Professional Conduct",
                                    "Subscriptions",
                                    "Member Responsibilities",
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
                                    Membership recognizes professional
                                    competence, integrity and a shared
                                    commitment to excellence in
                                    hospitality.
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
                            <div
                                id="membership-overview"
                                className="scroll-mt-28"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <Users
                                        className="h-7 w-7"
                                        aria-hidden="true"
                                    />
                                </div>

                                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                    Constitutional membership
                                </p>

                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    Membership of the Association
                                </h2>

                                <div className="mt-7 rounded-2xl border border-red-100 bg-red-50/70 p-6">
                                    <p className="text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                        Membership in AHPK recognizes
                                        individuals who demonstrate
                                        professional competence,
                                        integrity and dedication to
                                        excellence in the hospitality
                                        industry. Members enjoy the
                                        rights and privileges granted
                                        under the Constitution while
                                        upholding the Association&apos;s
                                        standards and values.
                                    </p>
                                </div>
                            </div>

                            {/* REGISTER AND RIGHTS */}
                            <section
                                id="membership-register"
                                className="mt-12 scroll-mt-28"
                            >
                                <SectionHeading
                                    eyebrow="Membership administration"
                                    title="Register, Rights & Privileges"
                                    description="Membership records, rights and privileges are administered according to the Association's constitutional provisions."
                                    icon={BookUser}
                                />

                                <div className="mt-7 space-y-5">
                                    {sections.map((section) => {
                                        const Icon = section.icon;

                                        return (
                                            <div
                                                key={section.id}
                                                id={section.id}
                                                className="scroll-mt-28 rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                                        <Icon className="h-5 w-5" />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-extrabold text-slate-950">
                                                            {section.title}
                                                        </h3>

                                                        <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                                            {
                                                                section.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* ELIGIBILITY */}
                            <section
                                id="membership-eligibility"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Qualification"
                                    title="Membership Eligibility"
                                    description="Admission is based on the applicant's membership category, professional qualifications and hospitality industry experience."
                                    icon={GraduationCap}
                                />

                                <div className="mt-7 grid gap-5 md:grid-cols-2">
                                    <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                            <Users className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-extrabold text-slate-950">
                                            Membership Categories
                                        </h3>

                                        <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                            Any person who qualifies
                                            may be elected to an
                                            appropriate membership
                                            category, including:
                                        </p>

                                        <ul className="mt-5 space-y-3">
                                            {membershipCategories.map(
                                                (category) => (
                                                    <li
                                                        key={category}
                                                        className="flex items-center gap-3 text-sm font-bold text-slate-700"
                                                    >
                                                        <CircleCheck className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                                        {category}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-extrabold text-slate-950">
                                            Professional Qualification
                                        </h3>

                                        <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                            A person holding a
                                            three-year diploma from a
                                            reputable college and who
                                            demonstrates an acceptable
                                            professional career in the
                                            hospitality industry shall
                                            be eligible for membership
                                            consideration.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* DISCIPLINE */}
                            <section
                                id="membership-discipline"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Member accountability"
                                    title="Membership Discipline"
                                    description="Membership may end through resignation, removal or failure to meet the Association's subscription obligations."
                                    icon={ShieldAlert}
                                />

                                <div className="mt-7 space-y-5">
                                    {disciplinaryRules.map(
                                        (rule, index) => (
                                            <div
                                                key={rule.title}
                                                className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
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

                                                    <div>
                                                        <h3 className="text-lg font-extrabold text-slate-950">
                                                            {
                                                                rule.title
                                                            }
                                                        </h3>

                                                        <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                                            {
                                                                rule.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* PRINCIPLES */}
                            <section
                                id="membership-principles"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 sm:p-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>

                                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Member commitment
                                    </p>

                                    <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                                        Core Membership Principles
                                    </h3>

                                    <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                        AHPK members are expected to
                                        uphold the values that
                                        strengthen the Association and
                                        protect the reputation of the
                                        hospitality profession.
                                    </p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        {membershipPrinciples.map(
                                            (principle) => (
                                                <div
                                                    key={principle}
                                                    className="flex items-center gap-3 rounded-xl border border-red-100 bg-white px-4 py-3"
                                                >
                                                    <CircleCheck className="h-5 w-5 shrink-0 text-[#C8102E]" />

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
                                    <BadgeCheck className="h-6 w-6" />
                                </div>

                                <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                    Join the Association
                                </p>

                                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                                    Become an AHPK Member
                                </h2>

                                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/70 sm:text-base">
                                    Explore the available membership
                                    categories and identify the pathway
                                    that best matches your professional
                                    qualifications and industry
                                    experience.
                                </p>

                                <Link
                                    href="/members-section/membership-categories"
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-red-700"
                                >
                                    Explore Membership Categories
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </section>

                            {/* PREVIOUS / NEXT */}
                            <div className="mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
                                <Link
                                    href="/members-section/constitution-rules/objectives"
                                    className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Previous
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Objectives
                                        </span>
                                    </span>
                                </Link>

                                <Link
                                    href="/members-section/constitution-rules/office-bearers-duties"
                                    className="group flex min-h-24 items-center justify-end gap-4 rounded-2xl border border-slate-200 p-5 text-right transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Next
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Office Bearers &amp; Duties
                                        </span>
                                    </span>

                                    <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                </Link>
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
                                        Membership
                                    </h2>
                                </div>

                                <nav className="p-3">
                                    <SidebarLink
                                        href="#membership-overview"
                                        label="Membership Overview"
                                        active
                                    />

                                    <SidebarLink
                                        href="#membership-register"
                                        label="Register & Rights"
                                    />

                                    <SidebarLink
                                        href="#membership-eligibility"
                                        label="Membership Eligibility"
                                    />

                                    <SidebarLink
                                        href="#membership-discipline"
                                        label="Membership Discipline"
                                    />

                                    <SidebarLink
                                        href="#membership-principles"
                                        label="Membership Principles"
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
                                <Scale className="h-8 w-8 text-[#C8102E]" />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Member Responsibilities
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Every member is expected to observe
                                    the Constitution, pay applicable
                                    subscriptions and uphold the
                                    Association&apos;s professional
                                    standards.
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
    icon: typeof BookUser;
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

function MembershipJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/constitution-rules/membership#article",
        url:
            "https://ahpk.or.ke/members-section/constitution-rules/membership",
        headline: "Membership",
        description:
            "AHPK constitutional membership provisions covering the membership register, rights, privileges, eligibility, subscriptions, resignation and expulsion.",
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
            name: "AHPK Membership Provisions",
            numberOfItems: 8,
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Membership Register",
                    description:
                        "The name and address of every member shall be entered in the official register.",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Personal Membership Rights",
                    description:
                        "Membership rights and privileges shall not be transferable or transmissible.",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Membership Privileges",
                    description:
                        "Privileges shall be limited to those specified for each membership criterion.",
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    name: "Membership Categories",
                    description:
                        "Qualified applicants may be elected as Honorary, Fellow or Student members.",
                },
                {
                    "@type": "ListItem",
                    position: 5,
                    name: "Professional Qualification",
                    description:
                        "A three-year diploma and acceptable hospitality industry career may qualify an applicant for membership.",
                },
                {
                    "@type": "ListItem",
                    position: 6,
                    name: "Expulsion",
                    description:
                        "A member may be expelled where the Executive Committee recommends removal.",
                },
                {
                    "@type": "ListItem",
                    position: 7,
                    name: "No Subscription Refund",
                    description:
                        "A person who resigns or is removed shall not receive a refund of subscriptions paid.",
                },
                {
                    "@type": "ListItem",
                    position: 8,
                    name: "Subscription Default",
                    description:
                        "Non-payment of subscriptions for more than six months shall automatically lead to expulsion.",
                },
            ],
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
                Membership
            </span>
        </nav>
    );
}
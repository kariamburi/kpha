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
                        url:
                            "/members-section/constitution-rules",
                    },
                    {
                        name: "Membership",
                        url: pagePath,
                    },
                ]}
            />

            <MembershipJsonLd />

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
                            Membership
                            <span className="block text-[#C8102E]">
                                Rights &amp; Responsibilities
                            </span>
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            AHPK membership is founded on
                            professional qualifications, ethical
                            conduct and a commitment to advancing
                            Kenya&apos;s hospitality industry.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-300 pt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                            <span>Eligibility</span>
                            <span>Privileges</span>
                            <span>Professional Conduct</span>
                            <span>Subscriptions</span>
                            <span>Responsibilities</span>
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
                                src="/membership-criterion-levels-hero.webp"
                                alt="Members of the Association of Hotel Professionals Kenya"
                                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
                            />
                        </div>

                        <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            Membership recognizes professional
                            competence, integrity and a shared
                            commitment to excellence in hospitality.
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
                                id="membership-overview"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <Users
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                            Constitutional Membership
                                        </p>

                                        <h2 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                            Membership of the Association
                                        </h2>
                                    </div>
                                </div>

                                <blockquote className="mt-5 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4 text-base font-bold leading-8 text-slate-800 sm:text-lg">
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
                                </blockquote>
                            </section>

                            {/* REGISTER AND RIGHTS */}
                            <section
                                id="membership-register"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Membership Administration"
                                    title="Register, Rights & Privileges"
                                    description="Membership records, rights and privileges are administered according to the Association's constitutional provisions."
                                    icon={BookUser}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    {sections.map(
                                        (section, index) => {
                                            const Icon = section.icon;

                                            return (
                                                <article
                                                    key={section.id}
                                                    id={section.id}
                                                    className="group grid scroll-mt-28 gap-4 border-b border-slate-300 py-6 sm:grid-cols-[64px_42px_minmax(0,1fr)] sm:items-start"
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
                                                            {section.title}
                                                        </h3>

                                                        <p className="mt-2 text-[16px] font-medium leading-8 text-slate-700">
                                                            {section.description}
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
                                id="membership-eligibility"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Qualification"
                                    title="Membership Eligibility"
                                    description="Admission is based on the applicant's membership category, professional qualifications and hospitality industry experience."
                                    icon={GraduationCap}
                                />

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2">
                                    <EligibilityItem
                                        icon={Users}
                                        title="Membership Categories"
                                    >
                                        <p className="text-sm font-medium leading-7 text-slate-600">
                                            Any person who qualifies
                                            may be elected to an
                                            appropriate membership
                                            category, including:
                                        </p>

                                        <ul className="mt-4 space-y-3">
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
                                    </EligibilityItem>

                                    <EligibilityItem
                                        icon={GraduationCap}
                                        title="Professional Qualification"
                                    >
                                        <p className="text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                            A person holding a
                                            three-year diploma from a
                                            reputable college and who
                                            demonstrates an acceptable
                                            professional career in the
                                            hospitality industry shall
                                            be eligible for membership
                                            consideration.
                                        </p>
                                    </EligibilityItem>
                                </div>
                            </section>

                            {/* DISCIPLINE */}
                            <section
                                id="membership-discipline"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Member Accountability"
                                    title="Membership Discipline"
                                    description="Membership may end through resignation, removal or failure to meet the Association's subscription obligations."
                                    icon={ShieldAlert}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    {disciplinaryRules.map(
                                        (rule, index) => (
                                            <article
                                                key={rule.title}
                                                className="group grid gap-4 border-b border-slate-300 py-6 sm:grid-cols-[64px_minmax(0,1fr)]"
                                            >
                                                <p className="text-4xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                                                    {String(
                                                        index + 1,
                                                    ).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </p>

                                                <div>
                                                    <h3 className="text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                                                        {rule.title}
                                                    </h3>

                                                    <p className="mt-2 text-[16px] font-medium leading-8 text-slate-700">
                                                        {rule.description}
                                                    </p>
                                                </div>
                                            </article>
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* PRINCIPLES */}
                            <section
                                id="membership-principles"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Member Commitment
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    Core Membership Principles
                                </h2>

                                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                    AHPK members are expected to
                                    uphold the values that strengthen
                                    the Association and protect the
                                    reputation of the hospitality
                                    profession.
                                </p>

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2">
                                    {membershipPrinciples.map(
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

                            {/* CTA */}
                            <section className="border-t border-slate-300 py-8">
                                <div className="border-l-4 border-[#C8102E] bg-slate-950 px-5 py-6 text-white sm:px-6">
                                    <BadgeCheck className="h-6 w-6 text-red-300" />

                                    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                        Join the Association
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                                        Become an AHPK Member
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                                        Explore the available
                                        membership categories and
                                        identify the pathway that
                                        best matches your
                                        professional qualifications
                                        and industry experience.
                                    </p>

                                    <Link
                                        href="/members-section/membership-categories"
                                        className="group mt-5 inline-flex items-center gap-2 border-b border-red-300 pb-1 text-sm font-black text-red-300 transition hover:border-white hover:text-white"
                                    >
                                        Explore Membership Categories

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
                                        href="/members-section/constitution-rules/objectives"
                                        eyebrow="Previous Section"
                                        title="Objectives"
                                        direction="left"
                                    />

                                    <RelatedPageLink
                                        href="/members-section/constitution-rules/office-bearers-duties"
                                        eyebrow="Next Section"
                                        title="Office Bearers & Duties"
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
                                        Membership
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Membership page navigation"
                                    className="divide-y divide-slate-200"
                                >
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
                                <Scale className="h-6 w-6 text-red-300" />

                                <h2 className="mt-2 text-xl font-black">
                                    Member Responsibilities
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Every member is expected to
                                    observe the Constitution, pay
                                    applicable subscriptions and
                                    uphold professional standards.
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
    icon: typeof BookUser;
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

function EligibilityItem({
    icon: Icon,
    title,
    children,
}: {
    icon: typeof Users;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <article className="border-b border-slate-300 py-5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
            <Icon className="h-6 w-6 text-[#C8102E]" />

            <h3 className="mt-3 text-xl font-black text-slate-950">
                {title}
            </h3>

            <div className="mt-3">{children}</div>
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
        <article className="group flex min-h-24 items-start gap-4 border-b border-slate-300 py-5 transition hover:bg-red-50/50 sm:border-r sm:px-5 sm:nth-[2n]:border-r-0">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <div>
                <CircleCheck className="h-5 w-5 text-[#C8102E]" />

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
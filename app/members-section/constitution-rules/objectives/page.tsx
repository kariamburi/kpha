// app/members-section/constitution-rules/objectives/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    BookOpenCheck,
    BriefcaseBusiness,
    Building2,
    ChevronRight,
    GraduationCap,
    Handshake,
    HeartHandshake,
    Home,
    Landmark,
    Network,
    SearchCheck,
    ShieldCheck,
    Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath = "/members-section/constitution-rules/objectives";

export const metadata: Metadata = {
    title: "Objectives",

    description:
        "Learn about the objectives of the Association of Hotel Professionals Kenya and its commitment to advocacy, professional development, research, training and hospitality industry growth.",

    keywords: [
        "AHPK objectives",
        "AHPK constitution and rules",
        "hospitality professionals Kenya",
        "hotel industry advocacy Kenya",
        "hospitality research and training",
        "Association of Hotel Professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Objectives | Association of Hotel Professionals Kenya",
        description:
            "Explore AHPK's objectives in advocacy, professional development, research, training, consultancy and hospitality industry advancement.",
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
                alt: "AHPK hospitality professionals and industry leadership",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Objectives | AHPK",
        description:
            "AHPK's objectives for advocacy, training, research, consultancy and hospitality industry development.",
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

const objectives = [
    {
        title: "A Voice for Professionals",
        description:
            "Serve as a voice for managers and professionals within the hospitality industry.",
        icon: Users,
    },
    {
        title: "Industry Advocacy",
        description:
            "Act as a lobby group through collaboration and partnership with relevant industry agencies.",
        icon: Landmark,
    },
    {
        title: "Industry Regulation",
        description:
            "Participate in the regulation, improvement and advancement of industry performance.",
        icon: ShieldCheck,
    },
    {
        title: "Knowledge and Expertise",
        description:
            "Nurture, develop and harness expertise and professional knowledge from within the industry.",
        icon: BookOpenCheck,
    },
    {
        title: "Consultancy Services",
        description:
            "Provide professional consultancy services to hotel establishments and other hospitality organizations.",
        icon: BriefcaseBusiness,
    },
    {
        title: "Professional Research Skills",
        description:
            "Equip hotel professionals with empirical research skills through seminars, workshops and professional learning opportunities.",
        icon: GraduationCap,
    },
    {
        title: "Emerging Hospitality Trends",
        description:
            "Provide a platform for research, discussion and understanding of new and emerging industry trends.",
        icon: SearchCheck,
    },
    {
        title: "Training and Academic Linkages",
        description:
            "Develop training and academic linkages that contribute to the growth and development of the hotel industry.",
        icon: Building2,
    },
    {
        title: "Professional Networks",
        description:
            "Affiliate and connect members with other similar professional associations locally and internationally.",
        icon: Network,
    },
    {
        title: "Corporate Social Responsibility",
        description:
            "Promote and enhance the spirit and principles of Corporate Social Responsibility within the hospitality industry.",
        icon: HeartHandshake,
    },
    {
        title: "Independent Professional Association",
        description:
            "Maintain the Association as a non-profit-making, non-political and non-secular professional organization.",
        icon: Handshake,
    },
];


export default function ObjectivesPage() {
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
                            "/members-section/constitution-rules/objectives",
                    },
                    {
                        name: "Objectives",
                        url: pagePath,
                    },
                ]}
            />

            <ObjectivesJsonLd />

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
                            Association
                            <span className="block text-[#C8102E]">
                                Objectives
                            </span>
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            The constitutional objectives that
                            guide AHPK&apos;s commitment to
                            advocacy, professional development,
                            research, collaboration and hospitality
                            industry advancement.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-300 pt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                            <span>Advocacy</span>
                            <span>Research</span>
                            <span>Training</span>
                            <span>Consultancy</span>
                            <span>Industry Growth</span>
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
                                alt="AHPK hospitality professionals and industry leadership"
                                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
                            />
                        </div>

                        <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            AHPK exists to strengthen the
                            hospitality profession and support
                            sustainable development across the
                            wider industry.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* INTRODUCTION */}
                            <section
                                id="association-objectives"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <Landmark
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                            Constitutional Purpose
                                        </p>

                                        <h2 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                            Objectives of the Association
                                        </h2>
                                    </div>
                                </div>

                                <blockquote
                                    id="professional-purpose"
                                    className="mt-5 scroll-mt-28 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4 text-base font-bold leading-8 text-slate-800 sm:text-lg"
                                >
                                    The Association of Hotel
                                    Professionals Kenya exists to
                                    advance the hospitality
                                    profession through advocacy,
                                    education, research,
                                    professional development,
                                    consultancy and collaboration
                                    with relevant industry
                                    stakeholders.
                                </blockquote>
                            </section>

                            {/* OBJECTIVES */}
                            <section className="border-t border-slate-300 py-8">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Main Objectives
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    A constitutional mandate for progress
                                </h2>

                                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                    These objectives define how AHPK
                                    represents professionals,
                                    contributes to industry
                                    development and strengthens
                                    knowledge, standards and
                                    collaboration.
                                </p>

                                <div className="mt-5 border-t border-slate-300">
                                    {objectives.map(
                                        (objective, index) => {
                                            const Icon = objective.icon;

                                            return (
                                                <article
                                                    key={objective.title}
                                                    id={`objective-${index + 1}`}
                                                    className="group grid scroll-mt-28 gap-4 border-b border-slate-300 py-6 sm:grid-cols-[64px_42px_minmax(0,1fr)] sm:items-start"
                                                >
                                                    <p className="text-4xl font-black leading-none text-slate-300 transition duration-200 group-hover:text-[#C8102E]">
                                                        {String(
                                                            index + 1,
                                                        ).padStart(
                                                            2,
                                                            "0",
                                                        )}
                                                    </p>

                                                    <div className="flex h-9 w-9 items-center justify-center bg-slate-950 text-white transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#C8102E]">
                                                        <Icon className="h-4 w-4" />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-xl font-black leading-tight text-slate-950 transition group-hover:text-[#C8102E]">
                                                            {objective.title}
                                                        </h3>

                                                        <p className="mt-2 text-[16px] font-medium leading-8 text-slate-700">
                                                            {objective.description}
                                                        </p>
                                                    </div>
                                                </article>
                                            );
                                        },
                                    )}
                                </div>
                            </section>

                            {/* STRATEGIC THEMES */}
                            <section className="border-t border-slate-300 py-8">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Strategic Themes
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    How the objectives work together
                                </h2>

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2">
                                    <ThemeItem
                                        number="01"
                                        title="Representation"
                                        description="Give hospitality managers and professionals a credible collective voice."
                                    />

                                    <ThemeItem
                                        number="02"
                                        title="Industry Advancement"
                                        description="Support regulation, performance improvement and responsible sector growth."
                                    />

                                    <ThemeItem
                                        number="03"
                                        title="Knowledge Development"
                                        description="Expand research, professional expertise, academic links and emerging-trend awareness."
                                    />

                                    <ThemeItem
                                        number="04"
                                        title="Professional Networks"
                                        description="Build local and international partnerships that strengthen members and the profession."
                                    />
                                </div>
                            </section>

                            {/* ASSOCIATION VALUES */}
                            <section
                                id="association-values"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="border-l-4 border-[#C8102E] bg-slate-950 px-5 py-6 text-white sm:px-6">
                                    <ShieldCheck className="h-6 w-6 text-red-300" />

                                    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                        Association Values
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                                        Independent and Professionally Focused
                                    </h2>

                                    <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-300 sm:text-base sm:leading-8">
                                        AHPK operates as a
                                        non-profit-making,
                                        non-political and
                                        non-secular organization
                                        committed to serving the
                                        hospitality profession and
                                        advancing the wider industry.
                                    </p>
                                </div>
                            </section>

                            {/* CONTINUE READING */}
                            <section className="border-t border-slate-300 pt-5">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Continue Reading
                                </p>

                                <div className="mt-3 grid border-y border-slate-300 sm:grid-cols-2">
                                    <RelatedPageLink
                                        href="/members-section/code-of-conduct-ethics/code-of-ethics-conducts-pledge"
                                        eyebrow="Previous Section"
                                        title="Code of Ethics & Conducts Pledge"
                                        direction="left"
                                    />

                                    <RelatedPageLink
                                        href="/members-section/constitution-rules/membership"
                                        eyebrow="Next Section"
                                        title="Membership"
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
                                        Association Objectives
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Association objectives page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <SidebarLink
                                        href="#professional-purpose"
                                        label="Professional Purpose"
                                        active
                                    />

                                    <SidebarLink
                                        href="#association-objectives"
                                        label="Main Objectives"
                                    />

                                    <SidebarLink
                                        href="#association-values"
                                        label="Association Values"
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
                                    These provisions guide the
                                    Association&apos;s purpose,
                                    membership, leadership and
                                    governance.
                                </p>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <Landmark
                                    className="h-6 w-6 text-red-300"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black">
                                    Industry Leadership
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    AHPK&apos;s objectives support
                                    stronger standards, informed
                                    advocacy and sustainable growth
                                    across hospitality.
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

function ThemeItem({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <article className="group border-b border-slate-300 py-5 transition duration-200 hover:bg-red-50/50 sm:border-r sm:px-5 sm:nth-[2n]:border-r-0">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <h3 className="mt-3 text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                {title}
            </h3>

            <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                {description}
            </p>
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

function ObjectivesJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/constitution-rules/objectives#article",
        url:
            "https://ahpk.or.ke/members-section/constitution-rules/objectives",
        headline: "Objectives",
        description:
            "The objectives of the Association of Hotel Professionals Kenya covering advocacy, professional development, research, consultancy, training and hospitality industry advancement.",
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
            name: "AHPK Association Objectives",
            numberOfItems: objectives.length,
            itemListElement: objectives.map(
                (objective, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                        "@type": "DefinedTerm",
                        name: objective.title,
                        description:
                            objective.description,
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
                Objectives
            </span>
        </nav>
    );
}
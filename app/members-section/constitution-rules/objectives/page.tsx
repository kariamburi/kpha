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
                        url: pagePath,
                    },
                    {
                        name: "Objectives",
                        url: pagePath,
                    },
                ]}
            />

            <ObjectivesJsonLd />

            <PageHeader />

            {/* FULL-SCREEN HERO */}
            <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
                <div className="absolute inset-0 -z-30">
                    <img
                        src="/association-objectives-hero.webp"
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
                                        AHPK Constitutional Purpose
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                                Association
                                <span className="mt-2 block text-[#C8102E]">
                                    Objectives
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                The objectives that guide AHPK&apos;s
                                commitment to advocacy, professional
                                development, research, collaboration
                                and hospitality industry advancement.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                                {[
                                    "Advocacy",
                                    "Research",
                                    "Training",
                                    "Consultancy",
                                    "Industry Growth",
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
                                    AHPK exists to strengthen the
                                    hospitality profession and support
                                    sustainable industry development.
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
                                id="association-objectives"
                                className="scroll-mt-28"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <Landmark
                                        className="h-7 w-7"
                                        aria-hidden="true"
                                    />
                                </div>

                                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                    Constitutional purpose
                                </p>

                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    Objectives of the Association
                                </h2>

                                <div
                                    id="professional-purpose"
                                    className="mt-7 scroll-mt-28 rounded-2xl border border-red-100 bg-red-50/70 p-6"
                                >
                                    <p className="text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                        The Association of Hotel
                                        Professionals Kenya exists to
                                        advance the hospitality
                                        profession through advocacy,
                                        education, research,
                                        professional development,
                                        consultancy and collaboration
                                        with relevant industry
                                        stakeholders.
                                    </p>
                                </div>

                                <ol className="mt-9 space-y-6">
                                    {objectives.map(
                                        (objective, index) => {
                                            const Icon =
                                                objective.icon;

                                            return (
                                                <li
                                                    key={
                                                        objective.title
                                                    }
                                                    id={`objective-${index + 1}`}
                                                    className="scroll-mt-28 rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                                                >
                                                    <div className="flex gap-4">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E]">
                                                            {String(
                                                                index +
                                                                1,
                                                            ).padStart(
                                                                2,
                                                                "0",
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="flex items-start gap-3">
                                                                <Icon className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                                                                <h3 className="text-lg font-extrabold leading-tight text-slate-950">
                                                                    {
                                                                        objective.title
                                                                    }
                                                                </h3>
                                                            </div>

                                                            <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                                                {
                                                                    objective.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        },
                                    )}
                                </ol>

                                <section
                                    id="association-values"
                                    className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                                >
                                    <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 sm:p-8">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
                                            <ShieldCheck className="h-6 w-6" />
                                        </div>

                                        <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                            Association values
                                        </p>

                                        <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                                            Independent and
                                            Professionally Focused
                                        </h3>

                                        <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                            AHPK operates as a
                                            non-profit-making,
                                            non-political and
                                            non-secular organization
                                            committed to serving the
                                            hospitality profession and
                                            advancing the wider
                                            industry.
                                        </p>
                                    </div>
                                </section>

                                <div className="mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
                                    <Link
                                        href="/members-section/code-of-conduct-ethics/code-of-ethics-conducts-pledge"
                                        className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-200 hover:bg-red-50"
                                    >
                                        <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                        <span>
                                            <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                                Previous
                                            </span>

                                            <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                                Code of Ethics &amp;
                                                Conducts Pledge
                                            </span>
                                        </span>
                                    </Link>

                                    <Link
                                        href="/members-section/constitution-rules/membership"
                                        className="group flex min-h-24 items-center justify-end gap-4 rounded-2xl border border-slate-200 p-5 text-right transition hover:border-red-200 hover:bg-red-50"
                                    >
                                        <span>
                                            <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                                Next
                                            </span>

                                            <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                                Membership
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
                                        Association Objectives
                                    </h2>
                                </div>

                                <nav className="p-3">
                                    <Link
                                        href="#professional-purpose"
                                        className="group flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-[#C8102E]"
                                    >
                                        Professional Purpose
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>

                                    <Link
                                        href="#association-objectives"
                                        className="group mt-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
                                    >
                                        Main Objectives
                                        <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-[#C8102E]" />
                                    </Link>

                                    <Link
                                        href="#association-values"
                                        className="group mt-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
                                    >
                                        Association Values
                                        <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-[#C8102E]" />
                                    </Link>
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
                                    Explore the constitutional
                                    provisions that guide the
                                    Association&apos;s purpose,
                                    membership, leadership and
                                    governance.
                                </p>

                                {/**   <Link
                                    href="/members-section/constitution-rules"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    View Constitution Section
                                    <ArrowRight className="h-4 w-4" />
                                </Link>*/}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
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

            {/**  <Link
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
*/}
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
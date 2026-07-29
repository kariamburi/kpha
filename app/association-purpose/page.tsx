// app/association-purpose/page.tsx

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Building2,
    ChevronRight,
    FileCheck2,
    GraduationCap,
    Handshake,
    Home,
    Landmark,
    Network,
    Scale,
    ShieldCheck,
    Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath = "/association-purpose";

export const metadata: Metadata = {
    title:
        "Association Purpose | Association of Hotel Professionals Kenya",

    description:
        "Learn about the purpose and advocacy mandate of the Association of Hotel Professionals Kenya, including professional standards, member welfare, education and industry collaboration.",

    keywords: [
        "Association of Hotel Professionals Kenya",
        "AHPK purpose",
        "hotel professionals Kenya",
        "hospitality standards Kenya",
        "hotel industry advocacy",
        "Tourism Regulatory Authority Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Association Purpose | Association of Hotel Professionals Kenya",
        description:
            "Discover the purpose and advocacy mandate of AHPK in advancing professional standards, education and collaboration in the hotel industry.",
        url: pagePath,
        siteName: "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "website",
        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt: "Association of Hotel Professionals Kenya",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Association Purpose | AHPK",
        description:
            "Professional standards, industry advocacy, education and collaboration in Kenya's hotel industry.",
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

const purposeItems = [
    {
        title: "Professional Standards",
        description:
            "Identify, promote and maintain the highest professional and ethical standards for management, consultants, researchers and trainers in the hotel industry.",
        icon: BadgeCheck,
    },
    {
        title: "Industry Advocacy",
        description:
            "Participate and advocate on matters affecting the hotel industry.",
        icon: Landmark,
    },
    {
        title: "Code of Conduct & Ethics",
        description:
            "Come up with a code of conduct, ethics and service charter that will lead to best practices in the profession.",
        icon: Scale,
    },
    {
        title: "Member Welfare",
        description:
            "Promote the welfare of its members in line with Government policies as provided under the Tourism Act and TRA Act.",
        icon: Users,
    },
    {
        title: "Hospitality Education",
        description:
            "Support hotel profession training institutions in curriculum development and career talks.",
        icon: GraduationCap,
    },
    {
        title: "Professional Regulation",
        description:
            "Lobby for regulations and enforcement of minimum academic and professional standard requirements for professionals engaged to work in institutions that manage hotel and related hospitality facilities in the region.",
        icon: ShieldCheck,
    },
];

const advocacyItems = [
    {
        title: "Professional Leadership",
        description:
            "Develop, advance and implement objectives of the hotel industry.",
        icon: BadgeCheck,
    },
    {
        title: "Government Engagement",
        description:
            "Work with government agencies at regional, national and county levels, including the Tourism Regulatory Authority, through lobbying, policy development, communications and grassroots advocacy.",
        icon: Building2,
    },
    {
        title: "Programme Harmonisation",
        description:
            "Harmonise programmes developed and advanced by county governments, tourism promotion agencies, training institutions and hotel establishments.",
        icon: Network,
    },
    {
        title: "Strategic Collaboration",
        description:
            "Seek collaboration with existing industry associations, corporate boards and other organisations that share common goals.",
        icon: Handshake,
    },
];

const sidebarItems = [
    ["#purpose", "Association Purpose"],
    ["#advocacy", "Association Advocacy"],
    ["#membership", "Apply for Membership"],
] as const;

export default function AssociationPurposePage() {
    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: "Home",
                        url: "/",
                    },
                    {
                        name: "Association Purpose",
                        url: pagePath,
                    },
                ]}
            />

            <AssociationPurposeJsonLd />

            <PageHeader />

            <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
                <div className="absolute inset-0 -z-30">
                    <img
                        src="/association-purpose-hero.webp"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover object-center lg:object-right"
                    />
                </div>

                <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_31%,rgba(255,255,255,0.98)_43%,rgba(255,255,255,0.9)_56%,rgba(255,255,255,0.62)_71%,rgba(255,255,255,0.2)_88%,rgba(255,255,255,0)_100%)] lg:block" />

                <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.95)_58%,rgba(255,255,255,0.76)_80%,rgba(255,255,255,0.42)_100%)] lg:hidden" />

                <div className="pointer-events-none absolute -left-28 top-4 -z-10 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />

                <div className="relative mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col px-5 py-7 sm:px-6 sm:py-8 lg:min-h-[calc(100svh-82px)] lg:px-8 lg:py-10">
                    <Breadcrumb />

                    <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-6">
                        <div className="max-w-3xl lg:w-[60%]">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                                    <Landmark className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                                        Association
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        Purpose & Advocacy
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                                Association
                                <span className="mt-2 block text-[#C8102E]">
                                    Purpose
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                Promoting professional standards, ethical
                                practice, industry advocacy and collaboration
                                within the hotel and hospitality profession.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-20" />
            </section>

            <section className="bg-white py-14 sm:py-18">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
                        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                            <section
                                id="purpose"
                                className="scroll-mt-28"
                            >
                                <SectionHeading
                                    eyebrow="Association Purpose"
                                    title="The purpose of the Association is to:"
                                    icon={Landmark}
                                />

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {purposeItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.title}
                                                className="rounded-[22px] border border-slate-200 bg-white p-5 transition hover:border-red-200 hover:bg-red-50/40"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                                        <Icon className="h-5 w-5" />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-base font-extrabold text-slate-950">
                                                            {item.title}
                                                        </h3>

                                                        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            <section
                                id="advocacy"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Association Advocacy"
                                    title="Advancing the objectives of the hotel industry"
                                    icon={Handshake}
                                />

                                <p className="mt-6 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                    AHPK hopes to develop, advance and implement
                                    the objectives of the hotel industry through
                                    professional leadership, public advocacy and
                                    collaboration.
                                </p>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {advocacyItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.title}
                                                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#C8102E] shadow-sm">
                                                        <Icon className="h-5 w-5" />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-base font-extrabold text-slate-950">
                                                            {item.title}
                                                        </h3>

                                                        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            <section
                                id="membership"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="rounded-[26px] bg-slate-950 p-7 text-white sm:p-9">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                        Join AHPK
                                    </p>

                                    <h2 className="mt-3 max-w-2xl text-2xl font-extrabold sm:text-3xl">
                                        Join the Association Driving Hospitality
                                        Excellence
                                    </h2>

                                    <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/75 sm:text-base">
                                        Become part of Kenya&apos;s professional
                                        hospitality community and contribute to
                                        the advancement of professional standards
                                        and industry development.
                                    </p>

                                    <Link
                                        href="/apply"
                                        className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white transition hover:bg-[#a70d27]"
                                    >
                                        Apply for Membership
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </section>

                            <div className="mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
                                <Link
                                    href="/about/corporate-statement"
                                    className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Previous
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Corporate Statements
                                        </span>
                                    </span>
                                </Link>

                                <Link
                                    href="/about/who-we-are"
                                    className="group flex min-h-24 items-center justify-end gap-4 rounded-2xl border border-slate-200 p-5 text-right transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Next
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Who We Are
                                        </span>
                                    </span>

                                    <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                </Link>
                            </div>
                        </article>

                        <aside className="lg:sticky lg:top-28">
                            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                                <div className="bg-[#C8102E] px-6 py-5 text-white">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                                        On this page
                                    </p>

                                    <h2 className="mt-2 text-xl font-extrabold">
                                        Association Purpose
                                    </h2>
                                </div>

                                <nav className="p-3">
                                    {sidebarItems.map(([href, label], index) => (
                                        <SidebarLink
                                            key={href}
                                            href={href}
                                            label={label}
                                            active={index === 0}
                                        />
                                    ))}
                                </nav>
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
    icon: Icon,
}: {
    eyebrow: string;
    title: string;
    icon: typeof Landmark;
}) {
    return (
        <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                <Icon className="h-5 w-5" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                {eyebrow}
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                {title}
            </h2>
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

function AssociationPurposeJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id":
            "https://ahpk.or.ke/association-purpose#webpage",
        url: "https://ahpk.or.ke/association-purpose",
        name: "Association Purpose",
        description:
            "The purpose and advocacy mandate of the Association of Hotel Professionals Kenya.",
        inLanguage: "en-KE",
        about: {
            "@type": "Organization",
            "@id": "https://ahpk.or.ke/#organization",
            name: "Association of Hotel Professionals Kenya",
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
                Association Purpose
            </span>
        </nav>
    );
}
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

            {/* EDITORIAL MASTHEAD */}
            {/* EDITORIAL HERO */}
            <section className="border-b border-slate-300">
                <div className="absolute inset-0 -z-30">
                    <img
                        src="/association-purpose-hero.webp"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover object-center lg:object-right"
                    />
                </div>
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 grid items-center gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
                        {/* LEFT CONTENT */}
                        <div className="max-w-2xl">
                            <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                Association
                            </p>

                            <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                                Association Purpose
                            </h1>

                            <p className="mt-4 text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                                Promoting professional standards, ethical
                                practice, industry advocacy and collaboration
                                within Kenya&apos;s hotel and hospitality
                                profession.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link
                                    href="#purpose"
                                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-[#A80D27]"
                                >
                                    Read Our Purpose

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

                        {/* RIGHT IMAGE */}
                        <figure>
                            <div className="aspect-[16/8] overflow-hidden bg-slate-100">
                                <img
                                    src="/ahpk_office_scene.webp"
                                    alt="Professional standards and advocacy represented by AHPK"
                                    className="h-full w-full object-cover object-right"
                                />
                            </div>

                            <figcaption className="border-b border-slate-200 py-2 text-xs font-semibold leading-5 text-slate-500">
                                AHPK advances professional standards, member
                                welfare, hospitality education and responsible
                                industry representation.
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* PURPOSE */}
                            <section
                                id="purpose"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <SectionHeading
                                    eyebrow="Association Purpose"
                                    title="The purpose of the Association"
                                    icon={Landmark}
                                />

                                <p className="mt-4 max-w-3xl text-[17px] leading-8 text-slate-700">
                                    AHPK exists to promote
                                    professionalism, ethical practice,
                                    member welfare, education and
                                    appropriate regulation throughout
                                    the hospitality profession.
                                </p>

                                <div className="mt-5 border-t border-slate-300">
                                    {purposeItems.map((item, index) => (
                                        <PurposeRow
                                            key={item.title}
                                            item={item}
                                            number={index + 1}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* ADVOCACY */}
                            <section
                                id="advocacy"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Association Advocacy"
                                    title="Advancing the objectives of the hotel industry"
                                    icon={Handshake}
                                />

                                <p className="mt-4 max-w-3xl text-[17px] leading-8 text-slate-700">
                                    AHPK develops, advances and
                                    implements the objectives of the
                                    hotel industry through
                                    professional leadership, public
                                    advocacy and institutional
                                    collaboration.
                                </p>

                                <div className="mt-5 border-t border-slate-300">
                                    {advocacyItems.map((item, index) => (
                                        <PurposeRow
                                            key={item.title}
                                            item={item}
                                            number={index + 1}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* MEMBERSHIP */}
                            <section
                                id="membership"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white sm:p-6">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                        Join AHPK
                                    </p>

                                    <h2 className="mt-2 max-w-2xl text-2xl font-black leading-tight sm:text-3xl">
                                        Join the Association driving
                                        hospitality excellence
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                                        Become part of Kenya&apos;s
                                        professional hospitality
                                        community and contribute to
                                        stronger standards and
                                        industry development.
                                    </p>

                                    <Link
                                        href="/apply"
                                        className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-red-700"
                                    >
                                        Apply for Membership

                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </section>

                            {/* PREVIOUS / NEXT */}
                            <section className="border-t border-slate-300 pt-5">
                                <SectionLabel>
                                    Continue Reading
                                </SectionLabel>

                                <div className="mt-3 grid border-y border-slate-300 sm:grid-cols-2">
                                    <RelatedPageLink
                                        href="/about/corporate-statements"
                                        eyebrow="Previous"
                                        title="Corporate Statements"
                                        direction="left"
                                    />

                                    <RelatedPageLink
                                        href="/about/who-we-are"
                                        eyebrow="Next"
                                        title="Who We Are"
                                        direction="right"
                                    />
                                </div>
                            </section>
                        </article>

                        {/* SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <div className="border-t-4 border-[#C8102E]">
                                <div className="border-b border-slate-300 py-3">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        On this page
                                    </p>

                                    <h2 className="mt-1.5 text-xl font-black text-slate-950">
                                        Association Purpose
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Association purpose navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    {sidebarItems.map(([href, label]) => (
                                        <ArticleSideLink
                                            key={href}
                                            href={href}
                                            label={label}
                                        />
                                    ))}
                                </nav>
                            </div>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <ShieldCheck
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Professional standards
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    AHPK promotes ethical practice,
                                    professional recognition,
                                    education and responsible
                                    regulation within hospitality.
                                </p>

                                <Link
                                    href="/about/corporate-statements"
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]"
                                >
                                    Corporate Statements

                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                    Membership
                                </p>

                                <h2 className="mt-2 text-xl font-black">
                                    Join the AHPK community
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Access professional recognition,
                                    development opportunities,
                                    industry networking and member
                                    services.
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
        <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <SectionLabel>{eyebrow}</SectionLabel>

                <h2 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                    {title}
                </h2>
            </div>
        </div>
    );
}

function PurposeRow({
    item,
    number,
}: {
    item: (typeof purposeItems)[number] | (typeof advocacyItems)[number];
    number: number;
}) {
    const Icon = item.icon;

    return (
        <article className="grid gap-3 border-b border-slate-300 py-5 last:border-b-0 sm:grid-cols-[58px_48px_minmax(0,1fr)] sm:items-start">
            <p className="text-3xl font-black leading-none text-slate-300">
                {String(number).padStart(2, "0")}
            </p>

            <div className="flex h-10 w-10 items-center justify-center bg-[#C8102E] text-white">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <h3 className="text-xl font-black text-slate-950">
                    {item.title}
                </h3>

                <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                    {item.description}
                </p>
            </div>
        </article>
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
            className="group flex min-h-24 items-center gap-3 border-b border-slate-300 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
        >
            {direction === "left" && (
                <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:-translate-x-1" />
            )}

            <div className={direction === "right" ? "ml-auto text-right" : ""}>
                <p className="text-[10px] font-black uppercase tracking-[0.17em] text-slate-400">
                    {eyebrow}
                </p>

                <h3 className="mt-1.5 text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>
            </div>

            {direction === "right" && (
                <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
            )}
        </Link>
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

function SectionLabel({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
            {children}
        </p>
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

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Association Purpose
            </span>
        </nav>
    );
}
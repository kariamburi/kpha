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
                    { name: "Home", url: "/" },
                    { name: "Association Purpose", url: pagePath },
                ]}
            />
            <AssociationPurposeJsonLd />
            <PageHeader />

            {/* COMPACT PAGE HEADER */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-5 pb-6 pt-5 sm:px-6 lg:px-8">
                    <Breadcrumb />
                    <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                        Association<span className="text-[#C8102E]">{"\u00A0"}Purpose</span>
                    </h1>
                    <p className="mt-2 max-w-4xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                        Promoting professional standards, ethical practice, industry advocacy and collaboration within Kenya&apos;s hotel and hospitality profession.
                    </p>
                </div>
            </section>

            {/* FEATURE IMAGE */}
            <figure className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
                <div className="aspect-[16/5] min-h-[150px] max-h-[320px] overflow-hidden bg-slate-100">
                    <img
                        src="/ahpk_office_scene.webp"
                        alt="Professional standards and advocacy represented by AHPK"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </figure>

            <section className="py-6 sm:py-8">
                <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-10 lg:px-8">
                    <article className="min-w-0 space-y-7">
                        <section id="purpose" className="scroll-mt-28">
                            <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2">
                                <Landmark aria-hidden="true" className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Association Purpose</h2>
                            </div>
                            <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                AHPK exists to promote professionalism, ethical practice, member welfare, education and appropriate regulation throughout the hospitality profession.
                            </p>
                            <ul className="mt-3 space-y-2.5">
                                {purposeItems.map((item) => (
                                    <li key={item.title} className="flex items-start gap-3 text-sm leading-7 sm:text-base">
                                        <span aria-hidden="true" className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" />
                                        <p className="min-w-0 text-slate-700">
                                            <strong className="font-extrabold text-slate-950">{item.title}:</strong>{" "}{item.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section id="advocacy" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2">
                                <Handshake aria-hidden="true" className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Association Advocacy</h2>
                            </div>
                            <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                AHPK develops, advances and implements the objectives of the hotel industry through professional leadership, public advocacy and institutional collaboration.
                            </p>
                            <ul className="mt-3 space-y-2.5">
                                {advocacyItems.map((item) => (
                                    <li key={item.title} className="flex items-start gap-3 text-sm leading-7 sm:text-base">
                                        <span aria-hidden="true" className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" />
                                        <p className="min-w-0 text-slate-700">
                                            <strong className="font-extrabold text-slate-950">{item.title}:</strong>{" "}{item.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>


                    </article>

                    <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                        <nav aria-label="On this page" className="border-t-4 border-[#C8102E]">
                            <h2 className="border-b border-slate-200 py-2.5 text-base font-black">On This Page</h2>
                            {sidebarItems.map(([href, label]) => (
                                <Link key={href} href={href} className="flex items-center justify-between gap-3 border-b border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#C8102E]">
                                    {label}<ChevronRight className="h-4 w-4 shrink-0 text-[#C8102E]" />
                                </Link>
                            ))}
                        </nav>
                        <div className="border-t-4 border-slate-950 bg-slate-50 p-4">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-[#C8102E]" />
                                <h2 className="font-black text-slate-950">Professional Standards</h2>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                AHPK promotes ethical practice, professional recognition, education and responsible regulation within hospitality.
                            </p>
                            <Link href="/about/corporate-statements" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#C8102E]">
                                Corporate Statements <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>
            <PublicFooter />
        </main>
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
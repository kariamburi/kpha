// app/about/who-we-are/page.tsx

import type {
    CSSProperties,
    ReactNode,
} from "react";
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    ChevronRight,
    FileCheck2,
    Home,
    Landmark,
    ShieldCheck,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

export const metadata: Metadata = {
    title: "Who We Are",

    description:
        "Learn about the Association of Hotel Professionals Kenya (AHPK), its registration, advocacy work, professional mandate and role in advancing hospitality standards in Kenya.",

    keywords: [
        "Association of Hotel Professionals Kenya",
        "AHPK",
        "AHPK Kenya",
        "hotel professionals Kenya",
        "hospitality professionals Kenya",
        "hospitality association Kenya",
        "hotel industry association Kenya",
        "hospitality standards Kenya",
        "hospitality advocacy Kenya",
        "hospitality membership Kenya",
        "professional hotel association Kenya",
        "tourism professionals Kenya",
        "AHPK registration",
        "AHPK who we are",
    ],

    alternates: {
        canonical: "/about/who-we-are",
    },

    openGraph: {
        title:
            "Who We Are | Association of Hotel Professionals Kenya",

        description:
            "Discover AHPK’s registration, advocacy role and commitment to advancing professionalism in Kenya’s hospitality industry.",

        url: "/about/who-we-are",

        siteName:
            "Association of Hotel Professionals Kenya",

        locale: "en_KE",
        type: "website",

        images: [
            {
                url: "/welcome.webp",
                width: 1536,
                height: 1024,

                alt:
                    "Hospitality professionals represented by the Association of Hotel Professionals Kenya",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title: "Who We Are | AHPK",

        description:
            "Learn about the Association of Hotel Professionals Kenya and its role in advancing hospitality professionalism, advocacy and ethical standards.",

        images: ["/welcome.webp"],
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

const collaborationBodies = [
    {
        shortName: "KTF",
        fullName: "Kenya Tourism Federation",
    },
    {
        shortName: "KCTA",
        fullName:
            "Kenya Coast Tourism Association",
    },
    {
        shortName: "KATO",
        fullName:
            "Kenya Association of Tour Operators",
    },
    {
        shortName: "KATA",
        fullName:
            "Kenya Association of Travel Agents",
    },
    {
        shortName: "KAHC",
        fullName:
            "Kenya Association of Hotelkeepers and Caterers",
    },
    {
        shortName: "TF",
        fullName: "Tourism Fund",
    },
    {
        shortName: "KTB",
        fullName: "Kenya Tourism Board",
    },
    {
        shortName: "KUC",
        fullName: "Kenyatta University",
    },
    {
        shortName: "TFC",
        fullName:
            "Tourism Finance Corporation",
    },
    {
        shortName: "KWS",
        fullName: "Kenya Wildlife Service",
    },
];

export default function WhoWeArePage() {
    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: "Home",
                        url: "/",
                    },
                    {
                        name: "About AHPK",
                        url: "/about",
                    },
                    {
                        name: "Who We Are",
                        url: "/about/who-we-are",
                    },
                ]}
            />

            <AboutPageJsonLd />

            <PageHeader />

            {/* ABOUT MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 max-w-5xl">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            About AHPK
                        </p>

                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                            Who We Are
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            The Association of Hotel
                            Professionals Kenya is a
                            professional body representing
                            individuals and practitioners
                            working throughout Kenya&apos;s
                            hotel and hospitality industry.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                href="/members-section/constitution-rules/membership"
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-[#A80D27]"
                            >
                                Explore Membership

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex min-h-11 items-center justify-center border border-slate-300 px-6 text-sm font-black text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                            >
                                Contact AHPK
                            </Link>
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
                                src="/welcome.webp"
                                alt="Hospitality professionals represented by AHPK"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            AHPK advances professional
                            recognition, standards,
                            development and collaboration
                            across Kenya&apos;s hospitality
                            industry.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* ABOUT THE ASSOCIATION */}
                            <section
                                id="about-the-association"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <SectionLabel>
                                    About the Association
                                </SectionLabel>

                                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                    Who We Are
                                </h2>

                                <div className="mt-4 space-y-4 text-[17px] font-normal leading-8 text-slate-700 sm:text-lg sm:leading-9">
                                    <p>
                                        The Association of Hotel
                                        Professionals Kenya is a
                                        professional body whose
                                        membership is drawn from key
                                        individual professionals and
                                        practitioners in the hotel
                                        industry.
                                    </p>

                                    <p>
                                        It is registered under the
                                        Societies Act, with the aim of
                                        regulating, lobbying and
                                        securing its members&apos;
                                        rightful place while offering
                                        a recognised voice for
                                        professionals who are active
                                        in service, retired or working
                                        in consultancy.
                                    </p>

                                    <p>
                                        The Association also reaches
                                        out to institutions of higher
                                        learning preparing
                                        undergraduates and
                                        professionals to join the
                                        hospitality industry, one of
                                        the world&apos;s
                                        fastest-growing sectors and a
                                        major contributor to
                                        employment, sustainable
                                        economic development and
                                        social progress.
                                    </p>

                                    <p>
                                        AHPK advocates for high
                                        standards of service delivery,
                                        stronger hospitality
                                        establishments and training
                                        institutions that meet
                                        internationally recognised
                                        standards, helping position
                                        Kenya as a tourism destination
                                        of choice.
                                    </p>
                                </div>
                            </section>

                            {/* ASSOCIATION REGISTRATION */}
                            <section
                                id="association-registration"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <FileCheck2
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <SectionLabel>
                                            Official Information
                                        </SectionLabel>

                                        <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                            Association Registration
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-4 text-[17px] leading-8 text-slate-700">
                                    <p>
                                        The Association is registered
                                        under the name{" "}
                                        <strong className="font-black text-slate-950">
                                            Association of Hotel
                                            Professionals Kenya
                                        </strong>
                                        , referred to in its
                                        constitution as “the Society”
                                        and abbreviated as{" "}
                                        <strong className="font-black text-slate-950">
                                            AHPK
                                        </strong>
                                        .
                                    </p>

                                    <p>
                                        The Association was registered
                                        under certificate number{" "}
                                        <strong className="font-black text-slate-950">
                                            48570
                                        </strong>
                                        , dated{" "}
                                        <strong className="font-black text-slate-950">
                                            16 September 2016
                                        </strong>
                                        , by the Office of the
                                        Registrar General.
                                    </p>

                                    <p>
                                        This followed the issuance of
                                        a letter of No Objection from
                                        the Office of the Director
                                        General, Tourism Regulatory
                                        Authority, dated{" "}
                                        <strong className="font-black text-slate-950">
                                            5 June 2015
                                        </strong>
                                        , under reference{" "}
                                        <strong className="font-black text-slate-950">
                                            TRA/1/14/(222)
                                        </strong>
                                        .
                                    </p>
                                </div>

                                <div className="mt-5 grid border-y border-slate-300 sm:grid-cols-3">
                                    <RegistrationFact
                                        label="Certificate"
                                        value="No. 48570"
                                    />

                                    <RegistrationFact
                                        label="Registered"
                                        value="16 Sep 2016"
                                    />

                                    <RegistrationFact
                                        label="Reference"
                                        value="TRA/1/14/(222)"
                                    />
                                </div>
                            </section>

                            {/* ASSOCIATION ADVOCACY */}
                            <section
                                id="association-advocacy"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#C8102E] text-white">
                                        <Landmark
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <SectionLabel>
                                            Professional Representation
                                        </SectionLabel>

                                        <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                            Association Advocacy
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-4 text-[17px] leading-8 text-slate-700">
                                    <p>
                                        AHPK works to develop, advance
                                        and implement the objectives
                                        of the hotel industry and
                                        works with government agencies
                                        at regional, national and
                                        county levels.
                                    </p>

                                    <p>
                                        This includes collaboration
                                        with the Tourism Regulatory
                                        Authority through lobbying,
                                        policy development,
                                        communication, grassroots
                                        advocacy and harmonisation of
                                        programmes developed by
                                        county governments, tourism
                                        agencies, training
                                        institutions and hospitality
                                        establishments.
                                    </p>

                                    <p>
                                        The Association also
                                        collaborates with existing
                                        industry associations and
                                        corporate bodies that share
                                        common professional and sector
                                        goals.
                                    </p>
                                </div>

                                <div className="mt-5 divide-y divide-slate-300 border-y border-slate-300">
                                    {collaborationBodies.map(
                                        (body) => (
                                            <div
                                                key={body.shortName}
                                                className="grid gap-1.5 py-3 sm:grid-cols-[90px_minmax(0,1fr)] sm:items-center"
                                            >
                                                <p className="font-black text-[#C8102E]">
                                                    {body.shortName}
                                                </p>

                                                <p className="text-sm font-semibold leading-6 text-slate-600">
                                                    {body.fullName}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>

                                <p className="mt-4 text-[17px] leading-8 text-slate-700">
                                    AHPK also collaborates with
                                    other organisations that share
                                    common hospitality, tourism,
                                    education and professional
                                    development goals.
                                </p>
                            </section>
                        </article>

                        {/* SIDE NAVIGATION */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <div className="border-t-4 border-[#C8102E]">
                                <div className="border-b border-slate-300 py-3">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        On this page
                                    </p>

                                    <h2 className="mt-1.5 text-xl font-black text-slate-950">
                                        Who We Are
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Who we are page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <ArticleSideLink
                                        href="#about-the-association"
                                        label="About the Association"
                                    />

                                    <ArticleSideLink
                                        href="#association-registration"
                                        label="Association Registration"
                                    />

                                    <ArticleSideLink
                                        href="#association-advocacy"
                                        label="Association Advocacy"
                                    />
                                </nav>
                            </div>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <ShieldCheck
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    A professional voice
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    AHPK represents and supports
                                    professionals serving
                                    throughout Kenya&apos;s hotel
                                    and hospitality industry.
                                </p>

                                <Link
                                    href="/contact"
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]"
                                >
                                    Contact AHPK

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
                                    Access professional
                                    recognition, development
                                    opportunities, industry
                                    networking and member services.
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

            <Link
                href="/about"
                className="transition hover:text-[#C8102E]"
            >
                About Us
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Who We Are
            </span>
        </nav>
    );
}

function SectionLabel({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
            {children}
        </p>
    );
}

function RegistrationFact({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="border-b border-slate-300 px-0 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                {label}
            </p>

            <p className="mt-1.5 break-words text-base font-black text-slate-950">
                {value}
            </p>
        </div>
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

function AboutPageJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",

        "@type": "AboutPage",

        "@id":
            "https://ahpk.or.ke/about/who-we-are#webpage",

        url:
            "https://ahpk.or.ke/about/who-we-are",

        name:
            "Who We Are | Association of Hotel Professionals Kenya",

        headline:
            "About the Association of Hotel Professionals Kenya",

        description:
            "Learn about the Association of Hotel Professionals Kenya, its registration, professional mandate, advocacy work and role in Kenya’s hospitality industry.",

        inLanguage: "en-KE",

        isPartOf: {
            "@type": "WebSite",

            "@id":
                "https://ahpk.or.ke/#website",

            name:
                "Association of Hotel Professionals Kenya",

            url: "https://ahpk.or.ke",
        },

        about: {
            "@type": "Organization",

            "@id":
                "https://ahpk.or.ke/#organization",

            name:
                "Association of Hotel Professionals Kenya",

            alternateName: "AHPK",

            url: "https://ahpk.or.ke",

            logo: {
                "@type": "ImageObject",

                url:
                    "https://ahpk.or.ke/images/logo.png",
            },

            description:
                "A professional association representing hotel and hospitality professionals in Kenya.",

            areaServed: {
                "@type": "Country",
                name: "Kenya",
            },

            address: {
                "@type": "PostalAddress",

                addressLocality: "Nairobi",

                addressCountry: "KE",
            },

            email: "info@ahpk.or.ke",
        },

        primaryImageOfPage: {
            "@type": "ImageObject",

            url:
                "https://ahpk.or.ke/welcome.webp",

            width: 1536,
            height: 1024,
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
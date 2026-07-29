import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    FileCheck2,
    Home,
    Landmark,
    ShieldCheck,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
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
                alt: "Hospitality professionals represented by the Association of Hotel Professionals Kenya",
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
        fullName: "Kenya Coast Tourism Association",
    },
    {
        shortName: "KATO",
        fullName: "Kenya Association of Tour Operators",
    },
    {
        shortName: "KATA",
        fullName: "Kenya Association of Travel Agents",
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
        fullName: "Tourism Finance Corporation",
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

            {/* PAGE HERO */}
            <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-red-100/60 blur-3xl" />

                    <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-slate-200/70 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-14">
                    <Breadcrumb />

                    <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#C8102E] shadow-sm">
                                <span className="h-2 w-2 rounded-full bg-[#C8102E]" />

                                About AHPK
                            </p>

                            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Who We Are
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                The Association of Hotel
                                Professionals Kenya is a
                                professional body representing
                                individuals and practitioners
                                working throughout Kenya&apos;s
                                hotel and hospitality industry.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/membership"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#A80D27]"
                                >
                                    Explore Membership

                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/contact"
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-extrabold text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                                >
                                    Contact AHPK
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative overflow-hidden rounded-[30px] border border-white bg-white p-3 shadow-2xl">
                                <img
                                    src="/welcome.webp"
                                    alt="Hospitality professionals in Kenya"
                                    className="h-[380px] w-full rounded-[24px] object-cover sm:h-[460px]"
                                />

                                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-xl">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                        Professional community
                                    </p>

                                    <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                                        Advancing recognition,
                                        standards, development and
                                        collaboration across
                                        Kenya&apos;s hospitality
                                        industry.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN ABOUT CONTENT */}
            <section className="bg-white py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                        {/* MAIN ARTICLE */}
                        <article className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
                            {/* WHO WE ARE */}
                            <section
                                id="about-the-association"
                                className="scroll-mt-28 border-b border-slate-200 p-7 sm:p-9 lg:p-12"
                            >
                                <SectionLabel>
                                    About the Association
                                </SectionLabel>

                                <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    Who We Are
                                </h2>

                                <div className="mt-7 space-y-6 text-base font-medium leading-8 text-slate-600">
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
                                        Societies Act, with the aim to
                                        regulate, lobby and secure its
                                        members&apos; rightful place
                                        and offer a voice for
                                        professionals who are both
                                        active in service, retired or
                                        in consultancy.
                                    </p>

                                    <p>
                                        The Association has an
                                        extension to reach out to and
                                        consider institutions of
                                        higher learning preparing
                                        undergraduates to join the
                                        industry, which has been
                                        acknowledged globally as one
                                        of the fastest-growing
                                        industries and a major
                                        contributor to employment,
                                        sustainable economic
                                        development and social
                                        development.
                                    </p>

                                    <p>
                                        It also advocates for high-end
                                        service delivery to help raise
                                        the standards of hospitality
                                        offering establishments and
                                        training institutions to
                                        international standards and
                                        project the region as a
                                        tourism destination of choice.
                                    </p>
                                </div>
                            </section>

                            {/* ASSOCIATION REGISTRATION */}
                            <section
                                id="association-registration"
                                className="scroll-mt-28 border-b border-slate-200 bg-slate-50/70 p-7 sm:p-9 lg:p-12"
                            >
                                <div className="grid gap-8 md:grid-cols-[72px_minmax(0,1fr)]">
                                    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                        <FileCheck2
                                            className="h-8 w-8"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                            Official information
                                        </p>

                                        <h2 className="mt-3 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                            The Association
                                            Registration
                                        </h2>

                                        <div className="mt-6 space-y-5 text-base font-medium leading-8 text-slate-600">
                                            <p>
                                                The Association is
                                                registered under the
                                                name
                                                <strong className="font-extrabold text-slate-900">
                                                    {" "}
                                                    “Association of
                                                    Hotel
                                                    Professionals
                                                    Kenya”
                                                </strong>
                                                , referred to in its
                                                constitution as “the
                                                Society” and
                                                abbreviated as
                                                <strong className="font-extrabold text-slate-900">
                                                    {" "}
                                                    AHPK
                                                </strong>
                                                .
                                            </p>

                                            <p>
                                                The Association was
                                                registered under
                                                certificate number
                                                <strong className="font-extrabold text-slate-900">
                                                    {" "}
                                                    48570
                                                </strong>
                                                , dated
                                                <strong className="font-extrabold text-slate-900">
                                                    {" "}
                                                    16 September 2016
                                                </strong>
                                                , by the Office of the
                                                Registrar General.
                                            </p>

                                            <p>
                                                This followed the
                                                issuance of a letter
                                                of No Objection from
                                                the Office of the
                                                Director General,
                                                Tourism Regulatory
                                                Authority, dated
                                                <strong className="font-extrabold text-slate-900">
                                                    {" "}
                                                    5 June 2015
                                                </strong>
                                                , under reference
                                                <strong className="font-extrabold text-slate-900">
                                                    {" "}
                                                    TRA/1/14/(222)
                                                </strong>
                                                .
                                            </p>
                                        </div>

                                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
                                    </div>
                                </div>
                            </section>

                            {/* ASSOCIATION ADVOCACY */}
                            <section
                                id="association-advocacy"
                                className="scroll-mt-28 p-7 sm:p-9 lg:p-12"
                            >
                                <div className="grid gap-8 md:grid-cols-[72px_minmax(0,1fr)]">
                                    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                        <Landmark
                                            className="h-8 w-8"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                            Professional
                                            representation
                                        </p>

                                        <h2 className="mt-3 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                            Association Advocacy
                                        </h2>

                                        <div className="mt-6 space-y-5 text-base font-medium leading-8 text-slate-600">
                                            <p>
                                                AHPK works to develop,
                                                advance and implement
                                                the objectives of the
                                                hotel industry and
                                                works with government
                                                agencies at regional,
                                                national and county
                                                levels.
                                            </p>

                                            <p>
                                                These include the
                                                Tourism Regulatory
                                                Authority through
                                                lobbying, policy
                                                development,
                                                communications,
                                                grassroots advocacy
                                                and harmonising the
                                                various programmes
                                                developed and advanced
                                                by the respective
                                                county governments and
                                                other tourism
                                                promotion agencies,
                                                training institutions
                                                and hospitality
                                                establishments.
                                            </p>

                                            <p>
                                                The Association seeks
                                                collaboration with
                                                existing industry
                                                associations and
                                                corporate bodies that
                                                share common goals,
                                                including:
                                            </p>
                                        </div>

                                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                            {collaborationBodies.map(
                                                (body) => (
                                                    <div
                                                        key={
                                                            body.shortName
                                                        }
                                                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                                    >
                                                        <CheckCircle2
                                                            className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]"
                                                            aria-hidden="true"
                                                        />

                                                        <div>
                                                            <p className="text-sm font-extrabold text-slate-900">
                                                                {
                                                                    body.shortName
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                                                                {
                                                                    body.fullName
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>

                                        <p className="mt-7 text-base font-medium leading-8 text-slate-600">
                                            AHPK also collaborates
                                            with other organisations
                                            that share common
                                            hospitality, tourism,
                                            education and professional
                                            development goals.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </article>

                        {/* SIDE NAVIGATION */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
                                <div className="bg-[#C8102E] px-6 py-5 text-white">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                                        On this page
                                    </p>

                                    <h2 className="mt-2 text-xl font-extrabold">
                                        Who We Are
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Who we are page navigation"
                                    className="p-3"
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

                            <div className="rounded-[26px] border border-red-100 bg-red-50 p-6">
                                <ShieldCheck
                                    className="h-8 w-8 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    A professional voice
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    AHPK represents and supports
                                    professionals serving throughout
                                    Kenya&apos;s hotel and
                                    hospitality industry.
                                </p>

                                <Link
                                    href="/contact"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    Contact AHPK

                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Membership
                                </p>

                                <h2 className="mt-3 text-xl font-extrabold text-slate-950">
                                    Join the AHPK community
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Access professional recognition,
                                    development opportunities,
                                    industry networking and member
                                    services.
                                </p>

                                <Link
                                    href="/apply"
                                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-5 text-sm font-extrabold text-white transition hover:bg-[#A80D27]"
                                >
                                    Apply for Membership

                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-slate-50 py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#C8102E] to-[#8E0C22] px-7 py-12 text-white shadow-2xl sm:px-10 lg:px-14 lg:py-16">
                        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10" />

                        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10" />

                        <div className="relative max-w-4xl">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">
                                Become part of AHPK
                            </p>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                                Join a professional community
                                advancing hospitality standards in
                                Kenya.
                            </h2>

                            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/80">
                                Access professional recognition,
                                development opportunities, industry
                                networking and a stronger collective
                                voice within Kenya&apos;s hospitality
                                industry.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/apply"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-[#C8102E] transition hover:bg-slate-100"
                                >
                                    Apply for Membership

                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/membership"
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-extrabold text-white transition hover:bg-white hover:text-slate-950"
                                >
                                    Explore Membership
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function AboutPageJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id":
            "https://ahpk.or.ke/about/who-we-are#webpage",

        url: "https://ahpk.or.ke/about/who-we-are",

        name:
            "Who We Are | Association of Hotel Professionals Kenya",

        headline:
            "About the Association of Hotel Professionals Kenya",

        description:
            "Learn about the Association of Hotel Professionals Kenya, its registration, professional mandate, advocacy work and role in Kenya’s hospitality industry.",

        inLanguage: "en-KE",

        isPartOf: {
            "@type": "WebSite",
            "@id": "https://ahpk.or.ke/#website",
            name:
                "Association of Hotel Professionals Kenya",
            url: "https://ahpk.or.ke",
        },

        about: {
            "@type": "Organization",
            "@id": "https://ahpk.or.ke/#organization",
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
            url: "https://ahpk.or.ke/welcome.webp",
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
    children: React.ReactNode;
}) {
    return (
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#C8102E]">
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
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                {label}
            </p>

            <p className="mt-2 break-words text-sm font-extrabold text-slate-900">
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
            className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
        >
            {label}

            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#C8102E]" />
        </Link>
    );
}
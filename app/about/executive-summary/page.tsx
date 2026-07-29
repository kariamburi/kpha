import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    ChevronRight,
    FileText,
    Home,
    ShieldCheck,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

export const metadata: Metadata = {
    title: "Executive Summary",

    description:
        "Read the Executive Summary of the Association of Hotel Professionals Kenya, including its formation, registration history and professional mandate.",

    keywords: [
        "AHPK Executive Summary",
        "Association of Hotel Professionals Kenya",
        "AHPK history",
        "AHPK formation",
        "AHPK registration",
        "hospitality professionals Kenya",
        "hotel professionals Kenya",
        "hospitality association Kenya",
    ],

    alternates: {
        canonical: "/about/executive-summary",
    },

    openGraph: {
        title:
            "Executive Summary | Association of Hotel Professionals Kenya",
        description:
            "Learn how AHPK was formed and established to represent hospitality professionals in Kenya.",
        url: "/about/executive-summary",
        siteName:
            "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "website",
        images: [
            {
                url: "/welcome.webp",
                width: 1536,
                height: 1024,
                alt: "Hospitality professionals represented by AHPK",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Executive Summary | AHPK",
        description:
            "Read about the formation and professional mandate of the Association of Hotel Professionals Kenya.",
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

export default function ExecutiveSummaryPage() {
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
                        name: "Executive Summary",
                        url: "/about/executive-summary",
                    },
                ]}
            />

            <ExecutiveSummaryJsonLd />

            <PageHeader />

            {/* PAGE HERO */}
            <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-red-100/60 blur-3xl" />
                    <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-slate-200/70 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 lg:pt-14">
                    <Breadcrumb />

                    <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#C8102E] shadow-sm">
                                <span className="h-2 w-2 rounded-full bg-[#C8102E]" />
                                About AHPK
                            </p>

                            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Executive Summary
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                The background, formation and
                                professional mandate of the Association
                                of Hotel Professionals Kenya.
                            </p>

                            <div className="mt-8">
                                <Link
                                    href="/about/who-we-are"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#A80D27]"
                                >
                                    Who We Are
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative overflow-hidden rounded-[28px] border border-white bg-white p-3 shadow-xl">
                                <img
                                    src="/executive-summary.webp"
                                    alt="Hospitality professionals represented by AHPK"
                                    className="h-[340px] w-full rounded-[22px] object-cover sm:h-[400px]"
                                />

                                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-xl">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                        Our foundation
                                    </p>

                                    <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                                        Established to give hospitality
                                        professionals a recognised and
                                        organised voice.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXECUTIVE SUMMARY CONTENT */}
            <section className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        <article className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9 lg:p-12">
                            <div id="executive-summary" className="scroll-mt-28">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <FileText
                                        className="h-7 w-7"
                                        aria-hidden="true"
                                    />
                                </div>

                                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                    Official overview
                                </p>

                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    Executive Summary
                                </h2>

                                <div className="mt-7 space-y-6 text-base font-medium leading-8 text-slate-600">
                                    <p>
                                        Following the forum held on 10th
                                        January 2015 by the hotel
                                        professional colleagues from the
                                        wider hospitality industry, an
                                        idea was mooted to form and
                                        register a professional
                                        association tasked with the
                                        mandate to regulate and give a
                                        voice to the professionals in
                                        this industry.
                                    </p>

                                    <p>
                                        This was especially important
                                        in relation to the regulation of
                                        hospitality establishments,
                                        including hotels, lodges,
                                        restaurants, bars, spas, country
                                        clubs, hospitals, entertainment,
                                        meetings and convention
                                        industries.
                                    </p>

                                    <p>
                                        It was felt that, despite the
                                        tremendous gains made through
                                        the growth of the industry, the
                                        benefits from the industry&apos;s
                                        resources were skewed in favour
                                        of investors and foreign
                                        expatriate workers.
                                    </p>

                                    <p>
                                        This situation was considered
                                        unfair when taking into account
                                        the social and economic impact
                                        the sector played in the country,
                                        particularly as a
                                        labour-intensive industry, a
                                        major contributor to the
                                        country&apos;s GDP and an
                                        important foreign exchange
                                        earner.
                                    </p>

                                    <p>
                                        It was further noted that even
                                        with the first group of locally
                                        trained professional managers
                                        having joined formal training in
                                        1969 at the former Hotel
                                        Training School based at the
                                        Technical University, formerly
                                        Kenya Polytechnic, major hotel
                                        chains and travel-sector
                                        organisations continued to
                                        import expatriate labour.
                                    </p>

                                    <p>
                                        This continued despite the
                                        existence of highly qualified
                                        and experienced Kenyan managers
                                        and other professional cadres
                                        locally.
                                    </p>

                                    <p>
                                        The practice was considered to
                                        be working against the
                                        government&apos;s policy of
                                        creating jobs for trained and
                                        qualified home-grown
                                        professionals.
                                    </p>

                                    <p>
                                        It also resulted in significant
                                        capital outflow to other
                                        economies, while Kenya remained
                                        a convenient source of highly
                                        trained and skilled industry
                                        workers, even as jobs remained
                                        elusive at home.
                                    </p>

                                    <p>
                                        The Association&apos;s
                                        objective is to create community
                                        goodwill and provide its members
                                        with career and professional
                                        growth and empowerment through
                                        networking and partnering in
                                        business with other members
                                        within and outside the
                                        profession.
                                    </p>

                                    <p>
                                        The forum appointed a steering
                                        committee to pursue the idea and
                                        gave the committee the mandate
                                        to commence the search for a
                                        suitable name.
                                    </p>

                                    <p>
                                        Upon securing one, the
                                        committee was required to seek
                                        a letter of No Objection from
                                        the Tourism Regulatory
                                        Authority, a department within
                                        the Ministry of Tourism
                                        mandated to regulate and license
                                        operators and players within the
                                        hotel and tourism industry.
                                    </p>

                                    <p>
                                        The committee initially settled
                                        for the name
                                        <strong className="font-extrabold text-slate-900">
                                            {" "}
                                            “Association of Hospitality
                                            and Tourism Professionals”
                                        </strong>
                                        .
                                    </p>

                                    <p>
                                        A name search was then initiated
                                        through a letter dated
                                        <strong className="font-extrabold text-slate-900">
                                            {" "}
                                            12 January 2015
                                        </strong>
                                        , after which the proposed names
                                        were found to be available and
                                        reserved.
                                    </p>

                                    <p>
                                        On
                                        <strong className="font-extrabold text-slate-900">
                                            {" "}
                                            5 June 2015
                                        </strong>
                                        , a letter of No Objection was
                                        issued by the Tourism Regulatory
                                        Authority under reference
                                        <strong className="font-extrabold text-slate-900">
                                            {" "}
                                            TRA/1/14/(222)
                                        </strong>
                                        .
                                    </p>

                                    <p>
                                        However, when the interim
                                        official proceeded to file the
                                        formal registration of the
                                        Association, it was discovered
                                        that the reserved name was no
                                        longer available.
                                    </p>

                                    <p>
                                        Another association had already
                                        been registered using the name
                                        <strong className="font-extrabold text-slate-900">
                                            {" "}
                                            “Tourism Professional
                                            Association”
                                        </strong>
                                        , and the committee was advised
                                        to select another name to avoid
                                        duplication or conflicts of
                                        interest.
                                    </p>

                                    <p>
                                        A meeting was then convened
                                        where several alternative names
                                        were proposed, and it was
                                        decided to settle for
                                        <strong className="font-extrabold text-slate-900">
                                            {" "}
                                            “Association of Hotel
                                            Professionals Kenya”
                                        </strong>
                                        , because the majority of the
                                        founder members came from hotel
                                        industry backgrounds.
                                    </p>

                                    <p>
                                        The Tourism Regulatory
                                        Authority later confirmed that
                                        there was no need to apply for
                                        another letter of No Objection
                                        because the original letter had
                                        already met the required
                                        objectives.
                                    </p>

                                    <p>
                                        The committee was instead
                                        requested to provide a copy of
                                        the new name for filing
                                        purposes.
                                    </p>
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
                                        Executive Summary
                                    </h2>
                                </div>

                                <nav className="p-3">
                                    <Link
                                        href="#executive-summary"
                                        className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
                                    >
                                        Read Summary

                                        <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#C8102E]" />
                                    </Link>
                                </nav>
                            </div>

                            <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
                                <ShieldCheck
                                    className="h-8 w-8 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    A professional voice
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    AHPK was established to represent,
                                    support and advance hospitality
                                    professionals in Kenya.
                                </p>

                                <Link
                                    href="/about/who-we-are"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    Who We Are
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function ExecutiveSummaryJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id":
            "https://ahpk.or.ke/about/executive-summary#webpage",
        url:
            "https://ahpk.or.ke/about/executive-summary",
        name:
            "Executive Summary | Association of Hotel Professionals Kenya",
        headline:
            "Executive Summary of the Association of Hotel Professionals Kenya",
        description:
            "The formation, registration history and professional mandate of the Association of Hotel Professionals Kenya.",
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
                Executive Summary
            </span>
        </nav>
    );
}
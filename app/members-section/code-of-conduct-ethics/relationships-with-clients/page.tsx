// app/members-section/code-of-conduct-ethics/
// relationships-with-clients/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    Home,
    Scale,
    ShieldCheck,
    Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath =
    "/members-section/code-of-conduct-ethics/relationships-with-clients";

export const metadata: Metadata = {
    title: "Relationships with Clients",

    description:
        "Read the AHPK professional standards governing client relationships, confidentiality, independence, objectivity and integrity.",

    keywords: [
        "AHPK relationships with clients",
        "AHPK code of conduct",
        "hospitality professional ethics Kenya",
        "client confidentiality hospitality",
        "professional integrity hotel industry",
        "Association of Hotel Professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Relationships with Clients | Association of Hotel Professionals Kenya",
        description:
            "Professional standards guiding AHPK members in maintaining ethical, independent and responsible client relationships.",
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
                alt: "AHPK professional standards and client relationships",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Relationships with Clients | AHPK",
        description:
            "Professional standards for ethical and responsible client relationships.",
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

const generalResponsibilities = [
    {
        title: "Understand the Client’s Needs",
        description:
            "Members shall, before accepting an engagement, confer with the client or prospective client in sufficient detail and gather sufficient facts to gain an understanding of the perceived issues, the objectives to be achieved, the scope of assistance needed and the possible benefits that may accrue to the client.",
    },
    {
        title: "Maintain Confidentiality",
        description:
            "Members shall hold as strictly confidential all information concerning the affairs of the client or employer that is gathered during the course of a professional engagement, except when the client or employer has released such information.",
    },
    {
        title: "Provide Honest Advice",
        description:
            "Members shall advise the client of any significant reservations they have regarding anticipated benefits of an engagement. They shall not accept an engagement in which they cannot perceive a client benefit.",
    },
    {
        title: "Avoid Unrealistic Promises",
        description:
            "Members shall not promise any benefit that is not within their control to deliver to other employees or clients.",
    },
];

const independenceStandards = [
    {
        title: "Remain Independent and Objective",
        description:
            "Members shall assume an independent position with the client, ensuring that advice is based on impartial consideration of all pertinent facts and responsible opinions. Members shall not knowingly present a misleading report.",
    },
    {
        title: "Avoid Conflicts of Interest",
        description:
            "Members shall not accept any assignment involving a conflict of interest and must withdraw when an unavoidable conflict arises after acceptance, unless the conflict is fully disclosed in writing to all parties and all parties agree that the assignment may continue.",
    },
    {
        title: "Protect Professional Integrity",
        description:
            "Members shall not knowingly accept any assignment in which the member is called upon solely to lend professional reputation or signature to misleading predetermined opinions or positions.",
    },
    {
        title: "Preserve Professional Judgement",
        description:
            "Members shall not accept any assignment that precludes or limits the ability to develop factual and supportable opinions, findings or conclusions. Where the scope is limited, those limitations must be communicated in writing and agreed upon before the assignment is accepted.",
    },
    {
        title: "Act Only with Proper Authority",
        description:
            "Members shall not be the medium of payments made on an employer’s behalf unless requested by the employer, nor shall they place contracts or orders in connection with their work except with proper authority or on behalf of the employer.",
    },
    {
        title: "Observe Professional Fitness",
        description:
            "Members shall be guilty of improper conduct if convicted by a competent tribunal of a criminal or civil offence which, in the opinion of the AHPK Disciplinary Committee established under the Bye-laws, renders the member unfit for AHPK.",
    },
];

export default function RelationshipsWithClientsPage() {
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
                        name: "Code of Conduct & Ethics",
                        url:
                            "/members-section/code-of-conduct-ethics",
                    },
                    {
                        name: "Relationships with Clients",
                        url: pagePath,
                    },
                ]}
            />

            <RelationshipsWithClientsJsonLd />

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
                                <Scale className="h-4 w-4" />
                                Code of Conduct &amp; Ethics
                            </p>

                            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Relationships
                                <span className="block text-[#C8102E]">
                                    with Clients
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                Professional standards that guide AHPK
                                members in maintaining ethical,
                                independent and responsible
                                relationships with clients.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="relative overflow-hidden rounded-[28px] border border-white bg-white p-3 shadow-xl">
                                <img
                                    src="/executive-committee.webp"
                                    alt="AHPK client relationship standards"
                                    className="h-[320px] w-full rounded-[22px] object-cover sm:h-[380px]"
                                />

                                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-xl">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                        Ethical client service
                                    </p>

                                    <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                                        Relationships founded on
                                        confidentiality, independence,
                                        objectivity and integrity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        <article className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9 lg:p-12">
                            <div
                                id="client-relationships"
                                className="scroll-mt-28"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <Users
                                        className="h-7 w-7"
                                        aria-hidden="true"
                                    />
                                </div>

                                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                    Client responsibility
                                </p>

                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    Relationships with Clients
                                </h2>

                                <div className="mt-7 rounded-2xl border border-red-100 bg-red-50/70 p-6">
                                    <p className="text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                        A member of AHPK must not
                                        accept any assignment or engage
                                        in any practice involving a
                                        violation of the law, this Code
                                        or the member’s specific ethical
                                        responsibilities. A member must
                                        immediately withdraw from any
                                        assignment if such a violation
                                        is identified.
                                    </p>
                                </div>

                                <section
                                    id="general-responsibilities"
                                    className="mt-10 scroll-mt-28"
                                >
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Section A
                                    </p>

                                    <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                                        General Responsibilities
                                    </h3>

                                    <div className="mt-6 space-y-5">
                                        {generalResponsibilities.map(
                                            (item, index) => (
                                                <StandardItem
                                                    key={item.title}
                                                    number={index + 1}
                                                    title={item.title}
                                                    description={
                                                        item.description
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                </section>

                                <section
                                    id="independence-objectivity-integrity"
                                    className="mt-14 scroll-mt-28 border-t border-slate-200 pt-10"
                                >
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Section B
                                    </p>

                                    <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                                        Independence, Objectivity and
                                        Integrity
                                    </h3>

                                    <div className="mt-6 space-y-5">
                                        {independenceStandards.map(
                                            (item, index) => (
                                                <StandardItem
                                                    key={item.title}
                                                    number={index + 5}
                                                    title={item.title}
                                                    description={
                                                        item.description
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                </section>
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
                                        Client Standards
                                    </h2>
                                </div>

                                <nav className="p-3">
                                    <Link
                                        href="#client-relationships"
                                        className="group flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-[#C8102E]"
                                    >
                                        Introduction
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>

                                    <Link
                                        href="#general-responsibilities"
                                        className="group mt-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
                                    >
                                        General Responsibilities
                                        <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-[#C8102E]" />
                                    </Link>

                                    <Link
                                        href="#independence-objectivity-integrity"
                                        className="group mt-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
                                    >
                                        Independence &amp; Integrity
                                        <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-[#C8102E]" />
                                    </Link>
                                </nav>
                            </div>

                            <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
                                <ShieldCheck
                                    className="h-8 w-8 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Professional Conduct
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Ethical relationships with clients
                                    strengthen trust, integrity and
                                    professional confidence within the
                                    hospitality industry.
                                </p>

                                <Link
                                    href="/members-section/code-of-conduct-ethics"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    View Full Code
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

function StandardItem({
    number,
    title,
    description,
}: {
    number: number;
    title: string;
    description: string;
}) {
    return (
        <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E]">
                    {String(number).padStart(2, "0")}
                </div>

                <div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                        <h4 className="text-lg font-extrabold leading-tight text-slate-950">
                            {title}
                        </h4>
                    </div>

                    <p className="mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                        {description}
                    </p>
                </div>
            </div>
        </article>
    );
}

function RelationshipsWithClientsJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/code-of-conduct-ethics/relationships-with-clients#article",
        url:
            "https://ahpk.or.ke/members-section/code-of-conduct-ethics/relationships-with-clients",
        headline: "Relationships with Clients",
        description:
            "Professional standards governing client relationships, confidentiality, independence, objectivity and integrity for AHPK members.",
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
                href="/members-section/code-of-conduct-ethics"
                className="transition hover:text-[#C8102E]"
            >
                Code of Conduct &amp; Ethics
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Relationships with Clients
            </span>
        </nav>
    );
}
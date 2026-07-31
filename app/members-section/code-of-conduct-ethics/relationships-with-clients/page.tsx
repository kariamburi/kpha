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

            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 max-w-5xl">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            Code of Conduct &amp; Ethics
                        </p>

                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                            Relationships
                            <span className="block text-[#C8102E]">
                                with Clients
                            </span>
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            Professional standards that guide
                            AHPK members in maintaining ethical,
                            independent, confidential and
                            responsible relationships with clients.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-300 pt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                            <span>Confidentiality</span>
                            <span>Independence</span>
                            <span>Objectivity</span>
                            <span>Integrity</span>
                            <span>Trust</span>
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
                                src="/business_handshake.webp"
                                alt="AHPK professionals demonstrating ethical client relationships"
                                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
                            />
                        </div>

                        <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            Strong client relationships are built
                            on confidentiality, honest advice,
                            independent judgement and professional
                            integrity.
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
                                id="client-relationships"
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
                                            Client Responsibility
                                        </p>

                                        <h2 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                            Relationships with Clients
                                        </h2>
                                    </div>
                                </div>

                                <blockquote className="mt-5 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4 text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                    A member of AHPK must not accept
                                    any assignment or engage in any
                                    practice involving a violation
                                    of the law, this Code or the
                                    member&apos;s specific ethical
                                    responsibilities. A member must
                                    immediately withdraw if such a
                                    violation is identified.
                                </blockquote>
                            </section>

                            {/* GENERAL RESPONSIBILITIES */}
                            <section
                                id="general-responsibilities"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Section A
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    General Responsibilities
                                </h2>

                                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                    Members should understand the
                                    client&apos;s needs, preserve
                                    confidentiality, offer honest
                                    advice and avoid unrealistic
                                    promises.
                                </p>

                                <div className="mt-5 border-t border-slate-300">
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

                            {/* INDEPENDENCE */}
                            <section
                                id="independence-objectivity-integrity"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Section B
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    Independence, Objectivity and Integrity
                                </h2>

                                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                    Members must preserve impartial
                                    judgement, disclose conflicts,
                                    operate with proper authority
                                    and protect professional
                                    credibility.
                                </p>

                                <div className="mt-5 border-t border-slate-300">
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

                            {/* CORE CLIENT PRINCIPLES */}
                            <section className="border-t border-slate-300 py-8">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Core Client Principles
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    Foundations of professional trust
                                </h2>

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2">
                                    <PrincipleItem
                                        number="01"
                                        title="Confidentiality"
                                        description="Client and employer information must remain private unless the client has authorised its release."
                                    />

                                    <PrincipleItem
                                        number="02"
                                        title="Objectivity"
                                        description="Professional advice should be based on facts, responsible opinion and impartial judgement."
                                    />

                                    <PrincipleItem
                                        number="03"
                                        title="Disclosure"
                                        description="Conflicts, limitations and material concerns should be communicated clearly and in writing."
                                    />

                                    <PrincipleItem
                                        number="04"
                                        title="Authority"
                                        description="Members should only act, contract or make payments where proper authority has been granted."
                                    />
                                </div>
                            </section>

                            {/* CONTINUE READING */}
                            <section className="border-t border-slate-300 pt-5">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Continue Reading
                                </p>

                                <div className="mt-3 grid border-y border-slate-300 sm:grid-cols-2">
                                    <RelatedPageLink
                                        href="/members-section/code-of-conduct-ethics/professional-attitude-behavior"
                                        eyebrow="Previous Section"
                                        title="Professional Attitude & Behavior"
                                        direction="left"
                                    />

                                    <RelatedPageLink
                                        href="/members-section/code-of-conduct-ethics"
                                        eyebrow="Code Index"
                                        title="Code of Conduct & Ethics"
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
                                        Client Standards
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Client standards page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <SidebarLink
                                        href="#client-relationships"
                                        label="Introduction"
                                        active
                                    />

                                    <SidebarLink
                                        href="#general-responsibilities"
                                        label="General Responsibilities"
                                    />

                                    <SidebarLink
                                        href="#independence-objectivity-integrity"
                                        label="Independence & Integrity"
                                    />
                                </nav>
                            </section>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <Scale
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Independent Judgement
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    Professional advice should
                                    remain impartial, evidence-based
                                    and free from undisclosed
                                    conflicts of interest.
                                </p>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <ShieldCheck
                                    className="h-6 w-6 text-red-300"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black">
                                    Professional Conduct
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Ethical relationships with
                                    clients strengthen trust,
                                    integrity and professional
                                    confidence within hospitality.
                                </p>

                                <Link
                                    href="/members-section/code-of-conduct-ethics"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-red-300 transition hover:text-white"
                                >
                                    View Full Code

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
        <article className="group grid gap-4 border-b border-slate-300 py-6 sm:grid-cols-[64px_42px_minmax(0,1fr)] sm:items-start">
            <p className="text-4xl font-black leading-none text-slate-300 transition duration-200 group-hover:text-[#C8102E]">
                {String(number).padStart(2, "0")}
            </p>

            <div className="flex h-9 w-9 items-center justify-center bg-slate-950 text-white transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#C8102E]">
                <CheckCircle2 className="h-4 w-4" />
            </div>

            <div>
                <h3 className="text-xl font-black leading-tight text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>

                <p className="mt-2 text-[16px] font-medium leading-8 text-slate-700">
                    {description}
                </p>
            </div>
        </article>
    );
}

function PrincipleItem({
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
                <ArrowRight className="h-5 w-5 shrink-0 rotate-180 text-[#C8102E] transition group-hover:-translate-x-1" />
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
                <ChevronRight className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
            ) : null}
        </Link>
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
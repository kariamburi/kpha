// app/members-section/code-of-conduct-ethics/
// code-of-ethics-conducts-pledge/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    CheckCircle2,
    ChevronRight,
    CircleHelp,
    Home,
    Scale,
    ShieldCheck,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath =
    "/members-section/code-of-conduct-ethics/code-of-ethics-conducts-pledge";

export const metadata: Metadata = {
    title: "Code of Ethics & Conducts Pledge",
    description:
        "Read the AHPK Code of Ethics and Conducts Pledge, including the seven tests for ethical decision-making.",
    keywords: [
        "AHPK ethics pledge",
        "AHPK code of conduct",
        "hospitality ethics Kenya",
        "seven tests for ethics",
        "Association of Hotel Professionals Kenya",
    ],
    alternates: {
        canonical: pagePath,
    },
    openGraph: {
        title:
            "Code of Ethics & Conducts Pledge | Association of Hotel Professionals Kenya",
        description:
            "The AHPK pledge on honesty, integrity, fairness, quality service and ethical decision-making.",
        url: pagePath,
        siteName: "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "article",
        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt: "AHPK ethics and professional conduct",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Code of Ethics & Conducts Pledge | AHPK",
        description:
            "AHPK’s professional ethics pledge and seven tests for ethical decisions.",
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

const pledgeStatements = [
    "We acknowledge ethics and morality as inseparable elements of doing business, and we will test every decision against the highest standards of honesty, integrity, legality, fairness and conscience.",
    "We shall conduct ourselves at all times, personally and collectively, so as to bring credit to the hotel and hospitality industry at large.",
    "We shall focus our time, energy and resources on uplifting the status and image of the industry.",
    "We shall treat all clients equally regardless of race, religion, nationality, creed, gender, social standing or political persuasion.",
    "We shall deliver quality and consistent service to each and every client.",
    "We shall, in words and deeds, develop and maintain the highest level of integrity, probity, trust, honesty and understanding among our clients and the public at large.",
    "We shall endeavour to operate within industry best practices and the laws in place.",
];

const ethicsTests = [
    "Is it legal?",
    "Does it hurt anyone?",
    "Is it fair?",
    "Am I being honest?",
    "Can I live with myself?",
    "Would I publicize my decision?",
    "What if everyone did it?",
];


export default function CodeOfEthicsConductsPledgePage() {
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
                        name:
                            "Code of Ethics & Conducts Pledge",
                        url: pagePath,
                    },
                ]}
            />

            <EthicsPledgeJsonLd />

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
                            Code of Ethics
                            <span className="block text-[#C8102E]">
                                &amp; Conducts Pledge
                            </span>
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            A professional pledge founded on
                            honesty, integrity, fairness, quality
                            service and responsible ethical
                            decision-making.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-300 pt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                            <span>Honesty</span>
                            <span>Integrity</span>
                            <span>Fairness</span>
                            <span>Quality</span>
                            <span>Conscience</span>
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
                                src="/law_office_scene.webp"
                                alt="AHPK professionals representing ethical leadership and conduct"
                                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
                            />
                        </div>

                        <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            Ethical conduct strengthens
                            professional trust, protects clients
                            and advances the standing of the
                            hospitality industry.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* PLEDGE */}
                            <section
                                id="ethics-pledge"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <ShieldCheck
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                            Member Commitment
                                        </p>

                                        <h2 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                            Code of Ethics &amp;
                                            Conducts Pledge
                                        </h2>
                                    </div>
                                </div>

                                <blockquote className="mt-5 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4 text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                    We acknowledge ethics and
                                    morality as inseparable
                                    elements of doing business and
                                    commit to testing every
                                    decision against the highest
                                    standards of honesty,
                                    integrity, legality, fairness
                                    and conscience.
                                </blockquote>

                                <div className="mt-6 border-t border-slate-300">
                                    {pledgeStatements.map(
                                        (statement, index) => (
                                            <article
                                                key={statement}
                                                id={`pledge-${index + 1}`}
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
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </div>

                                                <p className="text-[16px] font-medium leading-8 text-slate-700 sm:text-[17px]">
                                                    {statement}
                                                </p>
                                            </article>
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* SEVEN TESTS */}
                            <section
                                id="seven-tests"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <CircleHelp className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                            Ethical Decision-Making
                                        </p>

                                        <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                            Seven Tests for Ethics
                                        </h2>

                                        <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                            Members should apply
                                            these questions when
                                            evaluating decisions,
                                            conduct and professional
                                            responsibilities.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2">
                                    {ethicsTests.map(
                                        (test, index) => (
                                            <EthicsTest
                                                key={test}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                question={test}
                                            />
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* ETHICAL FRAMEWORK */}
                            <section className="border-t border-slate-300 py-8">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Ethical Framework
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    Principles behind every decision
                                </h2>

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2">
                                    <PrincipleItem
                                        number="01"
                                        title="Legality"
                                        description="Every professional decision should comply with applicable laws, regulations and recognised industry standards."
                                    />

                                    <PrincipleItem
                                        number="02"
                                        title="Fairness"
                                        description="Members should consider whether their decisions treat clients, colleagues and the public fairly."
                                    />

                                    <PrincipleItem
                                        number="03"
                                        title="Honesty"
                                        description="Professional actions and communication should be truthful, transparent and free from misleading conduct."
                                    />

                                    <PrincipleItem
                                        number="04"
                                        title="Accountability"
                                        description="Members should be prepared to explain, defend and accept responsibility for their professional decisions."
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
                                        href="/members-section/code-of-conduct-ethics/handling-alleged-violations"
                                        eyebrow="Previous Section"
                                        title="Handling Alleged Violations"
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
                                        Ethics Pledge
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Ethics pledge page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <SidebarLink
                                        href="#ethics-pledge"
                                        label="Member Pledge"
                                        active
                                    />

                                    <SidebarLink
                                        href="#seven-tests"
                                        label="Seven Tests for Ethics"
                                    />
                                </nav>
                            </section>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <Scale
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Ethical Leadership
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    Ethical conduct strengthens
                                    public trust, protects clients
                                    and advances the reputation of
                                    the hospitality profession.
                                </p>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <ShieldCheck className="h-6 w-6 text-red-300" />

                                <h2 className="mt-2 text-xl font-black">
                                    Professional Responsibility
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Every member should test
                                    professional decisions against
                                    legality, fairness, honesty
                                    and personal conscience.
                                </p>

                                <Link
                                    href="/members-section/code-of-conduct-ethics"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-red-300 transition hover:text-white"
                                >
                                    View Full Code

                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

function EthicsTest({
    number,
    question,
}: {
    number: string;
    question: string;
}) {
    return (
        <article className="group flex min-h-24 items-center gap-4 border-b border-slate-300 py-5 transition duration-200 hover:bg-red-50/50 sm:border-r sm:px-5 sm:nth-[2n]:border-r-0">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <p className="text-lg font-black leading-7 text-slate-900 transition group-hover:text-[#C8102E]">
                {question}
            </p>
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
                <ChevronRight className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
            ) : null}
        </Link>
    );
}

function EthicsPledgeJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/code-of-conduct-ethics/code-of-ethics-conducts-pledge#article",
        url:
            "https://ahpk.or.ke/members-section/code-of-conduct-ethics/code-of-ethics-conducts-pledge",
        headline: "Code of Ethics & Conducts Pledge",
        description:
            "The AHPK professional ethics pledge and seven tests for ethical decision-making.",
        inLanguage: "en-KE",
        isPartOf: {
            "@type": "WebSite",
            "@id": "https://ahpk.or.ke/#website",
            name: "Association of Hotel Professionals Kenya",
            url: "https://ahpk.or.ke",
        },
        publisher: {
            "@type": "Organization",
            "@id": "https://ahpk.or.ke/#organization",
            name: "Association of Hotel Professionals Kenya",
            alternateName: "AHPK",
            url: "https://ahpk.or.ke",
        },
        mainEntity: {
            "@type": "ItemList",
            name: "Seven Tests for Ethics",
            numberOfItems: ethicsTests.length,
            itemListElement: ethicsTests.map((test, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: test,
            })),
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
            style={{ "--header-height": "88px" } as React.CSSProperties}
        >
            <div className="mx-auto flex h-[82px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link href="/" aria-label="AHPK homepage" className="shrink-0">
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

            <span className="text-[#C8102E]" aria-current="page">
                Code of Ethics &amp; Conducts Pledge
            </span>
        </nav>
    );
}
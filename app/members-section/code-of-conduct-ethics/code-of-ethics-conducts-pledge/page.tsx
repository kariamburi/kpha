// app/members-section/code-of-conduct-ethics/
// code-of-ethics-conducts-pledge/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
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

                        <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
                            Code of Ethics{" "}
                            <span className="text-[#C8102E]">
                                &amp; Conducts Pledge
                            </span>
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            A professional pledge founded on
                            honesty, integrity, fairness, quality
                            service and responsible ethical
                            decision-making.
                        </p>


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
            <section className="bg-white py-5 sm:py-7">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* PLEDGE */}
                            <section
                                id="ethics-pledge"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-5 pt-3"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <ShieldCheck
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>

                                        <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                                            Code of Ethics &amp;
                                            Conducts Pledge
                                        </h2>
                                    </div>
                                </div>

                                <blockquote className="mt-4 border-l-4 border-[#C8102E] bg-slate-50 px-4 py-3 text-sm font-bold leading-7 text-slate-800 sm:text-base">
                                    We acknowledge ethics and
                                    morality as inseparable
                                    elements of doing business and
                                    commit to testing every
                                    decision against the highest
                                    standards of honesty,
                                    integrity, legality, fairness
                                    and conscience.
                                </blockquote>

                                <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[#C8102E]">
                                    {pledgeStatements.map((statement, index) => (
                                        <li
                                            key={statement}
                                            id={`pledge-${index + 1}`}
                                            className="scroll-mt-28 pl-1 text-sm leading-7 text-slate-700 sm:text-base"
                                        >
                                            {statement}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* SEVEN TESTS */}
                            <section
                                id="seven-tests"
                                className="scroll-mt-28 border-t border-slate-300 py-5 sm:py-6"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <CircleHelp className="h-5 w-5" />
                                    </div>

                                    <div>

                                        <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
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

                                <ul className="mt-4 list-disc space-y-1.5 pl-5 marker:text-[#C8102E]">
                                    {ethicsTests.map((test) => (
                                        <li key={test} className="pl-1 text-sm font-semibold leading-7 text-slate-700 sm:text-base">
                                            {test}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* ETHICAL FRAMEWORK */}
                            <section className="border-t border-slate-300 py-5 sm:py-6">

                                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    Principles behind every decision
                                </h2>

                                <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[#C8102E]">
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
                                </ul>
                            </section>


                        </article>

                        {/* EDITORIAL SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <section className="border-t-4 border-[#C8102E]">
                                <div className="border-b border-slate-300 py-3">

                                    <h2 className="text-xl font-black text-slate-950">
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


function PrincipleItem({
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <li className="group pl-1 text-sm leading-7 text-slate-700 sm:text-base">
            <span className="font-black text-slate-950 transition-colors group-hover:text-[#C8102E]">
                {title}:
            </span>{" "}
            {description}
        </li>
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
            className="group flex min-h-16 items-center gap-3 border-b border-slate-300 py-2.5 transition hover:bg-red-50/60 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
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

                <h3 className="text-base font-black text-slate-950 transition group-hover:text-[#C8102E]">
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
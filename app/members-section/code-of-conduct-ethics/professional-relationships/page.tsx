// app/members-section/code-of-conduct-ethics/
// professional-relationships/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    ChevronRight,
    Handshake,
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
    "/members-section/code-of-conduct-ethics/professional-relationships";

export const metadata: Metadata = {
    title: "Professional Relationships",
    description:
        "Read the AHPK standards governing professional relationships, referrals, knowledge sharing, objectivity and integrity.",
    keywords: [
        "AHPK professional relationships",
        "AHPK code of conduct",
        "hospitality consultant ethics Kenya",
        "professional referrals hospitality",
        "Association of Hotel Professionals Kenya",
    ],
    alternates: {
        canonical: pagePath,
    },
    openGraph: {
        title:
            "Professional Relationships | Association of Hotel Professionals Kenya",
        description:
            "Professional standards guiding AHPK members when working with hospitality consultants and professionals from other disciplines.",
        url: pagePath,
        siteName: "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "article",
        images: [
            {
                url: "/professional-relationships.webp",
                width: 1536,
                height: 1024,
                alt: "Hospitality professionals working together",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Professional Relationships | AHPK",
        description:
            "Professional standards governing collaboration, referrals, objectivity and integrity.",
        images: ["/professional-relationships.webp"],
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

const standards = [
    {
        title: "Share Knowledge Responsibly",
        description:
            "Members recognize their responsibility to the profession to share with their colleagues the general body of knowledge and nonproprietary approaches they use in serving clients.",
        icon: Users,
    },
    {
        title: "Represent Referrals Honestly",
        description:
            "Members referring another consultant to a client will not misrepresent the qualifications of the other consultant nor make any commitments for that consultant. Members receiving a referral from another will ensure that no misrepresentations or commitments have been made.",
        icon: Handshake,
    },
    {
        title: "Exercise Objectivity and Integrity",
        description:
            "When engaged by a client to review the work of another consultant who is a member of this Association, members will exercise objectivity and integrity in all technical and advisory conclusions communicated to a client.",
        icon: ShieldCheck,
    },
];


export default function ProfessionalRelationshipsPage() {
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
                        name: "Professional Relationships",
                        url: pagePath,
                    },
                ]}
            />

            <ProfessionalRelationshipsJsonLd />

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
                            Professional
                            <span className="text-[#C8102E]">
                                {"\u00A0"}Relationships
                            </span>
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            Standards that guide collaboration,
                            referrals, knowledge sharing,
                            objectivity and professional integrity
                            among AHPK members and other
                            consultants.
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
                                src="/business_handshake.webp"
                                alt="Hospitality professionals working together"
                                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
                            />
                        </div>

                        <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            Strong professional relationships
                            promote collaboration, informed
                            referrals and objective service to
                            clients.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-5 sm:py-7">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* INTRODUCTION */}
                            <section
                                id="professional-relationships"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-5 pt-3"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <Handshake
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>

                                        <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                                            Professional Relationships
                                        </h2>
                                    </div>
                                </div>

                                <blockquote
                                    id="introduction"
                                    className="mt-3 scroll-mt-28 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4 text-base font-bold leading-8 text-slate-800 sm:text-lg"
                                >
                                    Members of AHPK recognize that,
                                    from time to time, they will work
                                    with other professional
                                    hospitality consultants as well
                                    as professionals from other
                                    disciplines. Appropriate
                                    standards of conduct are
                                    therefore necessary to maximize
                                    benefits to clients and maintain
                                    professional relationships
                                    within the profession.
                                </blockquote>
                            </section>

                            {/* STANDARDS */}
                            <section className="border-t border-slate-300 py-5 sm:py-6">

                                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    Working responsibly with other professionals
                                </h2>

                                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                    These standards govern
                                    knowledge sharing, referrals and
                                    professional review when members
                                    collaborate with colleagues or
                                    specialists from other
                                    disciplines.
                                </p>

                                <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-[#C8102E]">
                                    {standards.map((standard, index) => (
                                        <li
                                            key={standard.title}
                                            id={`standard-${index + 1}`}
                                            className="scroll-mt-28 pl-1 text-sm leading-7 text-slate-700 sm:text-base"
                                        >
                                            <strong className="font-black text-slate-950">
                                                {standard.title}:
                                            </strong>{" "}
                                            {standard.description}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* CORE PRINCIPLES */}
                            <section className="border-t border-slate-300 py-5 sm:py-6">

                                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    Foundations of professional collaboration
                                </h2>

                                <div className="mt-3 list-disc space-y-1.5 pl-5 marker:text-[#C8102E]">
                                    <PrincipleItem
                                        number="01"
                                        title="Knowledge Sharing"
                                        description="Members should contribute non-proprietary knowledge and responsible approaches that strengthen the profession."
                                    />

                                    <PrincipleItem
                                        number="02"
                                        title="Honest Referrals"
                                        description="Qualifications, capabilities and commitments must be represented accurately when referring another consultant."
                                    />

                                    <PrincipleItem
                                        number="03"
                                        title="Objectivity"
                                        description="Professional reviews should be based on facts, technical judgement and impartial consideration."
                                    />

                                    <PrincipleItem
                                        number="04"
                                        title="Integrity"
                                        description="Conclusions communicated to clients should remain fair, honest and professionally responsible."
                                    />
                                </div>
                            </section>


                        </article>

                        {/* EDITORIAL SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <section className="border-t-4 border-[#C8102E]">
                                <div className="border-b border-slate-300 py-3">

                                    <h2 className="text-xl font-black text-slate-950">
                                        Professional Relationships
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Professional relationships page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <SidebarLink
                                        href="#introduction"
                                        label="Introduction"
                                        active
                                    />

                                    {standards.map(
                                        (standard, index) => (
                                            <SidebarLink
                                                key={standard.title}
                                                href={`#standard-${index + 1}`}
                                                label={`${index + 1}. ${standard.title}`}
                                            />
                                        ),
                                    )}
                                </nav>
                            </section>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <Users
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Shared Professional Knowledge
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    Responsible knowledge sharing
                                    strengthens professional
                                    competence and improves the
                                    quality of service provided to
                                    clients.
                                </p>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <Handshake
                                    className="h-6 w-6 text-red-300"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black">
                                    Professional Conduct
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Strong professional
                                    relationships promote trust,
                                    collaboration and excellence
                                    throughout hospitality.
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

function PrincipleItem({
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <li className="pl-1 text-sm leading-7 text-slate-700 sm:text-base">
            <strong className="font-black text-slate-950">{title}:</strong>{" "}
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

                <h3 className="mt-1 text-base font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>
            </div>

            {direction === "right" ? (
                <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
            ) : null}
        </Link>
    );
}

function ProfessionalRelationshipsJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/code-of-conduct-ethics/professional-relationships#article",
        url:
            "https://ahpk.or.ke/members-section/code-of-conduct-ethics/professional-relationships",
        headline: "Professional Relationships",
        description:
            "AHPK standards governing professional collaboration, referrals, knowledge sharing, objectivity and integrity.",
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
            name: "AHPK Professional Relationship Standards",
            numberOfItems: standards.length,
            itemListElement: standards.map((standard, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "DefinedTerm",
                    name: standard.title,
                    description: standard.description,
                },
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
                Professional Relationships
            </span>
        </nav>
    );
}
// app/about/corporate-statements/page.tsx

import type {
    CSSProperties,
    ElementType,
    ReactNode,
} from "react";
import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Award,
    BriefcaseBusiness,
    ChevronRight,
    Eye,
    Flag,
    Handshake,
    HeartHandshake,
    Home,
    Medal,
    Scale,
    ShieldCheck,
    Sparkles,
    Target,
    Users,
    type LucideIcon,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

export const metadata: Metadata = {
    title: "Corporate Statements",

    description:
        "Read the vision, mission, core values, goals and objectives of the Association of Hotel Professionals Kenya.",

    keywords: [
        "AHPK corporate statements",
        "Association of Hotel Professionals Kenya vision",
        "AHPK mission statement",
        "AHPK core values",
        "AHPK goals and objectives",
        "hospitality professional standards Kenya",
        "hotel professionals Kenya",
        "hospitality association Kenya",
    ],

    alternates: {
        canonical: "/about/corporate-statements",
    },

    openGraph: {
        title:
            "Corporate Statements | Association of Hotel Professionals Kenya",

        description:
            "Explore AHPK’s vision, mission, core values, goals and objectives for Kenya’s hospitality profession.",

        url: "/about/corporate-statements",

        siteName:
            "Association of Hotel Professionals Kenya",

        locale: "en_KE",
        type: "website",

        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt:
                    "Professional AHPK boardroom representing leadership and corporate governance",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title: "Corporate Statements | AHPK",

        description:
            "Read the vision, mission, values, goals and objectives of the Association of Hotel Professionals Kenya.",

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

type CoreValue = {
    letter: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

const coreValues: CoreValue[] = [
    {
        letter: "A",
        title: "Leadership and Excellence",
        description:
            "To not only excel in the industry, but also promote forthright and responsible leadership.",
        icon: Medal,
    },
    {
        letter: "B",
        title: "Professionalism",
        description:
            "To identify, nurture and promote high-calibre professional and ethical standards for managers, consultants, researchers and trainers in the hotel industry.",
        icon: Award,
    },
    {
        letter: "C",
        title: "Service and Quality",
        description:
            "To provide members and stakeholders with first-class service in accordance with the Association’s service charter.",
        icon: Sparkles,
    },
    {
        letter: "D",
        title: "Teamwork and Loyalty",
        description:
            "To share and demonstrate a participatory, ethics-based approach towards fulfilling the vision through positive lobbying and advocacy.",
        icon: Users,
    },
    {
        letter: "E",
        title: "Integrity, Adroitness and Honesty",
        description:
            "To remain an honest, accountable and transparent association in all its endeavours, guided by established codes of conduct and good work practices.",
        icon: ShieldCheck,
    },
    {
        letter: "F",
        title: "Respect and Dignity",
        description:
            "To recognise and appreciate one another in service delivery and promote members’ welfare in line with government policies and Ministry of Tourism guidelines.",
        icon: HeartHandshake,
    },
];

const goalsAndObjectives = [
    "To give a voice to managers in the profession on matters aimed at enhancing professional empowerment, equal access to gainful employment, public consultancy contracts and capital from government institutions mandated to fund hospitality and tourism investment projects and activities.",

    "To act as a lobby group in the articulation of industry matters in collaboration and partnership with government and relevant industry agencies, enabling professionals to attain and occupy their rightful positions in management and decision-making forums concerning the industry.",

    "To participate in regulating the performance of the industry in order to harmonise and create a level playing field in hiring, training curricula, service delivery, standard operating procedures and best practice.",

    "To nurture and harness expertise and knowledge from skilled veterans and share it with the industry through professional manuals, books, periodicals, journals, magazines and biographies.",

    "To pool technical resources from the membership and provide consultancy services to hotel and hospitality establishments and other stakeholders in Kenya and around the world.",

    "To equip hotel professionals with skills through seminars, symposiums and workshops, including career talks delivered by veterans and professional speakers.",

    "To provide a platform for research on issues affecting hotel operations and development, including emerging industry trends, and to develop practical ways of responding to new trends and challenges.",

    "To develop linkages between training institutions and local, regional and international hotel establishments, professionals and other stakeholders for academic and industrial development, while facilitating access to fair internship opportunities for upcoming undergraduates.",

    "To affiliate and connect members with similar associations for the exchange of experience, knowledge and research findings that can assist in addressing current and emerging challenges.",

    "To promote and enhance corporate social responsibility within the hotel industry through involvement in socio-economic activities, environmental programmes and conservation initiatives, working with relevant organisations such as the Hospitality and Tourism Sports Organization and others.",

    "To operate as a non-profit-making, non-political and non-sectarian organisation.",
];

const pageSections = [
    {
        href: "#vision-mission",
        label: "Vision and Mission",
    },
    {
        href: "#core-values",
        label: "Core Values",
    },
    {
        href: "#goals-objectives",
        label: "Goals and Objectives",
    },
    {
        href: "#institutional-character",
        label: "Institutional Character",
    },
];

export default function CorporateStatementsPage() {
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
                        name: "Corporate Statements",
                        url: "/about/corporate-statements",
                    },
                ]}
            />

            <CorporateStatementsJsonLd />

            <PageHeader />

            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 max-w-5xl">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            About AHPK
                        </p>

                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                            Corporate Statements
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            The vision, mission, core values and
                            strategic objectives guiding the
                            Association of Hotel Professionals
                            Kenya.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                href="#vision-mission"
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-[#A80D27]"
                            >
                                Read Our Vision
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/about/who-we-are"
                                className="inline-flex min-h-11 items-center justify-center border border-slate-300 px-6 text-sm font-black text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                            >
                                Who We Are
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
                                src="/executive-committee.webp"
                                alt="AHPK corporate leadership boardroom"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            AHPK is guided by professionalism,
                            leadership, integrity, quality and
                            service excellence.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* ARTICLE BODY */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* OVERVIEW */}
                            <section className="border-t-4 border-[#C8102E] pb-8 pt-4">
                                <SectionLabel>
                                    Strategic Direction
                                </SectionLabel>

                                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                    The principles that guide our
                                    professional community
                                </h2>

                                <div className="mt-4 space-y-4 text-[17px] leading-8 text-slate-700 sm:text-lg sm:leading-9">
                                    <p>
                                        AHPK&apos;s corporate
                                        statements define the
                                        Association&apos;s long-term
                                        ambition, its professional
                                        purpose and the standards that
                                        shape its leadership and
                                        service.
                                    </p>

                                    <p>
                                        They provide a common direction
                                        for members, leadership,
                                        institutions, industry partners
                                        and other stakeholders working
                                        to strengthen Kenya&apos;s
                                        hospitality profession.
                                    </p>
                                </div>

                                <blockquote className="mt-5 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4">
                                    <p className="text-xl font-black leading-8 text-slate-950 sm:text-2xl">
                                        Professional excellence,
                                        responsible leadership and
                                        service to the hospitality
                                        industry.
                                    </p>
                                </blockquote>
                            </section>

                            {/* VISION AND MISSION */}
                            <section
                                id="vision-mission"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <Eye
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <SectionLabel>
                                            Our Direction
                                        </SectionLabel>

                                        <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                            Vision and Mission
                                        </h2>
                                    </div>
                                </div>

                                <p className="mt-4 text-[17px] leading-8 text-slate-700">
                                    These statements define what AHPK
                                    seeks to become and how the
                                    Association serves the hospitality
                                    profession.
                                </p>

                                <div className="mt-5 border-y border-slate-300">
                                    <StatementArticle
                                        icon={Eye}
                                        number="01"
                                        label="Vision Statement"
                                        title="A centre of modern hotel professional excellence"
                                    >
                                        To be a forum and centre of
                                        modern hotel professional
                                        excellence for the sustenance of
                                        efficient and cohesive
                                        world-class hospitality
                                        standards positioned for the
                                        21st century and beyond.
                                    </StatementArticle>

                                    <StatementArticle
                                        icon={Target}
                                        number="02"
                                        label="Mission Statement"
                                        title="Harnessing professional knowledge for future generations"
                                    >
                                        To promote, nurture and harness
                                        the immense expertise and
                                        knowledge available among
                                        professionals practising in the
                                        industry and pass it on to future
                                        generations in pursuit of their
                                        careers and in the spirit of
                                        corporate social responsibility.
                                    </StatementArticle>
                                </div>
                            </section>

                            {/* CORE VALUES */}
                            <section
                                id="core-values"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#C8102E] text-white">
                                        <ShieldCheck
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <SectionLabel>
                                            Core Values
                                        </SectionLabel>

                                        <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                            Principles guiding our
                                            professional community
                                        </h2>
                                    </div>
                                </div>

                                <p className="mt-4 text-[17px] leading-8 text-slate-700">
                                    AHPK&apos;s work, leadership and
                                    service to members are grounded in
                                    these professional values.
                                </p>

                                <div className="mt-5 border-y border-slate-300">
                                    {coreValues.map((value) => (
                                        <CoreValueArticle
                                            key={value.letter}
                                            value={value}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* GOALS AND OBJECTIVES */}
                            <section
                                id="goals-objectives"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <Flag
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <SectionLabel>
                                            Strategic Mandate
                                        </SectionLabel>

                                        <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                            Goals and Objectives
                                        </h2>
                                    </div>
                                </div>

                                <p className="mt-4 text-[17px] leading-8 text-slate-700">
                                    AHPK works to empower hospitality
                                    professionals, improve industry
                                    standards, encourage research and
                                    strengthen professional
                                    representation.
                                </p>

                                <div className="mt-5 border-y border-slate-300">
                                    {goalsAndObjectives.map(
                                        (objective, index) => (
                                            <ObjectiveArticle
                                                key={objective}
                                                number={index + 1}
                                                text={objective}
                                            />
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* INSTITUTIONAL CHARACTER */}
                            <section
                                id="institutional-character"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#C8102E] text-white">
                                        <Scale
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div>
                                        <SectionLabel>
                                            Institutional Character
                                        </SectionLabel>

                                        <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                            A professional, responsible
                                            and inclusive association
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-5 grid border-y border-slate-300 md:grid-cols-3">
                                    <InstitutionalPrinciple
                                        icon={Scale}
                                        title="Non-political"
                                        description="The Association operates independently of political affiliation and partisan interests."
                                    />

                                    <InstitutionalPrinciple
                                        icon={Handshake}
                                        title="Non-sectarian"
                                        description="AHPK welcomes professional participation without discrimination based on religious or sectional interests."
                                    />

                                    <InstitutionalPrinciple
                                        icon={BriefcaseBusiness}
                                        title="Non-profit"
                                        description="The Association exists to advance professional and industry objectives rather than private commercial gain."
                                    />
                                </div>
                            </section>

                            {/* CONTINUE READING */}
                            <section className="border-t border-slate-300 pt-8">
                                <SectionLabel>
                                    Continue Reading
                                </SectionLabel>

                                <div className="mt-3 grid border-y border-slate-300 sm:grid-cols-2">
                                    <RelatedPageLink
                                        href="/about/who-we-are"
                                        eyebrow="About the Association"
                                        title="Who We Are"
                                    />

                                    <RelatedPageLink
                                        href="/about/executive-summary"
                                        eyebrow="Our Background"
                                        title="Executive Summary"
                                    />

                                    <RelatedPageLink
                                        href="/about/executive-committee"
                                        eyebrow="Our Leadership"
                                        title="Executive Committee"
                                    />

                                    <RelatedPageLink
                                        href="/members-section/constitution-rules/membership"
                                        eyebrow="Become a Member"
                                        title="Membership"
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
                                        Corporate Statements
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Corporate statements navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    {pageSections.map((section) => (
                                        <ArticleSideLink
                                            key={section.href}
                                            href={section.href}
                                            label={section.label}
                                        />
                                    ))}
                                </nav>
                            </div>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <Flag
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    AHPK at a glance
                                </h2>

                                <div className="mt-3 divide-y divide-slate-300 border-y border-slate-300">
                                    <AtGlanceFact
                                        label="Vision"
                                        value="1"
                                    />

                                    <AtGlanceFact
                                        label="Mission"
                                        value="1"
                                    />

                                    <AtGlanceFact
                                        label="Core Values"
                                        value={String(coreValues.length)}
                                    />

                                    <AtGlanceFact
                                        label="Strategic Objectives"
                                        value={String(
                                            goalsAndObjectives.length,
                                        )}
                                    />
                                </div>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                    Professional Membership
                                </p>

                                <h2 className="mt-2 text-xl font-black">
                                    Join a values-led professional
                                    community
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Become part of a hospitality
                                    association committed to
                                    professional standards, ethical
                                    leadership and continuous
                                    development.
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

function StatementArticle({
    icon: Icon,
    number,
    label,
    title,
    children,
}: {
    icon: LucideIcon;
    number: string;
    label: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <article className="grid gap-3 border-b border-slate-300 py-5 last:border-b-0 sm:grid-cols-[54px_48px_minmax(0,1fr)]">
            <p className="text-3xl font-black leading-none text-slate-300">
                {number}
            </p>

            <div className="flex h-11 w-11 items-center justify-center bg-slate-950 text-white">
                <Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                />
            </div>

            <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                    {label}
                </p>

                <h3 className="mt-2 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                    {title}
                </h3>

                <p className="mt-3 text-[17px] leading-8 text-slate-700 sm:text-lg sm:leading-9">
                    {children}
                </p>
            </div>
        </article>
    );
}

function CoreValueArticle({
    value,
}: {
    value: CoreValue;
}) {
    const Icon = value.icon;

    return (
        <article className="grid gap-3 border-b border-slate-300 py-5 last:border-b-0 sm:grid-cols-[54px_48px_minmax(0,1fr)]">
            <p className="text-3xl font-black leading-none text-slate-300">
                {value.letter}
            </p>

            <div className="flex h-11 w-11 items-center justify-center bg-[#C8102E] text-white">
                <Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                />
            </div>

            <div>
                <h3 className="text-xl font-black text-slate-950 sm:text-2xl">
                    {value.title}
                </h3>

                <p className="mt-2 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                    {value.description}
                </p>
            </div>
        </article>
    );
}

function ObjectiveArticle({
    number,
    text,
}: {
    number: number;
    text: string;
}) {
    return (
        <article className="grid gap-3 border-b border-slate-300 py-5 last:border-b-0 sm:grid-cols-[58px_minmax(0,1fr)]">
            <p className="text-3xl font-black leading-none text-slate-300">
                {String(number).padStart(2, "0")}
            </p>

            <p className="text-[16px] font-medium leading-7 text-slate-700 sm:text-[17px] sm:leading-8">
                {text}
            </p>
        </article>
    );
}

function AtGlanceFact({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-2.5">
            <p className="text-sm font-bold text-slate-600">
                {label}
            </p>

            <p className="text-xl font-black text-slate-950">
                {value}
            </p>
        </div>
    );
}

function InstitutionalPrinciple({
    icon: Icon,
    title,
    description,
}: {
    icon: ElementType;
    title: string;
    description: string;
}) {
    return (
        <article className="border-b border-slate-300 py-5 last:border-b-0 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
            <div className="flex h-10 w-10 items-center justify-center bg-slate-950 text-white">
                <Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                />
            </div>

            <h3 className="mt-3 text-xl font-black text-slate-950">
                {title}
            </h3>

            <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                {description}
            </p>
        </article>
    );
}

function RelatedPageLink({
    href,
    eyebrow,
    title,
}: {
    href: string;
    eyebrow: string;
    title: string;
}) {
    return (
        <Link
            href={href}
            className="group flex min-h-24 flex-col justify-between border-b border-slate-300 py-4 last:border-b-0 sm:border-r sm:px-5 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:first:pl-0"
        >
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#C8102E]">
                    {eyebrow}
                </p>

                <h3 className="mt-2 text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>
            </div>

            <ArrowRight className="mt-3 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#C8102E]" />
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
    children: ReactNode;
}) {
    return (
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
            {children}
        </p>
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
                Corporate Statements
            </span>
        </nav>
    );
}

function CorporateStatementsJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",

        "@type": "AboutPage",

        "@id":
            "https://ahpk.or.ke/about/corporate-statements#webpage",

        url:
            "https://ahpk.or.ke/about/corporate-statements",

        name:
            "Corporate Statements | Association of Hotel Professionals Kenya",

        headline:
            "Vision, Mission, Core Values, Goals and Objectives of AHPK",

        description:
            "The corporate vision, mission, core values, goals and objectives of the Association of Hotel Professionals Kenya.",

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
        },

        mainEntity: {
            "@type": "ItemList",

            name: "AHPK Core Values",

            numberOfItems: coreValues.length,

            itemListElement: coreValues.map(
                (value, index) => ({
                    "@type": "ListItem",

                    position: index + 1,

                    item: {
                        "@type": "DefinedTerm",

                        name: value.title,

                        description: value.description,
                    },
                }),
            ),
        },

        primaryImageOfPage: {
            "@type": "ImageObject",

            url:
                "https://ahpk.or.ke/executive-committee.webp",

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
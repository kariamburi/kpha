import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Award,
    BookOpenCheck,
    CheckCircle2,
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
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
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
        siteName: "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "website",
        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt: "Professional AHPK boardroom representing leadership and corporate governance",
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
                                Corporate Statements
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                The vision, mission, core values and
                                strategic objectives guiding the
                                Association of Hotel Professionals Kenya.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="#vision-mission"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#A80D27]"
                                >
                                    Read Our Vision
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/about/who-we-are"
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-extrabold text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                                >
                                    Who We Are
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative overflow-hidden rounded-[30px] border border-white bg-white p-3 shadow-2xl">
                                <img
                                    src="/executive-committee.webp"
                                    alt="AHPK corporate leadership boardroom"
                                    className="h-[380px] w-full rounded-[24px] object-cover sm:h-[460px]"
                                />

                                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-xl">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                        Strategic direction
                                    </p>

                                    <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                                        Guided by professionalism,
                                        leadership, integrity, quality and
                                        service excellence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VISION AND MISSION */}
            <section
                id="vision-mission"
                className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <SectionLabel>Our Direction</SectionLabel>

                        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                            Vision and Mission
                        </h2>

                        <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                            The statements that define what AHPK seeks to
                            become and how the Association serves the
                            hospitality profession.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        <StatementCard
                            icon={Eye}
                            label="Vision Statement"
                            title="A centre of modern hotel professional excellence"
                        >
                            To be a forum and centre of modern hotel
                            professional excellence for the sustenance of
                            efficient and cohesive world-class hospitality
                            standards positioned for the 21st century and
                            beyond.
                        </StatementCard>

                        <StatementCard
                            icon={Target}
                            label="Mission Statement"
                            title="Harnessing professional knowledge for future generations"
                        >
                            To promote, nurture and harness the immense
                            expertise and knowledge available among
                            professionals practising in the industry and
                            pass it on to future generations in pursuit of
                            their careers and in the spirit of corporate
                            social responsibility.
                        </StatementCard>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section
                id="core-values"
                className="scroll-mt-28 bg-slate-50 py-16 sm:py-20 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <SectionLabel>Core Values</SectionLabel>

                        <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                            Principles guiding our professional community
                        </h2>

                        <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                            AHPK’s work, leadership and service to members
                            are grounded in these professional values.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {coreValues.map((value) => (
                            <CoreValueCard
                                key={value.letter}
                                value={value}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* GOALS AND OBJECTIVES */}
            <section
                id="goals-objectives"
                className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
                        <div className="lg:sticky lg:top-28">
                            <SectionLabel>Strategic Mandate</SectionLabel>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                Goals and Objectives
                            </h2>

                            <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                                AHPK works to empower hospitality
                                professionals, improve industry standards,
                                encourage research and strengthen
                                professional representation.
                            </p>

                            <div className="mt-8 rounded-[26px] bg-gradient-to-br from-[#C8102E] to-[#8E0C22] p-7 text-white shadow-xl">
                                <Flag className="h-9 w-9" />

                                <p className="mt-5 text-xl font-extrabold leading-8">
                                    Strengthening hospitality professionalism
                                    through representation, knowledge and
                                    opportunity.
                                </p>

                                <p className="mt-4 text-sm font-medium leading-7 text-white/75">
                                    These objectives guide AHPK’s engagement
                                    with members, government, institutions,
                                    employers and industry partners.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {goalsAndObjectives.map((objective, index) => (
                                <ObjectiveItem
                                    key={objective}
                                    number={index + 1}
                                    text={objective}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section className="bg-slate-50 py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#C8102E] to-[#8E0C22] px-7 py-12 text-white shadow-2xl sm:px-10 lg:px-14 lg:py-16">
                        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10" />
                        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10" />

                        <div className="relative max-w-4xl">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">
                                Professional excellence
                            </p>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                                Be part of an association committed to
                                leadership, integrity and hospitality
                                standards.
                            </h2>

                            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/80">
                                Join AHPK and contribute to a stronger,
                                more professional and sustainable
                                hospitality industry.
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
                                    href="/about/executive-summary"
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-extrabold text-white transition hover:bg-white hover:text-slate-950"
                                >
                                    Executive Summary
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

function StatementCard({
    icon: Icon,
    label,
    title,
    children,
}: {
    icon: LucideIcon;
    label: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <article className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl sm:p-9">
            <span className="absolute -right-6 -top-8 text-[140px] font-black leading-none text-red-50">
                “
            </span>

            <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                    <Icon className="h-7 w-7" />
                </div>

                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                    {label}
                </p>

                <h3 className="mt-3 text-2xl font-extrabold leading-tight text-slate-950">
                    {title}
                </h3>

                <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                    {children}
                </p>
            </div>
        </article>
    );
}

function CoreValueCard({
    value,
}: {
    value: CoreValue;
}) {
    const Icon = value.icon;

    return (
        <article className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
            <span className="absolute right-5 top-3 text-6xl font-black text-red-50">
                {value.letter}
            </span>

            <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E] transition group-hover:bg-[#C8102E] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                    {value.title}
                </h3>

                <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                    {value.description}
                </p>
            </div>
        </article>
    );
}

function ObjectiveItem({
    number,
    text,
}: {
    number: number;
    text: string;
}) {
    return (
        <article className="group flex gap-5 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-200 hover:shadow-lg sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E] transition group-hover:bg-[#C8102E] group-hover:text-white">
                {String(number).padStart(2, "0")}
            </div>

            <div>
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                    <p className="text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                        {text}
                    </p>
                </div>
            </div>
        </article>
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
            "@id": "https://ahpk.or.ke/#website",
            name: "Association of Hotel Professionals Kenya",
            url: "https://ahpk.or.ke",
        },

        about: {
            "@type": "Organization",
            "@id": "https://ahpk.or.ke/#organization",
            name: "Association of Hotel Professionals Kenya",
            alternateName: "AHPK",
            url: "https://ahpk.or.ke",
        },

        mainEntity: {
            "@type": "ItemList",
            name: "AHPK Core Values",
            numberOfItems: coreValues.length,
            itemListElement: coreValues.map((value, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "DefinedTerm",
                    name: value.title,
                    description: value.description,
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
                Corporate Statements
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
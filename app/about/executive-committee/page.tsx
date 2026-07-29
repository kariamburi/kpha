import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    Award,
    BriefcaseBusiness,
    Building2,
    ChevronRight,
    Home,
    ShieldCheck,
    Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
    title: "Executive Committee",

    description:
        "Meet the Executive Committee of the Association of Hotel Professionals Kenya, the professionals responsible for the governance, leadership and strategic direction of AHPK.",

    keywords: [
        "AHPK Executive Committee",
        "Association of Hotel Professionals Kenya leadership",
        "AHPK board members",
        "hospitality leaders Kenya",
        "hotel professionals Kenya",
        "AHPK management committee",
        "hospitality association leadership Kenya",
    ],

    alternates: {
        canonical: "/about/executive-committee",
    },

    openGraph: {
        title:
            "Executive Committee | Association of Hotel Professionals Kenya",
        description:
            "Meet the hospitality professionals responsible for the governance and strategic leadership of AHPK.",
        url: "/about/executive-committee",
        siteName:
            "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "website",
        images: [
            {
                url: "/welcome.webp",
                width: 1536,
                height: 1024,
                alt: "AHPK Executive Committee and hospitality professionals",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Executive Committee | AHPK",
        description:
            "Meet the Executive Committee leading the Association of Hotel Professionals Kenya.",
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

type LeaderRecord = {
    id: string;
    name: string;
    title: string;
    bio: string | null;
    imageUrl: string | null;
};

export default async function ExecutiveCommitteePage() {
    const leaders = await prisma.leader.findMany({
        where: {
            active: true,
        },

        orderBy: [
            {
                order: "asc",
            },
            {
                createdAt: "desc",
            },
        ],
    });

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
                        name: "Executive Committee",
                        url: "/about/executive-committee",
                    },
                ]}
            />

            <ExecutiveCommitteeJsonLd
                leaders={leaders}
            />

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

                                Leadership
                            </p>

                            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                The Executive Committee
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                The AHPK Executive Committee brings
                                together experienced professionals
                                responsible for the governance,
                                strategic direction and advancement
                                of the Association.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/about/who-we-are"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#A80D27]"
                                >
                                    About AHPK

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
                                    src="/executive-committee.webp"
                                    alt="AHPK hospitality leadership"
                                    className="h-[380px] w-full rounded-[24px] object-cover sm:h-[460px]"
                                />

                                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-xl">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                        Strategic leadership
                                    </p>

                                    <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                                        Guiding AHPK through
                                        professional governance,
                                        responsible leadership and
                                        industry experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRODUCTION */}
            <section className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <SectionLabel>
                                Board of Management
                            </SectionLabel>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                Professional leadership serving
                                Kenya&apos;s hospitality industry
                            </h2>
                        </div>

                        <div className="space-y-5 text-base font-medium leading-8 text-slate-600">
                            <p>
                                The Association of Hotel
                                Professionals Kenya Executive
                                Committee brings together a wealth of
                                industrial management experience for
                                the benefit of the Association.
                            </p>

                            <p>
                                Its membership is drawn from
                                professionals serving in Kenya&apos;s
                                hotel industry, senior management,
                                hospitality education, consultancy and
                                related professional institutions.
                            </p>

                            <p>
                                The Executive Committee is responsible
                                for overseeing the Association&apos;s
                                programmes, governance responsibilities
                                and overall strategic direction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* LEADERSHIP GRID */}
            <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div className="max-w-3xl">
                            <SectionLabel>
                                Executive Leadership
                            </SectionLabel>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                                Meet the Executive Committee
                            </h2>

                            <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                                Professionals entrusted with the
                                governance, development and strategic
                                leadership of AHPK.
                            </p>
                        </div>

                        <div className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 shadow-sm">
                            {leaders.length} Published Profile
                            {leaders.length === 1 ? "" : "s"}
                        </div>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {leaders.map((leader) => (
                            <CommitteeMemberCard
                                key={leader.id}
                                leader={leader}
                            />
                        ))}

                        {leaders.length === 0 && (
                            <div className="col-span-full rounded-[30px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm sm:p-14">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <Users className="h-8 w-8" />
                                </div>

                                <h3 className="mt-5 text-2xl font-extrabold text-slate-950">
                                    Executive committee profiles
                                    will be published soon.
                                </h3>

                                <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
                                    Please check back later for
                                    official AHPK leadership profiles.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* GOVERNANCE FOCUS */}
            <section className="bg-white py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <GovernanceCard
                            icon={ShieldCheck}
                            title="Governance"
                            description="Providing responsible oversight and ensuring that the Association operates within its constitutional and professional mandate."
                        />

                        <GovernanceCard
                            icon={BriefcaseBusiness}
                            title="Strategic Direction"
                            description="Guiding the Association’s programmes, priorities and long-term professional development objectives."
                        />

                        <GovernanceCard
                            icon={Users}
                            title="Member Representation"
                            description="Representing the interests and professional aspirations of AHPK members across the hospitality sector."
                        />

                        <GovernanceCard
                            icon={Award}
                            title="Professional Standards"
                            description="Promoting ethical leadership, professional recognition and excellence in hospitality practice."
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-50 py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#C8102E] to-[#8E0C22] px-7 py-12 text-white shadow-2xl sm:px-10 lg:px-14 lg:py-16">
                        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10" />

                        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10" />

                        <div className="relative max-w-4xl">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">
                                Professional Community
                            </p>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                                Join a professionally governed
                                hospitality association.
                            </h2>

                            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/80">
                                Become part of a recognised community
                                committed to professional standards,
                                leadership and continuous development.
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
                                    href="/about/who-we-are"
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-extrabold text-white transition hover:bg-white hover:text-slate-950"
                                >
                                    Learn About AHPK
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

function CommitteeMemberCard({
    leader,
}: {
    leader: LeaderRecord;
}) {
    return (
        <article className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
            <div className="relative h-72 overflow-hidden bg-slate-100">

                {leader.imageUrl ? (
                    <img
                        src={leader.imageUrl}
                        alt={leader.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-red-50 text-[#C8102E]">
                        <Users className="h-16 w-16" />
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

                <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-[#C8102E] backdrop-blur">
                    AHPK Leader
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-extrabold text-slate-950">
                    {leader.name}
                </h3>

                <p className="mt-2 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-black uppercase tracking-[0.13em] text-[#C8102E]">
                    {leader.title}
                </p>

                {leader.bio ? (
                    <p className="mt-5 line-clamp-5 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">
                        {leader.bio}
                    </p>
                ) : (
                    <p className="mt-5 text-sm font-medium leading-7 text-slate-500">
                        Leadership profile details will be updated
                        soon.
                    </p>
                )}
            </div>
        </article>
    );
}

function GovernanceCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <article className="rounded-[26px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                <Icon className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                {title}
            </h3>

            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                {description}
            </p>
        </article>
    );
}

function ExecutiveCommitteeJsonLd({
    leaders,
}: {
    leaders: LeaderRecord[];
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",

        "@id":
            "https://ahpk.or.ke/about/executive-committee#webpage",

        url:
            "https://ahpk.or.ke/about/executive-committee",

        name:
            "Executive Committee | Association of Hotel Professionals Kenya",

        headline:
            "The Executive Committee of the Association of Hotel Professionals Kenya",

        description:
            "Meet the professionals responsible for the governance and strategic direction of the Association of Hotel Professionals Kenya.",

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

        mainEntity: {
            "@type": "ItemList",
            name: "AHPK Executive Committee",
            numberOfItems: leaders.length,

            itemListElement: leaders.map(
                (leader, index) => ({
                    "@type": "ListItem",
                    position: index + 1,

                    item: {
                        "@type": "Person",
                        name: leader.name,
                        jobTitle: leader.title,

                        description:
                            leader.bio ||
                            `${leader.name} serves as ${leader.title} at the Association of Hotel Professionals Kenya.`,

                        ...(leader.imageUrl
                            ? {
                                image:
                                    leader.imageUrl,
                            }
                            : {}),
                    },
                }),
            ),
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
                Executive Committee
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
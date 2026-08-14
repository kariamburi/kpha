// app/about/executive-committee/page.tsx

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
    Home,
    ShieldCheck,
    Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
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
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt:
                    "AHPK Executive Committee and hospitality professionals",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",

        title: "Executive Committee | AHPK",

        description:
            "Meet the Executive Committee leading the Association of Hotel Professionals Kenya.",

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

type LeaderRecord = {
    id: string;
    name: string;
    title: string;
    bio: string | null;
    imageUrl: string | null;
};

const governanceAreas = [
    {
        icon: ShieldCheck,
        number: "01",
        title: "Governance",
        description:
            "Providing responsible oversight and ensuring that the Association operates within its constitutional and professional mandate.",
    },
    {
        icon: BriefcaseBusiness,
        number: "02",
        title: "Strategic Direction",
        description:
            "Guiding the Association’s programmes, priorities and long-term professional development objectives.",
    },
    {
        icon: Users,
        number: "03",
        title: "Member Representation",
        description:
            "Representing the interests and professional aspirations of AHPK members across the hospitality sector.",
    },
    {
        icon: Award,
        number: "04",
        title: "Professional Standards",
        description:
            "Promoting ethical leadership, professional recognition and excellence in hospitality practice.",
    },
];

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

            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 max-w-5xl">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            AHPK Leadership
                        </p>

                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                            The Executive Committee
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            The AHPK Executive Committee brings
                            together experienced hospitality
                            professionals responsible for the
                            governance, strategic direction and
                            advancement of the Association.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                href="/about/who-we-are"
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-[#A80D27]"
                            >
                                About AHPK

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex min-h-11 items-center justify-center border border-slate-300 px-6 text-sm font-black text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                            >
                                Contact AHPK
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
                                alt="AHPK hospitality leadership"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            AHPK is guided through professional
                            governance, responsible leadership
                            and extensive hospitality industry
                            experience.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* INTRODUCTION */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-6 border-t-4 border-[#C8102E] pt-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
                        <div>
                            <SectionLabel>
                                Board of Management
                            </SectionLabel>

                            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                Professional leadership serving
                                Kenya&apos;s hospitality industry
                            </h2>
                        </div>

                        <div className="space-y-4 text-[17px] leading-8 text-slate-700 sm:text-lg sm:leading-9">
                            <p>
                                The Association of Hotel
                                Professionals Kenya Executive
                                Committee brings together a wealth
                                of industrial management
                                experience for the benefit of the
                                Association.
                            </p>

                            <p>
                                Its membership is drawn from
                                professionals serving in
                                Kenya&apos;s hotel industry,
                                senior management, hospitality
                                education, consultancy and related
                                professional institutions.
                            </p>

                            <p>
                                The Executive Committee is
                                responsible for overseeing the
                                Association&apos;s programmes,
                                governance responsibilities and
                                overall strategic direction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* LEADERSHIP DIRECTORY */}
            <section className="border-y border-slate-300 bg-slate-50 py-8 sm:py-10 lg:py-12">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-5 border-b border-slate-300 pb-4 md:flex-row md:items-end">
                        <div className="max-w-3xl">
                            <SectionLabel>
                                Executive Leadership
                            </SectionLabel>

                            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                                Meet the Executive Committee
                            </h2>

                            <p className="mt-4 max-w-2xl text-base font-medium leading-8 text-slate-600">
                                Professionals entrusted with the
                                governance, development and
                                strategic leadership of AHPK.
                            </p>
                        </div>

                        <div className="border-l-4 border-[#C8102E] pl-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                                Published profiles
                            </p>

                            <p className="mt-1 text-3xl font-black text-slate-950">
                                {leaders.length}
                            </p>
                        </div>
                    </div>

                    {leaders.length > 0 ? (
                        <div className="mt-6 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {leaders.map((leader) => (
                                <CommitteeMemberCard
                                    key={leader.id}
                                    leader={leader}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyLeadershipState />
                    )}
                </div>
            </section>

            {/* GOVERNANCE RESPONSIBILITIES */}
            <section className="bg-white py-8 sm:py-10 lg:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <SectionLabel>
                            Leadership Mandate
                        </SectionLabel>

                        <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                            Areas of governance responsibility
                        </h2>

                        <p className="mt-4 text-base font-medium leading-8 text-slate-600">
                            The Executive Committee provides
                            oversight across four central areas
                            of the Association&apos;s work.
                        </p>
                    </div>

                    <div className="mt-6 divide-y divide-slate-300 border-y border-slate-300">
                        {governanceAreas.map((area) => (
                            <GovernanceRow
                                key={area.title}
                                {...area}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* RELATED ABOUT LINKS */}
            <section className="border-t border-slate-300 bg-slate-50 py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <SectionLabel>
                        Learn more about AHPK
                    </SectionLabel>

                    <div className="mt-4 grid border-y border-slate-300 md:grid-cols-3">
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
                            href="/members-section/constitution-rules/membership"
                            eyebrow="Become a Member"
                            title="Membership"
                        />
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
        <article className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                {leader.imageUrl ? (
                    <img
                        src={leader.imageUrl}
                        alt={leader.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-slate-200 text-slate-400">
                        <Users className="h-16 w-16" />
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent" />

                <p className="absolute bottom-4 left-4 right-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
                    AHPK Executive Committee
                </p>
            </div>

            <div className="border-b border-slate-300 py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#C8102E]">
                    {leader.title}
                </p>

                <h3 className="mt-2 text-xl font-black leading-tight text-slate-950">
                    {leader.name}
                </h3>

                {leader.bio ? (
                    <p className="mt-3 line-clamp-5 whitespace-pre-line text-sm font-medium leading-7 text-slate-600">
                        {leader.bio}
                    </p>
                ) : (
                    <p className="mt-3 text-sm font-medium leading-7 text-slate-500">
                        Leadership profile details will be
                        updated soon.
                    </p>
                )}
            </div>
        </article>
    );
}

function EmptyLeadershipState() {
    return (
        <section className="mt-6 border-t-4 border-[#C8102E] bg-white px-5 py-10 text-center sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center bg-slate-950 text-white">
                <Users className="h-7 w-7" />
            </div>

            <h3 className="mt-3 text-2xl font-black text-slate-950">
                Executive committee profiles will be
                published soon.
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
                Please check back later for official
                AHPK leadership profiles.
            </p>

            <Link
                href="/about/who-we-are"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-red-700"
            >
                Learn about AHPK

                <ArrowRight className="h-4 w-4" />
            </Link>
        </section>
    );
}

function GovernanceRow({
    icon: Icon,
    number,
    title,
    description,
}: {
    icon: ElementType;
    number: string;
    title: string;
    description: string;
}) {
    return (
        <article className="grid gap-4 py-5 sm:grid-cols-[54px_52px_minmax(0,1fr)] sm:items-start">
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
                <h3 className="text-xl font-black text-slate-950">
                    {title}
                </h3>

                <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-slate-600">
                    {description}
                </p>
            </div>
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
            className="group flex min-h-28 flex-col justify-between border-b border-slate-300 py-5 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
        >
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#C8102E]">
                    {eyebrow}
                </p>

                <h3 className="mt-3 text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>
            </div>

            <ArrowRight className="mt-4 h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#C8102E]" />
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
                Executive Committee
            </span>
        </nav>
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
                                image: leader.imageUrl,
                            }
                            : {}),
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
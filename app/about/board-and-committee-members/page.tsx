import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    BadgeCheck,
    ChevronRight,
    Home,
    ShieldCheck,
    UserRound,
    Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

export const metadata: Metadata = {
    title: "Board and Committee Members",

    description:
        "View the Board and Committee Members of the Association of Hotel Professionals Kenya, including their leadership positions and AHPK membership numbers.",

    keywords: [
        "AHPK board members",
        "AHPK committee members",
        "Association of Hotel Professionals Kenya leadership",
        "hotel professionals Kenya",
        "hospitality leaders Kenya",
        "AHPK membership numbers",
        "AHPK board and committee",
    ],

    alternates: {
        canonical: "/about/board-and-committee-members",
    },

    openGraph: {
        title:
            "Board and Committee Members | Association of Hotel Professionals Kenya",
        description:
            "Meet the board and committee members serving the Association of Hotel Professionals Kenya.",
        url: "/about/board-and-committee-members",
        siteName: "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "website",
        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt: "AHPK boardroom representing the Board and Committee Members",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Board and Committee Members | AHPK",
        description:
            "View the board and committee members of the Association of Hotel Professionals Kenya.",
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

type BoardMember = {
    name: string;
    grade: string;
    role: string;
};

type CommitteeMember = {
    name: string;
    grade: string;
    membershipNumber: string;
};

const boardMembers: BoardMember[] = [
    {
        name: "Robert Kinyua",
        grade: "FAHPK",
        role: "Chairman",
    },
    {
        name: "Dr. Florence Njau",
        grade: "FAHPK",
        role: "Vice Chairperson — Corporate Affairs",
    },
    {
        name: "Raphael Oduol",
        grade: "FAHPK",
        role: "Vice Chairman — Operations",
    },
    {
        name: "Kinyua Charles",
        grade: "FAHPK",
        role: "Honorary Treasurer",
    },
    {
        name: "Wilson Mwangi",
        grade: "MAHPK",
        role: "Honorary Secretary",
    },
    {
        name: "Elizabeth Ayany",
        grade: "MAHPK",
        role: "Organising Secretary",
    },
    {
        name: "Ndunda Joseph",
        grade: "MAHPK",
        role: "Assistant Secretary",
    },
];

const committeeMembers: CommitteeMember[] = [
    {
        name: "Robert M. Kinyua",
        grade: "MAHPK",
        membershipNumber: "001/2016",
    },
    {
        name: "Wilson Mwangi",
        grade: "MAHPK",
        membershipNumber: "052/2016",
    },
    {
        name: "Raphael Oduol",
        grade: "MAHPK",
        membershipNumber: "023/2016",
    },
    {
        name: "Charles Kinyua",
        grade: "MAHPK",
        membershipNumber: "021/2016",
    },
    {
        name: "Dr. Florence Njau",
        grade: "MAHPK",
        membershipNumber: "041/2016",
    },
    {
        name: "Elizabeth Akinyi Ayany",
        grade: "MAHPK",
        membershipNumber: "022/2016",
    },
    {
        name: "Toney Kitonga",
        grade: "MAHPK",
        membershipNumber: "054/2016",
    },
    {
        name: "Charles Gitonga Gakuu",
        grade: "MAHPK",
        membershipNumber: "049/2016",
    },
    {
        name: "Peninah Kamau",
        grade: "MAHPK",
        membershipNumber: "008/2016",
    },
    {
        name: "Patrick Gatobu Muthuri",
        grade: "MAHPK",
        membershipNumber: "045/2016",
    },
    {
        name: "Faith Njoki Kimani",
        grade: "MAHPK",
        membershipNumber: "073/2016",
    },
    {
        name: "Dr. Peter Muthama Muchai",
        grade: "MAHPK",
        membershipNumber: "068/2016",
    },
    {
        name: "Eunah Munene",
        grade: "MAHPK",
        membershipNumber: "011/2016",
    },
    {
        name: "Joseph Ndundah",
        grade: "MAHPK",
        membershipNumber: "026/2016",
    },
    {
        name: "Jacob Omondi",
        grade: "MAHPK",
        membershipNumber: "033/2016",
    },
    {
        name: "Sarah Maritim",
        grade: "MAHPK",
        membershipNumber: "047/2016",
    },
];


export default function BoardAndCommitteeMembersPage() {
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
                        name: "Board and Committee Members",
                        url: "/about/board-and-committee-members",
                    },
                ]}
            />

            <BoardCommitteeJsonLd />

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
                            Board and Committee Members
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            Meet the professionals entrusted with
                            leadership, governance, member
                            representation and committee
                            responsibilities within the Association
                            of Hotel Professionals Kenya.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                href="#board-members"
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-[#A80D27]"
                            >
                                View Board Members

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/about/executive-committee"
                                className="inline-flex min-h-11 items-center justify-center border border-slate-300 px-6 text-sm font-black text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                            >
                                Executive Committee
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
                                alt="AHPK executive boardroom"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            AHPK board and committee members support
                            professional governance, responsible
                            leadership and member representation.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        <article className="min-w-0">
                            {/* BOARD MEMBERS */}
                            <section
                                id="board-members"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                                    <div className="max-w-3xl">
                                        <SectionLabel>
                                            Board Members
                                        </SectionLabel>

                                        <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                            The Association&apos;s Board
                                            leadership
                                        </h2>

                                        <p className="mt-3 max-w-3xl text-[17px] leading-8 text-slate-600">
                                            The Board provides
                                            professional leadership,
                                            institutional oversight and
                                            strategic guidance to the
                                            Association.
                                        </p>
                                    </div>

                                    <CountBlock
                                        label="Board Members"
                                        value={boardMembers.length}
                                    />
                                </div>

                                <div className="mt-5 border-t border-slate-300">
                                    {boardMembers.map((member, index) => (
                                        <BoardMemberRow
                                            key={`${member.name}-${member.role}`}
                                            member={member}
                                            number={index + 1}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* COMMITTEE MEMBERS */}
                            <section
                                id="committee-members"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                                    <div className="max-w-3xl">
                                        <SectionLabel>
                                            Committee Members
                                        </SectionLabel>

                                        <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                            Registered committee
                                            membership
                                        </h2>

                                        <p className="mt-3 max-w-3xl text-[17px] leading-8 text-slate-600">
                                            Official committee members
                                            are listed with their AHPK
                                            membership grades and
                                            registration numbers.
                                        </p>
                                    </div>

                                    <CountBlock
                                        label="Committee Members"
                                        value={committeeMembers.length}
                                    />
                                </div>

                                <div className="mt-5 border-y border-slate-300">
                                    <div className="hidden grid-cols-[64px_minmax(0,1fr)_120px_150px] border-b border-slate-300 bg-slate-950 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white md:grid">
                                        <span>No.</span>
                                        <span>Member</span>
                                        <span>Grade</span>
                                        <span>Membership No.</span>
                                    </div>

                                    <div className="divide-y divide-slate-300">
                                        {committeeMembers.map(
                                            (member, index) => (
                                                <CommitteeMemberRow
                                                    key={`${member.name}-${member.membershipNumber}`}
                                                    member={member}
                                                    number={index + 1}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* CONTINUE READING */}
                            <section className="border-t border-slate-300 pt-5">
                                <SectionLabel>
                                    Continue Reading
                                </SectionLabel>

                                <div className="mt-3 grid border-y border-slate-300 sm:grid-cols-2">
                                    <RelatedPageLink
                                        href="/about/executive-committee"
                                        eyebrow="Leadership Profiles"
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
                                        Leadership Directory
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Board and committee page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <ArticleSideLink
                                        href="#board-members"
                                        label="Board Members"
                                    />

                                    <ArticleSideLink
                                        href="#committee-members"
                                        label="Committee Members"
                                    />
                                </nav>
                            </div>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <ShieldCheck
                                    className="h-6 w-6 text-[#C8102E]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Responsible leadership
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    AHPK leadership supports
                                    professional governance,
                                    institutional accountability and
                                    effective member representation.
                                </p>

                                <Link
                                    href="/about/executive-committee"
                                    className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]"
                                >
                                    Executive Committee

                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                    Membership
                                </p>

                                <h2 className="mt-2 text-xl font-black">
                                    Join the AHPK community
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Access professional recognition,
                                    development opportunities,
                                    industry networking and member
                                    services.
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

            {/* FINAL CTA */}
            <section className="border-t border-slate-300 bg-slate-950 py-8 text-white sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div className="max-w-4xl">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-red-300">
                                AHPK Membership
                            </p>

                            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                                Join a recognised professional
                                hospitality association.
                            </h2>

                            <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-slate-300">
                                Become part of a professional
                                community committed to leadership,
                                representation, development and
                                hospitality excellence.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                            <Link
                                href="/apply"
                                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-red-700"
                            >
                                Apply for Membership

                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/members-section/constitution-rules/membership"
                                className="inline-flex min-h-11 items-center justify-center border border-white/40 px-6 text-sm font-black text-white transition hover:bg-white hover:text-slate-950"
                            >
                                Explore Membership
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function BoardMemberRow({
    member,
    number,
}: {
    member: BoardMember;
    number: number;
}) {
    return (
        <article className="grid gap-3 border-b border-slate-300 py-5 last:border-b-0 sm:grid-cols-[58px_48px_minmax(0,1fr)_220px] sm:items-center">
            <p className="text-3xl font-black leading-none text-slate-300">
                {String(number).padStart(2, "0")}
            </p>

            <div className="flex h-10 w-10 items-center justify-center bg-[#C8102E] text-white">
                <UserRound className="h-5 w-5" />
            </div>

            <div>
                <p className="text-xl font-black leading-tight text-slate-950">
                    {member.name}
                </p>

                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#C8102E]">
                    {member.grade}
                </p>
            </div>

            <p className="text-sm font-bold leading-6 text-slate-700 sm:text-right">
                {member.role}
            </p>
        </article>
    );
}

function CommitteeMemberRow({
    member,
    number,
}: {
    member: CommitteeMember;
    number: number;
}) {
    return (
        <article className="grid gap-3 px-0 py-4 transition hover:bg-slate-50 md:grid-cols-[64px_minmax(0,1fr)_120px_150px] md:items-center md:px-4">
            <p className="text-2xl font-black leading-none text-slate-300">
                {String(number).padStart(2, "0")}
            </p>

            <div>
                <p className="text-base font-black text-slate-950">
                    {member.name}
                </p>

                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 md:hidden">
                    Committee Member
                </p>
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 md:hidden">
                    Grade
                </p>

                <p className="mt-1 text-sm font-black text-[#C8102E] md:mt-0">
                    {member.grade}
                </p>
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 md:hidden">
                    Membership Number
                </p>

                <p className="mt-1 font-mono text-sm font-black text-slate-700 md:mt-0">
                    {member.membershipNumber}
                </p>
            </div>
        </article>
    );
}

function CountBlock({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="border-l-4 border-[#C8102E] pl-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
                {value}
            </p>
        </div>
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
            className="group flex min-h-24 flex-col justify-between border-b border-slate-300 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
        >
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.17em] text-[#C8102E]">
                    {eyebrow}
                </p>

                <h3 className="mt-1.5 text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
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

function BoardCommitteeJsonLd() {
    const people = [
        ...boardMembers.map((member) => ({
            name: member.name,
            role: member.role,
            grade: member.grade,
        })),
        ...committeeMembers.map((member) => ({
            name: member.name,
            role: "Committee Member",
            grade: member.grade,
            membershipNumber: member.membershipNumber,
        })),
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id":
            "https://ahpk.or.ke/about/board-and-committee-members#webpage",
        url: "https://ahpk.or.ke/about/board-and-committee-members",
        name:
            "Board and Committee Members | Association of Hotel Professionals Kenya",
        headline:
            "Board and Committee Members of the Association of Hotel Professionals Kenya",
        description:
            "The official Board and Committee Members of the Association of Hotel Professionals Kenya.",
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
            name: "AHPK Board and Committee Members",
            numberOfItems: people.length,
            itemListElement: people.map((person, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": "Person",
                    name: person.name,
                    jobTitle: person.role,
                    memberOf: {
                        "@type": "Organization",
                        name: "Association of Hotel Professionals Kenya",
                    },
                    description: `${person.name} is an ${person.grade} ${person.role} of the Association of Hotel Professionals Kenya.`,
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
                Board and Committee Members
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
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
            {children}
        </p>
    );
}
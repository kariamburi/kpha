import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
    BadgeCheck,
    ChevronRight,
    Home,
    ShieldCheck,
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
        grade: "FAHPK",
        membershipNumber: "001/2016",
    },
    {
        name: "Wilson Mwangi",
        grade: "MAHPK",
        membershipNumber: "052/2016",
    },
    {
        name: "Raphael Oduol",
        grade: "FAHPK",
        membershipNumber: "023/2016",
    },
    {
        name: "Charles Kinyua",
        grade: "FAHPK",
        membershipNumber: "021/2016",
    },
    {
        name: "Dr. Florence Njau",
        grade: "FAHPK",
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
            <section className="bg-white py-5 sm:py-7">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        <article className="min-w-0">
                            {/* BOARD MEMBERS */}
                            <section
                                id="board-members"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-5 pt-3"
                            >
                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                    <div className="max-w-3xl">
                                        <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                                            Board Members
                                        </h2>

                                        <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-600">
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

                                <div className="mt-3 border-t border-slate-200">
                                    {boardMembers.map((member) => (
                                        <BoardMemberRow
                                            key={`${member.name}-${member.role}`}
                                            member={member}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* COMMITTEE MEMBERS */}
                            <section
                                id="committee-members"
                                className="scroll-mt-28 border-t border-slate-300 py-5 sm:py-6"
                            >
                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                    <div className="max-w-3xl">
                                        <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                                            Committee Members
                                        </h2>

                                        <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-600">
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

                                <div className="mt-3 border-y border-slate-200">
                                    <div className="hidden grid-cols-[44px_minmax(0,1fr)_100px_140px] border-b border-slate-300 bg-slate-950 px-3 py-2.5 text-[10px] font-black uppercase tracking-[0.16em] text-white md:grid">
                                        <span>No.</span>
                                        <span>Member</span>
                                        <span>Grade</span>
                                        <span>Membership No.</span>
                                    </div>

                                    <div className="divide-y divide-slate-200">
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


                        </article>

                        {/* SIDEBAR */}
                        <aside className="space-y-4 lg:sticky lg:top-28">
                            <div className="border-t-4 border-[#C8102E]">
                                <div className="border-b border-slate-300 py-3">
                                    <h2 className="text-lg font-black text-slate-950">
                                        On This Page
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

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-4">
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

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-4 text-white">
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



            <PublicFooter />
        </main>
    );
}

function BoardMemberRow({
    member,
}: {
    member: BoardMember;
}) {
    return (
        <div className="group flex items-start gap-3 border-b border-slate-200 py-2.5 last:border-b-0 hover:bg-slate-50 sm:items-center">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C8102E] sm:mt-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 text-sm leading-6 text-slate-700">
                <span className="font-black text-slate-950 group-hover:text-[#C8102E]">
                    {member.name}
                </span>{" "}
                <span className="font-semibold text-[#C8102E]">({member.grade})</span>
                <span className="text-slate-500"> — </span>
                <span>{member.role}</span>
            </span>
        </div>
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
        <div className="grid gap-x-3 gap-y-0.5 px-2 py-2.5 transition hover:bg-slate-50 md:grid-cols-[44px_minmax(0,1fr)_100px_140px] md:items-center md:px-3">
            <span className="hidden text-xs font-bold text-slate-400 md:block">
                {String(number).padStart(2, "0")}
            </span>
            <span className="text-sm font-black leading-6 text-slate-950">{member.name}</span>
            <span className="text-xs font-bold text-[#C8102E]">{member.grade}</span>
            <span className="font-mono text-xs font-semibold text-slate-600">{member.membershipNumber}</span>
        </div>
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
        <div className="border-l-2 border-[#C8102E] pl-3">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                {label}
            </p>

            <p className="mt-0.5 text-2xl font-black text-slate-950">
                {value}
            </p>
        </div>
    );
}

function RelatedPageLink({
    href,
    title,
}: {
    href: string;
    eyebrow: string;
    title: string;
}) {
    return (
        <Link href={href} className="group flex min-h-12 items-center justify-between gap-3 border-b border-slate-200 py-2.5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
            <span className="text-sm font-black text-slate-950 transition group-hover:text-[#C8102E]">{title}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
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
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
                                AHPK Leadership
                            </p>

                            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Board and Committee Members
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                Meet the professionals entrusted with leadership, governance,
                                member representation and committee responsibilities within the
                                Association of Hotel Professionals Kenya.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="#board-members"
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#A80D27]"
                                >
                                    View Board Members
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/about/executive-committee"
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-extrabold text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                                >
                                    Executive Committee
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative overflow-hidden rounded-[30px] border border-white bg-white p-3 shadow-2xl">
                                <img
                                    src="/executive-committee.webp"
                                    alt="AHPK executive boardroom"
                                    className="h-[380px] w-full rounded-[24px] object-cover sm:h-[460px]"
                                />

                                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-xl">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                        Professional governance
                                    </p>

                                    <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                                        Supporting responsible leadership, member representation
                                        and professional oversight.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOARD MEMBERS */}
            <section
                id="board-members"
                className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div className="max-w-3xl">
                            <SectionLabel>Board Members</SectionLabel>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                The Association’s Board leadership
                            </h2>

                            <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                                The Board provides professional leadership, institutional
                                oversight and strategic guidance to the Association.
                            </p>
                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-extrabold text-slate-700">
                            <Users className="h-4 w-4 text-[#C8102E]" />
                            {boardMembers.length} Board Members
                        </div>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {boardMembers.map((member, index) => (
                            <BoardMemberCard
                                key={`${member.name}-${member.role}`}
                                member={member}
                                number={index + 1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* COMMITTEE MEMBERS */}
            <section
                id="committee-members"
                className="scroll-mt-28 bg-slate-50 py-16 sm:py-20 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div className="max-w-3xl">
                            <SectionLabel>Committee Members</SectionLabel>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                Registered committee membership
                            </h2>

                            <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                                Official committee members are shown together with their AHPK
                                membership grades and registration numbers.
                            </p>
                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 shadow-sm">
                            <BadgeCheck className="h-4 w-4 text-[#C8102E]" />
                            {committeeMembers.length} Committee Members
                        </div>
                    </div>

                    <div className="mt-12 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                        <div className="hidden grid-cols-[70px_minmax(0,1fr)_120px_150px] border-b border-slate-200 bg-slate-950 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white md:grid">
                            <span>No.</span>
                            <span>Member</span>
                            <span>Grade</span>
                            <span>Membership No.</span>
                        </div>

                        <div className="divide-y divide-slate-200">
                            {committeeMembers.map((member, index) => (
                                <CommitteeMemberRow
                                    key={`${member.name}-${member.membershipNumber}`}
                                    member={member}
                                    number={index + 1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#C8102E] to-[#8E0C22] px-7 py-12 text-white shadow-2xl sm:px-10 lg:px-14 lg:py-16">
                        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10" />
                        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10" />

                        <div className="relative max-w-4xl">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">
                                AHPK Membership
                            </p>

                            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                                Join a recognised professional hospitality association.
                            </h2>

                            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/80">
                                Become part of a professional community committed to
                                leadership, representation, development and hospitality
                                excellence.
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
                                    Who We Are
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

function BoardMemberCard({
    member,
    number,
}: {
    member: BoardMember;
    number: number;
}) {
    return (
        <article className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
            <span className="absolute right-5 top-4 text-5xl font-black text-red-50">
                {String(number).padStart(2, "0")}
            </span>

            <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E] transition group-hover:bg-[#C8102E] group-hover:text-white">
                    <UserRound className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                    {member.name}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#C8102E]">
                        {member.grade}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-slate-600">
                        Board Member
                    </span>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-sm font-extrabold leading-6 text-slate-800">
                        {member.role}
                    </p>
                </div>
            </div>
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
        <article className="grid gap-4 px-5 py-5 transition hover:bg-red-50/40 sm:px-6 md:grid-cols-[70px_minmax(0,1fr)_120px_150px] md:items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E]">
                {String(number).padStart(2, "0")}
            </div>

            <div>
                <p className="text-base font-extrabold text-slate-950">
                    {member.name}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500 md:hidden">
                    Committee Member
                </p>
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 md:hidden">
                    Grade
                </p>

                <span className="mt-1 inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-black text-[#C8102E] md:mt-0">
                    {member.grade}
                </span>
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 md:hidden">
                    Membership Number
                </p>

                <p className="mt-1 font-mono text-sm font-extrabold text-slate-700 md:mt-0">
                    {member.membershipNumber}
                </p>
            </div>
        </article>
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
                href="/about"
                className="transition hover:text-[#C8102E]"
            >
                About Us
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span className="text-[#C8102E]" aria-current="page">
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
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#C8102E]">
            {children}
        </p>
    );
}
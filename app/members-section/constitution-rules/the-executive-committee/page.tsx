// app/members-section/constitution-rules/the-executive-committee/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BookOpenCheck,
    Building2,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    CircleDot,
    ClipboardCheck,
    FileCheck2,
    FileText,
    Gavel,
    Home,
    Landmark,
    ListChecks,
    Mail,
    Network,
    Scale,
    ShieldAlert,
    ShieldCheck,
    Users,
    Vote,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath =
    "/members-section/constitution-rules/the-executive-committee";

export const metadata: Metadata = {
    title: "The Executive Committee",
    description:
        "Learn about the composition, powers, duties, meetings and governance responsibilities of the Executive Committee of the Association of Hotel Professionals Kenya.",
    keywords: [
        "AHPK Executive Committee",
        "AHPK governance",
        "AHPK constitution",
        "hospital professionals association Kenya",
        "executive committee duties",
        "AHPK annual general meeting",
        "Association of Hotel Professionals Kenya",
    ],
    alternates: {
        canonical: pagePath,
    },
    openGraph: {
        title:
            "The Executive Committee | Association of Hotel Professionals Kenya",
        description:
            "Explore the composition, powers, duties, meetings and constitutional responsibilities of the AHPK Executive Committee.",
        url: pagePath,
        siteName: "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "article",
        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt: "The Executive Committee of the Association of Hotel Professionals Kenya",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "The Executive Committee | AHPK",
        description:
            "Learn about the composition, authority and governance duties of the AHPK Executive Committee.",
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

const committeeComposition = [
    {
        title: "All Office Bearers",
        description:
            "The Executive Committee shall include all elected Office Bearers of the Association.",
        icon: BadgeCheck,
    },
    {
        title: "Four Additional Members",
        description:
            "Four other members shall be elected to serve on the Executive Committee.",
        icon: Users,
    },
    {
        title: "Election at the AGM",
        description:
            "The four additional members shall be elected during the Annual General Meeting.",
        icon: Vote,
    },
    {
        title: "Casual Vacancies",
        description:
            "Any casual vacancy shall be filled by the Executive Committee until the next Annual General Meeting.",
        icon: ClipboardCheck,
    },
];

const powersAndDuties = [
    {
        title: "Manage Association Property",
        description:
            "Manage and safeguard the property of the Association in accordance with the Constitution and Bye-Laws.",
    },
    {
        title: "Manage Association Affairs",
        description:
            "Direct and administer the affairs of the Association in accordance with its governing framework.",
    },
    {
        title: "Quarterly Meetings",
        description:
            "Meet as often as Association business requires, but not less than once every three months.",
    },
    {
        title: "Fourteen-Day Notice",
        description:
            "Provide at least fourteen days' notice of every Executive Committee meeting by electronic mail or in writing.",
    },
    {
        title: "One Vote per Member",
        description:
            "Each Executive Committee member present at a meeting shall have one vote.",
    },
    {
        title: "Committee Chair",
        description:
            "Executive Committee meetings shall be chaired by the Executive Committee Chair.",
    },
    {
        title: "Appointment of Sub-Committees",
        description:
            "The Executive Committee may appoint sub-committees where necessary to support the work of the Association.",
    },
];

const meetingTypes = [
    {
        title: "Ordinary Meetings",
        description:
            "Regular meetings convened to conduct the routine governance and administrative business of the Association.",
        icon: CalendarDays,
    },
    {
        title: "Annual General Meeting",
        description:
            "The principal yearly meeting of members, held not later than 1 December each year.",
        icon: Landmark,
    },
    {
        title: "Special General Meeting",
        description:
            "A meeting convened to address urgent, exceptional or constitutionally significant matters.",
        icon: Gavel,
    },
];

const meetingProceedings = [
    "The quorum for an Annual General Meeting or Special General Meeting shall be one half of all registered members.",
    "The Chair shall preside over all meetings.",
    "In the Chair's absence, the Vice Chair shall preside.",
    "Where neither the Chair nor Vice Chair is present, an Executive Committee member present shall be selected to preside.",
    "The Annual General Meeting shall be held not later than 1 December each year.",
    "Written notice of the Annual General Meeting shall be sent to all members at least twenty-one days before the meeting.",
    "The Annual General Meeting notice shall be accompanied by the annual statement of account and the meeting agenda.",
    "Voting shall be personal, and proxy voting shall not be permitted.",
    "The Chair shall have a casting vote in addition to the Chair's personal vote where votes are tied.",
];

const governancePrinciples = [
    "Good Governance",
    "Accountability",
    "Transparency",
    "Constitutional Compliance",
    "Member Participation",
];

export default function ExecutiveCommitteePage() {
    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: "/" },
                    { name: "Members Section", url: "/members-section" },
                    {
                        name: "Constitution & Rules",
                        url: "/members-section/constitution-rules",
                    },
                    {
                        name: "The Executive Committee",
                        url: pagePath,
                    },
                ]}
            />

            <ExecutiveCommitteeJsonLd />
            <PageHeader />

            <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
                <div className="absolute inset-0 -z-30">
                    <img
                        src="/executive-committee.webp"
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover object-center lg:object-right"
                    />
                </div>

                <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_30%,rgba(255,255,255,0.98)_42%,rgba(255,255,255,0.9)_55%,rgba(255,255,255,0.65)_68%,rgba(255,255,255,0.32)_82%,rgba(255,255,255,0)_100%)] lg:block" />
                <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.96)_55%,rgba(255,255,255,0.78)_76%,rgba(255,255,255,0.45)_100%)] lg:hidden" />
                <div className="absolute inset-y-0 right-0 -z-10 hidden w-[26%] bg-gradient-to-l from-slate-950/20 to-transparent lg:block" />
                <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-red-100/60 blur-3xl" />

                <div className="relative mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col px-5 py-7 sm:px-6 sm:py-8 lg:min-h-[calc(100svh-82px)] lg:px-8 lg:py-10">
                    <Breadcrumb />

                    <div className="flex flex-1 items-center py-8 sm:py-10 lg:py-6">
                        <div className="max-w-3xl lg:w-[58%]">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                                    <Landmark className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                                        Constitution &amp; Rules
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        AHPK Governance Framework
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                                The Executive
                                <span className="mt-2 block text-[#C8102E]">
                                    Committee
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                Learn about the composition, powers,
                                meetings and constitutional authority of
                                the Association&apos;s Executive Committee.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                                {[
                                    "Governance",
                                    "Committee Powers",
                                    "General Meetings",
                                    "Voting",
                                    "Accountability",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-slate-200 bg-white/85 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur sm:px-4 sm:text-[11px]"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-7 max-w-xl border-l-4 border-[#C8102E] bg-white/75 py-3 pl-5 pr-4 backdrop-blur-sm sm:mt-8">
                                <p className="text-sm font-bold leading-6 text-slate-700">
                                    The Executive Committee manages the
                                    Association&apos;s affairs and property in
                                    accordance with the Constitution and
                                    Bye-Laws.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-20" />
            </section>

            <section className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        <article className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9 lg:p-12">
                            <section
                                id="executive-committee"
                                className="scroll-mt-28"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <Users className="h-7 w-7" />
                                </div>

                                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                    Association committees
                                </p>

                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    The Executive Committee
                                </h2>

                                <div className="mt-7 rounded-2xl border border-red-100 bg-red-50/70 p-6">
                                    <p className="text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                        The Executive Committee is responsible
                                        for managing the property, affairs and
                                        governance of the Association in
                                        accordance with the Constitution and
                                        Bye-Laws. It provides leadership,
                                        oversees administration and ensures
                                        that the Association&apos;s objectives
                                        are advanced.
                                    </p>
                                </div>
                            </section>

                            <section
                                id="composition"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Committee membership"
                                    title="Composition of the Executive Committee"
                                    description="The Executive Committee brings together all Office Bearers and additional elected members."
                                    icon={Network}
                                />

                                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                    {committeeComposition.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.title}
                                                className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm"
                                            >
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <h3 className="mt-5 text-lg font-extrabold text-slate-950">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                                    {item.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            <section
                                id="powers-duties"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Authority and responsibility"
                                    title="Proceedings, Powers & Duties"
                                    description="The Executive Committee has constitutional authority to manage the Association and organize its governance activities."
                                    icon={Scale}
                                />

                                <div className="mt-8 space-y-4">
                                    {powersAndDuties.map((item, index) => (
                                        <div
                                            key={item.title}
                                            className="flex gap-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-sm font-black text-[#C8102E]">
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="text-base font-extrabold text-slate-950 sm:text-lg">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-2 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section
                                id="meetings"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Governance meetings"
                                    title="Meetings of the Association"
                                    description="Meetings shall be held at the places and times appointed by the Executive Committee."
                                    icon={CalendarDays}
                                />

                                <div className="mt-8 grid gap-5 md:grid-cols-3">
                                    {meetingTypes.map((meeting) => {
                                        const Icon = meeting.icon;

                                        return (
                                            <div
                                                key={meeting.title}
                                                className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm"
                                            >
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <h3 className="mt-5 text-lg font-extrabold text-slate-950">
                                                    {meeting.title}
                                                </h3>

                                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                                    {meeting.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            <section
                                id="meeting-proceedings"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Meeting procedure"
                                    title="Proceedings at Meetings"
                                    description="The Constitution establishes the quorum, notice, voting and presiding requirements for General Meetings."
                                    icon={ListChecks}
                                />

                                <div className="mt-8 space-y-4">
                                    {meetingProceedings.map((item, index) => (
                                        <div
                                            key={item}
                                            className="flex gap-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
                                        >
                                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C8102E]" />

                                            <div>
                                                <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                                                    Provision{" "}
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </span>

                                                <p className="mt-1 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                                                    {item}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section
                                id="constitutional-amendments"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 sm:p-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
                                        <FileCheck2 className="h-6 w-6" />
                                    </div>

                                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Constitutional change
                                    </p>

                                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                        Amendment to the Constitution
                                    </h2>

                                    <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                        Any amendment to the Constitution
                                        must satisfy both the Association&apos;s
                                        voting requirement and the applicable
                                        regulatory approval process.
                                    </p>

                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        <RequirementCard
                                            title="Two-Thirds Majority"
                                            description="The proposed amendment must be approved by at least a two-thirds majority."
                                            icon={Vote}
                                        />

                                        <RequirementCard
                                            title="Registrar's Consent"
                                            description="The amendment may only be implemented after obtaining the prior written consent of the Registrar of Societies."
                                            icon={FileText}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section
                                id="branches"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Association growth"
                                    title="Formation of Branches"
                                    description="Branches may be established through a constitutional recommendation and approval process."
                                    icon={Building2}
                                />

                                <div className="mt-8 grid gap-5 sm:grid-cols-3">
                                    <ProcessCard
                                        step="01"
                                        title="Committee Recommendation"
                                        description="The Executive Committee recommends the formation of a branch."
                                    />
                                    <ProcessCard
                                        step="02"
                                        title="Member Approval"
                                        description="Members approve the recommendation at a General or Special General Meeting."
                                    />
                                    <ProcessCard
                                        step="03"
                                        title="Registrar Notification"
                                        description="The recommendation is notified to the Registrar of Societies before adoption."
                                    />
                                </div>
                            </section>

                            <section
                                id="dissolution"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-6 sm:p-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                                        <ShieldAlert className="h-6 w-6" />
                                    </div>

                                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-amber-700">
                                        Constitutional safeguard
                                    </p>

                                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                        Dissolution of the Association
                                    </h2>

                                    <p className="mt-4 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                                        The Association shall not be dissolved
                                        except through a resolution passed at a
                                        General Meeting by a vote of at least
                                        two-thirds of the members present. The
                                        meeting must also satisfy the quorum
                                        requirements established by the
                                        Constitution.
                                    </p>
                                </div>
                            </section>

                            <section
                                id="inspection"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Transparency and access"
                                    title="Inspection of Accounts & Members Register"
                                    description="Association officers and members may inspect specified records through the constitutional notice procedure."
                                    icon={BookOpenCheck}
                                />

                                <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                    <h3 className="text-xl font-extrabold text-slate-950">
                                        Records Available for Inspection
                                    </h3>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                        {[
                                            "Books of Account",
                                            "Supporting Documents",
                                            "Register of Members",
                                        ].map((record) => (
                                            <div
                                                key={record}
                                                className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-4"
                                            >
                                                <CircleDot className="h-4 w-4 shrink-0 text-[#C8102E]" />
                                                <span className="text-sm font-bold text-slate-700">
                                                    {record}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        <RequirementCard
                                            title="Seven Days' Notice"
                                            description="The requesting officer or member must give the Association at least seven days' written notice."
                                            icon={Mail}
                                        />

                                        <RequirementCard
                                            title="Registered Office"
                                            description="Inspection shall take place at the registered office of the Association."
                                            icon={Building2}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section
                                id="governance-principles"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 sm:p-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>

                                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Committee commitment
                                    </p>

                                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                        Governance Principles
                                    </h2>

                                    <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                        The Executive Committee is expected to
                                        exercise its constitutional authority
                                        in a manner that protects the
                                        Association, serves its members and
                                        promotes effective governance.
                                    </p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        {governancePrinciples.map(
                                            (principle) => (
                                                <div
                                                    key={principle}
                                                    className="flex items-center gap-3 rounded-xl border border-red-100 bg-white px-4 py-3"
                                                >
                                                    <BadgeCheck className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                                    <span className="text-sm font-bold text-slate-700">
                                                        {principle}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </section>

                            <section className="mt-10 rounded-[24px] bg-slate-950 p-7 text-white sm:p-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                    <Landmark className="h-6 w-6" />
                                </div>

                                <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                    Constitution &amp; governance
                                </p>

                                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                                    Explore the Board of Management
                                </h2>

                                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/70 sm:text-base">
                                    Continue to the Board of Management
                                    provisions and learn how the wider
                                    governance structure supports AHPK&apos;s
                                    leadership and administration.
                                </p>

                                <Link
                                    href="/members-section/constitution-rules/board-of-management"
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-red-700"
                                >
                                    View Board of Management
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </section>

                            <div className="mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
                                <Link
                                    href="/members-section/constitution-rules/office-bearers-duties"
                                    className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Previous
                                        </span>
                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Office Bearers &amp; Duties
                                        </span>
                                    </span>
                                </Link>

                                <Link
                                    href="/members-section/constitution-rules/board-of-management"
                                    className="group flex min-h-24 items-center justify-end gap-4 rounded-2xl border border-slate-200 p-5 text-right transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Next
                                        </span>
                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Board of Management
                                        </span>
                                    </span>

                                    <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                </Link>
                            </div>
                        </article>

                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                                <div className="bg-[#C8102E] px-6 py-5 text-white">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                                        On this page
                                    </p>
                                    <h2 className="mt-2 text-xl font-extrabold">
                                        Executive Committee
                                    </h2>
                                </div>

                                <nav className="p-3">
                                    <SidebarLink
                                        href="#executive-committee"
                                        label="Executive Committee"
                                        active
                                    />
                                    <SidebarLink
                                        href="#composition"
                                        label="Composition"
                                    />
                                    <SidebarLink
                                        href="#powers-duties"
                                        label="Powers & Duties"
                                    />
                                    <SidebarLink
                                        href="#meetings"
                                        label="Meetings"
                                    />
                                    <SidebarLink
                                        href="#meeting-proceedings"
                                        label="Meeting Proceedings"
                                    />
                                    <SidebarLink
                                        href="#constitutional-amendments"
                                        label="Constitutional Amendments"
                                    />
                                    <SidebarLink
                                        href="#branches"
                                        label="Branches"
                                    />
                                    <SidebarLink
                                        href="#dissolution"
                                        label="Dissolution"
                                    />
                                    <SidebarLink
                                        href="#inspection"
                                        label="Inspection of Accounts"
                                    />
                                    <SidebarLink
                                        href="#governance-principles"
                                        label="Governance Principles"
                                    />
                                </nav>
                            </div>

                            <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
                                <BookOpenCheck className="h-8 w-8 text-[#C8102E]" />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Constitution &amp; Rules
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Review the constitutional framework
                                    governing AHPK&apos;s objectives,
                                    membership, leadership and administration.
                                </p>

                                <Link
                                    href="/members-section/constitution-rules"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    View Constitution Section
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                                <Gavel className="h-8 w-8 text-[#C8102E]" />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Governance Standard
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Executive Committee decisions and
                                    meetings must remain consistent with the
                                    Constitution, Bye-Laws and approved member
                                    resolutions.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function SectionHeading({
    eyebrow,
    title,
    description,
    icon: Icon,
}: {
    eyebrow: string;
    title: string;
    description: string;
    icon: typeof Users;
}) {
    return (
        <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                <Icon className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                {eyebrow}
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                {title}
            </h2>

            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                {description}
            </p>
        </div>
    );
}

function RequirementCard({
    title,
    description,
    icon: Icon,
}: {
    title: string;
    description: string;
    icon: typeof Vote;
}) {
    return (
        <div className="rounded-2xl border border-red-100 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-base font-extrabold text-slate-950">
                {title}
            </h3>

            <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                {description}
            </p>
        </div>
    );
}

function ProcessCard({
    step,
    title,
    description,
}: {
    step: string;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-black tracking-[0.16em] text-[#C8102E]">
                {step}
            </span>

            <h3 className="mt-5 text-lg font-extrabold text-slate-950">
                {title}
            </h3>

            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                {description}
            </p>
        </div>
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
            className={
                active
                    ? "group flex items-center justify-between gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-[#C8102E]"
                    : "group mt-1 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-red-50 hover:text-[#C8102E]"
            }
        >
            {label}

            <ChevronRight
                className={
                    active
                        ? "h-4 w-4"
                        : "h-4 w-4 text-slate-300 transition group-hover:text-[#C8102E]"
                }
            />
        </Link>
    );
}

function ExecutiveCommitteeJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/constitution-rules/the-executive-committee#article",
        url:
            "https://ahpk.or.ke/members-section/constitution-rules/the-executive-committee",
        headline: "The Executive Committee",
        description:
            "AHPK constitutional provisions covering the Executive Committee's composition, powers, meetings, voting, constitutional amendments, branches, dissolution and inspection of records.",
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
            name: "AHPK Executive Committee Provisions",
            numberOfItems: 8,
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Committee Composition",
                    description:
                        "The Executive Committee consists of all Office Bearers and four additional members elected at the Annual General Meeting.",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Powers and Duties",
                    description:
                        "The Committee manages the property and affairs of the Association in accordance with the Constitution and Bye-Laws.",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Meetings",
                    description:
                        "The Association holds Ordinary Meetings, Annual General Meetings and Special General Meetings.",
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    name: "Meeting Proceedings",
                    description:
                        "The Constitution regulates quorum, chairing, notice, voting and casting votes.",
                },
                {
                    "@type": "ListItem",
                    position: 5,
                    name: "Constitutional Amendments",
                    description:
                        "Amendments require a two-thirds majority and prior written consent from the Registrar of Societies.",
                },
                {
                    "@type": "ListItem",
                    position: 6,
                    name: "Branches",
                    description:
                        "Branches may be formed through Executive Committee recommendation, member approval and Registrar notification.",
                },
                {
                    "@type": "ListItem",
                    position: 7,
                    name: "Dissolution",
                    description:
                        "Dissolution requires a General Meeting resolution approved by at least two-thirds of members present.",
                },
                {
                    "@type": "ListItem",
                    position: 8,
                    name: "Inspection of Records",
                    description:
                        "Books of account, supporting documents and the members register may be inspected after seven days' written notice.",
                },
            ],
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
                href="/members-section"
                className="transition hover:text-[#C8102E]"
            >
                Members Section
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <Link
                href="/members-section/constitution-rules"
                className="transition hover:text-[#C8102E]"
            >
                Constitution &amp; Rules
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span className="text-[#C8102E]" aria-current="page">
                The Executive Committee
            </span>
        </nav>
    );
}
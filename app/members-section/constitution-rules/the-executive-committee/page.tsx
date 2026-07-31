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
                    {
                        name: "Members Section",
                        url: "/members-section",
                    },
                    {
                        name: "Constitution & Rules",
                        url:
                            "/members-section/constitution-rules",
                    },
                    {
                        name: "The Executive Committee",
                        url: pagePath,
                    },
                ]}
            />

            <ExecutiveCommitteeJsonLd />
            <PageHeader />

            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 max-w-5xl">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            Constitution &amp; Rules
                        </p>

                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                            The Executive
                            <span className="block text-[#C8102E]">
                                Committee
                            </span>
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            The composition, powers, meetings and
                            constitutional authority of the
                            Association&apos;s Executive Committee.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-300 pt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                            <span>Governance</span>
                            <span>Committee Powers</span>
                            <span>General Meetings</span>
                            <span>Voting</span>
                            <span>Accountability</span>
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
                                alt="The Executive Committee of the Association of Hotel Professionals Kenya"
                                className="h-full w-full object-cover object-center transition duration-700 hover:scale-[1.01]"
                            />
                        </div>

                        <figcaption className="border-b border-slate-300 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            The Executive Committee manages the
                            Association&apos;s affairs and property
                            in accordance with the Constitution and
                            Bye-Laws.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* OVERVIEW */}
                            <section
                                id="executive-committee"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                        <Users className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                            Association Committees
                                        </p>

                                        <h2 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                            The Executive Committee
                                        </h2>
                                    </div>
                                </div>

                                <blockquote className="mt-5 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4 text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                    The Executive Committee is
                                    responsible for managing the
                                    property, affairs and governance
                                    of the Association in accordance
                                    with the Constitution and
                                    Bye-Laws. It provides leadership,
                                    oversees administration and
                                    ensures that the Association&apos;s
                                    objectives are advanced.
                                </blockquote>
                            </section>

                            {/* COMPOSITION */}
                            <section
                                id="composition"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Committee Membership"
                                    title="Composition of the Executive Committee"
                                    description="The Executive Committee brings together all Office Bearers and additional elected members."
                                    icon={Network}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    {committeeComposition.map(
                                        (item, index) => {
                                            const Icon = item.icon;

                                            return (
                                                <EditorialItem
                                                    key={item.title}
                                                    number={String(
                                                        index + 1,
                                                    ).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                    title={item.title}
                                                    description={
                                                        item.description
                                                    }
                                                    icon={Icon}
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </section>

                            {/* POWERS */}
                            <section
                                id="powers-duties"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Authority and Responsibility"
                                    title="Proceedings, Powers & Duties"
                                    description="The Executive Committee has constitutional authority to manage the Association and organize its governance activities."
                                    icon={Scale}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    {powersAndDuties.map(
                                        (item, index) => (
                                            <RuleItem
                                                key={item.title}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                title={item.title}
                                                text={item.description}
                                            />
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* MEETINGS */}
                            <section
                                id="meetings"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Governance Meetings"
                                    title="Meetings of the Association"
                                    description="Meetings shall be held at the places and times appointed by the Executive Committee."
                                    icon={CalendarDays}
                                />

                                <div className="mt-5 grid border-t border-slate-300 md:grid-cols-3">
                                    {meetingTypes.map(
                                        (meeting, index) => {
                                            const Icon = meeting.icon;

                                            return (
                                                <MeetingItem
                                                    key={meeting.title}
                                                    number={String(
                                                        index + 1,
                                                    ).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                    title={meeting.title}
                                                    description={
                                                        meeting.description
                                                    }
                                                    icon={Icon}
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </section>

                            {/* MEETING PROCEEDINGS */}
                            <section
                                id="meeting-proceedings"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Meeting Procedure"
                                    title="Proceedings at Meetings"
                                    description="The Constitution establishes the quorum, notice, voting and presiding requirements for General Meetings."
                                    icon={ListChecks}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    {meetingProceedings.map(
                                        (item, index) => (
                                            <ProvisionItem
                                                key={item}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                text={item}
                                            />
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* AMENDMENTS */}
                            <section
                                id="constitutional-amendments"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="border-l-4 border-[#C8102E] bg-slate-50 px-5 py-6 sm:px-6">
                                    <FileCheck2 className="h-6 w-6 text-[#C8102E]" />

                                    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Constitutional Change
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                                        Amendment to the Constitution
                                    </h2>

                                    <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                        Any amendment to the
                                        Constitution must satisfy
                                        both the Association&apos;s
                                        voting requirement and the
                                        applicable regulatory
                                        approval process.
                                    </p>

                                    <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2">
                                        <RequirementItem
                                            title="Two-Thirds Majority"
                                            description="The proposed amendment must be approved by at least a two-thirds majority."
                                            icon={Vote}
                                        />

                                        <RequirementItem
                                            title="Registrar's Consent"
                                            description="The amendment may only be implemented after obtaining the prior written consent of the Registrar of Societies."
                                            icon={FileText}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* BRANCHES */}
                            <section
                                id="branches"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Association Growth"
                                    title="Formation of Branches"
                                    description="Branches may be established through a constitutional recommendation and approval process."
                                    icon={Building2}
                                />

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-3">
                                    <ProcessItem
                                        step="01"
                                        title="Committee Recommendation"
                                        description="The Executive Committee recommends the formation of a branch."
                                    />

                                    <ProcessItem
                                        step="02"
                                        title="Member Approval"
                                        description="Members approve the recommendation at a General or Special General Meeting."
                                    />

                                    <ProcessItem
                                        step="03"
                                        title="Registrar Notification"
                                        description="The recommendation is notified to the Registrar of Societies before adoption."
                                    />
                                </div>
                            </section>

                            {/* DISSOLUTION */}
                            <section
                                id="dissolution"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="border-l-4 border-amber-600 bg-amber-50 px-5 py-6 sm:px-6">
                                    <ShieldAlert className="h-6 w-6 text-amber-700" />

                                    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-amber-700">
                                        Constitutional Safeguard
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                                        Dissolution of the Association
                                    </h2>

                                    <p className="mt-3 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                                        The Association shall not be
                                        dissolved except through a
                                        resolution passed at a
                                        General Meeting by a vote of
                                        at least two-thirds of the
                                        members present. The meeting
                                        must also satisfy the quorum
                                        requirements established by
                                        the Constitution.
                                    </p>
                                </div>
                            </section>

                            {/* INSPECTION */}
                            <section
                                id="inspection"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Transparency and Access"
                                    title="Inspection of Accounts & Members Register"
                                    description="Association officers and members may inspect specified records through the constitutional notice procedure."
                                    icon={BookOpenCheck}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    <h3 className="py-4 text-xl font-black text-slate-950">
                                        Records Available for Inspection
                                    </h3>

                                    <div className="grid border-t border-slate-300 sm:grid-cols-3">
                                        {[
                                            "Books of Account",
                                            "Supporting Documents",
                                            "Register of Members",
                                        ].map((record, index) => (
                                            <RecordItem
                                                key={record}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                title={record}
                                            />
                                        ))}
                                    </div>

                                    <div className="grid border-t border-slate-300 sm:grid-cols-2">
                                        <RequirementItem
                                            title="Seven Days' Notice"
                                            description="The requesting officer or member must give the Association at least seven days' written notice."
                                            icon={Mail}
                                        />

                                        <RequirementItem
                                            title="Registered Office"
                                            description="Inspection shall take place at the registered office of the Association."
                                            icon={Building2}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* PRINCIPLES */}
                            <section
                                id="governance-principles"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Committee Commitment
                                </p>

                                <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                                    Governance Principles
                                </h2>

                                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                    The Executive Committee is
                                    expected to exercise its
                                    constitutional authority in a
                                    manner that protects the
                                    Association, serves its members
                                    and promotes effective
                                    governance.
                                </p>

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2">
                                    {governancePrinciples.map(
                                        (principle, index) => (
                                            <PrincipleItem
                                                key={principle}
                                                number={String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    "0",
                                                )}
                                                title={principle}
                                            />
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* CTA */}
                            <section className="border-t border-slate-300 py-8">
                                <div className="border-l-4 border-[#C8102E] bg-slate-950 px-5 py-6 text-white sm:px-6">
                                    <Landmark className="h-6 w-6 text-red-300" />

                                    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                        Constitution &amp; Governance
                                    </p>

                                    <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                                        Explore the Board of Management
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                                        Continue to the Board of
                                        Management provisions and
                                        learn how the wider
                                        governance structure supports
                                        AHPK&apos;s leadership and
                                        administration.
                                    </p>

                                    <Link
                                        href="/members-section/constitution-rules/board-of-management"
                                        className="group mt-5 inline-flex items-center gap-2 border-b border-red-300 pb-1 text-sm font-black text-red-300 transition hover:border-white hover:text-white"
                                    >
                                        View Board of Management

                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </section>

                            {/* PREVIOUS / NEXT */}
                            <section className="border-t border-slate-300 pt-5">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                    Continue Reading
                                </p>

                                <div className="mt-3 grid border-y border-slate-300 sm:grid-cols-2">
                                    <RelatedPageLink
                                        href="/members-section/constitution-rules/office-bearers-duties"
                                        eyebrow="Previous Section"
                                        title="Office Bearers & Duties"
                                        direction="left"
                                    />

                                    <RelatedPageLink
                                        href="/members-section/constitution-rules/board-of-management"
                                        eyebrow="Next Section"
                                        title="Board of Management"
                                        direction="right"
                                    />
                                </div>
                            </section>
                        </article>

                        {/* EDITORIAL SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <section className="border-t-4 border-[#C8102E]">
                                <div className="border-b border-slate-300 py-3">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        On This Page
                                    </p>

                                    <h2 className="mt-1.5 text-xl font-black text-slate-950">
                                        Executive Committee
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Executive Committee page navigation"
                                    className="divide-y divide-slate-200"
                                >
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
                            </section>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <BookOpenCheck className="h-6 w-6 text-[#C8102E]" />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Constitution &amp; Rules
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    Review the constitutional
                                    framework governing AHPK&apos;s
                                    objectives, membership,
                                    leadership and administration.
                                </p>

                                <Link
                                    href="/members-section/constitution-rules"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-[#C8102E]"
                                >
                                    View Constitution Section

                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </Link>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <Gavel className="h-6 w-6 text-red-300" />

                                <h2 className="mt-2 text-xl font-black">
                                    Governance Standard
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Committee decisions and meetings
                                    must remain consistent with the
                                    Constitution, Bye-Laws and
                                    approved member resolutions.
                                </p>
                            </section>
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
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                        {eyebrow}
                    </p>

                    <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950">
                        {title}
                    </h2>
                </div>
            </div>

            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                {description}
            </p>
        </div>
    );
}

function EditorialItem({
    number,
    title,
    description,
    icon: Icon,
}: {
    number: string;
    title: string;
    description: string;
    icon: typeof BadgeCheck;
}) {
    return (
        <article className="group grid gap-4 border-b border-slate-300 py-6 sm:grid-cols-[64px_42px_minmax(0,1fr)] sm:items-start">
            <p className="text-4xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <div className="flex h-9 w-9 items-center justify-center bg-slate-950 text-white transition group-hover:bg-[#C8102E]">
                <Icon className="h-4 w-4" />
            </div>

            <div>
                <h3 className="text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>

                <p className="mt-2 text-[16px] font-medium leading-8 text-slate-700">
                    {description}
                </p>
            </div>
        </article>
    );
}

function RuleItem({
    number,
    title,
    text,
}: {
    number: string;
    title: string;
    text: string;
}) {
    return (
        <article className="group grid gap-4 border-b border-slate-300 py-5 sm:grid-cols-[56px_minmax(0,1fr)]">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <div>
                <h3 className="text-lg font-black text-slate-950">
                    {title}
                </h3>

                <p className="mt-2 text-sm font-medium leading-7 text-slate-700 sm:text-base">
                    {text}
                </p>
            </div>
        </article>
    );
}

function MeetingItem({
    number,
    title,
    description,
    icon: Icon,
}: {
    number: string;
    title: string;
    description: string;
    icon: typeof CalendarDays;
}) {
    return (
        <article className="group border-b border-slate-300 py-5 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <Icon className="mt-3 h-5 w-5 text-[#C8102E]" />

            <h3 className="mt-3 text-lg font-black text-slate-950">
                {title}
            </h3>

            <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                {description}
            </p>
        </article>
    );
}

function ProvisionItem({
    number,
    text,
}: {
    number: string;
    text: string;
}) {
    return (
        <article className="group grid gap-4 border-b border-slate-300 py-5 sm:grid-cols-[56px_28px_minmax(0,1fr)]">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <CheckCircle2 className="mt-1 h-5 w-5 text-[#C8102E]" />

            <p className="text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                {text}
            </p>
        </article>
    );
}

function RequirementItem({
    title,
    description,
    icon: Icon,
}: {
    title: string;
    description: string;
    icon: typeof Vote;
}) {
    return (
        <article className="border-b border-slate-300 py-5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
            <Icon className="h-5 w-5 text-[#C8102E]" />

            <h3 className="mt-3 text-lg font-black text-slate-950">
                {title}
            </h3>

            <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                {description}
            </p>
        </article>
    );
}

function ProcessItem({
    step,
    title,
    description,
}: {
    step: string;
    title: string;
    description: string;
}) {
    return (
        <article className="group border-b border-slate-300 py-5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {step}
            </p>

            <h3 className="mt-3 text-lg font-black text-slate-950">
                {title}
            </h3>

            <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                {description}
            </p>
        </article>
    );
}

function RecordItem({
    number,
    title,
}: {
    number: string;
    title: string;
}) {
    return (
        <article className="group border-b border-slate-300 py-5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <div className="mt-3 flex items-center gap-3">
                <CircleDot className="h-4 w-4 text-[#C8102E]" />

                <h3 className="text-sm font-black text-slate-800">
                    {title}
                </h3>
            </div>
        </article>
    );
}

function PrincipleItem({
    number,
    title,
}: {
    number: string;
    title: string;
}) {
    return (
        <article className="group flex min-h-24 items-start gap-4 border-b border-slate-300 py-5 transition hover:bg-red-50/50 sm:border-r sm:px-5 sm:[&:nth-child(2n)]:border-r-0">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {number}
            </p>

            <div>
                <BadgeCheck className="h-5 w-5 text-[#C8102E]" />

                <h3 className="mt-2 text-sm font-black leading-6 text-slate-800">
                    {title}
                </h3>
            </div>
        </article>
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
            className="group flex min-h-24 items-center gap-3 border-b border-slate-300 py-4 transition hover:bg-red-50/60 last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
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

                <h3 className="mt-1.5 text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>
            </div>

            {direction === "right" ? (
                <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
            ) : null}
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
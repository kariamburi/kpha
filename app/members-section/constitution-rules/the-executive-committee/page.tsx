// app/members-section/constitution-rules/the-executive-committee/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    ClipboardCheck,
    Landmark,
    Vote,
    BookOpenCheck,
    Building2,
    CalendarDays,
    ChevronRight,
    FileCheck2,
    Gavel,
    Home,
    ListChecks,
    Network,
    Scale,
    ShieldAlert,
    Users,
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
                    { name: "Constitution & Rules", url: "/members-section/constitution-rules" },
                    { name: "The Executive Committee", url: pagePath },
                ]}
            />
            <ExecutiveCommitteeJsonLd />
            <PageHeader />

            <section className="border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
                    <Breadcrumb />
                    <div className="mt-4 max-w-5xl">
                        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                            The Executive<span className="text-[#C8102E]">{"\u00A0"}Committee</span>
                        </h1>
                        <p className="mt-2 max-w-4xl text-sm font-medium leading-6 text-slate-600 sm:text-base">
                            The composition, powers, meetings and constitutional authority of the Association&apos;s Executive Committee.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <figure>
                        <div className="aspect-[16/6] max-h-[330px] overflow-hidden bg-slate-100">
                            <img
                                src="/executive-committee.webp"
                                alt="The Executive Committee of the Association of Hotel Professionals Kenya"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs font-medium leading-5 text-slate-500 sm:px-0">
                            The Executive Committee manages the Association&apos;s affairs and property in accordance with the Constitution and Bye-Laws.
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section className="py-6 sm:py-8">
                <div className="mx-auto grid max-w-7xl gap-7 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_270px] lg:px-8">
                    <article className="min-w-0 space-y-7">
                        <section id="executive-committee" className="scroll-mt-28">
                            <SectionTitle icon={Users} title="The Executive Committee" />
                            <p className="mt-3 border-l-4 border-[#C8102E] bg-slate-50 px-4 py-3 text-sm font-semibold leading-7 text-slate-700">
                                The Executive Committee is responsible for managing the property, affairs and governance of the Association in accordance with the Constitution and Bye-Laws. It provides leadership, oversees administration and ensures that the Association&apos;s objectives are advanced.
                            </p>
                        </section>

                        <section id="composition" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <SectionTitle icon={Network} title="Composition of the Executive Committee" />
                            <p className="mt-2 text-sm leading-6 text-slate-600">The Executive Committee brings together all Office Bearers and additional elected members.</p>
                            <CompactDetails items={committeeComposition} />
                        </section>

                        <section id="powers-duties" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <SectionTitle icon={Scale} title="Proceedings, Powers & Duties" />
                            <p className="mt-2 text-sm leading-6 text-slate-600">The Executive Committee has constitutional authority to manage the Association and organize its governance activities.</p>
                            <CompactDetails items={powersAndDuties} />
                        </section>

                        <section id="meetings" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <SectionTitle icon={CalendarDays} title="Meetings of the Association" />
                            <p className="mt-2 text-sm leading-6 text-slate-600">Meetings shall be held at the places and times appointed by the Executive Committee.</p>
                            <CompactDetails items={meetingTypes} />
                        </section>

                        <section id="meeting-proceedings" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <SectionTitle icon={ListChecks} title="Proceedings at Meetings" />
                            <p className="mt-2 text-sm leading-6 text-slate-600">The Constitution establishes the quorum, notice, voting and presiding requirements for General Meetings.</p>
                            <CompactBullets items={meetingProceedings} />
                        </section>

                        <section id="constitutional-amendments" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <SectionTitle icon={FileCheck2} title="Amendment to the Constitution" />
                            <p className="mt-2 text-sm leading-6 text-slate-600">Any amendment to the Constitution must satisfy both the Association&apos;s voting requirement and the applicable regulatory approval process.</p>
                            <CompactDetails items={[
                                { title: "Two-Thirds Majority", description: "The proposed amendment must be approved by at least a two-thirds majority." },
                                { title: "Registrar's Consent", description: "The amendment may only be implemented after obtaining the prior written consent of the Registrar of Societies." },
                            ]} />
                        </section>

                        <section id="branches" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <SectionTitle icon={Building2} title="Formation of Branches" />
                            <p className="mt-2 text-sm leading-6 text-slate-600">Branches may be established through a constitutional recommendation and approval process.</p>
                            <CompactDetails items={[
                                { title: "Committee Recommendation", description: "The Executive Committee recommends the formation of a branch." },
                                { title: "Member Approval", description: "Members approve the recommendation at a General or Special General Meeting." },
                                { title: "Registrar Notification", description: "The recommendation is notified to the Registrar of Societies before adoption." },
                            ]} />
                        </section>

                        <section id="dissolution" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <SectionTitle icon={ShieldAlert} title="Dissolution of the Association" />
                            <p className="mt-3 border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-sm leading-7 text-slate-700">
                                The Association shall not be dissolved except through a resolution passed at a General Meeting by a vote of at least two-thirds of the members present. The meeting must also satisfy the quorum requirements established by the Constitution.
                            </p>
                        </section>

                        <section id="inspection" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <SectionTitle icon={BookOpenCheck} title="Inspection of Accounts & Members Register" />
                            <p className="mt-2 text-sm leading-6 text-slate-600">Association officers and members may inspect specified records through the constitutional notice procedure.</p>
                            <CompactBullets items={["Books of Account", "Supporting Documents", "Register of Members"]} />
                            <CompactDetails items={[
                                { title: "Seven Days' Notice", description: "The requesting officer or member must give the Association at least seven days' written notice." },
                                { title: "Registered Office", description: "Inspection shall take place at the registered office of the Association." },
                            ]} />
                        </section>

                        <section id="governance-principles" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <SectionTitle icon={Gavel} title="Governance Principles" />
                            <p className="mt-2 text-sm leading-6 text-slate-600">The Executive Committee is expected to exercise its constitutional authority in a manner that protects the Association, serves its members and promotes effective governance.</p>
                            <CompactBullets items={governancePrinciples} />
                        </section>

                    </article>

                    <aside className="lg:sticky lg:top-28 lg:self-start">
                        <div className="border-t-4 border-[#C8102E]">
                            <h2 className="border-b border-slate-200 py-3 text-sm font-black">On This Page</h2>
                            <nav aria-label="Executive Committee page navigation" className="divide-y divide-slate-100">
                                {[
                                    ["Executive Committee", "executive-committee"],
                                    ["Composition", "composition"],
                                    ["Powers & Duties", "powers-duties"],
                                    ["Meetings", "meetings"],
                                    ["Meeting Proceedings", "meeting-proceedings"],
                                    ["Constitutional Amendments", "constitutional-amendments"],
                                    ["Branches", "branches"],
                                    ["Dissolution", "dissolution"],
                                    ["Inspection of Accounts", "inspection"],
                                    ["Governance Principles", "governance-principles"],
                                ].map(([label, id]) => (
                                    <a key={id} href={`#${id}`} className="flex items-center justify-between gap-2 py-2.5 text-sm font-semibold text-slate-600 transition hover:text-[#C8102E]">
                                        {label}<ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="mt-5 border-t-4 border-slate-900 bg-slate-50 p-4">
                            <h2 className="text-sm font-black">Constitution &amp; Rules</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Review the constitutional framework governing AHPK&apos;s objectives, membership, leadership and administration.</p>
                            <Link href="/members-section/constitution-rules" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#C8102E]">View Constitution Section <ArrowRight className="h-4 w-4" /></Link>
                        </div>
                    </aside>
                </div>
            </section>
            <PublicFooter />
        </main>
    );
}

type Detail = { title: string; description: string };

function SectionTitle({ icon: Icon, title }: { icon: typeof Users; title: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <Icon className="h-5 w-5 shrink-0 text-[#C8102E]" aria-hidden="true" />
            <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
        </div>
    );
}

function CompactDetails({ items }: { items: readonly Detail[] }) {
    return (
        <ul className="mt-3 space-y-2.5">
            {items.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-sm leading-7 text-slate-700 sm:text-[15px]">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8102E]" aria-hidden="true" />
                    <span><strong className="font-extrabold text-slate-950">{item.title}:</strong> {item.description}</span>
                </li>
            ))}
        </ul>
    );
}

function CompactBullets({ items }: { items: readonly string[] }) {
    return (
        <ul className="mt-3 space-y-2">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-700 sm:text-[15px]">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8102E]" aria-hidden="true" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
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
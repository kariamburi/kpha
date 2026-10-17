import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Crown, Home, BookOpenCheck, ShieldCheck, Users, Mail, ClipboardPenLine, WalletCards, HandCoins } from "lucide-react";
import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath =
    "/members-section/constitution-rules/office-bearers-duties";

export const metadata: Metadata = {
    title: "Office Bearers & Duties",

    description:
        "Learn about AHPK's elected Office Bearers, their constitutional eligibility requirements and the duties of the Chairman, Vice Chairman, Secretary, Assistant Secretary and Treasurer.",

    keywords: [
        "AHPK office bearers",
        "AHPK leadership duties",
        "AHPK chairman",
        "AHPK secretary",
        "AHPK treasurer",
        "hotel professionals association Kenya",
        "AHPK constitution and rules",
        "Association of Hotel Professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Office Bearers & Duties | Association of Hotel Professionals Kenya",
        description:
            "Explore AHPK's elected leadership positions, eligibility requirements and constitutional responsibilities.",
        url: pagePath,
        siteName:
            "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "article",
        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt: "AHPK executive leadership and office bearers",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Office Bearers & Duties | AHPK",
        description:
            "Learn about AHPK's elected office bearers and their constitutional leadership duties.",
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

const officeBearers = [
    {
        title: "Chairman",
        description:
            "Provides leadership, presides over meetings and represents the Association as its principal spokesperson.",
        icon: Crown,
    },
    {
        title: "Vice Chairman",
        description:
            "Supports the Chairman and performs the Chairman's duties whenever the Chairman is absent.",
        icon: Users,
    },
    {
        title: "Secretary",
        description:
            "Oversees correspondence, meeting records and the preservation of the Association's official proceedings.",
        icon: Mail,
    },
    {
        title: "Assistant Secretary",
        description:
            "Assists the Secretary and performs duties assigned by the Secretary or the Committee.",
        icon: ClipboardPenLine,
    },
    {
        title: "Treasurer",
        description:
            "Oversees the receipt, disbursement and proper recording of the Association's funds.",
        icon: WalletCards,
    },
];

const eligibilityRules = [
    "Every Office Bearer shall be a fully paid-up member of the Association.",
    "Office Bearers shall be elected at the Annual General Meeting.",
    "Each Office Bearer shall hold office from the date of election until the succeeding Annual General Meeting.",
    "An Office Bearer automatically ceases to hold office upon ceasing to be a member of the Association.",
];

const leadershipDuties = [
    {
        id: "chairman",
        title: "The Chairman",
        eyebrow: "Principal leadership",
        icon: Crown,
        duties: [
            "Preside over all meetings unless prevented by illness or another sufficient cause.",
            "Act as the official spokesperson of the Association.",
            "Cast an additional deciding vote where voting results in a tie.",
        ],
    },
    {
        id: "vice-chairman",
        title: "The Vice Chairman",
        eyebrow: "Deputy leadership",
        icon: Users,
        duties: [
            "Perform the duties of the Chairman whenever the Chairman is absent.",
            "Carry out any other functions delegated by the Chairman.",
        ],
    },
    {
        id: "secretary",
        title: "The Secretary",
        eyebrow: "Administration and records",
        icon: Mail,
        duties: [
            "Handle the official correspondence of the Association.",
            "In urgent matters where the Committee cannot be consulted, seek guidance from the Chairman or Vice Chairman on matters requiring higher authority.",
            "Keep accurate minutes of meetings and proceedings.",
            "Preserve the Association's official records and documentation.",
        ],
    },
    {
        id: "assistant-secretary",
        title: "The Assistant Secretary",
        eyebrow: "Secretarial support",
        icon: ClipboardPenLine,
        duties: [
            "Perform the duties of the Secretary whenever required.",
            "Carry out any other responsibilities assigned by the Secretary or the Committee.",
        ],
    },
    {
        id: "treasurer",
        title: "The Treasurer",
        eyebrow: "Financial stewardship",
        icon: HandCoins,
        duties: [
            "Receive and disburse all money belonging to the Association.",
            "Issue receipts for all money received or otherwise handled.",
            "Have unrestricted access to relevant financial information in order to confirm that proper books of account are maintained.",
            "Ensure that the Association's accounting records remain available for inspection.",
        ],
    },
];

const leadershipPrinciples = [
    "Accountability",
    "Integrity",
    "Transparency",
    "Service to Members",
    "Constitutional Compliance",
];


export default function OfficeBearersDutiesPage() {
    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd items={[
                { name: "Home", url: "/" },
                { name: "Members Section", url: "/members-section" },
                { name: "Constitution & Rules", url: "/members-section/constitution-rules" },
                { name: "Office Bearers & Duties", url: pagePath },
            ]} />
            <OfficeBearersJsonLd />
            <PageHeader />

            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
                    <Breadcrumb />
                    <div className="mt-4 max-w-5xl">
                        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                            Office Bearers<span className="text-[#C8102E]">{"\u00A0"}&amp; Their Duties</span>
                        </h1>
                        <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-slate-600 sm:text-base">
                            AHPK&apos;s elected leadership positions and the constitutional responsibilities entrusted to each Office Bearer.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
                    <figure>
                        <div className="aspect-[16/5] max-h-[310px] overflow-hidden bg-slate-100">
                            <img src="/ahpk_boardroom_meeting.webp" alt="AHPK executive leadership and office bearers" className="h-full w-full object-cover object-center" />
                        </div>
                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs leading-5 text-slate-500 sm:px-0">
                            Office Bearers provide leadership, governance and administrative oversight in accordance with the Constitution.
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section className="py-7 sm:py-8">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start">
                        <article className="min-w-0 space-y-7">
                            <section id="office-bearers" className="scroll-mt-28 border-t-4 border-[#C8102E] pt-4">
                                <SectionTitle title="Elected Office Bearers" icon={<Crown className="h-5 w-5" />} />
                                <p className="mt-3 border-l-4 border-[#C8102E] bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-700">
                                    The Office Bearers provide strategic leadership, governance and administrative oversight of the Association. They are elected by members at the Annual General Meeting and serve until the succeeding Annual General Meeting in accordance with the Constitution.
                                </p>
                                <ul className="mt-4 space-y-2.5">
                                    {officeBearers.map((office) => (
                                        <li key={office.title} className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-[15px]">
                                            <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" />
                                            <span><strong className="font-extrabold text-slate-900">{office.title}:</strong> {office.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section id="eligibility" className="scroll-mt-28 border-t border-slate-200 pt-5">
                                <SectionTitle title="Requirements for All Office Bearers" />
                                <p className="mt-2 text-sm leading-6 text-slate-600">Every elected Office Bearer must satisfy the Association&apos;s membership, election and tenure requirements.</p>
                                <ul className="mt-3 space-y-2.5">
                                    {eligibilityRules.map((rule) => (
                                        <li key={rule} className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-[15px]">
                                            <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" />
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section id="duties" className="scroll-mt-28 border-t border-slate-200 pt-5">
                                <SectionTitle title="Duties of Office Bearers" />
                                <p className="mt-2 text-sm leading-6 text-slate-600">Each office carries specific responsibilities designed to ensure effective leadership, administration and financial accountability.</p>
                                <div className="mt-4 space-y-5">
                                    {leadershipDuties.map((office) => (
                                        <section key={office.id} id={office.id} className="scroll-mt-28 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                                            <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">{office.title}</h3>
                                            <ul className="mt-2 space-y-2">
                                                {office.duties.map((duty) => (
                                                    <li key={duty} className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-[15px]">
                                                        <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" />
                                                        <span>{duty}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    ))}
                                </div>
                            </section>

                            <section id="leadership-principles" className="scroll-mt-28 border-t border-slate-200 pt-5">
                                <SectionTitle title="Leadership Responsibilities" />
                                <p className="mt-2 text-sm leading-6 text-slate-600">Office Bearers are expected to exercise their authority in a manner that protects the Association, serves its members and upholds the Constitution.</p>
                                <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                                    {leadershipPrinciples.map((principle) => (
                                        <li key={principle} className="flex items-center gap-3 text-sm font-bold leading-6 text-slate-700">
                                            <span className="h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" />{principle}
                                        </li>
                                    ))}
                                </ul>
                            </section>




                        </article>

                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <nav aria-label="Office bearers page navigation" className="border-t-4 border-[#C8102E] pt-3">
                                <h2 className="text-base font-extrabold text-slate-900">On This Page</h2>
                                <div className="mt-2 divide-y divide-slate-200">
                                    {[
                                        { href: "#office-bearers", title: "Elected Office Bearers" },
                                        { href: "#eligibility", title: "Eligibility & Tenure" },
                                        { href: "#duties", title: "Duties" },
                                        { href: "#chairman", title: "Chairman" },
                                        { href: "#vice-chairman", title: "Vice Chairman" },
                                        { href: "#secretary", title: "Secretary" },
                                        { href: "#assistant-secretary", title: "Assistant Secretary" },
                                        { href: "#treasurer", title: "Treasurer" },
                                        { href: "#leadership-principles", title: "Leadership Principles" },
                                    ].map((item) => (
                                        <Link key={item.href} href={item.href} className="flex items-center justify-between gap-2 py-2 text-sm font-semibold text-slate-600 hover:text-[#C8102E]">
                                            {item.title}<ChevronRight className="h-4 w-4 shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            </nav>
                            <div className="border-t-4 border-slate-900 bg-slate-50 p-4">
                                <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900"><BookOpenCheck className="h-5 w-5 text-[#C8102E]" />Constitution &amp; Rules</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-600">Review the constitutional framework governing AHPK&apos;s objectives, membership, leadership and administration.</p>
                                <Link href="/members-section/constitution-rules" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#C8102E]">View Constitution Section <ArrowRight className="h-4 w-4" /></Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            <PublicFooter />
        </main>
    );
}

function SectionTitle({ title, icon }: { title: string; icon?: React.ReactNode }) {
    return <h2 className="flex items-center gap-2.5 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{icon ? <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-slate-950 text-white">{icon}</span> : null}{title}</h2>;
}

function RelatedLink({ href, title, previous = false }: { href: string; title: string; previous?: boolean }) {
    return <Link href={href} className="flex items-center gap-2 border border-slate-200 px-4 py-3 text-sm font-extrabold text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]">
        {previous ? <ArrowLeft className="h-4 w-4 shrink-0 text-[#C8102E]" /> : null}
        <span className={previous ? "" : "flex-1"}>{title}</span>
        {!previous ? <ArrowRight className="h-4 w-4 shrink-0 text-[#C8102E]" /> : null}
    </Link>;
}

function OfficeBearersJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/constitution-rules/office-bearers-duties#article",
        url:
            "https://ahpk.or.ke/members-section/constitution-rules/office-bearers-duties",
        headline: "Office Bearers & Duties",
        description:
            "AHPK constitutional provisions governing the elected Office Bearers and the duties of the Chairman, Vice Chairman, Secretary, Assistant Secretary and Treasurer.",
        inLanguage: "en-KE",

        isPartOf: {
            "@type": "WebSite",
            "@id": "https://ahpk.or.ke/#website",
            name:
                "Association of Hotel Professionals Kenya",
            url: "https://ahpk.or.ke",
        },

        publisher: {
            "@type": "Organization",
            "@id": "https://ahpk.or.ke/#organization",
            name:
                "Association of Hotel Professionals Kenya",
            alternateName: "AHPK",
            url: "https://ahpk.or.ke",
        },

        mainEntity: {
            "@type": "ItemList",
            name: "AHPK Office Bearers and Duties",
            numberOfItems: leadershipDuties.length,
            itemListElement: leadershipDuties.map(
                (office, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                        "@type": "DefinedTerm",
                        name: office.title,
                        description: office.duties.join(" "),
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

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Office Bearers &amp; Duties
            </span>
        </nav>
    );
}
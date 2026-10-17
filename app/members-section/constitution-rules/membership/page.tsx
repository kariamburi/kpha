// app/members-section/constitution-rules/membership/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft, ArrowRight, BadgeCheck, BookUser, ChevronRight,
    GraduationCap, Home, ShieldAlert, ShieldCheck, Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath = "/members-section/constitution-rules/membership";

export const metadata: Metadata = {
    title: "Membership",

    description:
        "Learn about AHPK membership requirements, rights, privileges, eligibility criteria, subscriptions and constitutional membership rules.",

    keywords: [
        "AHPK membership",
        "AHPK constitution membership",
        "hotel professionals membership Kenya",
        "hospitality association Kenya",
        "AHPK membership requirements",
        "hospitality professionals Kenya",
        "Association of Hotel Professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Membership | Association of Hotel Professionals Kenya",
        description:
            "Explore AHPK membership eligibility, rights, privileges, responsibilities, subscriptions and constitutional provisions.",
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
                alt: "Members of the Association of Hotel Professionals Kenya",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Membership | AHPK",
        description:
            "Learn about AHPK membership eligibility, privileges, responsibilities and constitutional provisions.",
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

const membershipCategories = [
    "Honorary Member",
    "Fellow Member",
    "Student Member",
];

const membershipPrinciples = [
    "Professional integrity",
    "Constitutional compliance",
    "Active participation",
    "Continuous professional growth",
    "Respect for the Code of Ethics",
];

const sections = [
    {
        id: "membership-register",
        title: "Membership Register",
        description:
            "The name and address of every member shall be entered and maintained in the official register of the Association.",
    },
    {
        id: "personal-membership-rights",
        title: "Personal Membership Rights",
        description:
            "Membership rights and privileges are personal to each member and shall not be transferable or transmissible to another person.",
    },
    {
        id: "membership-privileges",
        title: "Membership Privileges",
        description:
            "Members shall enjoy only the rights and privileges specified for their approved membership category and criterion.",
    },
];

const disciplinaryRules = [
    {
        title: "Expulsion",
        description:
            "A member may be expelled from the Association where the Executive Committee recommends removal in accordance with the Constitution.",
    },
    {
        title: "Resignation or Removal",
        description:
            "A person who resigns or is removed from membership shall not be entitled to a refund of any subscription already paid.",
    },
    {
        title: "Subscription Default",
        description:
            "Failure to pay membership subscriptions for more than six months shall automatically lead to expulsion from the Association.",
    },
];


export default function MembershipPage() {
    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd items={[
                { name: "Home", url: "/" },
                { name: "Members Section", url: "/members-section" },
                { name: "Constitution & Rules", url: "/members-section/constitution-rules" },
                { name: "Membership", url: pagePath },
            ]} />
            <MembershipJsonLd />
            <PageHeader />

            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
                    <Breadcrumb />
                    <div className="mt-4 max-w-5xl">
                        <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                            Membership <span className="text-[#C8102E]">Rights &amp; Responsibilities</span>
                        </h1>
                        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                            AHPK membership is founded on professional qualifications, ethical conduct and a commitment to advancing Kenya&apos;s hospitality industry.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
                    <figure>
                        <div className="aspect-[16/5] overflow-hidden bg-slate-100">
                            <Image src="/membership-criterion-levels-hero.webp" alt="Members of the Association of Hotel Professionals Kenya" width={1536} height={600} className="h-full w-full object-cover" priority />
                        </div>
                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs text-slate-500 sm:px-0">
                            Membership recognizes professional competence, integrity and a shared commitment to excellence in hospitality.
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section className="py-6 sm:py-8">
                <div className="mx-auto grid max-w-7xl gap-7 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:px-8">
                    <article className="min-w-0 space-y-7">
                        <section id="membership-overview" className="scroll-mt-28 border-t-4 border-[#C8102E] pt-4">
                            <h2 className="flex items-center gap-2.5 text-xl font-black text-slate-950 sm:text-2xl">
                                <Users className="h-5 w-5 shrink-0 text-[#C8102E]" /> Membership of the Association
                            </h2>
                            <p className="mt-3 border-l-4 border-[#C8102E] bg-slate-50 px-4 py-3 text-sm font-medium leading-7 text-slate-700">
                                Membership in AHPK recognizes individuals who demonstrate professional competence, integrity and dedication to excellence in the hospitality industry. Members enjoy the rights and privileges granted under the Constitution while upholding the Association&apos;s standards and values.
                            </p>
                        </section>

                        <section id="membership-register" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <h2 className="flex items-center gap-2.5 text-xl font-black text-slate-950 sm:text-2xl"><BookUser className="h-5 w-5 text-[#C8102E]" /> Register, Rights &amp; Privileges</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Membership records, rights and privileges are administered according to the Association&apos;s constitutional provisions.</p>
                            <ul className="mt-3 space-y-2.5">
                                {sections.map((item) => (
                                    <li id={item.id} key={item.id} className="scroll-mt-28 flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-[15px]">
                                        <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" />
                                        <span><strong className="font-extrabold text-slate-950">{item.title}:</strong> {item.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section id="membership-eligibility" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <h2 className="flex items-center gap-2.5 text-xl font-black text-slate-950 sm:text-2xl"><GraduationCap className="h-5 w-5 text-[#C8102E]" /> Membership Eligibility</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Admission is based on the applicant&apos;s membership category, professional qualifications and hospitality industry experience.</p>
                            <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-700 sm:text-[15px]">
                                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" /><span><strong className="text-slate-950">Membership Categories:</strong> Any person who qualifies may be elected to an appropriate membership category, including {membershipCategories.join(", ")}.</span></li>
                                <li className="flex items-start gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" /><span><strong className="text-slate-950">Professional Qualification:</strong> A person holding a three-year diploma from a reputable college and who demonstrates an acceptable professional career in the hospitality industry shall be eligible for membership consideration.</span></li>
                            </ul>
                        </section>

                        <section id="membership-discipline" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <h2 className="flex items-center gap-2.5 text-xl font-black text-slate-950 sm:text-2xl"><ShieldAlert className="h-5 w-5 text-[#C8102E]" /> Membership Discipline</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">Membership may end through resignation, removal or failure to meet the Association&apos;s subscription obligations.</p>
                            <ul className="mt-3 space-y-2.5">
                                {disciplinaryRules.map((rule) => (
                                    <li key={rule.title} className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-[15px]"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" /><span><strong className="font-extrabold text-slate-950">{rule.title}:</strong> {rule.description}</span></li>
                                ))}
                            </ul>
                        </section>

                        <section id="membership-principles" className="scroll-mt-28 border-t border-slate-200 pt-5">
                            <h2 className="flex items-center gap-2.5 text-xl font-black text-slate-950 sm:text-2xl"><ShieldCheck className="h-5 w-5 text-[#C8102E]" /> Core Membership Principles</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">AHPK members are expected to uphold the values that strengthen the Association and protect the reputation of the hospitality profession.</p>
                            <ul className="mt-3 grid gap-x-4 gap-y-2 sm:grid-cols-2">
                                {membershipPrinciples.map((principle) => <li key={principle} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#C8102E]" />{principle}</li>)}
                            </ul>
                        </section>




                    </article>
                    <aside className="self-start border-t-4 border-[#C8102E] bg-slate-50 p-4 lg:sticky lg:top-28">
                        <h2 className="text-base font-black text-slate-950">On This Page</h2>
                        <nav aria-label="Membership page navigation" className="mt-3 flex flex-col divide-y divide-slate-200">
                            {[
                                ["#membership-overview", "Membership Overview"],
                                ["#membership-register", "Register & Rights"],
                                ["#membership-eligibility", "Membership Eligibility"],
                                ["#membership-discipline", "Membership Discipline"],
                                ["#membership-principles", "Membership Principles"],
                            ].map(([href, label]) => <Link key={href} href={href} className="flex items-center justify-between gap-2 py-2.5 text-sm font-semibold text-slate-700 transition hover:text-[#C8102E]">{label}<ChevronRight className="h-4 w-4 shrink-0 text-[#C8102E]" /></Link>)}
                        </nav>
                        <Link href="/members-section/constitution-rules" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#C8102E] hover:underline">View Constitution &amp; Rules <ArrowRight className="h-4 w-4" /></Link>
                    </aside>
                </div>
            </section>
            <PublicFooter />
        </main>
    );
}

function MembershipJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/constitution-rules/membership#article",
        url:
            "https://ahpk.or.ke/members-section/constitution-rules/membership",
        headline: "Membership",
        description:
            "AHPK constitutional membership provisions covering the membership register, rights, privileges, eligibility, subscriptions, resignation and expulsion.",
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
            name: "AHPK Membership Provisions",
            numberOfItems: 8,
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Membership Register",
                    description:
                        "The name and address of every member shall be entered in the official register.",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Personal Membership Rights",
                    description:
                        "Membership rights and privileges shall not be transferable or transmissible.",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Membership Privileges",
                    description:
                        "Privileges shall be limited to those specified for each membership criterion.",
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    name: "Membership Categories",
                    description:
                        "Qualified applicants may be elected as Honorary, Fellow or Student members.",
                },
                {
                    "@type": "ListItem",
                    position: 5,
                    name: "Professional Qualification",
                    description:
                        "A three-year diploma and acceptable hospitality industry career may qualify an applicant for membership.",
                },
                {
                    "@type": "ListItem",
                    position: 6,
                    name: "Expulsion",
                    description:
                        "A member may be expelled where the Executive Committee recommends removal.",
                },
                {
                    "@type": "ListItem",
                    position: 7,
                    name: "No Subscription Refund",
                    description:
                        "A person who resigns or is removed shall not receive a refund of subscriptions paid.",
                },
                {
                    "@type": "ListItem",
                    position: 8,
                    name: "Subscription Default",
                    description:
                        "Non-payment of subscriptions for more than six months shall automatically lead to expulsion.",
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

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Membership
            </span>
        </nav>
    );
}
// app/members-section/membership-criterion-levels/page.tsx

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    ArrowRight,
    Award,
    BadgeCheck,
    BookOpenCheck,
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    ChevronRight,
    CircleDot,
    Compass,
    FileText,
    GraduationCap,
    Handshake,
    Home,
    Hotel,
    Landmark,
    Lightbulb,
    Network,
    Scale,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath = "/members-section/membership-criterion-levels";

export const metadata: Metadata = {
    title:
        "Membership Criterion & Levels | Association of Hotel Professionals Kenya",

    description:
        "Discover AHPK membership eligibility, professional recognition, represented hospitality sectors and the career, networking and industry benefits available to members.",

    keywords: [
        "AHPK membership",
        "hotel professionals Kenya",
        "hospitality association membership",
        "hospitality careers Kenya",
        "professional hospitality recognition",
        "hotel managers association",
        "hospitality networking Kenya",
        "Association of Hotel Professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Membership Criterion & Levels | Association of Hotel Professionals Kenya",
        description:
            "Learn who can join AHPK and explore the professional, career, networking and industry benefits available to members.",
        url: pagePath,
        siteName: "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "article",
        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt: "Hospitality professionals participating in an AHPK membership forum",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Membership Criterion & Levels | AHPK",
        description:
            "Explore AHPK membership eligibility, professional recognition and member benefits.",
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

const membershipReasons = [
    {
        title: "Industry Connection",
        description:
            "Gain access to key professionals, institutions and resources that influence the hospitality industry.",
        icon: Network,
    },
    {
        title: "Professional Community",
        description:
            "Join a growing network of individual hoteliers, corporate organisations, hotel chains and training institutions.",
        icon: Users,
    },
    {
        title: "Career Advancement",
        description:
            "Access professional recognition, career intelligence, learning opportunities and leadership pathways.",
        icon: TrendingUp,
    },
    {
        title: "Industry Representation",
        description:
            "Participate in an association that promotes professional standards and addresses matters affecting hospitality practitioners.",
        icon: Landmark,
    },
];

const memberSectors = [
    "Hotels",
    "Restaurants",
    "Bars",
    "Entertainment",
    "Events",
    "Conventions",
    "Cruise Ships",
    "Airlines",
    "Hospitality Training Institutions",
    "Tourism Training Institutions",
    "Hospitality Consultants",
    "Industry Suppliers",
    "Allied Hospitality Practitioners",
];

const affiliateMembers = [
    {
        title: "Independent Establishments",
        description:
            "Individual hotels and restaurants operating independently within the hospitality industry.",
        icon: Hotel,
    },
    {
        title: "Chain-Affiliated Businesses",
        description:
            "Hotels, restaurants and hospitality establishments operating as part of recognised chains.",
        icon: Building2,
    },
    {
        title: "Training Institutions",
        description:
            "Institutions offering hospitality and tourism modules, professional instruction and practical training.",
        icon: GraduationCap,
    },
    {
        title: "Industry Stakeholders",
        description:
            "Suppliers, consultants and allied practitioners who support hospitality operations and professional growth.",
        icon: Handshake,
    },
];

const benefitGroups = [
    {
        id: "career-development",
        title: "Career & Professional Development",
        description:
            "Opportunities that strengthen professional credibility, career planning and long-term advancement.",
        icon: TrendingUp,
        benefits: [
            "Professional recognition within the hospitality industry and beyond",
            "Job placement support and career networking",
            "Career planning intelligence for members",
            "Career talks and professional development forums",
            "Career growth through the sharing of data, knowledge and experience",
            "Leadership opportunities through forums and volunteer groups",
        ],
    },
    {
        id: "networking",
        title: "Networking & Industry Connections",
        description:
            "Connections that help members exchange knowledge, access opportunities and build professional relationships.",
        icon: Network,
        benefits: [
            "Access to a large and growing professional hospitality network",
            "Connections with individual hoteliers, corporate organisations, hotel chains and institutions",
            "Publication of a members' and professionals' directory",
            "A professional data bank for organisations seeking qualified hospitality professionals",
            "Participation in industry forums and collaborative groups",
        ],
    },
    {
        id: "business-opportunities",
        title: "Consultancy & Business Opportunities",
        description:
            "Platforms that allow members to contribute expertise and participate in hospitality projects.",
        icon: BriefcaseBusiness,
        benefits: [
            "Opportunities for members to offer consultancy services",
            "Development of project proposals for funding",
            "Professional collaboration between members and institutions",
            "Opportunities to contribute specialist knowledge to hospitality initiatives",
        ],
    },
    {
        id: "education-research",
        title: "Education, Research & Industry Intelligence",
        description:
            "Resources that keep members informed and support evidence-based development across the industry.",
        icon: BookOpenCheck,
        benefits: [
            "Sourcing and distributing internship opportunities to training institutions",
            "Keeping members informed about emerging industry trends",
            "Research on matters of concern to the hospitality industry",
            "Use of research findings for the benefit of the industry",
            "Publication of association periodicals and magazines",
            "Opportunities for members to publish relevant and value-adding articles",
        ],
    },
    {
        id: "professional-support",
        title: "Professional, Legal & Workplace Support",
        description:
            "Guidance and representation for members facing professional, labour-related and regulatory matters.",
        icon: Scale,
        benefits: [
            "Support for members handling labour-related arbitration",
            "Professional guidance on matters affecting hospitality practitioners",
            "Legal guidance on issues affecting the profession",
            "Establishment and promotion of a code of ethics and conduct",
            "Industry representation and professional advocacy",
        ],
    },
];

const membershipValues = [
    {
        title: "Professional Recognition",
        icon: Award,
    },
    {
        title: "Career Growth",
        icon: TrendingUp,
    },
    {
        title: "Industry Networking",
        icon: Network,
    },
    {
        title: "Leadership",
        icon: Landmark,
    },
    {
        title: "Knowledge Sharing",
        icon: Lightbulb,
    },
    {
        title: "Professional Support",
        icon: ShieldCheck,
    },
];

export default function MembershipCriterionLevelsPage() {
    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: "Home",
                        url: "/",
                    },
                    {
                        name: "Members Section",
                        url: "/members-section",
                    },
                    {
                        name: "Membership Criterion & Levels",
                        url: pagePath,
                    },
                ]}
            />

            <MembershipCriterionJsonLd />

            <PageHeader />

            {/* HERO */}
            <section className="relative isolate min-h-[calc(100vh-82px)] overflow-hidden border-b border-slate-200 bg-white lg:min-h-[calc(100svh-82px)]">
                <div className="absolute inset-0 -z-30">
                    <img
                        src="/membership-criterion-levels-hero.webp"
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
                                    <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                                        Members Section
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        Professional Membership
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                                Membership Criterion
                                <span className="mt-2 block text-[#C8102E]">
                                    &amp; Levels
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                Discover who can join AHPK, the professional
                                community represented by the Association and
                                the career, networking and industry benefits
                                available to members.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                                {[
                                    "Recognition",
                                    "Career Growth",
                                    "Networking",
                                    "Leadership",
                                    "Industry Support",
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
                                    AHPK connects hospitality professionals,
                                    businesses and institutions through
                                    recognition, knowledge, opportunity and
                                    industry leadership.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent sm:h-20" />
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        <article className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9 lg:p-12">
                            {/* ABOUT */}
                            <section
                                id="about-membership"
                                className="scroll-mt-28"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <Hotel className="h-7 w-7" />
                                </div>

                                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                    About membership
                                </p>

                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    Membership Designed for Hospitality
                                    Professionals
                                </h2>

                                <div className="mt-7 space-y-5 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                    <p>
                                        AHPK understands that running a hotel
                                        involves far more than providing guests
                                        with a comfortable night&apos;s sleep. It
                                        also requires an understanding of the
                                        legislation and regulations governing
                                        the profession and the ability to remain
                                        ahead of changing competition.
                                    </p>

                                    <p>
                                        The Association focuses on what happens
                                        behind the scenes: the professional
                                        knowledge, systems, relationships and
                                        resources that help hospitality
                                        destinations operate smoothly, remain
                                        cost-effective and grow their profits.
                                    </p>
                                </div>

                                <div className="mt-7 rounded-2xl border border-red-100 bg-red-50/70 p-6">
                                    <p className="text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                        As an AHPK member, you become part of an
                                        industry and communications powerhouse,
                                        with access to the people, institutions
                                        and resources that help drive the hotel
                                        and hospitality industry.
                                    </p>
                                </div>
                            </section>

                            {/* WHY JOIN */}
                            <section
                                id="why-join"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Membership value"
                                    title="Why Join AHPK?"
                                    description="Membership connects professionals to recognition, industry resources, career opportunities and a strong hospitality community."
                                    icon={Compass}
                                />

                                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                    {membershipReasons.map((item) => {
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

                            {/* WHO CAN JOIN */}
                            <section
                                id="who-can-join"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Professional community"
                                    title="Who Can Become a Member?"
                                    description="AHPK membership is drawn from professionals serving at managerial levels or working as consultants across hospitality, tourism and related sectors in Kenya and beyond."
                                    icon={Users}
                                />

                                <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
                                    <p className="text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                                        Members may work in, manage or consult
                                        for organisations operating in the
                                        following sectors:
                                    </p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {memberSectors.map((sector) => (
                                            <div
                                                key={sector}
                                                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                                            >
                                                <CircleDot className="h-4 w-4 shrink-0 text-[#C8102E]" />

                                                <span className="text-sm font-bold text-slate-700">
                                                    {sector}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* AFFILIATE MEMBERSHIP */}
                            <section
                                id="affiliate-membership"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Affiliate and institutional membership"
                                    title="A Broader Hospitality Network"
                                    description="AHPK welcomes organisations and stakeholders whose work supports hospitality operations, education, supply and professional services."
                                    icon={Handshake}
                                />

                                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                    {affiliateMembers.map((item) => {
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

                            {/* PROFESSIONAL RECOGNITION */}
                            <section
                                id="professional-recognition"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 sm:p-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
                                        <Award className="h-6 w-6" />
                                    </div>

                                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Professional status
                                    </p>

                                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                        Professional Recognition
                                    </h2>

                                    <p className="mt-4 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                                        AHPK membership gives and bestows
                                        professional status through the
                                        issuance of designatory letters that
                                        identify members as professional
                                        hospitality managers.
                                    </p>

                                    <p className="mt-4 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                                        This recognition strengthens a
                                        member&apos;s professional standing among
                                        employers, colleagues, customers and
                                        hospitality industry stakeholders.
                                    </p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        {[
                                            "Recognition by Employers",
                                            "Professional Identity",
                                            "Industry Credibility",
                                            "Stakeholder Confidence",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3 rounded-xl border border-red-100 bg-white px-4 py-3"
                                            >
                                                <BadgeCheck className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                                <span className="text-sm font-bold text-slate-700">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* BENEFITS */}
                            <section
                                id="member-benefits"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Membership advantages"
                                    title="Member Benefits"
                                    description="AHPK membership provides practical benefits across career development, networking, research, consultancy and professional support."
                                    icon={Sparkles}
                                />

                                <div className="mt-8 space-y-6">
                                    {benefitGroups.map((group) => {
                                        const Icon = group.icon;

                                        return (
                                            <section
                                                key={group.title}
                                                id={group.id}
                                                className="scroll-mt-28 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                                            >
                                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                                        <Icon className="h-6 w-6" />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
                                                            {group.title}
                                                        </h3>

                                                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                                            {group.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 space-y-3">
                                                    {group.benefits.map(
                                                        (benefit) => (
                                                            <div
                                                                key={benefit}
                                                                className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3.5"
                                                            >
                                                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />

                                                                <p className="text-sm font-medium leading-6 text-slate-700">
                                                                    {benefit}
                                                                </p>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </section>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* MEMBERSHIP VALUE */}
                            <section
                                id="membership-value"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 sm:p-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>

                                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        The value of belonging
                                    </p>

                                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                        Membership Value
                                    </h2>

                                    <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                        AHPK membership is designed to help
                                        hospitality professionals build
                                        credibility, advance their careers,
                                        expand their networks and contribute to
                                        the development of the profession.
                                    </p>

                                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {membershipValues.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <div
                                                    key={item.title}
                                                    className="rounded-2xl border border-red-100 bg-white p-5"
                                                >
                                                    <Icon className="h-6 w-6 text-[#C8102E]" />

                                                    <h3 className="mt-4 text-sm font-extrabold text-slate-900">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>

                            {/* CTA */}
                            <section className="mt-10 rounded-[24px] bg-slate-950 p-7 text-white sm:p-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                    <Users className="h-6 w-6" />
                                </div>

                                <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                    Join the professional community
                                </p>

                                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                                    Become Part of Kenya&apos;s Hospitality
                                    Community
                                </h2>

                                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/70 sm:text-base">
                                    Join a growing professional network
                                    committed to strengthening hospitality
                                    leadership, advancing careers and shaping
                                    the future of the industry.
                                </p>

                                <Link
                                    href="/members-section/membership-categories"
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-red-700"
                                >
                                    Explore Membership Categories
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </section>

                            {/* PREVIOUS / NEXT */}
                            <div className="mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
                                <Link
                                    href="/members-section/constitution-rules/the-executive-committee"
                                    className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Previous
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            The Executive Committee
                                        </span>
                                    </span>
                                </Link>

                                <Link
                                    href="/members-section/membership-categories"
                                    className="group flex min-h-24 items-center justify-end gap-4 rounded-2xl border border-slate-200 p-5 text-right transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Next
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Membership Categories
                                        </span>
                                    </span>

                                    <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E]" />
                                </Link>
                            </div>
                        </article>

                        {/* SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                                <div className="bg-[#C8102E] px-6 py-5 text-white">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                                        On this page
                                    </p>

                                    <h2 className="mt-2 text-xl font-extrabold">
                                        Membership
                                    </h2>
                                </div>

                                <nav className="p-3">
                                    <SidebarLink
                                        href="#about-membership"
                                        label="About Membership"
                                        active
                                    />

                                    <SidebarLink
                                        href="#why-join"
                                        label="Why Join AHPK"
                                    />

                                    <SidebarLink
                                        href="#who-can-join"
                                        label="Who Can Join"
                                    />

                                    <SidebarLink
                                        href="#affiliate-membership"
                                        label="Affiliate Membership"
                                    />

                                    <SidebarLink
                                        href="#professional-recognition"
                                        label="Professional Recognition"
                                    />

                                    <SidebarLink
                                        href="#member-benefits"
                                        label="Member Benefits"
                                    />

                                    <SidebarLink
                                        href="#career-development"
                                        label="Career Development"
                                    />

                                    <SidebarLink
                                        href="#networking"
                                        label="Networking"
                                    />

                                    <SidebarLink
                                        href="#professional-support"
                                        label="Professional Support"
                                    />

                                    <SidebarLink
                                        href="#membership-value"
                                        label="Membership Value"
                                    />
                                </nav>
                            </div>

                            <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
                                <Award className="h-8 w-8 text-[#C8102E]" />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Professional Recognition
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Membership helps hospitality managers
                                    demonstrate professional identity,
                                    credibility and commitment to recognised
                                    standards.
                                </p>
                            </div>

                            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                                <GraduationCap className="h-8 w-8 text-[#C8102E]" />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Grow Your Career
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Connect with industry professionals, access
                                    career intelligence and participate in
                                    leadership and learning opportunities.
                                </p>

                                <Link
                                    href="/members-section/membership-categories"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    View Membership Categories
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
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

function MembershipCriterionJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/membership-criterion-levels#article",
        url:
            "https://ahpk.or.ke/members-section/membership-criterion-levels",
        headline: "Membership Criterion & Levels",
        description:
            "Information about AHPK membership eligibility, professional recognition, represented sectors and member benefits.",
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
            name: "AHPK Membership Information",
            numberOfItems: 6,
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "About Membership",
                    description:
                        "AHPK membership connects hospitality professionals with industry resources, knowledge and professional opportunities.",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Eligible Professionals",
                    description:
                        "Membership is open to managerial professionals and consultants working across hospitality, tourism and allied sectors.",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Affiliate Membership",
                    description:
                        "Hotels, restaurants, training institutions, suppliers, consultants and allied practitioners may participate as affiliate members.",
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    name: "Professional Recognition",
                    description:
                        "Members receive professional recognition through designatory letters and industry standing.",
                },
                {
                    "@type": "ListItem",
                    position: 5,
                    name: "Career and Networking Benefits",
                    description:
                        "Members benefit from career intelligence, job placement, networking, leadership and collaboration opportunities.",
                },
                {
                    "@type": "ListItem",
                    position: 6,
                    name: "Professional Support",
                    description:
                        "AHPK supports members through industry research, legal guidance, labour-related support and professional standards.",
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
                href="/members-section"
                className="transition hover:text-[#C8102E]"
            >
                Members Section
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span className="text-[#C8102E]" aria-current="page">
                Membership Criterion &amp; Levels
            </span>
        </nav>
    );
}
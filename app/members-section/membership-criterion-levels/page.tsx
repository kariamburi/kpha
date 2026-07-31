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

            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 max-w-5xl">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                            Members Section
                        </p>

                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                            Membership Criterion &amp; Levels
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            Discover who can join AHPK, the professional
                            community represented by the Association and
                            the career, networking and industry benefits
                            available to members.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                href="/members-section/membership-categories"
                                className="group inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#A80D27] hover:shadow-lg"
                            >
                                Explore Membership Categories

                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/apply"
                                className="inline-flex min-h-11 items-center justify-center border border-slate-300 px-6 text-sm font-black text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:border-[#C8102E] hover:text-[#C8102E]"
                            >
                                Apply for Membership
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
                                src="/membership-criterion-levels-hero.webp"
                                alt="Hospitality professionals participating in an AHPK membership forum"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            AHPK connects hospitality professionals,
                            businesses and institutions through recognition,
                            knowledge, opportunity and industry leadership.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* ABOUT MEMBERSHIP */}
                            <section
                                id="about-membership"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-8 pt-4"
                            >
                                <SectionLabel>About Membership</SectionLabel>

                                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                    Membership designed for hospitality professionals
                                </h2>

                                <div className="mt-4 space-y-4 text-[17px] leading-8 text-slate-700">
                                    <p>
                                        AHPK understands that running a hotel involves
                                        far more than providing guests with a comfortable
                                        night&apos;s sleep. It also requires an
                                        understanding of the legislation and regulations
                                        governing the profession and the ability to remain
                                        ahead of changing competition.
                                    </p>

                                    <p>
                                        The Association focuses on what happens behind the
                                        scenes: the professional knowledge, systems,
                                        relationships and resources that help hospitality
                                        destinations operate smoothly, remain cost-effective
                                        and grow their profits.
                                    </p>
                                </div>

                                <blockquote className="mt-5 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4 text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                    As an AHPK member, you become part of an
                                    industry and communications powerhouse, with
                                    access to the people, institutions and resources
                                    that help drive the hotel and hospitality industry.
                                </blockquote>
                            </section>

                            {/* WHY JOIN */}
                            <section
                                id="why-join"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Membership Value"
                                    title="Why Join AHPK?"
                                    description="Membership connects professionals to recognition, industry resources, career opportunities and a strong hospitality community."
                                    icon={Compass}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    {membershipReasons.map((item, index) => (
                                        <EditorialRow
                                            key={item.title}
                                            number={index + 1}
                                            title={item.title}
                                            description={item.description}
                                            icon={item.icon}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* WHO CAN JOIN */}
                            <section
                                id="who-can-join"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Professional Community"
                                    title="Who Can Become a Member?"
                                    description="AHPK membership is drawn from professionals serving at managerial levels or working as consultants across hospitality, tourism and related sectors in Kenya and beyond."
                                    icon={Users}
                                />

                                <p className="mt-4 text-[17px] leading-8 text-slate-700">
                                    Members may work in, manage or consult for
                                    organisations operating in the following sectors:
                                </p>

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2 lg:grid-cols-3">
                                    {memberSectors.map((sector) => (
                                        <div
                                            key={sector}
                                            className="group flex min-h-16 items-center gap-3 border-b border-slate-300 py-3 transition duration-200 hover:bg-red-50/60 sm:border-r sm:px-4 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
                                        >
                                            <CircleDot className="h-4 w-4 shrink-0 text-[#C8102E] transition-transform duration-200 group-hover:scale-125" />

                                            <span className="text-sm font-bold leading-6 text-slate-700 transition group-hover:text-[#C8102E]">
                                                {sector}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* AFFILIATE MEMBERSHIP */}
                            <section
                                id="affiliate-membership"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Affiliate and Institutional Membership"
                                    title="A broader hospitality network"
                                    description="AHPK welcomes organisations and stakeholders whose work supports hospitality operations, education, supply and professional services."
                                    icon={Handshake}
                                />

                                <div className="mt-5 border-t border-slate-300">
                                    {affiliateMembers.map((item, index) => (
                                        <EditorialRow
                                            key={item.title}
                                            number={index + 1}
                                            title={item.title}
                                            description={item.description}
                                            icon={item.icon}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* PROFESSIONAL RECOGNITION */}
                            <section
                                id="professional-recognition"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <div className="border-t-4 border-[#C8102E] bg-slate-50 p-5 sm:p-6">
                                    <Award className="h-7 w-7 text-[#C8102E]" />

                                    <SectionLabel>Professional Status</SectionLabel>

                                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                                        Professional Recognition
                                    </h2>

                                    <div className="mt-4 space-y-4 text-[17px] leading-8 text-slate-700">
                                        <p>
                                            AHPK membership gives and bestows
                                            professional status through the issuance of
                                            designatory letters that identify members as
                                            professional hospitality managers.
                                        </p>

                                        <p>
                                            This recognition strengthens a member&apos;s
                                            professional standing among employers,
                                            colleagues, customers and hospitality industry
                                            stakeholders.
                                        </p>
                                    </div>

                                    <div className="mt-5 grid border-y border-slate-300 sm:grid-cols-2">
                                        {[
                                            "Recognition by Employers",
                                            "Professional Identity",
                                            "Industry Credibility",
                                            "Stakeholder Confidence",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="group flex items-center gap-3 border-b border-slate-300 py-3 transition hover:bg-white sm:border-r sm:px-4 sm:[&:nth-child(2n)]:border-r-0"
                                            >
                                                <BadgeCheck className="h-5 w-5 shrink-0 text-[#C8102E] transition-transform group-hover:scale-110" />

                                                <span className="text-sm font-black text-slate-700">
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
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="Membership Advantages"
                                    title="Member Benefits"
                                    description="AHPK membership provides practical benefits across career development, networking, research, consultancy and professional support."
                                    icon={Sparkles}
                                />

                                <div className="mt-5 divide-y divide-slate-300 border-y border-slate-300">
                                    {benefitGroups.map((group, groupIndex) => {
                                        const Icon = group.icon;

                                        return (
                                            <section
                                                key={group.title}
                                                id={group.id}
                                                className="group scroll-mt-28 py-6"
                                            >
                                                <div className="grid gap-4 sm:grid-cols-[52px_minmax(0,1fr)]">
                                                    <div className="flex h-11 w-11 items-center justify-center bg-slate-950 text-white transition duration-200 group-hover:bg-[#C8102E]">
                                                        <Icon className="h-5 w-5" />
                                                    </div>

                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                                                            Benefit {String(groupIndex + 1).padStart(2, "0")}
                                                        </p>

                                                        <h3 className="mt-1.5 text-2xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                                                            {group.title}
                                                        </h3>

                                                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                                            {group.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-4 divide-y divide-slate-200 border-t border-slate-200 sm:ml-[68px]">
                                                    {group.benefits.map((benefit) => (
                                                        <div
                                                            key={benefit}
                                                            className="flex gap-3 py-3"
                                                        >
                                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />

                                                            <p className="text-sm font-medium leading-6 text-slate-700">
                                                                {benefit}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* MEMBERSHIP VALUE */}
                            <section
                                id="membership-value"
                                className="scroll-mt-28 border-t border-slate-300 py-8"
                            >
                                <SectionHeading
                                    eyebrow="The Value of Belonging"
                                    title="Membership Value"
                                    description="AHPK membership helps hospitality professionals build credibility, advance careers, expand networks and contribute to the development of the profession."
                                    icon={ShieldCheck}
                                />

                                <div className="mt-5 grid border-t border-slate-300 sm:grid-cols-2 lg:grid-cols-3">
                                    {membershipValues.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.title}
                                                className="group border-b border-slate-300 py-5 transition duration-200 hover:bg-red-50/60 sm:border-r sm:px-5 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
                                            >
                                                <Icon className="h-6 w-6 text-[#C8102E] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />

                                                <h3 className="mt-3 text-base font-black text-slate-900 transition group-hover:text-[#C8102E]">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* CTA */}
                            <section className="border-t border-slate-300 py-8">
                                <div className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white sm:p-6">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                        Join the Professional Community
                                    </p>

                                    <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight">
                                        Become part of Kenya&apos;s hospitality community
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                                        Join a growing professional network committed
                                        to strengthening hospitality leadership,
                                        advancing careers and shaping the future of
                                        the industry.
                                    </p>

                                    <Link
                                        href="/members-section/membership-categories"
                                        className="group mt-4 inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg"
                                    >
                                        Explore Membership Categories

                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </section>

                            {/* PREVIOUS / NEXT */}
                            <section className="border-t border-slate-300 pt-5">
                                <SectionLabel>Continue Reading</SectionLabel>

                                <div className="mt-3 grid border-y border-slate-300 sm:grid-cols-2">
                                    <RelatedPageLink
                                        href="/members-section/constitution-rules/the-executive-committee"
                                        eyebrow="Previous"
                                        title="The Executive Committee"
                                        direction="left"
                                    />

                                    <RelatedPageLink
                                        href="/members-section/membership-categories"
                                        eyebrow="Next"
                                        title="Membership Categories"
                                        direction="right"
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
                                        Membership
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Membership criterion page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <SidebarLink href="#about-membership" label="About Membership" />
                                    <SidebarLink href="#why-join" label="Why Join AHPK" />
                                    <SidebarLink href="#who-can-join" label="Who Can Join" />
                                    <SidebarLink href="#affiliate-membership" label="Affiliate Membership" />
                                    <SidebarLink href="#professional-recognition" label="Professional Recognition" />
                                    <SidebarLink href="#member-benefits" label="Member Benefits" />
                                    <SidebarLink href="#career-development" label="Career Development" />
                                    <SidebarLink href="#networking" label="Networking" />
                                    <SidebarLink href="#professional-support" label="Professional Support" />
                                    <SidebarLink href="#membership-value" label="Membership Value" />
                                </nav>
                            </div>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <Award className="h-6 w-6 text-[#C8102E]" />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Professional Recognition
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    Membership helps hospitality managers
                                    demonstrate professional identity,
                                    credibility and commitment to recognised
                                    standards.
                                </p>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <GraduationCap className="h-6 w-6 text-red-300" />

                                <h2 className="mt-2 text-xl font-black">
                                    Grow Your Career
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Connect with industry professionals, access
                                    career intelligence and participate in
                                    leadership and learning opportunities.
                                </p>

                                <Link
                                    href="/members-section/membership-categories"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-red-300 transition hover:text-white"
                                >
                                    View Membership Categories

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
        <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <SectionLabel>{eyebrow}</SectionLabel>

                <h2 className="mt-1.5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                    {title}
                </h2>

                <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}

function EditorialRow({
    number,
    title,
    description,
    icon: Icon,
}: {
    number: number;
    title: string;
    description: string;
    icon: typeof Users;
}) {
    return (
        <article className="group grid gap-3 border-b border-slate-300 py-5 last:border-b-0 sm:grid-cols-[58px_48px_minmax(0,1fr)] sm:items-start">
            <p className="text-3xl font-black leading-none text-slate-300 transition group-hover:text-[#C8102E]">
                {String(number).padStart(2, "0")}
            </p>

            <div className="flex h-10 w-10 items-center justify-center bg-[#C8102E] text-white transition duration-200 group-hover:-translate-y-0.5 group-hover:scale-105">
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <h3 className="text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>

                <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                    {description}
                </p>
            </div>
        </article>
    );
}

function SidebarLink({
    href,
    label,
}: {
    href: string;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="group flex items-center justify-between gap-3 py-3 text-sm font-bold text-slate-700 transition hover:translate-x-0.5 hover:text-[#C8102E]"
        >
            {label}

            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#C8102E]" />
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
            {direction === "left" && (
                <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:-translate-x-1" />
            )}

            <div className={direction === "right" ? "ml-auto text-right" : ""}>
                <p className="text-[10px] font-black uppercase tracking-[0.17em] text-slate-400">
                    {eyebrow}
                </p>

                <h3 className="mt-1.5 text-xl font-black text-slate-950 transition group-hover:text-[#C8102E]">
                    {title}
                </h3>
            </div>

            {direction === "right" && (
                <ArrowRight className="h-5 w-5 shrink-0 text-[#C8102E] transition group-hover:translate-x-1" />
            )}
        </Link>
    );
}

function SectionLabel({
    children,
}: {
    children: string;
}) {
    return (
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
            {children}
        </p>
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
// app/members-section/membership-categories/page.tsx

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
    FileCheck2,
    FileText,
    GraduationCap,
    Handshake,
    Home,
    Hotel,
    Landmark,
    Medal,
    Network,
    ScrollText,
    ShieldCheck,
    Sparkles,
    Star,
    Trophy,
    UserRoundCheck,
    Users,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

const pagePath = "/members-section/membership-categories";

export const metadata: Metadata = {
    title:
        "Membership Categories | Association of Hotel Professionals Kenya",

    description:
        "Explore AHPK membership categories including Honorary, Fellow, Full, Associate and Student membership together with eligibility requirements and the membership approval process.",

    keywords: [
        "AHPK membership categories",
        "Honorary Member HAHPK",
        "Fellow Member FAHPK",
        "Full Member MAHPK",
        "Associate Member AAHPK",
        "Student Member SAHPK",
        "hospitality membership Kenya",
        "Association of Hotel Professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Membership Categories | Association of Hotel Professionals Kenya",
        description:
            "Explore AHPK membership categories, professional designations, eligibility requirements and the approval process.",
        url: pagePath,
        siteName: "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "article",
        images: [
            {
                url: "/executive-committee.webp",
                width: 1536,
                height: 1024,
                alt: "Hospitality professionals representing AHPK membership categories",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Membership Categories | AHPK",
        description:
            "Explore Honorary, Fellow, Full, Associate and Student membership categories offered by AHPK.",
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

const categoryCards = [
    {
        id: "honorary-member",
        title: "Honorary Member",
        designation: "HAHPK",
        icon: Trophy,
        description:
            "Reserved for distinguished captains of the hospitality industry who have upheld the integrity and reputation of the profession.",
        audience: [
            "Managing Directors",
            "Business Owners",
            "Chief Executive Officers",
            "General Managers",
            "Managers",
            "Consultants",
            "Retired Industry Leaders",
        ],
    },
    {
        id: "full-member",
        title: "Full Member",
        designation: "MAHPK",
        icon: BadgeCheck,
        description:
            "For practising senior hospitality professionals with reputable career progression and the required academic and professional training.",
        audience: [
            "Chief Executive Officers",
            "Managing Directors",
            "General Managers",
            "Chief Officers",
            "Unit Managers",
            "Consultants",
        ],
    },
    {
        id: "associate-member",
        title: "Associate Member",
        designation: "AAHPK",
        icon: Handshake,
        description:
            "For organisations and institutions that conduct business with or provide services to the hotel and hospitality industry.",
        audience: [
            "Hospitality Suppliers",
            "Training Institutions",
            "Industry Companies",
            "Hospitality Service Providers",
        ],
    },
    {
        id: "student-member",
        title: "Student Member",
        designation: "SAHPK",
        icon: GraduationCap,
        description:
            "For students undertaking recognised AHPK-accredited hospitality and tourism programmes as preparation for a future career.",
        audience: [
            "Hospitality Students",
            "Tourism Students",
            "Learners in Recognised Institutions",
            "Future Hospitality Professionals",
        ],
    },
];

const fellowEligibility = [
    {
        title: "AHPK Membership",
        description:
            "The applicant must have been a member of AHPK for at least five years.",
        icon: Users,
    },
    {
        title: "Secondary Education",
        description:
            "The applicant must have attained at least High School level, including O Level or A Level.",
        icon: BookOpenCheck,
    },
    {
        title: "Hospitality Qualification",
        description:
            "The applicant must hold at least a one- to two-year certificate in hotel operations, food production, service, front office, tourism or travel.",
        icon: GraduationCap,
    },
    {
        title: "Industry Experience",
        description:
            "The applicant must have completed at least fourteen years of uninterrupted professional service.",
        icon: BriefcaseBusiness,
    },
    {
        title: "Professional Membership",
        description:
            "Membership in recognised trade and professional bodies or associations is considered.",
        icon: Network,
    },
    {
        title: "Community Participation",
        description:
            "Membership in social, sports or golf clubs may form part of the overall eligibility assessment.",
        icon: Landmark,
    },
];

const approvalSteps = [
    {
        number: "01",
        title: "Submit Application Documents",
        description:
            "Individual applicants submit a résumé or CV. Corporate applicants and training institutions submit a business or institutional profile.",
        icon: FileText,
    },
    {
        number: "02",
        title: "Committee Vetting",
        description:
            "The Training and Membership Committee reviews the application against the established membership criteria.",
        icon: UserRoundCheck,
    },
    {
        number: "03",
        title: "Benchmark Assessment",
        description:
            "The applicant's qualifications, experience, professional standing and institutional suitability are assessed.",
        icon: ScrollText,
    },
    {
        number: "04",
        title: "Executive Approval",
        description:
            "Applications that meet the required benchmark are presented to the Executive Committee for approval.",
        icon: ShieldCheck,
    },
    {
        number: "05",
        title: "Written Confirmation",
        description:
            "The Secretary communicates the approval in writing and quotes the relevant minute reference before payment begins.",
        icon: FileCheck2,
    },
];

const designations = [
    {
        code: "HAHPK",
        label: "Honorary Member",
        icon: Trophy,
    },
    {
        code: "FAHPK",
        label: "Fellow Member",
        icon: Medal,
    },
    {
        code: "MAHPK",
        label: "Full Member",
        icon: BadgeCheck,
    },
    {
        code: "AAHPK",
        label: "Associate Member",
        icon: Handshake,
    },
    {
        code: "SAHPK",
        label: "Student Member",
        icon: GraduationCap,
    },
];


export default function MembershipCategoriesPage() {
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
                        name: "Membership Categories",
                        url: pagePath,
                    },
                ]}
            />

            <MembershipCategoriesJsonLd />

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
                            Membership Categories
                        </h1>

                        <p className="mt-4 max-w-4xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                            Explore the five AHPK membership categories,
                            their eligibility requirements, professional
                            designations and application process.
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
                                alt="Hospitality professionals representing AHPK membership categories"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <figcaption className="border-b border-slate-200 px-5 py-2 text-xs font-semibold leading-5 text-slate-500 sm:px-0">
                            From students entering hospitality to senior
                            professionals shaping the industry, AHPK offers
                            a recognised membership pathway for every stage.
                        </figcaption>
                    </figure>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="bg-white py-5 sm:py-7">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <article className="min-w-0">
                            {/* OVERVIEW */}
                            <section
                                id="overview"
                                className="scroll-mt-28 border-t-4 border-[#C8102E] pb-5 pt-3"
                            >
                                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    A membership path for every career stage
                                </h2>

                                <div className="mt-3 space-y-2 text-base leading-7 text-slate-700">
                                    <p>
                                        AHPK membership categories range from
                                        students pursuing hotel careers to chief
                                        executives serving in public or private
                                        employment, running their own businesses
                                        or working in consultancy.
                                    </p>

                                    <p>
                                        The membership framework also extends to
                                        training institutions that offer courses
                                        and programmes for the hotel, hospitality
                                        and tourism industry.
                                    </p>
                                </div>

                                <blockquote className="mt-5 border-l-4 border-[#C8102E] bg-slate-50 px-5 py-4 text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                    Each category reflects a distinct level of
                                    professional experience, contribution,
                                    institutional involvement or career
                                    development within hospitality.
                                </blockquote>

                                <div className="mt-3 grid border-y border-slate-300 sm:grid-cols-5">
                                    {designations.map((item) => (
                                        <DesignationFact
                                            key={item.code}
                                            code={item.code}
                                            label={item.label}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* MEMBERSHIP CATEGORIES - UNIFORM PRESENTATION */}
                            <MembershipCategorySection
                                id="honorary-member"
                                category={categoryCards[0]}
                            >
                                <p>
                                    Honorary Membership may be awarded to captains of the industry who have served
                                    as Managing Directors, Owners, Chief Executive Officers, General Managers,
                                    Managers or Consultants.
                                </p>
                                <p>
                                    Eligible individuals should have upheld and maintained the integrity and
                                    reputation of the hospitality industry, whether they have since retired
                                    or are no longer in active service.
                                </p>
                                <AudienceGrid items={categoryCards[0].audience} />
                            </MembershipCategorySection>

                            <MembershipCategorySection
                                id="fellow-member"
                                category={{
                                    // id: "fellow-member",
                                    title: "Fellow Member",
                                    designation: "FAHPK",
                                    icon: Medal,
                                    description:
                                        "Fellowship is the next major professional milestone for a Full Member of AHPK and recognises the expertise, leadership and contribution of senior members.",
                                }}
                            >
                                <p>
                                    A Fellow Member is a captain of the industry who has served as a Managing
                                    Director, Investor, Chief Executive Officer, General Manager, Manager or
                                    Consultant and has upheld the integrity and reputation of the profession.
                                </p>
                                <p>
                                    The individual should have made a substantial contribution to professional
                                    values and dignity through leadership, shared knowledge and work worthy of
                                    industry benchmarking.
                                </p>
                                <p className="font-semibold text-slate-800">
                                    Fellowship represents one of the Association&apos;s highest forms of
                                    professional recognition.
                                </p>
                            </MembershipCategorySection>

                            {/* FELLOW ELIGIBILITY */}
                            <section
                                id="fellow-eligibility"
                                className="scroll-mt-28 border-t border-slate-300 py-5 sm:py-6"
                            >
                                <SectionHeading
                                    eyebrow="Eligibility for Admission"
                                    title="Fellow Membership Requirements"
                                    description="Applicants for Fellowship are assessed on membership history, education, professional training, industry service and wider professional participation."
                                    icon={ShieldCheck}
                                />

                                <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-[#C8102E]">
                                    {fellowEligibility.map((item, index) => (
                                        <EditorialRow
                                            key={item.title}
                                            number={index + 1}
                                            title={item.title}
                                            description={item.description}
                                            icon={item.icon}
                                        />
                                    ))}
                                </ul>
                            </section>

                            {/* FULL, ASSOCIATE AND STUDENT - SAME PRESENTATION */}
                            <section
                                id="other-categories"
                                className="scroll-mt-28 border-t border-slate-200 pt-4"
                            >
                                <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                                    Other Membership Categories
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    Full, Associate and Student membership support practising professionals,
                                    partner organisations and people preparing to enter the hospitality industry.
                                </p>
                            </section>

                            {categoryCards.slice(1).map((category) => (
                                <MembershipCategorySection
                                    key={category.id}
                                    id={category.id}
                                    category={category}
                                >
                                    <AudienceGrid items={category.audience} />
                                    {category.id === "full-member" && (
                                        <p>
                                            Full Members must demonstrate reputable career progression and meet
                                            the academic and professional training benchmarks established by
                                            the Association.
                                        </p>
                                    )}
                                    {category.id === "associate-member" && (
                                        <p>
                                            Associate Membership is subject to the Association&apos;s established
                                            vetting criteria.
                                        </p>
                                    )}
                                </MembershipCategorySection>
                            ))}

                            {/* APPLICATION PROCESS */}
                            <section
                                id="application-process"
                                className="scroll-mt-28 border-t border-slate-300 py-5 sm:py-6"
                            >
                                <SectionHeading
                                    eyebrow="Vetting and Approval"
                                    title="Membership Application Process"
                                    description="All applications are reviewed through a structured process to ensure each individual or institution meets the benchmark for the selected category."
                                    icon={FileCheck2}
                                />

                                <ol className="mt-3 list-decimal space-y-1 pl-5 marker:font-bold marker:text-[#C8102E]">
                                    {approvalSteps.map((step) => (
                                        <li key={step.number} className="py-1 text-sm leading-6 text-slate-700 sm:text-base">
                                            <strong className="font-black text-slate-950">{step.title}:</strong>{" "}
                                            {step.description}
                                        </li>
                                    ))}
                                </ol>

                                <div className="mt-3 border-l-4 border-amber-500 bg-amber-50 px-5 py-4">
                                    <p className="text-sm font-bold leading-7 text-amber-950">
                                        Membership payments should only begin
                                        after the applicant or institution has
                                        received written approval from the
                                        Secretary, quoting the relevant minute
                                        reference supporting the approval.
                                    </p>
                                </div>
                            </section>

                            {/* CERTIFICATION */}
                            <section
                                id="certification"
                                className="scroll-mt-28 border-t border-slate-300 py-5 sm:py-6"
                            >
                                <div className="border-t-4 border-[#C8102E] bg-slate-50 p-5 sm:p-6">
                                    <div className="flex items-center gap-3">
                                        <FileCheck2 className="h-7 w-7 shrink-0 text-[#C8102E]" aria-hidden="true" />
                                        <h2 className="text-2xl font-black tracking-tight text-slate-950">
                                            Membership Certification
                                        </h2>
                                    </div>

                                    <p className="mt-2 text-base leading-7 text-slate-700">
                                        Membership certificates issued by AHPK
                                        are valid for one year and may require
                                        renewal in accordance with the
                                        Association&apos;s policies and
                                        applicable membership requirements.
                                    </p>
                                </div>
                            </section>

                            {/* PROFESSIONAL RECOGNITION */}
                            <section
                                id="professional-recognition"
                                className="scroll-mt-28 border-t border-slate-300 py-5 sm:py-6"
                            >
                                <SectionHeading
                                    eyebrow="Designatory Letters"
                                    title="Professional Recognition"
                                    description="Each membership category carries a distinct designation communicating the member's standing within the Association."
                                    icon={Award}
                                />

                                <div className="mt-3 grid border-t border-slate-300 sm:grid-cols-2 lg:grid-cols-3">
                                    {designations.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.code}
                                                className="group border-b border-slate-300 py-3 transition duration-200 hover:bg-red-50/60 sm:border-r sm:px-5 sm:nth-[2n]:border-r-0 lg:nth-[2n]:border-r lg:nth-[3n]:border-r-0"
                                            >
                                                <Icon className="h-6 w-6 text-[#C8102E] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />

                                                <p className="mt-3 text-2xl font-black tracking-tight text-slate-950 transition group-hover:text-[#C8102E]">
                                                    {item.code}
                                                </p>

                                                <p className="mt-1 text-sm font-bold text-slate-600">
                                                    {item.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* CTA */}
                            <section className="border-t border-slate-300 py-5">
                                <div className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white sm:p-6">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                        Begin Your Membership Journey
                                    </p>

                                    <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight">
                                        Choose the right membership
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
                                        Whether you are beginning your hospitality
                                        journey or leading the industry, AHPK offers
                                        a membership category designed to support
                                        your professional growth.
                                    </p>

                                    <Link
                                        href="/apply"
                                        className="group mt-4 inline-flex min-h-11 items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg"
                                    >
                                        Apply for Membership

                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
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
                                        Membership Categories
                                    </h2>
                                </div>

                                <nav
                                    aria-label="Membership categories page navigation"
                                    className="divide-y divide-slate-200"
                                >
                                    <SidebarLink href="#overview" label="Overview" />
                                    <SidebarLink href="#honorary-member" label="Honorary Member" />
                                    <SidebarLink href="#fellow-member" label="Fellow Member" />
                                    <SidebarLink href="#fellow-eligibility" label="Fellow Eligibility" />
                                    <SidebarLink href="#full-member" label="Full Member" />
                                    <SidebarLink href="#associate-member" label="Associate Member" />
                                    <SidebarLink href="#student-member" label="Student Member" />
                                    <SidebarLink href="#application-process" label="Application Process" />
                                    <SidebarLink href="#certification" label="Certification" />
                                    <SidebarLink href="#professional-recognition" label="Professional Recognition" />
                                </nav>
                            </div>

                            <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
                                <Medal className="h-6 w-6 text-[#C8102E]" />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Fellowship Recognition
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    FAHPK recognises senior hospitality leaders
                                    whose experience, integrity and contribution
                                    have strengthened the profession.
                                </p>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <FileCheck2 className="h-6 w-6 text-red-300" />

                                <h2 className="mt-2 text-xl font-black">
                                    Application Approval
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Applicants should wait for written approval
                                    from the Association before making
                                    membership payments.
                                </p>

                                <Link
                                    href="#application-process"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-red-300 transition hover:text-white"
                                >
                                    View the Approval Process

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
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-950 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                    {title}
                </h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                {description}
            </p>
        </div>
    );
}

type DisplayMembershipCategory = {
    title: string;
    designation: string;
    description: string;
    icon: typeof Trophy;
};

function MembershipCategorySection({
    id,
    category,
    children,
}: {
    id: string;
    category: DisplayMembershipCategory;
    children: React.ReactNode;
}) {
    const Icon = category.icon;
    return (
        <section
            id={id}
            className="scroll-mt-28 border-t border-slate-200 py-4 sm:py-5"
        >
            <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#C8102E] text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                    {category.title}
                </h2>
                <span className="rounded-sm border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-black text-[#C8102E]">
                    {category.designation}
                </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                {category.description}
            </p>
            <div className="mt-2 space-y-2 text-sm leading-6 text-slate-700 sm:text-base">
                {children}
            </div>
        </section>
    );
}

function EditorialRow({
    title,
    description,
}: {
    number: number;
    title: string;
    description: string;
    icon: typeof Users;
}) {
    return (
        <li className="py-1 text-sm leading-6 text-slate-700 sm:text-base">
            <strong className="font-black text-slate-950">{title}:</strong>{" "}
            {description}
        </li>
    );
}

function AudienceGrid({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 grid list-disc gap-x-6 gap-y-1 pl-5 marker:text-[#C8102E] sm:grid-cols-2">
            {items.map((item) => (
                <li key={item} className="py-0.5 text-sm leading-6 text-slate-700">
                    {item}
                </li>
            ))}
        </ul>
    );
}

function DesignationFact({
    code,
    label,
}: {
    code: string;
    label: string;
}) {
    return (
        <div className="border-b border-slate-300 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:px-3 sm:first:pl-0 sm:last:border-r-0">
            <p className="text-lg font-black tracking-tight text-[#C8102E]">
                {code}
            </p>

            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.13em] text-slate-500">
                {label}
            </p>
        </div>
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
    children: React.ReactNode;
}) {
    return (
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
            {children}
        </p>
    );
}

function MembershipCategoriesJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id":
            "https://ahpk.or.ke/members-section/membership-categories#article",
        url: "https://ahpk.or.ke/members-section/membership-categories",
        headline: "Membership Categories",
        description:
            "AHPK Honorary, Fellow, Full, Associate and Student membership categories, eligibility requirements and approval process.",
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
            name: "AHPK Membership Categories",
            numberOfItems: 5,
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Honorary Member",
                    description:
                        "Honorary membership for distinguished industry leaders who have upheld the reputation and integrity of hospitality.",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Fellow Member",
                    description:
                        "Fellowship recognition for senior AHPK members with extensive service, leadership and professional impact.",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Full Member",
                    description:
                        "Membership for practising senior hospitality professionals who meet the Association's academic and professional benchmarks.",
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    name: "Associate Member",
                    description:
                        "Membership for businesses, suppliers and training institutions serving the hospitality industry.",
                },
                {
                    "@type": "ListItem",
                    position: 5,
                    name: "Student Member",
                    description:
                        "Membership for students undertaking recognised hospitality and tourism programmes.",
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
                Membership Categories
            </span>
        </nav>
    );
}
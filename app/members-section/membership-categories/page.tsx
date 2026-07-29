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

            {/* HERO */}
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
                                    <Award className="h-5 w-5 sm:h-6 sm:w-6" />
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
                                Membership
                                <span className="mt-2 block text-[#C8102E]">
                                    Categories
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                Explore the five membership categories offered
                                by AHPK, their eligibility requirements,
                                professional recognition and application
                                process.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                                {[
                                    "HAHPK",
                                    "FAHPK",
                                    "MAHPK",
                                    "AAHPK",
                                    "SAHPK",
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
                                    From students beginning their hospitality
                                    journey to industry leaders shaping the
                                    profession, AHPK provides a recognised path
                                    for every stage of professional growth.
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
                            {/* OVERVIEW */}
                            <section
                                id="overview"
                                className="scroll-mt-28"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <Users className="h-7 w-7" />
                                </div>

                                <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                    Membership categories
                                </p>

                                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">
                                    A Membership Path for Every Career Stage
                                </h2>

                                <div className="mt-7 space-y-5 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                                    <p>
                                        AHPK membership categories range from
                                        students pursuing hotel careers to
                                        chief executives serving in public or
                                        private employment, running their own
                                        businesses or working in consultancy.
                                    </p>

                                    <p>
                                        The membership framework also extends
                                        to training institutions that offer
                                        courses and programmes for the hotel,
                                        hospitality and tourism industry.
                                    </p>
                                </div>

                                <div className="mt-7 rounded-2xl border border-red-100 bg-red-50/70 p-6">
                                    <p className="text-base font-bold leading-8 text-slate-800 sm:text-lg">
                                        Each category reflects a distinct level
                                        of professional experience,
                                        contribution, institutional involvement
                                        or career development within the
                                        hospitality sector.
                                    </p>
                                </div>
                            </section>

                            {/* HONORARY */}
                            <section
                                id="honorary-member"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <CategoryHeading
                                    number="01"
                                    title="Honorary Member"
                                    designation="HAHPK"
                                    description="A prestigious category reserved for distinguished industry captains whose careers have strengthened the integrity and reputation of hospitality."
                                    icon={Trophy}
                                />

                                <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
                                    <p className="text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                                        Honorary Membership may be awarded to
                                        captains of the industry who have served
                                        as Managing Directors, Owners, Chief
                                        Executive Officers, General Managers,
                                        Managers or Consultants.
                                    </p>

                                    <p className="mt-4 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
                                        Eligible individuals should have upheld
                                        and maintained the integrity and
                                        reputation of the hospitality industry,
                                        whether they have since retired or are
                                        no longer in active service.
                                    </p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {categoryCards[0].audience.map((item) => (
                                            <ListPill key={item} label={item} />
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* FELLOW MEMBER */}
                            <section
                                id="fellow-member"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="overflow-hidden rounded-[28px] border border-red-100 bg-slate-950 text-white">
                                    <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-start">
                                        <div>
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-red-300">
                                                <Medal className="h-7 w-7" />
                                            </div>

                                            <p className="mt-7 text-xs font-black uppercase tracking-[0.22em] text-red-300">
                                                Membership category 02
                                            </p>

                                            <div className="mt-3 flex flex-wrap items-center gap-3">
                                                <h2 className="text-3xl font-extrabold sm:text-4xl">
                                                    Fellow Member
                                                </h2>

                                                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                                                    FAHPK
                                                </span>
                                            </div>

                                            <p className="mt-5 text-sm font-medium leading-7 text-white/75 sm:text-base sm:leading-8">
                                                Fellowship is the next major
                                                professional milestone for a
                                                Full Member of AHPK and
                                                recognises the expertise,
                                                leadership and contribution of
                                                the most senior members of the
                                                hotel and hospitality industry.
                                            </p>
                                        </div>

                                        <Star className="hidden h-16 w-16 text-red-300 lg:block" />
                                    </div>

                                    <div className="border-t border-white/10 bg-white/[0.04] p-7 sm:p-9">
                                        <p className="text-sm font-medium leading-7 text-white/75 sm:text-base sm:leading-8">
                                            A Fellow Member is a captain of the
                                            industry who has served as a
                                            Managing Director, Investor, Chief
                                            Executive Officer, General Manager,
                                            Manager or Consultant and has
                                            upheld the integrity and reputation
                                            of the profession while retired or
                                            still in active service.
                                        </p>

                                        <p className="mt-4 text-sm font-medium leading-7 text-white/75 sm:text-base sm:leading-8">
                                            The individual should have made a
                                            substantial contribution to the
                                            promotion of professional values and
                                            dignity through personal leadership,
                                            shared knowledge and work worthy of
                                            industry benchmarking.
                                        </p>

                                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                                            <p className="text-base font-extrabold leading-7 text-white">
                                                Fellowship represents one of
                                                the Association&apos;s highest
                                                forms of professional
                                                recognition.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* FELLOW ELIGIBILITY */}
                            <section
                                id="fellow-eligibility"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Eligibility for admission"
                                    title="Fellow Membership Requirements"
                                    description="Applicants for Fellowship are assessed on their membership history, education, professional training, industry service and wider professional participation."
                                    icon={ShieldCheck}
                                />

                                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                                    {fellowEligibility.map((item) => {
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

                            {/* OTHER CATEGORIES */}
                            <section
                                id="other-categories"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Professional membership levels"
                                    title="Full, Associate & Student Membership"
                                    description="These categories support practising professionals, partner organisations and students preparing to enter the hospitality industry."
                                    icon={Award}
                                />

                                <div className="mt-8 space-y-6">
                                    {categoryCards.slice(1).map((category, index) => {
                                        const Icon = category.icon;

                                        return (
                                            <section
                                                key={category.id}
                                                id={category.id}
                                                className="scroll-mt-28 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                                            >
                                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                                        <Icon className="h-6 w-6" />
                                                    </div>

                                                    <div className="flex-1">
                                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                                            Membership category{" "}
                                                            {String(index + 3).padStart(2, "0")}
                                                        </p>

                                                        <div className="mt-2 flex flex-wrap items-center gap-3">
                                                            <h3 className="text-2xl font-extrabold text-slate-950">
                                                                {category.title}
                                                            </h3>

                                                            <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#C8102E]">
                                                                {category.designation}
                                                            </span>
                                                        </div>

                                                        <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                                            {category.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                                    {category.audience.map((item) => (
                                                        <ListPill key={item} label={item} />
                                                    ))}
                                                </div>

                                                {category.id === "full-member" && (
                                                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                                        <p className="text-sm font-bold leading-7 text-slate-700">
                                                            Full Members must
                                                            demonstrate reputable
                                                            career progression and
                                                            meet the academic and
                                                            professional training
                                                            benchmarks established
                                                            by the Association.
                                                        </p>
                                                    </div>
                                                )}

                                                {category.id === "associate-member" && (
                                                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                                        <p className="text-sm font-bold leading-7 text-slate-700">
                                                            Associate Membership is
                                                            subject to the
                                                            Association&apos;s
                                                            established vetting
                                                            criteria.
                                                        </p>
                                                    </div>
                                                )}
                                            </section>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* APPLICATION PROCESS */}
                            <section
                                id="application-process"
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Vetting and approval"
                                    title="Membership Application Process"
                                    description="All applications are reviewed through a structured process to ensure that every individual or institution meets the benchmark for the selected category."
                                    icon={FileCheck2}
                                />

                                <div className="mt-8 space-y-4">
                                    {approvalSteps.map((step) => {
                                        const Icon = step.icon;

                                        return (
                                            <div
                                                key={step.number}
                                                className="grid gap-5 rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-[72px_1fr] sm:items-start"
                                            >
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E] text-sm font-black text-white">
                                                    {step.number}
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="h-5 w-5 text-[#C8102E]" />

                                                        <h3 className="text-lg font-extrabold text-slate-950">
                                                            {step.title}
                                                        </h3>
                                                    </div>

                                                    <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
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
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 sm:p-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm">
                                        <FileCheck2 className="h-6 w-6" />
                                    </div>

                                    <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Kindly note
                                    </p>

                                    <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                        Membership Certification
                                    </h2>

                                    <p className="mt-4 text-sm font-medium leading-7 text-slate-700 sm:text-base sm:leading-8">
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
                                className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10"
                            >
                                <SectionHeading
                                    eyebrow="Designatory letters"
                                    title="Professional Recognition"
                                    description="Each membership category carries a distinct designation that communicates the member's standing within the Association."
                                    icon={Award}
                                />

                                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {designations.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.code}
                                                className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm"
                                            >
                                                <Icon className="h-7 w-7 text-[#C8102E]" />

                                                <p className="mt-5 text-2xl font-black tracking-tight text-slate-950">
                                                    {item.code}
                                                </p>

                                                <p className="mt-2 text-sm font-bold text-slate-600">
                                                    {item.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* CTA */}
                            <section className="mt-10 rounded-[24px] bg-slate-950 p-7 text-white sm:p-8">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                    <Sparkles className="h-6 w-6" />
                                </div>

                                <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                    Begin your membership journey
                                </p>

                                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                                    Choose the Right Membership
                                </h2>

                                <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/70 sm:text-base">
                                    Whether you are beginning your hospitality
                                    journey or leading the industry, AHPK offers
                                    a membership category designed to support
                                    your professional growth.
                                </p>

                                <Link
                                    href="/apply"
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-red-700"
                                >
                                    Apply for Membership
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </section>

                            {/* PREVIOUS / NEXT */}
                            <div className="mt-10 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
                                <Link
                                    href="/members-section/membership-criterion-levels"
                                    className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <ArrowLeft className="h-5 w-5 shrink-0 text-[#C8102E]" />

                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Previous
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Membership Criterion &amp; Levels
                                        </span>
                                    </span>
                                </Link>

                                <Link
                                    href="/members-section/association-documents"
                                    className="group flex min-h-24 items-center justify-end gap-4 rounded-2xl border border-slate-200 p-5 text-right transition hover:border-red-200 hover:bg-red-50"
                                >
                                    <span>
                                        <span className="block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                                            Next
                                        </span>

                                        <span className="mt-1 block text-sm font-extrabold text-[#C8102E]">
                                            Association Documents
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
                                        Membership Categories
                                    </h2>
                                </div>

                                <nav className="p-3">
                                    <SidebarLink
                                        href="#overview"
                                        label="Overview"
                                        active
                                    />

                                    <SidebarLink
                                        href="#honorary-member"
                                        label="Honorary Member"
                                    />

                                    <SidebarLink
                                        href="#fellow-member"
                                        label="Fellow Member"
                                    />

                                    <SidebarLink
                                        href="#fellow-eligibility"
                                        label="Fellow Eligibility"
                                    />

                                    <SidebarLink
                                        href="#full-member"
                                        label="Full Member"
                                    />

                                    <SidebarLink
                                        href="#associate-member"
                                        label="Associate Member"
                                    />

                                    <SidebarLink
                                        href="#student-member"
                                        label="Student Member"
                                    />

                                    <SidebarLink
                                        href="#application-process"
                                        label="Application Process"
                                    />

                                    <SidebarLink
                                        href="#certification"
                                        label="Certification"
                                    />

                                    <SidebarLink
                                        href="#professional-recognition"
                                        label="Professional Recognition"
                                    />
                                </nav>
                            </div>

                            <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
                                <Medal className="h-8 w-8 text-[#C8102E]" />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Fellowship Recognition
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    FAHPK recognises senior hospitality leaders
                                    whose experience, integrity and contribution
                                    have strengthened the profession.
                                </p>
                            </div>

                            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                                <FileCheck2 className="h-8 w-8 text-[#C8102E]" />

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Application Approval
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Applicants should wait for written approval
                                    from the Association before making
                                    membership payments.
                                </p>

                                <Link
                                    href="#application-process"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    View the Approval Process
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

function CategoryHeading({
    number,
    title,
    designation,
    description,
    icon: Icon,
}: {
    number: string;
    title: string;
    designation: string;
    description: string;
    icon: typeof Trophy;
}) {
    return (
        <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                <Icon className="h-6 w-6" />
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                Membership category {number}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                    {title}
                </h2>

                <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#C8102E]">
                    {designation}
                </span>
            </div>

            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
                {description}
            </p>
        </div>
    );
}

function ListPill({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <CircleDot className="h-4 w-4 shrink-0 text-[#C8102E]" />

            <span className="text-sm font-bold text-slate-700">
                {label}
            </span>
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
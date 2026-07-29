import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/logo.png";
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    CircleUserRound,
    FileSearch,
    GraduationCap,
    Home,
    IdCard,
    MapPin,
    Search,
    ShieldCheck,
    Sparkles,
    User,
    Users,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import BreadcrumbJsonLd from "../components/seo/BreadcrumbJsonLd";
import PublicFooter from "../components/public/PublicFooter";
import PublicNavbar from "../components/public/PublicNavbar";
import { CSSProperties, ReactNode } from "react";
import { DesktopNavigation } from "../components/site/desktop-navigation";

type DirectoryPageProps = {
    searchParams?: Promise<{
        q?: string;
        page?: string;
    }>;
};

export const metadata: Metadata = {
    title: "Public Member Directory | AHPK",

    description:
        "Search and verify active members of the Association of Hotel Professionals Kenya.",

    alternates: {
        canonical: "/directory",
    },

    openGraph: {
        title: "AHPK Public Member Directory",
        description:
            "Search, verify and view professional profiles of active AHPK members.",
        url: "/directory",
        siteName:
            "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

const PAGE_SIZE = 12;

export default async function DirectoryPage({
    searchParams,
}: DirectoryPageProps) {
    const params = await searchParams;

    const query = params?.q?.trim() || "";

    const requestedPage = Number(
        params?.page || 1,
    );

    const page =
        Number.isFinite(requestedPage) &&
            requestedPage > 0
            ? Math.floor(requestedPage)
            : 1;

    const skip = (page - 1) * PAGE_SIZE;

    const where = {
        status: "ACTIVE" as const,
        isDirectoryVisible: true,

        OR: query
            ? [
                {
                    fullName: {
                        contains: query,
                        mode: "insensitive" as const,
                    },
                },
                {
                    memberNumber: {
                        contains: query,
                        mode: "insensitive" as const,
                    },
                },
                {
                    county: {
                        contains: query,
                        mode: "insensitive" as const,
                    },
                },
                {
                    employer: {
                        contains: query,
                        mode: "insensitive" as const,
                    },
                },
                {
                    position: {
                        contains: query,
                        mode: "insensitive" as const,
                    },
                },
                {
                    category: {
                        name: {
                            contains: query,
                            mode: "insensitive" as const,
                        },
                    },
                },
            ]
            : undefined,
    };

    const [members, totalMembers] =
        await Promise.all([
            prisma.member.findMany({
                where,

                include: {
                    category: true,
                    educations: true,
                    workExperiences: true,
                },

                orderBy: {
                    fullName: "asc",
                },

                skip,
                take: PAGE_SIZE,
            }),

            prisma.member.count({
                where,
            }),
        ]);

    const totalPages = Math.max(
        Math.ceil(totalMembers / PAGE_SIZE),
        1,
    );

    const currentPage = Math.min(
        page,
        totalPages,
    );

    const firstResult =
        totalMembers === 0
            ? 0
            : skip + 1;

    const lastResult = Math.min(
        skip + members.length,
        totalMembers,
    );

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: "Home",
                        url: "/",
                    },
                    {
                        name: "Member Directory",
                        url: "/directory",
                    },
                ]}
            />

            <PageHeader />

            {/* HERO */}
            <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
                <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
                    <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />

                    <div className="absolute right-0 top-0 h-full w-[55%] bg-[linear-gradient(135deg,transparent_0%,rgba(193,18,31,0.055)_100%)]" />

                    <div className="absolute right-[8%] top-12 h-64 w-64 rounded-full border border-red-100/80" />

                    <div className="absolute right-[13%] top-28 h-36 w-36 rounded-full border border-red-100/60" />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
                    <DirectoryBreadcrumb />

                    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-100 bg-white text-[#C1121F] shadow-sm">
                                    <Users className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#C1121F]">
                                        AHPK Public Directory
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        Official professional membership
                                        records
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Find and Verify
                                <span className="mt-2 block text-[#C1121F]">
                                    AHPK Professionals
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                Search the official public directory
                                to verify active AHPK members and view
                                their professional membership
                                profiles.
                            </p>
                        </div>

                        <DirectoryTrustCard
                            totalMembers={totalMembers}
                        />
                    </div>
                </div>
            </section>

            {/* SEARCH */}
            <section className="relative z-10 -mt-7">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">
                        <form
                            action="/directory"
                            method="get"
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                                <div className="flex-1">
                                    <label
                                        htmlFor="directory-search"
                                        className="block text-sm font-extrabold text-slate-800"
                                    >
                                        Search the member directory
                                    </label>

                                    <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                                        Search by member name, member
                                        number, county, employer,
                                        position or membership category.
                                    </p>

                                    <div className="relative mt-3">
                                        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                        <input
                                            id="directory-search"
                                            name="q"
                                            type="search"
                                            defaultValue={query}
                                            autoComplete="off"
                                            placeholder="Example: John Kamau, AHPK-0012 or Nairobi"
                                            className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 hover:border-slate-300 focus:border-[#C1121F] focus:bg-white focus:ring-4 focus:ring-red-100/70"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#C1121F] px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100"
                                >
                                    <Search className="h-5 w-5" />
                                    Search Members
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </form>

                        {query ? (
                            <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm font-semibold text-slate-600">
                                    Showing results for{" "}
                                    <span className="font-extrabold text-slate-950">
                                        “{query}”
                                    </span>
                                </p>

                                <Link
                                    href="/directory"
                                    className="inline-flex items-center gap-2 text-sm font-extrabold text-[#C1121F] transition hover:text-red-800"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Clear Search
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* DIRECTORY RESULTS */}
            <section className="bg-slate-50/80 pb-16 pt-12 sm:pb-20 sm:pt-14">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C1121F]">
                                Directory Results
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                                {query
                                    ? "Matching Professionals"
                                    : "Verified AHPK Members"}
                            </h2>

                            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                                {totalMembers > 0
                                    ? `Showing ${firstResult}–${lastResult} of ${totalMembers} member${totalMembers === 1
                                        ? ""
                                        : "s"
                                    }.`
                                    : "No matching members were found."}
                            </p>
                        </div>

                        {totalMembers > 0 ? (
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700">
                                <CheckCircle2 className="h-4 w-4" />

                                {totalMembers} verified member
                                {totalMembers === 1 ? "" : "s"}
                            </div>
                        ) : null}
                    </div>

                    {members.length > 0 ? (
                        <>
                            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {members.map((member) => (
                                    <MemberCard
                                        key={member.id}
                                        member={member}
                                    />
                                ))}
                            </div>

                            {totalPages > 1 ? (
                                <DirectoryPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    query={query}
                                />
                            ) : null}
                        </>
                    ) : (
                        <EmptyState query={query} />
                    )}
                </div>
            </section>

            {/* DIRECTORY NOTICE */}
            <section className="border-t border-slate-200 bg-white py-14 sm:py-16">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid overflow-hidden rounded-[28px] border border-red-100 bg-red-50/60 lg:grid-cols-[minmax(0,1fr)_330px]">
                        <div className="p-7 sm:p-9">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C1121F] shadow-sm">
                                <ShieldCheck className="h-6 w-6" />
                            </div>

                            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C1121F]">
                                Official membership information
                            </p>

                            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                                Directory records are provided for
                                professional verification.
                            </h2>

                            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                Only active members who have approved
                                public visibility appear in this
                                directory. Contact the AHPK Secretariat
                                when additional verification is
                                required.
                            </p>
                        </div>

                        <div className="flex items-center border-t border-red-100 bg-white/70 p-7 lg:border-l lg:border-t-0">
                            <div className="w-full">
                                <p className="text-sm font-extrabold text-slate-900">
                                    Need further assistance?
                                </p>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                                    Contact the AHPK Secretariat about
                                    membership or directory records.
                                </p>

                                <Link
                                    href="/contact"
                                    className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C1121F] px-5 text-sm font-extrabold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100"
                                >
                                    Contact Secretariat
                                    <ArrowRight className="h-4 w-4" />
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

type MemberCardProps = {
    member: {
        id: string;
        fullName: string | null;
        memberNumber: string;
        profileImageUrl: string | null;
        position: string | null;
        employer: string | null;
        county: string | null;

        category: {
            name: string;
        };

        educations: Array<unknown>;
        workExperiences: Array<unknown>;
    };
};

function MemberCard({
    member,
}: MemberCardProps) {
    const memberName =
        member.fullName || "AHPK Member";

    const professionalTitle =
        member.position ||
        "Hospitality Professional";

    return (
        <Link
            href={`/directory/${encodeURIComponent(
                member.memberNumber,
            )}`}
            aria-label={`View ${memberName}'s professional profile`}
            className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-xl hover:shadow-slate-200/70"
        >
            <div className="relative border-b border-slate-100 bg-[linear-gradient(135deg,#fff_0%,#fff7f7_100%)] px-6 pb-5 pt-6">
                <div className="absolute right-5 top-5 h-20 w-20 rounded-full border border-red-100/70" />

                <div className="relative flex items-start justify-between gap-4">
                    <MemberAvatar
                        imageUrl={
                            member.profileImageUrl
                        }
                        memberName={memberName}
                    />

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified
                    </span>
                </div>

                <h2 className="relative mt-5 line-clamp-1 text-xl font-extrabold tracking-tight text-slate-950 transition group-hover:text-[#C1121F]">
                    {memberName}
                </h2>

                <div className="relative mt-2 flex items-center gap-2">
                    <IdCard className="h-4 w-4 text-[#C1121F]" />

                    <p className="font-mono text-xs font-extrabold tracking-wide text-[#C1121F]">
                        {member.memberNumber}
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div>
                    <p className="line-clamp-1 text-sm font-extrabold text-slate-900">
                        {professionalTitle}
                    </p>

                    <p className="mt-1 line-clamp-2 min-h-12 text-sm font-medium leading-6 text-slate-500">
                        {member.employer
                            ? `${professionalTitle} at ${member.employer}`
                            : "A verified professional member of the Association of Hotel Professionals Kenya."}
                    </p>
                </div>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                    <MemberDetail
                        icon={<BadgeCheck />}
                        label="Category"
                        value={
                            member.category.name
                        }
                    />

                    <MemberDetail
                        icon={<MapPin />}
                        label="Location"
                        value={
                            member.county ||
                            "County not listed"
                        }
                    />

                    <MemberDetail
                        icon={<GraduationCap />}
                        label="Education"
                        value={`${member.educations.length} record${member.educations
                            .length === 1
                            ? ""
                            : "s"
                            }`}
                    />

                    <MemberDetail
                        icon={
                            <BriefcaseBusiness />
                        }
                        label="Experience"
                        value={`${member.workExperiences.length} record${member.workExperiences
                            .length === 1
                            ? ""
                            : "s"
                            }`}
                    />
                </div>

                <div className="mt-auto pt-6">
                    <div className="flex min-h-12 items-center justify-between rounded-xl bg-slate-50 px-4 text-sm font-extrabold text-slate-700 transition group-hover:bg-red-50 group-hover:text-[#C1121F]">
                        View Professional Profile

                        <ArrowRight className="h-4 w-4 text-[#C1121F] transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

function MemberAvatar({
    imageUrl,
    memberName,
}: {
    imageUrl?: string | null;
    memberName: string;
}) {
    return (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-lg shadow-slate-200/70">
            {imageUrl ? (
                // Native img avoids requiring every external profile
                // image host in next.config image remotePatterns.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imageUrl}
                    alt={memberName}
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
            ) : (
                <User
                    aria-hidden="true"
                    className="h-9 w-9 text-slate-300"
                />
            )}
        </div>
    );
}

function MemberDetail({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C1121F] [&>svg]:h-4 [&>svg]:w-4">
                {icon}
            </span>

            <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                    {label}
                </p>

                <p className="mt-0.5 line-clamp-1 text-sm font-semibold text-slate-700">
                    {value}
                </p>
            </div>
        </div>
    );
}

function DirectoryTrustCard({
    totalMembers,
}: {
    totalMembers: number;
}) {
    return (
        <div className="rounded-[26px] border border-red-100 bg-white/95 p-6 shadow-lg shadow-red-100/40 backdrop-blur">
            <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C1121F]">
                    <ShieldCheck className="h-6 w-6" />
                </span>

                <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C1121F]">
                        Official directory
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                        Profiles displayed here are
                        active, verified AHPK membership
                        records approved for public
                        visibility.
                    </p>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
                <HeroStat
                    icon={<Users />}
                    value={totalMembers.toLocaleString(
                        "en-KE",
                    )}
                    label="Members"
                />

                <HeroStat
                    icon={<BadgeCheck />}
                    value="Verified"
                    label="Records"
                />
            </div>
        </div>
    );
}

function HeroStat({
    icon,
    value,
    label,
}: {
    icon: ReactNode;
    value: string;
    label: string;
}) {
    return (
        <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-[#C1121F] [&>svg]:h-5 [&>svg]:w-5">
                {icon}
            </span>

            <p className="mt-3 text-lg font-extrabold text-slate-950">
                {value}
            </p>

            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                {label}
            </p>
        </div>
    );
}

function EmptyState({
    query,
}: {
    query: string;
}) {
    return (
        <div className="mt-8 rounded-[28px] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                <FileSearch className="h-8 w-8" />
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C1121F]">
                No matching records
            </p>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">
                We could not find that member
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600">
                {query
                    ? `No active public member record matched “${query}”. Check the spelling, member number or try a broader search.`
                    : "There are currently no active public membership records to display."}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                    href="/directory"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C1121F] px-6 text-sm font-extrabold text-white transition hover:bg-red-800"
                >
                    <ArrowLeft className="h-4 w-4" />
                    View All Members
                </Link>

                <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-extrabold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-[#C1121F]"
                >
                    Contact Secretariat
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

function DirectoryPagination({
    currentPage,
    totalPages,
    query,
}: {
    currentPage: number;
    totalPages: number;
    query: string;
}) {
    const visiblePages =
        getVisiblePageNumbers(
            currentPage,
            totalPages,
        );

    return (
        <nav
            aria-label="Directory pagination"
            className="mt-12 flex flex-col items-center gap-5"
        >
            <p className="text-sm font-semibold text-slate-500">
                Page{" "}
                <span className="font-extrabold text-slate-900">
                    {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-extrabold text-slate-900">
                    {totalPages}
                </span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
                {currentPage > 1 ? (
                    <PaginationLink
                        href={buildDirectoryUrl(
                            query,
                            currentPage - 1,
                        )}
                        label="Previous"
                        icon={
                            <ChevronLeft className="h-4 w-4" />
                        }
                    />
                ) : (
                    <PaginationDisabled
                        label="Previous"
                        icon={
                            <ChevronLeft className="h-4 w-4" />
                        }
                    />
                )}

                {visiblePages.map(
                    (item, index) => {
                        if (item === "ellipsis") {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="flex h-11 min-w-11 items-center justify-center px-2 text-sm font-extrabold text-slate-400"
                                >
                                    …
                                </span>
                            );
                        }

                        const isActive =
                            item === currentPage;

                        return (
                            <Link
                                key={item}
                                href={buildDirectoryUrl(
                                    query,
                                    item,
                                )}
                                aria-current={
                                    isActive
                                        ? "page"
                                        : undefined
                                }
                                className={[
                                    "flex h-11 min-w-11 items-center justify-center rounded-xl px-3 text-sm font-extrabold transition",
                                    isActive
                                        ? "bg-[#C1121F] text-white shadow-sm"
                                        : "border border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-[#C1121F]",
                                ].join(" ")}
                            >
                                {item}
                            </Link>
                        );
                    },
                )}

                {currentPage < totalPages ? (
                    <PaginationLink
                        href={buildDirectoryUrl(
                            query,
                            currentPage + 1,
                        )}
                        label="Next"
                        icon={
                            <ChevronRight className="h-4 w-4" />
                        }
                        iconAfter
                    />
                ) : (
                    <PaginationDisabled
                        label="Next"
                        icon={
                            <ChevronRight className="h-4 w-4" />
                        }
                        iconAfter
                    />
                )}
            </div>
        </nav>
    );
}

function PaginationLink({
    href,
    label,
    icon,
    iconAfter = false,
}: {
    href: string;
    label: string;
    icon: ReactNode;
    iconAfter?: boolean;
}) {
    return (
        <Link
            href={href}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-[#C1121F]"
        >
            {!iconAfter ? icon : null}
            {label}
            {iconAfter ? icon : null}
        </Link>
    );
}

function PaginationDisabled({
    label,
    icon,
    iconAfter = false,
}: {
    label: string;
    icon: ReactNode;
    iconAfter?: boolean;
}) {
    return (
        <span
            aria-disabled="true"
            className="flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-100 px-4 text-sm font-extrabold text-slate-400"
        >
            {!iconAfter ? icon : null}
            {label}
            {iconAfter ? icon : null}
        </span>
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
function DirectoryBreadcrumb() {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500"
        >
            <Link
                href="/"
                className="inline-flex items-center gap-2 transition hover:text-[#C1121F]"
            >
                <Home className="h-4 w-4" />
                Home
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                aria-current="page"
                className="text-[#C1121F]"
            >
                Member Directory
            </span>
        </nav>
    );
}

function buildDirectoryUrl(
    query: string,
    page: number,
) {
    const searchParams =
        new URLSearchParams();

    if (query) {
        searchParams.set("q", query);
    }

    if (page > 1) {
        searchParams.set(
            "page",
            String(page),
        );
    }

    const search =
        searchParams.toString();

    return search
        ? `/directory?${search}`
        : "/directory";
}

function getVisiblePageNumbers(
    currentPage: number,
    totalPages: number,
): Array<number | "ellipsis"> {
    if (totalPages <= 7) {
        return Array.from(
            {
                length: totalPages,
            },
            (_, index) => index + 1,
        );
    }

    if (currentPage <= 4) {
        return [
            1,
            2,
            3,
            4,
            5,
            "ellipsis",
            totalPages,
        ];
    }

    if (
        currentPage >=
        totalPages - 3
    ) {
        return [
            1,
            "ellipsis",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages,
    ];
}
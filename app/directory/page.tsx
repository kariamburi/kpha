import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";

import Logo from "@/app/assets/logo.png";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    FileSearch,
    Home,
    Search,
    ShieldCheck,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import BreadcrumbJsonLd from "../components/seo/BreadcrumbJsonLd";
import PublicFooter from "../components/public/PublicFooter";

import {
    CSSProperties,
    ReactNode,
} from "react";

import { DesktopNavigation } from "../components/site/desktop-navigation";

import MemberCarousel, {
    DirectoryCarouselMember,
} from "./MemberCarousel";

type DirectoryPageProps = {
    searchParams?: Promise<{
        q?: string;
        page?: string;
    }>;
};

export const metadata: Metadata = {
    title:
        "Public Member Directory | AHPK",

    description:
        "Search and verify active members of the Association of Hotel Professionals Kenya.",

    alternates: {
        canonical:
            "/directory",
    },

    openGraph: {
        title:
            "AHPK Public Member Directory",

        description:
            "Search, verify and view professional profiles of active AHPK members.",

        url:
            "/directory",

        siteName:
            "Association of Hotel Professionals Kenya",

        locale:
            "en_KE",

        type:
            "website",
    },

    robots: {
        index:
            true,

        follow:
            true,
    },
};

const PAGE_SIZE = 12;

/* =========================================================
   PAGE
========================================================= */

export default async function DirectoryPage({
    searchParams,
}: DirectoryPageProps) {
    const params =
        await searchParams;

    const query =
        params?.q?.trim() ||
        "";

    const requestedPage =
        Number(
            params?.page ||
            1,
        );

    const page =
        Number.isFinite(
            requestedPage,
        ) &&
            requestedPage > 0
            ? Math.floor(
                requestedPage,
            )
            : 1;

    const skip =
        (page - 1) *
        PAGE_SIZE;

    const now =
        new Date();

    const where = {
        status:
            "ACTIVE" as const,

        isDirectoryVisible:
            true,

        expiryDate: {
            gte:
                now,
        },

        OR: query
            ? [
                {
                    fullName: {
                        contains:
                            query,

                        mode:
                            "insensitive" as const,
                    },
                },

                {
                    memberNumber: {
                        contains:
                            query,

                        mode:
                            "insensitive" as const,
                    },
                },

                {
                    county: {
                        contains:
                            query,

                        mode:
                            "insensitive" as const,
                    },
                },

                {
                    employer: {
                        contains:
                            query,

                        mode:
                            "insensitive" as const,
                    },
                },

                {
                    position: {
                        contains:
                            query,

                        mode:
                            "insensitive" as const,
                    },
                },

                {
                    category: {
                        name: {
                            contains:
                                query,

                            mode:
                                "insensitive" as const,
                        },
                    },
                },
            ]
            : undefined,
    };

    const [
        members,
        totalMembers,
    ] = await Promise.all([
        prisma.member.findMany({
            where,

            include: {
                category:
                    true,

                educations:
                    true,

                workExperiences:
                    true,
            },

            orderBy: {
                fullName:
                    "asc",
            },

            skip,

            take:
                PAGE_SIZE,
        }),

        prisma.member.count({
            where,
        }),
    ]);

    const totalPages =
        Math.max(
            Math.ceil(
                totalMembers /
                PAGE_SIZE,
            ),
            1,
        );

    const currentPage =
        Math.min(
            page,
            totalPages,
        );

    const firstResult =
        totalMembers === 0
            ? 0
            : skip + 1;

    const lastResult =
        Math.min(
            skip +
            members.length,

            totalMembers,
        );

    const carouselMembers: DirectoryCarouselMember[] =
        members.map(
            (member) => ({
                id:
                    member.id,

                fullName:
                    member.fullName ||
                    "AHPK Member",

                memberNumber:
                    member.memberNumber,

                profileImageUrl:
                    member.profileImageUrl,

                position:
                    member.position ||
                    "Hospitality Professional",

                employer:
                    member.employer,

                county:
                    member.county,

                categoryName:
                    member.category
                        .name,

                educationCount:
                    member.educations
                        .length,

                experienceCount:
                    member
                        .workExperiences
                        .length,
            }),
        );

    return (
        <main className="min-h-screen bg-white text-slate-950">
            {/* =====================================================
                SEO
            ===================================================== */}

            <BreadcrumbJsonLd
                items={[
                    {
                        name:
                            "Home",

                        url:
                            "/",
                    },

                    {
                        name:
                            "Member Directory",

                        url:
                            "/directory",
                    },
                ]}
            />

            <PageHeader />

            {/* =====================================================
                MASTHEAD
            ===================================================== */}

            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <DirectoryBreadcrumb />

                    <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
                        <div className="max-w-4xl">
                            <p className="border-l-4 border-[#C8102E] pl-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                AHPK Public
                                Directory
                            </p>

                            <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                Find and Verify
                                AHPK
                                Professionals
                            </h1>

                            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-600 sm:text-base">
                                Search the
                                official public
                                directory to
                                confirm active
                                AHPK membership
                                and view
                                verified
                                professional
                                profiles.
                            </p>
                        </div>

                        <DirectoryTrustCard
                            totalMembers={
                                totalMembers
                            }
                        />
                    </div>
                </div>
            </section>

            {/* =====================================================
                SEARCH
            ===================================================== */}

            <section className="bg-white py-5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <form
                        action="/directory"
                        method="get"
                        className="border-t-4 border-[#C8102E] pt-4"
                    >
                        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                            <div>
                                <label
                                    htmlFor="directory-search"
                                    className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]"
                                >
                                    Search the
                                    Member
                                    Directory
                                </label>

                                <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                                    Search by
                                    name, member
                                    number,
                                    county,
                                    employer,
                                    position or
                                    membership
                                    category.
                                </p>

                                <div className="relative mt-2">
                                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                    <input
                                        id="directory-search"
                                        name="q"
                                        type="search"
                                        defaultValue={
                                            query
                                        }
                                        autoComplete="off"
                                        placeholder="Example: John Kamau, AHPK-0012 or Nairobi"
                                        className="min-h-11 w-full border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 hover:border-slate-400 focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="group flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-[#C8102E] px-6 text-sm font-black text-white transition hover:bg-red-800"
                            >
                                <Search className="h-4 w-4" />

                                Search
                                Members

                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </form>

                    {query ? (
                        <div className="mt-3 flex flex-col gap-2 border-y border-slate-200 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs font-semibold text-slate-600">
                                Showing
                                results for{" "}

                                <span className="font-black text-slate-950">
                                    “{query}”
                                </span>
                            </p>

                            <Link
                                href="/directory"
                                className="group inline-flex items-center gap-2 text-xs font-black text-[#C8102E] transition hover:text-red-800"
                            >
                                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />

                                Clear
                                Search
                            </Link>
                        </div>
                    ) : null}
                </div>
            </section>

            {/* =====================================================
                MEMBER RESULTS
            ===================================================== */}

            <section className="border-t border-slate-200 bg-slate-50 py-5 sm:py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-3 border-t-4 border-slate-950 pt-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                Directory
                                Results
                            </p>

                            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                {query
                                    ? "Matching Professionals"
                                    : "Verified AHPK Members"}
                            </h2>

                            <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                                {totalMembers >
                                    0
                                    ? `Showing ${firstResult}–${lastResult} of ${totalMembers} member${totalMembers ===
                                        1
                                        ? ""
                                        : "s"
                                    }. Drag or use the controls to browse.`
                                    : "No matching members were found."}
                            </p>
                        </div>

                        {totalMembers >
                            0 ? (
                            <div className="inline-flex w-fit items-center gap-2 border border-emerald-300 bg-white px-3 py-1.5 text-[10px] font-black text-emerald-700">
                                <CheckCircle2 className="h-3.5 w-3.5" />

                                {
                                    totalMembers
                                }{" "}
                                verified
                                member
                                {totalMembers ===
                                    1
                                    ? ""
                                    : "s"}
                            </div>
                        ) : null}
                    </div>

                    {carouselMembers.length >
                        0 ? (
                        <>
                            <div className="mt-4">
                                <MemberCarousel
                                    members={
                                        carouselMembers
                                    }
                                />
                            </div>

                            {totalPages >
                                1 ? (
                                <DirectoryPagination
                                    currentPage={
                                        currentPage
                                    }
                                    totalPages={
                                        totalPages
                                    }
                                    query={
                                        query
                                    }
                                />
                            ) : null}
                        </>
                    ) : (
                        <EmptyState
                            query={
                                query
                            }
                        />
                    )}
                </div>
            </section>

            {/* =====================================================
                DIRECTORY NOTICE
            ===================================================== */}

            <section className="border-t border-slate-200 bg-white py-5 sm:py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid border-t-4 border-[#C8102E] bg-slate-50 lg:grid-cols-[minmax(0,1fr)_280px]">
                        <div className="p-5">
                            <ShieldCheck className="h-5 w-5 text-[#C8102E]" />

                            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                Official
                                Membership
                                Information
                            </p>

                            <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                                Directory
                                records
                                support
                                professional
                                verification.
                            </h2>

                            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-600">
                                Only active
                                members who
                                have approved
                                public
                                visibility
                                appear here.
                                Contact the
                                AHPK
                                Secretariat
                                when
                                additional
                                verification
                                is required.
                            </p>
                        </div>

                        <div className="border-t border-slate-200 bg-slate-950 p-4 text-white lg:border-l lg:border-t-0">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-300">
                                Need Further
                                Assistance?
                            </p>

                            <p className="mt-1.5 text-xs font-medium leading-5 text-slate-300">
                                Contact the
                                Secretariat
                                about
                                membership
                                status or
                                directory
                                records.
                            </p>

                            <Link
                                href="/contact"
                                className="group mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 bg-[#C8102E] px-4 text-xs font-black text-white transition hover:bg-red-700"
                            >
                                Contact
                                Secretariat

                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

/* =========================================================
   TRUST CARD
========================================================= */

function DirectoryTrustCard({
    totalMembers,
}: {
    totalMembers: number;
}) {
    return (
        <div className="border-t-4 border-[#C8102E] bg-slate-50 p-4">
            <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />

                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#C8102E]">
                        Official
                        Directory
                    </p>

                    <p className="mt-1 text-xs font-medium leading-5 text-slate-600">
                        Active
                        records
                        approved for
                        public
                        visibility.
                    </p>
                </div>
            </div>

            <div className="mt-3 grid grid-cols-2 border-y border-slate-200">
                <DirectoryFact
                    value={totalMembers.toLocaleString(
                        "en-KE",
                    )}
                    label="Members"
                />

                <DirectoryFact
                    value="Verified"
                    label="Records"
                />
            </div>
        </div>
    );
}

/* =========================================================
   DIRECTORY FACT
========================================================= */

function DirectoryFact({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <div className="border-r border-slate-200 py-2.5 last:border-r-0">
            <p className="text-lg font-black text-slate-950">
                {value}
            </p>

            <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-500">
                {label}
            </p>
        </div>
    );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
    query,
}: {
    query: string;
}) {
    return (
        <div className="mt-4 border-t-4 border-[#C8102E] bg-white p-6 text-center">
            <FileSearch className="mx-auto h-7 w-7 text-[#C8102E]" />

            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                No Matching
                Records
            </p>

            <h2 className="mt-1.5 text-2xl font-black tracking-tight text-slate-950">
                We could not
                find that
                member
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-600">
                {query
                    ? `No active public member record matched “${query}”. Check the spelling, member number or try a broader search.`
                    : "There are currently no active public membership records to display."}
            </p>

            <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
                <Link
                    href="/directory"
                    className="group inline-flex min-h-10 items-center justify-center gap-2 bg-[#C8102E] px-5 text-xs font-black text-white transition hover:bg-red-800"
                >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />

                    View All
                    Members
                </Link>

                <Link
                    href="/contact"
                    className="group inline-flex min-h-10 items-center justify-center gap-2 border border-slate-300 bg-white px-5 text-xs font-black text-slate-700 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                >
                    Contact
                    Secretariat

                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}

/* =========================================================
   PAGINATION
========================================================= */

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
            className="mt-6 flex flex-col items-center gap-3"
        >
            <p className="text-xs font-semibold text-slate-500">
                Page{" "}

                <span className="font-extrabold text-slate-900">
                    {
                        currentPage
                    }
                </span>{" "}

                of{" "}

                <span className="font-extrabold text-slate-900">
                    {
                        totalPages
                    }
                </span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
                {currentPage >
                    1 ? (
                    <PaginationLink
                        href={buildDirectoryUrl(
                            query,
                            currentPage -
                            1,
                        )}
                        label="Previous"
                        icon={
                            <ChevronLeft className="h-3.5 w-3.5" />
                        }
                    />
                ) : (
                    <PaginationDisabled
                        label="Previous"
                        icon={
                            <ChevronLeft className="h-3.5 w-3.5" />
                        }
                    />
                )}

                {visiblePages.map(
                    (
                        item,
                        index,
                    ) => {
                        if (
                            item ===
                            "ellipsis"
                        ) {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="flex h-10 min-w-10 items-center justify-center px-2 text-sm font-extrabold text-slate-400"
                                >
                                    …
                                </span>
                            );
                        }

                        const isActive =
                            item ===
                            currentPage;

                        return (
                            <Link
                                key={
                                    item
                                }
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
                                    "flex h-10 min-w-10 items-center justify-center px-3 text-xs font-black transition",

                                    isActive
                                        ? "bg-[#C8102E] text-white"
                                        : "border border-slate-300 bg-white text-slate-700 hover:border-[#C8102E] hover:bg-red-50 hover:text-[#C8102E]",
                                ].join(
                                    " ",
                                )}
                            >
                                {
                                    item
                                }
                            </Link>
                        );
                    },
                )}

                {currentPage <
                    totalPages ? (
                    <PaginationLink
                        href={buildDirectoryUrl(
                            query,
                            currentPage +
                            1,
                        )}
                        label="Next"
                        icon={
                            <ChevronRight className="h-3.5 w-3.5" />
                        }
                        iconAfter
                    />
                ) : (
                    <PaginationDisabled
                        label="Next"
                        icon={
                            <ChevronRight className="h-3.5 w-3.5" />
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
            className="flex h-10 items-center justify-center gap-2 border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E]"
        >
            {!iconAfter
                ? icon
                : null}

            {label}

            {iconAfter
                ? icon
                : null}
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
            className="flex h-10 cursor-not-allowed items-center justify-center gap-2 border border-slate-100 bg-slate-100 px-3 text-xs font-extrabold text-slate-400"
        >
            {!iconAfter
                ? icon
                : null}

            {label}

            {iconAfter
                ? icon
                : null}
        </span>
    );
}

/* =========================================================
   HEADER
========================================================= */

function PageHeader() {
    return (
        <header
            className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
            style={
                {
                    "--header-height":
                        "76px",
                } as CSSProperties
            }
        >
            <div className="mx-auto flex h-[74px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="AHPK homepage"
                    className="shrink-0"
                >
                    <Image
                        src={Logo}
                        alt="Association of Hotel Professionals Kenya"
                        width={76}
                        height={76}
                        priority
                        className="h-[58px] w-[58px] object-contain sm:h-[62px] sm:w-[62px]"
                    />
                </Link>

                <div className="ml-auto flex items-center">
                    <DesktopNavigation />
                </div>
            </div>
        </header>
    );
}

/* =========================================================
   BREADCRUMB
========================================================= */

function DirectoryBreadcrumb() {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-500"
        >
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 transition hover:text-[#C8102E]"
            >
                <Home className="h-3.5 w-3.5" />

                Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />

            <span
                aria-current="page"
                className="text-[#C8102E]"
            >
                Member Directory
            </span>
        </nav>
    );
}

/* =========================================================
   DIRECTORY URL
========================================================= */

function buildDirectoryUrl(
    query: string,
    page: number,
) {
    const searchParams =
        new URLSearchParams();

    if (query) {
        searchParams.set(
            "q",
            query,
        );
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

/* =========================================================
   PAGE NUMBERS
========================================================= */

function getVisiblePageNumbers(
    currentPage: number,
    totalPages: number,
): Array<
    number | "ellipsis"
> {
    if (
        totalPages <=
        7
    ) {
        return Array.from(
            {
                length:
                    totalPages,
            },

            (
                _,
                index,
            ) =>
                index +
                1,
        );
    }

    if (
        currentPage <=
        4
    ) {
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
        totalPages -
        3
    ) {
        return [
            1,
            "ellipsis",
            totalPages -
            4,
            totalPages -
            3,
            totalPages -
            2,
            totalPages -
            1,
            totalPages,
        ];
    }

    return [
        1,
        "ellipsis",
        currentPage -
        1,
        currentPage,
        currentPage +
        1,
        "ellipsis",
        totalPages,
    ];
}
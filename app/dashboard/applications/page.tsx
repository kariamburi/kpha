import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import {
    canManageApplications,
    isSuperAdmin,
} from "@/lib/roles";

import { deleteApplication } from "./actions";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 200, 350, 500] as const;

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default async function ApplicationsPage({
    searchParams,
}: {
    searchParams?: Promise<{
        q?: string;
        status?: string;
        payment?: string;
        category?: string;
        consent?: string;
        page?: string;
        perPage?: string;
    }>;
}) {
    const user =
        await getAuthUser();

    if (
        !user ||
        !canManageApplications(
            user.adminRole,
        )
    ) {
        redirect("/dashboard");
    }

    const params =
        await searchParams;

    const q = String(
        params?.q || "",
    ).trim();

    const status = String(
        params?.status || "",
    ).trim();

    const payment = String(
        params?.payment || "",
    ).trim();

    const category = String(
        params?.category || "",
    ).trim();

    const consent = String(
        params?.consent || "",
    ).trim();

    const requestedPageSize = Number(params?.perPage ?? 10);
    const pageSize = PAGE_SIZE_OPTIONS.some((size) => size === requestedPageSize)
        ? requestedPageSize
        : 10;

    const requestedPage = Number(params?.page ?? 1);
    const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1;

    const categories =
        await prisma.membershipCategory.findMany({
            orderBy: {
                name: "asc",
            },
        });

    const applications =
        await prisma.membershipApplication.findMany({
            where: {
                ...(status
                    ? {
                        status:
                            status as any,
                    }
                    : {}),

                ...(payment
                    ? {
                        paymentStatus:
                            payment as any,
                    }
                    : {}),

                ...(category
                    ? {
                        categoryId:
                            category,
                    }
                    : {}),

                ...(consent === "YES"
                    ? {
                        dataProtectionConsent:
                            true,
                    }
                    : consent === "NO"
                        ? {
                            dataProtectionConsent:
                                false,
                        }
                        : {}),

                ...(q
                    ? {
                        OR: [
                            {
                                fullName: {
                                    contains:
                                        q,
                                    mode:
                                        "insensitive",
                                },
                            },

                            {
                                email: {
                                    contains:
                                        q,
                                    mode:
                                        "insensitive",
                                },
                            },

                            {
                                phone: {
                                    contains:
                                        q,
                                    mode:
                                        "insensitive",
                                },
                            },

                            {
                                idNumber: {
                                    contains:
                                        q,
                                    mode:
                                        "insensitive",
                                },
                            },

                            {
                                qualification: {
                                    contains:
                                        q,
                                    mode:
                                        "insensitive",
                                },
                            },

                            {
                                institution: {
                                    contains:
                                        q,
                                    mode:
                                        "insensitive",
                                },
                            },

                            {
                                position: {
                                    contains:
                                        q,
                                    mode:
                                        "insensitive",
                                },
                            },

                            {
                                employer: {
                                    contains:
                                        q,
                                    mode:
                                        "insensitive",
                                },
                            },

                            {
                                experience: {
                                    contains:
                                        q,
                                    mode:
                                        "insensitive",
                                },
                            },
                        ],
                    }
                    : {}),
            },

            include: {
                user: true,
                category: true,
            },

            orderBy: {
                createdAt:
                    "desc",
            },
        });

    const totalApplications =
        applications.length;

    const pendingApplications =
        applications.filter(
            (application) =>
                application.status ===
                "PENDING",
        ).length;

    const approvedApplications =
        applications.filter(
            (application) =>
                application.status ===
                "APPROVED",
        ).length;

    const paidApplications =
        applications.filter(
            (application) =>
                application.paymentStatus ===
                "PAID",
        ).length;

    const consentedApplications =
        applications.filter(
            (application) =>
                application.dataProtectionConsent,
        ).length;

    const totalPages =
        Math.max(
            Math.ceil(
                totalApplications /
                pageSize,
            ),
            1,
        );

    const safePage =
        Math.min(
            currentPage,
            totalPages,
        );

    const start =
        (safePage - 1) *
        pageSize;

    const paginatedApplications =
        applications.slice(
            start,
            start + pageSize,
        );

    const query =
        new URLSearchParams();

    if (q) {
        query.set(
            "q",
            q,
        );
    }

    if (status) {
        query.set(
            "status",
            status,
        );
    }

    if (payment) {
        query.set(
            "payment",
            payment,
        );
    }

    if (category) {
        query.set(
            "category",
            category,
        );
    }

    if (consent) {
        query.set(
            "consent",
            consent,
        );
    }

    query.set("perPage", String(pageSize));

    const prevQuery =
        new URLSearchParams(
            query,
        );

    prevQuery.set(
        "page",
        String(
            Math.max(
                safePage - 1,
                1,
            ),
        ),
    );

    const nextQuery =
        new URLSearchParams(
            query,
        );

    nextQuery.set(
        "page",
        String(
            Math.min(
                safePage + 1,
                totalPages,
            ),
        ),
    );

    return (
        <div className="space-y-5">
            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">
                    AHPK Membership
                </p>

                <div className="mt-1">
                    <h1 className="text-3xl font-black text-slate-950">
                        Applications
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Review, filter,
                        approve, and manage
                        membership
                        applications.
                    </p>
                </div>
            </div>

            {/* =====================================================
                FILTERS
            ===================================================== */}

            <form
                action="/dashboard/applications"
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Applications
                </div>

                <input type="hidden" name="perPage" value={pageSize} />
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_150px_150px_210px_150px_auto]">
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="Search applicant, employer, position, qualification or ID."
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <select
                        name="status"
                        defaultValue={
                            status
                        }
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="APPROVED">
                            Approved
                        </option>

                        <option value="REJECTED">
                            Rejected
                        </option>
                    </select>

                    <select
                        name="payment"
                        defaultValue={
                            payment
                        }
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">
                            All Payments
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="PAID">
                            Paid
                        </option>

                        <option value="FAILED">
                            Failed
                        </option>

                        <option value="CANCELLED">
                            Cancelled
                        </option>
                    </select>

                    <select
                        name="category"
                        defaultValue={
                            category
                        }
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">
                            All Categories
                        </option>

                        {categories.map(
                            (cat) => (
                                <option
                                    key={
                                        cat.id
                                    }
                                    value={
                                        cat.id
                                    }
                                >
                                    {
                                        cat.name
                                    }
                                </option>
                            ),
                        )}
                    </select>

                    <select
                        name="consent"
                        defaultValue={
                            consent
                        }
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">
                            All Consent
                        </option>

                        <option value="YES">
                            Consent Given
                        </option>

                        <option value="NO">
                            No Consent
                        </option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="h-10 cursor-pointer rounded-md bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-black"
                        >
                            Search
                        </button>

                        <Link
                            href="/dashboard/applications"
                            className="flex h-10 items-center rounded-md border border-slate-300 px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                        >
                            Reset
                        </Link>
                    </div>
                </div>
            </form>

            {/* =====================================================
                STATS
            ===================================================== */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <StatCard
                    title="Total Applications"
                    value={
                        totalApplications.toString()
                    }
                    tone="blue"
                />

                <StatCard
                    title="Pending"
                    value={
                        pendingApplications.toString()
                    }
                    tone="amber"
                />

                <StatCard
                    title="Approved"
                    value={
                        approvedApplications.toString()
                    }
                    tone="green"
                />

                <StatCard
                    title="Paid"
                    value={
                        paidApplications.toString()
                    }
                    tone="red"
                />

                <StatCard
                    title="Consent Given"
                    value={
                        consentedApplications.toString()
                    }
                    tone="purple"
                />
            </div>

            {/* =====================================================
                APPLICATION REGISTER
            ===================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Applications List
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total{" "}
                            {totalApplications}{" "}
                            application
                            {totalApplications ===
                                1
                                ? ""
                                : "s"}{" "}
                            • Page{" "}
                            {safePage} of{" "}
                            {totalPages}
                        </p>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[690px] table-fixed border-collapse text-[12px]">
                        <colgroup>
                            <col className="w-[22%]" />
                            <col className="w-[13%]" />
                            <col className="w-[16%]" />
                            <col className="w-[13%]" />
                            <col className="w-[11%]" />
                            <col className="w-[10%]" />
                            <col className="w-[15%]" />
                        </colgroup>
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>
                                    Applicant
                                </Th>

                                <Th>
                                    Phone
                                </Th>

                                <Th>
                                    Category
                                </Th>

                                <Th>
                                    App Status
                                </Th>

                                <Th>
                                    Payment
                                </Th>

                                <Th>
                                    Date
                                </Th>

                                <th className="px-2 py-2 text-left font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedApplications.length ===
                                0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-5 py-8 text-center text-slate-500"
                                    >
                                        No
                                        applications
                                        found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedApplications.map(
                                    (
                                        app,
                                    ) => (
                                        <tr
                                            key={
                                                app.id
                                            }
                                            className="border-b hover:bg-slate-50"
                                        >
                                            <td className="px-2 py-2">
                                                <Link
                                                    href={`/dashboard/applications/${app.id}`}
                                                    title="View application details"
                                                    className="group inline-block max-w-full rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C1121F]"
                                                >
                                                    <p className="break-words font-semibold text-slate-900 transition-colors group-hover:text-[#C1121F] group-hover:underline group-focus-visible:text-[#C1121F]">
                                                        {app.fullName ||
                                                            app.user?.name ||
                                                            "Unnamed Applicant"}
                                                    </p>
                                                    <p className="break-all text-[11px] text-slate-500 transition-colors group-hover:text-[#C1121F] group-focus-visible:text-[#C1121F]">
                                                        {app.email ||
                                                            app.user?.email ||
                                                            "-"}
                                                    </p>
                                                </Link>
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                                {app.phone ||
                                                    "-"}
                                            </td>

                                            <td className="break-words px-2 py-2 text-slate-700">
                                                {app.category?.name || "-"}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2">
                                                <ApplicationStatusBadge
                                                    status={
                                                        app.status
                                                    }
                                                />
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2">
                                                <PaymentStatusBadge
                                                    status={
                                                        app.paymentStatus
                                                    }
                                                />
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                                {formatDate(
                                                    app.createdAt,
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2">
                                                <div className="flex flex-wrap items-center gap-1">
                                                    <Link
                                                        href={`/dashboard/applications/${app.id}`}
                                                        className="rounded bg-red-50 px-3 py-1.5 text-[12px] font-bold text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white"
                                                    >
                                                        View
                                                    </Link>

                                                    {isSuperAdmin(
                                                        user.adminRole,
                                                    ) ? (
                                                        <form
                                                            action={
                                                                deleteApplication
                                                            }
                                                        >
                                                            <input
                                                                type="hidden"
                                                                name="id"
                                                                value={
                                                                    app.id
                                                                }
                                                            />

                                                            <button
                                                                type="submit"
                                                                className="cursor-pointer rounded-xl bg-red-600 px-3 py-2 text-xs font-black text-white transition hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </button>
                                                        </form>
                                                    ) : null}
                                                </div>
                                            </td>
                                        </tr>
                                    ),
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* =================================================
                    PAGINATION
                ================================================= */}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t pt-4 text-sm">
                    <form action="/dashboard/applications" method="get" className="flex flex-wrap items-center gap-2">
                        {q && <input type="hidden" name="q" value={q} />}
                        {status && <input type="hidden" name="status" value={status} />}
                        {payment && <input type="hidden" name="payment" value={payment} />}
                        {category && <input type="hidden" name="category" value={category} />}
                        {consent && <input type="hidden" name="consent" value={consent} />}
                        <label htmlFor="perPage" className="font-semibold text-slate-700">
                            Applications per page
                        </label>
                        <select
                            id="perPage"
                            name="perPage"
                            defaultValue={String(pageSize)}
                            className="h-9 rounded-md border border-slate-300 bg-white px-3 font-semibold text-slate-800 outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                        >
                            {PAGE_SIZE_OPTIONS.map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                        <button type="submit" className="h-9 rounded-md bg-slate-950 px-4 font-bold text-white hover:bg-slate-800">
                            Apply
                        </button>
                    </form>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-slate-600">
                            Showing {totalApplications === 0 ? 0 : start + 1}–{Math.min(start + pageSize, totalApplications)} of {totalApplications}
                            {" "}• Page{" "}
                            {safePage} of{" "}
                            {totalPages}
                        </span>

                        <Link
                            href={`/dashboard/applications?${prevQuery.toString()}`}
                            className={`rounded border px-3 py-1.5 font-semibold ${safePage === 1
                                ? "pointer-events-none opacity-40"
                                : ""
                                }`}
                        >
                            Prev
                        </Link>

                        <span className="rounded bg-[#111111] px-3 py-1.5 font-bold text-white">
                            {safePage}
                        </span>

                        <Link
                            href={`/dashboard/applications?${nextQuery.toString()}`}
                            className={`rounded border px-3 py-1.5 font-semibold ${safePage ===
                                totalPages
                                ? "pointer-events-none opacity-40"
                                : ""
                                }`}
                        >
                            Next
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   TABLE HEADER
========================================================= */

function Th({
    children,
}: {
    children:
    React.ReactNode;
}) {
    return (
        <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
            {children}
        </th>
    );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
    title,
    value,
    tone,
}: {
    title: string;
    value: string;

    tone:
    | "blue"
    | "green"
    | "amber"
    | "red"
    | "purple";
}) {
    const styles = {
        blue: {
            backgroundColor:
                "#EEF6FF",
            borderColor:
                "#C7E0FF",
            color:
                "#2563EB",
        },

        green: {
            backgroundColor:
                "#F0FDF4",
            borderColor:
                "#BBF7D0",
            color:
                "#15803D",
        },

        amber: {
            backgroundColor:
                "#FFF8E6",
            borderColor:
                "#FCD34D",
            color:
                "#B45309",
        },

        red: {
            backgroundColor:
                "#FEF2F2",
            borderColor:
                "#FECACA",
            color:
                "#B91C1C",
        },

        purple: {
            backgroundColor:
                "#F5F3FF",
            borderColor:
                "#DDD6FE",
            color:
                "#6D28D9",
        },
    };

    return (
        <div
            style={
                styles[tone]
            }
            className="rounded-2xl border p-5 shadow-sm"
        >
            <p className="text-sm font-semibold opacity-80">
                {title}
            </p>

            <h2 className="mt-2 text-2xl font-black">
                {value}
            </h2>
        </div>
    );
}

/* =========================================================
   APPLICATION STATUS
========================================================= */

function ApplicationStatusBadge({
    status,
}: {
    status: string;
}) {
    const cls =
        status === "APPROVED"
            ? "bg-green-50 text-green-700"
            : status ===
                "REJECTED"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-700";

    return (
        <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}
        >
            {status}
        </span>
    );
}

/* =========================================================
   PAYMENT STATUS
========================================================= */

function PaymentStatusBadge({
    status,
}: {
    status: string;
}) {
    const cls =
        status === "PAID"
            ? "bg-green-50 text-green-700"
            : status ===
                "FAILED" ||
                status ===
                "CANCELLED"
                ? "bg-red-50 text-red-700"
                : "bg-slate-100 text-slate-600";

    return (
        <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}
        >
            {status}
        </span>
    );
}

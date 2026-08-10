import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import {
    canManageCertificates,
    isSuperAdmin,
} from "@/lib/roles";
import { getAuthUser } from "@/lib/auth";

import { deleteCertificate } from "./actions";
import DownloadCertificateButton from "./[id]/DownloadCertificateButton";

const PAGE_SIZE = 10;

type CertificateStatus =
    | "UPCOMING"
    | "VALID"
    | "EXPIRED";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function getCertificateStatus(
    issueDate: Date,
    expiryDate: Date,
    now: number,
): CertificateStatus {
    if (issueDate.getTime() > now) {
        return "UPCOMING";
    }

    if (expiryDate.getTime() < now) {
        return "EXPIRED";
    }

    return "VALID";
}

export default async function CertificatesPage({
    searchParams,
}: {
    searchParams?: Promise<{
        q?: string;
        status?: string;
        page?: string;
    }>;
}) {
    const user = await getAuthUser();

    if (
        !user ||
        !canManageCertificates(
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

    const currentPage = Math.max(
        Number(
            params?.page || 1,
        ),
        1,
    );

    const now = Date.now();

    const certificates =
        await prisma.certificate.findMany({
            where: {
                ...(q
                    ? {
                        OR: [
                            {
                                certificateNumber: {
                                    contains: q,
                                    mode: "insensitive",
                                },
                            },
                            {
                                verificationCode: {
                                    contains: q,
                                    mode: "insensitive",
                                },
                            },
                            {
                                member: {
                                    fullName: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                            },
                            {
                                member: {
                                    email: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                            },
                            {
                                member: {
                                    memberNumber: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        ],
                    }
                    : {}),
            },

            include: {
                member: {
                    include: {
                        user: true,
                        category: true,
                    },
                },
            },

            orderBy: {
                createdAt: "desc",
            },
        });

    const certificatesWithStatus =
        certificates.map(
            (cert) => ({
                ...cert,

                certificateStatus:
                    getCertificateStatus(
                        cert.issueDate,
                        cert.expiryDate,
                        now,
                    ),
            }),
        );

    const filteredCertificates =
        certificatesWithStatus.filter(
            (cert) => {
                if (!status) {
                    return true;
                }

                return (
                    cert.certificateStatus ===
                    status
                );
            },
        );

    const totalCertificates =
        filteredCertificates.length;

    const validCertificates =
        filteredCertificates.filter(
            (certificate) =>
                certificate.certificateStatus ===
                "VALID",
        ).length;

    const upcomingCertificates =
        filteredCertificates.filter(
            (certificate) =>
                certificate.certificateStatus ===
                "UPCOMING",
        ).length;

    const expiredCertificates =
        filteredCertificates.filter(
            (certificate) =>
                certificate.certificateStatus ===
                "EXPIRED",
        ).length;

    const totalPages = Math.max(
        Math.ceil(
            totalCertificates /
            PAGE_SIZE,
        ),
        1,
    );

    const safePage = Math.min(
        currentPage,
        totalPages,
    );

    const start =
        (safePage - 1) *
        PAGE_SIZE;

    const paginatedCertificates =
        filteredCertificates.slice(
            start,
            start + PAGE_SIZE,
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
            {/* HEADER */}
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">
                    AHPK Certification
                </p>

                <div className="mt-1">
                    <h1 className="text-3xl font-black text-slate-950">
                        Certificates
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Search, verify,
                        download, and manage
                        issued membership
                        certificates.
                    </p>
                </div>
            </div>

            {/* SEARCH */}
            <form
                action="/dashboard/certificates"
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Certificates
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="Search certificate no, verification code, member or member no."
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

                        <option value="VALID">
                            Valid
                        </option>

                        <option value="UPCOMING">
                            Upcoming
                        </option>

                        <option value="EXPIRED">
                            Expired
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
                            href="/dashboard/certificates"
                            className="flex h-10 items-center rounded-md border border-slate-300 px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                        >
                            Reset
                        </Link>
                    </div>
                </div>
            </form>

            {/* STATS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Certificates"
                    value={totalCertificates.toString()}
                    tone="blue"
                />

                <StatCard
                    title="Valid"
                    value={validCertificates.toString()}
                    tone="green"
                />

                <StatCard
                    title="Upcoming"
                    value={upcomingCertificates.toString()}
                    tone="amber"
                />

                <StatCard
                    title="Expired"
                    value={expiredCertificates.toString()}
                    tone="red"
                />
            </div>

            {/* REGISTER */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Certificate
                            Register
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total{" "}
                            {
                                totalCertificates
                            }{" "}
                            certificate
                            {totalCertificates ===
                                1
                                ? ""
                                : "s"}{" "}
                            • Page{" "}
                            {safePage} of{" "}
                            {totalPages}
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1180px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>
                                    Certificate
                                    No.
                                </Th>

                                <Th>
                                    Member
                                </Th>

                                <Th>
                                    Member No.
                                </Th>

                                <Th>
                                    Category
                                </Th>

                                <Th>
                                    Verification
                                    Code
                                </Th>

                                <Th>
                                    Valid From
                                </Th>

                                <Th>
                                    Valid Until
                                </Th>

                                <Th>
                                    Status
                                </Th>

                                <th className="px-2 py-2 text-left font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedCertificates.length ===
                                0 ? (
                                <tr>
                                    <td
                                        colSpan={
                                            9
                                        }
                                        className="px-5 py-8 text-center text-slate-500"
                                    >
                                        No
                                        certificates
                                        found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedCertificates.map(
                                    (
                                        cert,
                                    ) => (
                                        <tr
                                            key={
                                                cert.id
                                            }
                                            className="border-b hover:bg-slate-50"
                                        >
                                            <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-900">
                                                {
                                                    cert.certificateNumber
                                                }
                                            </td>

                                            <td className="px-2 py-2">
                                                <p className="font-semibold text-slate-900">
                                                    {cert
                                                        .member
                                                        .fullName ||
                                                        cert
                                                            .member
                                                            .user
                                                            ?.name ||
                                                        "-"}
                                                </p>

                                                <p className="text-[11px] text-slate-500">
                                                    {cert
                                                        .member
                                                        .email ||
                                                        cert
                                                            .member
                                                            .user
                                                            ?.email ||
                                                        "-"}
                                                </p>
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                                {
                                                    cert
                                                        .member
                                                        .memberNumber
                                                }
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                                {cert
                                                    .member
                                                    .category
                                                    ?.name ||
                                                    "-"}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 font-mono text-[#C1121F]">
                                                {
                                                    cert.verificationCode
                                                }
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                                {formatDate(
                                                    cert.issueDate,
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                                {formatDate(
                                                    cert.expiryDate,
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2">
                                                <CertificateStatusBadge
                                                    status={
                                                        cert.certificateStatus
                                                    }
                                                />
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/dashboard/certificates/${cert.id}`}
                                                        className="rounded bg-red-50 px-3 py-1.5 text-[12px] font-bold text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white"
                                                    >
                                                        View
                                                    </Link>

                                                    <DownloadCertificateButton
                                                        href={`/dashboard/certificates/${cert.id}/download`}
                                                        label="PDF"
                                                        small
                                                    />

                                                    {isSuperAdmin(
                                                        user.adminRole,
                                                    ) && (
                                                            <form
                                                                action={
                                                                    deleteCertificate
                                                                }
                                                            >
                                                                <input
                                                                    type="hidden"
                                                                    name="id"
                                                                    value={
                                                                        cert.id
                                                                    }
                                                                />

                                                                <button
                                                                    type="submit"
                                                                    className="cursor-pointer rounded bg-red-600 px-3 py-1.5 text-[12px] font-bold text-white transition hover:bg-red-700"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </form>
                                                        )}
                                                </div>
                                            </td>
                                        </tr>
                                    ),
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t pt-4 text-sm">
                    <span className="text-slate-600">
                        Total{" "}
                        {
                            totalCertificates
                        }{" "}
                        • Page{" "}
                        {safePage} of{" "}
                        {totalPages}
                    </span>

                    <Link
                        href={`/dashboard/certificates?${prevQuery.toString()}`}
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
                        href={`/dashboard/certificates?${nextQuery.toString()}`}
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
    | "red";
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
   CERTIFICATE STATUS BADGE
========================================================= */

function CertificateStatusBadge({
    status,
}: {
    status:
    CertificateStatus;
}) {
    const styles = {
        VALID:
            "bg-green-50 text-green-700",

        UPCOMING:
            "bg-blue-50 text-blue-700",

        EXPIRED:
            "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${styles[status]}`}
        >
            {status}
        </span>
    );
}
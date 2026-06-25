import Link from "next/link";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
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
    const params = await searchParams;

    const q = String(params?.q || "").trim();
    const status = String(params?.status || "").trim();
    const currentPage = Math.max(Number(params?.page || 1), 1);

    const today = new Date();

    const certificates = await prisma.certificate.findMany({
        where: {
            ...(q
                ? {
                    OR: [
                        { certificateNumber: { contains: q, mode: "insensitive" } },
                        { verificationCode: { contains: q, mode: "insensitive" } },
                        {
                            member: {
                                fullName: { contains: q, mode: "insensitive" },
                            },
                        },
                        {
                            member: {
                                email: { contains: q, mode: "insensitive" },
                            },
                        },
                        {
                            member: {
                                memberNumber: { contains: q, mode: "insensitive" },
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
        orderBy: { createdAt: "desc" },
    });

    const filteredCertificates = certificates.filter((cert) => {
        if (!status) return true;

        const expired = cert.expiryDate < today;

        if (status === "VALID") return !expired;
        if (status === "EXPIRED") return expired;

        return true;
    });

    const totalCertificates = filteredCertificates.length;
    const validCertificates = filteredCertificates.filter((c) => c.expiryDate >= today).length;
    const expiredCertificates = filteredCertificates.filter((c) => c.expiryDate < today).length;

    const totalPages = Math.max(Math.ceil(totalCertificates / PAGE_SIZE), 1);
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const paginatedCertificates = filteredCertificates.slice(start, start + PAGE_SIZE);

    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (status) query.set("status", status);

    const prevQuery = new URLSearchParams(query);
    prevQuery.set("page", String(Math.max(safePage - 1, 1)));

    const nextQuery = new URLSearchParams(query);
    nextQuery.set("page", String(Math.min(safePage + 1, totalPages)));

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">
                    AHPK Certification
                </p>

                <div className="mt-1">
                    <h1 className="text-3xl font-black text-slate-950">
                        Certificates
                    </h1>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Search, verify, download, and manage issued membership certificates.
                    </p>
                </div>
            </div>

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
                        defaultValue={status}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Status</option>
                        <option value="VALID">Valid</option>
                        <option value="EXPIRED">Expired</option>
                    </select>

                    <div className="flex gap-2">
                        <button className="h-10 cursor-pointer rounded-md bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-black">
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

            <div className="grid gap-4 md:grid-cols-3">
                <StatCard title="Total Certificates" value={totalCertificates.toString()} />
                <StatCard title="Valid" value={validCertificates.toString()} />
                <StatCard title="Expired" value={expiredCertificates.toString()} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Certificate Register
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total {totalCertificates} certificate
                            {totalCertificates === 1 ? "" : "s"} • Page {safePage} of {totalPages}
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Certificate No.</Th>
                                <Th>Member</Th>
                                <Th>Member No.</Th>
                                <Th>Category</Th>
                                <Th>Verification Code</Th>
                                <Th>Issue Date</Th>
                                <Th>Expiry</Th>
                                <Th>Status</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedCertificates.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-5 py-8 text-center text-slate-500">
                                        No certificates found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedCertificates.map((cert) => {
                                    const expired = cert.expiryDate < today;

                                    return (
                                        <tr key={cert.id} className="border-b hover:bg-slate-50">
                                            <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-900">
                                                {cert.certificateNumber}
                                            </td>

                                            <td className="px-2 py-2">
                                                <p className="font-semibold text-slate-900">
                                                    {cert.member.fullName || cert.member.user?.name || "-"}
                                                </p>
                                                <p className="text-[11px] text-slate-500">
                                                    {cert.member.email || cert.member.user?.email || "-"}
                                                </p>
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                                {cert.member.memberNumber}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                                {cert.member.category?.name || "-"}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 font-mono text-[#C1121F]">
                                                {cert.verificationCode}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                                {formatDate(cert.issueDate)}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                                {formatDate(cert.expiryDate)}
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2">
                                                <CertificateStatusBadge expired={expired} />
                                            </td>

                                            <td className="whitespace-nowrap px-2 py-2">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/dashboard/certificates/${cert.id}`}
                                                        className="rounded bg-red-50 px-3 py-1.5 text-[12px] font-bold text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        href={`/dashboard/certificates/${cert.id}/download`}
                                                        className="rounded bg-[#111111] px-3 py-1.5 text-[12px] font-bold text-white transition hover:bg-black"
                                                    >
                                                        PDF
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t pt-4 text-sm">
                    <span className="text-slate-600">
                        Total {totalCertificates} • Page {safePage} of {totalPages}
                    </span>

                    <Link
                        href={`/dashboard/certificates?${prevQuery.toString()}`}
                        className={`rounded border px-3 py-1.5 font-semibold ${safePage === 1 ? "pointer-events-none opacity-40" : ""
                            }`}
                    >
                        Prev
                    </Link>

                    <span className="rounded bg-[#111111] px-3 py-1.5 font-bold text-white">
                        {safePage}
                    </span>

                    <Link
                        href={`/dashboard/certificates?${nextQuery.toString()}`}
                        className={`rounded border px-3 py-1.5 font-semibold ${safePage === totalPages ? "pointer-events-none opacity-40" : ""
                            }`}
                    >
                        Next
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold text-white/65">{title}</p>
            <h2 className="mt-2 text-2xl font-black">{value}</h2>
        </div>
    );
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
            {children}
        </th>
    );
}

function CertificateStatusBadge({ expired }: { expired: boolean }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${expired
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
                }`}
        >
            {expired ? "EXPIRED" : "VALID"}
        </span>
    );
}
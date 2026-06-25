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

export default async function ApplicationsPage({
    searchParams,
}: {
    searchParams?: Promise<{
        q?: string;
        status?: string;
        payment?: string;
        category?: string;
        page?: string;
    }>;
}) {
    const params = await searchParams;

    const q = String(params?.q || "").trim();
    const status = String(params?.status || "").trim();
    const payment = String(params?.payment || "").trim();
    const category = String(params?.category || "").trim();
    const currentPage = Math.max(Number(params?.page || 1), 1);

    const categories = await prisma.membershipCategory.findMany({
        orderBy: { name: "asc" },
    });

    const applications = await prisma.membershipApplication.findMany({
        where: {
            ...(status ? { status: status as any } : {}),
            ...(payment ? { paymentStatus: payment as any } : {}),
            ...(category ? { categoryId: category } : {}),
            ...(q
                ? {
                    OR: [
                        { fullName: { contains: q, mode: "insensitive" } },
                        { email: { contains: q, mode: "insensitive" } },
                        { phone: { contains: q, mode: "insensitive" } },
                        { idNumber: { contains: q, mode: "insensitive" } },
                    ],
                }
                : {}),
        },
        include: {
            user: true,
            category: true,
        },
        orderBy: { createdAt: "desc" },
    });

    const totalApplications = applications.length;
    const pendingApplications = applications.filter((a) => a.status === "PENDING").length;
    const approvedApplications = applications.filter((a) => a.status === "APPROVED").length;
    const paidApplications = applications.filter((a) => a.paymentStatus === "PAID").length;

    const totalPages = Math.max(Math.ceil(totalApplications / PAGE_SIZE), 1);
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const paginatedApplications = applications.slice(start, start + PAGE_SIZE);

    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (status) query.set("status", status);
    if (payment) query.set("payment", payment);
    if (category) query.set("category", category);

    const prevQuery = new URLSearchParams(query);
    prevQuery.set("page", String(Math.max(safePage - 1, 1)));

    const nextQuery = new URLSearchParams(query);
    nextQuery.set("page", String(Math.min(safePage + 1, totalPages)));

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">
                    AHPK Membership
                </p>

                <div className="mt-1">
                    <h1 className="text-3xl font-black text-slate-950">
                        Applications
                    </h1>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Review, filter, approve, and manage membership applications.
                    </p>
                </div>
            </div>

            <form
                action="/dashboard/applications"
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Applications
                </div>

                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_160px_160px_220px_auto]">
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="Search name, email, phone or ID no."
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <select
                        name="status"
                        defaultValue={status}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>

                    <select
                        name="payment"
                        defaultValue={payment}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Payments</option>
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="FAILED">Failed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                    <select
                        name="category"
                        defaultValue={category}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-2">
                        <button className="h-10 cursor-pointer rounded-md bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-black">
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

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Applications" value={totalApplications.toString()} />
                <StatCard title="Pending" value={pendingApplications.toString()} />
                <StatCard title="Approved" value={approvedApplications.toString()} />
                <StatCard title="Paid" value={paidApplications.toString()} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Applications List
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total {totalApplications} application
                            {totalApplications === 1 ? "" : "s"} • Page {safePage} of {totalPages}
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Applicant
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Phone
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    ID No.
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Category
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Qualification
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    App Status
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Payment
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Date
                                </th>
                                <th className="px-2 py-2 text-left font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedApplications.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="px-5 py-8 text-center text-slate-500"
                                    >
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedApplications.map((app) => (
                                    <tr
                                        key={app.id}
                                        className="border-b hover:bg-slate-50"
                                    >
                                        <td className="px-2 py-2">
                                            <p className="font-semibold text-slate-900">
                                                {app.fullName || app.user?.name || "Unnamed Applicant"}
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                {app.email || app.user?.email || "-"}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {app.phone || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {app.idNumber || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                            {app.category?.name || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {app.qualification || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <ApplicationStatusBadge status={app.status} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <PaymentStatusBadge status={app.paymentStatus} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {formatDate(app.createdAt)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <Link
                                                href={`/dashboard/applications/${app.id}`}
                                                className="rounded bg-red-50 px-3 py-1.5 text-[12px] font-bold text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t pt-4 text-sm">
                    <span className="text-slate-600">
                        Total {totalApplications} • Page {safePage} of {totalPages}
                    </span>

                    <Link
                        href={`/dashboard/applications?${prevQuery.toString()}`}
                        className={`rounded border px-3 py-1.5 font-semibold ${safePage === 1 ? "pointer-events-none opacity-40" : ""
                            }`}
                    >
                        Prev
                    </Link>

                    <span className="rounded bg-[#111111] px-3 py-1.5 font-bold text-white">
                        {safePage}
                    </span>

                    <Link
                        href={`/dashboard/applications?${nextQuery.toString()}`}
                        className={`rounded border px-3 py-1.5 font-semibold ${safePage === totalPages
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

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold text-white/65">{title}</p>
            <h2 className="mt-2 text-2xl font-black">{value}</h2>
        </div>
    );
}

function ApplicationStatusBadge({ status }: { status: string }) {
    const cls =
        status === "APPROVED"
            ? "bg-green-50 text-green-700"
            : status === "REJECTED"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-700";

    return (
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}>
            {status}
        </span>
    );
}

function PaymentStatusBadge({ status }: { status: string }) {
    const cls =
        status === "PAID"
            ? "bg-green-50 text-green-700"
            : status === "FAILED" || status === "CANCELLED"
                ? "bg-red-50 text-red-700"
                : "bg-slate-100 text-slate-600";

    return (
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}>
            {status}
        </span>
    );
}
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { canViewPayments } from "@/lib/roles";
import { redirect } from "next/navigation";

const PAGE_SIZE = 10;

function money(value: number) {
    return `KES ${Number(value || 0).toLocaleString("en-KE")}`;
}

function formatDate(date: Date | null) {
    if (!date) return "-";

    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default async function PaymentsPage({
    searchParams,
}: {
    searchParams?: Promise<{
        q?: string;
        type?: string;
        status?: string;
        page?: string;
        renewalPage?: string;
    }>;
}) {
    const user = await getAuthUser();

    if (!user || !canViewPayments(user.role)) {
        redirect("/dashboard");
    }
    const params = await searchParams;

    const q = String(params?.q || "").trim();
    const type = String(params?.type || "").trim();
    const status = String(params?.status || "").trim();
    const currentPage = Math.max(Number(params?.page || 1), 1);
    const currentRenewalPage = Math.max(Number(params?.renewalPage || 1), 1);

    const [applications, renewalPayments] = await Promise.all([
        prisma.membershipApplication.findMany({
            where: {
                paymentStatus: "PAID",
                ...(q
                    ? {
                        OR: [
                            { fullName: { contains: q, mode: "insensitive" } },
                            { email: { contains: q, mode: "insensitive" } },
                            { phone: { contains: q, mode: "insensitive" } },
                            { paymentReference: { contains: q, mode: "insensitive" } },
                        ],
                    }
                    : {}),
            },
            include: {
                category: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        }),

        prisma.payment.findMany({
            where: {
                ...(status ? { status: status as any } : {}),
                ...(q
                    ? {
                        OR: [
                            { reference: { contains: q, mode: "insensitive" } },
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
                        category: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
    ]);

    const showApplications = !type || type === "applications";
    const showRenewals = !type || type === "renewals";

    const applicationRevenue = applications.reduce((sum, app) => {
        return sum + (app.category?.annualFee || 0);
    }, 0);

    const renewalRevenue = renewalPayments.reduce((sum, payment) => {
        return sum + payment.amount;
    }, 0);

    const totalRevenue = applicationRevenue + renewalRevenue;

    const totalApplicationPages = Math.max(Math.ceil(applications.length / PAGE_SIZE), 1);
    const safePage = Math.min(currentPage, totalApplicationPages);
    const applicationStart = (safePage - 1) * PAGE_SIZE;
    const paginatedApplications = applications.slice(applicationStart, applicationStart + PAGE_SIZE);

    const totalRenewalPages = Math.max(Math.ceil(renewalPayments.length / PAGE_SIZE), 1);
    const safeRenewalPage = Math.min(currentRenewalPage, totalRenewalPages);
    const renewalStart = (safeRenewalPage - 1) * PAGE_SIZE;
    const paginatedRenewals = renewalPayments.slice(renewalStart, renewalStart + PAGE_SIZE);

    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (type) query.set("type", type);
    if (status) query.set("status", status);

    const prevQuery = new URLSearchParams(query);
    prevQuery.set("page", String(Math.max(safePage - 1, 1)));

    const nextQuery = new URLSearchParams(query);
    nextQuery.set("page", String(Math.min(safePage + 1, totalApplicationPages)));

    const prevRenewalQuery = new URLSearchParams(query);
    prevRenewalQuery.set("renewalPage", String(Math.max(safeRenewalPage - 1, 1)));

    const nextRenewalQuery = new URLSearchParams(query);
    nextRenewalQuery.set("renewalPage", String(Math.min(safeRenewalPage + 1, totalRenewalPages)));

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">
                    AHPK Finance
                </p>

                <div className="mt-1">
                    <h1 className="text-3xl font-black text-slate-950">
                        Payments
                    </h1>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Confirmed application payments and membership renewals.
                    </p>
                </div>
            </div>

            <form
                action="/dashboard/payments"
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Payments
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="Search name, email, member no. or reference"
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <select
                        name="type"
                        defaultValue={type}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Types</option>
                        <option value="applications">Applications</option>
                        <option value="renewals">Renewals</option>
                    </select>

                    <select
                        name="status"
                        defaultValue={status}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Status</option>
                        <option value="PAID">Paid</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Failed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                    <div className="flex gap-2">
                        <button className="h-10 rounded-md bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-black">
                            Search
                        </button>

                        <Link
                            href="/dashboard/payments"
                            className="flex h-10 items-center rounded-md border border-slate-300 px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                        >
                            Reset
                        </Link>
                    </div>
                </div>
            </form>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Revenue" value={money(totalRevenue)} />
                <StatCard title="Application Revenue" value={money(applicationRevenue)} />
                <StatCard title="Renewal Revenue" value={money(renewalRevenue)} />
                <StatCard title="Transactions" value={(applications.length + renewalPayments.length).toString()} />
            </div>

            {showApplications && (
                <PaymentTableCard
                    title="Application Payments"
                    subtitle={`Total ${applications.length} application payment${applications.length === 1 ? "" : "s"} • Page ${safePage} of ${totalApplicationPages}`}
                    pagination={
                        <Pagination
                            total={applications.length}
                            safePage={safePage}
                            totalPages={totalApplicationPages}
                            prevHref={`/dashboard/payments?${prevQuery.toString()}`}
                            nextHref={`/dashboard/payments?${nextQuery.toString()}`}
                        />
                    }
                >
                    <table className="w-full min-w-[950px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Applicant</Th>
                                <Th>Category</Th>
                                <Th>Amount</Th>
                                <Th>Reference</Th>
                                <Th>Status</Th>
                                <Th>Updated</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedApplications.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                                        No confirmed application payments found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedApplications.map((app) => (
                                    <tr key={app.id} className="border-b hover:bg-slate-50">
                                        <td className="px-2 py-2">
                                            <p className="font-semibold text-slate-900">
                                                {app.fullName || "Applicant"}
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                {app.email || "-"}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                            {app.category?.name || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-900">
                                            {money(app.category?.annualFee || 0)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {app.paymentReference || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <StatusBadge status={app.paymentStatus} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {formatDate(app.updatedAt)}
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
                </PaymentTableCard>
            )}

            {showRenewals && (
                <PaymentTableCard
                    title="Renewal Payments"
                    subtitle={`Total ${renewalPayments.length} renewal payment${renewalPayments.length === 1 ? "" : "s"} • Page ${safeRenewalPage} of ${totalRenewalPages}`}
                    pagination={
                        <Pagination
                            total={renewalPayments.length}
                            safePage={safeRenewalPage}
                            totalPages={totalRenewalPages}
                            prevHref={`/dashboard/payments?${prevRenewalQuery.toString()}`}
                            nextHref={`/dashboard/payments?${nextRenewalQuery.toString()}`}
                        />
                    }
                >
                    <table className="w-full min-w-[1050px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Member</Th>
                                <Th>Member No.</Th>
                                <Th>Category</Th>
                                <Th>Amount</Th>
                                <Th>Reference</Th>
                                <Th>Status</Th>
                                <Th>Paid Date</Th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedRenewals.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                                        No renewal payments found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedRenewals.map((payment) => (
                                    <tr key={payment.id} className="border-b hover:bg-slate-50">
                                        <td className="px-2 py-2">
                                            <p className="font-semibold text-slate-900">
                                                {payment.member.fullName || "Member"}
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                {payment.member.email || "-"}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                            {payment.member.memberNumber}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                            {payment.member.category.name}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-900">
                                            {money(payment.amount)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {payment.reference || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <StatusBadge status={payment.status} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {formatDate(payment.paidAt || payment.createdAt)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </PaymentTableCard>
            )}
        </div>
    );
}

function PaymentTableCard({
    title,
    subtitle,
    children,
    pagination,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    pagination: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-xl font-black text-slate-950">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                        {subtitle}
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">{children}</div>

            {pagination}
        </div>
    );
}

function Pagination({
    total,
    safePage,
    totalPages,
    prevHref,
    nextHref,
}: {
    total: number;
    safePage: number;
    totalPages: number;
    prevHref: string;
    nextHref: string;
}) {
    return (
        <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t pt-4 text-sm">
            <span className="text-slate-600">
                Total {total} • Page {safePage} of {totalPages}
            </span>

            <Link
                href={prevHref}
                className={`rounded border px-3 py-1.5 font-semibold ${safePage === 1 ? "pointer-events-none opacity-40" : ""
                    }`}
            >
                Prev
            </Link>

            <span className="rounded bg-[#111111] px-3 py-1.5 font-bold text-white">
                {safePage}
            </span>

            <Link
                href={nextHref}
                className={`rounded border px-3 py-1.5 font-semibold ${safePage === totalPages ? "pointer-events-none opacity-40" : ""
                    }`}
            >
                Next
            </Link>
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

function StatusBadge({ status }: { status: string }) {
    const cls =
        status === "PAID"
            ? "bg-green-50 text-green-700"
            : status === "FAILED" || status === "CANCELLED"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-700";

    return (
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}>
            {status}
        </span>
    );
}
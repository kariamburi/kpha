import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddMemberButton from "./AddMemberButton";
import { createMember, deleteMember } from "./actions";
import { getAuthUser } from "@/lib/auth";
import { canManageMembers, isSuperAdmin } from "@/lib/roles";
import { redirect } from "next/navigation";

const PAGE_SIZE = 10;

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default async function MembersPage({
    searchParams,
}: {
    searchParams?: Promise<{
        q?: string;
        status?: string;
        category?: string;
        page?: string;
    }>;
}) {
    const user = await getAuthUser();

    if (!user || !canManageMembers(user.role)) {
        redirect("/dashboard");
    }
    const params = await searchParams;

    const q = String(params?.q || "").trim();
    const status = String(params?.status || "").trim();
    const category = String(params?.category || "").trim();
    const currentPage = Math.max(Number(params?.page || 1), 1);

    const categories = await prisma.membershipCategory.findMany({
        orderBy: { name: "asc" },
    });

    const members = await prisma.member.findMany({
        where: {
            ...(status ? { status: status as any } : {}),
            ...(category ? { categoryId: category } : {}),
            ...(q
                ? {
                    OR: [
                        { fullName: { contains: q, mode: "insensitive" } },
                        { email: { contains: q, mode: "insensitive" } },
                        { phone: { contains: q, mode: "insensitive" } },
                        { memberNumber: { contains: q, mode: "insensitive" } },
                    ],
                }
                : {}),
        },
        include: {
            user: true,
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const totalMembers = members.length;
    const totalPages = Math.max(Math.ceil(totalMembers / PAGE_SIZE), 1);
    const safePage = Math.min(currentPage, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const paginatedMembers = members.slice(start, start + PAGE_SIZE);

    const activeMembers = members.filter((m) => m.status === "ACTIVE").length;
    const expiredMembers = members.filter((m) => m.status === "EXPIRED").length;
    const suspendedMembers = members.filter((m) => m.status === "SUSPENDED").length;

    const query = new URLSearchParams();
    if (q) query.set("q", q);
    if (status) query.set("status", status);
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

                <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-black text-slate-950">
                            Member Registry
                        </h1>
                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Search, filter, and manage registered AHPK members.
                        </p>
                    </div>

                    <AddMemberButton
                        categories={categories}
                        createMember={createMember}
                    />
                </div>
            </div>

            <form
                action="/dashboard/members"
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Members
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_180px_220px_auto]">
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="Search name, email, phone or member no."
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <select
                        name="status"
                        defaultValue={status}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="EXPIRED">Expired</option>
                        <option value="SUSPENDED">Suspended</option>
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
                        <button className="h-10  cursor-pointer rounded-md bg-[#111111] px-5 text-sm font-black text-white transition hover:bg-black">
                            Search
                        </button>

                        <Link
                            href="/dashboard/members"
                            className="flex h-10 items-center rounded-md border border-slate-300 px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                        >
                            Reset
                        </Link>
                    </div>
                </div>
            </form>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Members" value={totalMembers.toString()} />
                <StatCard title="Active" value={activeMembers.toString()} />
                <StatCard title="Expired" value={expiredMembers.toString()} />
                <StatCard title="Suspended" value={suspendedMembers.toString()} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Members List
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total {totalMembers} member{totalMembers === 1 ? "" : "s"} • Page {safePage} of {totalPages}
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Member No.
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Member
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Phone
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Category
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Status
                                </th>
                                <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
                                    Expiry
                                </th>
                                <th className="px-2 py-2 text-left font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedMembers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-5 py-8 text-center text-slate-500"
                                    >
                                        No members found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedMembers.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="border-b hover:bg-slate-50"
                                    >
                                        <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-900">
                                            {member.memberNumber}
                                        </td>

                                        <td className="px-2 py-2">
                                            <p className="font-semibold text-slate-900">
                                                {member.fullName || member.user?.name || "-"}
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                {member.email || member.user?.email || "-"}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {member.phone || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                            {member.category.name}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <StatusBadge status={member.status} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {formatDate(member.expiryDate)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/dashboard/members/${member.id}`}
                                                    className="rounded bg-red-50 px-3 py-1.5 text-[12px] font-bold text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white"
                                                >
                                                    View
                                                </Link>

                                                {isSuperAdmin(user.role) && (
                                                    <form action={deleteMember}>
                                                        <input type="hidden" name="id" value={member.id} />

                                                        <button
                                                            type="submit"
                                                            className="rounded bg-red-600 px-3 py-1.5 text-[12px] font-bold text-white transition hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t pt-4 text-sm">
                    <span className="text-slate-600">
                        Total {totalMembers} • Page {safePage} of {totalPages}
                    </span>

                    <Link
                        href={`/dashboard/members?${prevQuery.toString()}`}
                        className={`rounded border px-3 py-1.5 font-semibold ${safePage === 1 ? "pointer-events-none opacity-40" : ""
                            }`}
                    >
                        Prev
                    </Link>

                    <span className="rounded bg-[#111111] px-3 py-1.5 font-bold text-white">
                        {safePage}
                    </span>

                    <Link
                        href={`/dashboard/members?${nextQuery.toString()}`}
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

function StatusBadge({ status }: { status: string }) {
    const cls =
        status === "ACTIVE"
            ? "bg-green-50 text-green-700"
            : status === "EXPIRED"
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-700";

    return (
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}>
            {status}
        </span>
    );
}
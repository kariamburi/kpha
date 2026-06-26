import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { canManageDashboardUsers } from "@/lib/roles";
import AddDashboardUserButton from "./AddDashboardUserButton";
import {
    createDashboardUser,
    deleteDashboardUser,
    resetDashboardUserPassword,
    updateDashboardUser,
} from "./actions";

export default async function DashboardUsersPage() {
    const currentUser = await getAuthUser();

    if (!currentUser || !canManageDashboardUsers(currentUser.role)) {
        redirect("/dashboard");
    }

    const users = await prisma.user.findMany({
        where: {
            role: {
                in: ["SUPER_ADMIN", "ADMIN", "FINANCE"],
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "ACTIVE").length;
    const inactiveUsers = users.filter((u) => u.status === "INACTIVE").length;
    const suspendedUsers = users.filter((u) => u.status === "SUSPENDED").length;

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">
                    AHPK Administration
                </p>

                <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-black text-slate-950">
                            Dashboard Users
                        </h1>
                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Create, edit, disable, and manage admin dashboard access.
                        </p>
                    </div>

                    <AddDashboardUserButton createDashboardUser={createDashboardUser} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Users" value={totalUsers.toString()} />
                <StatCard title="Active" value={activeUsers.toString()} />
                <StatCard title="Inactive" value={inactiveUsers.toString()} />
                <StatCard title="Suspended" value={suspendedUsers.toString()} />
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-5">
                    <h2 className="text-xl font-black text-slate-950">
                        Admin Users List
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                        Total {totalUsers} dashboard user{totalUsers === 1 ? "" : "s"}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1150px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    User
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Phone
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Role
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Status
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Reset Password
                                </th>
                                <th className="px-3 py-3 text-right font-bold">
                                    Delete
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-5 py-10 text-center text-sm font-semibold text-slate-500"
                                    >
                                        No dashboard users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b align-top transition hover:bg-slate-50"
                                    >
                                        <td className="px-3 py-3">
                                            <form action={updateDashboardUser} className="grid gap-2">
                                                <input type="hidden" name="id" value={user.id} />
                                                <input type="hidden" name="phone" value={user.phone || ""} />
                                                <input type="hidden" name="role" value={user.role} />
                                                <input type="hidden" name="status" value={user.status} />

                                                <input
                                                    name="name"
                                                    defaultValue={user.name || ""}
                                                    className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-bold outline-none focus:border-[#C1121F]"
                                                />

                                                <input
                                                    name="email"
                                                    type="email"
                                                    defaultValue={user.email}
                                                    className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-[#C1121F]"
                                                />

                                                <button className="cursor-pointer rounded-xl bg-[#111111] px-3 py-2 text-xs font-black text-white transition hover:bg-black">
                                                    Save User
                                                </button>
                                            </form>
                                        </td>

                                        <td className="px-3 py-3">
                                            <form action={updateDashboardUser} className="grid gap-2">
                                                <input type="hidden" name="id" value={user.id} />
                                                <input type="hidden" name="name" value={user.name || ""} />
                                                <input type="hidden" name="email" value={user.email} />
                                                <input type="hidden" name="role" value={user.role} />
                                                <input type="hidden" name="status" value={user.status} />

                                                <input
                                                    name="phone"
                                                    defaultValue={user.phone || ""}
                                                    placeholder="Phone"
                                                    className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-[#C1121F]"
                                                />

                                                <button className="cursor-pointer rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200">
                                                    Update Phone
                                                </button>
                                            </form>
                                        </td>

                                        <td className="px-3 py-3">
                                            <form action={updateDashboardUser} className="grid gap-2">
                                                <input type="hidden" name="id" value={user.id} />
                                                <input type="hidden" name="name" value={user.name || ""} />
                                                <input type="hidden" name="email" value={user.email} />
                                                <input type="hidden" name="phone" value={user.phone || ""} />
                                                <input type="hidden" name="status" value={user.status} />

                                                <select
                                                    name="role"
                                                    defaultValue={user.role}
                                                    className="h-10 rounded-xl border border-slate-200 px-3 text-xs font-black outline-none focus:border-[#C1121F]"
                                                >
                                                    <option value="ADMIN">ADMIN</option>
                                                    <option value="FINANCE">FINANCE</option>
                                                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                                                </select>

                                                <button className="cursor-pointer rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200">
                                                    Update Role
                                                </button>
                                            </form>
                                        </td>

                                        <td className="px-3 py-3">
                                            <form action={updateDashboardUser} className="grid gap-2">
                                                <input type="hidden" name="id" value={user.id} />
                                                <input type="hidden" name="name" value={user.name || ""} />
                                                <input type="hidden" name="email" value={user.email} />
                                                <input type="hidden" name="phone" value={user.phone || ""} />
                                                <input type="hidden" name="role" value={user.role} />

                                                <select
                                                    name="status"
                                                    defaultValue={user.status}
                                                    className="h-10 rounded-xl border border-slate-200 px-3 text-xs font-black outline-none focus:border-[#C1121F]"
                                                >
                                                    <option value="ACTIVE">ACTIVE</option>
                                                    <option value="INACTIVE">INACTIVE</option>
                                                    <option value="SUSPENDED">SUSPENDED</option>
                                                </select>

                                                <StatusBadge status={user.status} />

                                                <button className="cursor-pointer rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200">
                                                    Update Status
                                                </button>
                                            </form>
                                        </td>

                                        <td className="px-3 py-3">
                                            <form action={resetDashboardUserPassword} className="grid gap-2">
                                                <input type="hidden" name="id" value={user.id} />

                                                <input
                                                    name="password"
                                                    type="password"
                                                    required
                                                    placeholder="New password"
                                                    className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#C1121F]"
                                                />

                                                <button className="cursor-pointer rounded-xl bg-amber-500 px-3 py-2 text-xs font-black text-white transition hover:bg-amber-600">
                                                    Reset Password
                                                </button>
                                            </form>
                                        </td>

                                        <td className="px-3 py-3 text-right">
                                            <form action={deleteDashboardUser}>
                                                <input type="hidden" name="id" value={user.id} />

                                                <button
                                                    disabled={user.id === currentUser.id}
                                                    className="cursor-pointer rounded-xl bg-red-600 px-3 py-2 text-xs font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
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
            : status === "INACTIVE"
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-700";

    return (
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}>
            {status}
        </span>
    );
}
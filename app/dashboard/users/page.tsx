import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { canManageDashboardUsers } from "@/lib/roles";
import { updateMemberAdminAccess } from "./actions";

export default async function DashboardUsersPage() {
    const currentUser = await getAuthUser();

    if (!currentUser || !canManageDashboardUsers(currentUser.adminRole)) {
        redirect("/dashboard");
    }

    const members = await prisma.member.findMany({
        where: {
            adminRole: {
                in: ["SUPER_ADMIN", "ADMIN", "FINANCE"],
            },
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const totalUsers = members.length;
    const activeUsers = members.filter((m) => m.adminStatus === "ACTIVE").length;
    const inactiveUsers = members.filter((m) => m.adminStatus === "INACTIVE").length;
    const suspendedUsers = members.filter((m) => m.adminStatus === "SUSPENDED").length;

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">
                    AHPK Administration
                </p>

                <div className="mt-1">
                    <h1 className="text-3xl font-black text-slate-950">
                        Admin Access Management
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Promote, demote, activate or suspend members with dashboard access.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Admin Members" value={totalUsers.toString()} tone="blue" />
                <StatCard title="Active" value={activeUsers.toString()} tone="green" />
                <StatCard title="Inactive" value={inactiveUsers.toString()} tone="amber" />
                <StatCard title="Suspended" value={suspendedUsers.toString()} tone="red" />
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-5">
                    <h2 className="text-xl font-black text-slate-950">
                        Admin Members List
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                        Total {totalUsers} admin member{totalUsers === 1 ? "" : "s"}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Member
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Membership
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Admin Role
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Access Status
                                </th>
                                <th className="px-3 py-3 text-right font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {members.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-10 text-center text-sm font-semibold text-slate-500"
                                    >
                                        No admin members found.
                                    </td>
                                </tr>
                            ) : (
                                members.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="border-b align-top transition hover:bg-slate-50"
                                    >
                                        <td className="px-3 py-3">
                                            <p className="font-black text-slate-950">
                                                {member.fullName || "AHPK Member"}
                                            </p>
                                            <p className="mt-1 text-xs font-semibold text-slate-500">
                                                {member.email || "-"}
                                            </p>
                                            <p className="mt-1 text-xs font-bold text-[#C1121F]">
                                                {member.memberNumber}
                                            </p>
                                        </td>

                                        <td className="px-3 py-3">
                                            <p className="font-black text-slate-800">
                                                {member.category.name}
                                            </p>
                                            <p className="mt-1 text-xs font-semibold text-slate-500">
                                                Member Status: {member.status}
                                            </p>
                                        </td>

                                        <td className="px-3 py-3">
                                            <form action={updateMemberAdminAccess} className="grid gap-2">
                                                <input type="hidden" name="id" value={member.id} />
                                                <input type="hidden" name="adminStatus" value={member.adminStatus} />

                                                <select
                                                    name="adminRole"
                                                    defaultValue={member.adminRole || ""}
                                                    className="h-10 rounded-xl border border-slate-200 px-3 text-xs font-black outline-none focus:border-[#C1121F]"
                                                >
                                                    <option value="">NO ACCESS</option>
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
                                            <form action={updateMemberAdminAccess} className="grid gap-2">
                                                <input type="hidden" name="id" value={member.id} />
                                                <input type="hidden" name="adminRole" value={member.adminRole || ""} />

                                                <select
                                                    name="adminStatus"
                                                    defaultValue={member.adminStatus}
                                                    className="h-10 rounded-xl border border-slate-200 px-3 text-xs font-black outline-none focus:border-[#C1121F]"
                                                >
                                                    <option value="ACTIVE">ACTIVE</option>
                                                    <option value="INACTIVE">INACTIVE</option>
                                                    <option value="SUSPENDED">SUSPENDED</option>
                                                </select>

                                                <StatusBadge status={member.adminStatus} />

                                                <button className="cursor-pointer rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200">
                                                    Update Status
                                                </button>
                                            </form>
                                        </td>

                                        <td className="px-3 py-3 text-right">
                                            <form action={updateMemberAdminAccess}>
                                                <input type="hidden" name="id" value={member.id} />
                                                <input type="hidden" name="adminRole" value="" />
                                                <input type="hidden" name="adminStatus" value="INACTIVE" />

                                                <button className="cursor-pointer rounded-xl bg-red-600 px-3 py-2 text-xs font-black text-white transition hover:bg-red-700">
                                                    Remove Access
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

function StatCard({
    title,
    value,
    tone,
}: {
    title: string;
    value: string;
    tone: "blue" | "green" | "amber" | "red";
}) {
    const styles = {
        blue: { backgroundColor: "#EEF6FF", borderColor: "#C7E0FF", color: "#2563EB" },
        green: { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0", color: "#15803D" },
        amber: { backgroundColor: "#FFF8E6", borderColor: "#FCD34D", color: "#B45309" },
        red: { backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#B91C1C" },
    };

    return (
        <div style={styles[tone]} className="rounded-2xl border p-5 shadow-sm">
            <p className="text-sm font-semibold opacity-80">{title}</p>
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
        <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}>
            {status}
        </span>
    );
}
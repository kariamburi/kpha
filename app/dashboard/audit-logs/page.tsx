import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canViewAuditLogs, isSuperAdmin } from "@/lib/roles";
import { redirect } from "next/navigation";
import { deleteAuditLog } from "./actions";

export default async function AuditLogsPage() {
    const user = await getAuthUser();

    if (!user || !canViewAuditLogs(user.role)) {
        redirect("/dashboard");
    }

    const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
    });

    const totalLogs = logs.length;
    const certificateLogs = logs.filter((l) =>
        l.action.toUpperCase().includes("CERTIFICATE")
    ).length;
    const applicationLogs = logs.filter((l) =>
        l.action.toUpperCase().includes("APPLICATION")
    ).length;
    const systemLogs = totalLogs - certificateLogs - applicationLogs;

    return (
        <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">
                    Security & Audit
                </p>

                <div className="mt-1">
                    <h1 className="text-3xl font-black text-slate-950">
                        Audit Logs
                    </h1>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Track approvals, certificate downloads, account activity, and system changes.
                    </p>
                </div>
            </section>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Logs" value={totalLogs.toString()} />
                <StatCard title="Certificates" value={certificateLogs.toString()} />
                <StatCard title="Applications" value={applicationLogs.toString()} />
                <StatCard title="Other Logs" value={systemLogs.toString()} />
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-5">
                    <h2 className="text-xl font-black text-slate-950">
                        Recent Activity
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                        Showing latest 100 audit records.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Date
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Action
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Entity
                                </th>
                                <th className="border-r border-slate-200 px-3 py-3 text-left font-bold">
                                    Entity ID
                                </th>
                                <th className="px-3 py-3 text-right font-bold">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {logs.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-10 text-center text-sm font-semibold text-slate-500"
                                    >
                                        No audit logs yet.
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr
                                        key={log.id}
                                        className="border-b transition hover:bg-slate-50"
                                    >
                                        <td className="whitespace-nowrap px-3 py-3 font-semibold text-slate-700">
                                            {log.createdAt.toLocaleString("en-KE")}
                                        </td>

                                        <td className="px-3 py-3">
                                            <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-black text-[#C1121F]">
                                                {log.action}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-3 font-semibold text-slate-700">
                                            {log.entityType}
                                        </td>

                                        <td className="px-3 py-3 text-slate-500">
                                            {log.entityId || "-"}
                                        </td>

                                        <td className="px-3 py-3 text-right">
                                            {isSuperAdmin(user.role) && (
                                                <form action={deleteAuditLog}>
                                                    <input type="hidden" name="id" value={log.id} />

                                                    <button className="cursor-pointer rounded-xl bg-red-600 px-3 py-2 text-xs font-black text-white transition hover:bg-red-700">
                                                        Delete
                                                    </button>
                                                </form>
                                            )}
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
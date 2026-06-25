import { prisma } from "@/lib/prisma";

export default async function AuditLogsPage() {
    const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
    });

    return (
        <div className="space-y-6">
            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C1121F]">
                    Security & Audit
                </p>
                <h1 className="mt-2 text-3xl font-black text-slate-950">
                    Audit Logs
                </h1>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                    Track admin actions, approvals, certificate downloads, logins and system activity.
                </p>
            </section>

            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-500">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Action</th>
                            <th className="px-6 py-4">Entity</th>
                            <th className="px-6 py-4">Entity ID</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {logs.map((log) => (
                            <tr key={log.id}>
                                <td className="px-6 py-4 font-bold">
                                    {log.createdAt.toLocaleString("en-KE")}
                                </td>
                                <td className="px-6 py-4 font-black text-[#C1121F]">
                                    {log.action}
                                </td>
                                <td className="px-6 py-4">{log.entityType}</td>
                                <td className="px-6 py-4 text-slate-500">{log.entityId || "-"}</td>
                            </tr>
                        ))}

                        {logs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-slate-500">
                                    No audit logs yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
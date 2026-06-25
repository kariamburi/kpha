import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import { requireMemberSession } from "../session";

function formatDate(date: Date | null) {
    if (!date) return "-";

    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function money(value: number) {
    return `KES ${Number(value || 0).toLocaleString("en-KE")}`;
}

export default async function MemberPaymentsPage() {
    const memberId = await requireMemberSession();

    const member = await prisma.member.findUnique({
        where: { id: memberId },
        include: {
            category: true,
            payments: {
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!member) notFound();

    const paidPayments = member.payments.filter((p) => p.status === "PAID");
    const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);

    return (
        <MemberPortalShell member={member}>
            <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                    <p className="text-sm font-black text-slate-500">
                        Member Payments
                    </p>

                    <h1 className="mt-1 text-3xl font-black text-slate-950">
                        Payment History
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        View your membership renewal payment records.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard title="Total Paid" value={money(totalPaid)} />
                    <StatCard title="Transactions" value={member.payments.length.toString()} />
                    <StatCard title="Paid Records" value={paidPayments.length.toString()} />
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                    <div className="border-b border-slate-200 pb-5">
                        <h2 className="text-xl font-black text-slate-950">
                            Payment Records
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            All renewal transactions linked to your membership.
                        </p>
                    </div>

                    <div className="mt-5 space-y-3">
                        {member.payments.length === 0 ? (
                            <div className="rounded-2xl bg-slate-50 p-5 text-sm font-semibold text-slate-500">
                                No payment history found.
                            </div>
                        ) : (
                            member.payments.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center"
                                >
                                    <div>
                                        <p className="font-black text-slate-950">
                                            {money(payment.amount)}
                                        </p>

                                        <p className="mt-1 text-xs font-semibold text-slate-500">
                                            {payment.method} • {payment.reference || "-"}
                                        </p>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <StatusBadge status={payment.status} />

                                        <p className="mt-2 text-xs font-semibold text-slate-500">
                                            {payment.paidAt
                                                ? formatDate(payment.paidAt)
                                                : formatDate(payment.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </MemberPortalShell>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-xl">
            <p className="text-sm font-semibold text-white/65">{title}</p>
            <p className="mt-2 text-2xl font-black">{value}</p>
        </div>
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
        <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${cls}`}>
            {status}
        </span>
    );
}
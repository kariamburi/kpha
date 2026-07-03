import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import { requireMemberSession } from "../session";
import {
    BadgeCheck,
    CalendarDays,
    CreditCard,
    Hash,
    ReceiptText,
    Wallet,
} from "lucide-react";

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
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                            <CreditCard className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#C1121F]">
                                Member Payments
                            </p>

                            <h1 className="mt-1 text-3xl font-black text-slate-950">
                                Payment History
                            </h1>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                View your membership renewal payment records.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard icon={Wallet} title="Total Paid" value={money(totalPaid)} tone="green" />
                    <StatCard icon={ReceiptText} title="Transactions" value={member.payments.length.toString()} tone="blue" />
                    <StatCard icon={BadgeCheck} title="Paid Records" value={paidPayments.length.toString()} tone="purple" />
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                            <ReceiptText className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-xl font-black text-slate-950">
                                Payment Records
                            </h2>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                All renewal transactions linked to your membership.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 space-y-3">
                        {member.payments.length === 0 ? (
                            <div className="rounded-2xl bg-slate-50 p-8 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                                    <ReceiptText className="h-7 w-7" />
                                </div>

                                <p className="mt-4 text-sm font-semibold text-slate-500">
                                    No payment history found.
                                </p>
                            </div>
                        ) : (
                            member.payments.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#C1121F] shadow-sm">
                                            <CreditCard className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="font-black text-slate-950">
                                                {money(payment.amount)}
                                            </p>

                                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                                                <span>{payment.method}</span>
                                                <span>•</span>
                                                <span>{payment.reference || "-"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <StatusBadge status={payment.status} />

                                        <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            {payment.paidAt
                                                ? formatDate(payment.paidAt)
                                                : formatDate(payment.createdAt)}
                                        </div>
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

function StatCard({
    icon: Icon,
    title,
    value,
    tone,
}: {
    icon: React.ElementType;
    title: string;
    value: string;
    tone: "blue" | "green" | "purple";
}) {
    const styles = {
        blue: {
            backgroundColor: "#EEF6FF",
            borderColor: "#C7E0FF",
            color: "#2563EB",
        },
        green: {
            backgroundColor: "#F0FDF4",
            borderColor: "#BBF7D0",
            color: "#15803D",
        },
        purple: {
            backgroundColor: "#F5F3FF",
            borderColor: "#DDD6FE",
            color: "#6D28D9",
        },
    };

    return (
        <div style={styles[tone]} className="rounded-2xl border p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 shadow-sm">
                <Icon className="h-5 w-5" />
            </div>

            <p className="mt-4 text-sm font-semibold opacity-80">{title}</p>
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
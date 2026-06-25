import Link from "next/link";
import { prisma } from "@/lib/prisma";

function money(value: number) {
    return `KES ${Number(value || 0).toLocaleString("en-KE")}`;
}

export default async function DashboardPage() {
    const today = new Date();
    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);

    const [
        members,
        applications,
        certificates,
        paidApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        renewalPayments,
        expiringMembers,
        activeMembers,
    ] = await Promise.all([
        prisma.member.count(),
        prisma.membershipApplication.count(),
        prisma.certificate.count(),

        prisma.membershipApplication.findMany({
            where: { paymentStatus: "PAID" },
            include: { category: true },
        }),

        prisma.membershipApplication.count({ where: { status: "PENDING" } }),
        prisma.membershipApplication.count({ where: { status: "APPROVED" } }),
        prisma.membershipApplication.count({ where: { status: "REJECTED" } }),

        prisma.payment.findMany({ where: { status: "PAID" } }),

        prisma.member.count({
            where: {
                status: "ACTIVE",
                expiryDate: {
                    gte: today,
                    lte: in30Days,
                },
            },
        }),

        prisma.member.count({
            where: { status: "ACTIVE" },
        }),
    ]);

    const applicationRevenue = paidApplications.reduce(
        (sum, app) => sum + (app.category?.annualFee || 0),
        0
    );

    const renewalRevenue = renewalPayments.reduce(
        (sum, payment) => sum + payment.amount,
        0
    );

    const totalRevenue = applicationRevenue + renewalRevenue;

    const applicationRevenuePercent =
        totalRevenue > 0 ? Math.round((applicationRevenue / totalRevenue) * 100) : 0;

    const renewalRevenuePercent =
        totalRevenue > 0 ? Math.round((renewalRevenue / totalRevenue) * 100) : 0;

    const pendingPercent =
        applications > 0 ? Math.round((pendingApplications / applications) * 100) : 0;

    const approvedPercent =
        applications > 0 ? Math.round((approvedApplications / applications) * 100) : 0;

    const rejectedPercent =
        applications > 0 ? Math.round((rejectedApplications / applications) * 100) : 0;

    return (
        <div className="space-y-5">
            <div className="overflow-hidden rounded-2xl bg-[#111111] shadow-sm">
                <div className="border-b border-white/10 px-6 py-5">
                    <p className="text-sm font-black tracking-[0.35em] text-[#F3C64E]">
                        AHPK OVERVIEW
                    </p>

                    <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                        <div>
                            <h1 className="text-3xl font-black text-white">
                                Membership Dashboard
                            </h1>
                            <p className="mt-2 text-sm font-semibold text-white/70">
                                Members • Applications • Payments • Certificates • Renewals
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/10 px-5 py-4">
                            <p className="text-xs font-black uppercase tracking-wide text-white/50">
                                Total Revenue
                            </p>
                            <p className="mt-1 text-2xl font-black text-white">
                                {money(totalRevenue)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-px bg-white/10 md:grid-cols-4">
                    <HeroMetric title="Members" value={members.toString()} hint={`${activeMembers} active`} />
                    <HeroMetric title="Applications" value={applications.toString()} hint={`${pendingApplications} pending`} />
                    <HeroMetric title="Certificates" value={certificates.toString()} hint="Issued certificates" />
                    <HeroMetric title="Expiring Soon" value={expiringMembers.toString()} hint="Within 30 days" href="/dashboard/expiring-members" />
                </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-black text-slate-950">
                                Revenue Breakdown
                            </h2>
                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Application payments compared with renewal revenue.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/payments"
                            className="rounded bg-red-50 px-3 py-2 text-[12px] font-bold text-[#C1121F] hover:bg-[#C1121F] hover:text-white"
                        >
                            View Payments
                        </Link>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <SmallMetric title="Application Revenue" value={money(applicationRevenue)} />
                        <SmallMetric title="Renewal Revenue" value={money(renewalRevenue)} />
                        <SmallMetric title="Paid Applications" value={paidApplications.length.toString()} />
                    </div>

                    <div className="mt-6 space-y-5">
                        <BarRow
                            label="Application Revenue"
                            value={money(applicationRevenue)}
                            percent={applicationRevenuePercent}
                            tone="red"
                        />

                        <BarRow
                            label="Renewal Revenue"
                            value={money(renewalRevenue)}
                            percent={renewalRevenuePercent}
                            tone="black"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="border-b border-slate-200 pb-4">
                        <h2 className="text-xl font-black text-slate-950">
                            Application Pipeline
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Current review status distribution.
                        </p>
                    </div>

                    <div className="mt-5 space-y-4">
                        <PipelineRow label="Pending" value={pendingApplications} percent={pendingPercent} color="amber" />
                        <PipelineRow label="Approved" value={approvedApplications} percent={approvedPercent} color="green" />
                        <PipelineRow label="Rejected" value={rejectedApplications} percent={rejectedPercent} color="red" />
                    </div>

                    <Link
                        href="/dashboard/applications"
                        className="mt-6 inline-flex rounded-xl bg-[#111111] px-4 py-3 text-sm font-black text-white hover:bg-black"
                    >
                        Review Applications
                    </Link>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <QuickCard title="Members" value={members.toString()} href="/dashboard/members" />
                <QuickCard title="Pending Review" value={pendingApplications.toString()} href="/dashboard/applications?status=PENDING" />
                <QuickCard title="Payments" value={money(totalRevenue)} href="/dashboard/payments" />
                <QuickCard title="Expiring Members" value={expiringMembers.toString()} href="/dashboard/expiring-members" />
            </div>
        </div>
    );
}

function HeroMetric({
    title,
    value,
    hint,
    href,
}: {
    title: string;
    value: string;
    hint: string;
    href?: string;
}) {
    const content = (
        <div className="bg-[#111111] p-5 transition hover:bg-[#181818]">
            <p className="text-sm font-semibold text-white/55">{title}</p>
            <h2 className="mt-2 text-3xl font-black text-white">{value}</h2>
            <p className="mt-1 text-xs font-bold text-white/45">{hint}</p>
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
}

function SmallMetric({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                {title}
            </p>
            <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
        </div>
    );
}

function BarRow({
    label,
    value,
    percent,
    tone,
}: {
    label: string;
    value: string;
    percent: number;
    tone: "red" | "black";
}) {
    const barClass = tone === "red" ? "bg-[#C1121F]" : "bg-[#111111]";

    return (
        <div>
            <div className="flex items-center justify-between text-sm">
                <p className="font-black text-slate-800">{label}</p>
                <p className="font-bold text-slate-500">{value}</p>
            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full rounded-full ${barClass}`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            <p className="mt-1 text-xs font-bold text-slate-400">
                {percent}% of total revenue
            </p>
        </div>
    );
}

function PipelineRow({
    label,
    value,
    percent,
    color,
}: {
    label: string;
    value: number;
    percent: number;
    color: "amber" | "green" | "red";
}) {
    const colorClass =
        color === "green"
            ? "bg-green-600"
            : color === "red"
                ? "bg-red-600"
                : "bg-amber-500";

    return (
        <div>
            <div className="flex items-center justify-between text-sm">
                <p className="font-black text-slate-800">{label}</p>
                <p className="font-bold text-slate-500">{value}</p>
            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full rounded-full ${colorClass}`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            <p className="mt-1 text-xs font-bold text-slate-400">
                {percent}% of applications
            </p>
        </div>
    );
}

function QuickCard({
    title,
    value,
    href,
}: {
    title: string;
    value: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#C1121F] hover:shadow-md"
        >
            <p className="text-sm font-black text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
            <p className="mt-3 text-xs font-black text-[#C1121F]">
                Open →
            </p>
        </Link>
    );
}
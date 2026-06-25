import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import { requireMemberSession } from "../session";
import { markNotificationRead } from "./actions";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function daysUntil(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(date);
    target.setHours(0, 0, 0, 0);

    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default async function MemberDashboardPage() {
    const memberId = await requireMemberSession();

    const [member, announcements, notifications] = await Promise.all([
        prisma.member.findUnique({
            where: { id: memberId },
            include: {
                category: true,
                certificates: { orderBy: { createdAt: "desc" } },
                payments: { orderBy: { createdAt: "desc" } },
            },
        }),

        prisma.announcement.findMany({
            where: { published: true },
            orderBy: { createdAt: "desc" },
            take: 5,
        }),

        prisma.notification.findMany({
            where: { memberId },
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
    ]);

    if (!member) notFound();

    const daysLeft = daysUntil(member.expiryDate);
    const expired = daysLeft < 0;
    const latestCertificate = member.certificates[0];

    return (
        <MemberPortalShell member={member}>
            <div className="space-y-5">
                <div className="rounded-[28px] bg-[#111111] p-6 text-white shadow-xl">
                    <p className="text-sm font-semibold text-white/60">Welcome back</p>

                    <h1 className="mt-2 text-3xl font-black">
                        {member.fullName || "AHPK Member"}
                    </h1>

                    <p className="mt-3 text-sm font-semibold text-white/70">
                        {expired
                            ? "Your membership has expired. Renew to restore active status."
                            : `Your membership is active until ${formatDate(member.expiryDate)}.`}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card title="Category" value={member.category.name} />
                    <Card title="Status" value={expired ? "EXPIRED" : member.status} />
                    <Card title="Days Left" value={expired ? "Expired" : `${daysLeft}`} />
                    <Card title="Certificates" value={member.certificates.length.toString()} />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <QuickLink
                        title="My Profile"
                        text="View and update your membership details."
                        href="/member/profile"
                    />
                    <QuickLink
                        title="Certificates"
                        text="Download and verify certificates."
                        href="/member/certificates"
                    />
                    <QuickLink
                        title="Payments"
                        text="View renewal payment history."
                        href="/member/payments"
                    />
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                            <div>
                                <h2 className="text-xl font-black text-slate-950">
                                    Announcements
                                </h2>
                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    Latest updates from AHPK.
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            {announcements.map((item) => (
                                <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-[#C1121F]/10 px-3 py-1 text-[10px] font-black text-[#C1121F]">
                                            {item.type}
                                        </span>
                                        <span className="text-xs font-bold text-slate-400">
                                            {formatDate(item.createdAt)}
                                        </span>
                                    </div>

                                    <h3 className="mt-3 text-sm font-black text-slate-950">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-slate-500">
                                        {item.message}
                                    </p>
                                </div>
                            ))}

                            {announcements.length === 0 && (
                                <p className="rounded-2xl bg-slate-50 p-5 text-center text-sm font-semibold text-slate-500">
                                    No announcements yet.
                                </p>
                            )}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                            <div>
                                <h2 className="text-xl font-black text-slate-950">
                                    Notifications
                                </h2>
                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    Messages sent directly to your member account.
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            {notifications.map((item) => (
                                <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span
                                            className={`rounded-full px-3 py-1 text-[10px] font-black ${item.read
                                                ? "bg-slate-200 text-slate-600"
                                                : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {item.read ? "READ" : "NEW"}
                                        </span>

                                        <span className="text-xs font-bold text-slate-400">
                                            {formatDate(item.createdAt)}
                                        </span>
                                    </div>

                                    <h3 className="mt-3 text-sm font-black text-slate-950">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-slate-500">
                                        {item.message}
                                    </p>
                                    {!item.read && (
                                        <form action={markNotificationRead} className="mt-3">
                                            <input type="hidden" name="notificationId" value={item.id} />
                                            <button className="text-xs cursor-pointer font-black text-[#C1121F]">
                                                Mark as read
                                            </button>
                                        </form>
                                    )}
                                </div>
                            ))}

                            {notifications.length === 0 && (
                                <p className="rounded-2xl bg-slate-50 p-5 text-center text-sm font-semibold text-slate-500">
                                    No notifications yet.
                                </p>
                            )}
                        </div>
                    </section>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                    <h2 className="text-xl font-black text-slate-950">Quick Actions</h2>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        {latestCertificate && (
                            <Link
                                href={`/dashboard/certificates/${latestCertificate.id}/download`}
                                className="rounded-xl bg-[#C1121F] px-5 py-3 text-center text-sm font-black text-white hover:bg-red-800"
                            >
                                Download Certificate
                            </Link>
                        )}

                        <Link
                            href="/member/renewal"
                            className="rounded-xl bg-[#111111] px-5 py-3 text-center text-sm font-black text-white hover:bg-black"
                        >
                            Renew Membership
                        </Link>

                        <Link
                            href="/events"
                            className="rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-black text-slate-700 hover:bg-slate-50"
                        >
                            View Events & CPD
                        </Link>
                    </div>
                </div>
            </div>
        </MemberPortalShell>
    );
}

function Card({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-xl">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                {title}
            </p>
            <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
        </div>
    );
}

function QuickLink({
    title,
    text,
    href,
}: {
    title: string;
    text: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl transition hover:border-[#C1121F]"
        >
            <h3 className="text-xl font-black text-slate-950">{title}</h3>
            <p className="mt-2 text-sm font-semibold text-slate-500">{text}</p>
            <p className="mt-4 text-sm font-black text-[#C1121F]">Open →</p>
        </Link>
    );
}
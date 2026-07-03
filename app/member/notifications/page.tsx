import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import { requireMemberSession } from "../session";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function formatTime(date: Date) {
    return date.toLocaleTimeString("en-KE", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default async function MemberNotificationsPage() {
    const memberId = await requireMemberSession();

    const [member, notifications] = await Promise.all([
        prisma.member.findUnique({
            where: { id: memberId },
            include: {
                category: true,
            },
        }),

        prisma.notification.findMany({
            where: { memberId },
            orderBy: { createdAt: "desc" },
        }),
    ]);

    if (!member) notFound();

    const unreadCount = notifications.filter((item) => !item.read).length;

    return (
        <MemberPortalShell member={member} notifications={notifications}>
            <div className="mx-auto max-w-4xl space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-[#C1121F]">
                        Member Centre
                    </p>

                    <h1 className="mt-2 text-3xl font-black text-slate-950">
                        Notifications
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        {unreadCount} unread message{unreadCount === 1 ? "" : "s"} from AHPK.
                    </p>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                        <h2 className="text-xl font-black text-slate-950">Today</h2>
                    </div>

                    <div>
                        {notifications.map((item) => (
                            <Link
                                key={item.id}
                                href={`/member/notifications/${item.id}`}
                                className={`block border-b border-slate-100 px-6 py-5 transition last:border-b-0 hover:bg-slate-50 ${!item.read ? "bg-green-50/50" : "bg-white"
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                                        <span className="text-lg">🔔</span>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    {!item.read && (
                                                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-600" />
                                                    )}

                                                    <h3 className="truncate text-base font-black text-slate-900">
                                                        {item.title}
                                                    </h3>
                                                </div>

                                                <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-500">
                                                    {item.message}
                                                </p>

                                                <p className="mt-3 text-xs font-bold text-slate-400">
                                                    {formatDate(item.createdAt)}
                                                </p>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <p className="text-xs font-bold text-slate-400">
                                                    {formatTime(item.createdAt)}
                                                </p>

                                                <span
                                                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-[10px] font-black ${item.read
                                                        ? "bg-slate-100 text-slate-500"
                                                        : "bg-green-100 text-green-700"
                                                        }`}
                                                >
                                                    {item.read ? "READ" : "NEW"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {notifications.length === 0 && (
                            <p className="p-8 text-center text-sm font-semibold text-slate-500">
                                No notifications yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </MemberPortalShell>
    );
}
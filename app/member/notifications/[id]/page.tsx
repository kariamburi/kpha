import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../../MemberPortalShell";
import { requireMemberSession } from "../../session";

type Props = {
    params: Promise<{ id: string }>;
};

function formatDateTime(date: Date) {
    return date.toLocaleString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default async function MemberNotificationDetailsPage({ params }: Props) {
    const memberId = await requireMemberSession();
    const { id } = await params;

    const [member, notification, notifications] = await Promise.all([
        prisma.member.findUnique({
            where: { id: memberId },
            include: {
                category: true,
            },
        }),

        prisma.notification.findFirst({
            where: {
                id,
                memberId,
            },
        }),

        prisma.notification.findMany({
            where: { memberId },
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
    ]);

    if (!member || !notification) notFound();

    if (!notification.read) {
        await prisma.notification.update({
            where: { id: notification.id },
            data: { read: true },
        });
    }

    return (
        <MemberPortalShell member={member} notifications={notifications}>
            <div className="mx-auto max-w-4xl space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <Link
                        href="/member/notifications"
                        className="inline-flex items-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-red-50 hover:text-[#C1121F]"
                    >
                        ← Back to Notifications
                    </Link>
                </div>

                <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                                <span className="text-2xl">🔔</span>
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#C1121F]">
                                    Member Notice
                                </p>

                                <h1 className="mt-2 text-2xl font-black leading-tight text-slate-950 md:text-3xl">
                                    {notification.title}
                                </h1>

                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-black uppercase text-green-700">
                                        Read
                                    </span>

                                    <span className="text-xs font-bold text-slate-400">
                                        {formatDateTime(notification.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="rounded-3xl bg-white p-2">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                                <p className="whitespace-pre-line text-sm font-semibold leading-8 text-slate-600 md:text-base">
                                    {notification.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </MemberPortalShell>
    );
}
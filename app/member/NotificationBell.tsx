"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell } from "lucide-react";

type NotificationItem = {
    id: string;
    title: string;
    message: string;
    type?: string | null;
    read: boolean;
    createdAt: Date;
};

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function NotificationBell({
    notifications,
}: {
    notifications: NotificationItem[];
}) {
    const [open, setOpen] = useState(false);

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="relative cursor-pointer flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
            >
                <Bell className="h-5 w-5" />

                {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C1121F] px-1 text-[10px] font-black text-white ring-2 ring-[#111111]">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-14 z-50 w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-2xl">
                    <div className="border-b border-slate-200 px-5 py-4">
                        <p className="text-sm font-black">Notifications</p>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                            {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
                        </p>
                    </div>

                    <div className="max-h-[360px] overflow-y-auto p-3">
                        {notifications.length === 0 && (
                            <p className="rounded-2xl bg-slate-50 p-4 text-center text-sm font-semibold text-slate-500">
                                No notifications yet.
                            </p>
                        )}

                        {notifications.map((item) => (
                            <Link
                                key={item.id}
                                href={`/member/notifications/${item.id}`}
                                onClick={() => setOpen(false)}
                                className="block rounded-2xl p-4 transition hover:bg-slate-50"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-[10px] font-black ${item.read
                                            ? "bg-slate-100 text-slate-500"
                                            : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {item.read ? "READ" : "NEW"}
                                    </span>

                                    <span className="text-[11px] font-bold text-slate-400">
                                        {formatDate(item.createdAt)}
                                    </span>
                                </div>

                                <h3 className="mt-3 line-clamp-1 text-sm font-black text-slate-950">
                                    {item.title}
                                </h3>

                                <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">
                                    {item.message}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <div className="border-t border-slate-200 p-3">
                        <Link
                            href="/member/notifications"
                            className="block rounded-2xl bg-slate-950 px-4 py-3 text-center text-xs font-black text-white hover:bg-black"
                        >
                            View all notifications
                        </Link>
                    </div>
                </div >
            )
            }
        </div >
    );
}
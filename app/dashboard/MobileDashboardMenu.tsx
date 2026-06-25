"use client";

import Link from "next/link";
import { useState } from "react";

const menu = [
    { title: "Home", href: "/", icon: "⌂" },
    { title: "Dashboard", href: "/dashboard", icon: "▣" },
    { title: "Members", href: "/dashboard/members", icon: "☷" },
    { title: "Applications", href: "/dashboard/applications", icon: "◉" },
    { title: "Payments", href: "/dashboard/payments", icon: "⇄" },
    { title: "Certificates", href: "/dashboard/certificates", icon: "▤" },
    { title: "Expiring Members", href: "/dashboard/expiring-members", icon: "!" },
    { title: "Website CMS", href: "/dashboard/website", icon: "◫" },
    { title: "Member Directory", href: "/dashboard/member-directory", icon: "◎" },
    { title: "Communication", href: "/dashboard/communication", icon: "✉" },
    { title: "Audit Logs", href: "/dashboard/audit-logs", icon: "◷" },
    { title: "Settings", href: "/dashboard/settings", icon: "⚙" },
];

export default function MobileDashboardMenu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-2xl font-black text-white md:hidden"
            >
                ☰
            </button>

            {open && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="absolute cursor-pointer inset-0 bg-black/50"
                    />

                    <aside className="absolute left-0 top-0 h-full w-[82%] max-w-sm overflow-y-auto bg-white shadow-2xl">
                        <div className="flex items-center justify-between bg-[#111111] px-5 py-5 text-white">
                            <div>
                                <p className="text-xs font-black tracking-[0.25em] text-[#F3C64E]">
                                    AHPK
                                </p>
                                <h2 className="mt-1 text-xl font-black">Admin Menu</h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-xl"
                            >
                                ×
                            </button>
                        </div>

                        <nav className="p-4">
                            {menu.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="mb-2 flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-black text-gray-800 hover:bg-red-50 hover:text-[#C1121F]"
                                >
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg">
                                        {item.icon}
                                    </span>
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
}
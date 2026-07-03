"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

export default function MobileMemberMenu({
    memberId,
    isAdmin = false,
}: {
    memberId: string;
    isAdmin?: boolean;
}) {
    const [open, setOpen] = useState(false);

    const menu = [
        { title: "Dashboard", href: "/member/dashboard", icon: "▣" },
        { title: "Profile", href: "/member/profile", icon: "☷" },
        { title: "Certificates", href: "/member/certificates", icon: "▤" },
        { title: "Payments", href: "/member/payments", icon: "⇄" },
        { title: "Renewal", href: "/member/renewal", icon: "↻" },
        ...(isAdmin
            ? [{ title: "Admin", href: "/dashboard", icon: "⚙" }]
            : []),
        { title: "Logout", href: "/member/logout", icon: "⎋" },
    ];

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-2xl font-black text-white lg:hidden"
            >
                ☰
            </button>

            {open && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-black/50"
                    />

                    <aside className="absolute left-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white shadow-2xl">
                        <div className="flex items-center justify-between bg-[#111111] px-5 py-5 text-white">
                            <div>
                                <p className="text-xs font-black tracking-[0.25em] text-[#F3C64E]">
                                    AHPK
                                </p>
                                <h2 className="mt-1 text-xl font-black">Member Menu</h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <nav className="space-y-2 p-4">
                            {menu.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition ${item.href === "/dashboard"
                                        ? "bg-[#F3C64E] text-[#111111] hover:bg-yellow-300"
                                        : "text-slate-700 hover:bg-red-50 hover:text-[#C1121F]"
                                        }`}
                                >
                                    <span
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base ${item.href === "/dashboard"
                                            ? "bg-white/60"
                                            : "bg-slate-100"
                                            }`}
                                    >
                                        {item.icon}
                                    </span>

                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
}
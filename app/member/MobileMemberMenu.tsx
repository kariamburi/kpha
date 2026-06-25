"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMemberMenu({
    memberId,
}: {
    memberId: string;
}) {
    const [open, setOpen] = useState(false);

    const menu = [
        { title: "Dashboard", href: "/member/dashboard", icon: "▣" },
        { title: "Profile", href: "/member/profile", icon: "☷" },
        { title: "Certificates", href: "/member/certificates", icon: "▤" },
        { title: "Payments", href: "/member/payments", icon: "⇄" },
        { title: "Renewal", href: "/member/renewal", icon: "↻" },
        { title: "Website", href: "/", icon: "⌂" },
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

                    <aside className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-white shadow-2xl">
                        <div className="flex items-center justify-between bg-[#111111] px-5 py-5 text-white">
                            <div>
                                <p className="text-xs font-black tracking-[0.25em] text-[#F3C64E]">
                                    AHPK
                                </p>
                                <h2 className="mt-1 text-xl font-black">
                                    Member Menu
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl"
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
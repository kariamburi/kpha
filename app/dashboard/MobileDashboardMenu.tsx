"use client";

import Link from "next/link";
import { useState } from "react";

type Role = "SUPER_ADMIN" | "ADMIN" | "FINANCE" | "MEMBER";

type MenuItem = {
    title: string;
    href: string;
    icon: string;
    roles?: Role[];
};

const menu: MenuItem[] = [
    { title: "Home", href: "/", icon: "⌂" },
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: "▣",
        roles: ["SUPER_ADMIN", "ADMIN", "FINANCE"],
    },
    {
        title: "Members",
        href: "/dashboard/members",
        icon: "☷",
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        title: "Applications",
        href: "/dashboard/applications",
        icon: "◉",
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        title: "Payments",
        href: "/dashboard/payments",
        icon: "⇄",
        roles: ["SUPER_ADMIN", "FINANCE"],
    },
    {
        title: "Certificates",
        href: "/dashboard/certificates",
        icon: "▤",
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        title: "Expiring Members",
        href: "/dashboard/expiring-members",
        icon: "!",
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        title: "Website CMS",
        href: "/dashboard/website",
        icon: "◫",
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        title: "Member Directory",
        href: "/dashboard/member-directory",
        icon: "◎",
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        title: "Communication",
        href: "/dashboard/communication",
        icon: "✉",
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        title: "Audit Logs",
        href: "/dashboard/audit-logs",
        icon: "◷",
        roles: ["SUPER_ADMIN"],
    },
    {
        title: "Dashboard Users",
        href: "/dashboard/users",
        icon: "♙",
        roles: ["SUPER_ADMIN"],
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: "⚙",
        roles: ["SUPER_ADMIN"],
    },
];

function canViewItem(item: MenuItem, role: Role) {
    if (!item.roles || item.roles.length === 0) return true;
    return item.roles.includes(role);
}

export default function MobileDashboardMenu({ role }: { role: Role }) {
    const [open, setOpen] = useState(false);

    const visibleMenu = menu.filter((item) => canViewItem(item, role));

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
                        className="absolute inset-0 cursor-pointer bg-black/50"
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
                            {visibleMenu.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="mb-2 flex items-center gap-4 rounded-2xl px-4 py-1 text-sm font-black text-gray-800 hover:bg-red-50 hover:text-[#C1121F]"
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
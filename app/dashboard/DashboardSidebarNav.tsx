"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
    { title: "Home", href: "/", icon: "⌂" },
    { title: "Dashboard", href: "/dashboard", icon: "▣" },
    { title: "Members", href: "/dashboard/members", icon: "☷" },
    { title: "Applications", href: "/dashboard/applications", icon: "◉" },
    { title: "Payments", href: "/dashboard/payments", icon: "⇄" },
    { title: "Certificates", href: "/dashboard/certificates", icon: "▤" },
    { title: "Expiring", href: "/dashboard/expiring-members", icon: "!" },
    {
        title: "Website",
        href: "/dashboard/website",
        icon: "◫",
        children: [
            { title: "Overview", href: "/dashboard/website", icon: "▣" },
            { title: "Pages", href: "/dashboard/website/pages", icon: "▤" },
            { title: "Leadership", href: "/dashboard/website/leaders", icon: "♔" },
            { title: "Resources", href: "/dashboard/website/resources", icon: "▧" },
            { title: "Events & CPD", href: "/dashboard/website/events", icon: "◷" },
            { title: "News", href: "/dashboard/website/news", icon: "☰" },
            { title: "Contact", href: "/dashboard/website/contact", icon: "✉" },
        ],
    },
    { title: "Directory", href: "/dashboard/member-directory", icon: "◎" },
    { title: "Communication", href: "/dashboard/communication", icon: "✉" },
    { title: "Settings", href: "/dashboard/settings", icon: "⚙" },
];

export default function DashboardSidebarNav() {
    const pathname = usePathname();
    const [openSection, setOpenSection] = useState<string | null>(null);

    function toggleSection(title: string) {
        setOpenSection((current) => (current === title ? null : title));
    }

    function closeSections() {
        setOpenSection(null);
    }

    return (
        <nav className="mt-4 flex h-[calc(100vh-7rem)] flex-col gap-1 overflow-y-auto px-3 pb-2">
            {menu.map((item) => {
                const active =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href + "/"));

                if (item.children) {
                    const isOpen = openSection === item.title;

                    return (
                        <div key={item.href}>
                            <button
                                type="button"
                                onClick={() => toggleSection(item.title)}
                                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition ${active
                                    ? "bg-red-50 text-[#C1121F]"
                                    : "text-slate-600 hover:bg-red-50 hover:text-[#C1121F]"
                                    }`}
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-base leading-none">
                                    {item.icon}
                                </span>

                                <span className="flex-1 text-sm font-black leading-none">
                                    {item.title}
                                </span>

                                <span
                                    className={`text-xs font-black transition ${isOpen ? "rotate-180" : ""
                                        }`}
                                >
                                    ▾
                                </span>
                            </button>

                            {isOpen && (
                                <div className="ml-6 mt-1 grid gap-1 border-l border-slate-200 pl-3">
                                    {item.children.map((child) => {
                                        const childActive = pathname === child.href;

                                        return (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-black transition ${childActive
                                                    ? "bg-[#C1121F] text-white"
                                                    : "text-slate-500 hover:bg-red-50 hover:text-[#C1121F]"
                                                    }`}
                                            >
                                                <span>{child.icon}</span>
                                                <span>{child.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                }

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        title={item.title}
                        onClick={closeSections}
                        className={`flex w-full items-center gap-2 rounded-xl px-4 py-1 transition ${active
                            ? "bg-red-50 text-[#C1121F]"
                            : "text-slate-600 hover:bg-red-50 hover:text-[#C1121F]"
                            }`}
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-base leading-none">
                            {item.icon}
                        </span>

                        <span className="text-sm font-black leading-none">
                            {item.title}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
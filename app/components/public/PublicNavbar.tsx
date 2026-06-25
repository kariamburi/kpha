"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Award,
    BookOpenText,
    CalendarDays,
    ChevronDown,
    FileText,
    Home,
    Mail,
    Menu,
    Newspaper,
    ShieldCheck,
    Users,
    X,
} from "lucide-react";
import { useState } from "react";
import Logo from "@/app/assets/logo.png";

const aboutLinks = [
    { href: "/about", label: "Who We Are", icon: Users },
    { href: "/leadership", label: "Board of Management", icon: Award },
    { href: "/executive-summary", label: "Executive Summary", icon: BookOpenText },
    { href: "/corporate-statements", label: "Corporate Statements", icon: FileText },
];

const memberSectionLinks = [
    { href: "/members-section/membership-criterion-levels", label: "Membership Criterion & Levels", icon: Users },
    { href: "/members-section/membership-categories", label: "Membership Categories", icon: Award },
    { href: "/members-section/code-of-ethics-conduct", label: "Code of Ethics & Conduct", icon: ShieldCheck },
    { href: "/members-section/code-of-ethics-pledge", label: "Ethics Pledge", icon: FileText },
    { href: "/members-section/office-bearers-duties", label: "Office Bearers & Duties", icon: BookOpenText },
    { href: "/members-section/board-of-management", label: "Association Committees", icon: Users },
];

const links = [
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/resources", label: "Resources", icon: FileText },
    { href: "/events", label: "Events", icon: CalendarDays },
    { href: "/contact", label: "Contact", icon: Mail },
];

export default function PublicNavbar() {
    const pathname = usePathname();
    const [aboutOpen, setAboutOpen] = useState(false);
    const [membersOpen, setMembersOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const aboutActive = aboutLinks.some((item) => pathname === item.href);
    const membersActive = memberSectionLinks.some((item) => pathname === item.href);

    function closeMobile() {
        setMobileOpen(false);
        setAboutOpen(false);
        setMembersOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
                        <Image
                            src={Logo}
                            alt="AHPK Logo"
                            width={46}
                            height={46}
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="min-w-0 leading-tight">
                        <p className="text-xs font-black tracking-[0.25em] text-[#C1121F]">
                            AHPK
                        </p>

                        <p className="max-w-[240px] text-sm font-black leading-5 text-slate-950 line-clamp-2">
                            Association of Hotel Professionals Kenya
                        </p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-2 text-sm font-bold text-slate-600 lg:flex">
                    <NavLink href="/" label="Home" icon={Home} active={pathname === "/"} />

                    <DropdownNav
                        label="About"
                        href="/about"
                        icon={Users}
                        open={aboutOpen}
                        setOpen={setAboutOpen}
                        active={aboutActive}
                        items={aboutLinks}
                        pathname={pathname}
                    />

                    <DropdownNav
                        label="Members"
                        href="/members-section/membership-criterion-levels"
                        icon={ShieldCheck}
                        open={membersOpen}
                        setOpen={setMembersOpen}
                        active={membersActive}
                        items={memberSectionLinks}
                        pathname={pathname}
                    />

                    {links.map((link) => (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            icon={link.icon}
                            active={pathname === link.href}
                        />
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <Link
                        href="/member/login"
                        className="whitespace-nowrap rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                        Member Login
                    </Link>

                    <Link
                        href="/apply"
                        className="rounded-xl bg-[#C1121F] px-4 py-2 text-sm font-bold text-white hover:bg-red-800"
                    >
                        Apply
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileOpen((v) => !v)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden"
                    aria-label="Open menu"
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-xl lg:hidden">
                    <div className="mx-auto grid max-w-7xl gap-2">
                        <MobileNavLink href="/" label="Home" icon={Home} active={pathname === "/"} onClick={closeMobile} />

                        <MobileGroup
                            title="About"
                            icon={Users}
                            active={aboutActive}
                            open={aboutOpen}
                            setOpen={setAboutOpen}
                            items={aboutLinks}
                            pathname={pathname}
                            onClick={closeMobile}
                        />

                        <MobileGroup
                            title="Members"
                            icon={ShieldCheck}
                            active={membersActive}
                            open={membersOpen}
                            setOpen={setMembersOpen}
                            items={memberSectionLinks}
                            pathname={pathname}
                            onClick={closeMobile}
                        />

                        {links.map((link) => (
                            <MobileNavLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                icon={link.icon}
                                active={pathname === link.href}
                                onClick={closeMobile}
                            />
                        ))}

                        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
                            <Link
                                href="/member/login"
                                onClick={closeMobile}
                                className="whitespace-nowrap rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 hover:bg-slate-50"
                            >
                                Member Login
                            </Link>

                            <Link
                                href="/apply"
                                onClick={closeMobile}
                                className="rounded-xl bg-[#C1121F] px-4 py-3 text-center text-sm font-black text-white hover:bg-red-800"
                            >
                                Apply
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

function DropdownNav({
    label,
    href,
    icon: Icon,
    open,
    setOpen,
    active,
    items,
    pathname,
}: {
    label: string;
    href: string;
    icon: React.ElementType;
    open: boolean;
    setOpen: (value: boolean) => void;
    active: boolean;
    items: { href: string; label: string; icon: React.ElementType }[];
    pathname: string;
}) {
    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <Link
                href={href}
                className={`inline-flex items-center gap-2 rounded-xl px-2 py-2 transition ${active
                    ? "bg-red-50 text-[#C1121F]"
                    : "hover:bg-slate-50 hover:text-[#C1121F]"
                    }`}
            >
                <Icon className="h-4 w-4" />
                {label}
                <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
            </Link>

            {open && (
                <div className="absolute left-0 top-full z-50 w-[22rem] pt-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                        {items.map((item) => {
                            const ItemIcon = item.icon;
                            const itemActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${itemActive
                                        ? "bg-[#C1121F] text-white"
                                        : "text-slate-700 hover:bg-red-50 hover:text-[#C1121F]"
                                        }`}
                                >
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${itemActive
                                            ? "bg-white/15 text-white"
                                            : "bg-slate-100 text-[#C1121F]"
                                            }`}
                                    >
                                        <ItemIcon className="h-4 w-4" />
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

function MobileGroup({
    title,
    icon: Icon,
    active,
    open,
    setOpen,
    items,
    pathname,
    onClick,
}: {
    title: string;
    icon: React.ElementType;
    active: boolean;
    open: boolean;
    setOpen: (value: boolean) => void;
    items: { href: string; label: string; icon: React.ElementType }[];
    pathname: string;
    onClick: () => void;
}) {
    return (
        <div className="rounded-2xl border border-slate-200">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-black transition ${active ? "bg-red-50 text-[#C1121F]" : "text-slate-700"
                    }`}
            >
                <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {title}
                </span>
                <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="grid gap-1 px-2 pb-2">
                    {items.map((item) => {
                        const ItemIcon = item.icon;
                        const itemActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClick}
                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold ${itemActive
                                    ? "bg-[#C1121F] text-white"
                                    : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <ItemIcon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function MobileNavLink({
    href,
    label,
    icon: Icon,
    active,
    onClick,
}: {
    href: string;
    label: string;
    icon: React.ElementType;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black transition ${active
                ? "bg-red-50 text-[#C1121F]"
                : "text-slate-700 hover:bg-slate-50"
                }`}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    );
}

function NavLink({
    href,
    label,
    icon: Icon,
    active,
}: {
    href: string;
    label: string;
    icon: React.ElementType;
    active: boolean;
}) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2 rounded-xl px-2 py-2 transition ${active
                ? "bg-red-50 text-[#C1121F]"
                : "hover:bg-slate-50 hover:text-[#C1121F]"
                }`}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    );
}
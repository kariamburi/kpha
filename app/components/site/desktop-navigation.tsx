// components/site/desktop-navigation.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    BadgeCheck,
    BookOpen,
    Building2,
    ChevronDown,
    FileCheck,
    FileText,
    GraduationCap,
    Landmark,
    LogIn,
    Menu,
    Scale,
    ShieldCheck,
    UserPlus,
    Users,
    X,
} from "lucide-react";



import { cn } from "@/lib/utils";
import type { NavigationItem } from "../public-navigation/navigation-types";

const publicNavigation: NavigationItem[] = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "About Us",
        groups: [
            {
                title: "About AHPK",
                description:
                    "Learn about the association, its purpose and institutional mandate.",
                links: [
                    {
                        label: "Who We Are",
                        href: "/about/who-we-are",
                        description:
                            "Our history, identity and role in Kenya’s hospitality industry.",
                        icon: Building2,
                    },

                    {
                        label: "Executive Summary",
                        href: "/about/executive-summary",
                        description:
                            "A summary of AHPK’s work and institutional direction.",
                        icon: FileText,
                    },
                    {
                        label: "Corporate Statements",
                        href: "/about/corporate-statements",
                        description:
                            "Our vision, mission and professional values.",
                        icon: Landmark,
                    },
                ],
            },
            {
                title: "Leadership",
                description:
                    "Meet the professionals responsible for the governance and management of AHPK.",
                links: [
                    {
                        label: "Board of Management",
                        href: "/about/executive-committee",
                        description:
                            "The governing board of the association.",
                        icon: Users,
                    },

                    {
                        label: "Board & Committee Members",
                        href: "/about/board-and-committee-members",
                        description:
                            "Specialized committees and their responsibilities.",
                        icon: Users,
                    },
                ],
            },
        ],
    },
    {
        label: "Members Section",
        groups: [
            {
                title: "Membership",
                description:
                    "Membership eligibility, categories, recognition and applications.",
                links: [

                    {
                        label: "Criteria & Levels",
                        href: "/members-section/membership-criterion-levels",
                        description:
                            "Review eligibility requirements and membership levels.",
                        icon: GraduationCap,
                    },
                    {
                        label: "Membership Categories",
                        href: "/members-section/membership-categories",
                        description:
                            "Explore the available membership categories.",
                        icon: BadgeCheck,
                    },
                    {
                        label: "Apply for Membership",
                        href: "/apply",
                        description:
                            "Submit a new AHPK membership application.",
                        icon: UserPlus,
                    },
                ],
            },
            {
                title: "Existing Members",
                description:
                    "Member services, renewals, directory and certificate verification.",
                links: [
                    {
                        label: "Member Login",
                        href: "/member/login",
                        description:
                            "Access your secure AHPK member account.",
                        icon: LogIn,
                    },
                    {
                        label: "Renew Membership",
                        href: "/member/renewal",
                        description:
                            "Renew your annual professional membership.",
                        icon: BadgeCheck,
                    },
                    {
                        label: "Member Search",
                        href: "/directory",
                        description:
                            "Search for verified AHPK members.",
                        icon: Users,
                    },
                    {
                        label: "Verify Certificate",
                        href: "/verify",
                        description:
                            "Confirm the authenticity of an AHPK certificate.",
                        icon: ShieldCheck,
                    },
                ],
            },
            {
                title: "Professional Standards",
                description:
                    "Professional ethics, conduct and member responsibilities.",
                links: [
                    {
                        label: "Code of Conduct & Ethics",
                        href: "/members-section/code-of-conduct-ethics/professional-attitude-behavior",
                        description:
                            "Review AHPK’s professional standards.",
                        icon: Scale,
                    },
                    {
                        label: "Code of Ethics & Conducts Pledge",
                        href: "/members-section/code-of-conduct-ethics/code-of-ethics-conducts-pledge",
                        description:
                            "Read the AHPK ethical pledge and the seven tests for ethical decision-making.",
                        icon: ShieldCheck,
                    },
                    {
                        label: "Relationships with Clients",
                        href: "/members-section/code-of-conduct-ethics/relationships-with-clients",
                        description:
                            "Professional responsibilities when serving clients.",
                        icon: Users,
                    },
                    {
                        label: "Professional Relationships",
                        href: "/members-section/code-of-conduct-ethics/professional-relationships",
                        description:
                            "Standards for working with fellow professionals.",
                        icon: Users,
                    },
                    {
                        label: "Handling Alleged Violations",
                        href: "/members-section/code-of-conduct-ethics/handling-alleged-violations",
                        description:
                            "Procedures for addressing reported violations.",
                        icon: FileCheck,
                    },
                ],
            },
            {
                title: "Governance & Documents",
                description:
                    "Official rules, ethics pledges and association documents.",
                links: [
                    {
                        label: "Objectives",
                        href: "/members-section/constitution-rules/objectives",
                        description:
                            "Discover AHPK's objectives for advancing the hospitality profession.",
                        icon: BookOpen,
                    },
                    {
                        label: "Membership",
                        href: "/members-section/constitution-rules/membership",
                        description:
                            "Learn about membership eligibility, rights, privileges and responsibilities.",
                        icon: ShieldCheck,
                    },
                    {
                        label: "Office Bearers & Duties",
                        href: "/members-section/constitution-rules/office-bearers-duties",
                        description:
                            "Learn about AHPK's elected leaders, their responsibilities and constitutional duties.",
                        icon: FileText,
                    },
                    {
                        label: "The Executive Committee",
                        href: "/members-section/constitution-rules/the-executive-committee",
                        description:
                            "Explore the Executive Committee's composition, powers, meetings and governance responsibilities.",
                        icon: FileText,
                    },
                ],
            },
        ],
    },
    {
        label: "Association Purpose",
        href: "/association-purpose",
    },
    {
        label: "Events",
        href: "/events",
    }, {

        label: "News",
        href: "/news",
    },
    {

        label: "Gallery",
        href: "/gallery",
    },
    {
        label: "Contact Us",
        href: "/contact",
    },

];

function isPathActive(pathname: string, href: string): boolean {
    if (href === "/") {
        return pathname === "/";
    }

    const cleanHref = href.split("?")[0];

    return (
        pathname === cleanHref ||
        pathname.startsWith(`${cleanHref}/`)
    );
}

function DesktopMenu() {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [openGroup, setOpenGroup] = useState<string | null>(null);

    useEffect(() => {
        setOpenMenu(null);
        setOpenGroup(null);
    }, [pathname]);

    function closeDropdowns() {
        setOpenMenu(null);
        setOpenGroup(null);
    }

    return (
        <nav
            aria-label="Main navigation"
            className="hidden lg:block"
            onMouseLeave={closeDropdowns}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    closeDropdowns();
                }
            }}
        >
            <ul className="flex items-center gap-0.5">
                {publicNavigation.map((item) => {
                    const groups = item.groups ?? [];
                    if (!groups.length) {
                        if (!item.href) return null;
                        const active = isPathActive(pathname, item.href);
                        return (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    onMouseEnter={closeDropdowns}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "inline-flex h-10 items-center whitespace-nowrap px-3 text-sm font-bold transition-colors hover:text-[#C8102E]",
                                        active ? "text-[#C8102E]" : "text-slate-700",
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    }

                    const expanded = openMenu === item.label;
                    const active = groups.some((group) =>
                        group.links.some((link) => isPathActive(pathname, link.href))
                    );
                    const selected = groups.find((group) => group.title === openGroup);

                    return (
                        <li
                            key={item.label}
                            className="relative"
                            onMouseEnter={() => {
                                setOpenMenu(item.label);
                                setOpenGroup(null);
                            }}
                        >
                            <button
                                type="button"
                                aria-expanded={expanded}
                                aria-haspopup="true"
                                onClick={() => {
                                    setOpenMenu(expanded ? null : item.label);
                                    setOpenGroup(null);
                                }}
                                className={cn(
                                    "inline-flex h-10 items-center gap-1 whitespace-nowrap px-3 text-sm font-bold transition-colors hover:text-[#C8102E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8102E]",
                                    active || expanded ? "text-[#C8102E]" : "text-slate-700",
                                )}
                            >
                                {item.label}
                                <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} />
                            </button>

                            {expanded && (
                                <div className="absolute left-0 top-full z-[100] flex items-start pt-0">
                                    <div className="w-60 border-t-[3px] border-[#C8102E] bg-white py-1.5 shadow-xl ring-1 ring-slate-200">
                                        {groups.map((group) => (
                                            <button
                                                key={group.title}
                                                type="button"
                                                aria-expanded={selected?.title === group.title}
                                                onMouseEnter={() => setOpenGroup(group.title)}
                                                onFocus={() => setOpenGroup(group.title)}
                                                onClick={() => setOpenGroup(group.title)}
                                                className={cn(
                                                    "flex min-h-11 w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm font-semibold transition-colors hover:bg-red-50 hover:text-[#C8102E] focus:bg-red-50 focus:text-[#C8102E] focus:outline-none",
                                                    selected?.title === group.title ? "bg-red-50 text-[#C8102E]" : "text-slate-800",
                                                )}
                                            >
                                                {group.title}
                                                <ChevronDown className="size-4 shrink-0 -rotate-90" />
                                            </button>
                                        ))}
                                    </div>
                                    {selected && (
                                        <div
                                            className="w-[280px] max-h-[70vh] overflow-y-auto border-t-[3px] border-[#C8102E] bg-white py-1.5 shadow-xl ring-1 ring-slate-200"
                                            onMouseEnter={() => setOpenGroup(selected.title)}
                                        >
                                            {selected.links.map((link) => {
                                                const Icon = link.icon;
                                                const current = isPathActive(pathname, link.href);
                                                return (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={closeDropdowns}
                                                        aria-current={current ? "page" : undefined}
                                                        className={cn(
                                                            "flex min-h-11 items-center gap-2.5 px-3 py-2 text-sm font-semibold transition-colors hover:bg-red-50 hover:text-[#C8102E] focus:bg-red-50 focus:text-[#C8102E] focus:outline-none",
                                                            current ? "bg-red-50 text-[#C8102E]" : "text-slate-800",
                                                        )}
                                                    >
                                                        {Icon && <Icon className="size-4 shrink-0" aria-hidden="true" />}
                                                        <span>{link.label}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

function MobileMenu() {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
    const [openSection, setOpenSection] = useState<
        string | null
    >(null);

    useEffect(() => {
        setIsOpen(false);
        setOpenSection(null);
        setOpenMobileGroup(null);
    }, [pathname]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    function toggleSection(label: string) {
        setOpenSection((current) => current === label ? null : label);
        setOpenMobileGroup(null);
    }

    function closeMenu() {
        setIsOpen(false);
        setOpenSection(null);
        setOpenMobileGroup(null);
    }

    return (
        <div className="lg:hidden">
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                aria-label={
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                }
                className={cn(
                    "inline-flex size-10 items-center justify-center border border-slate-300 bg-white text-slate-900",
                    "transition-all duration-200 hover:border-[#C8102E] hover:bg-red-50 hover:text-[#C8102E]",
                    "focus:outline-none focus:ring-2 focus:ring-red-100",
                )}
            >
                {isOpen ? (
                    <X className="size-5" aria-hidden="true" />
                ) : (
                    <Menu className="size-5" aria-hidden="true" />
                )}
            </button>

            {isOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={closeMenu}
                        className="fixed inset-0 top-[var(--header-height,64px)] z-40 bg-slate-950/45 backdrop-blur-[2px]"
                    />

                    <div
                        id="mobile-navigation"
                        className={cn(
                            "fixed inset-x-0 top-[var(--header-height,64px)] z-50",
                            "max-h-[calc(100dvh-var(--header-height,64px))]",
                            "overflow-y-auto border-t-4 border-[#C8102E] bg-white shadow-2xl",
                        )}
                    >
                        <nav
                            aria-label="Mobile navigation"
                            className="mx-auto w-full max-w-7xl px-4 py-3"
                        >
                            <ul className="space-y-0.5">
                                {publicNavigation.map((item) => {
                                    const groups =
                                        item.groups ?? [];

                                    const hasGroups =
                                        groups.length > 0;

                                    if (
                                        !hasGroups &&
                                        item.href
                                    ) {
                                        const isActive =
                                            isPathActive(
                                                pathname,
                                                item.href,
                                            );

                                        return (
                                            <li key={item.label}>
                                                <Link
                                                    href={item.href}
                                                    onClick={
                                                        closeMenu
                                                    }
                                                    aria-current={
                                                        isActive
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    className={cn(
                                                        "flex min-h-11 items-center border-l-2 border-transparent px-3",
                                                        "text-sm font-black text-slate-700 transition-all duration-200",
                                                        "hover:translate-x-1 hover:border-[#C8102E] hover:bg-red-50 hover:text-[#C8102E]",
                                                        isActive &&
                                                        "border-[#C8102E] bg-red-50 text-[#C8102E]",
                                                    )}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        );
                                    }

                                    if (!hasGroups) {
                                        return null;
                                    }

                                    const isExpanded =
                                        openSection ===
                                        item.label;

                                    const sectionIsActive =
                                        groups.some(
                                            (group) =>
                                                group.links.some(
                                                    (link) =>
                                                        isPathActive(
                                                            pathname,
                                                            link.href,
                                                        ),
                                                ),
                                        );

                                    return (
                                        <li
                                            key={item.label}
                                            className="overflow-hidden border border-slate-200"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleSection(
                                                        item.label,
                                                    )
                                                }
                                                aria-expanded={
                                                    isExpanded
                                                }
                                                className={cn(
                                                    "flex min-h-11 w-full items-center justify-between gap-3 px-3",
                                                    "text-left text-sm font-black text-slate-800 transition-all duration-200",
                                                    "hover:bg-red-50 hover:text-[#C8102E]",
                                                    sectionIsActive &&
                                                    "text-[#C8102E]",
                                                )}
                                            >
                                                <span>
                                                    {item.label}
                                                </span>

                                                <ChevronDown
                                                    className={cn(
                                                        "size-4 shrink-0 transition-transform duration-200",
                                                        isExpanded &&
                                                        "rotate-180",
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </button>

                                            {isExpanded && (
                                                <div className="border-t border-slate-200 bg-slate-50 p-2">
                                                    <div className="space-y-3">
                                                        {groups.map(
                                                            (
                                                                group,
                                                            ) => (
                                                                <section
                                                                    key={
                                                                        group.title
                                                                    }
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        aria-expanded={openMobileGroup === group.title}
                                                                        onClick={() => setOpenMobileGroup((current) => current === group.title ? null : group.title)}
                                                                        className="mb-1 flex min-h-11 w-full items-center justify-between rounded px-3 text-left text-sm font-bold text-slate-800 hover:bg-white hover:text-[#C8102E]"
                                                                    >
                                                                        {group.title}
                                                                        <ChevronDown className={cn("size-4 transition-transform", openMobileGroup === group.title && "rotate-180")} />
                                                                    </button>

                                                                    {openMobileGroup === group.title && (
                                                                        <ul className="space-y-0.5">
                                                                            {group.links.map(
                                                                                (
                                                                                    link,
                                                                                ) => {
                                                                                    const Icon =
                                                                                        link.icon;

                                                                                    const isActive =
                                                                                        isPathActive(
                                                                                            pathname,
                                                                                            link.href,
                                                                                        );

                                                                                    return (
                                                                                        <li
                                                                                            key={
                                                                                                link.href
                                                                                            }
                                                                                        >
                                                                                            <Link
                                                                                                href={
                                                                                                    link.href
                                                                                                }
                                                                                                onClick={
                                                                                                    closeMenu
                                                                                                }
                                                                                                aria-current={
                                                                                                    isActive
                                                                                                        ? "page"
                                                                                                        : undefined
                                                                                                }
                                                                                                className={cn(
                                                                                                    "group flex min-h-11 items-center gap-2.5 border-l-2 border-transparent px-2 py-2",
                                                                                                    "transition-all duration-200 hover:translate-x-1 hover:border-[#C8102E] hover:bg-white",
                                                                                                    isActive &&
                                                                                                    "border-[#C8102E] bg-white",
                                                                                                )}
                                                                                            >
                                                                                                {Icon && (
                                                                                                    <span className="flex size-8 shrink-0 items-center justify-center bg-slate-950 text-white transition-all duration-200 group-hover:bg-[#C8102E]">
                                                                                                        <Icon
                                                                                                            className="size-4"
                                                                                                            aria-hidden="true"
                                                                                                        />
                                                                                                    </span>
                                                                                                )}

                                                                                                <span className="min-w-0 flex-1 self-center">
                                                                                                    <span className="block text-sm font-black text-slate-900 transition group-hover:text-[#C8102E]">
                                                                                                        {
                                                                                                            link.label
                                                                                                        }
                                                                                                    </span>


                                                                                                </span>
                                                                                            </Link>
                                                                                        </li>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </ul>
                                                                    )}
                                                                </section>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-300 pt-4">
                                <Link
                                    href="/member/login"
                                    onClick={closeMenu}
                                    className={cn(
                                        "inline-flex min-h-11 items-center justify-center border border-slate-300 px-4",
                                        "text-sm font-black text-slate-800 transition-all duration-200 hover:border-[#C8102E] hover:bg-red-50 hover:text-[#C8102E]",
                                    )}
                                >
                                    Member Login
                                </Link>

                                <Link
                                    href="/apply"
                                    onClick={closeMenu}
                                    className={cn(
                                        "inline-flex min-h-11 items-center justify-center bg-[#C8102E] px-4",
                                        "text-sm font-black text-white",
                                        "transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#A80D27] hover:shadow-lg",
                                    )}
                                >
                                    Apply
                                </Link>
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
}

export function DesktopNavigation() {
    return (
        <>
            <DesktopMenu />
            <MobileMenu />
        </>
    );
}
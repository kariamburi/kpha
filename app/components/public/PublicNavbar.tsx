"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    BadgeCheck,
    ChevronDown,
    ChevronRight,
    FileCheck,
    FileText,
    GraduationCap,
    LogIn,
    Menu,
    ShieldCheck,
    UserPlus,
    Users,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Logo from "@/app/assets/logo.png";
import { createPortal } from "react-dom";

type MenuLink = {
    label: string;
    href: string;
    description?: string;
    icon?: React.ElementType;
};

type MenuGroup = {
    title: string;
    links: MenuLink[];
};

type NavigationItem = {
    label: string;
    href?: string;
    groups?: MenuGroup[];
};

const navigation: NavigationItem[] = [
    {
        label: "About AHPK",
        groups: [
            {
                title: "About the Association",
                links: [
                    {
                        label: "Who We Are",
                        href: "/about/who-we-are",
                        description: "Learn about AHPK and its history.",
                    },
                    {
                        label: "Our Purpose",
                        href: "/about/our-purpose",
                        description:
                            "Our mandate within the hospitality industry.",
                    },
                    {
                        label: "Our Objectives",
                        href: "/about/our-objectives",
                        description:
                            "The goals and responsibilities of AHPK.",
                    },
                ],
            },
            {
                title: "Leadership",
                links: [
                    {
                        label: "Board of Management",
                        href: "/about/leadership/board",
                        description:
                            "Meet the association’s board members.",
                    },
                    {
                        label: "Secretariat",
                        href: "/about/leadership/secretariat",
                        description:
                            "The team responsible for daily operations.",
                    },
                    {
                        label: "Advisory Board",
                        href: "/about/leadership/advisory-board",
                        description:
                            "Professionals advising the association.",
                    },
                    {
                        label: "Committees",
                        href: "/about/leadership/committees",
                        description:
                            "View AHPK committees and their roles.",
                    },
                ],
            },
            {
                title: "Association Information",
                links: [
                    {
                        label: "Executive Summary",
                        href: "/about/executive-summary",
                        description:
                            "A summary of AHPK’s mandate and work.",
                    },
                    {
                        label: "Corporate Statement",
                        href: "/about/corporate-statement",
                        description: "Our vision, mission and values.",
                    },
                ],
            },
        ],
    },
    {
        label: "Membership",
        groups: [
            {
                title: "Become a Member",
                links: [
                    {
                        label: "Membership Overview",
                        href: "/membership",
                        description:
                            "Understand AHPK professional membership.",
                        icon: Users,
                    },
                    {
                        label: "Criteria & Levels",
                        href: "/membership/criteria-and-levels",
                        description:
                            "Review eligibility and membership levels.",
                        icon: GraduationCap,
                    },
                    {
                        label: "Membership Categories",
                        href: "/membership/categories",
                        description:
                            "Explore available membership categories.",
                        icon: FileCheck,
                    },
                    {
                        label: "Apply for Membership",
                        href: "/apply",
                        description:
                            "Submit a new membership application.",
                        icon: UserPlus,
                    },
                ],
            },
            {
                title: "Existing Members",
                links: [
                    {
                        label: "Member Login",
                        href: "/member/login",
                        description:
                            "Access your secure member account.",
                        icon: LogIn,
                    },
                    {
                        label: "Renew Membership",
                        href: "/member/renew",
                        description:
                            "Renew your annual AHPK membership.",
                        icon: BadgeCheck,
                    },
                    {
                        label: "Member Directory",
                        href: "/directory",
                        description:
                            "Search verified AHPK members.",
                        icon: Users,
                    },
                    {
                        label: "Verify Certificate",
                        href: "/verify",
                        description:
                            "Confirm a membership certificate.",
                        icon: ShieldCheck,
                    },
                ],
            },
        ],
    },
    {
        label: "Professional Standards",
        groups: [
            {
                title: "Code of Conduct & Ethics",
                links: [
                    {
                        label: "Code of Conduct Overview",
                        href: "/professional-standards/code-of-conduct",
                    },
                    {
                        label: "Professional Attitude & Behaviour",
                        href: "/professional-standards/professional-attitude",
                    },
                    {
                        label: "Relationships with Clients",
                        href: "/professional-standards/client-relationships",
                    },
                    {
                        label: "Professional Relationships",
                        href: "/professional-standards/professional-relationships",
                    },
                    {
                        label: "Handling Alleged Violations",
                        href: "/professional-standards/violations",
                    },
                    {
                        label: "Code of Ethics & Conduct Pledge",
                        href: "/professional-standards/ethics-pledge",
                    },
                ],
            },
            {
                title: "Governance Documents",
                links: [
                    {
                        label: "Constitution & Rules",
                        href: "/professional-standards/constitution",
                        icon: FileText,
                    },
                    {
                        label: "Association Documents",
                        href: "/resources?category=association-documents",
                        icon: FileCheck,
                    },
                ],
            },
        ],
    },
    {
        label: "Events & CPD",
        groups: [
            {
                title: "Events",
                links: [
                    {
                        label: "Upcoming Events",
                        href: "/events",
                        description:
                            "View forthcoming AHPK programmes.",
                    },
                    {
                        label: "Events Calendar",
                        href: "/events/calendar",
                        description: "Browse events by date.",
                    },
                    {
                        label: "Past Events",
                        href: "/events/past",
                        description:
                            "Explore previous association events.",
                    },
                ],
            },
            {
                title: "Professional Development",
                links: [
                    {
                        label: "CPD Programmes",
                        href: "/events/cpd",
                        description:
                            "Continuous professional development.",
                    },
                    {
                        label: "Gallery",
                        href: "/gallery",
                        description:
                            "Photos from AHPK programmes and events.",
                    },
                ],
            },
        ],
    },
    {
        label: "News",
        href: "/news",
    },
    {
        label: "Resources",
        groups: [
            {
                title: "Resource Centre",
                links: [
                    {
                        label: "All Resources",
                        href: "/resources",
                    },
                    {
                        label: "Policies",
                        href: "/resources?category=policies",
                    },
                    {
                        label: "Forms",
                        href: "/resources?category=forms",
                    },
                    {
                        label: "Guides",
                        href: "/resources?category=guides",
                    },
                    {
                        label: "Publications",
                        href: "/resources?category=publications",
                    },
                ],
            },
        ],
    },
    {
        label: "Contact",
        href: "/contact",
    },
];

export default function PublicNavbar({
    heroMode = false,
}: {
    heroMode?: boolean;
}) {
    const pathname = usePathname();

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
    const [pointerLeft, setPointerLeft] = useState<number>(0);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSection, setMobileSection] =
        useState<string | null>(null);

    const closeTimeout =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    const hideTimeout =
        useRef<ReturnType<typeof setTimeout> | null>(null);

    const selectedMenu =
        navigation.find((item) => item.label === visibleMenu) || null;

    useEffect(() => {
        setActiveMenu(null);
        setVisibleMenu(null);
        setMobileOpen(false);
        setMobileSection(null);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    useEffect(() => {
        return () => {
            if (closeTimeout.current) {
                clearTimeout(closeTimeout.current);
            }

            if (hideTimeout.current) {
                clearTimeout(hideTimeout.current);
            }
        };
    }, []);

    function openMenu(
        label: string,
        trigger?: HTMLElement | null,
    ) {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
        }

        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
        }

        if (trigger) {
            const rect = trigger.getBoundingClientRect();
            setPointerLeft(rect.left + rect.width / 2);
        }

        setVisibleMenu(label);

        window.requestAnimationFrame(() => {
            setActiveMenu(label);
        });
    }

    function closeMenu() {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
        }

        closeTimeout.current = setTimeout(() => {
            setActiveMenu(null);

            hideTimeout.current = setTimeout(() => {
                setVisibleMenu(null);
            }, 300);
        }, 220);
    }

    function closeMenuOnPlainItemHover() {
        if (!visibleMenu) return;

        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
        }

        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
        }

        setActiveMenu(null);

        hideTimeout.current = setTimeout(() => {
            setVisibleMenu(null);
        }, 180);
    }

    function closeMenuImmediately() {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
        }

        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
        }

        setActiveMenu(null);

        hideTimeout.current = setTimeout(() => {
            setVisibleMenu(null);
        }, 250);
    }

    function toggleMenu(
        label: string,
        trigger: HTMLElement,
    ) {
        if (activeMenu === label) {
            closeMenuImmediately();
            return;
        }

        openMenu(label, trigger);
    }

    function isPathActive(href: string) {
        const cleanHref = href.split("?")[0];

        return (
            pathname === cleanHref ||
            (cleanHref !== "/" &&
                pathname.startsWith(`${cleanHref}/`))
        );
    }

    function isMenuActive(item: NavigationItem) {
        if (item.href) {
            return isPathActive(item.href);
        }

        return Boolean(
            item.groups?.some((group) =>
                group.links.some((link) =>
                    isPathActive(link.href),
                ),
            ),
        );
    }

    return (
        <>
            <header
                className={
                    heroMode
                        ? "relative z-50 bg-transparent"
                        : "sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_5px_24px_rgba(15,23,42,0.07)] backdrop-blur-xl"
                }
                onMouseLeave={closeMenu}
            >
                {/* MAIN NAVIGATION ROW */}
                <div
                    className={
                        heroMode
                            ? "relative z-20 bg-transparent"
                            : "relative z-20 bg-white/95"
                    }
                >
                    <div
                        className={
                            heroMode
                                ? "mx-auto flex min-h-[140px] max-w-[1750px] items-start gap-8 px-5 py-5 sm:px-8 lg:min-h-[210px] lg:px-10 xl:px-12"
                                : "mx-auto flex h-[82px] max-w-[1700px] items-center gap-4 px-5 sm:px-7 lg:px-8 xl:px-10"
                        }
                    >
                        {/* LOGO */}
                        <Link
                            href="/"
                            onClick={closeMenuImmediately}
                            onMouseEnter={
                                closeMenuOnPlainItemHover
                            }
                            aria-label="AHPK homepage"
                            className="flex shrink-0 cursor-pointer items-center gap-3"
                        >
                            <Image
                                src={Logo}
                                alt="AHPK Logo"
                                width={heroMode ? 190 : 54}
                                height={heroMode ? 190 : 54}
                                className={
                                    heroMode
                                        ? "h-[110px] w-[110px] object-contain sm:h-[145px] sm:w-[145px] lg:h-[185px] lg:w-[185px]"
                                        : "h-[54px] w-[54px] object-contain"
                                }
                                priority
                            />

                            <div className="hidden 2xl:block">
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C8102E]">
                                    AHPK
                                </p>

                                <p className="mt-1 max-w-[220px] text-sm font-extrabold leading-tight text-slate-950">
                                    Association of Hotel
                                    Professionals Kenya
                                </p>
                            </div>
                        </Link>

                        {/* DESKTOP NAVIGATION */}
                        <nav
                            aria-label="Primary navigation"
                            className={
                                heroMode
                                    ? "hidden min-w-0 flex-1 items-start justify-end pt-7 lg:flex"
                                    : "hidden h-full min-w-0 flex-1 items-center justify-center lg:flex"
                            }
                        >
                            <DesktopNavLink
                                href="/"
                                label="Home"
                                active={pathname === "/"}
                                onClick={closeMenuImmediately}
                                onMouseEnter={
                                    closeMenuOnPlainItemHover
                                }
                            />

                            {navigation.map((item) => {
                                const active =
                                    isMenuActive(item);

                                const hasDropdown = Boolean(
                                    item.groups?.length,
                                );

                                const expanded =
                                    activeMenu === item.label;

                                if (
                                    !hasDropdown &&
                                    item.href
                                ) {
                                    return (
                                        <DesktopNavLink
                                            key={item.label}
                                            href={item.href}
                                            label={item.label}
                                            active={active}
                                            onClick={
                                                closeMenuImmediately
                                            }
                                            onMouseEnter={
                                                closeMenuOnPlainItemHover
                                            }
                                        />
                                    );
                                }

                                return (
                                    <button
                                        key={item.label}
                                        type="button"
                                        aria-haspopup="true"
                                        aria-expanded={
                                            expanded
                                        }
                                        onMouseEnter={(event) =>
                                            openMenu(
                                                item.label,
                                                event.currentTarget,
                                            )
                                        }
                                        onFocus={(event) =>
                                            openMenu(
                                                item.label,
                                                event.currentTarget,
                                            )
                                        }
                                        onClick={(event) =>
                                            toggleMenu(
                                                item.label,
                                                event.currentTarget,
                                            )
                                        }
                                        className={`group relative flex h-full shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-2 text-[12px] font-extrabold transition-all duration-200 xl:px-3 xl:text-[13px] ${active ||
                                            expanded
                                            ? "bg-red-50 text-[#C8102E]"
                                            : "text-slate-700 hover:bg-red-50/70 hover:text-[#C8102E]"
                                            }`}
                                    >
                                        {item.label}

                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-300 ${expanded
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        />

                                        <span
                                            className={`absolute bottom-0 left-3 right-3 h-[3px] origin-center rounded-t-full bg-[#C8102E] transition-transform duration-300 ${active ||
                                                expanded
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                                }`}
                                        />
                                    </button>
                                );
                            })}
                        </nav>

                        {/* DESKTOP ACTIONS */}
                        <div className="hidden shrink-0 items-center gap-2 2xl:flex">
                            <Link
                                href="/member/login"
                                onMouseEnter={
                                    closeMenuOnPlainItemHover
                                }
                                onClick={closeMenuImmediately}
                                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-extrabold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-[#C8102E] hover:text-[#C8102E] hover:shadow-md"
                            >
                                <LogIn className="h-4 w-4" />
                                Member Login
                            </Link>

                            <Link
                                href="/apply"
                                onMouseEnter={
                                    closeMenuOnPlainItemHover
                                }
                                onClick={closeMenuImmediately}
                                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-5 text-xs font-extrabold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#A80D27] hover:shadow-lg"
                            >
                                <UserPlus className="h-4 w-4" />
                                Apply
                            </Link>
                        </div>

                        {/* MOBILE BUTTON */}
                        <button
                            type="button"
                            onClick={() => {
                                closeMenuImmediately();
                                setMobileSection(null);
                                setMobileOpen((current) => !current);
                            }}
                            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-navigation"
                            className="ml-auto flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-[#C8102E] hover:bg-red-50 hover:text-[#C8102E] lg:hidden"
                        >
                            {mobileOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* DESKTOP MEGA MENU */}
                {selectedMenu?.groups && (
                    <MegaMenu
                        item={selectedMenu}
                        open={
                            activeMenu === visibleMenu
                        }
                        pointerLeft={pointerLeft}
                        onMouseEnter={() =>
                            openMenu(selectedMenu.label)
                        }
                        onMouseLeave={closeMenu}
                        onLinkClick={
                            closeMenuImmediately
                        }
                    />
                )}
            </header>

            <MobileNavigation
                open={mobileOpen}
                pathname={pathname}
                activeSection={mobileSection}
                setActiveSection={setMobileSection}
                close={() => {
                    setMobileOpen(false);
                    setMobileSection(null);
                }}
            />
        </>
    );
}

function DesktopNavLink({
    href,
    label,
    active,
    onClick,
    onMouseEnter,
}: {
    href: string;
    label: string;
    active: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className={`group relative flex h-full shrink-0 cursor-pointer items-center whitespace-nowrap rounded-lg px-2 text-[12px] font-extrabold transition-all duration-200 xl:px-3 xl:text-[13px] ${active
                ? "bg-red-50 text-[#C8102E]"
                : "text-slate-700 hover:bg-red-50/70 hover:text-[#C8102E]"
                }`}
        >
            {label}

            <span
                className={`absolute bottom-0 left-3 right-3 h-[3px] origin-center rounded-t-full bg-[#C8102E] transition-transform duration-300 ${active
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                    }`}
            />
        </Link>
    );
}

function MegaMenu({
    item,
    open,
    pointerLeft,
    onMouseEnter,
    onMouseLeave,
    onLinkClick,
}: {
    item: NavigationItem;
    open: boolean;
    pointerLeft: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onLinkClick: () => void;
}) {
    const groups = item.groups || [];

    const gridClass =
        groups.length >= 3
            ? "lg:grid-cols-3"
            : groups.length === 2
                ? "lg:grid-cols-2"
                : "mx-auto max-w-[720px] lg:grid-cols-1";

    return (
        /*
         * This outer wrapper is viewport width.
         * The inner menu panel remains centered and limited.
         * The arrow uses the hovered button's viewport position.
         */
        <div
            onMouseEnter={onMouseEnter}

            className={`absolute inset-x-0 top-full z-30 flex justify-center px-4 transition-all duration-300 ease-out ${open
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-3 opacity-0"
                }`}
        >


            {/* CENTERED LIMITED-WIDTH MENU */}
            <div
                onMouseLeave={onMouseLeave}
                className="
            relative
            mt-0
            w-[800px]
           
            overflow-hidden
           
           
            bg-white
            shadow-[0_30px_85px_rgba(15,23,42,0.20)]
        "
            >

                {/* LIMITED-WIDTH FLOATING PANEL */}
                <div className="pointer-events-auto overflow-hidden rounded-b-[28px] border border-slate-200 bg-white shadow-[0_30px_85px_rgba(15,23,42,0.20)]">
                    {/* BRAND ACCENT */}
                    <div className="h-1 bg-gradient-to-r from-[#C8102E] via-[#E32442] to-[#E4B83D]" />

                    {/* CONTENT */}
                    <div className="px-7 py-8 lg:px-10 lg:py-9 xl:px-12">
                        {/* HEADER */}
                        <div className="mb-7 flex items-center justify-between gap-6 border-b border-slate-100 pb-6">
                            <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#C8102E]">
                                    Explore AHPK
                                </p>

                                <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
                                    {item.label}
                                </h2>
                            </div>

                            <Link
                                href="/contact"
                                onClick={onLinkClick}
                                className="group/help inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-red-50 px-5 py-3 text-xs font-extrabold text-[#C8102E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C8102E] hover:text-white hover:shadow-lg"
                            >
                                Need assistance?

                                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/help:translate-x-1" />
                            </Link>
                        </div>

                        {/* GRID */}
                        <div
                            className={`grid gap-x-10 gap-y-8 xl:gap-x-14 ${gridClass}`}
                        >
                            {groups.map(
                                (group, groupIndex) => (
                                    <section
                                        key={group.title}
                                        style={{
                                            transitionDelay:
                                                open
                                                    ? `${groupIndex * 55}ms`
                                                    : "0ms",
                                        }}
                                        className={`min-w-0 transition-all duration-300 ${open
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-3 opacity-0"
                                            }`}
                                    >
                                        <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                                            {group.title}
                                        </p>

                                        <div className="grid gap-2">
                                            {group.links.map(
                                                (
                                                    link,
                                                    linkIndex,
                                                ) => {
                                                    const Icon =
                                                        link.icon;

                                                    return (
                                                        <Link
                                                            key={`${group.title}-${link.label}`}
                                                            href={
                                                                link.href
                                                            }
                                                            onClick={
                                                                onLinkClick
                                                            }
                                                            style={{
                                                                transitionDelay:
                                                                    open
                                                                        ? `${groupIndex *
                                                                        55 +
                                                                        linkIndex *
                                                                        30
                                                                        }ms`
                                                                        : "0ms",
                                                            }}
                                                            className={`group/link relative flex min-w-0 cursor-pointer items-start gap-4 overflow-hidden rounded-2xl bg-white px-5 py-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#C8102E]/20 hover:bg-gradient-to-r hover:from-red-50 hover:to-white hover:shadow-xl ${open
                                                                ? "translate-y-0 opacity-100"
                                                                : "translate-y-2 opacity-0"
                                                                }`}
                                                        >
                                                            {/* LEFT HOVER ACCENT */}
                                                            <span className="absolute bottom-4 left-0 top-4 w-1 origin-center scale-y-0 rounded-r-full bg-[#C8102E] transition-transform duration-300 group-hover/link:scale-y-100" />

                                                            {/* SUBTLE LIGHT SWEEP */}
                                                            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover/link:translate-x-full" />

                                                            {/* ICON */}
                                                            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-300 group-hover/link:rotate-3 group-hover/link:scale-110 group-hover/link:bg-[#C8102E] group-hover/link:text-white">
                                                                {Icon ? (
                                                                    <Icon className="h-5 w-5" />
                                                                ) : (
                                                                    <ChevronRight className="h-5 w-5" />
                                                                )}
                                                            </span>

                                                            {/* TEXT */}
                                                            <span className="relative z-10 min-w-0 flex-1">
                                                                <span className="flex items-center justify-between gap-3">
                                                                    <span className="text-sm font-extrabold leading-5 text-slate-800 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:text-[#C8102E]">
                                                                        {
                                                                            link.label
                                                                        }
                                                                    </span>

                                                                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover/link:translate-x-2 group-hover/link:scale-110 group-hover/link:text-[#C8102E]" />
                                                                </span>

                                                                {link.description && (
                                                                    <span className="mt-1 block max-w-none text-xs leading-5 text-slate-500 transition-colors duration-300 group-hover/link:text-slate-700">
                                                                        {
                                                                            link.description
                                                                        }
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </Link>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </section>
                                ),
                            )}
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="border-t border-slate-100 bg-slate-50">
                        <div className="flex items-center justify-between gap-6 px-7 py-4 lg:px-10 xl:px-12">
                            <p className="text-xs font-medium text-slate-500">
                                Association of Hotel
                                Professionals Kenya
                            </p>

                            <div className="flex items-center gap-6">
                                <Link
                                    href="/directory"
                                    onClick={onLinkClick}
                                    className="cursor-pointer text-xs font-bold text-slate-600 transition hover:text-[#C8102E]"
                                >
                                    Member Directory
                                </Link>

                                <Link
                                    href="/verify"
                                    onClick={onLinkClick}
                                    className="cursor-pointer text-xs font-bold text-slate-600 transition hover:text-[#C8102E]"
                                >
                                    Verify Certificate
                                </Link>

                                <Link
                                    href="/apply"
                                    onClick={onLinkClick}
                                    className="cursor-pointer text-xs font-extrabold text-[#C8102E] transition hover:text-[#A80D27]"
                                >
                                    Apply for Membership
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MobileNavigation({
    open,
    pathname,
    activeSection,
    setActiveSection,
    close,
}: {
    open: boolean;
    pathname: string;
    activeSection: string | null;
    setActiveSection: React.Dispatch<
        React.SetStateAction<string | null>
    >;
    close: () => void;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        };
    }, []);

    useEffect(() => {
        if (!open) return;

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                close();
            }
        }

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [open, close]);
    if (!mounted || !open) {
        return null;
    }

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] lg:hidden ${open
                ? "visible pointer-events-auto"
                : "invisible pointer-events-none"
                }`}
            aria-hidden={!open}
        >
            {/* BACKDROP */}
            <button
                type="button"
                onClick={close}
                aria-label="Close navigation backdrop"
                className={`absolute inset-0 cursor-pointer bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
                    }`}
            />

            {/* MOBILE DRAWER */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className={`absolute right-0 top-0 flex h-dvh w-full flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300 ease-out min-[420px]:w-[92%] min-[420px]:max-w-[430px] ${open
                    ? "translate-x-0"
                    : "translate-x-full"
                    }`}
            >
                {/* MOBILE HEADER */}
                <div className="flex h-[78px] shrink-0 items-center justify-between border-b border-slate-200 px-5">
                    <Link
                        href="/"
                        onClick={close}
                        className="flex cursor-pointer items-center gap-3"
                    >
                        <Image
                            src={Logo}
                            alt="AHPK Logo"
                            width={46}
                            height={46}
                            className="h-[46px] w-[46px] object-contain"
                            priority
                        />

                        <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#C8102E]">
                                AHPK
                            </p>

                            <p className="text-sm font-extrabold text-slate-950">
                                Main Menu
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={close}
                        aria-label="Close navigation menu"
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-[#C8102E] hover:bg-red-50 hover:text-[#C8102E]"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* MOBILE LINKS */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
                    <Link
                        href="/"
                        onClick={close}
                        className={`flex min-h-12 cursor-pointer items-center rounded-xl px-4 text-sm font-extrabold transition ${pathname === "/"
                            ? "bg-red-50 text-[#C8102E]"
                            : "text-slate-800 hover:bg-slate-50 hover:text-[#C8102E]"
                            }`}
                    >
                        Home
                    </Link>

                    <div className="mt-2 space-y-2">
                        {navigation.map((item) => {
                            const hasDropdown = Boolean(
                                item.groups?.length,
                            );

                            const expanded =
                                activeSection === item.label;

                            if (!hasDropdown && item.href) {
                                const cleanHref =
                                    item.href.split("?")[0];

                                const active =
                                    pathname === cleanHref ||
                                    (cleanHref !== "/" &&
                                        pathname.startsWith(
                                            `${cleanHref}/`,
                                        ));

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={close}
                                        className={`flex min-h-12 cursor-pointer items-center rounded-xl px-4 text-sm font-extrabold transition ${active
                                            ? "bg-red-50 text-[#C8102E]"
                                            : "text-slate-800 hover:bg-slate-50 hover:text-[#C8102E]"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }

                            return (
                                <div
                                    key={item.label}
                                    className={`overflow-hidden rounded-xl border bg-white transition-colors ${expanded
                                        ? "border-red-100"
                                        : "border-slate-200"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveSection(
                                                (current) =>
                                                    current ===
                                                        item.label
                                                        ? null
                                                        : item.label,
                                            )
                                        }
                                        aria-expanded={expanded}
                                        className={`flex min-h-12 w-full cursor-pointer items-center justify-between px-4 text-left text-sm font-extrabold transition ${expanded
                                            ? "bg-red-50 text-[#C8102E]"
                                            : "text-slate-800 hover:bg-slate-50 hover:text-[#C8102E]"
                                            }`}
                                    >
                                        {item.label}

                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-300 ${expanded
                                                ? "rotate-180 text-[#C8102E]"
                                                : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ease-out ${expanded
                                            ? "grid-rows-[1fr] border-t border-red-100"
                                            : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="bg-slate-50 px-3 py-3">
                                                {item.groups?.map(
                                                    (group) => (
                                                        <div
                                                            key={
                                                                group.title
                                                            }
                                                            className="py-3"
                                                        >
                                                            <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#C8102E]">
                                                                {
                                                                    group.title
                                                                }
                                                            </p>

                                                            <div className="mt-2 space-y-1">
                                                                {group.links.map(
                                                                    (
                                                                        link,
                                                                    ) => {
                                                                        const cleanHref =
                                                                            link.href.split(
                                                                                "?",
                                                                            )[0];

                                                                        const active =
                                                                            pathname ===
                                                                            cleanHref ||
                                                                            (cleanHref !==
                                                                                "/" &&
                                                                                pathname.startsWith(
                                                                                    `${cleanHref}/`,
                                                                                ));

                                                                        const Icon =
                                                                            link.icon;

                                                                        return (
                                                                            <Link
                                                                                key={`${group.title}-${link.label}`}
                                                                                href={
                                                                                    link.href
                                                                                }
                                                                                onClick={
                                                                                    close
                                                                                }
                                                                                className={`group/mobile-link flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${active
                                                                                    ? "bg-white text-[#C8102E] shadow-sm"
                                                                                    : "text-slate-700 hover:bg-white hover:text-[#C8102E]"
                                                                                    }`}
                                                                            >
                                                                                <span
                                                                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${active
                                                                                        ? "bg-red-50 text-[#C8102E]"
                                                                                        : "bg-white text-slate-500 group-hover/mobile-link:bg-red-50 group-hover/mobile-link:text-[#C8102E]"
                                                                                        }`}
                                                                                >
                                                                                    {Icon ? (
                                                                                        <Icon className="h-4 w-4" />
                                                                                    ) : (
                                                                                        <ChevronRight className="h-4 w-4" />
                                                                                    )}
                                                                                </span>

                                                                                <span className="min-w-0 flex-1">
                                                                                    {
                                                                                        link.label
                                                                                    }
                                                                                </span>

                                                                                <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover/mobile-link:translate-x-1 group-hover/mobile-link:text-[#C8102E]" />
                                                                            </Link>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MOBILE ACTIONS */}
                <div className="shrink-0 border-t border-slate-200 bg-slate-50 p-4">
                    <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
                        <Link
                            href="/member/login"
                            onClick={close}
                            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 text-xs font-extrabold text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                        >
                            <LogIn className="h-4 w-4" />
                            Member Login
                        </Link>

                        <Link
                            href="/apply"
                            onClick={close}
                            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-3 text-xs font-extrabold text-white transition hover:bg-[#A80D27]"
                        >
                            <UserPlus className="h-4 w-4" />
                            Apply
                        </Link>
                    </div>
                </div>
            </aside>
        </div>,
        document.body,
    );
}
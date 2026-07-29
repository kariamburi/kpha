"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Award,
    BadgeCheck,
    BookOpen,
    BriefcaseBusiness,
    Building2,
    ChevronDown,
    ChevronRight,
    FileCheck,
    FileText,
    GraduationCap,
    Handshake,
    Landmark,
    LogIn,
    Menu,
    Scale,
    ShieldCheck,
    Target,
    UserPlus,
    Users,
    X,
    type LucideIcon,
} from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

type NavigationLinkItem = {
    label: string;
    href: string;
    description?: string;
    icon?: LucideIcon;
    children?: NavigationLinkItem[];
};

type NavigationGroupItem = {
    title: string;
    description?: string;
    links: NavigationLinkItem[];
};

type NavigationItemConfig = {
    label: string;
    href?: string;
    groups?: NavigationGroupItem[];
};

const publicNavigation: NavigationItemConfig[] = [
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
                            "Board members, committee members and their responsibilities.",
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
                            "Review eligibility requirements and membership levels.",
                        icon: GraduationCap,
                    },
                    {
                        label: "Membership Categories",
                        href: "/membership/categories",
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
                        href: "/member/renew",
                        description:
                            "Renew your annual professional membership.",
                        icon: BadgeCheck,
                    },
                    {
                        label: "Member Directory",
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
                        href: "/professional-standards/code-of-conduct",
                        description:
                            "Review AHPK’s professional conduct and ethical standards.",
                        icon: Scale,
                        children: [
                            {
                                label: "Professional Attitude & Behaviour",
                                href: "/professional-standards/professional-attitude",
                                description:
                                    "Expected standards of professional attitude and behaviour.",
                                icon: ShieldCheck,
                            },
                            {
                                label: "Relationships with Clients",
                                href: "/professional-standards/client-relationships",
                                description:
                                    "Professional responsibilities when serving clients.",
                                icon: Users,
                            },
                            {
                                label: "Professional Relationships",
                                href: "/professional-standards/professional-relationships",
                                description:
                                    "Standards for working with fellow professionals.",
                                icon: Handshake,
                            },
                            {
                                label: "Handling Alleged Violations",
                                href: "/professional-standards/violations",
                                description:
                                    "Procedures for addressing reported professional violations.",
                                icon: FileCheck,
                            },
                            {
                                label: "Code of Ethics & Conduct Pledge",
                                href: "/professional-standards/ethics-pledge",
                                description:
                                    "Read the AHPK ethics and professional conduct pledge.",
                                icon: ShieldCheck,
                            },
                        ],
                    },
                ],
            },
            {
                title: "Governance & Documents",
                description:
                    "Official rules, governance provisions and Association documents.",
                links: [
                    {
                        label: "Constitution & Rules",
                        href: "/membership/constitution-and-rules",
                        description:
                            "The constitution and governance rules of AHPK.",
                        icon: BookOpen,
                        children: [
                            {
                                label: "Objectives",
                                href: "/membership/constitution-and-rules/objectives",
                                description:
                                    "Objectives established under the AHPK constitution.",
                                icon: Target,
                            },
                            {
                                label: "Membership",
                                href: "/membership/constitution-and-rules/membership",
                                description:
                                    "Constitutional provisions governing AHPK membership.",
                                icon: Users,
                            },
                            {
                                label: "Office Bearers & Duties",
                                href: "/membership/constitution-and-rules/office-bearers-and-duties",
                                description:
                                    "Responsibilities and duties of AHPK office bearers.",
                                icon: BriefcaseBusiness,
                            },
                            {
                                label: "The Board of Management",
                                href: "/about/executive-committee",
                                description:
                                    "The leadership and management structure of AHPK.",
                                icon: Building2,
                            },
                        ],
                    },
                    {
                        label: "Association Documents",
                        href: "/resources?category=association-documents",
                        description:
                            "Official speeches, citations and Association publications.",
                        icon: FileText,
                        children: [
                            {
                                label: "Chairman Speech at the AGM 2024",
                                href: "/resources/chairman-speech-agm-2024",
                                description:
                                    "Read the Chairman’s speech delivered at the 2024 AGM.",
                                icon: FileText,
                            },
                            {
                                label: "Citation for Dr. Njau",
                                href: "/resources/citation-for-dr-njau",
                                description:
                                    "Read the official citation recognising Dr. Njau.",
                                icon: Award,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        label: "Association Purpose",
        href: "/about/our-purpose",
    },
    {
        label: "Events Calendar",
        href: "/events/calendar",
    },
    {
        label: "Contact Us",
        href: "/contact",
    },
    {
        label: "Disclaimer",
        href: "/disclaimer",
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

function isLinkTreeActive(
    pathname: string,
    link: NavigationLinkItem,
): boolean {
    if (isPathActive(pathname, link.href)) {
        return true;
    }

    return (
        link.children?.some((child) =>
            isLinkTreeActive(pathname, child),
        ) ?? false
    );
}

function DesktopLinkCard({
    link,
    pathname,
}: {
    link: NavigationLinkItem;
    pathname: string;
}) {
    const Icon = link.icon;
    const children = link.children ?? [];
    const isActive = isLinkTreeActive(pathname, link);

    return (
        <li>
            <NavigationMenuLink>
                <Link
                    href={link.href}
                    aria-current={
                        isPathActive(pathname, link.href)
                            ? "page"
                            : undefined
                    }
                    className={cn(
                        "group flex gap-3 rounded-lg p-3 transition-colors",
                        "hover:bg-accent focus:bg-accent focus:outline-none",
                        isActive && "bg-accent",
                    )}
                >
                    {Icon && (
                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon
                                className="size-4"
                                aria-hidden="true"
                            />
                        </span>
                    )}

                    <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                            <span className="block text-sm font-medium text-foreground">
                                {link.label}
                            </span>

                            {children.length > 0 && (
                                <ChevronDown
                                    className="size-3.5 shrink-0 text-muted-foreground"
                                    aria-hidden="true"
                                />
                            )}
                        </span>

                        {link.description && (
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                {link.description}
                            </span>
                        )}
                    </span>
                </Link>
            </NavigationMenuLink>

            {children.length > 0 && (
                <ul className="ml-5 mt-1 space-y-1 border-l border-border pl-3">
                    {children.map((child) => {
                        const ChildIcon = child.icon;
                        const childIsActive = isPathActive(
                            pathname,
                            child.href,
                        );

                        return (
                            <li key={child.href}>
                                <NavigationMenuLink>
                                    <Link
                                        href={child.href}
                                        aria-current={
                                            childIsActive
                                                ? "page"
                                                : undefined
                                        }
                                        className={cn(
                                            "group flex items-start gap-2 rounded-md px-2 py-2",
                                            "transition-colors hover:bg-accent focus:bg-accent focus:outline-none",
                                            childIsActive &&
                                            "bg-accent",
                                        )}
                                    >
                                        {ChildIcon && (
                                            <ChildIcon
                                                className="mt-0.5 size-3.5 shrink-0 text-primary"
                                                aria-hidden="true"
                                            />
                                        )}

                                        <span className="min-w-0">
                                            <span className="block text-xs font-medium text-foreground">
                                                {child.label}
                                            </span>

                                            {child.description && (
                                                <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                                                    {child.description}
                                                </span>
                                            )}
                                        </span>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}

function DesktopMenu() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:block">
            <NavigationMenu>
                <NavigationMenuList className="gap-1">
                    {publicNavigation.map((item) => {
                        const groups = item.groups ?? [];
                        const hasGroups = groups.length > 0;

                        if (!hasGroups && item.href) {
                            const isActive = isPathActive(
                                pathname,
                                item.href,
                            );

                            return (
                                <NavigationMenuItem key={item.label}>
                                    <NavigationMenuLink>
                                        <Link
                                            href={item.href}
                                            aria-current={
                                                isActive
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={cn(
                                                "inline-flex h-10 items-center rounded-md px-3",
                                                "text-sm font-medium transition-colors",
                                                "hover:bg-accent hover:text-accent-foreground",
                                                "focus:bg-accent focus:text-accent-foreground",
                                                "focus:outline-none",
                                                isActive &&
                                                "bg-accent text-accent-foreground",
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            );
                        }

                        if (!hasGroups) {
                            return null;
                        }

                        const dropdownIsActive = groups.some(
                            (group) =>
                                group.links.some((link) =>
                                    isLinkTreeActive(
                                        pathname,
                                        link,
                                    ),
                                ),
                        );

                        return (
                            <NavigationMenuItem key={item.label}>
                                <NavigationMenuTrigger
                                    className={cn(
                                        "bg-transparent",
                                        dropdownIsActive &&
                                        "bg-accent text-accent-foreground",
                                    )}
                                >
                                    {item.label}
                                </NavigationMenuTrigger>

                                <NavigationMenuContent>
                                    <div
                                        className={cn(
                                            "grid max-h-[78vh] gap-6 overflow-y-auto p-6",
                                            groups.length >= 4
                                                ? "w-[min(1120px,calc(100vw-3rem))] grid-cols-4"
                                                : groups.length === 3
                                                    ? "w-[min(900px,calc(100vw-3rem))] grid-cols-3"
                                                    : groups.length === 2
                                                        ? "w-[min(720px,calc(100vw-3rem))] grid-cols-2"
                                                        : "w-[min(430px,calc(100vw-2rem))] grid-cols-1",
                                        )}
                                    >
                                        {groups.map((group) => (
                                            <section
                                                key={group.title}
                                                className="min-w-0"
                                            >
                                                <div className="mb-4 min-h-[72px] border-b border-border pb-3">
                                                    <h3 className="text-sm font-semibold text-foreground">
                                                        {group.title}
                                                    </h3>

                                                    {group.description && (
                                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                            {
                                                                group.description
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <ul className="space-y-1">
                                                    {group.links.map(
                                                        (link) => (
                                                            <DesktopLinkCard
                                                                key={
                                                                    link.href
                                                                }
                                                                link={
                                                                    link
                                                                }
                                                                pathname={
                                                                    pathname
                                                                }
                                                            />
                                                        ),
                                                    )}
                                                </ul>
                                            </section>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        );
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

function MobileNestedLink({
    link,
    pathname,
    openChildMenu,
    toggleChildMenu,
    closeMenu,
}: {
    link: NavigationLinkItem;
    pathname: string;
    openChildMenu: string | null;
    toggleChildMenu: (key: string) => void;
    closeMenu: () => void;
}) {
    const Icon = link.icon;
    const children = link.children ?? [];
    const hasChildren = children.length > 0;
    const isActive = isLinkTreeActive(pathname, link);
    const childKey = `${link.label}-${link.href}`;
    const isExpanded = openChildMenu === childKey;

    if (!hasChildren) {
        return (
            <li>
                <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={
                        isActive ? "page" : undefined
                    }
                    className={cn(
                        "flex items-start gap-3 rounded-lg p-3",
                        "transition-colors hover:bg-accent",
                        isActive && "bg-accent",
                    )}
                >
                    {Icon && (
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon
                                className="size-4"
                                aria-hidden="true"
                            />
                        </span>
                    )}

                    <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">
                            {link.label}
                        </span>

                        {link.description && (
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                {link.description}
                            </span>
                        )}
                    </span>
                </Link>
            </li>
        );
    }

    return (
        <li className="overflow-hidden rounded-xl border bg-background">
            <div className="flex items-stretch">
                <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                        "flex min-w-0 flex-1 items-start gap-3 p-3",
                        "transition-colors hover:bg-accent",
                        isActive && "text-primary",
                    )}
                >
                    {Icon && (
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon
                                className="size-4"
                                aria-hidden="true"
                            />
                        </span>
                    )}

                    <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">
                            {link.label}
                        </span>

                        {link.description && (
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                {link.description}
                            </span>
                        )}
                    </span>
                </Link>

                <button
                    type="button"
                    onClick={() =>
                        toggleChildMenu(childKey)
                    }
                    aria-expanded={isExpanded}
                    aria-label={`Toggle ${link.label} submenu`}
                    className="flex w-12 shrink-0 items-center justify-center border-l transition-colors hover:bg-accent"
                >
                    <ChevronDown
                        className={cn(
                            "size-4 transition-transform duration-200",
                            isExpanded && "rotate-180",
                        )}
                        aria-hidden="true"
                    />
                </button>
            </div>

            {isExpanded && (
                <ul className="space-y-1 border-t bg-muted/40 p-2">
                    {children.map((child) => {
                        const ChildIcon = child.icon;
                        const childIsActive =
                            isPathActive(
                                pathname,
                                child.href,
                            );

                        return (
                            <li key={child.href}>
                                <Link
                                    href={child.href}
                                    onClick={closeMenu}
                                    aria-current={
                                        childIsActive
                                            ? "page"
                                            : undefined
                                    }
                                    className={cn(
                                        "flex items-start gap-3 rounded-lg p-3",
                                        "transition-colors hover:bg-accent",
                                        childIsActive &&
                                        "bg-accent",
                                    )}
                                >
                                    {ChildIcon && (
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                            <ChildIcon
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    )}

                                    <span className="min-w-0">
                                        <span className="block text-sm font-medium text-foreground">
                                            {child.label}
                                        </span>

                                        {child.description && (
                                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                                {
                                                    child.description
                                                }
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}

function MobileMenu() {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [openSection, setOpenSection] = useState<
        string | null
    >(null);
    const [openChildMenu, setOpenChildMenu] = useState<
        string | null
    >(null);

    useEffect(() => {
        setIsOpen(false);
        setOpenSection(null);
        setOpenChildMenu(null);
    }, [pathname]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [isOpen]);

    function toggleSection(label: string) {
        setOpenSection((current) =>
            current === label ? null : label,
        );
        setOpenChildMenu(null);
    }

    function toggleChildMenu(key: string) {
        setOpenChildMenu((current) =>
            current === key ? null : key,
        );
    }

    function closeMenu() {
        setIsOpen(false);
        setOpenSection(null);
        setOpenChildMenu(null);
    }

    return (
        <div className="lg:hidden">
            <button
                type="button"
                onClick={() =>
                    setIsOpen((current) => !current)
                }
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                aria-label={
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                }
                className={cn(
                    "inline-flex size-10 items-center justify-center rounded-md",
                    "border bg-background text-foreground",
                    "transition-colors hover:bg-accent",
                    "focus:outline-none focus:ring-2 focus:ring-ring",
                )}
            >
                {isOpen ? (
                    <X
                        className="size-5"
                        aria-hidden="true"
                    />
                ) : (
                    <Menu
                        className="size-5"
                        aria-hidden="true"
                    />
                )}
            </button>

            {isOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={closeMenu}
                        className="fixed inset-0 top-[var(--header-height,64px)] z-40 bg-black/40 backdrop-blur-[2px]"
                    />

                    <div
                        id="mobile-navigation"
                        className={cn(
                            "fixed inset-x-0 top-[var(--header-height,64px)] z-50",
                            "max-h-[calc(100dvh-var(--header-height,64px))]",
                            "overflow-y-auto border-t bg-background shadow-xl",
                        )}
                    >
                        <nav
                            aria-label="Mobile navigation"
                            className="mx-auto w-full max-w-7xl px-4 py-4"
                        >
                            <ul className="space-y-1">
                                {publicNavigation.map(
                                    (item) => {
                                        const groups =
                                            item.groups ??
                                            [];
                                        const hasGroups =
                                            groups.length >
                                            0;

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
                                                <li
                                                    key={
                                                        item.label
                                                    }
                                                >
                                                    <Link
                                                        href={
                                                            item.href
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
                                                            "flex min-h-12 items-center rounded-lg px-4",
                                                            "text-sm font-medium transition-colors",
                                                            "hover:bg-accent",
                                                            isActive &&
                                                            "bg-accent text-accent-foreground",
                                                        )}
                                                    >
                                                        {
                                                            item.label
                                                        }
                                                    </Link>
                                                </li>
                                            );
                                        }

                                        if (
                                            !hasGroups
                                        ) {
                                            return null;
                                        }

                                        const isExpanded =
                                            openSection ===
                                            item.label;

                                        const sectionIsActive =
                                            groups.some(
                                                (
                                                    group,
                                                ) =>
                                                    group.links.some(
                                                        (
                                                            link,
                                                        ) =>
                                                            isLinkTreeActive(
                                                                pathname,
                                                                link,
                                                            ),
                                                    ),
                                            );

                                        return (
                                            <li
                                                key={
                                                    item.label
                                                }
                                                className="overflow-hidden rounded-lg border"
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
                                                        "flex min-h-12 w-full items-center justify-between gap-3 px-4",
                                                        "text-left text-sm font-semibold transition-colors",
                                                        "hover:bg-accent",
                                                        sectionIsActive &&
                                                        "text-primary",
                                                    )}
                                                >
                                                    <span>
                                                        {
                                                            item.label
                                                        }
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
                                                    <div className="border-t bg-muted/30 p-3">
                                                        <div className="space-y-6">
                                                            {groups.map(
                                                                (
                                                                    group,
                                                                ) => (
                                                                    <section
                                                                        key={
                                                                            group.title
                                                                        }
                                                                    >
                                                                        <div className="mb-3 px-2">
                                                                            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground">
                                                                                {
                                                                                    group.title
                                                                                }
                                                                            </h3>

                                                                            {group.description && (
                                                                                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                                                                    {
                                                                                        group.description
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </div>

                                                                        <ul className="space-y-2">
                                                                            {group.links.map(
                                                                                (
                                                                                    link,
                                                                                ) => (
                                                                                    <MobileNestedLink
                                                                                        key={
                                                                                            link.href
                                                                                        }
                                                                                        link={
                                                                                            link
                                                                                        }
                                                                                        pathname={
                                                                                            pathname
                                                                                        }
                                                                                        openChildMenu={
                                                                                            openChildMenu
                                                                                        }
                                                                                        toggleChildMenu={
                                                                                            toggleChildMenu
                                                                                        }
                                                                                        closeMenu={
                                                                                            closeMenu
                                                                                        }
                                                                                    />
                                                                                ),
                                                                            )}
                                                                        </ul>
                                                                    </section>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    },
                                )}
                            </ul>

                            <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-5">
                                <Link
                                    href="/member/login"
                                    onClick={closeMenu}
                                    className={cn(
                                        "inline-flex min-h-11 items-center justify-center rounded-lg border px-4",
                                        "text-sm font-semibold transition-colors hover:bg-accent",
                                    )}
                                >
                                    Member Login
                                </Link>

                                <Link
                                    href="/apply"
                                    onClick={closeMenu}
                                    className={cn(
                                        "inline-flex min-h-11 items-center justify-center rounded-lg px-4",
                                        "bg-primary text-sm font-semibold text-primary-foreground",
                                        "transition-opacity hover:opacity-90",
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
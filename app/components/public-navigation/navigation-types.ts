import type { LucideIcon } from "lucide-react";

export type NavigationLink = {
    label: string;
    href: string;
    description?: string;
    icon?: LucideIcon;
};

export type NavigationGroup = {
    title: string;
    description?: string;
    links: NavigationLink[];
};

export type NavigationItem = {
    label: string;
    href?: string;
    groups?: NavigationGroup[];
};
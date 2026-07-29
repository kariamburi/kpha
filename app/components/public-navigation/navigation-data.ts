import {
    BadgeCheck,
    BookOpen,
    Building2,
    CalendarDays,
    FileCheck,
    FileText,
    GraduationCap,
    Landmark,
    LogIn,
    Scale,
    ShieldCheck,
    UserPlus,
    Users,
} from "lucide-react";

import type { NavigationItem } from "./navigation-types";

export const publicNavigation: NavigationItem[] = [
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
                        label: "Our Purpose",
                        href: "/about/our-purpose",
                        description:
                            "The mandate and professional purpose of AHPK.",
                        icon: Landmark,
                    },
                    {
                        label: "Our Objectives",
                        href: "/about/our-objectives",
                        description:
                            "The goals and responsibilities of the association.",
                        icon: FileCheck,
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
                        href: "/about/corporate-statement",
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
                        href: "/about/leadership/board",
                        description:
                            "The governing board of the association.",
                        icon: Users,
                    },
                    {
                        label: "Secretariat",
                        href: "/about/leadership/secretariat",
                        description:
                            "The team responsible for daily operations.",
                        icon: Building2,
                    },
                    {
                        label: "Advisory Board",
                        href: "/about/leadership/advisory-board",
                        description:
                            "Professionals providing strategic advice.",
                        icon: BadgeCheck,
                    },
                    {
                        label: "Committees",
                        href: "/about/leadership/committees",
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
                            "Review AHPK’s professional standards.",
                        icon: Scale,
                    },
                    {
                        label: "Professional Attitude & Behaviour",
                        href: "/professional-standards/professional-attitude",
                        description:
                            "Expected standards of professional behaviour.",
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
                        icon: Users,
                    },
                    {
                        label: "Handling Alleged Violations",
                        href: "/professional-standards/violations",
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
                        label: "Constitution & Rules",
                        href: "/professional-standards/constitution",
                        description:
                            "The constitution and governance rules of AHPK.",
                        icon: BookOpen,
                    },
                    {
                        label: "Ethics & Conduct Pledge",
                        href: "/professional-standards/ethics-pledge",
                        description:
                            "The professional code of ethics pledge.",
                        icon: ShieldCheck,
                    },
                    {
                        label: "Association Documents",
                        href: "/resources?category=association-documents",
                        description:
                            "Official speeches, citations and publications.",
                        icon: FileText,
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

export const mobileQuickActions = [
    {
        label: "Member Login",
        href: "/member/login",
        icon: LogIn,
    },
    {
        label: "Apply",
        href: "/apply",
        icon: UserPlus,
    },
    {
        label: "Events",
        href: "/events/calendar",
        icon: CalendarDays,
    },
];
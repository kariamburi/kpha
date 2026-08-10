import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import MemberPortalShell from "../MemberPortalShell";
import { requireMemberSession } from "../session";

import {
    BadgeCheck,
    Bell,
    CalendarDays,
    CreditCard,
    FileCheck,
    GraduationCap,
    IdCard,
    Megaphone,
    RefreshCw,
    User,
} from "lucide-react";

import DownloadCertificateButton from "@/app/dashboard/certificates/[id]/DownloadCertificateButton";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function formatYear(date: Date) {
    return date.toLocaleDateString("en-KE", {
        year: "numeric",
    });
}

function daysUntil(date: Date) {
    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0,
    );

    const target = new Date(date);

    target.setHours(
        0,
        0,
        0,
        0,
    );

    return Math.ceil(
        (
            target.getTime() -
            today.getTime()
        ) /
        (
            1000 *
            60 *
            60 *
            24
        ),
    );
}

export default async function MemberDashboardPage() {
    const memberId =
        await requireMemberSession();

    const [
        member,
        announcements,
        notifications,
    ] = await Promise.all([
        prisma.member.findUnique({
            where: {
                id: memberId,
            },

            include: {
                category: true,

                certificates: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },

                payments: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        }),

        prisma.announcement.findMany({
            where: {
                published: true,
            },

            orderBy: {
                createdAt: "desc",
            },

            take: 5,
        }),

        prisma.notification.findMany({
            where: {
                memberId,
            },

            orderBy: {
                createdAt: "desc",
            },

            take: 5,
        }),
    ]);

    if (!member) {
        notFound();
    }

    const now = Date.now();

    const daysLeft =
        daysUntil(member.expiryDate);

    const expired =
        daysLeft < 0;

    /*
     * Current certificate:
     * valid only when today falls between
     * issueDate and expiryDate.
     */
    const currentCertificate =
        member.certificates.find(
            (certificate) =>
                certificate.issueDate.getTime() <=
                now &&
                certificate.expiryDate.getTime() >=
                now,
        );

    /*
     * Upcoming certificate:
     * for example, a 2027 certificate
     * generated during December 2026.
     */
    const upcomingCertificate =
        member.certificates.find(
            (certificate) =>
                certificate.issueDate.getTime() >
                now,
        );

    const certificateStatus =
        currentCertificate
            ? "VALID"
            : upcomingCertificate
                ? "UPCOMING"
                : "NONE";

    const certificateTone:
        | "blue"
        | "green"
        | "amber"
        | "red"
        | "purple" =
        currentCertificate
            ? "green"
            : upcomingCertificate
                ? "blue"
                : "purple";

    return (
        <MemberPortalShell
            member={member}
            notifications={notifications}
        >
            <div className="space-y-5">
                {/* =====================================================
                    DASHBOARD HEADER
                ===================================================== */}
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-slate-950 shadow-sm">
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#C1121F]">
                                Member Dashboard
                            </p>

                            <h1 className="mt-2 truncate text-2xl font-black md:text-3xl">
                                Welcome back,{" "}
                                {member.fullName ||
                                    "AHPK Member"}
                            </h1>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                {member.memberNumber}
                            </p>

                            <p className="mt-3 text-sm font-semibold text-slate-500">
                                {expired
                                    ? "Your membership has expired. Renew to restore active status."
                                    : `Your current membership is valid until ${formatDate(
                                        member.expiryDate,
                                    )}.`}
                            </p>
                        </div>

                        <Link
                            href="/member/renewal"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white transition hover:bg-red-800"
                        >
                            <RefreshCw className="h-4 w-4" />

                            Renew Membership
                        </Link>
                    </div>

                    {/* =================================================
                        MEMBERSHIP SUMMARY
                    ================================================= */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        <Card
                            icon={IdCard}
                            title="Category"
                            value={
                                member.category.name
                            }
                            tone="blue"
                        />

                        <Card
                            icon={BadgeCheck}
                            title="Status"
                            value={
                                expired
                                    ? "EXPIRED"
                                    : member.status
                            }
                            tone={
                                expired
                                    ? "red"
                                    : "green"
                            }
                        />

                        <Card
                            icon={CalendarDays}
                            title="Membership Since"
                            value={formatYear(
                                member.joinDate,
                            )}
                            tone="purple"
                        />

                        <Card
                            icon={CalendarDays}
                            title="Days Left"
                            value={
                                expired
                                    ? "Expired"
                                    : `${daysLeft}`
                            }
                            tone={
                                expired
                                    ? "red"
                                    : "amber"
                            }
                        />

                        <Card
                            icon={FileCheck}
                            title="Certificate"
                            value={
                                certificateStatus
                            }
                            tone={
                                certificateTone
                            }
                        />
                    </div>

                    {/* =================================================
                        UPCOMING CERTIFICATE NOTICE
                    ================================================= */}
                    {upcomingCertificate &&
                        !currentCertificate ? (
                        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4">
                            <div className="flex items-start gap-3">
                                <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

                                <div>
                                    <p className="text-sm font-black text-blue-900">
                                        Upcoming Certificate
                                    </p>

                                    <p className="mt-1 text-sm font-semibold leading-6 text-blue-700">
                                        Your next certificate
                                        becomes valid on{" "}
                                        {formatDate(
                                            upcomingCertificate.issueDate,
                                        )}{" "}
                                        and remains valid until{" "}
                                        {formatDate(
                                            upcomingCertificate.expiryDate,
                                        )}
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* =====================================================
                    QUICK LINKS
                ===================================================== */}
                <div className="grid gap-5 md:grid-cols-3">
                    <QuickLink
                        icon={User}
                        title="My Profile"
                        text="View and update your membership details."
                        href="/member/profile"
                    />

                    <QuickLink
                        icon={FileCheck}
                        title="Certificates"
                        text="Download and verify certificates."
                        href="/member/certificates"
                    />

                    <QuickLink
                        icon={CreditCard}
                        title="Payments"
                        text="View renewal payment history."
                        href="/member/payments"
                    />
                </div>

                {/* =====================================================
                    ANNOUNCEMENTS
                ===================================================== */}
                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                            <Megaphone className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#C1121F]">
                                Member Updates
                            </p>

                            <h2 className="mt-1 text-xl font-black text-slate-950">
                                Latest Announcements
                            </h2>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Important updates and
                                notices from AHPK.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {announcements.map(
                            (item) => (
                                <AnnouncementCard
                                    key={
                                        item.id
                                    }
                                    item={
                                        item
                                    }
                                />
                            ),
                        )}

                        {announcements.length ===
                            0 && (
                                <p className="rounded-2xl bg-slate-50 p-5 text-center text-sm font-semibold text-slate-500">
                                    No announcements yet.
                                </p>
                            )}
                    </div>
                </section>

                {/* =====================================================
                    QUICK ACTIONS
                ===================================================== */}
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-[#C1121F]">
                            <Bell className="h-5 w-5" />
                        </div>

                        <div>
                            <h2 className="text-xl font-black text-slate-950">
                                Quick Actions
                            </h2>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Manage your membership
                                and certificates.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        {currentCertificate ? (
                            <DownloadCertificateButton
                                href={`/dashboard/certificates/${currentCertificate.id}/download`}
                            />
                        ) : null}

                        <Link
                            href="/member/certificates"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
                        >
                            <FileCheck className="h-4 w-4" />

                            View Certificates
                        </Link>

                        <Link
                            href="/member/renewal"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-black"
                        >
                            <RefreshCw className="h-4 w-4" />

                            Renew Membership
                        </Link>

                        <Link
                            href="/events"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-50"
                        >
                            <GraduationCap className="h-4 w-4" />

                            View Events & CPD
                        </Link>
                    </div>
                </div>
            </div>
        </MemberPortalShell>
    );
}

/* =========================================================
   ANNOUNCEMENT CARD
========================================================= */

function AnnouncementCard({
    item,
}: {
    item: {
        id: string;
        title: string;
        message: string;
        type: string;
        createdAt: Date;
    };
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex">
                <div className="w-1.5 shrink-0 bg-green-500" />

                <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-[10px] font-black uppercase text-green-700">
                            <Megaphone className="h-3 w-3" />

                            {item.type}
                        </span>

                        <span className="text-xs font-bold text-slate-400">
                            {formatDate(
                                item.createdAt,
                            )}
                        </span>
                    </div>

                    <h3 className="mt-3 text-sm font-black text-slate-950">
                        {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-slate-500">
                        {item.message}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function Card({
    icon: Icon,
    title,
    value,
    tone,
}: {
    icon: React.ElementType;
    title: string;
    value: string;
    tone:
    | "blue"
    | "green"
    | "amber"
    | "red"
    | "purple";
}) {
    const styles = {
        blue: {
            backgroundColor: "#EEF6FF",
            borderColor: "#C7E0FF",
            color: "#2563EB",
        },

        green: {
            backgroundColor: "#F0FDF4",
            borderColor: "#BBF7D0",
            color: "#15803D",
        },

        amber: {
            backgroundColor: "#FFF8E6",
            borderColor: "#FCD34D",
            color: "#B45309",
        },

        red: {
            backgroundColor: "#FEF2F2",
            borderColor: "#FECACA",
            color: "#B91C1C",
        },

        purple: {
            backgroundColor: "#F5F3FF",
            borderColor: "#DDD6FE",
            color: "#6D28D9",
        },
    };

    return (
        <div
            style={styles[tone]}
            className="rounded-2xl border p-5 shadow-sm"
        >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 shadow-sm">
                <Icon className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-black uppercase tracking-wide opacity-80">
                {title}
            </p>

            <p className="mt-2 break-words text-xl font-black">
                {value}
            </p>
        </div>
    );
}

/* =========================================================
   QUICK LINK
========================================================= */

function QuickLink({
    icon: Icon,
    title,
    text,
    href,
}: {
    icon: React.ElementType;
    title: string;
    text: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#C1121F] hover:shadow-md"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F] transition group-hover:bg-[#C1121F] group-hover:text-white">
                <Icon className="h-5 w-5" />
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-950">
                {title}
            </h3>

            <p className="mt-2 text-sm font-semibold text-slate-500">
                {text}
            </p>

            <p className="mt-4 text-sm font-black text-[#C1121F]">
                Open →
            </p>
        </Link>
    );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import { requireMemberSession } from "../session";
import {
    BadgeCheck,
    CalendarDays,
    Clock3,
    FileCheck,
    Hash,
    ShieldCheck,
} from "lucide-react";
import DownloadCertificateButton from "@/app/dashboard/certificates/[id]/DownloadCertificateButton";

type CertificateStatus =
    | "UPCOMING"
    | "VALID"
    | "EXPIRED";

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

function getCertificateStatus(
    issueDate: Date,
    expiryDate: Date,
    now: number,
): CertificateStatus {
    if (issueDate.getTime() > now) {
        return "UPCOMING";
    }

    if (expiryDate.getTime() < now) {
        return "EXPIRED";
    }

    return "VALID";
}

export default async function MemberCertificatesPage() {
    const memberId =
        await requireMemberSession();

    const member =
        await prisma.member.findUnique({
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
            },
        });

    if (!member) {
        notFound();
    }

    const now = Date.now();

    return (
        <MemberPortalShell member={member}>
            <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                            <FileCheck className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#C1121F]">
                                Member Certificates
                            </p>

                            <h1 className="mt-1 text-3xl font-black text-slate-950">
                                My Certificates
                            </h1>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                Download and verify your
                                AHPK membership certificates.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5">
                    {member.certificates.length === 0 ? (
                        <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                                <FileCheck className="h-8 w-8" />
                            </div>

                            <h2 className="mt-5 text-2xl font-black text-slate-950">
                                No certificates found
                            </h2>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                Your certificates will
                                appear here once issued.
                            </p>
                        </div>
                    ) : (
                        member.certificates.map(
                            (cert) => {
                                const status =
                                    getCertificateStatus(
                                        cert.issueDate,
                                        cert.expiryDate,
                                        now,
                                    );

                                const valid =
                                    status === "VALID";

                                const expired =
                                    status === "EXPIRED";

                                const upcoming =
                                    status === "UPCOMING";

                                return (
                                    <div
                                        key={cert.id}
                                        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
                                    >
                                        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                                                    <ShieldCheck className="h-5 w-5" />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-black uppercase tracking-wide text-slate-400">
                                                        Certificate
                                                        Number
                                                    </p>

                                                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                                                        {
                                                            cert.certificateNumber
                                                        }
                                                    </h2>

                                                    <p className="mt-2 break-all text-sm font-semibold text-slate-500">
                                                        Verification:{" "}
                                                        {
                                                            cert.verificationCode
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <span
                                                className={[
                                                    "inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-black",

                                                    valid
                                                        ? "bg-green-50 text-green-700"
                                                        : upcoming
                                                            ? "bg-blue-50 text-blue-700"
                                                            : "bg-red-50 text-red-700",
                                                ].join(
                                                    " ",
                                                )}
                                            >
                                                {valid ? (
                                                    <BadgeCheck className="h-4 w-4" />
                                                ) : (
                                                    <Clock3 className="h-4 w-4" />
                                                )}

                                                {
                                                    status
                                                }
                                            </span>
                                        </div>

                                        {upcoming ? (
                                            <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
                                                <p className="text-sm font-bold leading-6 text-blue-800">
                                                    This
                                                    certificate
                                                    has been
                                                    issued for
                                                    an upcoming
                                                    membership
                                                    period and
                                                    becomes
                                                    valid on{" "}
                                                    {formatDate(
                                                        cert.issueDate,
                                                    )}
                                                    .
                                                </p>
                                            </div>
                                        ) : null}

                                        <div className="mt-6 grid gap-4 md:grid-cols-4">
                                            <Info
                                                icon={
                                                    CalendarDays
                                                }
                                                label="Membership Since"
                                                value={formatYear(
                                                    member.joinDate,
                                                )}
                                            />

                                            <Info
                                                icon={
                                                    CalendarDays
                                                }
                                                label="Valid From"
                                                value={formatDate(
                                                    cert.issueDate,
                                                )}
                                            />

                                            <Info
                                                icon={
                                                    CalendarDays
                                                }
                                                label="Valid Until"
                                                value={formatDate(
                                                    cert.expiryDate,
                                                )}
                                            />

                                            <Info
                                                icon={
                                                    Hash
                                                }
                                                label="Member No."
                                                value={
                                                    member.memberNumber
                                                }
                                            />
                                        </div>

                                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                            <DownloadCertificateButton
                                                href={`/dashboard/certificates/${cert.id}/download`}
                                            />

                                            <Link
                                                href={`/verify/${encodeURIComponent(
                                                    cert.verificationCode,
                                                )}`}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-center text-sm font-black text-white hover:bg-black"
                                            >
                                                <ShieldCheck className="h-4 w-4" />
                                                Verify
                                                Certificate
                                            </Link>
                                        </div>
                                    </div>
                                );
                            },
                        )
                    )}
                </div>
            </div>
        </MemberPortalShell>
    );
}

function Info({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#C1121F] shadow-sm">
                <Icon className="h-4 w-4" />
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                    {label}
                </p>

                <p className="mt-1 text-sm font-black text-slate-900">
                    {value}
                </p>
            </div>
        </div>
    );
}
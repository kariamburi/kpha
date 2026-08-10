import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import DownloadCertificateButton from "./DownloadCertificateButton";

type CertificateStatus =
    | "UPCOMING"
    | "VALID"
    | "EXPIRED";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
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

export default async function CertificateDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const certificate =
        await prisma.certificate.findUnique({
            where: {
                id,
            },

            include: {
                member: {
                    include: {
                        user: true,
                        category: true,
                    },
                },
            },
        });

    if (!certificate) {
        notFound();
    }

    const now = Date.now();

    const certificateStatus =
        getCertificateStatus(
            certificate.issueDate,
            certificate.expiryDate,
            now,
        );

    const memberName =
        certificate.member.fullName ||
        certificate.member.user?.name ||
        "Member";

    const membershipSince =
        formatYear(
            certificate.member.joinDate,
        );

    return (
        <div className="space-y-5">
            {/* =====================================================
                HEADER
            ===================================================== */}
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <Link
                    href="/dashboard/certificates"
                    className="text-sm font-black text-[#C1121F] hover:underline"
                >
                    ← Back to Certificates
                </Link>

                <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                        <p className="text-sm font-black text-slate-500">
                            Certificate Registry
                        </p>

                        <h1 className="mt-1 text-3xl font-black text-slate-950">
                            {
                                certificate.certificateNumber
                            }
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Issued to {memberName}
                        </p>
                    </div>

                    <CertificateStatusBadge
                        status={
                            certificateStatus
                        }
                    />
                </div>
            </div>

            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}
            <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                {/* =================================================
                    CERTIFICATE PREVIEW
                ================================================= */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="rounded-[26px] border-4 border-[#111111] bg-white p-6">
                        <div className="border-b-4 border-[#C1121F] pb-5 text-center">
                            <p className="text-xs font-black tracking-[0.45em] text-[#C1121F]">
                                ASSOCIATION OF HOTEL
                                PROFESSIONALS KENYA
                            </p>

                            <h2 className="mt-3 text-3xl font-black text-[#111111]">
                                Membership Certificate
                            </h2>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                Official digital
                                certificate preview
                            </p>
                        </div>

                        <div className="py-10 text-center">
                            <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
                                This certifies that
                            </p>

                            <h3 className="mt-4 text-4xl font-black text-[#C1121F]">
                                {memberName}
                            </h3>

                            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600">
                                is a registered member of
                                the Association of Hotel
                                Professionals Kenya under
                                the category of{" "}
                                <span className="font-black text-[#111111]">
                                    {certificate.member
                                        .category?.name ||
                                        "-"}
                                </span>
                                .
                            </p>

                            <p className="mt-4 text-sm font-black text-slate-700">
                                Membership Since{" "}
                                {membershipSince}
                            </p>

                            <div className="mt-8 grid gap-4 md:grid-cols-3">
                                <PreviewInfo
                                    label="Member No."
                                    value={
                                        certificate.member
                                            .memberNumber
                                    }
                                />

                                <PreviewInfo
                                    label="Certificate No."
                                    value={
                                        certificate.certificateNumber
                                    }
                                />

                                <PreviewInfo
                                    label="Verification Code"
                                    value={
                                        certificate.verificationCode
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 border-t border-slate-200 pt-5 md:grid-cols-3">
                            <PreviewInfo
                                label="Membership Since"
                                value={
                                    membershipSince
                                }
                            />

                            <PreviewInfo
                                label="Valid From"
                                value={formatDate(
                                    certificate.issueDate,
                                )}
                            />

                            <PreviewInfo
                                label="Valid Until"
                                value={formatDate(
                                    certificate.expiryDate,
                                )}
                            />
                        </div>

                        <div className="mt-5 border-t border-slate-200 pt-5 text-center">
                            <p className="text-xs font-semibold leading-6 text-slate-500">
                                To verify this
                                certificate, scan the QR
                                code or enter the
                                verification code on the
                                AHPK website home page.
                            </p>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    SIDEBAR
                ================================================= */}
                <div className="space-y-5">
                    <InfoCard title="Certificate Information">
                        <Info
                            label="Certificate Number"
                            value={
                                certificate.certificateNumber
                            }
                        />

                        <Info
                            label="Verification Code"
                            value={
                                certificate.verificationCode
                            }
                        />

                        <Info
                            label="Membership Since"
                            value={
                                membershipSince
                            }
                        />

                        <Info
                            label="Valid From"
                            value={formatDate(
                                certificate.issueDate,
                            )}
                        />

                        <Info
                            label="Valid Until"
                            value={formatDate(
                                certificate.expiryDate,
                            )}
                        />

                        <Info
                            label="Certificate Status"
                            value={
                                certificateStatus
                            }
                        />
                    </InfoCard>

                    <InfoCard title="Member Information">
                        <Info
                            label="Member Name"
                            value={
                                memberName
                            }
                        />

                        <Info
                            label="Member Number"
                            value={
                                certificate.member
                                    .memberNumber
                            }
                        />

                        <Info
                            label="Email"
                            value={
                                certificate.member
                                    .email ||
                                certificate.member
                                    .user?.email
                            }
                        />

                        <Info
                            label="Phone"
                            value={
                                certificate.member
                                    .phone
                            }
                        />

                        <Info
                            label="Category"
                            value={
                                certificate.member
                                    .category?.name
                            }
                        />

                        <Info
                            label="Membership Status"
                            value={
                                certificate.member
                                    .status
                            }
                        />

                        <Info
                            label="Membership Since"
                            value={
                                membershipSince
                            }
                        />
                    </InfoCard>

                    {certificateStatus ===
                        "UPCOMING" ? (
                        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
                            <h3 className="text-lg font-black text-blue-900">
                                Upcoming Certificate
                            </h3>

                            <p className="mt-2 text-sm font-semibold leading-6 text-blue-700">
                                This certificate has been
                                issued for a future
                                membership period. It
                                becomes valid on{" "}
                                {formatDate(
                                    certificate.issueDate,
                                )}
                                .
                            </p>
                        </div>
                    ) : null}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-black text-slate-950">
                            Certificate Actions
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Download, verify, or view the
                            public certificate
                            verification page.
                        </p>

                        <div className="mt-5 grid gap-3">
                            <DownloadCertificateButton
                                href={`/dashboard/certificates/${certificate.id}/download`}
                            />

                            <Link
                                href={`/verify/${encodeURIComponent(
                                    certificate.verificationCode,
                                )}`}
                                target="_blank"
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-sm font-black text-white hover:bg-black"
                            >
                                <VerifyIcon />

                                Open Public Verification
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black text-slate-950">
                {title}
            </h3>

            <div className="mt-5 space-y-4">
                {children}
            </div>
        </div>
    );
}

/* =========================================================
   INFO
========================================================= */

function Info({
    label,
    value,
}: {
    label: string;
    value?: string | null;
}) {
    return (
        <div>
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-black text-slate-900">
                {value || "Not provided"}
            </p>
        </div>
    );
}

/* =========================================================
   PREVIEW INFO
========================================================= */

function PreviewInfo({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 break-all text-sm font-black text-slate-900">
                {value}
            </p>
        </div>
    );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function CertificateStatusBadge({
    status,
}: {
    status: CertificateStatus;
}) {
    const styles = {
        VALID:
            "bg-green-50 text-green-700",

        UPCOMING:
            "bg-blue-50 text-blue-700",

        EXPIRED:
            "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`w-fit rounded-full px-4 py-2 text-xs font-black ${styles[status]}`}
        >
            {status}
        </span>
    );
}

/* =========================================================
   VERIFY ICON
========================================================= */

function VerifyIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M9 12L11 14L15 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M12 3L19 6V11C19 15.5 16.1 19.7 12 21C7.9 19.7 5 15.5 5 11V6L12 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
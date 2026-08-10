import type {
    CSSProperties,
    ReactNode,
} from "react";

import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    Check,
    CheckCircle2,
    ChevronRight,
    CircleUserRound,
    Clock3,
    ExternalLink,
    FileCheck2,
    Fingerprint,
    Home,
    IdCard,
    LockKeyhole,
    RefreshCw,
    ShieldCheck,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

import { prisma } from "@/lib/prisma";

/* =========================================================
   TYPES
========================================================= */

type VerifyCertificatePageProps = {
    params: Promise<{
        code: string;
    }>;
};

/* =========================================================
   HELPERS
========================================================= */

function formatDate(
    date: Date,
) {
    return new Intl.DateTimeFormat(
        "en-KE",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        },
    ).format(date);
}

function normalizeVerificationCode(
    code: string,
) {
    return decodeURIComponent(
        code,
    )
        .trim()
        .toUpperCase();
}

function formatStatus(
    status?: string | null,
) {
    if (!status) {
        return "Not provided";
    }

    return status
        .replace(
            /[_-]+/g,
            " ",
        )
        .toLowerCase()
        .replace(
            /\b\w/g,
            (character) =>
                character.toUpperCase(),
        );
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
    params,
}: VerifyCertificatePageProps): Promise<Metadata> {
    const { code } =
        await params;

    const verificationCode =
        normalizeVerificationCode(
            code,
        );

    const certificate =
        await prisma.certificate.findUnique({
            where: {
                verificationCode,
            },

            select: {
                verificationCode:
                    true,

                certificateNumber:
                    true,

                issueDate:
                    true,

                expiryDate:
                    true,

                member: {
                    select: {
                        fullName:
                            true,

                        user: {
                            select: {
                                name:
                                    true,
                            },
                        },
                    },
                },
            },
        });

    if (!certificate) {
        return {
            title:
                "Certificate Not Found | AHPK",

            description:
                "The requested AHPK certificate verification record could not be found.",

            robots: {
                index:
                    false,

                follow:
                    false,
            },
        };
    }

    const holderName =
        certificate.member
            .fullName ||
        certificate.member.user
            ?.name ||
        "AHPK Member";

    const now =
        Date.now();

    const upcoming =
        now <
        certificate.issueDate.getTime();

    const expired =
        now >
        certificate.expiryDate.getTime();

    const verificationStatus =
        upcoming
            ? "Upcoming"
            : expired
                ? "Expired"
                : "Verified";

    return {
        title:
            `${verificationStatus} Certificate | AHPK`,

        description:
            `Official AHPK verification result for certificate ${certificate.certificateNumber}, issued to ${holderName}.`,

        alternates: {
            canonical:
                `/verify/${encodeURIComponent(
                    certificate.verificationCode,
                )}`,
        },

        robots: {
            index:
                false,

            follow:
                true,
        },

        openGraph: {
            title:
                `${verificationStatus} AHPK Certificate`,

            description:
                `Official certificate verification result for ${holderName}.`,

            type:
                "website",

            siteName:
                "Association of Hotel Professionals Kenya",

            locale:
                "en_KE",
        },
    };
}

/* =========================================================
   PAGE
========================================================= */

export default async function VerifyCertificatePage({
    params,
}: VerifyCertificatePageProps) {
    const { code } =
        await params;

    const verificationCode =
        normalizeVerificationCode(
            code,
        );

    const certificate =
        await prisma.certificate.findUnique({
            where: {
                verificationCode,
            },

            include: {
                member: {
                    include: {
                        user:
                            true,

                        category:
                            true,
                    },
                },
            },
        });

    if (!certificate) {
        redirect(
            `/verify?code=${encodeURIComponent(
                verificationCode,
            )}&error=not-found`,
        );
    }

    const currentDate =
        new Date();

    const upcoming =
        currentDate.getTime() <
        certificate.issueDate.getTime();

    const expired =
        currentDate.getTime() >
        certificate.expiryDate.getTime();

    const valid =
        !upcoming &&
        !expired;

    const holderName =
        certificate.member
            .fullName ||
        certificate.member.user
            ?.name ||
        "AHPK Member";

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            <PageHeader />

            <CertificateJsonLd
                holderName={
                    holderName
                }
                certificateNumber={
                    certificate.certificateNumber
                }
                verificationCode={
                    certificate.verificationCode
                }
                issueDate={
                    certificate.issueDate
                }
                expiryDate={
                    certificate.expiryDate
                }
                expired={
                    expired
                }
            />

            {/* =====================================================
                BREADCRUMB + RESULT STATUS
            ===================================================== */}

            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                    <Breadcrumb
                        verificationCode={
                            certificate.verificationCode
                        }
                    />

                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div
                                className={[
                                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",

                                    expired
                                        ? "border-amber-200 bg-amber-50 text-amber-700"
                                        : upcoming
                                            ? "border-blue-200 bg-blue-50 text-blue-700"
                                            : "border-emerald-200 bg-emerald-50 text-emerald-700",
                                ].join(
                                    " ",
                                )}
                            >
                                {expired ? (
                                    <AlertTriangle className="h-5 w-5" />
                                ) : upcoming ? (
                                    <CalendarDays className="h-5 w-5" />
                                ) : (
                                    <BadgeCheck className="h-5 w-5" />
                                )}
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                    Official AHPK
                                    Verification
                                </p>

                                <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                    {expired
                                        ? "Certificate Found — Expired"
                                        : upcoming
                                            ? "Certificate Found — Upcoming"
                                            : "Certificate Successfully Verified"}
                                </h1>

                                <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                                    The certificate
                                    record was found
                                    in the official
                                    AHPK digital
                                    membership
                                    register.
                                </p>
                            </div>
                        </div>

                        <StatusBadge
                            expired={
                                expired
                            }
                            upcoming={
                                upcoming
                            }
                        />
                    </div>
                </div>
            </section>

            {/* =====================================================
                MAIN RESULT
            ===================================================== */}

            <section className="py-5 sm:py-6">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        {/* =========================================
                            LEFT
                        ========================================= */}

                        <div className="space-y-5">
                            {/* HOLDER + CERTIFICATE DETAILS */}

                            <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
                                <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                            <CircleUserRound className="h-5 w-5" />
                                        </span>

                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#C8102E]">
                                                Certificate
                                                Holder
                                            </p>

                                            <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                                                {
                                                    holderName
                                                }
                                            </h2>
                                        </div>
                                    </div>

                                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-600">
                                        <IdCard className="h-3.5 w-3.5" />

                                        {
                                            certificate
                                                .member
                                                .memberNumber
                                        }
                                    </span>
                                </div>

                                <div className="p-5">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <Info
                                            icon={
                                                <FileCheck2 />
                                            }
                                            label="Certificate Number"
                                            value={
                                                certificate.certificateNumber
                                            }
                                        />

                                        <Info
                                            icon={
                                                <BadgeCheck />
                                            }
                                            label="Membership Category"
                                            value={
                                                certificate
                                                    .member
                                                    .category
                                                    ?.name
                                            }
                                        />

                                        <Info
                                            icon={
                                                <ShieldCheck />
                                            }
                                            label="Membership Status"
                                            value={formatStatus(
                                                certificate
                                                    .member
                                                    .status,
                                            )}
                                        />

                                        <Info
                                            icon={
                                                <CalendarDays />
                                            }
                                            label="Membership Since"
                                            value={String(
                                                certificate.member.joinDate.getFullYear(),
                                            )}
                                        />

                                        <Info
                                            icon={
                                                <CalendarDays />
                                            }
                                            label="Valid From"
                                            value={formatDate(
                                                certificate.issueDate,
                                            )}
                                        />

                                        <Info
                                            icon={
                                                <Clock3 />
                                            }
                                            label="Valid Until"
                                            value={formatDate(
                                                certificate.expiryDate,
                                            )}
                                            warning={
                                                expired
                                            }
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* VERIFICATION CODE */}

                            <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                        <Fingerprint className="h-5 w-5" />
                                    </span>

                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#C8102E]">
                                            Verification
                                            Identity
                                        </p>

                                        <h2 className="mt-1 text-lg font-black text-slate-950">
                                            Certificate
                                            Verification
                                            Code
                                        </h2>

                                        <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                                            This code
                                            should match
                                            the code
                                            printed on
                                            the
                                            certificate or
                                            encoded in its
                                            QR code.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-4">
                                    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                                        Official
                                        Verification
                                        Code
                                    </p>

                                    <p className="mt-1 break-all font-mono text-lg font-black tracking-wide text-[#C8102E]">
                                        {
                                            certificate.verificationCode
                                        }
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* =========================================
                            SIDEBAR
                        ========================================= */}

                        <aside className="space-y-4 lg:sticky lg:top-24">
                            <AuthenticityCard
                                expired={
                                    expired
                                }
                                upcoming={
                                    upcoming
                                }
                            />

                            <ImportantNotice />

                            <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                                <div className="flex items-start gap-3">
                                    <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />

                                    <div>
                                        <h2 className="text-sm font-black text-slate-950">
                                            Verify
                                            Another
                                            Certificate
                                        </h2>

                                        <p className="mt-1 text-xs font-medium leading-5 text-slate-600">
                                            Enter another
                                            verification
                                            code or scan
                                            another
                                            certificate
                                            QR code.
                                        </p>

                                        <Link
                                            href="/verify"
                                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-[#C8102E]"
                                        >
                                            New
                                            verification

                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Link
                                    href="/contact"
                                    className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-4 text-xs font-black text-white transition hover:bg-red-800"
                                >
                                    Contact
                                    Secretariat

                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>

                                <Link
                                    href="/"
                                    className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E]"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />

                                    Back to
                                    Website
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
    expired,
    upcoming,
}: {
    expired: boolean;
    upcoming: boolean;
}) {
    const cls =
        expired
            ? "bg-amber-100 text-amber-800"
            : upcoming
                ? "bg-blue-100 text-blue-800"
                : "bg-emerald-100 text-emerald-700";

    return (
        <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] ${cls}`}
        >
            {expired ? (
                <AlertTriangle className="h-3.5 w-3.5" />
            ) : upcoming ? (
                <CalendarDays className="h-3.5 w-3.5" />
            ) : (
                <Check className="h-3.5 w-3.5" />
            )}

            {expired
                ? "Expired Certificate"
                : upcoming
                    ? "Upcoming Certificate"
                    : "Valid Certificate"}
        </span>
    );
}

/* =========================================================
   AUTHENTICITY
========================================================= */

function AuthenticityCard({
    expired,
    upcoming,
}: {
    expired: boolean;
    upcoming: boolean;
}) {
    return (
        <div
            className={[
                "overflow-hidden rounded-2xl border bg-white shadow-sm",

                expired
                    ? "border-amber-200"
                    : upcoming
                        ? "border-blue-200"
                        : "border-emerald-200",
            ].join(
                " ",
            )}
        >
            <div
                className={[
                    "p-4",

                    expired
                        ? "bg-amber-50"
                        : upcoming
                            ? "bg-blue-50"
                            : "bg-emerald-50",
                ].join(
                    " ",
                )}
            >
                <div className="flex items-start gap-3">
                    <span
                        className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm",

                            expired
                                ? "text-amber-700"
                                : upcoming
                                    ? "text-blue-700"
                                    : "text-emerald-700",
                        ].join(
                            " ",
                        )}
                    >
                        {expired ? (
                            <AlertTriangle className="h-4 w-4" />
                        ) : upcoming ? (
                            <CalendarDays className="h-4 w-4" />
                        ) : (
                            <BadgeCheck className="h-4 w-4" />
                        )}
                    </span>

                    <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-slate-500">
                            Authenticity
                        </p>

                        <h2 className="mt-1 text-base font-black text-slate-950">
                            {expired
                                ? "Certificate Expired"
                                : upcoming
                                    ? "Certificate Upcoming"
                                    : "Certificate Verified"}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <p className="text-xs font-medium leading-5 text-slate-600">
                    {expired
                        ? "This certificate exists in official AHPK records, but its stated validity period has ended."
                        : upcoming
                            ? "This certificate exists in official AHPK records, but its validity period has not started yet."
                            : "This certificate matches the official AHPK record and is currently within its stated validity period."}
                </p>

                <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
                    <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />

                    <p className="text-[11px] font-semibold leading-5 text-slate-500">
                        Verification
                        data is
                        retrieved
                        directly from
                        AHPK digital
                        membership
                        records.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   IMPORTANT NOTICE
========================================================= */

function ImportantNotice() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                    <ShieldCheck className="h-4 w-4" />
                </span>

                <h2 className="text-sm font-black text-slate-950">
                    Compare These
                    Details
                </h2>
            </div>

            <p className="mt-3 text-xs font-medium leading-5 text-slate-600">
                Compare this result
                with the certificate
                presented to you.
            </p>

            <div className="mt-3 space-y-2">
                <NoticeItem text="Certificate holder name" />
                <NoticeItem text="Certificate number" />
                <NoticeItem text="Verification code" />
                <NoticeItem text="Membership since year" />
                <NoticeItem text="Validity period" />
            </div>
        </div>
    );
}

function NoticeItem({
    text,
}: {
    text: string;
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Check className="h-3 w-3" />
            </span>

            <span className="text-xs font-semibold text-slate-600">
                {text}
            </span>
        </div>
    );
}

/* =========================================================
   INFO
========================================================= */

function Info({
    icon,
    label,
    value,
    warning = false,
}: {
    icon: ReactNode;
    label: string;
    value?: string | null;
    warning?: boolean;
}) {
    return (
        <div
            className={[
                "rounded-xl border p-3",

                warning
                    ? "border-amber-200 bg-amber-50"
                    : "border-slate-200 bg-slate-50",
            ].join(
                " ",
            )}
        >
            <div className="flex items-start gap-3">
                <span
                    className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg [&>svg]:h-3.5 [&>svg]:w-3.5",

                        warning
                            ? "bg-white text-amber-700"
                            : "bg-white text-[#C8102E]",
                    ].join(
                        " ",
                    )}
                >
                    {icon}
                </span>

                <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                        {label}
                    </p>

                    <p
                        className={[
                            "mt-0.5 break-words text-sm font-black leading-5",

                            warning
                                ? "text-amber-800"
                                : "text-slate-900",
                        ].join(
                            " ",
                        )}
                    >
                        {value ||
                            "Not provided"}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   BREADCRUMB
========================================================= */

function Breadcrumb({
    verificationCode,
}: {
    verificationCode: string;
}) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-500"
        >
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 transition hover:text-[#C8102E]"
            >
                <Home className="h-3.5 w-3.5" />

                Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />

            <Link
                href="/verify"
                className="transition hover:text-[#C8102E]"
            >
                Certificate Verification
            </Link>

            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />

            <span
                className="max-w-[200px] truncate font-mono text-[#C8102E] sm:max-w-none"
                aria-current="page"
            >
                {verificationCode}
            </span>
        </nav>
    );
}

/* =========================================================
   HEADER
========================================================= */

function PageHeader() {
    return (
        <header
            className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
            style={
                {
                    "--header-height":
                        "76px",
                } as CSSProperties
            }
        >
            <div className="mx-auto flex h-[74px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="AHPK homepage"
                    className="shrink-0"
                >
                    <Image
                        src={
                            Logo
                        }
                        alt="Association of Hotel Professionals Kenya"
                        width={
                            76
                        }
                        height={
                            76
                        }
                        priority
                        className="h-[58px] w-[58px] object-contain sm:h-[62px] sm:w-[62px]"
                    />
                </Link>

                <div className="ml-auto flex items-center">
                    <DesktopNavigation />
                </div>
            </div>
        </header>
    );
}

/* =========================================================
   JSON-LD
========================================================= */

function CertificateJsonLd({
    holderName,
    certificateNumber,
    verificationCode,
    issueDate,
    expiryDate,
    expired,
}: {
    holderName: string;
    certificateNumber: string;
    verificationCode: string;
    issueDate: Date;
    expiryDate: Date;
    expired: boolean;
}) {
    const structuredData = {
        "@context":
            "https://schema.org",

        "@type":
            "EducationalOccupationalCredential",

        name:
            `AHPK Certificate ${certificateNumber}`,

        credentialCategory:
            "Professional Membership Certificate",

        recognizedBy: {
            "@type":
                "Organization",

            name:
                "Association of Hotel Professionals Kenya",
        },

        validFrom:
            issueDate.toISOString(),

        validUntil:
            expiryDate.toISOString(),

        identifier: [
            {
                "@type":
                    "PropertyValue",

                name:
                    "Certificate Number",

                value:
                    certificateNumber,
            },

            {
                "@type":
                    "PropertyValue",

                name:
                    "Verification Code",

                value:
                    verificationCode,
            },
        ],

        about: {
            "@type":
                "Person",

            name:
                holderName,
        },

        additionalProperty: {
            "@type":
                "PropertyValue",

            name:
                "Verification Status",

            value:
                expired
                    ? "Expired"
                    : "Valid",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html:
                    JSON.stringify(
                        structuredData,
                    ).replace(
                        /</g,
                        "\\u003c",
                    ),
            }}
        />
    );
}
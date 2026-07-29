import type {
    CSSProperties,
    ReactNode,
} from "react";

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
import { Metadata } from "next";

type VerifyCertificatePageProps = {
    params: Promise<{
        code: string;
    }>;
};

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
}

function normalizeVerificationCode(code: string) {
    return decodeURIComponent(code)
        .trim()
        .toUpperCase();
}

export async function generateMetadata({
    params,
}: VerifyCertificatePageProps): Promise<Metadata> {
    const { code } = await params;

    const verificationCode =
        normalizeVerificationCode(code);

    const certificate =
        await prisma.certificate.findUnique({
            where: {
                verificationCode,
            },

            select: {
                verificationCode: true,
                certificateNumber: true,
                expiryDate: true,

                member: {
                    select: {
                        fullName: true,

                        user: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

    if (!certificate) {
        return {
            title: "Certificate Not Found | AHPK",
            description:
                "The requested AHPK certificate verification record could not be found.",

            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const holderName =
        certificate.member.fullName ||
        certificate.member.user?.name ||
        "AHPK Member";

    const expired =
        certificate.expiryDate.getTime() <
        Date.now();

    return {
        title: `${expired ? "Expired" : "Verified"} Certificate | AHPK`,

        description: `Official AHPK verification result for certificate ${certificate.certificateNumber}, issued to ${holderName}.`,

        alternates: {
            canonical: `/verify/${encodeURIComponent(
                certificate.verificationCode,
            )}`,
        },

        robots: {
            index: false,
            follow: true,
        },

        openGraph: {
            title: `${expired ? "Expired" : "Verified"} AHPK Certificate`,
            description: `Official certificate verification result for ${holderName}.`,
            type: "website",
            siteName:
                "Association of Hotel Professionals Kenya",
            locale: "en_KE",
        },
    };
}

export default async function VerifyCertificatePage({
    params,
}: VerifyCertificatePageProps) {
    const { code } = await params;

    const verificationCode =
        normalizeVerificationCode(code);

    const certificate =
        await prisma.certificate.findUnique({
            where: {
                verificationCode,
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
        redirect(
            `/verify?code=${encodeURIComponent(
                verificationCode,
            )}&error=not-found`,
        );
    }

    const currentDate = new Date();

    const expired =
        certificate.expiryDate.getTime() <
        currentDate.getTime();

    const holderName =
        certificate.member.fullName ||
        certificate.member.user?.name ||
        "AHPK Member";

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <PageHeader />

            <CertificateJsonLd
                holderName={holderName}
                certificateNumber={
                    certificate.certificateNumber
                }
                verificationCode={
                    certificate.verificationCode
                }
                issueDate={certificate.issueDate}
                expiryDate={certificate.expiryDate}
                expired={expired}
            />

            {/* HERO */}
            <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
                <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
                    <div
                        className={[
                            "absolute -left-32 top-0 h-96 w-96 rounded-full blur-3xl",
                            expired
                                ? "bg-amber-100/70"
                                : "bg-emerald-100/70",
                        ].join(" ")}
                    />

                    <div className="absolute right-0 top-0 h-full w-[58%] bg-[linear-gradient(135deg,transparent_0%,rgba(200,16,46,0.05)_100%)]" />

                    <div className="absolute right-[10%] top-12 h-56 w-56 rounded-full border border-red-100/70" />

                    <div className="absolute right-[16%] top-24 h-28 w-28 rounded-full border border-red-100/60" />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8">
                    <Breadcrumb
                        verificationCode={
                            certificate.verificationCode
                        }
                    />

                    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4">
                                <div
                                    className={[
                                        "flex h-12 w-12 items-center justify-center rounded-2xl border bg-white shadow-sm",
                                        expired
                                            ? "border-amber-200 text-amber-700"
                                            : "border-emerald-200 text-emerald-700",
                                    ].join(" ")}
                                >
                                    {expired ? (
                                        <AlertTriangle className="h-6 w-6" />
                                    ) : (
                                        <BadgeCheck className="h-6 w-6" />
                                    )}
                                </div>

                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#C8102E]">
                                        Official AHPK Record
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        Certificate verification result
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Certificate
                                <span
                                    className={[
                                        "mt-2 block",
                                        expired
                                            ? "text-amber-700"
                                            : "text-emerald-700",
                                    ].join(" ")}
                                >
                                    {expired
                                        ? "Record Found — Expired"
                                        : "Successfully Verified"}
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                This certificate record was
                                located in the official
                                Association of Hotel
                                Professionals Kenya membership
                                database.
                            </p>
                        </div>

                        <VerificationStatusCard
                            expired={expired}
                            verificationCode={
                                certificate.verificationCode
                            }
                        />
                    </div>
                </div>
            </section>

            {/* RESULT CONTENT */}
            <section className="bg-slate-50/80 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-start">
                        <div className="space-y-8">
                            {/* HOLDER */}
                            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-200 bg-white px-6 py-6 sm:px-8">
                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                                <CircleUserRound className="h-6 w-6" />
                                            </span>

                                            <div>
                                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                                    Certificate holder
                                                </p>

                                                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                                                    {holderName}
                                                </h2>
                                            </div>
                                        </div>

                                        <StatusBadge
                                            expired={expired}
                                        />
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                                        <div className="flex items-start gap-3">
                                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />

                                            <p className="text-sm font-medium leading-7 text-slate-600">
                                                The information below
                                                matches an official
                                                certificate record held
                                                by AHPK. Compare these
                                                details with the
                                                certificate presented to
                                                you.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                                        <Info
                                            icon={<FileCheck2 />}
                                            label="Certificate number"
                                            value={
                                                certificate.certificateNumber
                                            }
                                        />

                                        <Info
                                            icon={<IdCard />}
                                            label="Member number"
                                            value={
                                                certificate.member
                                                    .memberNumber
                                            }
                                        />

                                        <Info
                                            icon={<BadgeCheck />}
                                            label="Membership category"
                                            value={
                                                certificate.member
                                                    .category?.name
                                            }
                                        />

                                        <Info
                                            icon={<ShieldCheck />}
                                            label="Membership status"
                                            value={formatStatus(
                                                certificate.member
                                                    .status,
                                            )}
                                        />

                                        <Info
                                            icon={<CalendarDays />}
                                            label="Issue date"
                                            value={formatDate(
                                                certificate.issueDate,
                                            )}
                                        />

                                        <Info
                                            icon={<Clock3 />}
                                            label="Expiry date"
                                            value={formatDate(
                                                certificate.expiryDate,
                                            )}
                                            warning={expired}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* VERIFICATION CODE */}
                            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                        <Fingerprint className="h-6 w-6" />
                                    </span>

                                    <div className="min-w-0">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                            Verification identity
                                        </p>

                                        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                                            Certificate Verification
                                            Code
                                        </h2>

                                        <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                                            This unique code should
                                            match the code printed on
                                            the certificate or encoded
                                            in its QR code.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 overflow-hidden rounded-2xl border border-red-100 bg-red-50">
                                    <p className="border-b border-red-100 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                                        Official verification code
                                    </p>

                                    <p className="break-all px-5 py-5 font-mono text-xl font-extrabold tracking-wide text-[#C8102E] sm:text-2xl">
                                        {
                                            certificate.verificationCode
                                        }
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <AuthenticityCard
                                expired={expired}
                            />

                            <ImportantNotice />

                            <div className="rounded-[24px] border border-red-100 bg-red-50/70 p-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#C8102E] shadow-sm">
                                    <RefreshCw className="h-5 w-5" />
                                </div>

                                <h2 className="mt-5 text-lg font-extrabold text-slate-950">
                                    Verify Another Certificate
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                                    Enter another verification
                                    code or scan another
                                    certificate QR code.
                                </p>

                                <Link
                                    href="/verify"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    New verification

                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="grid gap-3">
                                <Link
                                    href="/contact"
                                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-5 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100"
                                >
                                    Contact Secretariat
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/"
                                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E]"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Website
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

function VerificationStatusCard({
    expired,
    verificationCode,
}: {
    expired: boolean;
    verificationCode: string;
}) {
    return (
        <div
            className={[
                "rounded-[26px] border bg-white/95 p-6 shadow-lg backdrop-blur",
                expired
                    ? "border-amber-200 shadow-amber-100/50"
                    : "border-emerald-200 shadow-emerald-100/50",
            ].join(" ")}
        >
            <div className="flex items-start gap-4">
                <span
                    className={[
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                        expired
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700",
                    ].join(" ")}
                >
                    {expired ? (
                        <AlertTriangle className="h-6 w-6" />
                    ) : (
                        <CheckCircle2 className="h-6 w-6" />
                    )}
                </span>

                <div className="min-w-0">
                    <p
                        className={[
                            "text-xs font-black uppercase tracking-[0.18em]",
                            expired
                                ? "text-amber-700"
                                : "text-emerald-700",
                        ].join(" ")}
                    >
                        {expired
                            ? "Expired certificate"
                            : "Valid certificate"}
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                        {expired
                            ? "The record is authentic, but its validity period has ended."
                            : "The certificate matches an active official AHPK record."}
                    </p>
                </div>
            </div>

            <div className="mt-5 border-t border-slate-200 pt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Verification code
                </p>

                <p className="mt-1 break-all font-mono text-sm font-extrabold text-slate-900">
                    {verificationCode}
                </p>
            </div>
        </div>
    );
}

function StatusBadge({
    expired,
}: {
    expired: boolean;
}) {
    return (
        <span
            className={[
                "inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.1em]",
                expired
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-700",
            ].join(" ")}
        >
            {expired ? (
                <AlertTriangle className="h-4 w-4" />
            ) : (
                <Check className="h-4 w-4" />
            )}

            {expired
                ? "Expired certificate"
                : "Valid certificate"}
        </span>
    );
}

function AuthenticityCard({
    expired,
}: {
    expired: boolean;
}) {
    return (
        <div
            className={[
                "overflow-hidden rounded-[26px] border bg-white shadow-sm",
                expired
                    ? "border-amber-200"
                    : "border-emerald-200",
            ].join(" ")}
        >
            <div
                className={[
                    "px-6 py-5",
                    expired
                        ? "bg-amber-50"
                        : "bg-emerald-50",
                ].join(" ")}
            >
                <div
                    className={[
                        "flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm",
                        expired
                            ? "text-amber-700"
                            : "text-emerald-700",
                    ].join(" ")}
                >
                    {expired ? (
                        <AlertTriangle className="h-5 w-5" />
                    ) : (
                        <BadgeCheck className="h-5 w-5" />
                    )}
                </div>

                <p
                    className={[
                        "mt-5 text-xs font-black uppercase tracking-[0.2em]",
                        expired
                            ? "text-amber-700"
                            : "text-emerald-700",
                    ].join(" ")}
                >
                    Authenticity confirmation
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                    {expired
                        ? "Certificate Expired"
                        : "Certificate Verified"}
                </h2>
            </div>

            <div className="p-6">
                <p className="text-sm font-medium leading-7 text-slate-600">
                    {expired
                        ? "This certificate exists in official AHPK records, but its stated validity period has expired. Contact the certificate holder or AHPK Secretariat for current membership information."
                        : "This certificate matches the official AHPK record and is currently within its stated validity period."}
                </p>

                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />

                    <p className="text-xs font-semibold leading-6 text-slate-500">
                        Verification data is retrieved
                        directly from the AHPK digital
                        membership records.
                    </p>
                </div>
            </div>
        </div>
    );
}

function ImportantNotice() {
    return (
        <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                    <ShieldCheck className="h-5 w-5" />
                </span>

                <h2 className="text-lg font-extrabold text-slate-950">
                    Important Notice
                </h2>
            </div>

            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">
                Always compare the verification result
                with the physical or digital certificate
                presented to you.
            </p>

            <div className="mt-5 space-y-3">
                <NoticeItem text="Certificate holder name" />
                <NoticeItem text="Certificate number" />
                <NoticeItem text="Verification code" />
                <NoticeItem text="Issue and expiry dates" />
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
        <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Check className="h-3.5 w-3.5" />
            </span>

            <span className="text-sm font-semibold text-slate-600">
                {text}
            </span>
        </div>
    );
}

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
                "rounded-2xl border p-4",
                warning
                    ? "border-amber-200 bg-amber-50"
                    : "border-slate-200 bg-white",
            ].join(" ")}
        >
            <div className="flex items-start gap-3">
                <span
                    className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl [&>svg]:h-4 [&>svg]:w-4",
                        warning
                            ? "bg-white text-amber-700"
                            : "bg-slate-50 text-[#C8102E]",
                    ].join(" ")}
                >
                    {icon}
                </span>

                <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                        {label}
                    </p>

                    <p
                        className={[
                            "mt-1 break-words text-sm font-extrabold leading-6",
                            warning
                                ? "text-amber-800"
                                : "text-slate-900",
                        ].join(" ")}
                    >
                        {value || "Not provided"}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Breadcrumb({
    verificationCode,
}: {
    verificationCode: string;
}) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500"
        >
            <Link
                href="/"
                className="inline-flex items-center gap-2 transition hover:text-[#C8102E]"
            >
                <Home className="h-4 w-4" />
                Home
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <Link
                href="/verify"
                className="transition hover:text-[#C8102E]"
            >
                Certificate Verification
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                className="max-w-[220px] truncate font-mono text-[#C8102E] sm:max-w-none"
                aria-current="page"
            >
                {verificationCode}
            </span>
        </nav>
    );
}

function PageHeader() {
    return (
        <header
            className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
            style={
                {
                    "--header-height": "88px",
                } as CSSProperties
            }
        >
            <div className="mx-auto flex h-[82px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="AHPK homepage"
                    className="shrink-0"
                >
                    <Image
                        src={Logo}
                        alt="Association of Hotel Professionals Kenya"
                        width={92}
                        height={92}
                        priority
                        className="h-[66px] w-[66px] object-contain sm:h-[72px] sm:w-[72px]"
                    />
                </Link>

                <div className="ml-auto flex items-center">
                    <DesktopNavigation />
                </div>
            </div>
        </header>
    );
}

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
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalCredential",
        name: `AHPK Certificate ${certificateNumber}`,
        credentialCategory:
            "Professional Membership Certificate",
        recognizedBy: {
            "@type": "Organization",
            name: "Association of Hotel Professionals Kenya",
        },
        validFrom: issueDate.toISOString(),
        validUntil: expiryDate.toISOString(),
        identifier: [
            {
                "@type": "PropertyValue",
                name: "Certificate Number",
                value: certificateNumber,
            },
            {
                "@type": "PropertyValue",
                name: "Verification Code",
                value: verificationCode,
            },
        ],
        about: {
            "@type": "Person",
            name: holderName,
        },
        additionalProperty: {
            "@type": "PropertyValue",
            name: "Verification Status",
            value: expired
                ? "Expired"
                : "Valid",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                    structuredData,
                ).replace(/</g, "\\u003c"),
            }}
        />
    );
}

function formatStatus(
    status?: string | null,
) {
    if (!status) {
        return "Not provided";
    }

    return status
        .replace(/[_-]+/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (character) =>
            character.toUpperCase(),
        );
}
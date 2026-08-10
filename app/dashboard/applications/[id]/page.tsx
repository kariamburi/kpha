import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ApplicationDecisionButtons from "./ApplicationDecisionButtons";

function formatDate(
    date?: Date | null,
) {
    if (!date) return "Not provided";

    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function ApplicationDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const application =
        await prisma.membershipApplication.findUnique({
            where: {
                id,
            },

            include: {
                user: true,
                category: true,
            },
        });

    if (!application) {
        notFound();
    }

    const hasConsent =
        application.dataProtectionConsent === true;

    return (
        <div className="space-y-5">
            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <Link
                    href="/dashboard/applications"
                    className="text-sm font-black text-[#C1121F] hover:underline"
                >
                    ← Back to Applications
                </Link>

                <div className="mt-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                        <p className="text-sm font-black text-slate-500">
                            Application Review
                        </p>

                        <h1 className="mt-1 text-3xl font-black text-slate-950">
                            {application.fullName ||
                                application.user?.name ||
                                "Unnamed Applicant"}
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Submitted on{" "}
                            {formatDate(
                                application.createdAt,
                            )}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <ApplicationStatusBadge
                            status={
                                application.status
                            }
                        />

                        <PaymentStatusBadge
                            status={
                                application.paymentStatus
                            }
                        />

                        <ConsentBadge
                            consent={
                                hasConsent
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                {/* =================================================
                    LEFT COLUMN
                ================================================= */}

                <div className="space-y-5">
                    {/* APPLICANT DETAILS */}

                    <InfoCard title="Applicant Information">
                        <div className="grid gap-5 md:grid-cols-2">
                            <Info
                                label="Full Name"
                                value={
                                    application.fullName ||
                                    application.user
                                        ?.name
                                }
                            />

                            <Info
                                label="Email Address"
                                value={
                                    application.email ||
                                    application.user
                                        ?.email
                                }
                            />

                            <Info
                                label="Phone Number"
                                value={
                                    application.phone
                                }
                            />

                            <Info
                                label="ID / Passport"
                                value={
                                    application.idNumber
                                }
                            />
                        </div>
                    </InfoCard>

                    {/* MEMBERSHIP */}

                    <InfoCard title="Membership Details">
                        <div className="grid gap-5 md:grid-cols-2">
                            <Info
                                label="Membership Category"
                                value={
                                    application.category
                                        ?.name
                                }
                            />

                            <Info
                                label="Annual Fee"
                                value={
                                    application.category
                                        ? `KES ${application.category.annualFee.toLocaleString()}`
                                        : null
                                }
                            />
                        </div>
                    </InfoCard>

                    {/* EDUCATION */}

                    <InfoCard title="Education Details">
                        <div className="grid gap-5 md:grid-cols-2">
                            <Info
                                label="Qualification"
                                value={
                                    application.qualification
                                }
                            />

                            <Info
                                label="Institution"
                                value={
                                    application.institution
                                }
                            />
                        </div>
                    </InfoCard>

                    {/* CURRENT EMPLOYMENT */}

                    <InfoCard title="Current Employment">
                        <div className="grid gap-5 md:grid-cols-2">
                            <Info
                                label="Current Position"
                                value={
                                    application.position
                                }
                            />

                            <Info
                                label="Current Employer"
                                value={
                                    application.employer
                                }
                            />
                        </div>
                    </InfoCard>

                    {/* PROFESSIONAL EXPERIENCE */}

                    <InfoCard title="Professional Experience">
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">
                                Experience /
                                Professional Background
                            </p>

                            <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <p className="whitespace-pre-line text-sm font-semibold leading-7 text-slate-700">
                                    {application.experience ||
                                        "Not provided"}
                                </p>
                            </div>
                        </div>
                    </InfoCard>

                    {/* DATA PROTECTION */}

                    <InfoCard title="Data Protection Consent">
                        <div
                            className={`rounded-2xl border p-5 ${hasConsent
                                ? "border-green-200 bg-green-50"
                                : "border-red-200 bg-red-50"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-black ${hasConsent
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {hasConsent
                                        ? "✓"
                                        : "!"}
                                </div>

                                <div>
                                    <p
                                        className={`text-sm font-black ${hasConsent
                                            ? "text-green-900"
                                            : "text-red-900"
                                            }`}
                                    >
                                        {hasConsent
                                            ? "Consent Provided"
                                            : "Consent Not Provided"}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                                        Applicant consent
                                        for processing
                                        personal information
                                        for AHPK membership
                                        administration and
                                        related purposes.
                                    </p>

                                    <div className="mt-4">
                                        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                                            Consent Date
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-slate-800">
                                            {application.consentedAt
                                                ? formatDate(
                                                    application.consentedAt,
                                                )
                                                : "Not recorded"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfoCard>

                    {/* PAYMENT */}

                    <InfoCard title="Payment Information">
                        <div className="grid gap-4 md:grid-cols-3">
                            <Info
                                label="Payment Status"
                                value={
                                    application.paymentStatus
                                }
                            />

                            <Info
                                label="Reference"
                                value={
                                    application.paymentReference
                                }
                            />

                            <Info
                                label="Submitted Date"
                                value={formatDate(
                                    application.createdAt,
                                )}
                            />
                        </div>
                    </InfoCard>

                    {/* DECISION */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-black text-slate-950">
                            Decision
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Approve only after
                            confirming payment,
                            reviewing the applicant's
                            information and documents,
                            and confirming data
                            protection consent.
                        </p>

                        {application.paymentStatus !==
                            "PAID" ? (
                            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">
                                Payment is not
                                confirmed. This
                                application cannot be
                                approved yet.
                            </div>
                        ) : !hasConsent ? (
                            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold leading-6 text-red-800">
                                Data protection
                                consent has not been
                                recorded. This
                                application should not
                                be approved until the
                                required consent has
                                been provided.
                            </div>
                        ) : (
                            <ApplicationDecisionButtons
                                applicationId={
                                    application.id
                                }
                                status={
                                    application.status
                                }
                            />
                        )}
                    </div>
                </div>

                {/* =================================================
                    RIGHT COLUMN
                ================================================= */}

                <div className="space-y-5">
                    {/* DOCUMENTS */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="border-b border-slate-200 pb-4">
                            <p className="text-sm font-black text-slate-500">
                                Document Review
                            </p>

                            <h3 className="mt-1 text-xl font-black text-slate-950">
                                Attached Documents
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Open each file in a
                                new tab to verify the
                                applicant&apos;s
                                details.
                            </p>
                        </div>

                        <div className="mt-5 space-y-3">
                            <DocumentItem
                                title="ID / Passport Copy"
                                description="Verify identity and identification number."
                                url={
                                    application.idDocumentUrl
                                }
                            />

                            <DocumentItem
                                title="Qualification Certificate"
                                description="Verify qualification and educational institution."
                                url={
                                    application.qualificationDocUrl
                                }
                            />

                            <DocumentItem
                                title="CV / Professional Profile"
                                description="Review professional experience and employment history."
                                url={
                                    application.cvDocumentUrl
                                }
                            />
                        </div>
                    </div>

                    {/* REVIEW CHECKLIST */}

                    <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
                        <p className="text-sm font-semibold text-white/65">
                            Review Checklist
                        </p>

                        <h3 className="mt-1 text-xl font-black">
                            Approval Requirements
                        </h3>

                        <div className="mt-4 space-y-3 text-sm font-semibold text-white/90">
                            <ChecklistItem
                                text="Payment confirmed"
                                checked={
                                    application.paymentStatus ===
                                    "PAID"
                                }
                            />

                            <ChecklistItem
                                text="Data protection consent"
                                checked={
                                    hasConsent
                                }
                            />

                            <ChecklistItem
                                text="Identity document uploaded"
                                checked={
                                    !!application.idDocumentUrl
                                }
                            />

                            <ChecklistItem
                                text="Qualification document uploaded"
                                checked={
                                    !!application.qualificationDocUrl
                                }
                            />

                            <ChecklistItem
                                text="CV uploaded"
                                checked={
                                    !!application.cvDocumentUrl
                                }
                            />

                            <ChecklistItem
                                text="Current position provided"
                                checked={
                                    !!application.position
                                }
                            />

                            <ChecklistItem
                                text="Current employer provided"
                                checked={
                                    !!application.employer
                                }
                            />
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

            <div className="mt-5">
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
            <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-bold text-slate-900">
                {value ||
                    "Not provided"}
            </p>
        </div>
    );
}

/* =========================================================
   DOCUMENT
========================================================= */

function DocumentItem({
    title,
    description,
    url,
}: {
    title: string;
    description: string;
    url?: string | null;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900">
                        {title}
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                        {description}
                    </p>

                    <p className="mt-2 break-all text-[11px] text-slate-400">
                        {url ||
                            "Not uploaded"}
                    </p>
                </div>

                <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold ${url
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                        }`}
                >
                    {url
                        ? "Uploaded"
                        : "Missing"}
                </span>
            </div>

            {url ? (
                <div className="mt-4 flex gap-2">
                    <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded bg-[#111111] px-3 py-2 text-[12px] font-bold text-white hover:bg-black"
                    >
                        Open
                    </Link>

                    <Link
                        href={url}
                        download
                        className="rounded border border-slate-300 bg-white px-3 py-2 text-[12px] font-bold text-slate-700 hover:bg-slate-50"
                    >
                        Download
                    </Link>
                </div>
            ) : null}
        </div>
    );
}

/* =========================================================
   CHECKLIST
========================================================= */

function ChecklistItem({
    text,
    checked,
}: {
    text: string;
    checked: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span>
                {text}
            </span>

            <span
                className={`rounded-full px-2 py-1 text-[11px] font-black ${checked
                    ? "bg-green-500/20 text-green-200"
                    : "bg-red-500/20 text-red-200"
                    }`}
            >
                {checked
                    ? "YES"
                    : "NO"}
            </span>
        </div>
    );
}

/* =========================================================
   APPLICATION STATUS
========================================================= */

function ApplicationStatusBadge({
    status,
}: {
    status: string;
}) {
    const cls =
        status === "APPROVED"
            ? "bg-green-50 text-green-700"
            : status === "REJECTED"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-700";

    return (
        <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}
        >
            {status}
        </span>
    );
}

/* =========================================================
   PAYMENT STATUS
========================================================= */

function PaymentStatusBadge({
    status,
}: {
    status: string;
}) {
    const cls =
        status === "PAID"
            ? "bg-green-50 text-green-700"
            : status === "FAILED" ||
                status === "CANCELLED"
                ? "bg-red-50 text-red-700"
                : "bg-slate-100 text-slate-600";

    return (
        <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}
        >
            {status}
        </span>
    );
}

/* =========================================================
   CONSENT STATUS
========================================================= */

function ConsentBadge({
    consent,
}: {
    consent: boolean;
}) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold ${consent
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
                }`}
        >
            {consent
                ? "CONSENT GIVEN"
                : "NO CONSENT"}
        </span>
    );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ApplicationDecisionButtons from "./ApplicationDecisionButtons";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default async function ApplicationDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const application = await prisma.membershipApplication.findUnique({
        where: { id },
        include: {
            user: true,
            category: true,
        },
    });

    if (!application) notFound();

    return (
        <div className="space-y-5">
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
                            {application.fullName || application.user?.name || "Unnamed Applicant"}
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Submitted on {formatDate(application.createdAt)}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <ApplicationStatusBadge status={application.status} />
                        <PaymentStatusBadge status={application.paymentStatus} />
                    </div>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        <InfoCard title="Applicant Information">
                            <Info label="Full Name" value={application.fullName || application.user?.name} />
                            <Info label="Email Address" value={application.email || application.user?.email} />
                            <Info label="Phone Number" value={application.phone} />
                            <Info label="ID / Passport" value={application.idNumber} />
                        </InfoCard>

                        <InfoCard title="Membership Information">
                            <Info label="Category" value={application.category?.name} />
                            <Info label="Annual Fee" value={application.category ? `KES ${application.category.annualFee.toLocaleString()}` : null} />
                            <Info label="Qualification" value={application.qualification} />
                            <Info label="Institution / Employer" value={application.institution} />
                            <Info label="Position" value={application.position} />
                            <Info label="Experience" value={application.experience} />
                        </InfoCard>
                    </div>

                    <InfoCard title="Payment Information">
                        <div className="grid gap-4 md:grid-cols-3">
                            <Info label="Payment Status" value={application.paymentStatus} />
                            <Info label="Reference" value={application.paymentReference} />
                            <Info label="Submitted Date" value={formatDate(application.createdAt)} />
                        </div>
                    </InfoCard>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-black text-slate-950">
                            Decision
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Approve only after confirming payment and reviewing all documents.
                        </p>

                        {application.paymentStatus !== "PAID" ? (
                            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">
                                Payment is not confirmed. This application cannot be approved yet.
                            </div>
                        ) : (
                            <ApplicationDecisionButtons
                                applicationId={application.id}
                                status={application.status}
                            />
                        )}
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="border-b border-slate-200 pb-4">
                            <p className="text-sm font-black text-slate-500">
                                Document Review
                            </p>
                            <h3 className="mt-1 text-xl font-black text-slate-950">
                                Attached Documents
                            </h3>
                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Open each file in a new tab to verify the applicant’s details.
                            </p>
                        </div>

                        <div className="mt-5 space-y-3">
                            <DocumentItem
                                title="ID / Passport Copy"
                                description="Verify identity and ID number."
                                url={application.idDocumentUrl}
                            />

                            <DocumentItem
                                title="Qualification Certificate"
                                description="Verify qualification or professional certificate."
                                url={application.qualificationDocUrl}
                            />

                            <DocumentItem
                                title="CV / Professional Profile"
                                description="Review applicant experience and work history."
                                url={application.cvDocumentUrl}
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
                        <p className="text-sm font-semibold text-white/65">
                            Review Checklist
                        </p>

                        <div className="mt-4 space-y-3 text-sm font-semibold text-white/90">
                            <ChecklistItem text="Payment confirmed" checked={application.paymentStatus === "PAID"} />
                            <ChecklistItem text="Identity document uploaded" checked={!!application.idDocumentUrl} />
                            <ChecklistItem text="Qualification document uploaded" checked={!!application.qualificationDocUrl} />
                            <ChecklistItem text="CV uploaded" checked={!!application.cvDocumentUrl} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-black text-slate-950">{title}</h3>
            <div className="mt-5 space-y-4">{children}</div>
        </div>
    );
}

function Info({ label, value }: { label: string; value?: string | null }) {
    return (
        <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">
                {value || "Not provided"}
            </p>
        </div>
    );
}

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
                <div>
                    <p className="text-sm font-black text-slate-900">
                        {title}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                        {description}
                    </p>

                    <p className="mt-2 break-all text-[11px] text-slate-400">
                        {url || "Not uploaded"}
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${url
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                        }`}
                >
                    {url ? "Uploaded" : "Missing"}
                </span>
            </div>

            {url && (
                <div className="mt-4 flex gap-2">
                    <Link
                        href={url}
                        target="_blank"
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
            )}
        </div>
    );
}

function ChecklistItem({ text, checked }: { text: string; checked: boolean }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <span>{text}</span>
            <span
                className={`rounded-full px-2 py-1 text-[11px] font-black ${checked
                    ? "bg-green-500/20 text-green-200"
                    : "bg-red-500/20 text-red-200"
                    }`}
            >
                {checked ? "YES" : "NO"}
            </span>
        </div>
    );
}

function ApplicationStatusBadge({ status }: { status: string }) {
    const cls =
        status === "APPROVED"
            ? "bg-green-50 text-green-700"
            : status === "REJECTED"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-700";

    return (
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}>
            {status}
        </span>
    );
}

function PaymentStatusBadge({ status }: { status: string }) {
    const cls =
        status === "PAID"
            ? "bg-green-50 text-green-700"
            : status === "FAILED" || status === "CANCELLED"
                ? "bg-red-50 text-red-700"
                : "bg-slate-100 text-slate-600";

    return (
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${cls}`}>
            {status}
        </span>
    );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default async function CertificateDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const certificate = await prisma.certificate.findUnique({
        where: { id },
        include: {
            member: {
                include: {
                    user: true,
                    category: true,
                },
            },
        },
    });

    if (!certificate) notFound();

    const expired = certificate.expiryDate < new Date();

    return (
        <div className="space-y-5">
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
                            {certificate.certificateNumber}
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Issued to {certificate.member.fullName || certificate.member.user?.name || "Member"}
                        </p>
                    </div>

                    <CertificateStatusBadge expired={expired} />
                </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="rounded-[26px] border-4 border-[#111111] bg-white p-6">
                        <div className="border-b-4 border-[#C1121F] pb-5 text-center">
                            <p className="text-xs font-black tracking-[0.45em] text-[#C1121F]">
                                ASSOCIATION OF HOTEL PROFESSIONALS KENYA
                            </p>

                            <h2 className="mt-3 text-3xl font-black text-[#111111]">
                                Membership Certificate
                            </h2>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                Official digital certificate preview
                            </p>
                        </div>

                        <div className="py-10 text-center">
                            <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
                                This certifies that
                            </p>

                            <h3 className="mt-4 text-4xl font-black text-[#C1121F]">
                                {certificate.member.fullName || certificate.member.user?.name || "Member"}
                            </h3>

                            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600">
                                is a registered member of the Association of Hotel Professionals Kenya
                                under the category of{" "}
                                <span className="font-black text-[#111111]">
                                    {certificate.member.category?.name || "-"}
                                </span>.
                            </p>

                            <div className="mt-8 grid gap-4 md:grid-cols-3">
                                <PreviewInfo label="Member No." value={certificate.member.memberNumber} />
                                <PreviewInfo label="Certificate No." value={certificate.certificateNumber} />
                                <PreviewInfo label="Verification" value={certificate.verificationCode} />
                            </div>
                        </div>

                        <div className="grid gap-4 border-t border-slate-200 pt-5 md:grid-cols-2">
                            <PreviewInfo label="Issue Date" value={formatDate(certificate.issueDate)} />
                            <PreviewInfo label="Expiry Date" value={formatDate(certificate.expiryDate)} />
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <InfoCard title="Certificate Information">
                        <Info label="Certificate Number" value={certificate.certificateNumber} />
                        <Info label="Verification Code" value={certificate.verificationCode} />
                        <Info label="Issue Date" value={formatDate(certificate.issueDate)} />
                        <Info label="Expiry Date" value={formatDate(certificate.expiryDate)} />
                        <Info label="Certificate Status" value={expired ? "EXPIRED" : "VALID"} />
                    </InfoCard>

                    <InfoCard title="Member Information">
                        <Info label="Member Name" value={certificate.member.fullName || certificate.member.user?.name} />
                        <Info label="Member Number" value={certificate.member.memberNumber} />
                        <Info label="Email" value={certificate.member.email || certificate.member.user?.email} />
                        <Info label="Phone" value={certificate.member.phone} />
                        <Info label="Category" value={certificate.member.category?.name} />
                        <Info label="Membership Status" value={certificate.member.status} />
                    </InfoCard>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-black text-slate-950">
                            Certificate Actions
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Download, verify, or view the public certificate verification page.
                        </p>

                        <div className="mt-5 grid gap-3">
                            <Link
                                href={`/dashboard/certificates/${certificate.id}/download`}
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800"
                            >
                                <DownloadIcon />
                                Download Certificate PDF
                            </Link>

                            <Link
                                href={`/verify/${certificate.verificationCode}`}
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

function PreviewInfo({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="mt-1 break-all text-sm font-black text-slate-900">
                {value}
            </p>
        </div>
    );
}

function CertificateStatusBadge({ expired }: { expired: boolean }) {
    return (
        <span
            className={`w-fit rounded-full px-4 py-2 text-xs font-black ${expired
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
                }`}
        >
            {expired ? "EXPIRED" : "VALID"}
        </span>
    );
}

function DownloadIcon() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
        </svg>
    );
}

function VerifyIcon() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-5M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
        </svg>
    );
}
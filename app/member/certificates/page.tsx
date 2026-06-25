import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import { requireMemberSession } from "../session";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function MemberCertificatesPage() {
    const memberId = await requireMemberSession();

    const member = await prisma.member.findUnique({
        where: { id: memberId },
        include: {
            category: true,
            certificates: {
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!member) notFound();

    return (
        <MemberPortalShell member={member}>
            <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                    <p className="text-sm font-black text-slate-500">
                        Member Certificates
                    </p>

                    <h1 className="mt-1 text-3xl font-black text-slate-950">
                        My Certificates
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Download and verify your AHPK membership certificates.
                    </p>
                </div>

                <div className="grid gap-5">
                    {member.certificates.length === 0 ? (
                        <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500 shadow-xl">
                            No certificates found.
                        </div>
                    ) : (
                        member.certificates.map((cert) => {
                            const expired = cert.expiryDate < new Date();

                            return (
                                <div
                                    key={cert.id}
                                    className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl"
                                >
                                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                        <div>
                                            <p className="text-sm font-black text-slate-500">
                                                Certificate Number
                                            </p>

                                            <h2 className="mt-1 text-2xl font-black text-slate-950">
                                                {cert.certificateNumber}
                                            </h2>

                                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                                Verification: {cert.verificationCode}
                                            </p>
                                        </div>

                                        <span
                                            className={`w-fit rounded-full px-4 py-2 text-xs font-black ${expired
                                                ? "bg-red-50 text-red-700"
                                                : "bg-green-50 text-green-700"
                                                }`}
                                        >
                                            {expired ? "EXPIRED" : "VALID"}
                                        </span>
                                    </div>

                                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                                        <Info label="Issue Date" value={formatDate(cert.issueDate)} />
                                        <Info label="Expiry Date" value={formatDate(cert.expiryDate)} />
                                        <Info label="Member No." value={member.memberNumber} />
                                    </div>

                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <Link
                                            href={`/dashboard/certificates/${cert.id}/download`}
                                            className="rounded-xl bg-[#C1121F] px-5 py-3 text-center text-sm font-black text-white hover:bg-red-800"
                                        >
                                            Download PDF
                                        </Link>

                                        <Link
                                            href={`/verify/${cert.verificationCode}`}
                                            className="rounded-xl bg-[#111111] px-5 py-3 text-center text-sm font-black text-white hover:bg-black"
                                        >
                                            Verify Certificate
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </MemberPortalShell>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="mt-1 text-sm font-black text-slate-900">
                {value}
            </p>
        </div>
    );
}
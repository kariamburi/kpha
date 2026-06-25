import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Logo from "@/app/assets/logo.png";
function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function VerifyCertificatePage({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await params;

    const certificate = await prisma.certificate.findUnique({
        where: { verificationCode: code },
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
        redirect(`/verify?code=${encodeURIComponent(code)}`);
    }

    const expired = certificate.expiryDate < new Date();

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="bg-[#111111] px-4 py-10 text-white">
                <div className="mx-auto max-w-5xl">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2">
                            <Image
                                src={Logo}
                                alt="AHPK Logo"
                                width={52}
                                height={52}
                                className="object-contain"
                                priority
                            />
                        </div>

                        <div>
                            <p className="text-xs font-black tracking-[0.35em] text-[#F3C64E]">
                                AHPK CERTIFICATE VERIFICATION
                            </p>
                            <h1 className="mt-1 text-3xl font-black">
                                Official Verification Result
                            </h1>
                            <p className="mt-2 text-sm font-semibold text-white/70">
                                Association of Hotel Professionals Kenya
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto -mt-8 max-w-5xl px-4 pb-12">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl md:p-8">
                    <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-center">
                        <div>
                            <p className="text-sm font-black text-slate-500">
                                Verification Code
                            </p>
                            <h2 className="mt-1 break-all font-mono text-2xl font-black text-[#C1121F]">
                                {certificate.verificationCode}
                            </h2>
                        </div>

                        <div
                            className={`w-fit rounded-full px-5 py-2 text-sm font-black ${expired
                                ? "bg-red-50 text-red-700"
                                : "bg-green-50 text-green-700"
                                }`}
                        >
                            {expired ? "EXPIRED CERTIFICATE" : "VALID CERTIFICATE"}
                        </div>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                                Certificate Holder
                            </p>

                            <h3 className="mt-3 text-3xl font-black text-slate-950">
                                {certificate.member.fullName ||
                                    certificate.member.user?.name ||
                                    "Member"}
                            </h3>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                This certificate record was found in the AHPK membership database.
                            </p>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <Info label="Certificate Number" value={certificate.certificateNumber} />
                                <Info label="Member Number" value={certificate.member.memberNumber} />
                                <Info label="Membership Category" value={certificate.member.category?.name} />
                                <Info label="Membership Status" value={certificate.member.status} />
                                <Info label="Issue Date" value={formatDate(certificate.issueDate)} />
                                <Info label="Expiry Date" value={formatDate(certificate.expiryDate)} />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="rounded-2xl bg-[#111111] p-6 text-white">
                                <p className="text-sm font-semibold text-white/60">
                                    Authenticity Confirmation
                                </p>

                                <h3 className="mt-2 text-2xl font-black">
                                    {expired ? "Certificate Expired" : "Certificate Verified"}
                                </h3>

                                <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
                                    {expired
                                        ? "This certificate exists in AHPK records but is past its expiry date."
                                        : "This certificate is active and matches the official AHPK verification records."}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                                <p className="text-sm font-black text-slate-500">
                                    Important Notice
                                </p>

                                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                                    Always confirm that the certificate number, verification code,
                                    member name, and expiry date match the document presented to you.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs font-semibold text-slate-500">
                            Verified through AHPK digital membership records.
                        </p>

                        <Link
                            href="/"
                            className="rounded-xl bg-[#C1121F] px-5 py-3 text-center text-sm font-black text-white hover:bg-red-800"
                        >
                            Back to Website
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function Info({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="mt-1 text-sm font-black text-slate-900">
                {value || "Not provided"}
            </p>
        </div>
    );
}
import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";

import Logo from "@/app/assets/logo.png";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function ApplicationSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{
        applicationId?: string;
    }>;
}) {
    const { applicationId } =
        await searchParams;

    if (!applicationId) {
        return (
            <SuccessError message="Application reference missing." />
        );
    }

    const application =
        await prisma.membershipApplication.findUnique({
            where: {
                id: applicationId,
            },

            include: {
                category: true,
            },
        });

    if (!application) {
        return (
            <SuccessError message="Application not found." />
        );
    }

    /*
     * This success route is intended for
     * completed free applications.
     */
    if (
        application.paymentStatus !==
        "PAID"
    ) {
        return (
            <SuccessError message="This application has not been completed yet." />
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* HEADER */}
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
                                AHPK MEMBERSHIP
                            </p>

                            <h1 className="mt-1 text-3xl font-black">
                                Application Submitted
                            </h1>

                            <p className="mt-2 text-sm font-semibold text-white/70">
                                Your application has
                                been received
                                successfully.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="mx-auto -mt-8 max-w-5xl px-4 pb-12">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl md:p-8">
                    <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-center">
                        <div>
                            <p className="text-sm font-black text-slate-500">
                                Applicant
                            </p>

                            <h2 className="mt-1 text-3xl font-black text-slate-950">
                                {application.fullName ||
                                    "Applicant"}
                            </h2>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                Your AHPK membership
                                application has been
                                submitted for
                                Secretariat review.
                            </p>
                        </div>

                        <div className="w-fit rounded-full bg-green-50 px-5 py-2 text-sm font-black text-green-700">
                            APPLICATION RECEIVED
                        </div>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                        {/* SUMMARY */}
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                                Application Summary
                            </p>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <Info
                                    label="Application Status"
                                    value={
                                        application.status
                                    }
                                />

                                <Info
                                    label="Membership Category"
                                    value={
                                        application.category
                                            ?.name ||
                                        "-"
                                    }
                                />

                                <Info
                                    label="Qualification"
                                    value={
                                        application.qualification ||
                                        "-"
                                    }
                                />

                                <Info
                                    label="Institution"
                                    value={
                                        application.institution ||
                                        "-"
                                    }
                                />

                                <Info
                                    label="Current Position"
                                    value={
                                        application.position ||
                                        "-"
                                    }
                                />

                                <Info
                                    label="Current Employer"
                                    value={
                                        application.employer ||
                                        "-"
                                    }
                                />

                                <Info
                                    label="Data Protection Consent"
                                    value={
                                        application.dataProtectionConsent
                                            ? "Provided"
                                            : "Not provided"
                                    }
                                />

                                <Info
                                    label="Submitted Date"
                                    value={formatDate(
                                        application.updatedAt,
                                    )}
                                />
                            </div>

                            {application.experience ? (
                                <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                                    <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                                        Professional Experience
                                    </p>

                                    <p className="mt-2 whitespace-pre-line text-sm font-semibold leading-6 text-slate-700">
                                        {
                                            application.experience
                                        }
                                    </p>
                                </div>
                            ) : null}
                        </div>

                        {/* NEXT STEPS */}
                        <div className="space-y-5">
                            <div className="rounded-2xl bg-[#111111] p-6 text-white">
                                <p className="text-sm font-semibold text-white/60">
                                    What Happens Next?
                                </p>

                                <h3 className="mt-2 text-2xl font-black">
                                    Secretariat Review
                                </h3>

                                <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
                                    The AHPK Secretariat
                                    will review your
                                    documents,
                                    educational details,
                                    current employment
                                    and professional
                                    experience.
                                </p>

                                <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
                                    You will be notified
                                    after the application
                                    has been approved or
                                    if additional
                                    information is
                                    required.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                                <p className="text-sm font-black text-slate-500">
                                    Application Reference
                                </p>

                                <p className="mt-2 break-all font-mono text-lg font-black text-[#C1121F]">
                                    {
                                        application.id
                                    }
                                </p>

                                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                                    Keep this reference
                                    for any follow-up
                                    with the AHPK
                                    Secretariat.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
                        <p className="text-xs font-semibold text-slate-500">
                            Your application is now
                            awaiting official review.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/apply"
                                className="rounded-xl border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-700 hover:bg-slate-50"
                            >
                                New Application
                            </Link>

                            <Link
                                href="/"
                                className="rounded-xl bg-[#C1121F] px-5 py-3 text-center text-sm font-black text-white hover:bg-red-800"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function SuccessError({
    message,
}: {
    message: string;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
                    !
                </div>

                <h1 className="mt-5 text-3xl font-black text-slate-950">
                    Application Not Available
                </h1>

                <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                    {message}
                </p>

                <Link
                    href="/apply"
                    className="mt-6 inline-flex rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800"
                >
                    Return to Application
                </Link>
            </div>
        </main>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-black text-slate-900">
                {value}
            </p>
        </div>
    );
}
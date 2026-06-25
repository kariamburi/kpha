import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import Logo from "@/app/assets/logo.png";
import { createAuditLog } from "@/lib/audit";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function PaymentCallbackPage({
    searchParams,
}: {
    searchParams: Promise<{ reference?: string }>;
}) {
    const { reference } = await searchParams;

    if (!reference) {
        return <PaymentResult message="Payment reference missing." />;
    }

    const verifyRes = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
            cache: "no-store",
        }
    );

    const data = await verifyRes.json();

    if (!verifyRes.ok || !data.status || data.data.status !== "success") {
        return <PaymentResult message="Payment could not be verified." />;
    }

    const applicationId = data.data.metadata?.applicationId;

    if (!applicationId) {
        return <PaymentResult message="Application reference missing." />;
    }

    const existingApplication = await prisma.membershipApplication.findUnique({
        where: { id: applicationId },
        include: { category: true },
    });

    if (!existingApplication) {
        return <PaymentResult message="Application not found." />;
    }

    const alreadyPaid = existingApplication.paymentStatus === "PAID";

    const application = alreadyPaid
        ? existingApplication
        : await prisma.membershipApplication.update({
            where: { id: applicationId },
            data: {
                paymentStatus: "PAID",
                paymentReference: reference,
            },
            include: {
                category: true,
            },
        });

    if (!alreadyPaid) {
        await createAuditLog({
            action: "APPLICATION_PAYMENT_CONFIRMED",
            entityType: "MembershipApplication",
            entityId: application.id,
            metadata: {
                paymentReference: reference,
                applicantName: application.fullName,
                applicantEmail: application.email,
                category: application.category?.name,
                amount: application.category?.annualFee || 0,
            },
        });
    }
    if (!alreadyPaid && application.email) {
        await sendMail({
            to: application.email,
            subject: "AHPK Membership Application Submitted",
            html: `
                <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
                    <h2 style="color:#C1121F;">Application Submitted Successfully</h2>
                    <p>Dear ${application.fullName || "Applicant"},</p>
                    <p>Your payment has been confirmed and your AHPK membership application is now awaiting review.</p>
                    <table style="border-collapse:collapse;width:100%;margin-top:16px;">
                        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Application Status</td><td style="padding:8px;border:1px solid #eee;">${application.status}</td></tr>
                        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Payment Status</td><td style="padding:8px;border:1px solid #eee;">${application.paymentStatus}</td></tr>
                        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Membership Category</td><td style="padding:8px;border:1px solid #eee;">${application.category?.name || "-"}</td></tr>
                        <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;">Payment Reference</td><td style="padding:8px;border:1px solid #eee;">${reference}</td></tr>
                    </table>
                    <p style="margin-top:16px;">The AHPK Secretariat will review your application and notify you after approval.</p>
                    <p>Regards,<br/>AHPK Secretariat</p>
                </div>
            `,
        });
    }

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
                                AHPK MEMBERSHIP
                            </p>

                            <h1 className="mt-1 text-3xl font-black">
                                Application Submitted
                            </h1>

                            <p className="mt-2 text-sm font-semibold text-white/70">
                                Payment confirmed and application received.
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
                                Applicant
                            </p>

                            <h2 className="mt-1 text-3xl font-black text-slate-950">
                                {application.fullName || "Applicant"}
                            </h2>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                Your application has been successfully submitted for review.
                            </p>
                        </div>

                        <div className="w-fit rounded-full bg-green-50 px-5 py-2 text-sm font-black text-green-700">
                            PAYMENT CONFIRMED
                        </div>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                                Application Summary
                            </p>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <Info label="Application Status" value={application.status} />
                                <Info label="Payment Status" value={application.paymentStatus} />
                                <Info label="Membership Category" value={application.category?.name || "-"} />
                                <Info
                                    label="Amount Paid"
                                    value={`KES ${(application.category?.annualFee || 0).toLocaleString()}`}
                                />
                                <Info label="Payment Reference" value={reference} />
                                <Info label="Submitted Date" value={formatDate(application.updatedAt)} />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="rounded-2xl bg-[#111111] p-6 text-white">
                                <p className="text-sm font-semibold text-white/60">
                                    What Happens Next?
                                </p>

                                <h3 className="mt-2 text-2xl font-black">
                                    Secretariat Review
                                </h3>

                                <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
                                    The AHPK Secretariat will review your documents and membership details.
                                    You will be notified after approval.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                                <p className="text-sm font-black text-slate-500">
                                    Reference Number
                                </p>

                                <p className="mt-2 break-all font-mono text-lg font-black text-[#C1121F]">
                                    {reference}
                                </p>

                                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                                    Keep this reference for payment follow-up and support.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
                        <p className="text-xs font-semibold text-slate-500">
                            A confirmation email has been sent if your email address was provided.
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

function PaymentResult({ message }: { message: string }) {
    return (
        <main className="min-h-screen bg-slate-50">
            <section className="bg-[#111111] px-4 py-10 text-white">
                <div className="mx-auto max-w-3xl">
                    <p className="text-xs font-black tracking-[0.35em] text-[#F3C64E]">
                        AHPK MEMBERSHIP
                    </p>

                    <h1 className="mt-2 text-3xl font-black">
                        Payment Verification Failed
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-white/70">
                        We could not confirm this payment.
                    </p>
                </div>
            </section>

            <section className="mx-auto -mt-8 max-w-3xl px-4 pb-12">
                <div className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">
                        ❌
                    </div>

                    <h2 className="mt-5 text-3xl font-black text-slate-950">
                        Verification Failed
                    </h2>

                    <p className="mt-3 text-sm font-semibold text-slate-500">
                        {message}
                    </p>

                    <Link
                        href="/apply"
                        className="mt-6 inline-flex rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800"
                    >
                        Try Again
                    </Link>
                </div>
            </section>
        </main>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className="mt-1 break-all text-sm font-black text-slate-900">
                {value}
            </p>
        </div>
    );
}
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

type Props = {
    searchParams?: Promise<{
        reference?: string;
    }>;
};

function addOneYear(date: Date) {
    const next = new Date(date);
    next.setFullYear(next.getFullYear() + 1);
    return next;
}

async function generateCertificateNumber() {
    const year = new Date().getFullYear();
    const count = await prisma.certificate.count();

    return `CERT-${year}-${String(count + 1).padStart(5, "0")}`;
}

function generateVerificationCode() {
    return `AHPK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export default async function RenewalCallbackPage({ searchParams }: Props) {
    const params = await searchParams;
    const reference = params?.reference;

    if (!reference) {
        redirect("/member/renewal?error=missing-reference");
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
        throw new Error("PAYSTACK_SECRET_KEY is missing.");
    }

    const verifyRes = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
            headers: {
                Authorization: `Bearer ${secretKey}`,
            },
            cache: "no-store",
        }
    );

    const data = await verifyRes.json();

    if (!verifyRes.ok || !data.status || data.data.status !== "success") {
        redirect("/member/renewal?error=payment-not-successful");
    }

    const memberId = data.data.metadata?.memberId as string | undefined;

    if (!memberId) {
        redirect("/member/renewal?error=missing-member");
    }

    const existingPayment = await prisma.payment.findFirst({
        where: {
            reference,
            status: "PAID",
        },
    });

    if (existingPayment) {
        redirect("/member/dashboard");
    }

    const member = await prisma.member.findUnique({
        where: { id: memberId },
        include: { category: true },
    });

    if (!member) {
        redirect("/member/renewal?error=member-not-found");
    }

    const today = new Date();
    const baseDate = member.expiryDate > today ? member.expiryDate : today;
    const newExpiryDate = addOneYear(baseDate);

    const certificateNumber = await generateCertificateNumber();
    const verificationCode = generateVerificationCode();
    const amount = Number(data.data.amount || 0) / 100;

    const result = await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.create({
            data: {
                memberId: member.id,
                amount,
                method: "PAYSTACK",
                reference,
                status: "PAID",
                paidAt: new Date(),
            },
        });

        const updatedMember = await tx.member.update({
            where: { id: member.id },
            data: {
                expiryDate: newExpiryDate,
                status: "ACTIVE",
            },
        });

        const certificate = await tx.certificate.create({
            data: {
                memberId: member.id,
                certificateNumber,
                issueDate: new Date(),
                expiryDate: newExpiryDate,
                verificationCode,
            },
        });

        return { payment, updatedMember, certificate };
    });

    await createAuditLog({
        action: "MEMBERSHIP_RENEWED",
        entityType: "Member",
        entityId: member.id,
        metadata: {
            paymentId: result.payment.id,
            paymentReference: reference,
            amount,
            oldExpiryDate: member.expiryDate,
            newExpiryDate: result.updatedMember.expiryDate,
            certificateId: result.certificate.id,
            certificateNumber: result.certificate.certificateNumber,
        },
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="max-w-lg rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                    ✓
                </div>

                <h1 className="mt-6 text-3xl font-black text-slate-950">
                    Renewal Successful
                </h1>

                <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                    Your AHPK membership has been renewed successfully and a new
                    certificate has been generated.
                </p>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-left text-sm">
                    <p>
                        <strong>Reference:</strong> {reference}
                    </p>
                    <p>
                        <strong>New Expiry Date:</strong>{" "}
                        {newExpiryDate.toLocaleDateString("en-KE")}
                    </p>
                    <p>
                        <strong>Certificate No:</strong>{" "}
                        {result.certificate.certificateNumber}
                    </p>
                </div>

                <Link
                    href="/member/dashboard"
                    className="mt-6 block rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800"
                >
                    Go to Dashboard
                </Link>
            </div>
        </main>
    );
}
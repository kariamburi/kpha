import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import RenewalButton from "./RenewalButton";
import { requireMemberSession } from "../session";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function MemberRenewalPage() {
    const memberId = await requireMemberSession();

    const member = await prisma.member.findUnique({
        where: { id: memberId },
        include: {
            category: true,
        },
    });

    if (!member) notFound();

    const today = new Date();
    const expired = member.expiryDate < today;

    const renewalOpenDate = new Date(member.expiryDate);
    renewalOpenDate.setDate(renewalOpenDate.getDate() - 30);

    const canRenew = today >= renewalOpenDate;

    return (
        <MemberPortalShell member={member}>
            <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                    <p className="text-sm font-black text-slate-500">
                        Membership Renewal
                    </p>

                    <h1 className="mt-1 text-3xl font-black text-slate-950">
                        Renew Membership
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Extend your AHPK membership for another year.
                    </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                        <div className="border-b border-slate-200 pb-5">
                            <h2 className="text-xl font-black text-slate-950">
                                Renewal Summary
                            </h2>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Confirm your details before proceeding to payment.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <Info label="Member Name" value={member.fullName || "-"} />
                            <Info label="Member Number" value={member.memberNumber} />
                            <Info label="Category" value={member.category.name} />
                            <Info label="Current Status" value={expired ? "EXPIRED" : member.status} />
                            <Info label="Current Expiry Date" value={formatDate(member.expiryDate)} />
                            <Info
                                label="Renewal Amount"
                                value={`KES ${member.category.annualFee.toLocaleString()}`}
                            />
                        </div>

                        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                            <p className="text-sm font-bold text-slate-600">
                                {canRenew
                                    ? "After successful payment, your membership will be extended by one year and a new certificate will be generated."
                                    : "Renewal opens 30 days before your membership expiry date."}
                            </p>
                        </div>
                    </div>

                    <aside className="rounded-[28px] bg-[#111111] p-6 text-white shadow-xl">
                        <p className="text-sm font-semibold text-white/60">
                            Amount Payable
                        </p>

                        <h2 className="mt-2 text-4xl font-black">
                            KES {member.category.annualFee.toLocaleString()}
                        </h2>

                        <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
                            Payment is securely processed via Paystack.
                        </p>

                        {canRenew ? (
                            <RenewalButton memberId={member.id} />
                        ) : (
                            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                                Renewal is not available yet. You can renew from{" "}
                                {formatDate(renewalOpenDate)}.
                            </div>
                        )}
                    </aside>
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

            <p className="mt-1 break-all text-sm font-black text-slate-900">
                {value}
            </p>
        </div>
    );
}
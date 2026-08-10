import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import RenewalButton from "./RenewalButton";
import { requireMemberSession } from "../session";
import {
    BadgeCheck,
    CalendarClock,
    CalendarDays,
    CreditCard,
    Hash,
    RefreshCw,
    ShieldCheck,
    User,
    Wallet,
} from "lucide-react";

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
    const renewalYear =
        member.expiryDate >= today
            ? member.expiryDate.getFullYear() + 1
            : today.getFullYear();

    const renewalValidFrom =
        new Date(renewalYear, 0, 1);

    const renewalValidTo =
        new Date(
            renewalYear,
            11,
            31,
            23,
            59,
            59,
            999
        );
    return (
        <MemberPortalShell member={member}>
            <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                            <RefreshCw className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#C1121F]">
                                Membership Renewal
                            </p>

                            <h1 className="mt-1 text-3xl font-black text-slate-950">
                                Renew Membership
                            </h1>

                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                Renew your AHPK membership for the next applicable calendar year.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                <ShieldCheck className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-xl font-black text-slate-950">
                                    Renewal Summary
                                </h2>

                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    Confirm your details before proceeding to payment.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <Info icon={User} label="Member Name" value={member.fullName || "-"} />
                            <Info icon={Hash} label="Member Number" value={member.memberNumber} />
                            <Info icon={BadgeCheck} label="Category" value={member.category.name} />
                            <Info icon={ShieldCheck} label="Current Status" value={expired ? "EXPIRED" : member.status} />
                            <Info icon={CalendarDays} label="Current Expiry Date" value={formatDate(member.expiryDate)} />
                            <Info
                                icon={CalendarDays}
                                label="Renewal Year"
                                value={String(renewalYear)}
                            />

                            <Info
                                icon={CalendarDays}
                                label="New Validity Period"
                                value={`${formatDate(renewalValidFrom)} - ${formatDate(
                                    renewalValidTo
                                )}`}
                            />
                            <Info
                                icon={Wallet}
                                label="Renewal Amount"
                                value={`KES ${member.category.annualFee.toLocaleString()}`}
                            />

                        </div>

                        <div
                            className={`mt-6 flex gap-3 rounded-2xl p-5 ${canRenew
                                ? "bg-green-50 text-green-800"
                                : "bg-amber-50 text-amber-800"
                                }`}
                        >
                            <CalendarClock className="mt-0.5 h-5 w-5 shrink-0" />
                            <p className="text-sm font-bold leading-6">
                                {canRenew
                                    ? "After successful payment, your membership will be renewed for the applicable calendar year and a new certificate valid from 1 January to 31 December will be generated."
                                    : "Renewal opens 30 days before your membership expiry date."}
                            </p>
                        </div>
                    </div>

                    <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                            <CreditCard className="h-6 w-6" />
                        </div>

                        <p className="mt-5 text-sm font-semibold text-slate-500">
                            Amount Payable
                        </p>

                        <h2 className="mt-2 text-4xl font-black text-slate-950">
                            KES {member.category.annualFee.toLocaleString()}
                        </h2>

                        <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                            Payment is securely processed via Paystack.
                        </p>

                        {canRenew ? (
                            <RenewalButton memberId={member.id} />
                        ) : (
                            <div className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
                                <CalendarClock className="h-5 w-5 shrink-0" />
                                <span>
                                    Renewal is not available yet. You can renew from{" "}
                                    {formatDate(renewalOpenDate)}.
                                </span>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </MemberPortalShell>
    );
}

function Info({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#C1121F] shadow-sm">
                <Icon className="h-4 w-4" />
            </div>

            <div>
                <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                    {label}
                </p>

                <p className="mt-1 break-all text-sm font-black text-slate-900">
                    {value}
                </p>
            </div>
        </div>
    );
}
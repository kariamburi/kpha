import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import { requireMemberSession } from "../session";
import { updateMemberDirectoryProfile } from "./actions";

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function daysUntil(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(date);
    target.setHours(0, 0, 0, 0);

    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default async function MemberProfilePage() {
    const memberId = await requireMemberSession();

    const member = await prisma.member.findUnique({
        where: { id: memberId },
        include: {
            category: true,
        },
    });

    if (!member) notFound();

    const daysLeft = daysUntil(member.expiryDate);
    const expired = daysLeft < 0;

    return (
        <MemberPortalShell member={member}>
            <div className="space-y-5">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                    <p className="text-sm font-black text-slate-500">Member Profile</p>

                    <h1 className="mt-1 text-3xl font-black text-slate-950">
                        Personal Information
                    </h1>

                    <p className="mt-2 text-sm font-semibold text-slate-500">
                        Your registered AHPK membership details.
                    </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                        <div className="border-b border-slate-200 pb-5">
                            <h2 className="text-xl font-black text-slate-950">
                                Contact Details
                            </h2>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <Info label="Full Name" value={member.fullName || "-"} />
                            <Info label="Email Address" value={member.email || "-"} />
                            <Info label="Phone Number" value={member.phone || "-"} />
                            <Info label="Member Number" value={member.memberNumber} />
                        </div>
                    </div>

                    <div className="rounded-[28px] bg-[#111111] p-6 text-white shadow-xl">
                        <p className="text-sm font-semibold text-white/60">
                            Membership Status
                        </p>

                        <h2 className="mt-2 text-3xl font-black">
                            {expired ? "Expired" : member.status}
                        </h2>

                        <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
                            {expired
                                ? "Your membership has expired."
                                : `Your membership is valid until ${formatDate(member.expiryDate)}.`}
                        </p>

                        <Link
                            href="/member/renewal"
                            className="mt-6 flex w-full justify-center rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800"
                        >
                            Renew Membership
                        </Link>
                    </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
                    <div className="border-b border-slate-200 pb-5">
                        <h2 className="text-xl font-black text-slate-950">
                            Membership Details
                        </h2>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-4">
                        <Info label="Category" value={member.category.name} />
                        <Info label="Join Date" value={formatDate(member.joinDate)} />
                        <Info label="Expiry Date" value={formatDate(member.expiryDate)} />
                        <Info
                            label="Days Left"
                            value={
                                expired
                                    ? "Expired"
                                    : `${daysLeft} day${daysLeft === 1 ? "" : "s"}`
                            }
                        />
                    </div>
                </div>

                <form
                    action={updateMemberDirectoryProfile}
                    className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl"
                >
                    <div className="border-b border-slate-200 pb-5">
                        <h2 className="text-xl font-black text-slate-950">
                            Public Directory Profile
                        </h2>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Manage the details shown in the public AHPK member directory.
                        </p>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div>
                            <label className="text-xs font-black uppercase text-slate-500">
                                County
                            </label>
                            <input
                                name="county"
                                defaultValue={member.county || ""}
                                placeholder="Example: Nairobi"
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase text-slate-500">
                                Position
                            </label>
                            <input
                                name="position"
                                defaultValue={member.position || ""}
                                placeholder="Example: Hotel Manager"
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-black uppercase text-slate-500">
                                Employer
                            </label>
                            <input
                                name="employer"
                                defaultValue={member.employer || ""}
                                placeholder="Example: Serena Hotels"
                                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    <label className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700">
                        <input
                            name="isDirectoryVisible"
                            type="checkbox"
                            defaultChecked={member.isDirectoryVisible}
                            className="h-4 w-4"
                        />
                        Show my profile in the public member directory
                    </label>

                    <button
                        type="submit"
                        className="mt-6 cursor-pointer rounded-2xl bg-[#C1121F] px-6 py-3 text-sm font-black text-white hover:bg-red-800"
                    >
                        Save Directory Profile
                    </button>
                </form>
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
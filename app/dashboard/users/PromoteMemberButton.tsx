"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

type MemberItem = {
    id: string;
    fullName: string | null;
    email: string | null;
    phone: string | null;
    memberNumber: string;
    adminRole: string | null;
    adminStatus: string;
    category: {
        name: string;
    };
};

export default function PromoteMemberButton({
    members,
    updateMemberAdminAccess,
}: {
    members: MemberItem[];
    updateMemberAdminAccess: (formData: FormData) => Promise<void>;
}) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);

    const filteredMembers = useMemo(() => {
        const query = q.toLowerCase().trim();

        if (!query) return members.slice(0, 8);

        return members
            .filter((member) => {
                return (
                    member.fullName?.toLowerCase().includes(query) ||
                    member.email?.toLowerCase().includes(query) ||
                    member.phone?.toLowerCase().includes(query) ||
                    member.memberNumber.toLowerCase().includes(query)
                );
            })
            .slice(0, 10);
    }, [members, q]);

    function closeModal() {
        setOpen(false);
        setQ("");
        setSelectedMember(null);
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-900/20 transition hover:-translate-y-0.5 hover:bg-red-800"
            >
                + Promote Member
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between bg-[#111111] px-6 py-5 text-white">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F3C64E]">
                                    Super Admin
                                </p>
                                <h2 className="mt-1 text-2xl font-black">
                                    Promote Member to Admin
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-white/10 text-2xl font-black transition hover:bg-white/20"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            <input
                                value={q}
                                onChange={(e) => {
                                    setQ(e.target.value);
                                    setSelectedMember(null);
                                }}
                                placeholder="Search by name, phone, email or member number..."
                                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                            />

                            <div className="mt-4 max-h-64 overflow-y-auto rounded-2xl border border-slate-200">
                                {filteredMembers.length === 0 ? (
                                    <p className="p-5 text-sm font-semibold text-slate-500">
                                        No matching member found.
                                    </p>
                                ) : (
                                    filteredMembers.map((member) => (
                                        <button
                                            key={member.id}
                                            type="button"
                                            onClick={() => setSelectedMember(member)}
                                            className={`flex w-full cursor-pointer items-start justify-between gap-4 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-red-50 ${selectedMember?.id === member.id
                                                ? "bg-red-50"
                                                : "bg-white"
                                                }`}
                                        >
                                            <div>
                                                <p className="text-sm font-black text-slate-950">
                                                    {member.fullName || "AHPK Member"}
                                                </p>
                                                <p className="mt-1 text-xs font-semibold text-slate-500">
                                                    {member.email || "-"} • {member.phone || "-"}
                                                </p>
                                                <p className="mt-1 text-xs font-bold text-[#C1121F]">
                                                    {member.memberNumber} • {member.category.name}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black text-slate-600">
                                                Select
                                            </span>
                                        </button>
                                    ))
                                )}
                            </div>

                            {selectedMember && (
                                <form
                                    action={async (formData) => {
                                        await updateMemberAdminAccess(formData);
                                        closeModal();
                                    }}
                                    className="mt-5 rounded-2xl bg-slate-50 p-5"
                                >
                                    <input type="hidden" name="id" value={selectedMember.id} />
                                    <input type="hidden" name="adminStatus" value="ACTIVE" />

                                    <p className="text-sm font-black text-slate-950">
                                        Promote {selectedMember.fullName || selectedMember.memberNumber}
                                    </p>

                                    <label className="mt-4 block">
                                        <span className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                                            Admin Role
                                        </span>

                                        <select
                                            name="adminRole"
                                            defaultValue="ADMIN"
                                            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-black outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                                        >
                                            <option value="ADMIN">ADMIN</option>
                                            <option value="FINANCE">FINANCE</option>
                                            <option value="SUPER_ADMIN">SUPER ADMIN</option>
                                        </select>
                                    </label>

                                    <div className="mt-5 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="cursor-pointer rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-white"
                                        >
                                            Cancel
                                        </button>

                                        <PromoteButton />
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function PromoteButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-6 py-3 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
            {pending && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {pending ? "Promoting..." : "Promote Member"}
        </button>
    );
}
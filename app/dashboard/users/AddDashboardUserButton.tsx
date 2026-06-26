"use client";

import { useState } from "react";

export default function AddDashboardUserButton({
    createDashboardUser,
}: {
    createDashboardUser: (formData: FormData) => Promise<void>;
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-900/20 transition hover:-translate-y-0.5 hover:bg-red-800"
            >
                + Add Dashboard User
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between bg-[#111111] px-6 py-5 text-white">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#F3C64E]">
                                    Super Admin
                                </p>
                                <h2 className="mt-1 text-2xl font-black">
                                    Add Dashboard User
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-white/10 text-2xl font-black transition hover:bg-white/20"
                            >
                                ×
                            </button>
                        </div>

                        <form
                            action={async (formData) => {
                                await createDashboardUser(formData);
                                setOpen(false);
                            }}
                            className="grid gap-4 p-6 md:grid-cols-2"
                        >
                            <Field label="Full Name">
                                <input
                                    name="name"
                                    required
                                    placeholder="e.g. Robert Kinyua"
                                    className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                                />
                            </Field>

                            <Field label="Email Address">
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="user@ahpk.or.ke"
                                    className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                                />
                            </Field>

                            <Field label="Phone Number">
                                <input
                                    name="phone"
                                    placeholder="Optional"
                                    className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                                />
                            </Field>

                            <Field label="Role">
                                <select
                                    name="role"
                                    defaultValue="ADMIN"
                                    className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-black outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                                >
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="FINANCE">FINANCE</option>
                                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                                </select>
                            </Field>

                            <div className="md:col-span-2">
                                <Field label="Temporary Password">
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="Enter temporary password"
                                        className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                                    />
                                </Field>
                            </div>

                            <div className="mt-2 flex justify-end gap-3 md:col-span-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="cursor-pointer rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button className="cursor-pointer rounded-2xl bg-[#C1121F] px-6 py-3 text-sm font-black text-white transition hover:bg-red-800">
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                {label}
            </span>
            {children}
        </label>
    );
}
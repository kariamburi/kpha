"use client";

import { useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import {
    addMemberWorkExperience,
    deleteMemberWorkExperience,
} from "./actions";

function formatDate(date?: Date | null) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default function WorkExperienceModal({
    workExperiences,
}: {
    workExperiences: {
        id: string;
        company: string | null;
        position: string | null;
        year: string | null;
        startDate: Date | null;
        endDate: Date | null;
    }[];
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex cursor-pointer h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-[#C1121F]"
            >
                <Pencil className="h-4 w-4" />
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                            <div>
                                <h2 className="text-2xl font-black text-slate-950">
                                    Work Experience
                                </h2>
                                <p className="text-sm font-semibold text-slate-500">
                                    Add multiple work history records.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-[#C1121F]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            <form
                                action={async (formData) => {
                                    await addMemberWorkExperience(formData);
                                    setOpen(false);
                                }}

                                className="grid gap-4 md:grid-cols-2">
                                <Input name="company" label="Company / Institution" placeholder="Company name" />
                                <Input name="position" label="Position" placeholder="Job title" />
                                <Input name="year" label="Year" placeholder="2020" />
                                <Input name="startDate" label="Start Date" type="date" />
                                <Input name="endDate" label="End Date" type="date" />

                                <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800 md:col-span-2">
                                    <Plus className="h-4 w-4" />
                                    Add Work Experience
                                </button>
                            </form>

                            <div className="mt-6 space-y-3">
                                {workExperiences.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                    >
                                        <div>
                                            <p className="font-black text-slate-950">
                                                {item.position || "-"}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                                {item.company || "-"} • {item.year || "-"}
                                            </p>
                                            <p className="mt-1 text-xs font-bold text-slate-400">
                                                {formatDate(item.startDate)} to{" "}
                                                {item.endDate ? formatDate(item.endDate) : "Present"}
                                            </p>
                                        </div>

                                        <form action={deleteMemberWorkExperience}>
                                            <input type="hidden" name="id" value={item.id} />
                                            <button className="text-sm cursor-pointer font-black text-[#C1121F]">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                ))}

                                {workExperiences.length === 0 && (
                                    <p className="rounded-2xl bg-slate-50 p-5 text-center text-sm font-semibold text-slate-500">
                                        No work experience records added yet.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function Input({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div>
            <label className="text-xs font-black uppercase text-slate-500">
                {label}
            </label>
            <input
                {...props}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F]"
            />
        </div>
    );
}
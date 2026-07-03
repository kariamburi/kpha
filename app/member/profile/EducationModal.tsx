"use client";

import { useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import {
    addMemberEducation,
    deleteMemberEducation,
} from "./actions";

export default function EducationModal({
    educations,
}: {
    educations: {
        id: string;
        level: string | null;
        institution: string | null;
        year: string | null;
        achievement: string | null;
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
                                    Education Details
                                </h2>
                                <p className="text-sm font-semibold text-slate-500">
                                    Add multiple education records.
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
                                    await addMemberEducation(formData);
                                    setOpen(false);
                                }}
                                className="grid gap-4 md:grid-cols-4">
                                <Input name="level" label="Level" placeholder="Diploma, Degree..." />
                                <Input name="institution" label="Institution" placeholder="Institution name" />
                                <Input name="year" label="Year" placeholder="2020" />
                                <Input name="achievement" label="Achievement" placeholder="Award, grade..." />

                                <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800 md:col-span-4">
                                    <Plus className="h-4 w-4" />
                                    Add Education
                                </button>
                            </form>

                            <div className="mt-6 space-y-3">
                                {educations.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                    >
                                        <div>
                                            <p className="font-black text-slate-950">
                                                {item.level || "-"}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                                {item.institution || "-"} • {item.year || "-"} •{" "}
                                                {item.achievement || "-"}
                                            </p>
                                        </div>

                                        <form action={deleteMemberEducation}>
                                            <input type="hidden" name="id" value={item.id} />
                                            <button className="text-sm cursor-pointer font-black text-[#C1121F]">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                ))}

                                {educations.length === 0 && (
                                    <p className="rounded-2xl bg-slate-50 p-5 text-center text-sm font-semibold text-slate-500">
                                        No education records added yet.
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
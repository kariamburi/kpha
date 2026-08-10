"use client";

import { useState } from "react";
import {
    BriefcaseBusiness,
    CalendarDays,
    Pencil,
    Plus,
    X,
} from "lucide-react";

import {
    addMemberWorkExperience,
    deleteMemberWorkExperience,
} from "./actions";

function formatDate(
    date?: Date | null,
) {
    if (!date) {
        return "-";
    }

    return new Date(
        date,
    ).toLocaleDateString(
        "en-KE",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        },
    );
}

export default function WorkExperienceModal({
    workExperiences,
}: {
    workExperiences: {
        id: string;

        company: string | null;
        position: string | null;
        description: string | null;

        startDate: Date | null;
        endDate: Date | null;
    }[];
}) {
    const [open, setOpen] =
        useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() =>
                    setOpen(true)
                }
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-red-50 hover:text-[#C1121F]"
            >
                <Pencil className="h-4 w-4" />
            </button>

            {open ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white shadow-2xl">
                        {/* HEADER */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C1121F]">
                                    Professional
                                    Experience
                                </p>

                                <h2 className="mt-1 text-2xl font-black text-slate-950">
                                    Work Experience
                                </h2>

                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    Add your
                                    employment
                                    history,
                                    positions and
                                    relevant
                                    professional
                                    experience.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setOpen(
                                        false,
                                    )
                                }
                                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-slate-100 transition hover:bg-red-50 hover:text-[#C1121F]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* ADD EXPERIENCE */}
                            <form
                                action={async (
                                    formData,
                                ) => {
                                    await addMemberWorkExperience(
                                        formData,
                                    );

                                    setOpen(
                                        false,
                                    );
                                }}
                                className="grid gap-4 md:grid-cols-2"
                            >
                                <Input
                                    name="company"
                                    label="Employer"
                                    placeholder="Employer or organisation name"
                                    required
                                />

                                <Input
                                    name="position"
                                    label="Position"
                                    placeholder="Job title or professional role"
                                    required
                                />

                                <Input
                                    name="startDate"
                                    label="Start Date"
                                    type="date"
                                />

                                <Input
                                    name="endDate"
                                    label="End Date"
                                    type="date"
                                />

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="text-xs font-black uppercase tracking-wide text-slate-500"
                                    >
                                        Experience /
                                        Responsibilities
                                    </label>

                                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-400">
                                        Briefly
                                        describe your
                                        responsibilities,
                                        achievements
                                        or relevant
                                        professional
                                        experience in
                                        this role.
                                    </p>

                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        required
                                        placeholder="Example: Managed hotel operations, guest relations, front office teams, food and beverage operations..."
                                        className="mt-2 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold leading-6 text-slate-800 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white transition hover:bg-red-800 md:col-span-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Work
                                    Experience
                                </button>
                            </form>

                            {/* EXPERIENCE LIST */}
                            <div className="mt-7 border-t border-slate-200 pt-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-black text-slate-950">
                                        Employment
                                        History
                                    </h3>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        Your added
                                        professional
                                        experience
                                        records.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {workExperiences.map(
                                        (
                                            item,
                                        ) => (
                                            <div
                                                key={
                                                    item.id
                                                }
                                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                                            >
                                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                                    <div className="min-w-0">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#C1121F] shadow-sm">
                                                                <BriefcaseBusiness className="h-4 w-4" />
                                                            </div>

                                                            <div>
                                                                <p className="text-base font-black text-slate-950">
                                                                    {item.position ||
                                                                        "Work Experience"}
                                                                </p>

                                                                <p className="mt-1 text-sm font-semibold text-slate-600">
                                                                    {item.company ||
                                                                        "Employer not provided"}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-400">
                                                            <CalendarDays className="h-4 w-4 text-[#C1121F]" />

                                                            <span>
                                                                {item.startDate
                                                                    ? formatDate(
                                                                        item.startDate,
                                                                    )
                                                                    : "Start date not provided"}{" "}
                                                                to{" "}
                                                                {item.endDate
                                                                    ? formatDate(
                                                                        item.endDate,
                                                                    )
                                                                    : "Present"}
                                                            </span>
                                                        </div>

                                                        {item.description ? (
                                                            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                                                                <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                                                                    Experience
                                                                    /
                                                                    Responsibilities
                                                                </p>

                                                                <p className="mt-2 whitespace-pre-line text-sm font-semibold leading-6 text-slate-600">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    <form
                                                        action={
                                                            deleteMemberWorkExperience
                                                        }
                                                    >
                                                        <input
                                                            type="hidden"
                                                            name="id"
                                                            value={
                                                                item.id
                                                            }
                                                        />

                                                        <button
                                                            type="submit"
                                                            className="cursor-pointer text-sm font-black text-[#C1121F] transition hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        ),
                                    )}

                                    {workExperiences.length ===
                                        0 ? (
                                        <p className="rounded-2xl bg-slate-50 p-5 text-center text-sm font-semibold text-slate-500">
                                            No work
                                            experience
                                            records
                                            added yet.
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

function Input({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
}) {
    return (
        <div>
            <label className="text-xs font-black uppercase tracking-wide text-slate-500">
                {label}
            </label>

            <input
                {...props}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
            />
        </div>
    );
}
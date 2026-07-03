"use client";

import Image from "next/image";
import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { updateMemberProfileDetails } from "./actions";

export default function ProfileEditModal({ member }: { member: any }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800"
            >
                <Pencil className="h-4 w-4" />
                Edit Profile
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                            <div>
                                <h2 className="text-2xl font-black text-slate-950">
                                    Edit Profile
                                </h2>
                                <p className="text-sm font-semibold text-slate-500">
                                    Update your personal, directory and profile image details.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="flex cursor-pointer h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-[#C1121F]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form
                            action={async (formData) => {
                                await updateMemberProfileDetails(formData);
                                setOpen(false);
                            }}
                            className="p-6"
                        >
                            <div className="flex flex-col gap-6 lg:flex-row">
                                <div className="lg:w-56">
                                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
                                        {member.profileImageUrl ? (
                                            <Image
                                                src={member.profileImageUrl}
                                                alt={member.fullName || "Member profile"}
                                                width={144}
                                                height={144}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-5xl font-black text-slate-300">
                                                {(member.fullName || "A").charAt(0)}
                                            </span>
                                        )}
                                    </div>

                                    <label className="mt-5 block text-xs font-black uppercase text-slate-500">
                                        Profile Image
                                    </label>

                                    <input
                                        name="profileImage"
                                        type="file"
                                        accept="image/*"
                                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold"
                                    />
                                </div>

                                <div className="grid flex-1 gap-4 md:grid-cols-2">
                                    <Input name="fullName" label="Full Name" defaultValue={member.fullName || ""} />
                                    <Input name="email" label="Email Address" defaultValue={member.email || ""} />
                                    <Input name="phone" label="Phone Number" defaultValue={member.phone || ""} />
                                    <Input name="county" label="County" defaultValue={member.county || ""} />
                                    <Input name="position" label="Position" defaultValue={member.position || ""} />
                                    <Input name="employer" label="Employer" defaultValue={member.employer || ""} />
                                </div>
                            </div>

                            <label className="mt-6 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm font-black text-slate-700">
                                <input
                                    name="isDirectoryVisible"
                                    type="checkbox"
                                    defaultChecked={member.isDirectoryVisible}
                                    className="h-4 w-4 accent-[#C1121F]"
                                />
                                Show my profile in the public member directory
                            </label>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-2xl cursor-pointer border border-slate-200 px-6 py-3 text-sm font-black text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-2xl cursor-pointer bg-[#C1121F] px-6 py-3 text-sm font-black text-white hover:bg-red-800"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
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
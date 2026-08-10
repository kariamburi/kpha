"use client";

import Image from "next/image";
import { useState } from "react";
import {
    BriefcaseBusiness,
    Building2,
    Mail,
    MapPin,
    Pencil,
    Phone,
    UserRound,
    X,
} from "lucide-react";

import { updateMemberProfileDetails } from "./actions";

export default function ProfileEditModal({
    member,
}: {
    member: any;
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
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white transition hover:bg-red-800"
            >
                <Pencil className="h-4 w-4" />
                Edit Profile
            </button>

            {open ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white shadow-2xl">
                        {/* HEADER */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C1121F]">
                                    Member Profile
                                </p>

                                <h2 className="mt-1 text-2xl font-black text-slate-950">
                                    Edit Profile
                                </h2>

                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    Update your
                                    personal,
                                    professional,
                                    directory and
                                    profile image
                                    details.
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

                        <form
                            action={async (
                                formData,
                            ) => {
                                await updateMemberProfileDetails(
                                    formData,
                                );

                                setOpen(
                                    false,
                                );
                            }}
                            className="p-6"
                        >
                            <div className="flex flex-col gap-7 lg:flex-row">
                                {/* PROFILE IMAGE */}
                                <div className="lg:w-56">
                                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
                                        {member.profileImageUrl ? (
                                            <Image
                                                src={
                                                    member.profileImageUrl
                                                }
                                                alt={
                                                    member.fullName ||
                                                    "Member profile"
                                                }
                                                width={
                                                    144
                                                }
                                                height={
                                                    144
                                                }
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-5xl font-black text-slate-300">
                                                {(
                                                    member.fullName ||
                                                    "A"
                                                ).charAt(
                                                    0,
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    <label
                                        htmlFor="profileImage"
                                        className="mt-5 block text-xs font-black uppercase tracking-wide text-slate-500"
                                    >
                                        Profile Image
                                    </label>

                                    <input
                                        id="profileImage"
                                        name="profileImage"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold"
                                    />

                                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-400">
                                        JPG, PNG or
                                        WEBP. Maximum
                                        size 5MB.
                                    </p>
                                </div>

                                <div className="min-w-0 flex-1 space-y-7">
                                    {/* PERSONAL DETAILS */}
                                    <section>
                                        <SectionHeading
                                            eyebrow="Personal Details"
                                            title="Contact Information"
                                        />

                                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                                            <Input
                                                name="fullName"
                                                label="Full Name"
                                                defaultValue={
                                                    member.fullName ||
                                                    ""
                                                }
                                                icon={
                                                    <UserRound />
                                                }
                                            />

                                            <Input
                                                name="email"
                                                label="Email Address"
                                                type="email"
                                                defaultValue={
                                                    member.email ||
                                                    ""
                                                }
                                                icon={
                                                    <Mail />
                                                }
                                            />

                                            <Input
                                                name="phone"
                                                label="Phone Number"
                                                defaultValue={
                                                    member.phone ||
                                                    ""
                                                }
                                                icon={
                                                    <Phone />
                                                }
                                            />

                                            <Input
                                                name="county"
                                                label="County"
                                                defaultValue={
                                                    member.county ||
                                                    ""
                                                }
                                                icon={
                                                    <MapPin />
                                                }
                                            />
                                        </div>
                                    </section>

                                    {/* CURRENT EMPLOYMENT */}
                                    <section>
                                        <SectionHeading
                                            eyebrow="Professional Details"
                                            title="Current Employment"
                                        />

                                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                                            <Input
                                                name="position"
                                                label="Current Position"
                                                placeholder="Example: General Manager"
                                                defaultValue={
                                                    member.position ||
                                                    ""
                                                }
                                                icon={
                                                    <BriefcaseBusiness />
                                                }
                                            />

                                            <Input
                                                name="employer"
                                                label="Current Employer"
                                                placeholder="Employer or organisation"
                                                defaultValue={
                                                    member.employer ||
                                                    ""
                                                }
                                                icon={
                                                    <Building2 />
                                                }
                                            />
                                        </div>
                                    </section>
                                </div>
                            </div>

                            {/* DIRECTORY CONSENT */}
                            <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-black text-slate-700">
                                <input
                                    name="isDirectoryVisible"
                                    type="checkbox"
                                    defaultChecked={
                                        member.isDirectoryVisible
                                    }
                                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#C1121F]"
                                />

                                <div>
                                    <p>
                                        Show my
                                        profile in
                                        the public
                                        member
                                        directory
                                    </p>

                                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                                        When enabled,
                                        approved
                                        profile
                                        information
                                        may be shown
                                        in the AHPK
                                        public member
                                        directory.
                                    </p>
                                </div>
                            </label>

                            {/* ACTIONS */}
                            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpen(
                                            false,
                                        )
                                    }
                                    className="cursor-pointer rounded-2xl border border-slate-200 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-2xl bg-[#C1121F] px-6 py-3 text-sm font-black text-white transition hover:bg-red-800"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}

function SectionHeading({
    eyebrow,
    title,
}: {
    eyebrow: string;
    title: string;
}) {
    return (
        <div className="border-b border-slate-200 pb-3">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C1121F]">
                {eyebrow}
            </p>

            <h3 className="mt-1 text-lg font-black text-slate-950">
                {title}
            </h3>
        </div>
    );
}

function Input({
    label,
    icon,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    icon?: React.ReactNode;
}) {
    return (
        <div>
            <label className="text-xs font-black uppercase tracking-wide text-slate-500">
                {label}
            </label>

            <div className="relative mt-2">
                {icon ? (
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 [&>svg]:h-4 [&>svg]:w-4">
                        {icon}
                    </span>
                ) : null}

                <input
                    {...props}
                    className={[
                        "w-full rounded-2xl border border-slate-200 py-3 pr-4 text-sm font-bold text-slate-800 outline-none transition",
                        icon
                            ? "pl-11"
                            : "pl-4",
                        "placeholder:font-medium placeholder:text-slate-400",
                        "focus:border-[#C1121F] focus:ring-2 focus:ring-red-100",
                    ].join(
                        " ",
                    )}
                />
            </div>
        </div>
    );
}
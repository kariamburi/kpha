import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberPortalShell from "../MemberPortalShell";
import { requireMemberSession } from "../session";
import ProfileEditModal from "./ProfileEditModal";
import {
    addMemberEducation,
    addMemberWorkExperience,
    deleteMemberEducation,
    deleteMemberWorkExperience,
} from "./actions";
import WorkExperienceModal from "./WorkExperienceModal";
import EducationModal from "./EducationModal";
import { BadgeCheck, BriefcaseBusiness, CalendarDays, Clock, GraduationCap, Hash, Mail, MapPin, Phone } from "lucide-react";

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
            educations: { orderBy: { createdAt: "desc" } },
            workExperiences: { orderBy: { createdAt: "desc" } },
        },
    });

    if (!member) notFound();

    const daysLeft = daysUntil(member.expiryDate);
    const expired = daysLeft < 0;

    const completionItems = [
        member.fullName,
        member.email,
        member.phone,
        member.profileImageUrl,
        member.county,
        member.position,
        member.employer,
        member.educations.length > 0 ? "education" : "",
        member.workExperiences.length > 0 ? "work" : "",
    ];

    const completedItems = completionItems.filter(Boolean).length;
    const profileCompletion = Math.round((completedItems / completionItems.length) * 100);
    const remaining = completionItems.length - completedItems;

    return (
        <MemberPortalShell member={member}>
            <div className="space-y-5">
                <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">

                    <div className="p-6">
                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                            <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 shadow-lg">
                                    {member.profileImageUrl ? (
                                        <img
                                            src={member.profileImageUrl}
                                            alt={member.fullName || "Member profile"}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-4xl font-black text-slate-300">
                                            {(member.fullName || "A").charAt(0)}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <h1 className="text-3xl font-black text-slate-950">
                                        {member.fullName || "AHPK Member"}
                                    </h1>

                                    <p className="mt-1 text-sm font-bold text-slate-500">
                                        {member.position || "Hospitality Professional"}
                                        {member.employer ? ` at ${member.employer}` : ""}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-400">
                                        {member.memberNumber} • {member.category.name}
                                    </p>
                                </div>
                            </div>

                            <ProfileEditModal member={member} />
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-4">
                            <Info icon={Mail} label="Email" value={member.email || "-"} />
                            <Info icon={Phone} label="Phone" value={member.phone || "-"} />
                            <Info icon={MapPin} label="County" value={member.county || "-"} />
                            <Info icon={BadgeCheck} label="Status" value={expired ? "Expired" : member.status} />
                        </div>

                        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-black text-slate-700">
                                    Profile Completion
                                </p>
                                <p className="text-sm font-black text-green-700">
                                    {profileCompletion}%
                                </p>
                            </div>

                            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                                <div
                                    className="h-full rounded-full bg-green-600"
                                    style={{ width: `${profileCompletion}%` }}
                                />
                            </div>

                            <p className="mt-2 text-xs font-bold text-slate-400">
                                {remaining} profile section{remaining === 1 ? "" : "s"} remaining.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-black text-slate-950">
                            Membership Details
                        </h2>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <Info icon={Hash} label="Member Number" value={member.memberNumber} />
                            <Info icon={BadgeCheck} label="Category" value={member.category.name} />
                            <Info icon={CalendarDays} label="Join Date" value={formatDate(member.joinDate)} />
                            <Info icon={CalendarDays} label="Expiry Date" value={formatDate(member.expiryDate)} />
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-semibold text-slate-500">
                            Membership Status
                        </p>

                        <h2 className="mt-2 text-3xl font-black text-slate-950">
                            {expired ? "Expired" : member.status}
                        </h2>

                        <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                            {expired
                                ? "Your membership has expired."
                                : `Your membership is valid until ${formatDate(member.expiryDate)}.`}
                        </p>

                        <Info
                            icon={Clock}
                            label="Days Left"
                            value={expired ? "Expired" : `${daysLeft} day${daysLeft === 1 ? "" : "s"}`}
                        />
                    </div>
                </div>

                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-950">Education Details</h2>
                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    Academic qualifications and achievements.
                                </p>
                            </div>
                        </div>

                        <EducationModal educations={member.educations} />
                    </div>

                    <div className="mt-6 space-y-4">
                        {member.educations.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                            >
                                <p className="text-base font-black text-slate-950">
                                    {item.level || "Education Record"}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    {item.institution || "-"}
                                </p>
                                <p className="mt-2 text-xs font-bold text-slate-400">
                                    {item.year || "-"} • {item.achievement || "-"}
                                </p>
                            </div>
                        ))}

                        {member.educations.length === 0 && (
                            <p className="rounded-2xl bg-slate-50 p-5 text-sm font-semibold text-slate-500">
                                No education records added yet. Click the edit button to add one.
                            </p>
                        )}
                    </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                <BriefcaseBusiness className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-950">Work Experience</h2>
                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    Professional roles and employment history.
                                </p>
                            </div>
                        </div>

                        <WorkExperienceModal workExperiences={member.workExperiences} />
                    </div>

                    <div className="mt-6 space-y-4">
                        {member.workExperiences.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                            >
                                <p className="text-base font-black text-slate-950">
                                    {item.position || "Work Experience"}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    {item.company || "-"}
                                </p>
                                <p className="mt-2 text-xs font-bold text-slate-400">
                                    {item.year || "-"} •{" "}
                                    {item.startDate ? formatDate(item.startDate) : "-"} to{" "}
                                    {item.endDate ? formatDate(item.endDate) : "Present"}
                                </p>
                            </div>
                        ))}

                        {member.workExperiences.length === 0 && (
                            <p className="rounded-2xl bg-slate-50 p-5 text-sm font-semibold text-slate-500">
                                No work experience records added yet. Click the edit button to add one.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </MemberPortalShell>
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
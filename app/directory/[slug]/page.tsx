import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "@/app/components/public/PublicNavbar";
import PublicFooter from "@/app/components/public/PublicFooter";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import {
    User,
    Mail,
    Phone,
    MapPin,
    BriefcaseBusiness,
    BadgeCheck,
    GraduationCap,
    CalendarDays,
    ArrowLeft,
} from "lucide-react";

type Props = {
    params: Promise<{ slug: string }>;
};

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const member = await prisma.member.findUnique({
        where: { memberNumber: decodeURIComponent(slug) },
        include: { category: true },
    });

    if (!member || !member.isDirectoryVisible || member.status !== "ACTIVE") {
        return { title: "Member Not Found", robots: { index: false, follow: false } };
    }

    return {
        title: `${member.fullName || "AHPK Member"} - Member Directory`,
        description: `View AHPK member profile for ${member.fullName || member.memberNumber}.`,
        alternates: { canonical: `/directory/${member.memberNumber}` },
    };
}

export default async function DirectoryProfilePage({ params }: Props) {
    const { slug } = await params;

    const member = await prisma.member.findUnique({
        where: { memberNumber: decodeURIComponent(slug) },
        include: {
            category: true,
            educations: { orderBy: { createdAt: "desc" } },
            workExperiences: { orderBy: { createdAt: "desc" } },
            certificates: { orderBy: { createdAt: "desc" } },
        },
    });

    if (!member || !member.isDirectoryVisible || member.status !== "ACTIVE") {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: "/" },
                    { name: "Member Directory", url: "/directory" },
                    { name: member.fullName || member.memberNumber, url: `/directory/${member.memberNumber}` },
                ]}
            />

            <PublicNavbar />

            <section className="bg-[#F4F6F8] py-12">
                <div className="mx-auto max-w-6xl px-6">
                    <Link
                        href="/directory"
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm hover:text-[#C1121F]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Directory
                    </Link>

                    <div className="mt-6 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">

                        <div className="p-6">
                            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg">
                                        {member.profileImageUrl ? (
                                            <img
                                                src={member.profileImageUrl}
                                                alt={member.fullName || "Member"}
                                                className="h-full w-full object-cover"
                                            />

                                        ) : (
                                            <User className="h-14 w-14 text-slate-300" />
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

                                <div className="rounded-2xl bg-green-50 px-5 py-3 text-sm font-black text-green-700">
                                    Active Verified Member
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-4">
                                <Info icon={BadgeCheck} label="Category" value={member.category.name} />
                                <Info icon={MapPin} label="County" value={member.county || "-"} />
                                <Info icon={BriefcaseBusiness} label="Employer" value={member.employer || "-"} />
                                <Info icon={CalendarDays} label="Joined" value={formatDate(member.joinDate)} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
                        <div className="space-y-6">
                            <Section title="Education Details" icon={GraduationCap}>
                                {member.educations.length > 0 ? (
                                    member.educations.map((item) => (
                                        <ProfileItem
                                            key={item.id}
                                            title={item.level || "Education Record"}
                                            subtitle={item.institution || "-"}
                                            meta={`${item.year || "-"} • ${item.achievement || "-"}`}
                                        />
                                    ))
                                ) : (
                                    <Empty text="No education records listed." />
                                )}
                            </Section>

                            <Section title="Work Experience" icon={BriefcaseBusiness}>
                                {member.workExperiences.length > 0 ? (
                                    member.workExperiences.map((item) => (
                                        <ProfileItem
                                            key={item.id}
                                            title={item.position || "Work Experience"}
                                            subtitle={item.company || "-"}
                                            meta={`${item.year || "-"} • ${item.startDate ? formatDate(item.startDate) : "-"
                                                } to ${item.endDate ? formatDate(item.endDate) : "Present"}`}
                                        />
                                    ))
                                ) : (
                                    <Empty text="No work experience records listed." />
                                )}
                            </Section>
                        </div>

                        <aside className="space-y-6">
                            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-black text-slate-950">Contact Details</h2>

                                <div className="mt-5 space-y-3">
                                    <ContactInfo
                                        icon={Mail}
                                        label="Email"
                                        value={member.email || "-"}
                                        href={member.email ? `mailto:${member.email}` : undefined}
                                    />

                                    <ContactInfo
                                        icon={Phone}
                                        label="Phone"
                                        value={member.phone || "-"}
                                        href={member.phone ? `tel:${member.phone}` : undefined}
                                    />
                                </div>
                            </section>

                            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-black text-slate-950">Certificates</h2>

                                <p className="mt-3 text-sm font-semibold text-slate-500">
                                    {member.certificates.length} certificate(s) issued.
                                </p>
                            </section>
                        </aside>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}
function ContactInfo({
    icon: Icon,
    label,
    value,
    href,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    href?: string;
}) {
    const content = (
        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 transition hover:bg-red-50">
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

    if (!href) return content;

    return (
        <a href={href} className="block">
            {content}
        </a>
    );
}
function Section({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                    <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-black text-slate-950">{title}</h2>
            </div>

            <div className="mt-5 space-y-4">{children}</div>
        </section>
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

function ProfileItem({
    title,
    subtitle,
    meta,
}: {
    title: string;
    subtitle: string;
    meta: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-base font-black text-slate-950">{title}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{subtitle}</p>
            <p className="mt-2 text-xs font-bold text-slate-400">{meta}</p>
        </div>
    );
}

function Empty({ text }: { text: string }) {
    return (
        <p className="rounded-2xl bg-slate-50 p-5 text-sm font-semibold text-slate-500">
            {text}
        </p>
    );
}
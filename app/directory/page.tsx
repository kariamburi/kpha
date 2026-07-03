import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    GraduationCap,
    MapPin,
    Search,
    User,
    Users,
} from "lucide-react";
import BreadcrumbJsonLd from "../components/seo/BreadcrumbJsonLd";

type Props = {
    searchParams?: Promise<{ q?: string; page?: string }>;
};

export const metadata: Metadata = {
    title: "Member Directory",
    description:
        "Search and verify active members of the Association of Hotel Professionals Kenya.",
    alternates: { canonical: "/directory" },
};

export default async function DirectoryPage({ searchParams }: Props) {
    const params = await searchParams;
    const q = params?.q?.trim() || "";
    const page = Math.max(Number(params?.page || 1), 1);
    const pageSize = 12;
    const skip = (page - 1) * pageSize;
    const where = {
        status: "ACTIVE" as const,
        isDirectoryVisible: true,
        OR: q
            ? [
                { fullName: { contains: q, mode: "insensitive" as const } },
                { memberNumber: { contains: q, mode: "insensitive" as const } },
                { county: { contains: q, mode: "insensitive" as const } },
                { employer: { contains: q, mode: "insensitive" as const } },
                { position: { contains: q, mode: "insensitive" as const } },
                { category: { name: { contains: q, mode: "insensitive" as const } } },
            ]
            : undefined,
    };

    const [members, totalMembers] = await Promise.all([
        prisma.member.findMany({
            where,
            include: {
                category: true,
                educations: true,
                workExperiences: true,
            },
            orderBy: { fullName: "asc" },
            skip,
            take: pageSize,
        }),

        prisma.member.count({ where }),
    ]);

    const totalPages = Math.ceil(totalMembers / pageSize);

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: "/" },
                    { name: "Member Directory", url: "/directory" },
                ]}
            />

            <PublicNavbar />

            <section className="bg-[#F4F6F8] py-16">
                <div className="mx-auto max-w-6xl py-3 px-6">

                    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                            <div>
                                <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C1121F]">
                                    AHPK Members
                                </p>

                                <h1 className="mt-3 text-4xl font-black text-slate-950">
                                    Public Member Directory
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
                                    Search, verify and view professional profiles of active AHPK
                                    members.
                                </p>
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-2xl bg-green-50 px-5 py-3 text-sm font-black text-green-700">
                                <Users className="h-4 w-4" />
                                {members.length} Verified Member{members.length === 1 ? "" : "s"}
                            </div>
                        </div>

                        <form className="mt-8 rounded-[24px] p-3">
                            <div className="flex flex-col gap-3 md:flex-row">
                                <div className="relative flex-1">

                                    <input
                                        name="q"
                                        defaultValue={q}
                                        placeholder="Search by name, member number, county, employer, position or category..."
                                        className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-4 text-sm font-semibold outline-none transition focus:border-[#C1121F]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-6 text-sm font-black text-white transition hover:bg-red-800"
                                >
                                    <Search className="h-5 w-5 text-white" />
                                    Search Member
                                </button>
                            </div>
                        </form>

                        <div className="mt-5 flex items-center justify-between gap-4">
                            <p className="text-sm font-bold text-slate-500">
                                {q ? `Search results for "${q}"` : "Showing all verified members"}
                            </p>

                            {q && (
                                <Link
                                    href="/directory"
                                    className="text-sm font-black text-[#C1121F]"
                                >
                                    Clear search
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {members.map((member) => (
                            <Link
                                key={member.id}
                                href={`/directory/${member.memberNumber}`}
                                className="group rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-end justify-between gap-4">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg">
                                        {member.profileImageUrl ? (
                                            <Image
                                                src={member.profileImageUrl}
                                                alt={member.fullName || "Member"}
                                                width={80}
                                                height={80}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <User className="h-9 w-9 text-slate-300" />
                                        )}
                                    </div>

                                    <span className="mb-2 inline-flex items-center justify-center rounded-full bg-green-50 px-3 py-1 text-[10px] font-black uppercase text-green-700">
                                        Verified
                                    </span>
                                </div>

                                <h2 className="mt-4 line-clamp-1 text-xl font-black text-slate-950">
                                    {member.fullName || "AHPK Member"}
                                </h2>

                                <p className="mt-1 text-sm font-bold text-[#C1121F]">
                                    {member.memberNumber}
                                </p>

                                <p className="mt-2 line-clamp-2 min-h-[44px] text-sm font-semibold leading-6 text-slate-500">
                                    {member.position || "Hospitality Professional"}
                                    {member.employer ? ` at ${member.employer}` : ""}
                                </p>

                                <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                                    <Row icon={BadgeCheck} value={member.category.name} />
                                    <Row icon={MapPin} value={member.county || "County not listed"} />
                                    <Row
                                        icon={GraduationCap}
                                        value={`${member.educations.length} education record(s)`}
                                    />
                                    <Row
                                        icon={BriefcaseBusiness}
                                        value={`${member.workExperiences.length} work record(s)`}
                                    />
                                </div>

                                <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-700">
                                    View Full Profile
                                    <ArrowRight className="h-4 w-4 text-[#C1121F] transition group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                            {page > 1 && (
                                <Link
                                    href={`/directory?q=${encodeURIComponent(q)}&page=${page - 1}`}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-50"
                                >
                                    Previous
                                </Link>
                            )}

                            {Array.from({ length: totalPages }).map((_, index) => {
                                const pageNumber = index + 1;

                                return (
                                    <Link
                                        key={pageNumber}
                                        href={`/directory?q=${encodeURIComponent(q)}&page=${pageNumber}`}
                                        className={`rounded-xl px-4 py-2 text-sm font-black ${pageNumber === page
                                            ? "bg-[#C1121F] text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        {pageNumber}
                                    </Link>
                                );
                            })}

                            {page < totalPages && (
                                <Link
                                    href={`/directory?q=${encodeURIComponent(q)}&page=${page + 1}`}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function Row({ icon: Icon, value }: { icon: React.ElementType; value: string }) {
    return (
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
            <Icon className="h-4 w-4 shrink-0 text-[#C1121F]" />
            <span className="line-clamp-1">{value}</span>
        </div>
    );
}
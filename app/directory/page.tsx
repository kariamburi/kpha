import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";
import { Search, BadgeCheck, User, MapPin, BriefcaseBusiness } from "lucide-react";

type Props = {
    searchParams?: Promise<{
        q?: string;
    }>;
};

export const metadata: Metadata = {
    title: "Member Directory",
    description:
        "Search and verify active members of the Association of Hotel Professionals Kenya by name, member number, county, employer, or membership category.",
    alternates: {
        canonical: "/directory",
    },
};

export default async function DirectoryPage({ searchParams }: Props) {
    const params = await searchParams;
    const q = params?.q?.trim() || "";

    const members = await prisma.member.findMany({
        where: {
            status: "ACTIVE",
            isDirectoryVisible: true,
            OR: q
                ? [
                    { fullName: { contains: q, mode: "insensitive" } },
                    { memberNumber: { contains: q, mode: "insensitive" } },
                    { county: { contains: q, mode: "insensitive" } },
                    { employer: { contains: q, mode: "insensitive" } },
                    {
                        category: {
                            name: { contains: q, mode: "insensitive" },
                        },
                    },
                ]
                : undefined,
        },
        include: {
            category: true,
        },
        orderBy: {
            fullName: "asc",
        },
    });

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <PublicNavbar />

            <section className="bg-[#111111] text-white">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <p className="text-sm font-black uppercase tracking-[0.4em] text-[#F3C64E]">
                        AHPK Members
                    </p>

                    <h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-5xl">
                        Public Member Directory
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/75">
                        Search and verify active AHPK members listed in the public directory.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <form className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                name="q"
                                defaultValue={q}
                                placeholder="Search by name, member number, county, employer or category..."
                                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#C1121F] focus:bg-white"
                            />
                        </div>

                        <button className="h-14 rounded-2xl bg-[#C1121F] px-8 text-sm font-black text-white transition hover:bg-red-800">
                            Search
                        </button>
                    </div>
                </form>

                <div className="mt-8 flex items-center justify-between gap-4">
                    <p className="text-sm font-bold text-slate-500">
                        {members.length} member(s) found
                    </p>

                    {q && (
                        <Link
                            href="/directory"
                            className="text-sm font-black text-[#C1121F] hover:text-red-800"
                        >
                            Clear search
                        </Link>
                    )}
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {members.map((member) => (
                        <article
                            key={member.id}
                            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                                    <User className="h-7 w-7" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-black text-slate-950">
                                        {member.fullName}
                                    </h2>

                                    <p className="mt-1 text-sm font-bold text-[#C1121F]">
                                        {member.memberNumber}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 text-sm font-semibold text-slate-600">
                                <div className="flex items-center gap-3">
                                    <BadgeCheck className="h-4 w-4 text-[#C1121F]" />
                                    <span>{member.category?.name || "Member"}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-[#C1121F]" />
                                    <span>{member.county || "County not listed"}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <BriefcaseBusiness className="h-4 w-4 text-[#C1121F]" />
                                    <span>{member.employer || "Employer not listed"}</span>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl bg-green-50 px-4 py-3 text-sm font-black text-green-700">
                                Active Verified Member
                            </div>
                        </article>
                    ))}

                    {members.length === 0 && (
                        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center md:col-span-2 xl:col-span-3">
                            <p className="text-lg font-black text-slate-950">
                                No members found
                            </p>
                            <p className="mt-2 text-sm font-semibold text-slate-500">
                                Try searching by another name, member number, county, employer or category.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}
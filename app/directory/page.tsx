import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Home, Search, ShieldCheck, UserRound } from "lucide-react";
import Logo from "@/app/assets/logo.png";
import { prisma } from "@/lib/prisma";
import BreadcrumbJsonLd from "../components/seo/BreadcrumbJsonLd";
import PublicFooter from "../components/public/PublicFooter";
import { DesktopNavigation } from "../components/site/desktop-navigation";

export const metadata: Metadata = {
    title: "Member Directory | AHPK",
    description: "Search the official AHPK directory and confirm active membership.",
    alternates: { canonical: "/directory" },
    robots: { index: true, follow: true },
};

type Props = { searchParams?: Promise<{ q?: string; page?: string }> };
const PAGE_SIZE = 15;

function directoryUrl(q: string, page: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (page > 1) params.set("page", String(page));
    const result = params.toString();
    return `/directory${result ? `?${result}` : ""}`;
}

function MemberAvatar({ name, imageUrl }: { name: string; imageUrl?: string | null }) {
    const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("") || "A";
    return (
        <div aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 font-black tracking-wide text-[#C8102E] sm:size-14">
            {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt={`${name} profile`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full rounded-full object-cover" />
            ) : initials}
        </div>
    );
}

export default async function DirectoryPage({ searchParams }: Props) {
    const params = await searchParams;
    const query = (params?.q || "").trim().slice(0, 120);
    const rawPage = Number(params?.page || 1);
    const requestedPage = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const where = {
        status: "ACTIVE" as const,
        isDirectoryVisible: true,
        expiryDate: { gte: new Date() },
        ...(query ? {
            OR: [
                { fullName: { contains: query, mode: "insensitive" as const } },
                { memberNumber: { contains: query, mode: "insensitive" as const } },
                { category: { name: { contains: query, mode: "insensitive" as const } } },
            ],
        } : {}),
    };

    const totalMembers = await prisma.member.count({ where });
    const totalPages = Math.max(1, Math.ceil(totalMembers / PAGE_SIZE));
    const page = Math.min(requestedPage, totalPages);
    const members = await prisma.member.findMany({
        where,
        select: {
            id: true,
            fullName: true,
            memberNumber: true,
            profileImageUrl: true,
            category: { select: { name: true } },
        },
        orderBy: [{ fullName: "asc" }, { id: "asc" }],
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    });
    const first = totalMembers ? (page - 1) * PAGE_SIZE + 1 : 0;
    const last = Math.min(totalMembers, page * PAGE_SIZE);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Member Directory", url: "/directory" }]} />
            <header className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl" style={{ "--header-height": "76px" } as CSSProperties}>
                <div className="mx-auto flex h-[74px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                    <Link href="/" aria-label="AHPK homepage" className="shrink-0"><Image src={Logo} alt="Association of Hotel Professionals Kenya" width={76} height={76} priority className="size-[58px] object-contain sm:size-[62px]" /></Link>
                    <div className="ml-auto flex items-center"><DesktopNavigation /></div>
                </div>
            </header>

            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Link href="/" className="inline-flex items-center gap-1 hover:text-[#C8102E]"><Home className="size-3.5" /> Home</Link><ChevronRight className="size-3.5" /><span className="text-[#C8102E]">Member Directory</span>
                    </nav>
                    <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#C8102E]">Official AHPK Directory</p>
                            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Search Members</h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Confirm active membership using a name, member number, or membership category.</p>
                        </div>
                        <div className="inline-flex w-fit items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800"><ShieldCheck className="size-4" /> Official membership records</div>
                    </div>
                    <form action="/directory" method="get" role="search" className="mt-7 flex flex-col gap-2 sm:flex-row">
                        <label htmlFor="directory-search" className="sr-only">Search members by name, number or category</label>
                        <div className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input id="directory-search" name="q" type="search" defaultValue={query} placeholder="Search name, membership number or category" className="h-12 w-full rounded-md border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#C8102E] focus:ring-2 focus:ring-red-100" /></div>
                        <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#C8102E] px-6 text-sm font-bold text-white hover:bg-[#A80D27]"><Search className="size-4" />Search Members</button>
                    </form>
                    {query && <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600"><span>Results for <strong className="text-slate-900">{query}</strong></span><Link href="/directory" className="font-bold text-[#C8102E] hover:underline">Clear search</Link></div>}
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#C8102E]">Directory Results</p><h2 className="mt-1 text-xl font-black sm:text-2xl">{query ? "Matching Members" : "Active Members"}</h2></div><p className="text-xs font-semibold text-slate-500">Showing {first}–{last} of {totalMembers}</p></div>
                {members.length ? (
                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                        {members.map((member) => (
                            <Link key={member.id} href={`/directory/${encodeURIComponent(member.memberNumber)}`} className="group flex items-center gap-3 border-b border-slate-100 px-4 py-4 transition last:border-b-0 hover:bg-red-50/50 sm:gap-5 sm:px-6">
                                <MemberAvatar name={member.fullName || "AHPK Member"} imageUrl={member.profileImageUrl} />
                                <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-black text-slate-950 group-hover:text-[#C8102E] sm:text-base">{member.fullName || "AHPK Member"}</h3><p className="mt-1 text-xs font-semibold text-slate-500">Member No. {member.memberNumber} <span className="mx-1 text-slate-300">•</span> {member.category.name}</p></div>
                                <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 sm:inline-flex"><BadgeCheck className="size-3.5" />Active</span>
                                <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-[#C8102E] transition-transform group-hover:translate-x-1" />
                            </Link>
                        ))}
                    </div>
                ) : <div className="rounded-lg border border-slate-200 bg-white px-5 py-14 text-center"><UserRound className="mx-auto size-9 text-slate-300" /><h3 className="mt-3 text-lg font-black">No matching members found</h3><p className="mt-2 text-sm text-slate-500">Try a different name, member number or category.</p><Link href="/directory" className="mt-4 inline-block text-sm font-bold text-[#C8102E]">View all members</Link></div>}
                {totalPages > 1 && <nav aria-label="Directory pages" className="mt-6 flex flex-wrap items-center justify-center gap-3"><Link href={directoryUrl(query, Math.max(1, page - 1))} aria-disabled={page === 1} className={`inline-flex h-10 items-center gap-1 rounded-md border px-4 text-sm font-bold ${page === 1 ? "pointer-events-none border-slate-200 text-slate-400" : "border-slate-300 bg-white text-slate-800 hover:border-[#C8102E]"}`}><ChevronLeft className="size-4" /> Previous</Link><span className="text-xs font-semibold text-slate-600">Page {page} of {totalPages}</span><Link href={directoryUrl(query, Math.min(totalPages, page + 1))} aria-disabled={page === totalPages} className={`inline-flex h-10 items-center gap-1 rounded-md border px-4 text-sm font-bold ${page === totalPages ? "pointer-events-none border-slate-200 text-slate-400" : "border-slate-300 bg-white text-slate-800 hover:border-[#C8102E]"}`}>Next <ChevronRight className="size-4" /></Link></nav>}
                <div className="mt-8 flex flex-col justify-between gap-4 rounded-lg border-l-4 border-[#C8102E] bg-white p-5 sm:flex-row sm:items-center"><div><p className="text-sm font-black">Need to verify membership?</p><p className="mt-1 text-xs leading-5 text-slate-600">Only active members approved for public listing appear here. Contact the Secretariat for additional verification.</p></div><Link href="/contact" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#C8102E] hover:underline">Contact Secretariat <ArrowRight className="size-4" /></Link></div>
            </section>
            <PublicFooter />
        </main>
    );
}

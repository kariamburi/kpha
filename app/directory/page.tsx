import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BadgeCheck,
    ChevronLeft,
    ChevronRight,
    Home,
    IdCard,
    Search,
    ShieldCheck,
    Tags,
    UserRound,
} from "lucide-react";
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
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-red-100 bg-red-50 font-extrabold tracking-wide text-[#C8102E] sm:size-14">
            {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt={`${name} profile`} loading="lazy" referrerPolicy="no-referrer" className="size-full object-cover" />
            ) : (
                <span aria-hidden="true">{initials}</span>
            )}
        </div>
    );
}

export default async function DirectoryPage({ searchParams }: Props) {
    const params = await searchParams;
    const query = (params?.q || "").trim().slice(0, 120);
    const rawPage = Number(params?.page || 1);
    const requestedPage = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;

    // IMPORTANT: Opening /directory, clearing search, or submitting blank spaces
    // must NEVER fetch or display the complete membership directory.
    const searchResults = query
        ? await (async () => {
            const where = {
                status: "ACTIVE" as const,
                isDirectoryVisible: true,
                expiryDate: { gte: new Date() },
                OR: [
                    { fullName: { contains: query, mode: "insensitive" as const } },
                    { memberNumber: { contains: query, mode: "insensitive" as const } },
                    { category: { name: { contains: query, mode: "insensitive" as const } } },
                ],
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

            return { totalMembers, totalPages, page, members, first, last };
        })()
        : null;

    const totalMembers = searchResults?.totalMembers ?? 0;
    const totalPages = searchResults?.totalPages ?? 1;
    const page = searchResults?.page ?? 1;
    const members = searchResults?.members ?? [];
    const first = searchResults?.first ?? 0;
    const last = searchResults?.last ?? 0;

    return (
        <main className="min-h-screen bg-[#F7F8FB] text-slate-950">
            <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Member Directory", url: "/directory" }]} />

            {/* Keep the existing AHPK site header and navigation. */}
            <header
                className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
                style={{ "--header-height": "76px" } as CSSProperties}
            >
                <div className="mx-auto flex h-[74px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                    <Link href="/" aria-label="AHPK homepage" className="shrink-0">
                        <Image src={Logo} alt="Association of Hotel Professionals Kenya" width={76} height={76} priority className="size-[58px] object-contain sm:size-[62px]" />
                    </Link>
                    <div className="ml-auto flex items-center"><DesktopNavigation /></div>
                </div>
            </header>

            <section className={`relative isolate overflow-hidden border-b border-slate-200 ${query ? "bg-white pb-11" : "min-h-[650px] bg-[#F8F9FC] pb-16 sm:pb-20"}`}>
                {/* Restrained decorative detail, without distracting from the search field. */}
                {!query && (
                    <>
                        <div aria-hidden="true" className="pointer-events-none absolute -left-36 top-28 size-80 rounded-full border-[52px] border-white" />
                        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 size-96 rounded-full border-[64px] border-red-100/60" />
                    </>
                )}

                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 pt-7 text-xs font-semibold text-slate-500 sm:pt-9">
                        <Link href="/" className="inline-flex items-center gap-1.5 transition hover:text-[#C8102E]">
                            <Home className="size-3.5" /> Home
                        </Link>
                        <ChevronRight className="size-3.5 text-slate-400" />
                        <span aria-current="page" className="text-[#C8102E]">Member Directory</span>
                    </nav>

                    <div className={`mx-auto max-w-5xl ${query ? "mt-10 sm:mt-12" : "mt-12 sm:mt-16"}`}>
                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#C8102E] shadow-sm sm:text-[11px]">
                                <ShieldCheck className="size-4" /> Official AHPK Directory
                            </span>
                            <h1 className="mt-5 text-4xl font-black leading-[1.14] tracking-tight text-[#10172F] sm:text-5xl lg:text-[54px]">
                                Find &amp; verify an <span className="text-[#C8102E]">AHPK member</span>
                            </h1>
                            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                                Search official membership records by name, membership number or category. Results are displayed only after you search.
                            </p>
                        </div>

                        <div className={`mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_60px_-28px_rgba(16,23,47,0.26)] sm:rounded-3xl sm:p-8 ${query ? "mt-8" : "mt-10"}`}>
                            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-extrabold tracking-tight text-[#10172F] sm:text-xl">Search the member directory</h2>
                                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">Enter the details of the member you wish to verify.</p>
                                </div>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800">
                                    <BadgeCheck className="size-4" /> Official records
                                </span>
                            </div>

                            <form action="/directory" method="get" role="search">
                                <label htmlFor="directory-search" className="mb-2 block text-xs font-bold text-slate-700">Member name, number or category</label>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <div className="relative min-w-0 flex-1">
                                        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="directory-search"
                                            name="q"
                                            type="search"
                                            maxLength={120}
                                            required
                                            defaultValue={query}
                                            placeholder="e.g. member name or membership number"
                                            className="h-14 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#C8102E] focus:ring-4 focus:ring-red-50"
                                        />
                                    </div>
                                    <button type="submit" className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#A80D27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8102E]">
                                        <Search className="size-4" /> Search Members
                                    </button>
                                </div>
                            </form>

                            <div className="mt-5 flex items-start gap-2.5 border-t border-slate-100 pt-4">
                                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-700" />
                                <p className="text-xs leading-5 text-slate-500">Only active AHPK members approved for public directory listing appear in search results.</p>
                            </div>
                        </div>

                        {query ? (
                            <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-between gap-3 px-1 text-sm">
                                <p className="text-slate-600">Showing matches for <strong className="font-extrabold text-slate-900">“{query}”</strong></p>
                                <Link href="/directory" className="font-extrabold text-[#C8102E] underline-offset-4 transition hover:underline">Clear search</Link>
                            </div>
                        ) : (
                            <div className="mx-auto mt-9 max-w-4xl">
                                <p className="mb-4 text-center text-[11px] font-extrabold uppercase tracking-[0.17em] text-slate-500">Search using any of these details</p>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C8102E]"><UserRound className="size-5" /></span>
                                        <div><h3 className="text-sm font-extrabold text-[#10172F]">Member name</h3><p className="mt-0.5 text-xs text-slate-500">First or last name</p></div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C8102E]"><IdCard className="size-5" /></span>
                                        <div><h3 className="text-sm font-extrabold text-[#10172F]">Member number</h3><p className="mt-0.5 text-xs text-slate-500">AHPK membership ID</p></div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C8102E]"><Tags className="size-5" /></span>
                                        <div><h3 className="text-sm font-extrabold text-[#10172F]">Membership category</h3><p className="mt-0.5 text-xs text-slate-500">Search by category</p></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* No results section, member counts, or pagination exists until a search is submitted. */}
            {query && (
                <section aria-label="Directory search results" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#C8102E]">Directory search</p>
                            <h2 className="mt-1 text-2xl font-black tracking-tight text-[#10172F] sm:text-3xl">Matching members</h2>
                        </div>
                        <p aria-live="polite" className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600">
                            {totalMembers ? `Showing ${first}–${last} of ${totalMembers}` : "0 matching members"}
                        </p>
                    </div>

                    {members.length ? (
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            {members.map((member) => (
                                <Link
                                    key={member.id}
                                    href={`/directory/${encodeURIComponent(member.memberNumber)}`}
                                    className="group flex items-center gap-4 border-b border-slate-100 px-4 py-5 transition-colors last:border-b-0 hover:bg-red-50/50 sm:gap-5 sm:px-6"
                                >
                                    <MemberAvatar name={member.fullName || "AHPK Member"} imageUrl={member.profileImageUrl} />
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-sm font-extrabold text-[#10172F] transition-colors group-hover:text-[#C8102E] sm:text-base">{member.fullName || "AHPK Member"}</h3>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">Member No. {member.memberNumber} <span className="mx-1 text-slate-300">•</span> {member.category.name}</p>
                                    </div>
                                    <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800 sm:inline-flex"><BadgeCheck className="size-3.5" /> Active</span>
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-red-200 group-hover:bg-red-50 group-hover:text-[#C8102E]"><ArrowRight aria-hidden="true" className="size-4" /></span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:py-16">
                            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-100"><Search className="size-8 text-slate-400" /></span>
                            <h3 className="mt-5 text-xl font-black text-[#10172F]">No matching members found</h3>
                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">We couldn't find an active, publicly listed member matching your search. Check the spelling or try another name, membership number or category.</p>
                            <Link href="/directory" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E] hover:underline">Start a new search <ArrowRight className="size-4" /></Link>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <nav aria-label="Directory search result pages" className="mt-7 flex flex-wrap items-center justify-center gap-3">
                            <Link href={directoryUrl(query, Math.max(1, page - 1))} aria-disabled={page === 1} className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-bold ${page === 1 ? "pointer-events-none border-slate-200 bg-slate-50 text-slate-400" : "border-slate-300 bg-white text-slate-800 hover:border-[#C8102E]"}`}><ChevronLeft className="size-4" /> Previous</Link>
                            <span className="px-2 text-xs font-semibold text-slate-600">Page {page} of {totalPages}</span>
                            <Link href={directoryUrl(query, Math.min(totalPages, page + 1))} aria-disabled={page === totalPages} className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-bold ${page === totalPages ? "pointer-events-none border-slate-200 bg-slate-50 text-slate-400" : "border-slate-300 bg-white text-slate-800 hover:border-[#C8102E]"}`}>Next <ChevronRight className="size-4" /></Link>
                        </nav>
                    )}

                    <div className="mt-9 flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
                        <div className="flex items-start gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]"><ShieldCheck className="size-5" /></span>
                            <div>
                                <h3 className="text-sm font-extrabold text-[#10172F]">Need additional membership verification?</h3>
                                <p className="mt-1 max-w-xl text-xs leading-5 text-slate-600">Contact the AHPK Secretariat if you can't find the member you're looking for.</p>
                            </div>
                        </div>
                        <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#C8102E] hover:underline">Contact Secretariat <ArrowRight className="size-4" /></Link>
                    </div>
                </section>
            )}

            <PublicFooter />
        </main>
    );
}

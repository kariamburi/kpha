import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";
import {
    ArrowRight,
    CalendarDays,
    Megaphone,
    Newspaper,
    ShieldCheck,
} from "lucide-react";
import { Metadata } from "next";

function formatDate(date?: Date | null) {
    if (!date) return "Not published";

    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
export const metadata: Metadata = {
    title: "News & Updates",
    description:
        "Stay informed with the latest AHPK news, official announcements, hospitality industry updates, events, training opportunities, and continuous professional development activities.",
    alternates: {
        canonical: "/news",
    },
};
export default async function NewsPage() {
    const posts = await prisma.newsPost.findMany({
        where: { published: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });

    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <PublicNavbar />

            <section className="relative overflow-hidden bg-[#111111] text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: "url('/login-hero.png')" }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#C1121F]/50" />

                <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
                    <div className="max-w-4xl">
                        <p className="text-sm font-black uppercase tracking-[0.45em] text-[#F3C64E]">
                            News & Updates
                        </p>

                        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                            AHPK News Centre
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/80">
                            Stay updated with association news, official announcements,
                            training opportunities, CPD activities and hospitality industry
                            updates.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/events"
                                className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#111111] transition hover:bg-[#F3C64E]"
                            >
                                <CalendarDays className="h-4 w-4" />
                                View Events
                            </Link>

                            <Link
                                href="/resources"
                                className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
                            >
                                <ShieldCheck className="h-4 w-4" />
                                Resources
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <HeroStat icon={Newspaper} title={`${posts.length} Published Updates`} />
                        <HeroStat icon={Megaphone} title="Official Announcements" />
                        <HeroStat icon={CalendarDays} title="Events & CPD Updates" />
                    </div>
                </div>
            </section>

            {featuredPost && (
                <section className="bg-[#F4F6F8] py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="mb-10">
                            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#C1121F]">
                                Featured Update
                            </p>

                            <h2 className="mt-3 text-3xl font-black text-slate-950">
                                Latest from AHPK
                            </h2>
                        </div>

                        <Link
                            href={`/news/${featuredPost.slug}`}
                            className="group grid overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:grid-cols-[1fr_1fr]"
                        >
                            <div className="min-h-[320px] bg-slate-100">
                                {featuredPost.imageUrl ? (
                                    <img
                                        src={featuredPost.imageUrl}
                                        alt={featuredPost.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full min-h-[320px] items-center justify-center bg-gradient-to-br from-[#111111] to-[#C1121F] text-white">
                                        <Newspaper className="h-20 w-20 opacity-80" />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col justify-center p-8 lg:p-10">
                                <div className="flex items-center gap-2 text-sm font-black text-[#C1121F]">
                                    <CalendarDays className="h-4 w-4" />
                                    {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                                </div>

                                <h3 className="mt-4 text-3xl font-black leading-tight text-slate-950">
                                    {featuredPost.title}
                                </h3>

                                <p className="mt-5 line-clamp-4 text-sm font-semibold leading-7 text-slate-500">
                                    {featuredPost.excerpt || featuredPost.content}
                                </p>

                                <div className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#C1121F]">
                                    Read Full Story
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm font-black uppercase tracking-[0.35em] text-[#C1121F]">
                            All Updates
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-slate-950">
                            News & Announcements
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
                            Browse official updates, association notices and industry news
                            published by AHPK.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-700">
                        {posts.length} Article{posts.length === 1 ? "" : "s"}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {otherPosts.map((post) => (
                        <article
                            key={post.id}
                            className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <Link href={`/news/${post.slug}`}>
                                <div className="h-56 overflow-hidden bg-slate-100">
                                    {post.imageUrl ? (
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#111111] to-[#C1121F] text-white">
                                            <Newspaper className="h-14 w-14 opacity-80" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm font-black text-[#C1121F]">
                                        <CalendarDays className="h-4 w-4" />
                                        {formatDate(post.publishedAt || post.createdAt)}
                                    </div>

                                    <h2 className="mt-3 text-xl font-black leading-tight text-slate-950">
                                        {post.title}
                                    </h2>

                                    <p className="mt-3 line-clamp-3 text-sm font-semibold leading-7 text-slate-500">
                                        {post.excerpt || post.content}
                                    </p>

                                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#C1121F]">
                                        Read More
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}

                    {posts.length === 1 && (
                        <div className="rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm md:col-span-2 lg:col-span-3">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                                <Newspaper className="h-8 w-8" />
                            </div>

                            <h2 className="mt-5 text-2xl font-black text-slate-950">
                                More updates will be published soon.
                            </h2>

                            <p className="mt-3 text-sm font-semibold text-slate-500">
                                Please check back later for more AHPK news and announcements.
                            </p>
                        </div>
                    )}

                    {posts.length === 0 && (
                        <div className="col-span-full rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                                <Newspaper className="h-8 w-8" />
                            </div>

                            <h2 className="mt-5 text-2xl font-black text-slate-950">
                                No news articles published yet.
                            </h2>

                            <p className="mt-3 text-sm font-semibold text-slate-500">
                                AHPK news and updates will appear here once published.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="bg-[#F4F6F8] py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="overflow-hidden rounded-[32px] bg-[#C1121F] p-8 text-white shadow-xl md:p-12">
                        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                            <div>
                                <p className="text-sm font-black uppercase tracking-[0.35em] text-[#F3C64E]">
                                    Stay Connected
                                </p>

                                <h2 className="mt-3 max-w-3xl text-3xl font-black">
                                    Follow AHPK updates, events and professional development
                                    opportunities.
                                </h2>
                            </div>

                            <Link
                                href="/events"
                                className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#C1121F] transition hover:bg-[#F3C64E]"
                            >
                                <CalendarDays className="h-4 w-4" />
                                View Events
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function HeroStat({
    title,
    icon: Icon,
}: {
    title: string;
    icon: React.ElementType;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#F3C64E]">
                <Icon className="h-5 w-5" />
            </div>

            <p className="mt-4 text-sm font-black">{title}</p>
        </div>
    );
}
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Newspaper,
    ShieldCheck,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "@/app/components/public/PublicNavbar";
import PublicFooter from "@/app/components/public/PublicFooter";

function formatDate(date?: Date | null) {
    if (!date) return "Not published";

    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = await prisma.newsPost.findUnique({
        where: { slug },
    });

    if (!post || !post.published) notFound();

    const relatedPosts = await prisma.newsPost.findMany({
        where: {
            published: true,
            id: { not: post.id },
        },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        take: 3,
    });

    const heroImage = post.imageUrl || "/login-hero.png";

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <PublicNavbar />

            <section className="relative overflow-hidden bg-[#111111] text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#C1121F]/50" />

                <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to News
                    </Link>

                    <p className="mt-10 text-sm font-black uppercase tracking-[0.45em] text-[#F3C64E]">
                        News & Updates
                    </p>

                    <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        {post.title}
                    </h1>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-black text-white/80 backdrop-blur">
                        <CalendarDays className="h-4 w-4 text-[#F3C64E]" />
                        {formatDate(post.publishedAt || post.createdAt)}
                    </div>

                    {post.excerpt && (
                        <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/80">
                            {post.excerpt}
                        </p>
                    )}
                </div>
            </section>

            <section className="bg-[#F4F6F8] py-20">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_360px] lg:items-start">
                    <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                        <div className="relative h-[260px] overflow-hidden bg-slate-100 sm:h-[420px]">
                            {post.imageUrl ? (
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#111111] to-[#C1121F] text-white">
                                    <Newspaper className="h-20 w-20 opacity-80" />
                                </div>
                            )}
                        </div>

                        <div className="p-8 md:p-10">
                            <div className="mb-8 flex items-center gap-2 text-sm font-black text-[#C1121F]">
                                <CalendarDays className="h-4 w-4" />
                                {formatDate(post.publishedAt || post.createdAt)}
                            </div>

                            <ContentRenderer content={post.content} />
                        </div>
                    </article>

                    <aside className="h-fit rounded-[32px] bg-[#111111] p-6 text-white shadow-xl lg:sticky lg:top-28">
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#F3C64E]">
                            Related Updates
                        </p>

                        <div className="mt-5 grid gap-3">
                            {relatedPosts.length === 0 ? (
                                <p className="text-sm font-semibold leading-7 text-white/60">
                                    More AHPK updates will be published soon.
                                </p>
                            ) : (
                                relatedPosts.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/news/${item.slug}`}
                                        className="group rounded-2xl bg-white/10 p-4 transition hover:bg-[#C1121F]"
                                    >
                                        <div className="flex gap-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#F3C64E]">
                                                <Newspaper className="h-4 w-4" />
                                            </span>

                                            <div>
                                                <p className="text-sm font-black leading-5">
                                                    {item.title}
                                                </p>

                                                <p className="mt-2 text-xs font-bold text-white/55">
                                                    {formatDate(item.publishedAt || item.createdAt)}
                                                </p>

                                                <span className="mt-3 inline-flex items-center gap-1 text-xs font-black text-[#F3C64E]">
                                                    Read More
                                                    <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>

                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5">
                            <ShieldCheck className="h-7 w-7 text-[#F3C64E]" />
                            <p className="mt-4 text-sm font-black">
                                Official AHPK Communication
                            </p>
                            <p className="mt-2 text-sm font-semibold leading-6 text-white/60">
                                This update is published by the Association of Hotel Professionals Kenya.
                            </p>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="overflow-hidden rounded-[32px] bg-[#C1121F] p-8 text-white shadow-xl md:p-12">
                        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                            <div>
                                <p className="text-sm font-black uppercase tracking-[0.35em] text-[#F3C64E]">
                                    Stay Connected
                                </p>

                                <h2 className="mt-3 max-w-3xl text-3xl font-black">
                                    Follow AHPK updates, events and professional development opportunities.
                                </h2>
                            </div>

                            <Link
                                href="/news"
                                className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#C1121F] transition hover:bg-[#F3C64E]"
                            >
                                <Newspaper className="h-4 w-4" />
                                More News
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function ContentRenderer({ content }: { content: string }) {
    return (
        <div className="space-y-6">
            {content
                .split("\n\n")
                .filter(Boolean)
                .map((block, index) => {
                    const clean = block.trim();

                    const isHeading =
                        clean.startsWith("## ") ||
                        (clean === clean.toUpperCase() && clean.length < 90);

                    if (isHeading) {
                        return (
                            <h2
                                key={index}
                                className="pt-4 text-2xl font-black leading-tight text-slate-950"
                            >
                                {clean.replace(/^##\s*/, "")}
                            </h2>
                        );
                    }

                    return (
                        <p
                            key={index}
                            className="text-base font-normal leading-8 text-slate-600 md:text-lg"
                        >
                            {clean}
                        </p>
                    );
                })}
        </div>
    );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";
import {
    ArrowRight,
    Award,
    BadgeCheck,
    BookOpenCheck,
    BookOpenText,
    BriefcaseBusiness,
    History,
    ShieldCheck,
    Users,
} from "lucide-react";
import type { Metadata } from "next";
import BreadcrumbJsonLd from "../components/seo/BreadcrumbJsonLd";
export const metadata: Metadata = {
    title: "Executive Summary",
    description:
        "Read the executive summary of the Association of Hotel Professionals Kenya, including its formation journey, professional mandate, and role in Kenya’s hospitality industry.",
    alternates: {
        canonical: "/executive-summary",
    },
};
export default async function ExecutiveSummaryPage() {
    const page = await prisma.websitePage.findUnique({
        where: { slug: "executive-summary" },
    });

    if (!page || !page.published) notFound();

    const heroImage = page.imageUrl || "/login-hero.png";

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: "/" },
                    { name: "About AHPK", url: "/about" },
                    { name: "Executive Summary", url: "/executive-summary" },
                ]}
            />
            <PublicNavbar />

            <section className="relative overflow-hidden bg-[#111111] text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-45"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#C1121F]/50" />

                <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
                    <p className="text-sm font-black uppercase tracking-[0.45em] text-[#F3C64E]">
                        About AHPK
                    </p>

                    <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        {page.title}
                    </h1>

                    {page.subtitle && (
                        <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/80">
                            {page.subtitle}
                        </p>
                    )}

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/about"
                            className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-8 py-4 text-sm font-black text-white shadow-xl transition hover:bg-red-800"
                        >
                            <Users className="h-4 w-4" />
                            Who We Are
                        </Link>

                        <Link
                            href="/corporate-statements"
                            className="inline-flex min-w-[210px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#111111] transition hover:bg-[#F3C64E]"
                        >
                            <BookOpenCheck className="h-4 w-4" />
                            Corporate Statements
                        </Link>
                    </div>

                    <div className="mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <HeroStat icon={History} title="Formation Journey" />
                        <HeroStat icon={Users} title="Professional Voice" />
                        <HeroStat icon={BriefcaseBusiness} title="Industry Mandate" />
                        <HeroStat icon={ShieldCheck} title="Registered Body" />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
                    <article className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                        <p className="text-sm font-black uppercase tracking-[0.35em] text-[#C1121F]">
                            Executive Summary
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-slate-950">
                            The background and formation journey of AHPK.
                        </h2>

                        <div className="mt-8 space-y-6 text-lg font-semibold leading-9 text-slate-600">
                            {(page.content || "")
                                .split("\n\n")
                                .filter(Boolean)
                                .map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                        </div>
                    </article>

                    <aside className="space-y-5 lg:sticky lg:top-28">
                        <div className="rounded-[32px] bg-[#111111] p-8 text-white shadow-xl">
                            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#F3C64E]">
                                About Menu
                            </p>

                            <div className="mt-6 grid gap-3">
                                <SideLink href="/about" label="Who We Are" />
                                <SideLink
                                    href="/executive-summary"
                                    label="Executive Summary"
                                    active
                                />
                                <SideLink
                                    href="/corporate-statements"
                                    label="Corporate Statements"
                                />
                                <SideLink href="/leadership" label="Leadership" />
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C1121F]">
                                Summary Focus
                            </p>

                            <div className="mt-5 space-y-4">
                                <FocusItem
                                    icon={History}
                                    title="Formation"
                                    text="Documents the journey that led to the formation of AHPK."
                                />

                                <FocusItem
                                    icon={BadgeCheck}
                                    title="Recognition"
                                    text="Explains the need for a professional voice in Kenya’s hospitality industry."
                                />

                                <FocusItem
                                    icon={Award}
                                    title="Professional Growth"
                                    text="Highlights the association’s role in career development and empowerment."
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-[#F4F6F8] py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10">
                        <p className="text-sm font-black uppercase tracking-[0.35em] text-[#C1121F]">
                            AHPK Journey
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-slate-950">
                            Why the association was formed
                        </h2>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <ValueCard
                            icon={Users}
                            title="Professional Voice"
                            text="To give hotel and hospitality professionals a strong collective voice."
                        />

                        <ValueCard
                            icon={BriefcaseBusiness}
                            title="Industry Representation"
                            text="To support engagement with regulators, government and sector stakeholders."
                        />

                        <ValueCard
                            icon={ShieldCheck}
                            title="Professional Standards"
                            text="To promote recognition, ethical standards and professional empowerment."
                        />
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="overflow-hidden rounded-[32px] bg-[#C1121F] p-8 text-white shadow-xl md:p-12">
                        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                            <div>
                                <p className="text-sm font-black uppercase tracking-[0.35em] text-[#F3C64E]">
                                    Explore More
                                </p>

                                <h2 className="mt-3 max-w-3xl text-3xl font-black">
                                    Continue exploring AHPK’s purpose, values and leadership.
                                </h2>
                            </div>

                            <Link
                                href="/corporate-statements"
                                className="inline-flex min-w-[210px] items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#C1121F] transition hover:bg-[#F3C64E]"
                            >
                                View Corporate Statements
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

function SideLink({
    href,
    label,
    active = false,
}: {
    href: string;
    label: string;
    active?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black transition ${active
                ? "bg-[#C1121F] text-white"
                : "bg-white/10 text-white/80 hover:bg-[#C1121F] hover:text-white"
                }`}
        >
            {label}
            <ArrowRight className="h-4 w-4" />
        </Link>
    );
}

function FocusItem({
    icon: Icon,
    title,
    text,
}: {
    icon: React.ElementType;
    title: string;
    text: string;
}) {
    return (
        <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C1121F]">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <h3 className="font-black text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ValueCard({
    icon: Icon,
    title,
    text,
}: {
    icon: React.ElementType;
    title: string;
    text: string;
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                <Icon className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-2xl font-black text-slate-950">{title}</h3>

            <p className="mt-4 text-sm font-semibold leading-7 text-slate-500">
                {text}
            </p>
        </div>
    );
}
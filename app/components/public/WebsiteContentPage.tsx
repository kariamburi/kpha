import Link from "next/link";
import PublicNavbar from "./PublicNavbar";
import PublicFooter from "./PublicFooter";
import { ArrowRight } from "lucide-react";

export default function WebsiteContentPage({
    title,
    subtitle,
    content,
    eyebrow,
    activePath,
}: {
    title: string;
    subtitle?: string | null;
    content?: string | null;
    eyebrow: string;
    activePath?: string;
}) {
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
                    <p className="text-sm font-black uppercase tracking-[0.45em] text-[#F3C64E]">
                        {eyebrow}
                    </p>

                    <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/80">
                            {subtitle}
                        </p>
                    )}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
                    <article className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                        <ContentRenderer content={content || ""} />
                    </article>

                    <aside className="h-fit rounded-[32px] bg-[#111111] p-6 text-white shadow-xl lg:sticky lg:top-28">
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#F3C64E]">
                            About AHPK
                        </p>

                        <div className="mt-5 grid gap-3">
                            <SideLink href="/about" label="Who We Are" active={activePath === "/about"} />
                            <SideLink href="/executive-summary" label="Executive Summary" active={activePath === "/executive-summary"} />
                            <SideLink href="/corporate-statements" label="Corporate Statements" active={activePath === "/corporate-statements"} />
                            <SideLink href="/leadership" label="Leadership" active={activePath === "/leadership"} />
                        </div>
                    </aside>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function ContentRenderer({ content }: { content: string }) {
    const headingKeywords = [
        "VISION STATEMENT",
        "MISSION STATEMENT",
        "CORE VALUES",
        "GOALS AND OBJECTIVES",
    ];

    return (
        <div className="space-y-6">
            {content
                .split("\n\n")
                .filter(Boolean)
                .map((block, index) => {
                    const clean = block.trim();
                    const isHeading =
                        headingKeywords.includes(clean.toUpperCase()) ||
                        clean.startsWith("## ");

                    if (isHeading) {
                        return (
                            <h2
                                key={index}
                                className="pt-3 text-xl font-black uppercase tracking-wide text-slate-800"
                            >
                                {clean.replace(/^##\s*/, "")}
                            </h2>
                        );
                    }

                    return (
                        <p
                            key={index}
                            className="text-base font-medium leading-8 text-slate-600 md:text-lg"
                        >
                            {clean}
                        </p>
                    );
                })}
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
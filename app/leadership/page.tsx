import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";
import {
    Award,
    BadgeCheck,
    BriefcaseBusiness,
    Mail,
    ShieldCheck,
    Users,
} from "lucide-react";
export const metadata: Metadata = {
    title: "Leadership",
    description:
        "Meet the AHPK leadership team guiding governance, professional standards, member recognition, and hospitality industry engagement in Kenya.",
    alternates: {
        canonical: "/leadership",
    },
};
export default async function LeadershipPage() {
    const leaders = await prisma.leader.findMany({
        where: { active: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

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
                            AHPK Leadership
                        </p>

                        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                            Our Leadership Team
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/80">
                            Meet the professionals guiding AHPK’s mission, governance,
                            professional standards and hospitality industry engagement.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/about"
                                className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#111111] transition hover:bg-[#F3C64E]"
                            >
                                <Users className="h-4 w-4" />
                                About AHPK
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
                            >
                                <Mail className="h-4 w-4" />
                                Contact Secretariat
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <HeroStat icon={ShieldCheck} title="Governance" />
                        <HeroStat icon={Award} title="Professional Standards" />
                        <HeroStat icon={BriefcaseBusiness} title="Industry Engagement" />
                        <HeroStat icon={BadgeCheck} title="Member Recognition" />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm font-black uppercase tracking-[0.35em] text-[#C1121F]">
                            Leadership Profiles
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-slate-950">
                            Guiding AHPK forward
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
                            AHPK leadership provides strategic direction, professional
                            oversight and representation for hospitality professionals in
                            Kenya.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-700">
                        {leaders.length} Published Profile{leaders.length === 1 ? "" : "s"}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {leaders.map((leader) => (
                        <article
                            key={leader.id}
                            className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-72 bg-slate-100">
                                {leader.imageUrl ? (
                                    <img
                                        src={leader.imageUrl}
                                        alt={leader.name}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#111111] to-[#C1121F]">
                                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-4xl font-black text-[#C1121F] shadow-xl">
                                            {leader.name.charAt(0)}
                                        </div>
                                    </div>
                                )}

                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5">
                                    <span className="inline-flex rounded-full bg-[#F3C64E] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#111111]">
                                        AHPK Leader
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-black text-slate-950">
                                    {leader.name}
                                </h2>

                                <p className="mt-2 inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-black text-[#C1121F]">
                                    {leader.title}
                                </p>

                                {leader.bio ? (
                                    <p className="mt-5 line-clamp-5 whitespace-pre-line text-sm font-semibold leading-7 text-slate-500">
                                        {leader.bio}
                                    </p>
                                ) : (
                                    <p className="mt-5 text-sm font-semibold leading-7 text-slate-500">
                                        Leadership profile details will be updated soon.
                                    </p>
                                )}
                            </div>
                        </article>
                    ))}

                    {leaders.length === 0 && (
                        <div className="col-span-full rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                                <Users className="h-8 w-8" />
                            </div>

                            <h2 className="mt-5 text-2xl font-black text-slate-950">
                                Leadership profiles will be published soon.
                            </h2>

                            <p className="mt-3 text-sm font-semibold text-slate-500">
                                Please check back later for official AHPK leadership profiles.
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
                                    Work With AHPK
                                </p>

                                <h2 className="mt-3 max-w-3xl text-3xl font-black">
                                    Connect with the association and be part of Kenya’s hospitality
                                    professional community.
                                </h2>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#C1121F] transition hover:bg-[#F3C64E]"
                            >
                                <Mail className="h-4 w-4" />
                                Contact Us
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
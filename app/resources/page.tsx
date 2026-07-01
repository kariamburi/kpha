import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";
import {
  ArrowRight,
  BookOpenCheck,
  Download,
  FileText,
  FolderOpen,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Metadata } from "next";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
export const metadata: Metadata = {
  title: "Resources Centre",
  description:
    "Access AHPK resources, forms, policies, guides, circulars, and official documents for hospitality professionals, members, partners, and the public.",
  alternates: {
    canonical: "/resources",
  },
};

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = Array.from(
    new Set(resources.map((item) => item.category || "General"))
  );

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
              Resources Centre
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Downloads & Member Resources
            </h1>

            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/80">
              Access AHPK forms, policies, guides, circulars and professional
              resources published for members, partners and the public.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#111111] transition hover:bg-[#F3C64E]"
              >
                <ShieldCheck className="h-4 w-4" />
                Apply Membership
              </Link>

              <Link
                href="/events"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
              >
                <BookOpenCheck className="h-4 w-4" />
                Events & CPD
              </Link>
            </div>
          </div>

          <div className="mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <HeroStat icon={FileText} title={`${resources.length} Resources`} />
            <HeroStat icon={FolderOpen} title={`${categories.length} Categories`} />
            <HeroStat icon={Download} title="Downloadable Files" />
            <HeroStat icon={ShieldCheck} title="Official Documents" />
          </div>
        </div>
      </section>

      <section className="bg-[#F4F6F8] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-[#C1121F]">
                Browse Resources
              </p>

              <h2 className="mt-3 text-3xl font-black text-slate-950">
                Public Downloads
              </h2>

              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
                Download official AHPK documents and resources.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm">
              <Search className="h-4 w-4 text-[#C1121F]" />
              {resources.length} Resource{resources.length === 1 ? "" : "s"}
            </div>
          </div>

          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 shadow-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={resource.fileUrl}
                target="_blank"
                className="group rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                    <FileText className="h-7 w-7" />
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                    {resource.category || "General"}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-black text-slate-950">
                  {resource.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm font-semibold leading-7 text-slate-500">
                  {resource.description || "Download this official AHPK resource."}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold text-slate-400">
                    {formatDate(resource.createdAt)}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm font-black text-[#C1121F]">
                    Download
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}

            {resources.length === 0 && (
              <div className="col-span-full rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F]">
                  <FileText className="h-8 w-8" />
                </div>

                <h2 className="mt-5 text-2xl font-black text-slate-950">
                  No resources published yet.
                </h2>

                <p className="mt-3 text-sm font-semibold text-slate-500">
                  Public resources will appear here once published by AHPK.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-[32px] bg-[#C1121F] p-8 text-white shadow-xl md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.35em] text-[#F3C64E]">
                  Need More Support?
                </p>

                <h2 className="mt-3 max-w-3xl text-3xl font-black">
                  Contact AHPK for membership, certification or resource support.
                </h2>
              </div>

              <Link
                href="/contact"
                className="inline-flex min-w-[190px] items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#C1121F] transition hover:bg-[#F3C64E]"
              >
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
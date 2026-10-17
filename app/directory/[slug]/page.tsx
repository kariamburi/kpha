import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Home, ChevronRight, ShieldCheck } from "lucide-react";
import Logo from "@/app/assets/logo.png";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";
import { prisma } from "@/lib/prisma";
import MemberProfileAvatar from "./MemberProfileAvatar";

type Props = { params: Promise<{ slug: string }> };
function memberNumberFromSlug(slug: string) {
  try { return decodeURIComponent(slug).trim(); } catch { return ""; }
}
const publicFields = {
  fullName: true,
  memberNumber: true,
  profileImageUrl: true,
  status: true,
  isDirectoryVisible: true,
  expiryDate: true,
  category: { select: { name: true } },
} as const;

async function findPublicMember(slug: string) {
  const memberNumber = memberNumberFromSlug(slug);
  if (!memberNumber) return null;
  return prisma.member.findFirst({
    where: { memberNumber, status: "ACTIVE", isDirectoryVisible: true, expiryDate: { gte: new Date() } },
    select: publicFields,
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await findPublicMember(slug);
  if (!member) return { title: "Member Not Found | AHPK", robots: { index: false, follow: false } };
  return {
    title: `${member.fullName || "AHPK Member"} | AHPK Directory`,
    description: `Verify active AHPK membership for ${member.fullName || "this member"}.`,
    alternates: { canonical: `/directory/${encodeURIComponent(member.memberNumber)}` },
    robots: { index: false, follow: true },
  };
}

export default async function DirectoryProfilePage({ params }: Props) {
  const { slug } = await params;
  const member = await findPublicMember(slug);
  if (!member) notFound();
  const name = member.fullName || "AHPK Member";
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Member Directory", url: "/directory" }, { name, url: `/directory/${encodeURIComponent(member.memberNumber)}` }]} />
      <header className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl" style={{ "--header-height": "76px" } as CSSProperties}>
        <div className="mx-auto flex h-[74px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8"><Link href="/" aria-label="AHPK homepage" className="shrink-0"><Image src={Logo} alt="Association of Hotel Professionals Kenya" width={76} height={76} priority className="size-[58px] object-contain sm:size-[62px]" /></Link><div className="ml-auto flex items-center"><DesktopNavigation /></div></div>
      </header>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500"><Link href="/" className="inline-flex items-center gap-1 hover:text-[#C8102E]"><Home className="size-3.5" /> Home</Link><ChevronRight className="size-3.5" /><Link href="/directory" className="hover:text-[#C8102E]">Member Directory</Link><ChevronRight className="size-3.5" /><span className="truncate text-[#C8102E]">{name}</span></nav>
        <Link href="/directory" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#C8102E]"><ArrowLeft className="size-4" /> Back to search</Link>
        <section className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-t-4 border-[#C8102E] px-5 py-7 sm:px-8"><p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#C8102E]">Official Member Verification</p><h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Membership Details</h1><p className="mt-2 text-sm text-slate-500">Limited public information for membership verification.</p></div>
          <div className="flex flex-col gap-5 border-t border-slate-100 px-5 py-7 sm:flex-row sm:items-center sm:px-8">
            <MemberProfileAvatar name={name} imageUrl={member.profileImageUrl} />
            <div className="min-w-0"><h2 className="break-words text-2xl font-black">{name}</h2><p className="mt-2 text-sm font-semibold text-slate-500">Member No. <span className="font-black text-slate-800">{member.memberNumber}</span></p><p className="mt-1 text-sm font-semibold text-slate-500">Category: <span className="font-bold text-slate-800">{member.category.name}</span></p><span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700"><BadgeCheck className="size-4" /> Active Member</span></div>
          </div>
          <div className="flex items-start gap-3 border-t border-slate-100 bg-slate-50 px-5 py-5 sm:px-8"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#C8102E]" /><p className="text-sm leading-6 text-slate-600">This member currently has an active AHPK membership and is approved for inclusion in the public directory. Personal contact details and professional records are not displayed.</p></div>
        </section>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><Link href="/directory" className="inline-flex items-center gap-2 text-sm font-bold text-[#C8102E] hover:underline"><ArrowLeft className="size-4" /> Search other members</Link><Link href="/contact" className="text-sm font-bold text-slate-700 hover:text-[#C8102E]">Contact AHPK Secretariat</Link></div>
      </div>
      <PublicFooter />
    </main>
  );
}

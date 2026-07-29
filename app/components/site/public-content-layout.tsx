import Link from "next/link";
import type { ReactNode } from "react";
import { DesktopNavigation } from "./desktop-navigation";
import PublicFooter from "../public/PublicFooter";


export function PublicContentLayout({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f7f4] text-slate-950">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-black text-[#C1121F]">AHPK</Link>
          <DesktopNavigation />
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(193,18,31,.35),transparent_40%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <p className="text-xs font-black uppercase tracking-[.24em] text-red-300">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white/70 sm:text-lg">{description}</p>
            {actions ? <div className="mt-8">{actions}</div> : null}
          </div>
        </section>
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}

export function FilterLinks({
  items,
  activeHref,
}: {
  items: readonly { label: string; href: string }[];
  activeHref: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            item.href === activeHref
              ? "rounded-full bg-[#C1121F] px-4 py-2 text-sm font-black text-white"
              : "rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20"
          }
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-7 text-slate-500">{text}</p>
    </div>
  );
}

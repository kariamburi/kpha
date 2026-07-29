import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    BadgeCheck,
    ChevronRight,
    FileCheck2,
    Home,
    LockKeyhole,
    QrCode,
    ShieldCheck,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import PublicFooter from "@/app/components/public/PublicFooter";
import { DesktopNavigation } from "@/app/components/site/desktop-navigation";

import VerifyClient from "./VerifyClient";

export const metadata: Metadata = {
    title: "Verify Certificate | AHPK",
    description:
        "Verify the authenticity of a certificate issued by the Association of Hotel Professionals Kenya.",

    alternates: {
        canonical: "/verify",
    },

    openGraph: {
        title: "Verify AHPK Certificate",
        description:
            "Confirm the authenticity and validity of an AHPK professional certificate.",
        url: "/verify",
        siteName:
            "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "website",
    },

    robots: {
        index: true,
        follow: true,
    },
};

type VerifyPageProps = {
    searchParams: Promise<{
        code?: string;
        error?: string;
    }>;
};

export default async function VerifyPage({
    searchParams,
}: VerifyPageProps) {
    const params = await searchParams;

    const failedCode =
        params.error && params.code
            ? params.code
            : undefined;

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <PageHeader />

            {/* HERO */}
            <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
                <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
                    <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />

                    <div className="absolute right-0 top-0 h-full w-[55%] bg-[linear-gradient(135deg,transparent_0%,rgba(200,16,46,0.055)_100%)]" />

                    <div className="absolute right-[10%] top-10 h-60 w-60 rounded-full border border-red-100/80" />

                    <div className="absolute right-[15%] top-24 h-32 w-32 rounded-full border border-red-100/60" />
                </div>

                <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-100 bg-white text-[#C8102E] shadow-sm">
                                    <FileCheck2 className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#C8102E]">
                                        AHPK Certificate Verification
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        Official verification service
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Confirm Certificate
                                <span className="mt-2 block text-[#C8102E]">
                                    Authenticity
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                                Verify whether a professional
                                certificate was officially issued by
                                the Association of Hotel Professionals
                                Kenya.
                            </p>
                        </div>

                        <div className="rounded-[26px] border border-red-100 bg-white/90 p-6 shadow-lg shadow-red-100/40 backdrop-blur">
                            <div className="flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
                                    <ShieldCheck className="h-5 w-5" />
                                </span>

                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                        Secure verification
                                    </p>

                                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                                        Verification results are
                                        retrieved directly from official
                                        AHPK certificate records.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VERIFICATION CONTENT */}
            <section className="bg-slate-50/80 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <QrCode className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Verification form
                                    </p>

                                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                                        Enter Certificate Code
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                        Enter the verification code
                                        printed on the certificate. You
                                        can also scan the QR code printed
                                        on an official AHPK certificate.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-slate-200 pt-8">
                                <VerifyClient
                                    failedCode={failedCode}
                                />
                            </div>
                        </section>

                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <VerificationInformation />

                            <div className="rounded-[24px] border border-red-100 bg-red-50/70 p-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#C8102E] shadow-sm">
                                    <LockKeyhole className="h-5 w-5" />
                                </div>

                                <h2 className="mt-5 text-lg font-extrabold text-slate-950">
                                    Unable to Verify?
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                                    Confirm that the code has been
                                    entered exactly as shown on the
                                    certificate. Contact the AHPK
                                    Secretariat if the problem
                                    continues.
                                </p>

                                <Link
                                    href="/contact"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#C8102E]"
                                >
                                    Contact Secretariat

                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <Link
                                href="/"
                                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-[#C8102E]"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Return to Website
                            </Link>
                        </aside>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

function VerificationInformation() {
    return (
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                    Certificate security
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                    What Verification Confirms
                </h2>
            </div>

            <div className="space-y-5 p-6">
                <VerificationItem
                    icon={<BadgeCheck />}
                    title="Official Record"
                    description="Confirms whether the certificate exists in official AHPK records."
                />

                <VerificationItem
                    icon={<FileCheck2 />}
                    title="Certificate Details"
                    description="Displays the certificate holder and relevant professional details."
                />

                <VerificationItem
                    icon={<ShieldCheck />}
                    title="Current Validity"
                    description="Helps confirm the certificate status and authenticity."
                />
            </div>
        </div>
    );
}

function VerificationItem({
    icon,
    title,
    description,
}: {
    icon: ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E] [&>svg]:h-5 [&>svg]:w-5">
                {icon}
            </span>

            <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                    {title}
                </h3>

                <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                    {description}
                </p>
            </div>
        </div>
    );
}

function Breadcrumb() {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500"
        >
            <Link
                href="/"
                className="inline-flex items-center gap-2 transition hover:text-[#C8102E]"
            >
                <Home className="h-4 w-4" />
                Home
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Verify Certificate
            </span>
        </nav>
    );
}

function PageHeader() {
    return (
        <header
            className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
            style={
                {
                    "--header-height": "88px",
                } as CSSProperties
            }
        >
            <div className="mx-auto flex h-[82px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="AHPK homepage"
                    className="shrink-0"
                >
                    <Image
                        src={Logo}
                        alt="Association of Hotel Professionals Kenya"
                        width={92}
                        height={92}
                        priority
                        className="h-[66px] w-[66px] object-contain sm:h-[72px] sm:w-[72px]"
                    />
                </Link>

                <div className="ml-auto flex items-center">
                    <DesktopNavigation />
                </div>
            </div>
        </header>
    );
}
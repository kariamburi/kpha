import type { Metadata } from "next";
import type { CSSProperties } from "react";

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
    const params =
        await searchParams;

    const failedCode =
        params.error &&
            params.code
            ? params.code
            : undefined;

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            <PageHeader />

            {/* =====================================================
                SIMPLE PAGE INTRO
            ===================================================== */}

            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-4">
                        <p className="border-l-4 border-[#C8102E] pl-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                            AHPK Certificate Verification
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Verify a Certificate
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600">
                            Enter the verification code printed on an
                            AHPK certificate to confirm its authenticity
                            and current status.
                        </p>
                    </div>
                </div>
            </section>

            {/* =====================================================
                PRIMARY VERIFICATION SEARCH
            ===================================================== */}

            <section className="bg-slate-50 py-5 sm:py-7">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                        {/* SEARCH HEADER */}

                        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                            <div className="flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                                    <QrCode className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                        Certificate Search
                                    </p>

                                    <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                                        Enter Verification Code
                                    </h2>

                                    <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                                        Use the complete code exactly as
                                        shown on the certificate.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SEARCH FORM */}

                        <div className="p-5 sm:p-6">
                            <VerifyClient
                                failedCode={
                                    failedCode
                                }
                            />
                        </div>

                        {/* TRUST STRIP */}

                        <div className="grid border-t border-slate-200 bg-slate-50 sm:grid-cols-3">
                            <VerificationFact
                                icon={
                                    <BadgeCheck />
                                }
                                label="Source"
                                value="Official AHPK Records"
                            />

                            <VerificationFact
                                icon={
                                    <FileCheck2 />
                                }
                                label="Result"
                                value="Instant Verification"
                            />

                            <VerificationFact
                                icon={
                                    <ShieldCheck />
                                }
                                label="Status"
                                value="Certificate Validity"
                                last
                            />
                        </div>
                    </div>

                    {/* =================================================
                        SUPPORTING INFORMATION
                    ================================================= */}

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C8102E]" />

                                <div>
                                    <h3 className="text-sm font-black text-slate-950">
                                        What verification confirms
                                    </h3>

                                    <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                                        Verification checks whether the
                                        certificate exists in official
                                        AHPK records and displays its
                                        current validity information.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl bg-slate-950 p-4 text-white">
                            <div className="flex items-start gap-3">
                                <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />

                                <div>
                                    <h3 className="text-sm font-black">
                                        Unable to verify?
                                    </h3>

                                    <p className="mt-1 text-xs font-medium leading-5 text-slate-300">
                                        Confirm the code was entered
                                        exactly as printed. Contact the
                                        AHPK Secretariat if the problem
                                        continues.
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-black text-red-300 transition hover:text-white"
                                    >
                                        Contact Secretariat

                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-4 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-black text-slate-500 transition hover:text-[#C8102E]"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />

                            Return to Website
                        </Link>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
    );
}

/* =========================================================
   VERIFICATION FACT
========================================================= */

function VerificationFact({
    icon,
    label,
    value,
    last = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    last?: boolean;
}) {
    return (
        <div
            className={[
                "flex items-center gap-3 px-4 py-3",

                !last
                    ? "border-b border-slate-200 sm:border-b-0 sm:border-r"
                    : "",
            ].join(" ")}
        >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#C8102E] shadow-sm [&>svg]:h-4 [&>svg]:w-4">
                {icon}
            </span>

            <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                    {label}
                </p>

                <p className="mt-0.5 text-xs font-black text-slate-800">
                    {value}
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   BREADCRUMB
========================================================= */

function Breadcrumb() {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-500"
        >
            <Link
                href="/"
                className="inline-flex items-center gap-1.5 transition hover:text-[#C8102E]"
            >
                <Home className="h-3.5 w-3.5" />

                Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Verify Certificate
            </span>
        </nav>
    );
}

/* =========================================================
   HEADER
========================================================= */

function PageHeader() {
    return (
        <header
            className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
            style={
                {
                    "--header-height": "76px",
                } as CSSProperties
            }
        >
            <div className="mx-auto flex h-[74px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="AHPK homepage"
                    className="shrink-0"
                >
                    <Image
                        src={Logo}
                        alt="Association of Hotel Professionals Kenya"
                        width={76}
                        height={76}
                        priority
                        className="h-[58px] w-[58px] object-contain sm:h-[62px] sm:w-[62px]"
                    />
                </Link>

                <div className="ml-auto flex items-center">
                    <DesktopNavigation />
                </div>
            </div>
        </header>
    );
}
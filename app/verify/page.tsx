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

            {/* EDITORIAL MASTHEAD */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />

                    <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
                        <div className="max-w-4xl">
                            <p className="border-l-4 border-[#C8102E] pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                AHPK Certificate Verification
                            </p>

                            <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
                                Confirm Certificate Authenticity
                            </h1>

                            <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
                                Verify whether a professional
                                certificate was officially issued
                                by the Association of Hotel
                                Professionals Kenya.
                            </p>
                        </div>

                        <div className="border-t-4 border-[#C8102E] bg-slate-50 p-5">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#C8102E]" />

                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#C8102E]">
                                        Secure Verification
                                    </p>

                                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                        Results are retrieved
                                        directly from official AHPK
                                        certificate records.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 border-y border-slate-300">
                                <VerificationFact
                                    value="Official"
                                    label="Data Source"
                                />

                                <VerificationFact
                                    value="Instant"
                                    label="Result"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VERIFICATION CONTENT */}
            <section className="bg-white py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_300px] lg:items-start lg:justify-between">
                        <section className="border-t-4 border-[#C8102E] pt-4">
                            <div className="flex items-start gap-3 border-b border-slate-300 pb-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-slate-950 text-white">
                                    <QrCode className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Verification Form
                                    </p>

                                    <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                        Enter Certificate Code
                                    </h2>

                                    <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                        Enter the verification code
                                        printed on the certificate.
                                        You may also scan the QR code
                                        shown on an official AHPK
                                        certificate.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-5">
                                <VerifyClient
                                    failedCode={failedCode}
                                />
                            </div>
                        </section>

                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <VerificationInformation />

                            <section className="border-t-4 border-[#C8102E] bg-slate-950 p-5 text-white">
                                <LockKeyhole className="h-6 w-6 text-red-300" />

                                <h2 className="mt-2 text-xl font-black">
                                    Unable to Verify?
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                                    Confirm that the code was
                                    entered exactly as shown.
                                    Contact the AHPK Secretariat
                                    if the problem continues.
                                </p>

                                <Link
                                    href="/contact"
                                    className="group mt-4 inline-flex items-center gap-2 text-sm font-black text-red-300 transition hover:text-white"
                                >
                                    Contact Secretariat

                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </section>

                            <Link
                                href="/"
                                className="group flex min-h-11 items-center justify-center gap-2 border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-[#C8102E] hover:bg-red-50 hover:text-[#C8102E]"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
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

function VerificationFact({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <div className="border-r border-slate-300 py-3 last:border-r-0">
            <p className="text-lg font-black text-slate-950">
                {value}
            </p>

            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                {label}
            </p>
        </div>
    );
}

function VerificationInformation() {
    return (
        <section className="border-t-4 border-slate-950 bg-slate-50 p-5">
            <div className="border-b border-slate-300 pb-3">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                    Certificate security
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                    What Verification Confirms
                </h2>
            </div>

            <div className="divide-y divide-slate-300 border-b border-slate-300">
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
        </section>
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
        <div className="group flex gap-3 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-950 text-white transition group-hover:bg-[#C8102E] [&>svg]:h-5 [&>svg]:w-5">
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
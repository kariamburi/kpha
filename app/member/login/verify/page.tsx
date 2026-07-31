// app/member/login/verify/page.tsx

import type { Metadata } from "next";
import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import {
    ArrowLeft,
    BadgeCheck,
    ChevronRight,
    KeyRound,
    LockKeyhole,
    MailCheck,
    ShieldCheck,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import VerifyOtpForm from "./VerifyOtpForm";


export const metadata: Metadata = {
    title: "Verify Login OTP | AHPK",
    description:
        "Verify the one-time password sent to your registered email address to securely access the AHPK Member Portal.",

    alternates: {
        canonical: "/member/login/verify",
    },

    robots: {
        index: false,
        follow: false,
    },
};

type VerifyMemberLoginPageProps = {
    searchParams: Promise<{
        memberId?: string;
        email?: string;
        error?: string;
    }>;
};

export default async function VerifyMemberLoginPage({
    searchParams,
}: VerifyMemberLoginPageProps) {
    const params = await searchParams;

    const memberId = String(params.memberId || "");
    const email = String(params.email || "");

    return (
        <main className="min-h-[100svh] bg-white text-slate-950 lg:h-[100svh] lg:overflow-hidden">
            <div className="grid min-h-[100svh] lg:h-full lg:grid-cols-[minmax(0,0.9fr)_minmax(560px,1.1fr)]">
                {/* LEFT VERIFICATION PANEL */}
                <section className="relative flex min-h-[100svh] flex-col bg-white lg:h-full lg:min-h-0 lg:overflow-hidden">
                    <header className="relative flex h-[78px] shrink-0 items-center justify-between border-b border-slate-300 px-5 sm:px-8 lg:px-10">
                        <Link
                            href="/"
                            aria-label="AHPK homepage"
                            className="flex items-center gap-3"
                        >
                            <Image
                                src={Logo}
                                alt="Association of Hotel Professionals Kenya"
                                width={68}
                                height={68}
                                priority
                                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                            />

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#C1121F]">
                                    AHPK
                                </p>

                                <p className="text-sm font-extrabold text-slate-900">
                                    Member Portal
                                </p>
                            </div>
                        </Link>

                        <Link
                            href="/member/login"
                            className="inline-flex min-h-10 items-center gap-2 border border-slate-300 bg-white px-4 text-xs font-extrabold text-slate-700 transition hover:border-[#C1121F] hover:bg-red-50 hover:text-[#C1121F]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </header>

                    <div className="relative min-h-0 flex-1 lg:overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-5 py-8 sm:px-8 lg:px-10">
                            <div className="w-full max-w-lg">
                                <nav
                                    aria-label="Breadcrumb"
                                    className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400"
                                >
                                    <Link
                                        href="/"
                                        className="transition hover:text-[#C1121F]"
                                    >
                                        Home
                                    </Link>

                                    <ChevronRight className="h-3.5 w-3.5" />

                                    <Link
                                        href="/member/login"
                                        className="transition hover:text-[#C1121F]"
                                    >
                                        Member Login
                                    </Link>

                                    <ChevronRight className="h-3.5 w-3.5" />

                                    <span className="text-[#C1121F]">
                                        OTP Verification
                                    </span>
                                </nav>

                                <div className="mt-5 border-l-4 border-[#C1121F] pl-4">
                                    <div className="flex h-10 w-10 items-center justify-center bg-slate-950 text-white">
                                        <KeyRound className="h-5 w-5" />
                                    </div>

                                    <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-[#C1121F]">
                                        Identity verification
                                    </p>

                                    <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                                        Enter Your OTP
                                    </h1>

                                    <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                        Enter the six-digit one-time
                                        password sent to{" "}
                                        <span className="font-extrabold text-slate-900">
                                            {email ||
                                                "your registered email address"}
                                        </span>
                                        .
                                    </p>
                                </div>

                                {params.error ? (
                                    <div
                                        role="alert"
                                        className="mt-5 border-l-4 border-[#C1121F] bg-red-50 px-4 py-4"
                                    >
                                        <p className="text-sm font-extrabold text-red-700">
                                            Invalid or expired OTP
                                        </p>

                                        <p className="mt-1 text-sm font-medium leading-6 text-red-600">
                                            Confirm the code and try
                                            again. You may request a
                                            new code if the current
                                            one has expired.
                                        </p>
                                    </div>
                                ) : null}

                                <div className="mt-5 border-x border-b border-slate-300 border-t-4 border-t-[#C1121F] bg-white p-5 sm:p-6">
                                    <VerifyOtpForm
                                        memberId={memberId}
                                    />
                                </div>

                                <div className="mt-4 flex items-start gap-3 border border-slate-300 bg-slate-50 p-4">
                                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#C1121F]" />

                                    <p className="text-xs font-semibold leading-5 text-slate-500">
                                        This code is temporary and
                                        should never be shared. AHPK
                                        staff will never ask you to
                                        disclose your one-time
                                        password.
                                    </p>
                                </div>

                                <div className="mt-5 flex flex-col gap-3 border-t border-slate-300 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Didn&apos;t receive the code?
                                    </p>

                                    <Link
                                        href="/member/login"
                                        className="group inline-flex items-center gap-2 text-sm font-extrabold text-[#C1121F]"
                                    >
                                        Request Another Code

                                        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* RIGHT VISUAL PANEL */}
                <section className="relative hidden h-full overflow-hidden bg-slate-100 lg:block">
                    <Image
                        src="/login-hero.png"
                        alt="AHPK hospitality professionals"
                        fill
                        priority
                        sizes="55vw"
                        className="object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.7)_14%,rgba(255,255,255,0.1)_42%,rgba(15,23,42,0.18)_100%)]" />

                    <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

                    <div className="absolute right-8 top-8 flex h-14 w-14 items-center justify-center border border-white/50 bg-white/90 backdrop-blur">
                        <Image
                            src={Logo}
                            alt=""
                            width={44}
                            height={44}
                            className="h-10 w-10 object-contain"
                        />
                    </div>

                    <div className="relative flex h-full items-end px-10 pb-10 xl:px-14 xl:pb-12">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 border-l-4 border-red-300 bg-slate-950/40 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                                <ShieldCheck className="h-4 w-4" />
                                Secure Verification
                            </div>

                            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white xl:text-5xl">
                                One final step to access your
                                professional membership services.
                            </h2>

                            <p className="mt-4 max-w-xl text-base font-medium leading-7 text-white/80 xl:text-lg xl:leading-8">
                                OTP verification protects your
                                membership profile, certificates,
                                payment records and member-only
                                services from unauthorized access.
                            </p>

                            <div className="mt-6 grid max-w-xl grid-cols-3 border-t border-white/30">
                                <PortalFeature
                                    icon={<MailCheck />}
                                    label="Email verified"
                                />

                                <PortalFeature
                                    icon={<KeyRound />}
                                    label="One-time code"
                                />

                                <PortalFeature
                                    icon={<BadgeCheck />}
                                    label="Member access"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function PortalFeature({
    icon,
    label,
}: {
    icon: ReactNode;
    label: string;
}) {
    return (
        <div className="border-b border-r border-white/30 bg-slate-950/20 p-4 text-white backdrop-blur last:border-r-0">
            <span className="text-red-200 [&>svg]:h-5 [&>svg]:w-5">
                {icon}
            </span>

            <p className="mt-3 text-sm font-extrabold">
                {label}
            </p>
        </div>
    );
}
// app/member/login/verify/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ChevronRight,
    KeyRound,
    LockKeyhole,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import VerifyOtpForm from "./VerifyOtpForm";

export const metadata: Metadata = {
    title: "Verify Login OTP | AHPK",
    description:
        "Verify the one-time password sent to your registered email address to securely access the AHPK Member Portal.",
    alternates: { canonical: "/member/login/verify" },
    robots: { index: false, follow: false },
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
    const hasError = Boolean(params.error);

    return (
        <main className="flex min-h-[100svh] flex-col bg-slate-50 text-slate-950">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
                    <Link href="/" aria-label="AHPK homepage" className="flex items-center gap-2.5">
                        <Image
                            src={Logo}
                            alt="Association of Hotel Professionals Kenya"
                            width={54}
                            height={54}
                            priority
                            className="h-12 w-12 object-contain"
                        />
                        <span className="text-sm font-black tracking-tight text-slate-900 sm:text-base">
                            AHPK <span className="font-semibold text-slate-500">Member Portal</span>
                        </span>
                    </Link>
                    <Link
                        href="/member/login"
                        className="inline-flex min-h-10 items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-[#C1121F] sm:text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back to login
                    </Link>
                </div>
            </header>

            <section className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
                <div className="w-full max-w-[460px]">
                    <div className="border border-slate-200 border-t-4 border-t-[#C1121F] bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-slate-950 text-white">
                                <KeyRound className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                Verify Your Login
                            </h1>
                        </div>

                        <p className="mt-3 break-words text-sm leading-6 text-slate-600">
                            Enter the six-digit one-time password sent to{" "}
                            <span className="font-bold text-slate-900">
                                {email || "your registered email address"}
                            </span>
                            .
                        </p>

                        {hasError ? (
                            <div role="alert" className="mt-4 border-l-4 border-[#C1121F] bg-red-50 px-3 py-3">
                                <p className="text-sm font-bold text-red-800">Invalid or expired OTP.</p>
                                <p className="mt-1 text-xs leading-5 text-red-700">
                                    Check the six-digit code or return to login to request a new one.
                                </p>
                            </div>
                        ) : null}

                        {memberId ? (
                            <div className="mt-5">
                                <VerifyOtpForm memberId={memberId} />
                            </div>
                        ) : (
                            <div role="alert" className="mt-5 border-l-4 border-[#C1121F] bg-red-50 px-3 py-3">
                                <p className="text-sm font-bold text-red-800">Verification link is incomplete.</p>
                                <p className="mt-1 text-xs leading-5 text-red-700">
                                    Please start again from Member Login to request a new code.
                                </p>
                                <Link href="/member/login" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#C1121F] hover:underline">
                                    Return to login <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </div>
                        )}

                        <div className="mt-5 border-t border-slate-200 pt-4">
                            <p className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#C1121F]" aria-hidden="true" />
                                Never share your one-time password with anyone.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
                        <span className="text-slate-600">Didn&apos;t receive the code?</span>
                        <Link href="/member/login" className="inline-flex items-center gap-1 font-bold text-[#C1121F] hover:underline">
                            Request another code <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

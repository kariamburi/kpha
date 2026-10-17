// app/member/login/verify/VerifyOtpForm.tsx
"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft, ArrowRight, KeyRound, LoaderCircle } from "lucide-react";
import { verifyMemberLoginOtp } from "../actions";

type VerifyOtpFormProps = { memberId: string };

export default function VerifyOtpForm({ memberId }: VerifyOtpFormProps) {
    return (
        <form action={verifyMemberLoginOtp} className="space-y-4">
            <input type="hidden" name="memberId" value={memberId} />

            <div>
                <label htmlFor="otp" className="block text-sm font-bold text-slate-800">
                    One-time password <span className="text-[#C1121F]">*</span>
                </label>
                <p id="otp-help" className="mt-1 text-xs leading-5 text-slate-500">
                    Enter the six-digit code from your email.
                </p>
                <div className="relative mt-2">
                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    <input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="[0-9]{6}"
                        minLength={6}
                        maxLength={6}
                        autoFocus
                        aria-describedby="otp-help"
                        placeholder="000000"
                        className="min-h-12 w-full border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-center text-xl font-black tracking-[0.3em] text-slate-900 outline-none transition placeholder:text-slate-300 hover:border-slate-400 focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />
                </div>
            </div>

            <SubmitButton />
            <Link href="/member/login" className="inline-flex min-h-10 w-full items-center justify-center gap-2 text-sm font-bold text-slate-600 transition hover:text-[#C1121F]">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to login
            </Link>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 bg-[#C1121F] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {pending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <KeyRound className="h-4 w-4" aria-hidden="true" />}
            {pending ? "Verifying OTP..." : "Verify & Continue"}
            {!pending && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
    );
}

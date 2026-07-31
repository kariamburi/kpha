"use client";

import { useFormStatus } from "react-dom";

import {
    ArrowLeft,
    ArrowRight,
    KeyRound,
    LoaderCircle,
} from "lucide-react";

import Link from "next/link";

import { verifyMemberLoginOtp } from "../actions";

type VerifyOtpFormProps = {
    memberId: string;
};

export default function VerifyOtpForm({
    memberId,
}: VerifyOtpFormProps) {
    return (
        <form
            action={verifyMemberLoginOtp}
            className="space-y-5"
        >
            <input
                type="hidden"
                name="memberId"
                value={memberId}
            />

            <div>
                <label
                    htmlFor="otp"
                    className="block text-sm font-extrabold text-slate-800"
                >
                    One-time password
                    <span className="ml-1 text-[#C1121F]">
                        *
                    </span>
                </label>

                <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                    Enter the six-digit code from your
                    registered email address.
                </p>

                <div className="relative mt-3">
                    <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

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
                        className="h-14 w-full rounded-lg border border-slate-300 bg-white py-3 pl-12 pr-4 text-center text-2xl font-black tracking-[0.35em] text-slate-950 outline-none transition placeholder:text-slate-300 hover:border-slate-400 focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />
                </div>

                <p
                    id="otp-help"
                    className="mt-2 text-xs font-medium text-slate-500"
                >
                    The code contains six numbers.
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <Link
                    href="/member/login"
                    className="flex min-h-12 items-center justify-center gap-2 border border-slate-300 bg-white px-5 text-sm font-extrabold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>

                <SubmitButton />
            </div>
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
            className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#C1121F] px-5 text-sm font-extrabold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-65"
        >
            {pending ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
                <KeyRound className="h-4 w-4" />
            )}

            {pending
                ? "Verifying OTP..."
                : "Verify & Continue"}

            {!pending ? (
                <ArrowRight className="h-4 w-4" />
            ) : null}
        </button>
    );
}
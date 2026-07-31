"use client";

import { useFormStatus } from "react-dom";

import {
    ArrowRight,
    IdCard,
    LoaderCircle,
    Mail,
    ShieldCheck,
} from "lucide-react";

import { sendMemberLoginOtp } from "./actions";

export default function LoginForm() {
    return (
        <form
            action={sendMemberLoginOtp}
            className="space-y-5"
        >
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-extrabold text-slate-800"
                >
                    Email address
                    <span className="ml-1 text-[#C1121F]">
                        *
                    </span>
                </label>

                <div className="relative mt-2">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="name@example.com"
                        className="min-h-12 w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:font-medium placeholder:text-slate-400 hover:border-slate-400 focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="idNumber"
                    className="block text-sm font-extrabold text-slate-800"
                >
                    ID or passport number
                    <span className="ml-1 text-[#C1121F]">
                        *
                    </span>
                </label>

                <div className="relative mt-2">
                    <IdCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                        id="idNumber"
                        name="idNumber"
                        type="text"
                        inputMode="text"
                        required
                        autoComplete="off"
                        autoCapitalize="characters"
                        spellCheck={false}
                        placeholder="Enter your identification number"
                        className="min-h-12 w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:font-medium placeholder:text-slate-400 hover:border-slate-400 focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />
                </div>
            </div>

            <div className="flex items-start gap-3 border-l-4 border-[#C1121F] bg-red-50 px-4 py-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C1121F]" />

                <p className="text-xs font-semibold leading-5 text-slate-600">
                    A one-time password will be sent to
                    your registered email address and
                    will be required on the next screen.
                </p>
            </div>

            <SubmitButton />
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
            className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#C1121F] px-6 text-sm font-extrabold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-65"
        >
            {pending ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
                <Mail className="h-5 w-5" />
            )}

            {pending
                ? "Sending secure OTP..."
                : "Send One-Time Password"}

            {!pending ? (
                <ArrowRight className="h-4 w-4" />
            ) : null}
        </button>
    );
}
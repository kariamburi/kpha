// app/member/login/LoginForm.tsx
"use client";

import { useFormStatus } from "react-dom";
import { ArrowRight, IdCard, LoaderCircle, Mail } from "lucide-react";
import { sendMemberLoginOtp } from "./actions";

const inputClasses =
    "min-h-11 w-full border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-[#C1121F] focus:ring-2 focus:ring-red-100";

export default function LoginForm() {
    return (
        <form action={sendMemberLoginOtp} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-800">
                    Email address <span className="text-[#C1121F]">*</span>
                </label>
                <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        autoCapitalize="none"
                        spellCheck={false}
                        placeholder="name@example.com"
                        className={inputClasses}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="idNumber" className="block text-sm font-bold text-slate-800">
                    ID or passport number <span className="text-[#C1121F]">*</span>
                </label>
                <div className="relative mt-1.5">
                    <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    <input
                        id="idNumber"
                        name="idNumber"
                        type="text"
                        required
                        autoComplete="off"
                        autoCapitalize="characters"
                        spellCheck={false}
                        placeholder="Enter your ID or passport number"
                        className={inputClasses}
                    />
                </div>
            </div>

            <p className="text-xs leading-5 text-slate-500">
                We’ll send a one-time password to your registered email for verification.
            </p>

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
            className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 bg-[#C1121F] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {pending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Mail className="h-4 w-4" aria-hidden="true" />}
            {pending ? "Sending one-time password..." : "Send One-Time Password"}
            {!pending && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
    );
}

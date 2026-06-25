"use client";

import { useFormStatus } from "react-dom";
import { sendMemberLoginOtp } from "./actions";

export default function LoginForm() {
    return (
        <form action={sendMemberLoginOtp} className="space-y-6">
            <div>
                <label className="text-sm font-black text-slate-700">
                    Email Address <span className="text-[#C1121F]">*</span>
                </label>

                <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 h-14 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                />
            </div>

            <div>
                <label className="text-sm font-black text-slate-700">
                    ID / Passport Number <span className="text-[#C1121F]">*</span>
                </label>

                <input
                    name="idNumber"
                    required
                    className="mt-2 h-14 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                />
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
            className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#C1121F] px-5 font-black text-white shadow-lg transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
            {pending && (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}

            {pending ? "Sending OTP..." : "Send OTP"}
        </button>
    );
}
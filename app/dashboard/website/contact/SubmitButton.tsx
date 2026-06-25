"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="mt-6 inline-flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#C1121F] px-6 py-3 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
            {pending && (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}

            {pending ? "Saving..." : "Save Contact Page"}
        </button>
    );
}
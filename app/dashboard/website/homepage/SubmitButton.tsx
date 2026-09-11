"use client";

import {
    Loader2,
    Trash2,
} from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
    label: string;
    pendingLabel?: string;
    variant?: "primary" | "dark" | "danger";
    showTrashIcon?: boolean;
};

export default function SubmitButton({
    label,
    pendingLabel = "Saving...",
    variant = "primary",
    showTrashIcon = false,
}: SubmitButtonProps) {
    const { pending } =
        useFormStatus();

    const baseClasses =
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60";

    const variantClasses = {
        primary:
            "bg-[#C8102E] text-white hover:bg-[#A80D27]",
        dark:
            "bg-slate-950 text-white hover:bg-slate-800",
        danger:
            "bg-red-50 text-red-700 hover:bg-red-100",
    };

    return (
        <button
            type="submit"
            disabled={pending}
            className={`${baseClasses} ${variantClasses[variant]}`}
        >
            {pending ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />

                    {pendingLabel}
                </>
            ) : (
                <>
                    {showTrashIcon ? (
                        <Trash2 className="h-4 w-4" />
                    ) : null}

                    {label}
                </>
            )}
        </button>
    );
}
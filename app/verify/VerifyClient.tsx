"use client";

import {
    AlertCircle,
    ArrowRight,
    BadgeCheck,
    LoaderCircle,
    Search,
} from "lucide-react";

import {
    useState,
    type FormEvent,
} from "react";

import { useRouter } from "next/navigation";

export default function VerifyClient({
    failedCode,
}: {
    failedCode?: string;
}) {
    const router = useRouter();

    const [code, setCode] = useState(
        failedCode || "",
    );

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");

    function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError("");

        const cleanCode = code
            .trim()
            .toUpperCase();

        if (!cleanCode) {
            setError(
                "Enter the verification code printed on the certificate.",
            );

            return;
        }

        setSubmitting(true);

        router.push(
            `/verify/${encodeURIComponent(
                cleanCode,
            )}`,
        );
    }

    return (
        <div>
            {failedCode ? (
                <div
                    role="alert"
                    className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4"
                >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />

                    <div>
                        <p className="text-sm font-extrabold text-red-700">
                            No certificate was found
                        </p>

                        <p className="mt-1 text-sm font-medium leading-6 text-red-600">
                            We could not find an AHPK
                            certificate with verification
                            code{" "}
                            <span className="font-mono font-extrabold">
                                {failedCode}
                            </span>
                            . Confirm the code and try
                            again.
                        </p>
                    </div>
                </div>
            ) : null}

            {error ? (
                <div
                    role="alert"
                    className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm font-semibold text-red-700"
                >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                    <span>{error}</span>
                </div>
            ) : null}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label
                        htmlFor="verificationCode"
                        className="block text-sm font-extrabold text-slate-800"
                    >
                        Certificate verification code
                        <span className="ml-1 text-[#C1121F]">
                            *
                        </span>
                    </label>

                    <div className="relative mt-2">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                            id="verificationCode"
                            name="verificationCode"
                            value={code}
                            required
                            autoComplete="off"
                            spellCheck={false}
                            onChange={(event) =>
                                setCode(
                                    event.target.value.toUpperCase(),
                                )
                            }
                            placeholder="Example: AHPK-8C1501EF"
                            className="min-h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 font-mono text-sm font-extrabold uppercase tracking-wide text-slate-900 outline-none transition placeholder:font-semibold placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#C1121F] focus:bg-white focus:ring-4 focus:ring-red-100/70"
                        />
                    </div>

                    <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                        Enter the complete code including
                        letters, numbers and hyphens.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="flex min-h-13 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#C1121F] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-65"
                >
                    {submitting ? (
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                    ) : (
                        <BadgeCheck className="h-5 w-5" />
                    )}

                    {submitting
                        ? "Checking certificate..."
                        : "Verify Certificate"}

                    {!submitting ? (
                        <ArrowRight className="h-4 w-4" />
                    ) : null}
                </button>
            </form>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <ShieldCheckIcon />

                <p className="text-xs font-semibold leading-6 text-slate-500">
                    Verification confirms whether the
                    certificate code matches an official
                    AHPK certificate record.
                </p>
            </div>
        </div>
    );
}

function ShieldCheckIcon() {
    return (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#C1121F] shadow-sm">
            <BadgeCheck className="h-4 w-4" />
        </span>
    );
}
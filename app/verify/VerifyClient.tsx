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
        <div className="w-full max-w-2xl">
            {failedCode ? (
                <div
                    role="alert"
                    className="mb-5 flex items-start gap-3 border-l-4 border-red-600 bg-red-50 px-4 py-3"
                >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />

                    <div>
                        <p className="text-sm font-black text-red-700">
                            No certificate was found
                        </p>

                        <p className="mt-1 text-sm font-medium leading-6 text-red-600">
                            We could not find an AHPK
                            certificate with verification
                            code{" "}
                            <span className="font-mono font-black">
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
                    className="mb-5 flex items-start gap-3 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
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
                        className="block text-sm font-black text-slate-800"
                    >
                        Certificate verification code

                        <span className="ml-1 text-[#C8102E]">
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
                            className="min-h-[52px] w-full border border-slate-300 bg-white py-3 pl-12 pr-4 font-mono text-sm font-black uppercase tracking-wide text-slate-900 outline-none transition placeholder:font-semibold placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-400 focus:border-[#C8102E] focus:ring-2 focus:ring-red-100"
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
                    className="group inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 bg-[#C8102E] px-7 text-sm font-black text-white transition duration-200 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto"
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
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    ) : null}
                </button>
            </form>

            <div className="mt-5 max-w-2xl border-l-4 border-slate-950 bg-slate-50 px-4 py-4">
                <div className="flex items-start gap-3">
                    <ShieldCheckIcon />

                    <p className="text-xs font-semibold leading-6 text-slate-500">
                        Verification confirms whether
                        the certificate code matches an
                        official AHPK certificate
                        record.
                    </p>
                </div>
            </div>
        </div>
    );
}

function ShieldCheckIcon() {
    return (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center bg-slate-950 text-white">
            <BadgeCheck className="h-4 w-4" />
        </span>
    );
}
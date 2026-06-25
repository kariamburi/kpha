"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { approveApplication, rejectApplication } from "./actions";

export default function ApplicationDecisionButtons({
    applicationId,
    status,
}: {
    applicationId: string;
    status: string;
}) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const approved = status === "APPROVED";
    const rejected = status === "REJECTED";

    function handleApprove() {
        setError("");

        startTransition(async () => {
            const res = await approveApplication(applicationId);

            if (!res.ok) {
                setError(res.error || "Failed to approve application.");
                return;
            }

            router.refresh();
        });
    }

    function handleReject() {
        setError("");

        startTransition(async () => {
            const res: any = await rejectApplication(applicationId);

            if (!res.ok) {
                setError(res.error || "Failed to reject application.");
                return;
            }

            router.refresh();
        });
    }

    return (
        <div className="mt-5">
            {error && (
                <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {error}
                </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-900">
                    Final Decision
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                    Approving creates the member record and generates the certificate.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        disabled={pending || approved}
                        onClick={handleApprove}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <CheckIcon />

                        {approved
                            ? "Already Approved"
                            : pending
                                ? "Please wait..."
                                : "Approve Application"}
                    </button>

                    <button
                        type="button"
                        disabled={pending || rejected}
                        onClick={handleReject}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <XIcon />

                        {rejected
                            ? "Already Rejected"
                            : pending
                                ? "Please wait..."
                                : "Reject Application"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function CheckIcon() {
    return (
        <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}
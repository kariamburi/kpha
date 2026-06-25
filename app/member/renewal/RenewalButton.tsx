"use client";

import { useState } from "react";

export default function RenewalButton({
    memberId,
}: {
    memberId: string;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function startRenewalPayment() {
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/paystack/renewal/initialize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberId }),
            });

            const data = await res.json();

            if (!res.ok || !data.ok) {
                setError(data.error || "Failed to start renewal payment.");
                return;
            }

            window.location.href = data.authorizationUrl;
        } catch {
            setError("Failed to start renewal payment. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-6">
            {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                    {error}
                </div>
            )}

            <button
                type="button"
                disabled={loading}
                onClick={startRenewalPayment}
                className="flex cursor-pointer w-full items-center justify-center rounded-xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Starting payment..." : "Pay Renewal Fee"}
            </button>
        </div>
    );
}
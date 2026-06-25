"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/app/assets/logo.png";

export default function VerifyClient({
    failedCode,
}: {
    failedCode?: string;
}) {
    const router = useRouter();
    const [code, setCode] = useState(failedCode || "");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const cleanCode = code.trim().toUpperCase();

        if (!cleanCode) return;

        router.push(`/verify/${encodeURIComponent(cleanCode)}`);
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="bg-[#111111] px-4 py-10 text-white">
                <div className="mx-auto max-w-5xl">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2">
                            <Image
                                src={Logo}
                                alt="AHPK Logo"
                                width={52}
                                height={52}
                                className="object-contain"
                                priority
                            />
                        </div>

                        <div>
                            <p className="text-xs font-black tracking-[0.35em] text-[#F3C64E]">
                                AHPK CERTIFICATE VERIFICATION
                            </p>

                            <h1 className="mt-1 text-3xl font-black">
                                Verify Certificate
                            </h1>

                            <p className="mt-2 text-sm font-semibold text-white/70">
                                Association of Hotel Professionals Kenya
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto -mt-8 max-w-3xl px-4 pb-12">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl md:p-8">
                    {failedCode && (
                        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
                            <p className="text-sm font-black">
                                No certificate found
                            </p>

                            <p className="mt-1 text-sm font-semibold leading-6">
                                We could not find a certificate with verification code{" "}
                                <span className="font-mono font-black">
                                    {failedCode}
                                </span>
                                . Please confirm the code and try again.
                            </p>
                        </div>
                    )}

                    <p className="text-sm font-black text-slate-500">
                        Enter Verification Code
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                        Confirm certificate authenticity
                    </h2>

                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                        Enter the verification code printed on the certificate or scan the QR code.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="Example: AHPK-8C1501EF"
                            className="h-14 w-full rounded-2xl border border-slate-300 px-5 font-mono text-sm font-black uppercase outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                        />

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800"
                        >
                            Verify Certificate
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}
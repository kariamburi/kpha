"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/app/assets/logo.png";

function generateCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 5 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join("");
}

export default function LoginPage() {
    const router = useRouter();

    const verificationCode = useMemo(() => generateCode(), []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [otp, setOtp] = useState("");
    const [otpMode, setOtpMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (otpMode) {
            setLoading(true);

            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp }),
            });

            const data = await res.json();
            setLoading(false);

            if (!data.ok) {
                setError(data.error || "Invalid OTP");
                return;
            }

            router.push("/dashboard");
            return;
        }

        if (captcha.trim().toUpperCase() !== verificationCode) {
            setError("Invalid verification code");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (!data.ok) {
            setError(data.error || "Login failed");
            return;
        }

        if (data.requiresOtp) {
            setOtpMode(true);
            return;
        }

        router.push("/dashboard");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
                <div className="flex flex-col justify-center bg-[#111111] p-10 text-white">
                    <div className="mb-6">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white p-2 shadow-lg">
                            <Image src={Logo} alt="AHPK Logo" width={90} height={90} priority className="h-full w-full object-contain" />
                        </div>

                        <h1 className="text-4xl font-bold text-[#C1121F]">AHPK Portal</h1>
                        <div className="mt-4 h-1 w-24 rounded-full bg-[#C1121F]" />
                    </div>

                    <h2 className="mb-4 text-2xl font-semibold">Welcome Back</h2>

                    <p className="leading-7 text-gray-300">
                        Access the Association of Hotel Professionals Kenya membership management portal.
                    </p>
                </div>

                <div className="p-10">
                    <div className="mb-8 flex items-center gap-3">
                        <Image src={Logo} alt="AHPK Logo" width={55} height={55} priority className="h-14 w-14 object-contain" />

                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {otpMode ? "Verify OTP" : "Sign In"}
                            </h3>
                            <p className="mt-1 text-gray-500">
                                {otpMode
                                    ? "Enter the OTP sent to your email"
                                    : "Enter your credentials to continue"}
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="mt-8">
                        {!otpMode ? (
                            <>
                                <Label text="Email Address" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20"
                                />

                                <Label text="Password" />
                                <div className="relative mt-2">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-14 outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-sm font-black text-slate-500 hover:bg-slate-100"
                                    >
                                        {showPassword ? "🙈" : "👁"}
                                    </button>
                                </div>

                                <Label text="Verification Code" />
                                <div className="mt-2 grid grid-cols-[1fr_130px] items-center gap-3">
                                    <input
                                        value={captcha}
                                        onChange={(e) => setCaptcha(e.target.value.toUpperCase())}
                                        placeholder="ENTER CODE"
                                        required
                                        autoComplete="off"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 uppercase outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20"
                                    />

                                    <div className="flex h-12 -skew-x-3 select-none items-center justify-center rounded-xl border border-dashed border-gray-400 bg-[repeating-linear-gradient(135deg,#F8FAFC_0px,#F8FAFC_8px,#E5E7EB_8px,#E5E7EB_10px)] text-xl font-black tracking-[3px] text-[#C1121F] line-through">
                                        {verificationCode}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Label text="Email OTP" />
                                <input
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    placeholder="Enter 6-digit OTP"
                                    required
                                    autoComplete="one-time-code"
                                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-2xl font-black tracking-[0.4em] outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20"
                                />

                                <button
                                    type="button"
                                    onClick={() => {
                                        setOtpMode(false);
                                        setOtp("");
                                        setError("");
                                    }}
                                    className="mt-4 text-sm font-black text-[#C1121F]"
                                >
                                    ← Back to login
                                </button>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-8 w-full rounded-xl bg-[#C1121F] py-3 font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
                        >
                            {loading
                                ? otpMode
                                    ? "Verifying..."
                                    : "Signing In..."
                                : otpMode
                                    ? "Verify & Continue"
                                    : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-8 border-t pt-5 text-center text-sm text-gray-500">
                        Association of Hotel Professionals Kenya
                    </div>
                </div>
            </div>
        </div>
    );
}

function Label({ text }: { text: string }) {
    return (
        <label className="mt-5 block text-sm font-semibold text-gray-700">
            {text}
        </label>
    );
}
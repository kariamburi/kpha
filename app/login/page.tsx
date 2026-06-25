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

    const [email, setEmail] = useState("admin@ahpk.or.ke");
    const [password, setPassword] = useState("Admin@12345");
    const [captcha, setCaptcha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");

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

        router.push("/dashboard");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-5xl grid md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl bg-white">
                <div className="bg-[#111111] text-white p-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white p-2 shadow-lg">
                            <Image src={Logo} alt="AHPK Logo" width={90} height={90} priority className="h-full w-full object-contain" />
                        </div>

                        <h1 className="text-4xl font-bold text-[#C1121F]">AHPK Portal</h1>
                        <div className="w-24 h-1 bg-[#C1121F] mt-4 rounded-full" />
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>

                    <p className="text-gray-300 leading-7">
                        Access the Association of Hotel Professionals Kenya membership management portal.
                    </p>

                    <div className="mt-10 space-y-3 text-sm text-gray-400">
                        <p>✓ Membership Management</p>
                        <p>✓ Online Renewals</p>
                        <p>✓ Digital Certificates</p>
                        <p>✓ Event Registration</p>
                        <p>✓ Member Directory</p>
                    </div>
                </div>

                <div className="p-10">
                    <div className="mb-8 flex items-center gap-3">
                        <Image src={Logo} alt="AHPK Logo" width={55} height={55} priority className="h-14 w-14 object-contain" />

                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">Sign In</h3>
                            <p className="mt-1 text-gray-500">Enter your credentials to continue</p>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-5 rounded-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="mt-8">
                        <Label text="Email Address" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20 outline-none"
                        />

                        <Label text="Password" />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20 outline-none"
                        />

                        <Label text="Verification Code" />
                        <div className="mt-2 grid grid-cols-[1fr_130px] gap-3 items-center">
                            <input
                                value={captcha}
                                onChange={(e) => setCaptcha(e.target.value.toUpperCase())}
                                placeholder="ENTER CODE"
                                required
                                autoComplete="off"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 uppercase focus:border-[#C1121F] focus:ring-2 focus:ring-[#C1121F]/20 outline-none"
                            />

                            <div className="h-12 rounded-xl border border-dashed border-gray-400 bg-[repeating-linear-gradient(135deg,#F8FAFC_0px,#F8FAFC_8px,#E5E7EB_8px,#E5E7EB_10px)] flex items-center justify-center text-xl font-black tracking-[3px] text-[#C1121F] line-through select-none -skew-x-3">
                                {verificationCode}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-8 w-full rounded-xl bg-[#C1121F] py-3 font-semibold text-white hover:bg-red-800 transition disabled:opacity-60"
                        >
                            {loading ? "Signing In..." : "Sign In"}
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
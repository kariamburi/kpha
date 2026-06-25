import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/logo.png";
import { verifyMemberLoginOtp } from "../actions";

export default async function VerifyMemberLoginPage({
    searchParams,
}: {
    searchParams: Promise<{
        memberId?: string;
        email?: string;
        error?: string;
    }>;
}) {
    const params = await searchParams;

    const memberId = String(params.memberId || "");
    const email = String(params.email || "");

    return (
        <main className="min-h-screen bg-white">
            <header className="border-b border-slate-200 px-6 py-6">
                <div className="flex items-center gap-4">
                    <Image
                        src={Logo}
                        alt="AHPK Logo"
                        width={70}
                        height={70}
                        className="object-contain"
                        priority
                    />

                    <div>
                        <p className="text-xs font-black tracking-[0.35em] text-[#C1121F]">
                            AHPK
                        </p>
                        <h1 className="text-2xl font-black text-slate-950">
                            Member Portal
                        </h1>
                    </div>
                </div>
            </header>

            <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-12">
                <div className="w-full text-center">
                    <h2 className="text-4xl font-black text-[#111111]">
                        OTP Verification
                    </h2>

                    <p className="mt-2 text-lg font-semibold text-slate-500">
                        Association of Hotel Professionals Kenya
                    </p>

                    {params.error && (
                        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                            Invalid or expired OTP code. Please try again.
                        </div>
                    )}

                    <form action={verifyMemberLoginOtp} className="mt-10 space-y-5 text-left">
                        <input type="hidden" name="memberId" value={memberId} />

                        <div>
                            <label className="text-sm font-black text-slate-700">
                                Enter OTP sent to {email || "your registered email"}
                            </label>

                            <input
                                name="otp"
                                required
                                inputMode="numeric"
                                maxLength={6}
                                className="mt-2 h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-center text-2xl font-black tracking-[0.35em] outline-none transition focus:border-[#C1121F] focus:ring-4 focus:ring-red-100"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Link
                                href="/member/login"
                                className="flex h-14 items-center justify-center rounded-full border border-slate-300 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                            >
                                Back
                            </Link>

                            <button
                                type="submit"
                                className="h-14 cursor-pointer rounded-full bg-[#C1121F] px-5 text-sm font-black text-white transition hover:bg-red-800"
                            >
                                Verify & Continue
                            </button>
                        </div>
                    </form>

                    <Link
                        href="/member/login"
                        className="mt-8 block text-center text-sm font-black text-[#C1121F] hover:underline"
                    >
                        Didn’t receive OTP? Request another code
                    </Link>
                </div>
            </section>
        </main>
    );
}
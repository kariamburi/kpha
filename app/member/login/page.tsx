import LoginForm from "./LoginForm";
import Logo from "@/app/assets/logo.png";
import Image from "next/image";

export default async function MemberLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const params = await searchParams;

    return (
        <main className="min-h-screen bg-white">
            <div className="grid min-h-screen lg:grid-cols-2">
                <section className="flex items-center justify-center px-6 py-10">
                    <div className="w-full max-w-md">
                        <div className="mb-14 flex items-center gap-4">
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

                        <div className="text-center">
                            <h2 className="text-4xl font-black tracking-tight text-[#111111]">
                                Member Login
                            </h2>
                            <p className="mt-2 text-lg font-semibold text-slate-500">
                                Association of Hotel Professionals Kenya
                            </p>
                        </div>

                        {params.error && (
                            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                                Member record not found. Please confirm your email and ID number.
                            </div>
                        )}

                        <div className="mt-10">
                            <LoginForm />
                        </div>
                    </div>
                </section>

                <section className="relative hidden overflow-hidden bg-[#111111] lg:block">
                    <Image
                        src="/login-hero.png"
                        alt="AHPK member portal"
                        fill
                        priority
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/95 via-[#111111]/70 to-[#C1121F]/70" />

                    <div className="relative flex h-full items-center justify-center p-12">
                        <div className="max-w-xl rounded-[32px] border border-white/10 bg-black/35 p-8 text-white shadow-2xl backdrop-blur-md">
                            <p className="text-sm font-black tracking-[0.35em] text-[#F3C64E]">
                                AHPK DIGITAL SERVICES
                            </p>

                            <h3 className="mt-5 text-4xl font-black leading-tight">
                                Membership, certificates, renewals and CPD services at your fingertips.
                            </h3>

                            <p className="mt-5 text-lg font-semibold leading-8 text-white/75">
                                Login securely to access your professional membership profile,
                                certificates, payments and renewal services.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
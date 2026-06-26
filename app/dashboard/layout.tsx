import Image from "next/image";
import { redirect } from "next/navigation";
import MobileDashboardMenu from "./MobileDashboardMenu";
import Logo from "@/app/assets/logo.png";
import DashboardSidebarNav from "./DashboardSidebarNav";
import { getAuthUser } from "@/lib/auth";
import { canAccessDashboard } from "@/lib/roles";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getAuthUser();

    if (!user) {
        redirect("/login");
    }

    if (user.status !== "ACTIVE" || !canAccessDashboard(user.role)) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 bg-white shadow-sm md:block">
                <div className="flex h-20 items-center gap-3 bg-[#111111] px-4">
                    <div className="h-[58px] w-[58px] shrink-0 overflow-hidden rounded-[20px] bg-white p-1 shadow-lg">
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
                        <p className="text-xs font-black tracking-[0.25em] text-[#F3C64E]">
                            AHPK
                        </p>
                        <p className="mt-1 text-xs font-black leading-tight text-white">
                            Admin Portal
                        </p>
                    </div>
                </div>

                <DashboardSidebarNav role={user.role} />
            </aside>

            <div className="md:ml-56">
                <header className="sticky top-0 z-30 h-20 bg-[#111111] text-white shadow-sm">
                    <div className="flex min-h-[92px] items-center justify-between gap-4 px-4 py-3 md:px-8">
                        <div className="flex items-center gap-3">
                            <MobileDashboardMenu role={user.role} />

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 md:hidden">
                                <Image
                                    src={Logo}
                                    alt="AHPK Logo"
                                    width={42}
                                    height={42}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden text-right lg:block">
                                <p className="font-black">{user.name || "AHPK User"}</p>
                                <p className="text-sm font-semibold text-white/70">
                                    {user.role.replace("_", " ")}
                                </p>
                            </div>

                            <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-black text-[#C1121F] sm:flex">
                                {(user.name || user.email || "A").charAt(0).toUpperCase()}
                            </div>

                            <form action="/logout" method="GET">
                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-xl bg-[#C1121F] px-4 py-3 text-sm font-black text-white transition hover:bg-red-800 md:rounded-2xl md:px-5"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
import Link from "next/link";
import Image from "next/image";
import MobileDashboardMenu from "./MobileDashboardMenu";
import Logo from "@/app/assets/logo.png";
import DashboardSidebarNav from "./DashboardSidebarNav";

const menu = [
    { title: "Home", href: "/", icon: "⌂" },
    { title: "Dashboard", href: "/dashboard", icon: "▣" },
    { title: "Members", href: "/dashboard/members", icon: "☷" },
    { title: "Applications", href: "/dashboard/applications", icon: "◉" },
    { title: "Payments", href: "/dashboard/payments", icon: "⇄" },
    { title: "Certificates", href: "/dashboard/certificates", icon: "▤" },
    { title: "Expiring", href: "/dashboard/expiring-members", icon: "!" },
    { title: "Website", href: "/dashboard/website", icon: "◫" },
    { title: "Directory", href: "/dashboard/member-directory", icon: "◎" },
    { title: "Communication", href: "/dashboard/communication", icon: "✉" },
    { title: "Settings", href: "/dashboard/settings", icon: "⚙" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 bg-white shadow-sm md:block">
                <div className="flex h-20 items-center gap-3 bg-[#111111] px-4">
                    <div className="h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-white p-1 shadow-lg">
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

                <DashboardSidebarNav />
            </aside>

            <div className="md:ml-56">
                <header className="sticky h-20 top-0 z-30 bg-[#111111] text-white shadow-sm">
                    <div className="flex min-h-[92px] items-center justify-between gap-4 px-4 py-3 md:px-8">
                        <div className="flex items-center gap-3">
                            <MobileDashboardMenu />

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

                            {/**   <div>
                                <p className="text-[10px] font-black tracking-[0.28em] text-[#F3C64E] md:text-sm md:tracking-[0.45em]">
                                    AHPK MEMBERSHIP PORTAL
                                </p>

                                <h1 className="mt-1 text-lg font-black leading-tight md:text-2xl">
                                    Membership Management Admin Portal
                                </h1>

                                <p className="mt-1 hidden text-sm font-semibold text-white/80 sm:block">
                                    Members • Applications • Payments • Certificates • Renewals
                                </p>
                            </div>*/}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden text-right lg:block">
                                <p className="font-black">AHPK Super Admin</p>
                                <p className="text-sm font-semibold text-white/70">
                                    Admin Portal
                                </p>
                            </div>

                            <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-black text-[#C1121F] sm:flex">
                                A
                            </div>

                            <form action="/logout" method="GET">
                                <button
                                    type="submit"
                                    className="rounded-xl cursor-pointer bg-[#C1121F] px-4 py-3 text-sm font-black text-white transition hover:bg-red-800 md:rounded-2xl md:px-5"
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


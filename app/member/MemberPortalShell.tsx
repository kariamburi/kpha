import Link from "next/link";
import MobileMemberMenu from "./MobileMemberMenu";
import NotificationBell from "./NotificationBell";
import Logo from "@/app/assets/logo.png";
import Image from "next/image";
import IdleLogout from "../components/security/IdleLogout";

type MemberShellData = {
    id: string;
    fullName: string | null;
    email: string | null;
    memberNumber: string;
    status: string;
    expiryDate: Date;
    adminRole?: string | null;
    adminStatus?: string;
    category: {
        name: string;
    };
};
type NotificationItem = {
    id: string;
    title: string;
    message: string;
    type?: string | null;
    read: boolean;
    createdAt: Date;
};

function formatDate(date: Date) {
    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function MemberPortalShell({
    member,
    notifications = [],
    children,
}: {
    member: MemberShellData;
    notifications?: NotificationItem[];
    children: React.ReactNode;
}) {
    const isAdmin =
        member.adminStatus === "ACTIVE" &&
        (
            member.adminRole === "SUPER_ADMIN" ||
            member.adminRole === "ADMIN" ||
            member.adminRole === "FINANCE"
        );
    const menu = [
        { title: "Dashboard", href: "/member/dashboard", icon: "▣" },
        { title: "Profile", href: "/member/profile", icon: "☷" },
        { title: "Certificates", href: "/member/certificates", icon: "▤" },
        { title: "Payments", href: "/member/payments", icon: "⇄" },
        { title: "Renewal", href: "/member/renewal", icon: "↻" },
        ...(isAdmin
            ? [{ title: "Admin", href: "/dashboard", icon: "⚙" }]
            : []),
        { title: "Logout", href: "/member/logout", icon: "⎋" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <IdleLogout timeoutMinutes={30} logoutUrl="/logout" />
            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-56 bg-white shadow-sm md:block">
                <div className="flex h-24 gap-2 items-center justify-center bg-[#111111]">
                    <div className="flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-[20px] bg-white p-2 shadow-lg">
                        <Image
                            src={Logo}
                            alt="AHPK Logo"
                            width={52}
                            height={52}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-black tracking-[0.3em] text-[#F3C64E]">
                            AHPK MEMBER PORTAL
                        </p>


                    </div>
                </div>

                <nav className="mt-4 flex flex-col gap-2 px-3">
                    {menu.map((item) => (
                        <NavIcon key={item.href} {...item} />
                    ))}
                </nav>
            </aside>

            <div className="md:ml-56">
                <header className="sticky top-0 z-30 bg-[#111111] text-white shadow-sm">
                    <div className="flex min-h-[96px] items-center justify-between gap-4 px-4 py-4 md:px-8">
                        <div className="flex min-w-0 items-center gap-3">
                            <MobileMemberMenu memberId={member.id} isAdmin={isAdmin} />

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 md:hidden">
                                <Image
                                    src={Logo}
                                    alt="AHPK Logo"
                                    width={52}
                                    height={52}
                                    className="object-contain"
                                    priority
                                />
                            </div>


                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                            <NotificationBell notifications={notifications} />

                            <div className="hidden gap-2 xl:grid xl:grid-cols-3">
                                <StatusItem label="Status" value={member.status} />
                                <StatusItem label="Category" value={member.category.name} />
                                <StatusItem label="Expiry" value={formatDate(member.expiryDate)} />
                            </div>
                            {isAdmin && (
                                <Link
                                    href="/dashboard"
                                    className="hidden h-12 items-center justify-center rounded-2xl bg-[#F3C64E] px-5 text-xs font-black text-[#111111] transition hover:bg-white md:flex"
                                >
                                    Admin Dashboard
                                </Link>
                            )}
                            <Link
                                href="/member/renewal"
                                className="flex h-12 items-center justify-center rounded-2xl bg-[#C1121F] px-5 text-xs font-black text-white transition hover:bg-red-800"
                            >
                                Renew
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}

function NavIcon({
    title,
    href,
    icon,
}: {
    title: string;
    href: string;
    icon: string;
}) {
    return (
        <Link
            href={href}
            title={title}
            className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-black text-slate-600 transition hover:bg-red-50 hover:text-[#C1121F]"
        >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-base">
                {icon}
            </span>

            <span className="truncate">{title}</span>
        </Link>
    );
}

function StatusItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-white/10 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-white/45">
                {label}
            </p>
            <p className="mt-1 max-w-[150px] truncate text-xs font-black text-white">
                {value}
            </p>
        </div>
    );
}
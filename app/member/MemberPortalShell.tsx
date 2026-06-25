import Link from "next/link";
import MobileMemberMenu from "./MobileMemberMenu";
import Logo from "@/app/assets/logo.png";
import Image from "next/image";
type MemberShellData = {
    id: string;
    fullName: string | null;
    email: string | null;
    memberNumber: string;
    status: string;
    expiryDate: Date;
    category: {
        name: string;
    };
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
    children,
}: {
    member: MemberShellData;
    children: React.ReactNode;
}) {
    const menu = [
        { title: "Dashboard", href: "/member/dashboard", icon: "▣" },
        { title: "Profile", href: "/member/profile", icon: "☷" },
        { title: "Certificates", href: "/member/certificates", icon: "▤" },
        { title: "Payments", href: "/member/payments", icon: "⇄" },
        { title: "Renewal", href: "/member/renewal", icon: "↻" },
        { title: "Website", href: "/", icon: "⌂" },
        { title: "Logout", href: "/member/logout", icon: "⎋" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-24 bg-white shadow-sm md:block">
                <div className="flex h-24 items-center justify-center bg-[#111111]">
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
                </div>

                <nav className="mt-4 flex flex-col items-center gap-2">
                    {menu.map((item) => (
                        <NavIcon key={item.href} {...item} />
                    ))}
                </nav>
            </aside>

            <div className="md:ml-24">
                <header className="sticky top-0 z-30 bg-[#111111] text-white shadow-sm">
                    <div className="flex min-h-[92px] items-center justify-between gap-4 px-4 py-4 md:px-8">
                        <div className="flex items-center gap-3">
                            <MobileMemberMenu memberId={member.id} />


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

                            <div>
                                <p className="text-xs font-black tracking-[0.3em] text-[#F3C64E]">
                                    AHPK MEMBER PORTAL
                                </p>
                                <h1 className="mt-1 text-xl font-black md:text-2xl">
                                    {member.fullName || "AHPK Member"}
                                </h1>
                                <p className="mt-1 text-sm font-semibold text-white/70">
                                    {member.memberNumber}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-4">
                            <StatusItem label="Status" value={member.status} />
                            <StatusItem label="Category" value={member.category.name} />
                            <StatusItem label="Expiry" value={formatDate(member.expiryDate)} />
                            <Link
                                href={`/member/renewal`}
                                className="flex items-center justify-center rounded-2xl bg-[#C1121F] px-4 py-3 text-xs font-black text-white hover:bg-red-800"
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
            className="flex w-20 flex-col items-center justify-center rounded-xl px-1 py-2 text-slate-600 transition hover:bg-red-50 hover:text-[#C1121F]"
        >
            <span className="text-lg leading-none">{icon}</span>
            <span className="mt-1 text-[10px] font-bold leading-none">
                {title}
            </span>
        </Link>
    );
}

function StatusItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-white/10 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-white/45">
                {label}
            </p>
            <p className="mt-1 whitespace-nowrap text-xs font-black text-white">
                {value}
            </p>
        </div>
    );
}
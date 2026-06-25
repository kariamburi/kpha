import Link from "next/link";
import {
    FileText,
    Newspaper,
    Users,
    Download,
    CalendarDays,
    ArrowRight,
    Globe2,
    Mail,
} from "lucide-react";

const modules = [
    {
        title: "Website Pages",
        desc: "Manage homepage, about and other static website content.",
        href: "/dashboard/website/pages",
        icon: FileText,
        tag: "Pages",
    },
    {
        title: "News",
        desc: "Publish association updates, announcements and articles.",
        href: "/dashboard/website/news",
        icon: Newspaper,
        tag: "Posts",
    },
    {
        title: "Leadership",
        desc: "Manage AHPK leaders, officials and committee profiles.",
        href: "/dashboard/website/leaders",
        icon: Users,
        tag: "Profiles",
    },
    {
        title: "Resources",
        desc: "Upload downloadable policies, forms, guides and documents.",
        href: "/dashboard/website/resources",
        icon: Download,
        tag: "Downloads",
    },
    {
        title: "Events & CPD",
        desc: "Create events, trainings, workshops and CPD activities.",
        href: "/dashboard/website/events",
        icon: CalendarDays,
        tag: "CPD",
    },
    {
        title: "Contact Page",
        desc: "Manage contact details, address, phone numbers, email and social links.",
        href: "/dashboard/website/contact",
        icon: Mail,
        tag: "Contact",
    },
];

export default function WebsitePage() {
    return (
        <div className="space-y-5">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="bg-[#111111] px-6 py-7 text-white">
                    <div className="flex p-2 flex-col justify-between gap-5 md:flex-row md:items-center">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#F3C64E]">
                                Public Website CMS
                            </p>

                            <h1 className="mt-2 text-3xl font-black">
                                Website Management
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/70">
                                Manage dynamic public website content including pages, news,
                                resources, leadership profiles, events and CPD activities.
                            </p>
                        </div>

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#F3C64E]">
                            <Globe2 className="h-8 w-8" />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 border-t border-slate-200 bg-white p-5 md:grid-cols-3">
                    <MiniStat title="CMS Modules" value={modules.length.toString()} />
                    <MiniStat title="Public Routes" value="9+" />
                    <MiniStat title="Content Status" value="Dynamic" />
                </div>
            </section>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {modules.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#C1121F] hover:shadow-xl"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#C1121F] transition group-hover:bg-[#C1121F] group-hover:text-white">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                                        {item.tag}
                                    </span>
                                </div>

                                <h2 className="mt-6 text-xl font-black text-slate-950">
                                    {item.title}
                                </h2>

                                <p className="mt-2 min-h-[56px] text-sm font-semibold leading-7 text-slate-500">
                                    {item.desc}
                                </p>

                                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <span className="text-sm font-black text-[#C1121F]">
                                        Manage Module
                                    </span>

                                    <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#C1121F]" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

function MiniStat({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                {title}
            </p>
            <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
        </div>
    );
}
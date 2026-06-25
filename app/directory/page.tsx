import Link from "next/link";
import {
    FileText,
    Newspaper,
    Users,
    Download,
    CalendarDays,
    ArrowRight,
} from "lucide-react";

const modules = [
    {
        title: "Website Pages",
        desc: "Manage homepage, about, contact and static website content.",
        href: "/admin/website/pages",
        icon: FileText,
    },
    {
        title: "News",
        desc: "Publish association updates, announcements and articles.",
        href: "/admin/website/news",
        icon: Newspaper,
    },
    {
        title: "Leadership",
        desc: "Manage AHPK leaders, officials and committee profiles.",
        href: "/admin/website/leaders",
        icon: Users,
    },
    {
        title: "Resources",
        desc: "Upload downloadable policies, forms, guides and documents.",
        href: "/admin/website/resources",
        icon: Download,
    },
    {
        title: "Events & CPD",
        desc: "Create events, trainings, workshops and CPD activities.",
        href: "/admin/website/events",
        icon: CalendarDays,
    },
];

export default function AdminWebsitePage() {
    return (
        <main className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-600">
                        Public Website CMS
                    </p>
                    <h1 className="mt-2 text-3xl font-black text-slate-950">
                        Website Management
                    </h1>
                    <p className="mt-2 max-w-2xl text-slate-600">
                        Manage all dynamic public website content shown on the AHPK
                        homepage, news, resources, events and leadership pages.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {modules.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="rounded-2xl bg-red-50 p-4 text-red-600">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-red-600" />
                                </div>

                                <h2 className="mt-6 text-xl font-black text-slate-950">
                                    {item.title}
                                </h2>
                                <p className="mt-2 leading-7 text-slate-600">{item.desc}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
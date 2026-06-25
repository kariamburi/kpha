"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Modal from "../../components/Modal";

type WebsitePageItem = {
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    content: string | null;
    imageUrl: string | null;
    seoTitle: string | null;
    seoDesc: string | null;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export default function WebsitePagesClient({
    pages,
    saveWebsitePage,
    deleteWebsitePage,
}: {
    pages: WebsitePageItem[];
    saveWebsitePage: (formData: FormData) => void;
    deleteWebsitePage: (formData: FormData) => void;
}) {
    const [open, setOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState<WebsitePageItem | null>(null);
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("");

    function openAddModal() {
        setSelectedPage(null);
        setOpen(true);
    }

    function openEditModal(page: WebsitePageItem) {
        setSelectedPage(page);
        setOpen(true);
    }

    function closeModal() {
        setSelectedPage(null);
        setOpen(false);
    }

    const filteredPages = useMemo(() => {
        return pages.filter((page) => {
            const matchesSearch =
                !q ||
                page.title.toLowerCase().includes(q.toLowerCase()) ||
                page.slug.toLowerCase().includes(q.toLowerCase()) ||
                page.subtitle?.toLowerCase().includes(q.toLowerCase());

            const matchesStatus =
                !status ||
                (status === "PUBLISHED" && page.published) ||
                (status === "DRAFT" && !page.published);

            return matchesSearch && matchesStatus;
        });
    }, [pages, q, status]);

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <Link
                    href="/dashboard/website"
                    className="text-sm font-black text-[#C1121F] hover:text-red-800"
                >
                    ← Back to Website CMS
                </Link>

                <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <p className="text-sm font-black text-slate-500">
                            AHPK Website CMS
                        </p>

                        <h1 className="mt-1 text-3xl font-black text-slate-950">
                            Website Pages
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Manage homepage, about page, contact page and other public website
                            content.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openAddModal}
                        className="rounded-2xl cursor-pointer bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-800"
                    >
                        + Add Page
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Pages" value={pages.length.toString()} />
                <StatCard
                    title="Published"
                    value={pages.filter((page) => page.published).length.toString()}
                />
                <StatCard
                    title="Drafts"
                    value={pages.filter((page) => !page.published).length.toString()}
                />
                <StatCard
                    title="SEO Ready"
                    value={pages
                        .filter((page) => page.seoTitle && page.seoDesc)
                        .length.toString()}
                />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Pages
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search title, slug or subtitle..."
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Status</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="DRAFT">Draft</option>
                    </select>

                    <button
                        type="button"
                        onClick={() => {
                            setQ("");
                            setStatus("");
                        }}
                        className="h-10 cursor-pointer rounded-md border border-slate-300 px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">Pages List</h2>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total {filteredPages.length} page
                            {filteredPages.length === 1 ? "" : "s"} found
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Page</Th>
                                <Th>Slug</Th>
                                <Th>SEO</Th>
                                <Th>Status</Th>
                                <Th>Updated</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPages.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-5 py-8 text-center text-slate-500"
                                    >
                                        No website pages found.
                                    </td>
                                </tr>
                            ) : (
                                filteredPages.map((page) => (
                                    <tr key={page.id} className="border-b hover:bg-slate-50">
                                        <td className="px-2 py-2">
                                            <p className="font-semibold text-slate-900">
                                                {page.title}
                                            </p>
                                            <p className="max-w-lg truncate text-[11px] text-slate-500">
                                                {page.subtitle || page.content || "-"}
                                            </p>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-700">
                                            /{page.slug}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            {page.seoTitle && page.seoDesc ? (
                                                <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700">
                                                    Ready
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700">
                                                    Missing
                                                </span>
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <PageStatusBadge published={page.published} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {formatDate(page.updatedAt)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={page.slug === "home" ? "/" : `/${page.slug}`}
                                                    target="_blank"
                                                    className="rounded bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    View
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(page)}
                                                    className="rounded cursor-pointer bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    Edit
                                                </button>

                                                <form action={deleteWebsitePage}>
                                                    <input type="hidden" name="id" value={page.id} />

                                                    <button className="rounded cursor-pointer bg-red-50 px-3 py-1.5 text-[12px] font-bold text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white">
                                                        Delete
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <Modal
                open={open}
                onClose={closeModal}
                title={selectedPage ? "Edit Website Page" : "Add Website Page"}
                subtitle={
                    selectedPage
                        ? "Update existing public website content."
                        : "Create public website content shown to visitors."
                }
            >
                <form
                    action={async (formData) => {
                        await saveWebsitePage(formData);
                        closeModal();
                    }}
                    className="space-y-4"
                >
                    {selectedPage && (
                        <input type="hidden" name="id" value={selectedPage.id} />
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        <Input
                            name="title"
                            required
                            placeholder="Page title"
                            defaultValue={selectedPage?.title || ""}
                        />

                        <Input
                            name="slug"
                            required
                            placeholder="Slug e.g. home, about, contact"
                            defaultValue={selectedPage?.slug || ""}
                        />
                    </div>

                    <Input
                        name="subtitle"
                        placeholder="Subtitle"
                        defaultValue={selectedPage?.subtitle || ""}
                    />

                    <textarea
                        name="content"
                        placeholder="Page content"
                        rows={5}
                        defaultValue={selectedPage?.content || ""}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                        <Input
                            name="imageUrl"
                            placeholder="Image URL"
                            defaultValue={selectedPage?.imageUrl || ""}
                        />

                        <Input
                            name="seoTitle"
                            placeholder="SEO title"
                            defaultValue={selectedPage?.seoTitle || ""}
                        />
                    </div>

                    <textarea
                        name="seoDesc"
                        placeholder="SEO description"
                        rows={3}
                        defaultValue={selectedPage?.seoDesc || ""}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <label className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <input
                            name="published"
                            type="checkbox"
                            defaultChecked={selectedPage ? selectedPage.published : true}
                        />
                        Published
                    </label>

                    <button className="w-full cursor-pointer rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800">
                        {selectedPage ? "Update Page" : "Save Page"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold text-white/65">{title}</p>
            <h2 className="mt-2 text-2xl font-black">{value}</h2>
        </div>
    );
}

function PageStatusBadge({ published }: { published: boolean }) {
    return published ? (
        <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700">
            Published
        </span>
    ) : (
        <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700">
            Draft
        </span>
    );
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="border-r border-slate-200 px-2 py-2 text-left font-bold">
            {children}
        </th>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
        />
    );
}

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
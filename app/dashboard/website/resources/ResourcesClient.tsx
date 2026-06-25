"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Modal from "../../components/Modal";
import {
    Download,
    Edit3,
    Eye,
    FileText,
    FolderOpen,
    Plus,
    Search,
    Trash2,
} from "lucide-react";

type ResourceItem = {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    category: string | null;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export default function ResourcesClient({
    resources,
    saveResource,
    deleteResource,
}: {
    resources: ResourceItem[];
    saveResource: (formData: FormData) => void;
    deleteResource: (formData: FormData) => void;
}) {
    const [open, setOpen] = useState(false);
    const [selectedResource, setSelectedResource] =
        useState<ResourceItem | null>(null);
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("");

    function openAddModal() {
        setSelectedResource(null);
        setOpen(true);
    }

    function openEditModal(resource: ResourceItem) {
        setSelectedResource(resource);
        setOpen(true);
    }

    function closeModal() {
        setSelectedResource(null);
        setOpen(false);
    }
    const categoryOptions = useMemo(() => {
        const defaults = [
            "Membership",
            "Professional Standards",
            "Governance",
            "CPD",
            "Forms",
            "Policies",
            "Guides",
        ];

        const existing = resources
            .map((r) => r.category)
            .filter(Boolean) as string[];

        return Array.from(new Set([...defaults, ...existing])).sort();
    }, [resources]);
    const filteredResources = useMemo(() => {
        return resources.filter((resource) => {
            const matchesSearch =
                !q ||
                resource.title.toLowerCase().includes(q.toLowerCase()) ||
                resource.category?.toLowerCase().includes(q.toLowerCase()) ||
                resource.description?.toLowerCase().includes(q.toLowerCase()) ||
                resource.fileUrl.toLowerCase().includes(q.toLowerCase());

            const matchesStatus =
                !status ||
                (status === "PUBLISHED" && resource.published) ||
                (status === "DRAFT" && !resource.published);

            return matchesSearch && matchesStatus;
        });
    }, [resources, q, status]);

    const categories = new Set(resources.map((r) => r.category).filter(Boolean));

    return (
        <div className="space-y-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="bg-[#111111] px-6 py-6 text-white">
                    <Link
                        href="/dashboard/website"
                        className="text-sm font-black text-[#F3C64E] hover:text-white"
                    >
                        ← Back to Website CMS
                    </Link>

                    <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#F3C64E]">
                                AHPK Website CMS
                            </p>

                            <h1 className="mt-2 text-3xl font-black">
                                Resources Centre
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/65">
                                Upload and manage public policies, forms, guides and downloadable
                                documents.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={openAddModal}
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-800"
                        >
                            <Plus className="h-4 w-4" />
                            Add Resource
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard icon={FileText} title="Total Resources" value={resources.length.toString()} />
                <StatCard
                    icon={Download}
                    title="Published"
                    value={resources.filter((r) => r.published).length.toString()}
                />
                <StatCard
                    icon={FileText}
                    title="Drafts"
                    value={resources.filter((r) => !r.published).length.toString()}
                />
                <StatCard icon={FolderOpen} title="Categories" value={categories.size.toString()} />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    <Search className="h-4 w-4 text-[#C1121F]" />
                    Search Resources
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search title, category, URL or description..."
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
                        <h2 className="text-xl font-black text-slate-950">
                            Resources List
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total {filteredResources.length} resource
                            {filteredResources.length === 1 ? "" : "s"} found
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Resource</Th>
                                <Th>Category</Th>
                                <Th>Status</Th>
                                <Th>Updated</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredResources.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-10 text-center text-slate-500"
                                    >
                                        No resources found.
                                    </td>
                                </tr>
                            ) : (
                                filteredResources.map((resource) => (
                                    <tr key={resource.id} className="border-b hover:bg-slate-50">
                                        <td className="px-2 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C1121F]">
                                                    <FileText className="h-6 w-6" />
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {resource.title}
                                                    </p>

                                                    <p className="max-w-xl truncate text-[11px] text-slate-500">
                                                        {resource.description || resource.fileUrl}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-3 text-slate-700">
                                            {resource.category || "-"}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-3">
                                            <StatusBadge published={resource.published} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-3 text-slate-600">
                                            {formatDate(resource.updatedAt)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-3">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={resource.fileUrl}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-1 rounded bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    View
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(resource)}
                                                    className="inline-flex cursor-pointer items-center gap-1 rounded bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    <Edit3 className="h-3.5 w-3.5" />
                                                    Edit
                                                </button>

                                                <form action={deleteResource}>
                                                    <input type="hidden" name="id" value={resource.id} />

                                                    <button className="inline-flex cursor-pointer items-center gap-1 rounded bg-red-50 px-3 py-1.5 text-[12px] font-bold text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white">
                                                        <Trash2 className="h-3.5 w-3.5" />
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
                title={selectedResource ? "Edit Resource" : "Add Resource"}
                subtitle={
                    selectedResource
                        ? "Update this downloadable resource."
                        : "Create a new downloadable document for the public resources centre."
                }
            >
                <form
                    action={async (formData) => {
                        await saveResource(formData);
                        closeModal();
                    }}
                    className="space-y-4"
                >
                    {selectedResource && (
                        <input type="hidden" name="id" value={selectedResource.id} />
                    )}

                    <Input
                        name="title"
                        required
                        placeholder="Resource title"
                        defaultValue={selectedResource?.title || ""}
                    />

                    <select
                        name="category"
                        defaultValue={selectedResource?.category || ""}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">Select category</option>

                        {categoryOptions.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <Input
                        name="fileUrl"
                        required
                        placeholder="File URL"
                        defaultValue={selectedResource?.fileUrl || ""}
                    />

                    <textarea
                        name="description"
                        rows={4}
                        placeholder="Short description"
                        defaultValue={selectedResource?.description || ""}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <label className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <input
                            name="published"
                            type="checkbox"
                            defaultChecked={
                                selectedResource ? selectedResource.published : true
                            }
                        />
                        Published
                    </label>

                    <button className="w-full cursor-pointer rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800">
                        {selectedResource ? "Update Resource" : "Save Resource"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}

function StatCard({
    title,
    value,
    icon: Icon,
}: {
    title: string;
    value: string;
    icon: React.ElementType;
}) {
    return (
        <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#F3C64E]">
                <Icon className="h-5 w-5" />
            </div>

            <p className="mt-4 text-sm font-semibold text-white/65">{title}</p>
            <h2 className="mt-2 text-2xl font-black">{value}</h2>
        </div>
    );
}

function StatusBadge({ published }: { published: boolean }) {
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
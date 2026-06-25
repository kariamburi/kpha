"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Modal from "../../components/Modal";

type NewsPostItem = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    imageUrl: string | null;
    published: boolean;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

export default function NewsClient({
    posts,
    saveNewsPost,
    deleteNewsPost,
}: {
    posts: NewsPostItem[];
    saveNewsPost: (formData: FormData) => void;
    deleteNewsPost: (formData: FormData) => void;
}) {
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<NewsPostItem | null>(null);
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("");

    function openAddModal() {
        setSelectedPost(null);
        setOpen(true);
    }

    function openEditModal(post: NewsPostItem) {
        setSelectedPost(post);
        setOpen(true);
    }

    function closeModal() {
        setSelectedPost(null);
        setOpen(false);
    }

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch =
                !q ||
                post.title.toLowerCase().includes(q.toLowerCase()) ||
                post.slug.toLowerCase().includes(q.toLowerCase()) ||
                post.excerpt?.toLowerCase().includes(q.toLowerCase());

            const matchesStatus =
                !status ||
                (status === "PUBLISHED" && post.published) ||
                (status === "DRAFT" && !post.published);

            return matchesSearch && matchesStatus;
        });
    }, [posts, q, status]);

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
                            News Management
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Publish association updates, announcements and industry articles.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openAddModal}
                        className="rounded-2xl cursor-pointer bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-800"
                    >
                        + Add News
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Posts" value={posts.length.toString()} />
                <StatCard
                    title="Published"
                    value={posts.filter((p) => p.published).length.toString()}
                />
                <StatCard
                    title="Drafts"
                    value={posts.filter((p) => !p.published).length.toString()}
                />
                <StatCard
                    title="With Images"
                    value={posts.filter((p) => p.imageUrl).length.toString()}
                />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search News
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search title, slug or excerpt..."
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
                        <h2 className="text-xl font-black text-slate-950">News List</h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total {filteredPosts.length} post
                            {filteredPosts.length === 1 ? "" : "s"} found
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>News</Th>
                                <Th>Slug</Th>
                                <Th>Status</Th>
                                <Th>Updated</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPosts.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-8 text-center text-slate-500"
                                    >
                                        No news posts found.
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map((post) => (
                                    <tr key={post.id} className="border-b hover:bg-slate-50">
                                        <td className="px-2 py-2">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 overflow-hidden rounded-xl bg-slate-100">
                                                    {post.imageUrl ? (
                                                        <img
                                                            src={post.imageUrl}
                                                            alt={post.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-xs font-black text-slate-400">
                                                            NEWS
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {post.title}
                                                    </p>
                                                    <p className="max-w-lg truncate text-[11px] text-slate-500">
                                                        {post.excerpt || "-"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-700">
                                            /news/{post.slug}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <StatusBadge published={post.published} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {formatDate(post.updatedAt)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/news/${post.slug}`}
                                                    target="_blank"
                                                    className="rounded bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    View
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(post)}
                                                    className="rounded cursor-pointer bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    Edit
                                                </button>

                                                <form action={deleteNewsPost}>
                                                    <input type="hidden" name="id" value={post.id} />
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
                title={selectedPost ? "Edit News Post" : "Add News Post"}
                subtitle={
                    selectedPost
                        ? "Update this association news post."
                        : "Publish a new association update or announcement."
                }
            >
                <form
                    action={async (formData) => {
                        await saveNewsPost(formData);
                        closeModal();
                    }}
                    className="space-y-4"
                >
                    {selectedPost && (
                        <input type="hidden" name="id" value={selectedPost.id} />
                    )}

                    <Input
                        name="title"
                        required
                        placeholder="News title"
                        defaultValue={selectedPost?.title || ""}
                    />

                    <Input
                        name="excerpt"
                        placeholder="Short excerpt"
                        defaultValue={selectedPost?.excerpt || ""}
                    />

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <label className="block text-sm font-black text-slate-700">
                            Featured News Image
                        </label>

                        {selectedPost?.imageUrl ? (
                            <div className="mt-3 flex items-center gap-3">
                                <img
                                    src={selectedPost.imageUrl}
                                    alt={selectedPost.title}
                                    className="h-20 w-28 rounded-xl border border-slate-200 object-cover"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-slate-700">
                                        Current image
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Upload another image to replace it.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-3 rounded-xl border border-dashed border-slate-300 p-4 text-sm font-semibold text-slate-500">
                                No image selected.
                            </div>
                        )}

                        <input
                            type="hidden"
                            name="existingImageUrl"
                            value={selectedPost?.imageUrl || ""}
                        />

                        <input
                            type="file"
                            name="image"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-[#C1121F] file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
                        />

                        <p className="mt-2 text-xs font-semibold text-slate-500">
                            Upload JPG, PNG or WEBP. Maximum size 3MB.
                        </p>
                    </div>

                    <textarea
                        name="content"
                        required
                        rows={7}
                        placeholder="News content"
                        defaultValue={selectedPost?.content || ""}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <label className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <input
                            name="published"
                            type="checkbox"
                            defaultChecked={selectedPost ? selectedPost.published : true}
                        />
                        Published
                    </label>

                    <button className="w-full cursor-pointer rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800">
                        {selectedPost ? "Update News" : "Save News"}
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
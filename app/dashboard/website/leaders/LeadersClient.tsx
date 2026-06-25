"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Modal from "../../components/Modal";

type LeaderItem = {
    id: string;
    name: string;
    title: string;
    bio: string | null;
    imageUrl: string | null;
    order: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export default function LeadersClient({
    leaders,
    saveLeader,
    deleteLeader,
}: {
    leaders: LeaderItem[];
    saveLeader: (formData: FormData) => void;
    deleteLeader: (formData: FormData) => void;
}) {
    const [open, setOpen] = useState(false);
    const [selectedLeader, setSelectedLeader] = useState<LeaderItem | null>(null);
    const [q, setQ] = useState("");
    const [status, setStatus] = useState("");

    function openAddModal() {
        setSelectedLeader(null);
        setOpen(true);
    }

    function openEditModal(leader: LeaderItem) {
        setSelectedLeader(leader);
        setOpen(true);
    }

    function closeModal() {
        setSelectedLeader(null);
        setOpen(false);
    }

    const filteredLeaders = useMemo(() => {
        return leaders.filter((leader) => {
            const matchesSearch =
                !q ||
                leader.name.toLowerCase().includes(q.toLowerCase()) ||
                leader.title.toLowerCase().includes(q.toLowerCase()) ||
                leader.bio?.toLowerCase().includes(q.toLowerCase());

            const matchesStatus =
                !status ||
                (status === "ACTIVE" && leader.active) ||
                (status === "HIDDEN" && !leader.active);

            return matchesSearch && matchesStatus;
        });
    }, [leaders, q, status]);

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
                            Leadership
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Manage AHPK leaders, officials and committee profiles.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openAddModal}
                        className="rounded-2xl cursor-pointer bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-800"
                    >
                        + Add Leader
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Total Leaders" value={leaders.length.toString()} />
                <StatCard
                    title="Active"
                    value={leaders.filter((leader) => leader.active).length.toString()}
                />
                <StatCard
                    title="Hidden"
                    value={leaders.filter((leader) => !leader.active).length.toString()}
                />
                <StatCard
                    title="With Photos"
                    value={leaders.filter((leader) => leader.imageUrl).length.toString()}
                />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Leaders
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search name, title or bio..."
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="h-10 min-w-0 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="HIDDEN">Hidden</option>
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
                            Leaders List
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            Total {filteredLeaders.length} leader
                            {filteredLeaders.length === 1 ? "" : "s"} found
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Leader</Th>
                                <Th>Title</Th>
                                <Th>Order</Th>
                                <Th>Status</Th>
                                <Th>Updated</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredLeaders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-5 py-8 text-center text-slate-500"
                                    >
                                        No leaders found.
                                    </td>
                                </tr>
                            ) : (
                                filteredLeaders.map((leader) => (
                                    <tr key={leader.id} className="border-b hover:bg-slate-50">
                                        <td className="px-2 py-2">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 overflow-hidden rounded-xl bg-slate-100">
                                                    {leader.imageUrl ? (
                                                        <img
                                                            src={leader.imageUrl}
                                                            alt={leader.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-xs font-black text-slate-400">
                                                            AHPK
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900">
                                                        {leader.name}
                                                    </p>
                                                    <p className="max-w-md truncate text-[11px] text-slate-500">
                                                        {leader.bio || "-"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-700">
                                            {leader.title}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 font-semibold text-slate-700">
                                            {leader.order}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <LeaderStatusBadge active={leader.active} />
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2 text-slate-600">
                                            {formatDate(leader.updatedAt)}
                                        </td>

                                        <td className="whitespace-nowrap px-2 py-2">
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(leader)}
                                                    className="rounded cursor-pointer bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 transition hover:bg-slate-200"
                                                >
                                                    Edit
                                                </button>

                                                <form action={deleteLeader}>
                                                    <input type="hidden" name="id" value={leader.id} />
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
                title={selectedLeader ? "Edit Leader" : "Add Leader"}
                subtitle={
                    selectedLeader
                        ? "Update leadership profile details."
                        : "Create a new public leadership profile."
                }
            >
                <form
                    action={async (formData) => {
                        await saveLeader(formData);
                        closeModal();
                    }}
                    className="space-y-4"
                >
                    {selectedLeader && (
                        <input type="hidden" name="id" value={selectedLeader.id} />
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        <Input
                            name="name"
                            required
                            placeholder="Full name"
                            defaultValue={selectedLeader?.name || ""}
                        />

                        <Input
                            name="title"
                            required
                            placeholder="Title / Position"
                            defaultValue={selectedLeader?.title || ""}
                        />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <label className="block text-sm font-black text-slate-700">
                            Leader Profile Photo
                        </label>

                        {selectedLeader?.imageUrl ? (
                            <div className="mt-3 flex items-center gap-3">
                                <img
                                    src={selectedLeader.imageUrl}
                                    alt={selectedLeader.name}
                                    className="h-16 w-16 rounded-2xl object-cover"
                                />
                                <p className="text-xs font-semibold text-slate-500">
                                    Current photo will remain unless you upload a new one.
                                </p>
                            </div>
                        ) : null}

                        <input type="hidden" name="imageUrl" value={selectedLeader?.imageUrl || ""} />

                        <input
                            name="imageFile"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-[#C1121F] file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
                        />

                        <p className="mt-2 text-xs font-semibold text-slate-500">
                            Upload JPG, PNG or WEBP. Maximum size 2MB.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Input
                            name="order"
                            type="number"
                            placeholder="Display order"
                            defaultValue={selectedLeader?.order ?? 0}
                        />

                        <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700">
                            <input
                                name="active"
                                type="checkbox"
                                defaultChecked={selectedLeader ? selectedLeader.active : true}
                            />
                            Active
                        </label>
                    </div>

                    <textarea
                        name="bio"
                        rows={5}
                        placeholder="Short bio"
                        defaultValue={selectedLeader?.bio || ""}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <button className="w-full cursor-pointer rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800">
                        {selectedLeader ? "Update Leader" : "Save Leader"}
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

function LeaderStatusBadge({ active }: { active: boolean }) {
    return active ? (
        <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700">
            Active
        </span>
    ) : (
        <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700">
            Hidden
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
"use client";

import { useMemo, useState } from "react";
import Modal from "../components/Modal";

type Announcement = {
    id: string;
    title: string;
    message: string;
    type: string;
    published: boolean;
    createdAt: Date;
};

type Campaign = {
    id: string;
    subject: string;
    body: string;
    audience: string;
    sent: boolean;
    sentAt: Date | null;
    createdAt: Date;
};

type ModalMode = "announcement" | "notification" | "campaign" | null;

export default function CommunicationClient({
    announcements,
    campaigns,
    notificationsCount,
    createAnnouncement,
    createEmailCampaign,
    createNotificationForAllMembers,
    deleteAnnouncement,
    markCampaignSent,
}: {
    announcements: Announcement[];
    campaigns: Campaign[];
    notificationsCount: number;
    createAnnouncement: (formData: FormData) => void;
    createEmailCampaign: (formData: FormData) => void;
    createNotificationForAllMembers: (formData: FormData) => void;
    deleteAnnouncement: (formData: FormData) => void;
    markCampaignSent: (formData: FormData) => void;
}) {
    const [mode, setMode] = useState<ModalMode>(null);
    const [q, setQ] = useState("");

    const filteredAnnouncements = useMemo(() => {
        return announcements.filter(
            (item) =>
                !q ||
                item.title.toLowerCase().includes(q.toLowerCase()) ||
                item.message.toLowerCase().includes(q.toLowerCase()) ||
                item.type.toLowerCase().includes(q.toLowerCase())
        );
    }, [announcements, q]);

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <p className="text-sm font-black text-slate-500">AHPK Communication</p>

                <div className="mt-1 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-black text-slate-950">
                            Communication Centre
                        </h1>
                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Send announcements, member notifications, newsletters, renewal notices and policy updates.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => setMode("announcement")} className="rounded-2xl cursor-pointer bg-[#C1121F] px-5 py-3 text-sm font-black text-white hover:bg-red-800">
                            + Announcement
                        </button>
                        <button onClick={() => setMode("notification")} className="rounded-2xl cursor-pointer bg-[#111111] px-5 py-3 text-sm font-black text-white hover:bg-black">
                            Notify Members
                        </button>
                        <button onClick={() => setMode("campaign")} className="rounded-2xl cursor-pointer border border-slate-300 px-5 py-3 text-sm font-black text-slate-800 hover:bg-slate-50">
                            Email Campaign
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Announcements" value={announcements.length.toString()} />
                <StatCard title="Campaigns" value={campaigns.length.toString()} />
                <StatCard title="Notifications" value={notificationsCount.toString()} />
                <StatCard title="Sent Campaigns" value={campaigns.filter((c) => c.sent).length.toString()} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Announcements
                </div>

                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search title, message or type..."
                    className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                />
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-200 pb-4">
                    <h2 className="text-xl font-black text-slate-950">Announcements</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                        Total {filteredAnnouncements.length} announcement{filteredAnnouncements.length === 1 ? "" : "s"}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Title</Th>
                                <Th>Type</Th>
                                <Th>Status</Th>
                                <Th>Date</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAnnouncements.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-slate-50">
                                    <td className="px-2 py-2">
                                        <p className="font-semibold text-slate-900">{item.title}</p>
                                        <p className="max-w-xl truncate text-[11px] text-slate-500">
                                            {item.message}
                                        </p>
                                    </td>
                                    <td className="px-2 py-2">{item.type}</td>
                                    <td className="px-2 py-2">
                                        <StatusBadge active={item.published} activeText="Published" inactiveText="Draft" />
                                    </td>
                                    <td className="px-2 py-2 text-slate-600">{formatDate(item.createdAt)}</td>
                                    <td className="px-2 py-2">
                                        <form action={deleteAnnouncement}>
                                            <input type="hidden" name="id" value={item.id} />
                                            <button className="rounded  cursor-pointer bg-red-50 px-3 py-1.5 text-[12px] font-bold text-[#C1121F] hover:bg-[#C1121F] hover:text-white">
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}

                            {filteredAnnouncements.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                                        No announcements found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-200 pb-4">
                    <h2 className="text-xl font-black text-slate-950">Email Campaigns</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                        Saved newsletters and member email campaigns.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-[12px]">
                        <thead>
                            <tr className="bg-slate-100 text-slate-900">
                                <Th>Subject</Th>
                                <Th>Audience</Th>
                                <Th>Status</Th>
                                <Th>Sent At</Th>
                                <th className="px-2 py-2 text-left font-bold">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {campaigns.map((campaign) => (
                                <tr key={campaign.id} className="border-b hover:bg-slate-50">
                                    <td className="px-2 py-2 font-semibold text-slate-900">
                                        {campaign.subject}
                                    </td>
                                    <td className="px-2 py-2">{campaign.audience}</td>
                                    <td className="px-2 py-2">
                                        <StatusBadge active={campaign.sent} activeText="Sent" inactiveText="Draft" />
                                    </td>
                                    <td className="px-2 py-2 text-slate-600">
                                        {campaign.sentAt ? formatDate(campaign.sentAt) : "-"}
                                    </td>
                                    <td className="px-2 py-2">
                                        {!campaign.sent ? (
                                            <form action={markCampaignSent}>
                                                <input type="hidden" name="id" value={campaign.id} />
                                                <button className="rounded  cursor-pointer bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700 hover:bg-slate-200">
                                                    Mark Sent
                                                </button>
                                            </form>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {campaigns.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                                        No email campaigns yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <Modal
                open={mode === "announcement"}
                onClose={() => setMode(null)}
                title="Create Announcement"
                subtitle="Publish general, renewal, event, policy or newsletter announcements."
            >
                <form
                    action={async (formData) => {
                        await createAnnouncement(formData);
                        setMode(null);
                    }}
                    className="space-y-4"
                >
                    <Input name="title" required placeholder="Announcement title" />

                    <select name="type" defaultValue="GENERAL" className={inputClass}>
                        <option value="GENERAL">General</option>
                        <option value="RENEWAL">Renewal</option>
                        <option value="EVENT">Event</option>
                        <option value="POLICY">Policy</option>
                        <option value="NEWSLETTER">Newsletter</option>
                    </select>

                    <Textarea name="message" required rows={5} placeholder="Announcement message" />

                    <label className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <input name="published" type="checkbox" defaultChecked />
                        Publish announcement
                    </label>

                    <SubmitButton>Save Announcement</SubmitButton>
                </form>
            </Modal>

            <Modal
                open={mode === "notification"}
                onClose={() => setMode(null)}
                title="Notify All Active Members"
                subtitle="Send a portal notification to every active AHPK member."
            >
                <form
                    action={async (formData) => {
                        await createNotificationForAllMembers(formData);
                        setMode(null);
                    }}
                    className="space-y-4"
                >
                    <Input name="title" required placeholder="Notification title" />
                    <Textarea name="message" required rows={5} placeholder="Notification message" />
                    <SubmitButton dark>Send Notification</SubmitButton>
                </form>
            </Modal>

            <Modal
                open={mode === "campaign"}
                onClose={() => setMode(null)}
                title="Create Email Campaign"
                subtitle="Prepare a newsletter, policy update, event reminder or renewal notice."
            >
                <form
                    action={async (formData) => {
                        await createEmailCampaign(formData);
                        setMode(null);
                    }}
                    className="space-y-4"
                >
                    <Input name="subject" required placeholder="Email subject" />

                    <select name="audience" defaultValue="ALL_MEMBERS" className={inputClass}>
                        <option value="ALL_MEMBERS">All Members</option>
                        <option value="ACTIVE_MEMBERS">Active Members</option>
                        <option value="EXPIRED_MEMBERS">Expired Members</option>
                        <option value="EXPIRING_MEMBERS">Expiring Members</option>
                    </select>

                    <Textarea name="body" required rows={7} placeholder="Email body" />
                    <SubmitButton>Save Campaign</SubmitButton>
                </form>
            </Modal>
        </div>
    );
}

const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100";

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={inputClass} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return <textarea {...props} className={inputClass} />;
}

function SubmitButton({
    children,
    dark,
}: {
    children: React.ReactNode;
    dark?: boolean;
}) {
    return (
        <button
            className={`w-full rounded-2xl  cursor-pointer px-5 py-4 text-sm font-black text-white transition ${dark ? "bg-[#111111] hover:bg-black" : "bg-[#C1121F] hover:bg-red-800"
                }`}
        >
            {children}
        </button>
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

function StatusBadge({
    active,
    activeText,
    inactiveText,
}: {
    active: boolean;
    activeText: string;
    inactiveText: string;
}) {
    return active ? (
        <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700">
            {activeText}
        </span>
    ) : (
        <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700">
            {inactiveText}
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

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
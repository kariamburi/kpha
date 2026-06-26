import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { canManageMembers } from "@/lib/roles";

function formatDate(date?: Date | null) {
    if (!date) return "-";

    return date.toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default async function MemberDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const user = await getAuthUser();

    if (!user || !canManageMembers(user.role)) {
        redirect("/dashboard");
    }

    const { id } = await params;

    const member = await prisma.member.findUnique({
        where: { id },
        include: {
            user: true,
            category: true,
            payments: {
                orderBy: { createdAt: "desc" },
            },
            certificates: {
                orderBy: { createdAt: "desc" },
            },
            eventRegistrations: {
                include: {
                    event: true,
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });

    if (!member) notFound();

    return (
        <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <Link
                    href="/dashboard/members"
                    className="text-sm font-black text-[#C1121F]"
                >
                    ← Back to Members
                </Link>

                <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-[#111111] text-4xl font-black text-white shadow-sm">
                        {(member.fullName || member.user?.name || "M")
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div className="flex-1">
                        <p className="text-sm font-black text-slate-500">
                            {member.memberNumber}
                        </p>

                        <h1 className="mt-1 text-3xl font-black text-slate-950">
                            {member.fullName || member.user?.name || "Unnamed Member"}
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            {member.category.name} • {member.email || member.user?.email || "-"}
                        </p>
                    </div>

                    <StatusBadge status={member.status} />
                </div>
            </section>

            <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Payments" value={member.payments.length.toString()} />
                <StatCard title="Certificates" value={member.certificates.length.toString()} />
                <StatCard title="Events" value={member.eventRegistrations.length.toString()} />
                <StatCard title="Expiry" value={formatDate(member.expiryDate)} />
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">Member Details</h2>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <Info label="Full Name" value={member.fullName || member.user?.name} />
                    <Info label="Email" value={member.email || member.user?.email} />
                    <Info label="Phone" value={member.phone || member.user?.phone} />
                    <Info label="County" value={member.county} />
                    <Info label="Position" value={member.position} />
                    <Info label="Employer" value={member.employer} />
                    <Info label="Category" value={member.category.name} />
                    <Info label="Join Date" value={formatDate(member.joinDate)} />
                    <Info label="Expiry Date" value={formatDate(member.expiryDate)} />
                    <Info label="Directory Visible" value={member.isDirectoryVisible ? "Yes" : "No"} />
                </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">Certificates</h2>

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[700px] text-sm">
                        <thead className="bg-slate-100 text-left text-xs font-black uppercase text-slate-600">
                            <tr>
                                <th className="px-3 py-3">Certificate No.</th>
                                <th className="px-3 py-3">Verification</th>
                                <th className="px-3 py-3">Issue</th>
                                <th className="px-3 py-3">Expiry</th>
                                <th className="px-3 py-3">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {member.certificates.map((cert) => (
                                <tr key={cert.id}>
                                    <td className="px-3 py-3 font-bold">
                                        {cert.certificateNumber}
                                    </td>
                                    <td className="px-3 py-3 font-mono text-[#C1121F]">
                                        {cert.verificationCode}
                                    </td>
                                    <td className="px-3 py-3">
                                        {formatDate(cert.issueDate)}
                                    </td>
                                    <td className="px-3 py-3">
                                        {formatDate(cert.expiryDate)}
                                    </td>
                                    <td className="px-3 py-3">
                                        <Link
                                            href={`/dashboard/certificates/${cert.id}`}
                                            className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-[#C1121F]"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {member.certificates.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-3 py-8 text-center text-slate-500">
                                        No certificates found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-xl font-black text-slate-950">Payments</h2>

                <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[700px] text-sm">
                        <thead className="bg-slate-100 text-left text-xs font-black uppercase text-slate-600">
                            <tr>
                                <th className="px-3 py-3">Date</th>
                                <th className="px-3 py-3">Amount</th>
                                <th className="px-3 py-3">Method</th>
                                <th className="px-3 py-3">Reference</th>
                                <th className="px-3 py-3">Status</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {member.payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="px-3 py-3">{formatDate(payment.createdAt)}</td>
                                    <td className="px-3 py-3 font-bold">
                                        KES {payment.amount.toLocaleString()}
                                    </td>
                                    <td className="px-3 py-3">{payment.method}</td>
                                    <td className="px-3 py-3">{payment.reference || "-"}</td>
                                    <td className="px-3 py-3">{payment.status}</td>
                                </tr>
                            ))}

                            {member.payments.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-3 py-8 text-center text-slate-500">
                                        No payments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="rounded-2xl bg-[#111111] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold text-white/65">{title}</p>
            <h2 className="mt-2 text-xl font-black">{value}</h2>
        </div>
    );
}

function Info({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                {label}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">{value || "-"}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const cls =
        status === "ACTIVE"
            ? "bg-green-50 text-green-700"
            : status === "EXPIRED"
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-700";

    return (
        <span className={`rounded-full px-4 py-2 text-xs font-black ${cls}`}>
            {status}
        </span>
    );
}
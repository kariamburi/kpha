import { prisma } from "@/lib/prisma";
import { toggleDirectoryVisibility } from "./actions";
import { canViewDirectory } from "@/lib/roles";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
    searchParams?: Promise<{
        q?: string;
    }>;
};
export const metadata: Metadata = {
    title: "Member Directory Visibility",
    description: "Admin page for controlling AHPK member directory visibility.",
    robots: {
        index: false,
        follow: false,
    },
};
export default async function AdminMemberDirectoryPage({
    searchParams,
}: Props) {
    const user = await getAuthUser();

    if (!user || !canViewDirectory(user.role)) {
        redirect("/dashboard");
    }
    const params = await searchParams;
    const q = params?.q?.trim() || "";

    const members = await prisma.member.findMany({
        where: {
            OR: q
                ? [
                    { fullName: { contains: q, mode: "insensitive" } },
                    { email: { contains: q, mode: "insensitive" } },
                    { memberNumber: { contains: q, mode: "insensitive" } },
                    { county: { contains: q, mode: "insensitive" } },
                    { employer: { contains: q, mode: "insensitive" } },
                ]
                : undefined,
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <main className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-7xl">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
                    Members
                </p>

                <h1 className="mt-2 text-3xl font-black text-slate-950">
                    Member Directory Visibility
                </h1>

                <p className="mt-2 text-slate-600">
                    Control which active members appear in the public searchable member
                    directory.
                </p>

                <form className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 md:flex-row">
                        <input
                            name="q"
                            defaultValue={q}
                            placeholder="Search member name, email, number, county or employer..."
                            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-red-500"
                        />

                        <button className="rounded-2xl cursor-pointer bg-red-600 px-6 py-3 text-sm font-black text-white hover:bg-red-700">
                            Search
                        </button>
                    </div>
                </form>

                <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 p-6">
                        <h2 className="text-xl font-black text-slate-950">
                            Members
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {members.length} member(s) found
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                    <th className="px-6 py-4">Member</th>
                                    <th className="px-6 py-4">Member No.</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">County</th>
                                    <th className="px-6 py-4">Employer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Directory</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {members.map((member) => (
                                    <tr key={member.id}>
                                        <td className="px-6 py-4">
                                            <div className="font-black text-slate-950">
                                                {member.fullName || "-"}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {member.email || "-"}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 font-bold text-red-600">
                                            {member.memberNumber}
                                        </td>

                                        <td className="px-6 py-4">
                                            {member.category?.name || "-"}
                                        </td>

                                        <td className="px-6 py-4">{member.county || "-"}</td>
                                        <td className="px-6 py-4">{member.employer || "-"}</td>

                                        <td className="px-6 py-4">
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                                                {member.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            {member.isDirectoryVisible ? (
                                                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">
                                                    Visible
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700">
                                                    Hidden
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <form action={toggleDirectoryVisibility}>
                                                <input
                                                    type="hidden"
                                                    name="memberId"
                                                    value={member.id}
                                                />
                                                <input
                                                    type="hidden"
                                                    name="visible"
                                                    value={
                                                        member.isDirectoryVisible ? "false" : "true"
                                                    }
                                                />

                                                <button className="font-bold cursor-pointer text-red-600 hover:text-red-700">
                                                    {member.isDirectoryVisible ? "Hide" : "Show"}
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}

                                {members.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-6 py-12 text-center text-slate-500"
                                        >
                                            No members found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
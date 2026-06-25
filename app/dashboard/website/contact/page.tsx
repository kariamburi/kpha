import { prisma } from "@/lib/prisma";

import Link from "next/link";
import { saveContactSettings } from "./actions";
import SubmitButton from "./SubmitButton";

export default async function DashboardContactPage() {
    const page = await prisma.websitePage.findUnique({
        where: { slug: "contact" },
    });

    const contact = await prisma.contactSetting.findUnique({
        where: { id: "main" },
    });

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <Link
                    href="/dashboard/website"
                    className="text-sm font-black text-[#C1121F] hover:text-red-800"
                >
                    ← Back to Website CMS
                </Link>

                <p className="mt-4 text-sm font-black text-slate-500">
                    AHPK Website CMS
                </p>

                <h1 className="mt-1 text-3xl font-black text-slate-950">
                    Contact Page
                </h1>

                <p className="mt-2 text-sm font-semibold text-slate-500">
                    Manage public contact details, email, phone numbers and social media links.
                </p>
            </div>

            <form
                action={saveContactSettings}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <Input name="title" defaultValue={page?.title || ""} placeholder="Page title" />
                    <Input name="subtitle" defaultValue={page?.subtitle || ""} placeholder="Subtitle" />
                </div>

                <textarea
                    name="content"
                    rows={5}
                    defaultValue={page?.content || ""}
                    placeholder="Intro message"
                    className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                />

                <Input name="imageUrl" defaultValue={page?.imageUrl || ""} placeholder="Hero image URL" />

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Input name="email" defaultValue={contact?.email || ""} placeholder="Email" />
                    <Input name="phone1" defaultValue={contact?.phone1 || ""} placeholder="Phone 1" />
                    <Input name="phone2" defaultValue={contact?.phone2 || ""} placeholder="Phone 2" />
                    <Input name="mapUrl" defaultValue={contact?.mapUrl || ""} placeholder="Google Map embed URL" />
                </div>

                <textarea
                    name="address"
                    rows={4}
                    defaultValue={contact?.address || ""}
                    placeholder="Physical address"
                    className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                />

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Input name="facebookUrl" defaultValue={contact?.facebookUrl || ""} placeholder="Facebook URL" />
                    <Input name="twitterUrl" defaultValue={contact?.twitterUrl || ""} placeholder="X / Twitter URL" />
                    <Input name="linkedinUrl" defaultValue={contact?.linkedinUrl || ""} placeholder="LinkedIn URL" />
                    <Input name="instagramUrl" defaultValue={contact?.instagramUrl || ""} placeholder="Instagram URL" />
                </div>

                <SubmitButton />
            </form>
        </div>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
        />
    );
}
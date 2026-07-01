import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";
import {
    ExternalLink,
    Globe,
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";
import ContactForm from "./ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact AHPK",
    description:
        "Contact the Association of Hotel Professionals Kenya for membership, certification, CPD events, resources, partnerships, and general enquiries.",
    alternates: {
        canonical: "/contact",
    },
};
export default async function ContactPage() {
    const page = await prisma.websitePage.findUnique({
        where: { slug: "contact" },
    });

    const contact = await prisma.contactSetting.findUnique({
        where: { id: "main" },
    });

    const heroImage = page?.imageUrl || "/login-hero.png";

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <PublicNavbar />

            <section className="relative overflow-hidden bg-[#111111] text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#C1121F]/50" />

                <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
                    <p className="text-sm font-black uppercase tracking-[0.45em] text-[#F3C64E]">
                        Contact Us
                    </p>

                    <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        {page?.title || "Contact AHPK"}
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/80">
                        {page?.subtitle ||
                            "Reach out to the Association of Hotel Professionals Kenya for membership, certification, events and general enquiries."}
                    </p>
                </div>
            </section>

            <section className="bg-[#F4F6F8] py-20">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_420px]">
                    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                        <p className="text-sm font-black uppercase tracking-[0.35em] text-[#C1121F]">
                            Send Message
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-slate-950">
                            Get in touch
                        </h2>

                        <p className="mt-3 text-sm font-semibold leading-7 text-slate-500">
                            {page?.content ||
                                "Send your enquiry and the AHPK Secretariat will respond as soon as possible."}
                        </p>

                        <ContactForm />
                    </div>

                    <aside className="space-y-5">
                        <div className="rounded-[32px] bg-[#111111] p-8 text-white shadow-xl">
                            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#F3C64E]">
                                Contact Details
                            </p>

                            <div className="mt-6 space-y-4">
                                <ContactItem
                                    icon={MapPin}
                                    title="Address"
                                    value={
                                        contact?.address ||
                                        "The Clarion Hotel Building, Second Floor, Moi Avenue, Nairobi, Kenya"
                                    }
                                />

                                <ContactItem
                                    icon={Mail}
                                    title="Email"
                                    value={contact?.email || "info@kenyahoteliers.com"}
                                />

                                <ContactItem
                                    icon={Phone}
                                    title="Phone"
                                    value={`${contact?.phone1 || "+254 785 707 378"}${contact?.phone2 ? ` / ${contact.phone2}` : ""
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                            <h3 className="text-xl font-black text-slate-950">
                                Social Media
                            </h3>

                            <div className="mt-5 flex flex-wrap gap-3">
                                {contact?.facebookUrl && (
                                    <SocialLink href={contact.facebookUrl} label="Facebook" />
                                )}

                                {contact?.twitterUrl && (
                                    <SocialLink href={contact.twitterUrl} label="X" />
                                )}

                                {contact?.linkedinUrl && (
                                    <SocialLink href={contact.linkedinUrl} label="LinkedIn" />
                                )}

                                {contact?.instagramUrl && (
                                    <SocialLink href={contact.instagramUrl} label="Instagram" />
                                )}

                                {!contact?.facebookUrl &&
                                    !contact?.twitterUrl &&
                                    !contact?.linkedinUrl &&
                                    !contact?.instagramUrl && (
                                        <p className="text-sm font-semibold text-slate-500">
                                            Social media links will be updated soon.
                                        </p>
                                    )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {contact?.mapUrl && (
                <section className="bg-white pb-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
                            <iframe
                                src={contact.mapUrl}
                                className="h-[420px] w-full"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>
            )}

            <PublicFooter />
        </main>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
        />
    );
}

function ContactItem({
    icon: Icon,
    title,
    value,
}: {
    icon: React.ElementType;
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C1121F] text-white">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <p className="text-sm font-black text-[#F3C64E]">{title}</p>
                    <p className="mt-2 whitespace-pre-line text-sm font-semibold leading-6 text-white/75">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}

function SocialLink({
    href,
    label,
}: {
    href: string;
    label: string;
}) {
    return (
        <Link
            href={href}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white"
        >
            <Globe className="h-4 w-4" />
            {label}
            <ExternalLink className="h-3.5 w-3.5" />
        </Link>
    );
}
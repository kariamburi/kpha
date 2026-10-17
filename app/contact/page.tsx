// app/contact/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Image from "next/image";
import Logo from "@/app/assets/logo.png";
import {
    ArrowRight,
    ChevronRight,
    Clock3,
    ExternalLink,
    Globe,
    Home,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import BreadcrumbJsonLd from "../components/seo/BreadcrumbJsonLd";
import PublicFooter from "../components/public/PublicFooter";
import ContactForm from "./ContactForm";
import { DesktopNavigation } from "../components/site/desktop-navigation";

const pagePath = "/contact";

export const metadata: Metadata = {
    title:
        "Contact AHPK | Association of Hotel Professionals Kenya",

    description:
        "Contact the Association of Hotel Professionals Kenya for membership, certification, events, partnerships and general enquiries.",

    keywords: [
        "contact AHPK",
        "Association of Hotel Professionals Kenya contact",
        "AHPK Nairobi",
        "hospitality association Kenya",
        "hotel professionals Kenya",
    ],

    alternates: {
        canonical: pagePath,
    },

    openGraph: {
        title:
            "Contact AHPK | Association of Hotel Professionals Kenya",
        description:
            "Get in touch with AHPK for membership, certification, events, partnerships and general enquiries.",
        url: pagePath,
        siteName: "Association of Hotel Professionals Kenya",
        locale: "en_KE",
        type: "website",
        images: [
            {
                url: "/login-hero.png",
                width: 1536,
                height: 1024,
                alt: "Contact the Association of Hotel Professionals Kenya",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Contact AHPK",
        description:
            "Contact the Association of Hotel Professionals Kenya.",
        images: ["/login-hero.png"],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};


export default async function ContactPage() {
    const [page, contact] = await Promise.all([
        prisma.websitePage.findUnique({
            where: {
                slug: "contact",
            },
        }),

        prisma.contactSetting.findUnique({
            where: {
                id: "main",
            },
        }),
    ]);

    const heroImage =
        page?.imageUrl || "/contact-hero.webp";

    const title =
        page?.title || "Contact AHPK";

    const subtitle =
        page?.subtitle ||
        "Reach out to the Association of Hotel Professionals Kenya for membership, certification, events, partnerships and general enquiries.";

    const content =
        page?.content ||
        "Send your enquiry and the AHPK Secretariat will respond as soon as possible.";

    const address =
        contact?.address ||
        "The Clarion Hotel Building, Second Floor, Moi Avenue, Nairobi, Kenya";

    const email =
        contact?.email ||
        "info@kenyahoteliers.com";

    const phone1 =
        contact?.phone1 ||
        "+254 785 707 378";

    const phone = contact?.phone2
        ? `${phone1} / ${contact.phone2}`
        : phone1;

    const phoneHref = phone1.replace(
        /[^\d+]/g,
        "",
    );

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <BreadcrumbJsonLd
                items={[
                    {
                        name: "Home",
                        url: "/",
                    },
                    {
                        name: "Contact AHPK",
                        url: pagePath,
                    },
                ]}
            />

            <ContactPageJsonLd
                address={address}
                email={email}
                phone={phone1}
            />

            <PageHeader />

            {/* COMPACT EDITORIAL HERO */}
            <section className="border-b border-slate-300 bg-white">
                <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <Breadcrumb />
                    <div className="mt-4 grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-8">
                        <div className="min-w-0">
                            <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                                {title === "Contact AHPK" ? (<>Contact <span className="text-[#C8102E]">AHPK</span></>) : title}
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                {subtitle}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <a href={`mailto:${email}`} className="inline-flex min-h-10 items-center justify-center gap-2 bg-[#C8102E] px-5 text-sm font-black text-white transition hover:bg-[#A80D27]">
                                    <Mail className="h-4 w-4" /> Email AHPK
                                </a>
                                <a href={`tel:${phoneHref}`} className="inline-flex min-h-10 items-center justify-center gap-2 border border-slate-300 px-5 text-sm font-black text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]">
                                    <Phone className="h-4 w-4" /> Call Secretariat
                                </a>
                            </div>
                        </div>
                        <figure className="overflow-hidden bg-slate-100">
                            <img src={heroImage} alt="AHPK Secretariat contact" className="aspect-[16/7] w-full object-cover object-center lg:aspect-[16/8]" />
                        </figure>
                    </div>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="bg-white py-5 sm:py-6">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                        {/* FORM */}
                        <section className="min-w-0 border-t-4 border-[#C8102E] pt-4">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                Send a Message
                            </p>

                            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                Get in touch with our Secretariat
                            </h2>

                            <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
                                {content}
                            </p>

                            <div className="mt-4 border-t border-slate-300 pt-4">
                                <ContactForm />
                            </div>
                        </section>

                        {/* SIDEBAR */}
                        <aside className="space-y-4 lg:sticky lg:top-28">
                            <section className="border-t-4 border-slate-950">
                                <div className="border-b border-slate-300 py-3">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Contact Details
                                    </p>

                                    <h2 className="text-lg font-black text-slate-950">
                                        AHPK Secretariat
                                    </h2>
                                </div>

                                <div className="divide-y divide-slate-300 border-b border-slate-300">
                                    <ContactItem
                                        icon={MapPin}
                                        title="Office Address"
                                        value={address}
                                    />

                                    <ContactItem
                                        icon={Mail}
                                        title="Email Address"
                                        value={email}
                                        href={`mailto:${email}`}
                                    />

                                    <ContactItem
                                        icon={Phone}
                                        title="Phone Number"
                                        value={phone}
                                        href={`tel:${phoneHref}`}
                                    />
                                </div>
                            </section>

                            <section className="border-t-4 border-[#C8102E] bg-slate-50 p-4">
                                <Clock3 className="h-6 w-6 text-[#C8102E]" />

                                <h2 className="mt-2 text-xl font-black text-slate-950">
                                    Office Enquiries
                                </h2>

                                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                    Contact the Secretariat for
                                    membership, certification,
                                    association events, partnerships
                                    and general enquiries.
                                </p>
                            </section>

                            <section className="border-t-4 border-slate-950 bg-white">
                                <div className="border-b border-slate-300 py-3">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                        Follow AHPK
                                    </p>

                                    <h2 className="text-lg font-black text-slate-950">
                                        Official channels
                                    </h2>
                                </div>

                                <div className="flex flex-wrap gap-x-4 gap-y-3 py-4">
                                    {contact?.facebookUrl && (
                                        <SocialLink
                                            href={contact.facebookUrl}
                                            label="Facebook"
                                        />
                                    )}

                                    {contact?.twitterUrl && (
                                        <SocialLink
                                            href={contact.twitterUrl}
                                            label="X"
                                        />
                                    )}

                                    {contact?.linkedinUrl && (
                                        <SocialLink
                                            href={contact.linkedinUrl}
                                            label="LinkedIn"
                                        />
                                    )}

                                    {contact?.instagramUrl && (
                                        <SocialLink
                                            href={contact.instagramUrl}
                                            label="Instagram"
                                        />
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
                            </section>
                        </aside>
                    </div>
                </div>
            </section>

            {/* MAP */}
            {contact?.mapUrl && (
                <section className="border-t border-slate-300 bg-slate-50 py-8 sm:py-10">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="max-w-3xl border-t-4 border-[#C8102E] pt-4">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C8102E]">
                                Find Us
                            </p>

                            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                                Visit the AHPK Secretariat
                            </h2>

                            <p className="mt-3 text-base font-medium leading-7 text-slate-600">
                                Use the map below to locate our office.
                            </p>
                        </div>

                        <div className="mt-5 border-y border-slate-300 bg-white">
                            <iframe
                                src={contact.mapUrl}
                                title="AHPK office location"
                                className="h-[260px] w-full border-0 sm:h-[330px]"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </section>
            )}



            <PublicFooter />
        </main>
    );
}

function ContactItem({
    icon: Icon,
    title,
    value,
    href,
}: {
    icon: typeof MapPin;
    title: string;
    value: string;
    href?: string;
}) {
    const content = (
        <div className="grid grid-cols-[26px_minmax(0,1fr)] gap-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-slate-950 text-white">
                <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#C8102E]">
                    {title}
                </p>

                <p className="mt-1 whitespace-pre-line break-words text-sm font-semibold leading-6 text-slate-700">
                    {value}
                </p>
            </div>
        </div>
    );

    if (!href) {
        return content;
    }

    return (
        <a
            href={href}
            className="block transition hover:bg-slate-50"
        >
            {content}
        </a>
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
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-black text-slate-700 transition hover:border-[#C8102E] hover:text-[#C8102E]"
        >
            <Globe className="h-4 w-4" />

            {label}

            <ExternalLink className="h-3.5 w-3.5" />
        </Link>
    );
}

function PageHeader() {
    return (
        <header
            className="sticky top-0 z-[60] border-b border-slate-200 bg-white/95 backdrop-blur-xl"
            style={
                {
                    "--header-height": "88px",
                } as CSSProperties
            }
        >
            <div className="mx-auto flex h-[82px] max-w-[1700px] items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    aria-label="AHPK homepage"
                    className="shrink-0"
                >
                    <Image
                        src={Logo}
                        alt="Association of Hotel Professionals Kenya"
                        width={92}
                        height={92}
                        priority
                        className="h-[66px] w-[66px] object-contain sm:h-[72px] sm:w-[72px]"
                    />
                </Link>

                <div className="ml-auto flex items-center">
                    <DesktopNavigation />
                </div>
            </div>
        </header>
    );
}
function Breadcrumb() {
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500"
        >
            <Link
                href="/"
                className="inline-flex items-center gap-2 transition hover:text-[#C8102E]"
            >
                <Home className="h-4 w-4" />

                Home
            </Link>

            <ChevronRight className="h-4 w-4 text-slate-300" />

            <span
                className="text-[#C8102E]"
                aria-current="page"
            >
                Contact AHPK
            </span>
        </nav>
    );
}


function ContactPageJsonLd({
    address,
    email,
    phone,
}: {
    address: string;
    email: string;
    phone: string;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id":
            "https://ahpk.or.ke/contact#webpage",
        url: "https://ahpk.or.ke/contact",
        name: "Contact AHPK",
        description:
            "Contact the Association of Hotel Professionals Kenya.",
        inLanguage: "en-KE",

        mainEntity: {
            "@type": "Organization",
            "@id":
                "https://ahpk.or.ke/#organization",
            name:
                "Association of Hotel Professionals Kenya",
            alternateName: "AHPK",
            url: "https://ahpk.or.ke",
            email,
            telephone: phone,

            address: {
                "@type": "PostalAddress",
                streetAddress: address,
                addressLocality: "Nairobi",
                addressCountry: "KE",
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd),
            }}
        />
    );
}
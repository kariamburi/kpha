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
    Globe2,
    Home,
    Mail,
    MapPin,
    MessageSquareText,
    Phone,
    Send,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import BreadcrumbJsonLd from "../components/seo/BreadcrumbJsonLd";
import PublicFooter from "../components/public/PublicFooter";
import PublicNavbar from "../components/public/PublicNavbar";
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

            {/* HERO */}
            <section className="relative isolate min-h-[66vh] overflow-hidden border-b border-slate-200 bg-white">
                <div
                    className="absolute inset-0 -z-30 bg-cover bg-center"
                    style={{
                        backgroundImage: `url("${heroImage}")`,
                    }}
                />

                <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_30%,rgba(255,255,255,0.98)_43%,rgba(255,255,255,0.9)_56%,rgba(255,255,255,0.65)_72%,rgba(255,255,255,0.18)_91%,rgba(255,255,255,0)_100%)] lg:block" />

                <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_60%,rgba(255,255,255,0.68)_100%)] lg:hidden" />

                <div className="pointer-events-none absolute -left-28 top-10 -z-10 h-96 w-96 rounded-full bg-red-100/70 blur-3xl" />

                <div className="relative mx-auto flex min-h-[66vh] max-w-7xl flex-col px-5 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
                    <Breadcrumb />

                    <div className="flex flex-1 items-center py-10">
                        <div className="max-w-3xl lg:w-[60%]">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-white/90 text-[#C8102E] shadow-sm backdrop-blur sm:h-12 sm:w-12">
                                    <MessageSquareText className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8102E] sm:text-[11px]">
                                        Contact Us
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        AHPK Secretariat
                                    </p>
                                </div>
                            </div>

                            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                                {title}
                            </h1>

                            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                                {subtitle}
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <a
                                    href={`mailto:${email}`}
                                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#C8102E] px-5 text-sm font-extrabold text-white transition hover:bg-[#a70d27]"
                                >
                                    <Mail className="h-4 w-4" />

                                    Email AHPK
                                </a>

                                <a
                                    href={`tel:${phoneHref}`}
                                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 text-sm font-extrabold text-slate-800 shadow-sm backdrop-blur transition hover:border-red-200 hover:text-[#C8102E]"
                                >
                                    <Phone className="h-4 w-4" />

                                    Call Secretariat
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* CONTACT CONTENT */}
            <section className="bg-slate-50 py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
                        {/* FORM */}
                        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                <Send className="h-5 w-5" />
                            </div>

                            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                Send a Message
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                Get in touch with our Secretariat
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                {content}
                            </p>

                            <div className="mt-8">
                                <ContactForm />
                            </div>
                        </section>

                        {/* SIDEBAR */}
                        <aside className="space-y-5 lg:sticky lg:top-28">
                            <div className="overflow-hidden rounded-[26px] bg-slate-950 text-white shadow-xl">
                                <div className="border-b border-white/10 px-6 py-6">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
                                        Contact Details
                                    </p>

                                    <h2 className="mt-2 text-2xl font-extrabold">
                                        AHPK Secretariat
                                    </h2>
                                </div>

                                <div className="space-y-3 p-5">
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
                            </div>

                            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                    <Clock3 className="h-5 w-5" />
                                </div>

                                <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                                    Office Enquiries
                                </h2>

                                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                                    Contact the Secretariat for
                                    membership, certification,
                                    association events, partnerships
                                    and general enquiries.
                                </p>
                            </div>

                            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                        <Globe2 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-extrabold text-slate-950">
                                            Follow AHPK
                                        </h2>

                                        <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                                            Connect with the
                                            Association through its
                                            official social media
                                            channels.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-2.5">
                                    {contact?.facebookUrl && (
                                        <SocialLink
                                            href={
                                                contact.facebookUrl
                                            }
                                            label="Facebook"
                                        />
                                    )}

                                    {contact?.twitterUrl && (
                                        <SocialLink
                                            href={
                                                contact.twitterUrl
                                            }
                                            label="X"
                                        />
                                    )}

                                    {contact?.linkedinUrl && (
                                        <SocialLink
                                            href={
                                                contact.linkedinUrl
                                            }
                                            label="LinkedIn"
                                        />
                                    )}

                                    {contact?.instagramUrl && (
                                        <SocialLink
                                            href={
                                                contact.instagramUrl
                                            }
                                            label="Instagram"
                                        />
                                    )}

                                    {!contact?.facebookUrl &&
                                        !contact?.twitterUrl &&
                                        !contact?.linkedinUrl &&
                                        !contact?.instagramUrl && (
                                            <p className="text-sm font-semibold text-slate-500">
                                                Social media links
                                                will be updated soon.
                                            </p>
                                        )}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* MAP */}
            {contact?.mapUrl && (
                <section className="bg-white py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="mb-8 max-w-2xl">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                                <MapPin className="h-5 w-5" />
                            </div>

                            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#C8102E]">
                                Find Us
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                                Visit the AHPK Secretariat
                            </h2>

                            <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                Use the map below to locate our
                                office.
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                            <iframe
                                src={contact.mapUrl}
                                title="AHPK office location"
                                className="h-[420px] w-full border-0 sm:h-[500px]"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* MEMBERSHIP CTA */}
            <section className="bg-white pb-16 sm:pb-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 rounded-[28px] bg-[#C8102E] p-7 text-white sm:p-9 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">
                                Membership
                            </p>

                            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                                Interested in joining AHPK?
                            </h2>

                            <p className="mt-3 text-sm font-medium leading-7 text-white/80 sm:text-base">
                                Learn about membership eligibility,
                                categories and the application
                                process.
                            </p>
                        </div>

                        <Link
                            href="/apply"
                            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-extrabold text-[#C8102E] transition hover:bg-red-50"
                        >
                            Apply for Membership

                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <PublicFooter />
        </main>
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
        <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C8102E] text-white">
                <Icon className="h-4 w-4" />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-red-300">
                    {title}
                </p>

                <p className="mt-2 whitespace-pre-line break-words text-sm font-semibold leading-6 text-white/75">
                    {value}
                </p>
            </div>
        </div>
    );

    if (!href) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                {content}
            </div>
        );
    }

    return (
        <a
            href={href}
            className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-red-300/40 hover:bg-white/10"
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
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3.5 text-sm font-extrabold text-[#C8102E] transition hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white"
        >
            <Globe className="h-4 w-4" />

            {label}

            <ExternalLink className="h-3.5 w-3.5" />
        </Link>
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
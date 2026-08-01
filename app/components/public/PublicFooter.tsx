import Link from "next/link";
import Image from "next/image";

import Logo from "@/app/assets/logo.png";

import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";

import { prisma } from "@/lib/prisma";

export default async function PublicFooter() {
    const contact =
        await prisma.contactSetting.findUnique({
            where: {
                id: "main",
            },
        });

    const address =
        contact?.address ||
        "The Clarion Hotel Building, Second Floor, Moi Avenue, Nairobi, Kenya";

    const email =
        contact?.email ||
        "info@ahpk.or.ke";

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

    const hasSocialLinks = Boolean(
        contact?.facebookUrl ||
        contact?.twitterUrl ||
        contact?.linkedinUrl ||
        contact?.instagramUrl,
    );

    return (
        <footer className="border-t border-slate-800 bg-slate-950 text-white">
            {/* Main footer */}
            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(170px,0.7fr)_minmax(190px,0.8fr)] lg:gap-12">
                    {/* Organisation */}
                    <section>
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg sm:h-16 sm:w-16">
                                <Image
                                    src={Logo}
                                    alt="Association of Hotel Professionals Kenya"
                                    width={54}
                                    height={54}
                                    className="h-full w-full object-contain"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400 sm:text-xs">
                                    AHPK
                                </p>

                                <h2 className="mt-1 text-xl font-black leading-tight text-white sm:text-2xl">
                                    Association of Hotel
                                    Professionals Kenya
                                </h2>

                                <p className="mt-1.5 text-xs font-semibold leading-5 text-white/45 sm:text-sm">
                                    Professional Leadership ·
                                    Stronger Together ·
                                    Excellence in Hospitality
                                </p>
                            </div>
                        </div>

                        <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/60">
                            AHPK is committed to advancing
                            professionalism, certification,
                            continuous professional
                            development, leadership and
                            networking across Kenya&apos;s
                            hospitality industry.
                        </p>

                        <div className="mt-6 grid gap-3 text-sm font-semibold text-white/65">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 h-4 w-4 shrink-0 text-red-400" />

                                <span className="whitespace-pre-line leading-6">
                                    {address}
                                </span>
                            </div>

                            <a
                                href={`tel:${phoneHref}`}
                                className="flex w-fit items-center gap-3 transition hover:text-white"
                            >
                                <Phone className="h-4 w-4 shrink-0 text-red-400" />

                                <span>{phone}</span>
                            </a>

                            <a
                                href={`mailto:${email}`}
                                className="flex w-fit items-center gap-3 transition hover:text-white"
                            >
                                <Mail className="h-4 w-4 shrink-0 text-red-400" />

                                <span>{email}</span>
                            </a>
                        </div>
                    </section>

                    {/* Quick links */}
                    <section>
                        <FooterHeading>
                            Quick Links
                        </FooterHeading>

                        <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-white/60">
                            <FooterLink href="/about">
                                About AHPK
                            </FooterLink>

                            <FooterLink href="/events">
                                Events
                            </FooterLink>

                            <FooterLink href="/news">
                                News
                            </FooterLink>

                            <FooterLink href="/verify">
                                Verify Certificate
                            </FooterLink>

                            <FooterLink href="/disclaimer">
                                Disclaimer
                            </FooterLink>
                        </div>
                    </section>

                    {/* Member services */}
                    <section>
                        <FooterHeading>
                            Member Services
                        </FooterHeading>

                        <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-white/60">
                            <FooterLink href="/apply">
                                Apply for Membership
                            </FooterLink>

                            <FooterLink href="/member/login">
                                Member Login
                            </FooterLink>

                            <FooterLink href="/member/renewal">
                                Renew Membership
                            </FooterLink>

                            <FooterLink href="/events">
                                Register for Events
                            </FooterLink>

                            <FooterLink href="/contact">
                                Contact Secretariat
                            </FooterLink>
                        </div>
                    </section>
                </div>
            </div>

            {/* Social and utility strip */}
            <div className="border-t border-white/10 bg-black/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                            Follow AHPK
                        </p>

                        {hasSocialLinks ? (
                            <div className="mt-3 flex flex-wrap items-center gap-2.5">
                                {contact?.facebookUrl ? (
                                    <SocialIconLink
                                        href={
                                            contact.facebookUrl
                                        }
                                        label="Facebook"
                                        icon={
                                            <FaFacebookF className="h-4 w-4" />
                                        }
                                    />
                                ) : null}

                                {contact?.twitterUrl ? (
                                    <SocialIconLink
                                        href={
                                            contact.twitterUrl
                                        }
                                        label="X"
                                        icon={
                                            <FaXTwitter className="h-4 w-4" />
                                        }
                                    />
                                ) : null}

                                {contact?.linkedinUrl ? (
                                    <SocialIconLink
                                        href={
                                            contact.linkedinUrl
                                        }
                                        label="LinkedIn"
                                        icon={
                                            <FaLinkedinIn className="h-4 w-4" />
                                        }
                                    />
                                ) : null}

                                {contact?.instagramUrl ? (
                                    <SocialIconLink
                                        href={
                                            contact.instagramUrl
                                        }
                                        label="Instagram"
                                        icon={
                                            <FaInstagram className="h-4 w-4" />
                                        }
                                    />
                                ) : null}
                            </div>
                        ) : (
                            <p className="mt-2 text-xs font-semibold text-white/40">
                                Official social media links
                                will be updated soon.
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 text-left text-xs font-semibold text-white/45 md:text-right">
                        <p>
                            Questions about membership,
                            events or certification?
                        </p>

                        <Link
                            href="/contact"
                            className="font-black text-red-400 transition hover:text-white"
                        >
                            Contact the AHPK Secretariat
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-4 text-center text-xs text-white/40 sm:px-6 md:flex-row md:text-left lg:px-8">
                    <p>
                        © {new Date().getFullYear()}{" "}
                        Association of Hotel Professionals
                        Kenya. All rights reserved.
                    </p>

                    <p>
                        Powered by{" "}
                        <a
                            href="https://craftinventors.co.ke"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-white/70 transition hover:text-red-400"
                        >
                            Craft Inventors
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterHeading({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <h3 className="border-b border-white/10 pb-3 text-base font-black text-white">
            {children}
        </h3>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="w-fit transition hover:translate-x-1 hover:text-red-400"
        >
            {children}
        </Link>
    );
}

function SocialIconLink({
    href,
    label,
    icon,
}: {
    href: string;
    label: string;
    icon: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow AHPK on ${label}`}
            title={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/65 transition hover:-translate-y-0.5 hover:border-red-400 hover:bg-[#C8102E] hover:text-white"
        >
            {icon}
        </a>
    );
}
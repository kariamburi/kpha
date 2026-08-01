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
    const contact = await prisma.contactSetting.findUnique({
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
        <footer className="border-t border-slate-200 bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-12 md:grid-cols-4">
                    {/* Organisation */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg">
                                <Image
                                    src={Logo}
                                    alt="Association of Hotel Professionals Kenya"
                                    width={52}
                                    height={52}
                                    className="object-contain"
                                />
                            </div>

                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.35em] text-red-400">
                                    AHPK
                                </p>

                                <h2 className="mt-1 text-xl font-black leading-tight sm:text-2xl">
                                    Association of Hotel Professionals Kenya
                                </h2>

                                <p className="mt-2 text-sm font-semibold leading-6 text-white/50">
                                    Professional Leadership · Stronger Together ·
                                    Excellence in Hospitality
                                </p>
                            </div>
                        </div>

                        <p className="mt-6 max-w-2xl leading-8 text-white/60">
                            AHPK is committed to advancing professionalism,
                            certification, continuous professional development,
                            leadership and networking across Kenya&apos;s
                            hospitality industry.
                        </p>

                        <div className="mt-8 space-y-4 text-sm font-semibold text-white/70">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 h-5 w-5 shrink-0 text-red-400" />

                                <span className="whitespace-pre-line leading-6">
                                    {address}
                                </span>
                            </div>

                            <a
                                href={`tel:${phoneHref}`}
                                className="flex items-center gap-3 transition hover:text-white"
                            >
                                <Phone className="h-5 w-5 shrink-0 text-red-400" />
                                <span>{phone}</span>
                            </a>

                            <a
                                href={`mailto:${email}`}
                                className="flex items-center gap-3 transition hover:text-white"
                            >
                                <Mail className="h-5 w-5 shrink-0 text-red-400" />
                                <span>{email}</span>
                            </a>
                        </div>

                        {/* Saved social media links */}
                        {hasSocialLinks ? (
                            <div className="mt-8">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
                                    Follow AHPK
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    {contact?.facebookUrl ? (
                                        <SocialIconLink
                                            href={contact.facebookUrl}
                                            label="Facebook"
                                            icon={<FaFacebookF className="h-4 w-4" />}
                                        />
                                    ) : null}

                                    {contact?.twitterUrl ? (
                                        <SocialIconLink
                                            href={contact.twitterUrl}
                                            label="X"
                                            icon={<FaXTwitter className="h-4 w-4" />}
                                        />
                                    ) : null}

                                    {contact?.linkedinUrl ? (
                                        <SocialIconLink
                                            href={contact.linkedinUrl}
                                            label="LinkedIn"
                                            icon={<FaLinkedinIn className="h-4 w-4" />}
                                        />
                                    ) : null}

                                    {contact?.instagramUrl ? (
                                        <SocialIconLink
                                            href={contact.instagramUrl}
                                            label="Instagram"
                                            icon={<FaInstagram className="h-4 w-4" />}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-black">
                            Quick Links
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-white/60">
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

                            {/**  <FooterLink href="/privacy-policy">
                                Privacy Policy
                            </FooterLink>

                            <FooterLink href="/terms">
                                Terms of Use
                            </FooterLink>*/}

                            <FooterLink href="/disclaimer">
                                Disclaimer
                            </FooterLink>
                        </div>
                    </div>

                    {/* Member Services */}
                    <div>
                        <h3 className="text-lg font-black">
                            Member Services
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-white/60">
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
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-white/50 md:flex-row">
                    <p className="text-center md:text-left">
                        © {new Date().getFullYear()} Association of Hotel
                        Professionals Kenya. All rights reserved.
                    </p>

                    <p className="text-center md:text-right">
                        Powered by{" "}
                        <a
                            href="https://craftinventors.co.ke"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-red-400 transition hover:text-white"
                        >
                            Craft Inventors
                        </a>
                    </p>
                </div>
            </div>
        </footer>
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:-translate-y-0.5 hover:border-red-400 hover:bg-[#C8102E] hover:text-white"
        >
            {icon}
        </a>
    );
}
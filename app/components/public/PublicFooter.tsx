import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/logo.png";
import { Mail, MapPin, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function PublicFooter() {
    const contact = await prisma.contactSetting.findUnique({
        where: { id: "main" },
    });

    const address =
        contact?.address ||
        "The Clarion Hotel Building, Second Floor, Moi Avenue, Nairobi, Kenya";

    const email = contact?.email || "info@kenyahoteliers.com";

    const phone = `${contact?.phone1 || "+254 785 707 378"}${contact?.phone2 ? ` / ${contact.phone2}` : ""
        }`;

    return (
        <footer className="border-t border-slate-200 bg-slate-950 text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-sm">
                            <Image
                                src={Logo}
                                alt="AHPK Logo"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-black tracking-[0.25em] text-red-400">
                                AHPK
                            </p>
                            <h2 className="mt-1 text-xl font-black">
                                Association of Hotel Professionals Kenya
                            </h2>
                        </div>
                    </div>

                    <p className="mt-4 max-w-xl leading-7 text-white/60">
                        Advancing professionalism, certification, continuous development and
                        leadership in Kenya’s hospitality industry.
                    </p>

                    <div className="mt-6 grid gap-3 text-sm font-semibold text-white/65">
                        <div className="flex items-start gap-3">
                            <MapPin className="mt-1 h-4 w-4 shrink-0 text-red-400" />
                            <span>{address}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 shrink-0 text-red-400" />
                            <span>{phone}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 shrink-0 text-red-400" />
                            <span>{email}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-black">Quick Links</h3>

                    <div className="mt-4 grid gap-3 text-sm text-white/60">
                        <Link href="/about" className="transition hover:text-white">
                            About AHPK
                        </Link>

                        <Link href="/events" className="transition hover:text-white">
                            Events
                        </Link>

                        <Link href="/news" className="transition hover:text-white">
                            News
                        </Link>

                        <Link href="/verify" className="transition hover:text-white">
                            Verify Certificate
                        </Link>

                        <Link href="/disclaimer" className="transition hover:text-white">
                            Disclaimer
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-black">Member Services</h3>
                    <div className="mt-4 grid gap-3 text-sm text-white/60">
                        <Link href="/apply" className="hover:text-white">
                            Apply
                        </Link>
                        <Link href="/member/login" className="hover:text-white">
                            Member Login
                        </Link>
                        <Link href="/member/renewal" className="hover:text-white">
                            Renew Membership
                        </Link>
                        <Link href="/contact" className="hover:text-white">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-white/50">
                © {new Date().getFullYear()} Association of Hotel Professionals Kenya.
                All rights reserved.
            </div>
        </footer>
    );
}
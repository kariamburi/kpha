"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    FileText,
    LogIn,
    Search,
    UserPlus,
    Users,
    type LucideIcon,
} from "lucide-react";

import Logo from "@/app/assets/logo.png";
import { DesktopNavigation } from "../site/desktop-navigation";

type HeroSlide = {
    image: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
};

const slides: HeroSlide[] = [
    {
        title: "Welcome to AHPK",
        description:
            "The Association advances professional values within the hotel industry by enhancing the quality of services provided to clients and influencing related industries.",
        image: "/banner-hero.png",
        buttonLabel: "Learn More",
        buttonHref: "/about/who-we-are",
    },
    {
        title: "Professional Excellence in Hospitality",
        description:
            "Supporting professional growth through ethics, certification, membership and continuous professional development.",
        image: "/banner-hero.png",
        buttonLabel: "Become a Member",
        buttonHref: "/apply",
    },
    {
        title: "Building Kenya's Hospitality Industry",
        description:
            "Promoting professionalism, accountability and sustainable development across Kenya's hospitality sector.",
        image: "/banner-hero.png",
        buttonLabel: "Our Purpose",
        buttonHref: "/about/our-purpose",
    },
];

const quickServices = [
    {
        title: "Apply",
        href: "/apply",
        icon: UserPlus,
    },
    {
        title: "Member Login",
        href: "/member/login",
        icon: LogIn,
    },
    {
        title: "Verify Certificate",
        href: "/verify",
        icon: BadgeCheck,
    },
    {
        title: "Events & CPD",
        href: "/events",
        icon: CalendarDays,
    },
    {
        title: "Resources",
        href: "/resources",
        icon: FileText,
    },
    {
        title: "Member Directory",
        href: "/directory",
        icon: Users,
    },
];

export default function PublicHero() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveSlide(
                (current) => (current + 1) % slides.length,
            );
        }, 7000);

        return () => {
            window.clearInterval(timer);
        };
    }, [paused]);

    function previousSlide() {
        setActiveSlide(
            (current) =>
                (current - 1 + slides.length) %
                slides.length,
        );
    }

    function nextSlide() {
        setActiveSlide(
            (current) => (current + 1) % slides.length,
        );
    }

    const active = slides[activeSlide];

    return (
        <section
            className="relative flex min-h-[980px] flex-col overflow-visible bg-slate-950 sm:min-h-[1040px] lg:min-h-[920px] xl:min-h-[900px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* BACKGROUND SLIDES */}
            <div className="absolute inset-0 overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={`${slide.image}-${index}`}
                        className={`absolute inset-0 transition-all duration-1000 ease-out ${index === activeSlide
                            ? "scale-100 opacity-100"
                            : "scale-105 opacity-0"
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt=""
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                ))}

                {/* TOP LIGHT OVERLAY */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 10%, rgba(255,255,255,0.88) 22%, rgba(255,255,255,0.42) 42%, rgba(255,255,255,0.08) 64%, rgba(255,255,255,0) 78%)",
                    }}
                />

                {/* BOTTOM DARK OVERLAY */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

                {/* SIDE READABILITY OVERLAY */}
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/65 via-slate-950/10 to-transparent" />
            </div>

            {/* HEADER */}
            <header
                className="absolute inset-x-0 top-0 z-50"
                style={
                    {
                        "--header-height": "112px",
                    } as React.CSSProperties
                }
            >
                <div className="mx-auto flex min-h-[88px] w-full max-w-[1700px] items-center gap-4 px-4 sm:min-h-[100px] sm:px-6 lg:px-8 xl:min-h-[112px] xl:px-10">
                    <Link
                        href="/"
                        aria-label="AHPK homepage"
                        className="relative z-10 shrink-0"
                    >
                        <Image
                            src={Logo}
                            alt="Association of Hotel Professionals Kenya"
                            width={160}
                            height={160}
                            priority
                            className="h-[76px] w-[76px] object-contain sm:h-[92px] sm:w-[92px] lg:h-[108px] lg:w-[108px] xl:h-[125px] xl:w-[125px]"
                        />
                    </Link>

                    <div className="ml-auto flex min-w-0 items-center">
                        <DesktopNavigation />
                    </div>
                </div>
            </header>

            {/* HERO CONTENT */}
            <div className="relative z-20 mx-auto flex w-full max-w-[1550px] flex-1 flex-col justify-end px-5 pb-8 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pb-10 xl:pt-40">
                <div className="max-w-[920px]">
                    <div
                        key={activeSlide}
                        className="animate-[heroFade_.7s_ease-out]"
                    >
                        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:text-[11px]">
                            <span className="h-2 w-2 rounded-full bg-[#ED1C24]" />
                            Association of Hotel Professionals Kenya
                        </p>

                        <h1 className="max-w-[920px] text-[40px] font-bold leading-[1.04] tracking-tight text-white drop-shadow-md sm:text-[50px] lg:text-[60px] xl:text-[68px]">
                            {active.title}
                        </h1>

                        <p className="mt-5 max-w-[850px] text-base font-medium leading-8 text-white/95 drop-shadow sm:text-lg lg:text-xl">
                            {active.description}
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={active.buttonHref}
                                className="inline-flex min-h-12 items-center justify-center bg-[#ED1C24] px-7 py-3 text-sm font-extrabold uppercase text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#C8102E]"
                            >
                                {active.buttonLabel}
                            </Link>

                            <Link
                                href="/membership"
                                className="inline-flex min-h-12 items-center justify-center border border-white/60 bg-white/15 px-7 py-3 text-sm font-extrabold uppercase text-white backdrop-blur-md transition hover:bg-white hover:text-slate-950"
                            >
                                Explore Membership
                            </Link>
                        </div>
                    </div>

                    {/* SLIDER CONTROLS */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button
                            type="button"
                            onClick={previousSlide}
                            aria-label="Previous slide"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        setActiveSlide(index)
                                    }
                                    aria-label={`View slide ${index + 1
                                        }`}
                                    className={`h-2.5 rounded-full transition-all ${activeSlide === index
                                        ? "w-9 bg-[#ED1C24]"
                                        : "w-2.5 bg-white/70 hover:bg-white"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Next slide"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>

                        <p className="ml-1 text-xs font-bold text-white/80">
                            {String(activeSlide + 1).padStart(
                                2,
                                "0",
                            )}

                            <span className="mx-2 text-white/40">
                                /
                            </span>

                            {String(slides.length).padStart(
                                2,
                                "0",
                            )}
                        </p>
                    </div>
                </div>

                {/* MEMBER SERVICES PANEL */}
                <div className="relative z-30 mt-10 w-full lg:mt-12">
                    <div className="overflow-hidden rounded-[28px] border border-white/20 bg-slate-950/60 shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
                        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                            {/* MEMBER SEARCH */}
                            <div className="border-b border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-7">
                                <div className="mb-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-300">
                                        Member verification
                                    </p>

                                    <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                                        Find an AHPK professional
                                    </h2>

                                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                                        Search the official member
                                        directory using a member name
                                        or membership number.
                                    </p>
                                </div>

                                <form
                                    action="/directory"
                                    method="get"
                                    className="rounded-2xl bg-white p-2 shadow-xl"
                                >
                                    <div className="flex flex-col gap-2 sm:flex-row">
                                        <div className="relative min-w-0 flex-1">
                                            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="search"
                                                name="q"
                                                aria-label="Search AHPK member"
                                                placeholder="Name or member number"
                                                className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-13 pr-5 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#C1121F] focus:bg-white focus:ring-4 focus:ring-red-100"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#C1121F] px-6 text-sm font-black text-white transition hover:bg-[#9E0D1B] focus:outline-none focus:ring-4 focus:ring-red-200"
                                        >
                                            <Search className="h-4 w-4" />
                                            Search member
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* QUICK SERVICES */}
                            <div className="p-5 sm:p-6 lg:p-7">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-300">
                                            Quick access
                                        </p>

                                        <h2 className="mt-2 text-xl font-extrabold text-white">
                                            Member services
                                        </h2>
                                    </div>

                                    <span className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/60 sm:inline-flex">
                                        AHPK Portal
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                                    {quickServices.map(
                                        (service) => (
                                            <HeroServiceCard
                                                key={
                                                    service.href
                                                }
                                                title={
                                                    service.title
                                                }
                                                href={
                                                    service.href
                                                }
                                                icon={
                                                    service.icon
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes heroFade {
                    from {
                        opacity: 0;
                        transform: translateY(18px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}

function HeroServiceCard({
    title,
    href,
    icon: Icon,
}: {
    title: string;
    href: string;
    icon: LucideIcon;
}) {
    return (
        <Link
            href={href}
            className="group flex min-h-[108px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white hover:shadow-xl"
        >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition group-hover:bg-red-50 group-hover:text-[#C1121F]">
                <Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                />
            </span>

            <span className="mt-5 flex items-end justify-between gap-2">
                <span className="text-sm font-extrabold leading-5 text-white transition group-hover:text-slate-950">
                    {title}
                </span>

                <ArrowRight className="h-4 w-4 shrink-0 text-white/45 transition group-hover:translate-x-1 group-hover:text-[#C1121F]" />
            </span>
        </Link>
    );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    UserPlus,
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
        image: "/banner-hero.webp",
        buttonLabel: "Learn More",
        buttonHref: "/about/who-we-are",
    },
    {
        title: "Professional Excellence in Hospitality",
        description:
            "Supporting professional growth through ethics, certification, membership and continuous professional development.",
        image: "/slider_2.webp",
        buttonLabel: "Become a Member",
        buttonHref: "/apply",
    },
    {
        title: "Building Kenya's Hospitality Industry",
        description:
            "Promoting professionalism, accountability and sustainable development across Kenya's hospitality sector.",
        image: "/slider_reception.webp",
        buttonLabel: "Our Purpose",
        buttonHref: "/members-section/constitution-rules/objectives",
    },
];


type Props = {
    welcomeTitle?: string | null;
    welcomeText?: string | null;

};
export default function PublicHeroLignt({
    welcomeTitle,
    welcomeText,

}: Props) {
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
            className="relative flex min-h-[760px] flex-col overflow-visible bg-slate-100 sm:min-h-[800px] lg:min-h-[760px] xl:min-h-[780px]"
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

                {/* LIGHT HERO OVERLAYS */}
                <div className="absolute inset-0 z-10 bg-white/20" />

                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 12%, rgba(255,255,255,0.72) 30%, rgba(255,255,255,0.28) 56%, rgba(255,255,255,0.82) 100%)",
                    }}
                />

                <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/95 via-white/55 to-white/10" />
            </div>

            {/* HEADER */}
            <header
                className="absolute inset-x-0 top-0 z-50"
                style={
                    {
                        "--header-height": "92px",
                    } as React.CSSProperties
                }
            >
                <div className="mx-auto flex min-h-[76px] w-full max-w-[1700px] items-center gap-4 px-4 sm:min-h-[84px] sm:px-6 lg:px-8 xl:min-h-[92px] xl:px-10">
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
                            className="h-[64px] w-[64px] object-contain sm:h-[72px] sm:w-[72px] lg:h-[82px] lg:w-[82px] xl:h-[90px] xl:w-[90px]"
                        />
                    </Link>

                    <div className="ml-auto flex min-w-0 items-center">
                        <DesktopNavigation />
                    </div>
                </div>
            </header>

            {/* HERO CONTENT */}
            <div className="relative z-20 mx-auto flex w-full max-w-[1550px] flex-1 flex-col justify-end px-5 pb-5 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pb-6 xl:pt-30">
                <div className="max-w-[920px]">
                    <div
                        key={activeSlide}
                        className="animate-[heroFade_.7s_ease-out]"
                    >
                        <p className="mb-3 inline-flex items-center gap-2 border-l-4 border-[#C1121F] pl-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C1121F] sm:text-[11px]">
                            Association of Hotel Professionals Kenya
                        </p>

                        <h1 className="max-w-[900px] text-[38px] font-black leading-[1.03] tracking-tight text-slate-950 sm:text-[46px] lg:text-[54px] xl:text-[60px]">
                            {active.title}
                        </h1>

                        <p className="mt-3 max-w-[800px] text-base font-semibold leading-7 text-slate-700 sm:text-lg">
                            {active.description}
                        </p>

                        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                            <Link
                                href={active.buttonHref}
                                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#C1121F] px-6 py-2.5 text-sm font-extrabold uppercase text-white transition hover:bg-[#970D1B]"
                            >
                                {active.buttonLabel}
                            </Link>

                            <Link
                                href="/members-section/constitution-rules/membership"
                                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white/85 px-6 py-2.5 text-sm font-extrabold uppercase text-slate-900 backdrop-blur-md transition hover:border-[#C1121F] hover:text-[#C1121F]"
                            >
                                Explore Membership
                            </Link>
                        </div>
                    </div>

                    {/* SLIDER CONTROLS */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={previousSlide}
                            aria-label="Previous slide"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white/85 text-slate-900 backdrop-blur-md transition hover:border-[#C1121F] hover:bg-[#C1121F] hover:text-white"
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
                                        ? "w-9 bg-[#C1121F]"
                                        : "w-2.5 bg-slate-400 hover:bg-slate-600"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Next slide"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white/85 text-slate-900 backdrop-blur-md transition hover:border-[#C1121F] hover:bg-[#C1121F] hover:text-white"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>

                        <p className="ml-1 text-xs font-bold text-slate-700">
                            {String(activeSlide + 1).padStart(
                                2,
                                "0",
                            )}

                            <span className="mx-2 text-slate-400">
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
                <section className="relative z-30 mt-1 w-full rounded-xl bg-white py-2 sm:py-3">
                    <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-5 lg:grid-cols-[0.88fr_1.12fr] lg:px-6">
                        <div className="relative overflow-hidden">

                            <img
                                src="/welcome.webp"
                                alt="Hospitality professionals"
                                className="h-[280px] w-full object-cover sm:h-[310px] lg:h-[320px]"
                            />

                            <div className="absolute bottom-3 left-3 right-3 border-l-4 border-[#C8102E] bg-white/92 p-4 backdrop-blur-md">
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#C8102E]">
                                    AHPK at a glance
                                </p>
                                <p className="mt-2 text-sm font-bold leading-6 text-slate-700">
                                    Recognition, professional growth, ethical standards and a
                                    stronger hospitality community.
                                </p>
                            </div>
                        </div>

                        <div>
                            <SectionLabel>Welcome to AHPK</SectionLabel>

                            <h2 className="mt-2 max-w-3xl font-serif text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
                                {welcomeTitle}
                            </h2>

                            <div className="mt-3 space-y-3 text-sm font-medium leading-7 text-slate-600 sm:text-base">
                                <p>{welcomeText}</p>
                                <p>
                                    We bring together hospitality professionals, educators,
                                    managers and industry leaders who are committed to quality,
                                    credibility and responsible professional practice.
                                </p>
                            </div>

                            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                                <Link
                                    href="/about/who-we-are"
                                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-5 text-sm font-extrabold text-white transition hover:bg-[#A80D27]"
                                >
                                    Discover AHPK
                                    <ArrowRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/apply"
                                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-extrabold text-slate-800 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                                >
                                    Become a Member
                                    <UserPlus className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>




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
function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#C8102E]">
            {children}
        </p>
    );
}
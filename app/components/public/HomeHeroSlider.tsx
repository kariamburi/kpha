"use client";

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
} from "lucide-react";

type HeroSlide = {
    image: string;
    label: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
};

const slides: HeroSlide[] = [
    {
        image: "/banner-hero.png",
        label: "Association of Hotel Professionals Kenya",
        title: "Advancing Professional Excellence in Hospitality",
        description:
            "A professional community supporting recognition, ethical standards, continuous development and collaboration within Kenya’s hospitality industry.",
        primaryLabel: "Become a Member",
        primaryHref: "/apply",
        secondaryLabel: "Discover AHPK",
        secondaryHref: "/about/who-we-are",
    },
    {
        //image: "/images/home/hero-cpd.jpg",
        image: "/banner-hero.png",
        label: "Training and Professional Development",
        title: "Develop Your Skills and Strengthen Your Career",
        description:
            "Access professional training, workshops, industry events and continuous professional development opportunities.",
        primaryLabel: "View Events & CPD",
        primaryHref: "/events",
        secondaryLabel: "Explore Resources",
        secondaryHref: "/resources",
    },
    {
        //image: "/images/home/hero-membership.jpg",
        image: "/banner-hero.png",
        label: "Professional Recognition",
        title: "Join a Recognised Hospitality Association",
        description:
            "Build professional credibility through verified membership, digital certification and meaningful industry connections.",
        primaryLabel: "Apply for Membership",
        primaryHref: "/apply",
        secondaryLabel: "Verify Certificate",
        secondaryHref: "/verify",
    },
];

const quickServices = [
    {
        label: "Apply",
        description: "Join AHPK",
        href: "/apply",
        icon: UserPlus,
    },
    {
        label: "Member Login",
        description: "Access your portal",
        href: "/member/login",
        icon: LogIn,
    },
    {
        label: "Verify Certificate",
        description: "Confirm authenticity",
        href: "/verify",
        icon: BadgeCheck,
    },
    {
        label: "Events & CPD",
        description: "View programmes",
        href: "/events",
        icon: CalendarDays,
    },
    {
        label: "Resources",
        description: "Forms and guides",
        href: "/resources",
        icon: FileText,
    },
    {
        label: "Member Directory",
        description: "Find a member",
        href: "/directory",
        icon: Users,
    },
];

export default function HomeHeroSlider() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;

        const interval = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % slides.length);
        }, 7000);

        return () => window.clearInterval(interval);
    }, [paused]);

    function previousSlide() {
        setActiveSlide(
            (current) => (current - 1 + slides.length) % slides.length,
        );
    }

    function nextSlide() {
        setActiveSlide((current) => (current + 1) % slides.length);
    }

    const active = slides[activeSlide];

    return (
        <section
            className="relative overflow-hidden bg-slate-900"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={slide.image}
                        className={`absolute inset-0 transition-all duration-1000 ${index === activeSlide
                            ? "scale-100 opacity-100"
                            : "scale-105 opacity-0"
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-r from-[#071426]/90 via-[#071426]/65 to-[#071426]/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/55 via-transparent to-transparent" />
            </div>

            <div className="relative mx-auto flex min-h-[700px] max-w-7xl items-center px-5 pb-48 pt-20 sm:px-6 lg:px-8">
                <div className="max-w-3xl text-white">
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.22em] backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-[#F4C84A]" />
                        {active.label}
                    </p>

                    <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]">
                        {active.title}
                    </h1>

                    <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/88 sm:text-lg">
                        {active.description}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={active.primaryHref}
                            className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#C8102E] px-7 py-4 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#A80D27]"
                        >
                            {active.primaryLabel}
                        </Link>

                        <Link
                            href={active.secondaryHref}
                            className="inline-flex min-h-13 items-center justify-center rounded-xl border border-white/50 bg-white/10 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-md transition hover:bg-white hover:text-slate-950"
                        >
                            {active.secondaryLabel}
                        </Link>
                    </div>

                    <div className="mt-10 flex items-center gap-4">
                        <button
                            type="button"
                            onClick={previousSlide}
                            aria-label="Previous slide"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 transition hover:bg-white hover:text-slate-950"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.image}
                                    type="button"
                                    onClick={() => setActiveSlide(index)}
                                    aria-label={`View slide ${index + 1}`}
                                    className={`h-2.5 rounded-full transition-all ${activeSlide === index
                                        ? "w-9 bg-[#F4C84A]"
                                        : "w-2.5 bg-white/60 hover:bg-white"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Next slide"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 transition hover:bg-white hover:text-slate-950"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/**   <div className="absolute inset-x-0 bottom-0 z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-t-[30px] border border-white/50 bg-white shadow-2xl">
                        <form
                            action="/directory"
                            className="border-b border-slate-100 p-4 sm:p-5"
                        >
                            <div className="flex flex-col gap-3 lg:flex-row">
                                <div className="relative flex-1">
                                    <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="search"
                                        name="q"
                                        placeholder="Search member by name or membership number..."
                                        className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-13 pr-5 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#C8102E] focus:bg-white focus:ring-4 focus:ring-red-50"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-7 text-sm font-extrabold text-white transition hover:bg-[#A80D27]"
                                >
                                    <Search className="h-4 w-4" />
                                    Search Member
                                </button>
                            </div>
                        </form>

                        <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
                            {quickServices.map((service) => {
                                const Icon = service.icon;

                                return (
                                    <Link
                                        key={service.href}
                                        href={service.href}
                                        className="group flex min-h-[104px] items-center gap-3 bg-white px-4 py-4 transition hover:bg-red-50"
                                    >
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E] transition group-hover:bg-[#C8102E] group-hover:text-white">
                                            <Icon className="h-5 w-5" />
                                        </span>

                                        <span>
                                            <span className="block text-sm font-extrabold text-slate-950">
                                                {service.label}
                                            </span>

                                            <span className="mt-1 block text-xs font-medium text-slate-500">
                                                {service.description}
                                            </span>
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>*/}
        </section>
    );
}
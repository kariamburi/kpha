"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    ArrowLeft,
    ArrowRight,
    Award,
    BookOpen,
    Compass,
    FileText,
    Globe2,
    Handshake,
    Lightbulb,
    MapPin,
    MousePointer2,
    Paperclip,
    ShieldCheck,
    Smartphone,
    Users,
    type LucideIcon,
} from "lucide-react";

type StandardsItem = {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
};

type StandardsSlide = {
    label: string;
    title: string;
    description: string;
    items: StandardsItem[];
};

const standardsSlides: StandardsSlide[] = [
    {
        label: "Professional Standards",
        title: "Ethics, conduct and professional responsibility",
        description:
            "Standards that guide the conduct, relationships and accountability of AHPK members.",
        items: [
            {
                title: "Professional Attitude & Behaviour",
                description:
                    "A member of the Association of Hotel Professionals Kenya shall conduct all professional activities in a manner that reflects credit upon the member, the Association and the hospitality industry.",
                href: "/members-section/code-of-conduct-ethics/professional-attitude-behavior",
                icon: Lightbulb,
            },
            {
                title: "Relationships with Clients",
                description:
                    "Members must uphold the law, the professional code and their ethical responsibilities when accepting assignments and serving clients.",
                href: "/members-section/code-of-conduct-ethics/relationships-with-clients",
                icon: Smartphone,
            },
            {
                title: "Professional Relationships",
                description:
                    "Members working with hospitality professionals and consultants shall maintain standards of conduct that support clients and preserve professional relationships.",
                href: "/members-section/code-of-conduct-ethics/professional-relationships",
                icon: Users,
            },
            {
                title: "Handling Alleged Violations",
                description:
                    "A fair process is provided for considering complaints while protecting members’ rights, privacy and professional reputations.",
                href: "/members-section/code-of-conduct-ethics/handling-alleged-violations",
                icon: Globe2,
            },
        ],
    },
    {
        label: "Governance",
        title: "AHPK's Governance & Documents.",
        description:
            "Official rules, ethics pledges and association documents.",
        items: [
            {
                title: "Objectives",
                description:
                    "Discover AHPK's objectives for advancing the hospitality profession.",
                href: "/members-section/constitution-rules/objectives",
                icon: BookOpen,
            },
            {
                title: "Membership",
                description:
                    "Learn about membership eligibility, rights, privileges and responsibilities.",
                href: "/members-section/constitution-rules/membership",
                icon: ShieldCheck,
            },
            {
                title: "Office Bearers & Duties",
                description:
                    "Learn about AHPK's elected leaders, their responsibilities and constitutional duties.",
                href: "/members-section/constitution-rules/office-bearers-duties",
                icon: Handshake,
            },
            {
                title: "The Executive Committee",
                description:
                    "Explore the Executive Committee's composition, powers, meetings and governance responsibilities.",
                href: "/members-section/constitution-rules/the-executive-committee",
                icon: FileText,
            },
        ],
    },
    {
        label: "Members Section",
        title: "Members Section",
        description:
            "Membership eligibility, categories, recognition and applications.",
        items: [
            {
                title: "Criteria & Levels",
                description:
                    "Review eligibility requirements and membership levels.",
                href: "/members-section/membership-criterion-levels",
                icon: MapPin,
            },
            {
                title: "Membership Categories",
                description:
                    "Explore the available membership categories.",
                href: "/members-section/membership-categories",
                icon: MousePointer2,
            },
            {
                title: "Apply for Membership",
                description:
                    "Submit a new AHPK membership application.",
                href: "/apply",
                icon: Paperclip,
            },
            {
                title: "Renew Membership",
                description:
                    "Renew your annual professional membership.",
                href: "/member/renewal",
                icon: Award,
            },
        ],
    },
];

const AUTO_SLIDE_DELAY = 7000;

export default function ProfessionalStandardsSlider() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveSlide(
                (current) =>
                    (current + 1) % standardsSlides.length,
            );
        }, AUTO_SLIDE_DELAY);

        return () => {
            window.clearInterval(timer);
        };
    }, [paused]);

    function previousSlide() {
        setActiveSlide(
            (current) =>
                (current - 1 + standardsSlides.length) %
                standardsSlides.length,
        );
    }

    function nextSlide() {
        setActiveSlide(
            (current) =>
                (current + 1) % standardsSlides.length,
        );
    }

    const slide = standardsSlides[activeSlide];

    return (
        <section
            className="relative z-20 -mt-1 overflow-hidden bg-[#C8102E] py-16 text-white sm:py-20"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="AHPK professional standards"
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-black/10 blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/[0.08]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                {/* Section heading */}
                <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div className="max-w-3xl">
                        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/70">
                            {slide.label}
                        </p>

                        <h2
                            key={`title-${activeSlide}`}
                            className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
                        >
                            {slide.title}
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/75 sm:text-base">
                            {slide.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={previousSlide}
                            aria-label="Previous standards slide"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white hover:text-[#C8102E]"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Next standards slide"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white hover:text-[#C8102E]"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Cards */}
                <div
                    key={activeSlide}
                    className="grid animate-[standardsFade_.55s_ease-out] gap-5 md:grid-cols-2 xl:grid-cols-4"
                >
                    {slide.items.map((item, index) => (
                        <StandardFeatureCard
                            key={`${activeSlide}-${item.title}`}
                            item={item}
                            number={String(index + 1).padStart(
                                2,
                                "0",
                            )}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex items-center justify-center gap-3">
                    {standardsSlides.map((item, index) => {
                        const isActive = activeSlide === index;

                        return (
                            <button
                                key={item.title}
                                type="button"
                                onClick={() =>
                                    setActiveSlide(index)
                                }
                                aria-label={`View standards slide ${index + 1
                                    }`}
                                aria-current={
                                    isActive ? "true" : undefined
                                }
                                className={`flex h-11 min-w-11 items-center justify-center rounded-xl border px-4 text-sm font-black transition ${isActive
                                    ? "border-white bg-white text-[#C8102E] shadow-lg"
                                    : "border-white/25 bg-white/10 text-white hover:bg-white/20"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>

                {/* Progress */}
                <div className="mx-auto mt-5 h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/15">
                    <div
                        className="h-full rounded-full bg-white transition-all duration-500"
                        style={{
                            width: `${((activeSlide + 1) /
                                standardsSlides.length) *
                                100
                                }%`,
                        }}
                    />
                </div>
            </div>

            <style jsx global>{`
                @keyframes standardsFade {
                    from {
                        opacity: 0;
                        transform: translateY(16px);
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

function StandardFeatureCard({
    item,
    number,
}: {
    item: StandardsItem;
    number: string;
}) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-slate-950 hover:shadow-2xl"
        >
            <span className="absolute right-5 top-4 text-5xl font-black text-white/10 transition group-hover:text-red-50">
                {number}
            </span>

            <div className="relative flex h-full flex-col">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#C8102E] shadow-sm transition group-hover:bg-[#C8102E] group-hover:text-white">
                    <Icon
                        className="h-7 w-7"
                        aria-hidden="true"
                    />
                </div>

                <h3 className="mt-6 text-xl font-extrabold leading-snug">
                    {item.title}
                </h3>

                <p className="mt-4 flex-1 text-sm font-medium leading-7 text-white/80 transition group-hover:text-slate-600">
                    {item.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold">
                    Learn more

                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:text-[#C8102E]" />
                </span>
            </div>
        </Link>
    );
}
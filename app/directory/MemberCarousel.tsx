"use client";

import Link from "next/link";
import {
    type ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    GraduationCap,
    IdCard,
    MapPin,
    User,
} from "lucide-react";

export interface DirectoryCarouselMember {
    id: string;
    fullName: string;
    memberNumber: string;
    profileImageUrl: string | null;
    position: string;
    employer: string | null;
    county: string | null;
    categoryName: string;
    educationCount: number;
    experienceCount: number;
}

export default function MemberCarousel({
    members,
}: {
    members: DirectoryCarouselMember[];
}) {
    const autoplay = useRef(
        Autoplay({
            delay: 4200,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        }),
    );

    const [emblaRef, emblaApi] =
        useEmblaCarousel(
            {
                loop: members.length > 3,
                align: "start",
                skipSnaps: false,
                dragFree: false,
            },
            [autoplay.current],
        );

    const [selectedIndex, setSelectedIndex] =
        useState(0);

    const [snapCount, setSnapCount] =
        useState(0);

    const scrollPrevious = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            emblaApi?.scrollTo(index);
        },
        [emblaApi],
    );

    const updateCarouselState =
        useCallback(() => {
            if (!emblaApi) {
                return;
            }

            setSelectedIndex(
                emblaApi.selectedScrollSnap(),
            );

            setSnapCount(
                emblaApi.scrollSnapList().length,
            );
        }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        updateCarouselState();

        emblaApi.on(
            "select",
            updateCarouselState,
        );

        emblaApi.on(
            "reInit",
            updateCarouselState,
        );

        return () => {
            emblaApi.off(
                "select",
                updateCarouselState,
            );

            emblaApi.off(
                "reInit",
                updateCarouselState,
            );
        };
    }, [emblaApi, updateCarouselState]);

    if (members.length === 0) {
        return null;
    }

    return (
        <div className="relative">
            <div
                ref={emblaRef}
                className="overflow-hidden"
            >
                <div className="-ml-4 flex touch-pan-y">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 sm:basis-[52%] lg:basis-[34%] xl:basis-[28%]"
                        >
                            <MemberCarouselCard
                                member={member}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {members.length > 1 ? (
                <div className="mt-5 flex items-center justify-between border-t border-slate-300 pt-4">
                    <div className="flex items-center gap-2">
                        {Array.from({
                            length: snapCount,
                        }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Go to member slide ${index + 1}`}
                                onClick={() =>
                                    scrollTo(index)
                                }
                                className={[
                                    "h-1.5 transition-all duration-200",
                                    index ===
                                        selectedIndex
                                        ? "w-8 bg-[#C8102E]"
                                        : "w-3 bg-slate-300 hover:bg-slate-500",
                                ].join(" ")}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={scrollPrevious}
                            aria-label="Previous members"
                            className="group flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        </button>

                        <button
                            type="button"
                            onClick={scrollNext}
                            aria-label="Next members"
                            className="group flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white"
                        >
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function MemberCarouselCard({
    member,
}: {
    member: DirectoryCarouselMember;
}) {
    return (
        <Link
            href={`/directory/${encodeURIComponent(
                member.memberNumber,
            )}`}
            aria-label={`View ${member.fullName}'s professional profile`}
            className="group flex h-full flex-col border-t-4 border-slate-950 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#C8102E]"
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {member.profileImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={member.profileImageUrl}
                        alt={member.fullName}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-slate-100">
                        <User className="h-16 w-16 text-slate-300" />
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 to-transparent" />

                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                </span>

                <div className="absolute inset-x-4 bottom-4 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-red-200">
                        {member.categoryName}
                    </p>

                    <h3 className="mt-1 line-clamp-2 text-xl font-black leading-tight">
                        {member.fullName}
                    </h3>
                </div>
            </div>

            <div className="flex flex-1 flex-col border-x border-b border-slate-300 p-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <IdCard className="h-4 w-4 text-[#C8102E]" />

                    <p className="font-mono text-xs font-black tracking-wide text-[#C8102E]">
                        {member.memberNumber}
                    </p>
                </div>

                <p className="mt-3 line-clamp-1 text-sm font-black text-slate-950">
                    {member.position}
                </p>

                <p className="mt-1 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-slate-500">
                    {member.employer
                        ? `${member.position} at ${member.employer}`
                        : "Verified professional member of the Association of Hotel Professionals Kenya."}
                </p>

                <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                    <MemberFact
                        icon={<MapPin />}
                        label="Location"
                        value={
                            member.county ||
                            "Not listed"
                        }
                    />

                    <MemberFact
                        icon={<GraduationCap />}
                        label="Education"
                        value={`${member.educationCount} record${member.educationCount === 1 ? "" : "s"}`}
                    />

                    <MemberFact
                        icon={<BriefcaseBusiness />}
                        label="Experience"
                        value={`${member.experienceCount} record${member.experienceCount === 1 ? "" : "s"}`}
                    />
                </div>

                <span className="mt-auto flex items-center justify-between pt-4 text-sm font-black text-[#C8102E]">
                    View Professional Profile

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}

function MemberFact({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="grid grid-cols-[26px_82px_minmax(0,1fr)] items-center gap-2 py-2.5">
            <span className="text-[#C8102E] [&>svg]:h-4 [&>svg]:w-4">
                {icon}
            </span>

            <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
                {label}
            </span>

            <span className="truncate text-right text-xs font-bold text-slate-700">
                {value}
            </span>
        </div>
    );
}
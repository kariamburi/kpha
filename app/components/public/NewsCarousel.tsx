"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
    ArrowLeft,
    ArrowRight,
    FileText,
} from "lucide-react";
import { useCallback, useRef } from "react";

export interface NewsCarouselItem {
    id: string;
    slug: string;
    imageUrl: string | null;
    title: string;
    description: string;
    date: string;
}

interface NewsCarouselProps {
    news: NewsCarouselItem[];
    basePath?: string;
    actionLabel?: string;
}
export default function NewsCarousel({
    news,
    basePath = "/news",
    actionLabel = "Read article",
}: NewsCarouselProps) {
    const autoplay = useRef(
        Autoplay({
            delay: 3500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        }),
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            skipSnaps: false,
            dragFree: false,
        },
        [autoplay.current],
    );

    const scrollPrevious = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    if (news.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm font-bold text-slate-500">
                Published news will appear here.
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Carousel viewport */}
            <div
                ref={emblaRef}
                className="overflow-hidden"
            >
                {/* Carousel track */}
                <div className="-ml-3 flex touch-pan-y sm:-ml-4">
                    {news.map((post) => (
                        <div
                            key={post.id}
                            className="
                min-w-0 shrink-0 grow-0
                basis-[84%]
                pl-3
                sm:basis-[48%]
                sm:pl-4
                md:basis-[32%]
                lg:basis-[20%]
              "
                        >
                            <NewsCarouselCard
                                post={post}
                                basePath={basePath}
                                actionLabel={actionLabel}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation buttons */}
            {news.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={scrollPrevious}
                        aria-label="Previous news"
                        className="
              absolute left-2 top-1/2 z-20
              hidden h-10 w-10 -translate-y-1/2
              items-center justify-center rounded-full
              border border-slate-200 bg-white/95
              text-slate-800 shadow-lg backdrop-blur
              transition
              hover:bg-[#C1121F] hover:text-white
              focus:outline-none focus:ring-4 focus:ring-red-100
              md:flex
            "
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={scrollNext}
                        aria-label="Next news"
                        className="
              absolute right-2 top-1/2 z-20
              hidden h-10 w-10 -translate-y-1/2
              items-center justify-center rounded-full
              border border-slate-200 bg-white/95
              text-slate-800 shadow-lg backdrop-blur
              transition
              hover:bg-[#C1121F] hover:text-white
              focus:outline-none focus:ring-4 focus:ring-red-100
              md:flex
            "
                    >
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </>
            )}
        </div>
    );
}

function NewsCarouselCard({
    post,
    basePath,
    actionLabel,
}: {
    post: NewsCarouselItem;
    basePath: string;
    actionLabel: string;
}) {
    return (
        <Link
            href={`${basePath}/${post.slug}`}
            className="group block h-full overflow-hidden border-t-4 border-transparent bg-white transition duration-300 hover:border-[#C1121F]"
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                {post.imageUrl ? (
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        loading="lazy"
                        className="
              h-full w-full object-cover
              transition duration-500
              group-hover:scale-105
            "
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-red-50 text-[#C1121F]">
                        <FileText className="h-10 w-10" />
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="border-x border-b border-slate-200 p-3.5">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#C1121F]">
                    {post.date}
                </p>

                <h3 className="mt-2 line-clamp-3 text-[15px] font-extrabold leading-5 text-slate-950 transition group-hover:text-[#C1121F]">
                    {post.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-slate-600">
                    {post.description}
                </p>

                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C1121F]">
                    {actionLabel}

                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}
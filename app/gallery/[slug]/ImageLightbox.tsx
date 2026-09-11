"use client";

import {
    ChevronLeft,
    ChevronRight,
    X,
    ZoomIn,
} from "lucide-react";
import {
    useCallback,
    useEffect,
    useState,
} from "react";

type LightboxImage = {
    src: string;
    alt: string;
    title?: string | null;
    caption?: string | null;
};

type ImageLightboxProps = {
    images: LightboxImage[];
    initialIndex: number;
    thumbnailClassName?: string;
};

export default function ImageLightbox({
    images,
    initialIndex,
    thumbnailClassName = "",
}: ImageLightboxProps) {
    const [open, setOpen] = useState(false);

    const [currentIndex, setCurrentIndex] =
        useState(initialIndex);

    const currentImage =
        images[currentIndex];

    const thumbnailImage =
        images[initialIndex];

    const close = useCallback(() => {
        setOpen(false);
    }, []);

    const previous = useCallback(() => {
        if (images.length <= 1) {
            return;
        }

        setCurrentIndex((current) =>
            current === 0
                ? images.length - 1
                : current - 1
        );
    }, [images.length]);

    const next = useCallback(() => {
        if (images.length <= 1) {
            return;
        }

        setCurrentIndex((current) =>
            current === images.length - 1
                ? 0
                : current + 1
        );
    }, [images.length]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (
            event: KeyboardEvent
        ) => {
            if (event.key === "Escape") {
                close();
            }

            if (event.key === "ArrowLeft") {
                previous();
            }

            if (event.key === "ArrowRight") {
                next();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        const originalOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

            document.body.style.overflow =
                originalOverflow;
        };
    }, [
        open,
        close,
        previous,
        next,
    ]);

    if (
        !currentImage ||
        !thumbnailImage
    ) {
        return null;
    }

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setCurrentIndex(
                        initialIndex
                    );

                    setOpen(true);
                }}
                className={`group/image relative block w-full cursor-zoom-in overflow-hidden bg-slate-950 ${thumbnailClassName}`}
                aria-label={`View ${thumbnailImage.alt} fullscreen`}
            >
                <img
                    src={
                        thumbnailImage.src
                    }
                    alt={
                        thumbnailImage.alt
                    }
                    loading="lazy"
                    className="w-full object-cover transition duration-500 group-hover/image:scale-[1.03]"
                />

                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover/image:bg-black/15">
                    <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-black/70 text-white opacity-0 shadow-lg backdrop-blur-sm transition group-hover/image:scale-100 group-hover/image:opacity-100">
                        <ZoomIn className="h-5 w-5" />
                    </span>
                </span>
            </button>

            {open ? (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview"
                >
                    <button
                        type="button"
                        onClick={close}
                        className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
                        aria-label="Close image"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="absolute left-4 top-4 z-20 rounded-full bg-black/60 px-4 py-2 text-xs font-bold text-white sm:left-6 sm:top-6">
                        {currentIndex + 1} /{" "}
                        {images.length}
                    </div>

                    {images.length > 1 ? (
                        <>
                            <button
                                type="button"
                                onClick={
                                    previous
                                }
                                className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6 sm:h-14 sm:w-14"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="h-7 w-7" />
                            </button>

                            <button
                                type="button"
                                onClick={next}
                                className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:h-14 sm:w-14"
                                aria-label="Next image"
                            >
                                <ChevronRight className="h-7 w-7" />
                            </button>
                        </>
                    ) : null}

                    <div
                        className="flex h-full w-full items-center justify-center p-4 pt-20 sm:p-10 sm:pt-20"
                        onClick={close}
                    >
                        <div
                            className="flex max-h-full max-w-[95vw] flex-col items-center"
                            onClick={(
                                event
                            ) =>
                                event.stopPropagation()
                            }
                        >
                            <img
                                src={
                                    currentImage.src
                                }
                                alt={
                                    currentImage.alt
                                }
                                className="max-h-[82vh] max-w-[94vw] object-contain shadow-2xl"
                            />

                            {currentImage.title ||
                                currentImage.caption ? (
                                <div className="mt-4 max-w-3xl text-center text-white">
                                    {currentImage.title ? (
                                        <h3 className="text-base font-black sm:text-lg">
                                            {
                                                currentImage.title
                                            }
                                        </h3>
                                    ) : null}

                                    {currentImage.caption ? (
                                        <p className="mt-1 text-sm leading-6 text-white/70">
                                            {
                                                currentImage.caption
                                            }
                                        </p>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
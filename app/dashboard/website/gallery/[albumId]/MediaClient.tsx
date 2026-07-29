"use client";

import Link from "next/link";
import {
    useMemo,
    useRef,
    useState,
} from "react";
import { useFormStatus } from "react-dom";
import Modal from "../../../components/Modal";

type GalleryCategory =
    | "EVENTS"
    | "AGM"
    | "CONFERENCE"
    | "TRAINING"
    | "AWARDS"
    | "COMMUNITY"
    | "OTHER";

type GalleryMediaType =
    | "IMAGE"
    | "YOUTUBE";

type GalleryItem = {
    id: string;
    albumId: string;
    type: GalleryMediaType;
    imageUrl: string | null;
    youtubeUrl: string | null;
    youtubeId: string | null;
    thumbnailUrl: string | null;
    title: string | null;
    caption: string | null;
    order: number;
    createdAt: Date | string;
    updatedAt: Date | string;
};

type GalleryAlbum = {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    coverImageUrl: string | null;
    category: GalleryCategory;
    eventDate: Date | string | null;
    featured: boolean;
    published: boolean;
    order: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    items: GalleryItem[];
};

type ServerAction = (
    formData: FormData
) => void | Promise<void>;

type MediaClientProps = {
    album: GalleryAlbum;
    uploadGalleryImages: ServerAction;
    addYouTubeVideo: ServerAction;
    updateGalleryItem: ServerAction;
    deleteGalleryItem: ServerAction;
    setAlbumCover: ServerAction;
    moveGalleryItem: ServerAction;
};

export default function MediaClient({
    album,
    uploadGalleryImages,
    addYouTubeVideo,
    updateGalleryItem,
    deleteGalleryItem,
    setAlbumCover,
    moveGalleryItem,
}: MediaClientProps) {
    const [uploadOpen, setUploadOpen] =
        useState(false);

    const [youtubeOpen, setYoutubeOpen] =
        useState(false);

    const [editItem, setEditItem] =
        useState<GalleryItem | null>(null);

    const [previewItem, setPreviewItem] =
        useState<GalleryItem | null>(null);

    const [selectedFiles, setSelectedFiles] =
        useState<File[]>([]);

    const [query, setQuery] = useState("");

    const fileInputRef =
        useRef<HTMLInputElement | null>(null);

    const images = album.items.filter(
        (item) => item.type === "IMAGE"
    );

    const videos = album.items.filter(
        (item) => item.type === "YOUTUBE"
    );

    const filteredItems = useMemo(() => {
        const normalizedQuery = query
            .trim()
            .toLowerCase();

        if (!normalizedQuery) {
            return album.items;
        }

        return album.items.filter((item) => {
            return (
                item.title
                    ?.toLowerCase()
                    .includes(normalizedQuery) ||
                item.caption
                    ?.toLowerCase()
                    .includes(normalizedQuery) ||
                item.type
                    .toLowerCase()
                    .includes(normalizedQuery)
            );
        });
    }, [album.items, query]);

    function handleFiles(
        files: FileList | null
    ) {
        if (!files) {
            setSelectedFiles([]);
            return;
        }

        setSelectedFiles(
            Array.from(files)
        );
    }

    return (
        <div className="space-y-5">
            <header className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <Link
                    href="/dashboard/website/gallery"
                    className="text-sm font-black text-[#C1121F] transition hover:text-red-800"
                >
                    ← Back to Gallery Albums
                </Link>

                <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <CategoryBadge
                                category={
                                    album.category
                                }
                            />

                            <StatusBadge
                                published={
                                    album.published
                                }
                            />

                            {album.featured && (
                                <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase text-amber-800">
                                    Featured
                                </span>
                            )}
                        </div>

                        <h1 className="mt-3 text-3xl font-black text-slate-950">
                            {album.title}
                        </h1>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Upload photos, add YouTube
                            videos and manage the order
                            of media displayed in this
                            album.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                setUploadOpen(true)
                            }
                            className="cursor-pointer rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white transition hover:bg-red-800"
                        >
                            + Upload Photos
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setYoutubeOpen(true)
                            }
                            className="cursor-pointer rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                        >
                            + Add YouTube Video
                        </button>

                        <Link
                            href={`/gallery/${album.slug}`}
                            target="_blank"
                            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                        >
                            View Public
                        </Link>
                    </div>
                </div>
            </header>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Media"
                    value={album.items.length}
                    tone="blue"
                />

                <StatCard
                    title="Photos"
                    value={images.length}
                    tone="green"
                />

                <StatCard
                    title="YouTube Videos"
                    value={videos.length}
                    tone="red"
                />

                <StatCard
                    title="Album Date"
                    value={
                        album.eventDate
                            ? formatDate(
                                album.eventDate
                            )
                            : "Not set"
                    }
                    tone="amber"
                />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Album Media
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            {filteredItems.length} media
                            item
                            {filteredItems.length === 1
                                ? ""
                                : "s"}{" "}
                            found
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <input
                            value={query}
                            onChange={(event) =>
                                setQuery(
                                    event.target.value
                                )
                            }
                            placeholder="Search media..."
                            className="h-11 min-w-[250px] rounded-xl border border-slate-300 px-4 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                        />

                        {query && (
                            <button
                                type="button"
                                onClick={() =>
                                    setQuery("")
                                }
                                className="cursor-pointer rounded-xl border border-slate-300 px-4 text-sm font-black text-slate-700 hover:bg-slate-50"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {filteredItems.length === 0 ? (
                    <EmptyMedia
                        hasSearch={Boolean(query)}
                        onUpload={() =>
                            setUploadOpen(true)
                        }
                    />
                ) : (
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {filteredItems.map(
                            (item, index) => (
                                <MediaCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    totalItems={
                                        filteredItems.length
                                    }
                                    albumCover={
                                        album.coverImageUrl
                                    }
                                    onPreview={() =>
                                        setPreviewItem(item)
                                    }
                                    onEdit={() =>
                                        setEditItem(item)
                                    }
                                    setAlbumCover={
                                        setAlbumCover
                                    }
                                    deleteGalleryItem={
                                        deleteGalleryItem
                                    }
                                    moveGalleryItem={
                                        moveGalleryItem
                                    }
                                />
                            )
                        )}
                    </div>
                )}
            </section>

            <Modal
                open={uploadOpen}
                onClose={() => {
                    setUploadOpen(false);
                    setSelectedFiles([]);

                    if (
                        fileInputRef.current
                    ) {
                        fileInputRef.current.value =
                            "";
                    }
                }}
                title="Upload Gallery Photos"
                subtitle="Select one or more photos to add to this gallery album."
            >
                <form
                    action={async (formData) => {
                        try {
                            await uploadGalleryImages(
                                formData
                            );

                            setUploadOpen(false);
                            setSelectedFiles([]);
                        } catch (error) {
                            console.error(error);

                            alert(
                                error instanceof Error
                                    ? error.message
                                    : "Failed to upload gallery images."
                            );
                        }
                    }}
                    className="space-y-5"
                >
                    <input
                        type="hidden"
                        name="albumId"
                        value={album.id}
                    />

                    <div
                        onDragOver={(event) => {
                            event.preventDefault();
                        }}
                        onDrop={(event) => {
                            event.preventDefault();

                            handleFiles(
                                event.dataTransfer.files
                            );

                            if (
                                fileInputRef.current
                            ) {
                                fileInputRef.current.files =
                                    event.dataTransfer.files;
                            }
                        }}
                        className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-[#C1121F]"
                    >
                        <div className="text-5xl">
                            🖼️
                        </div>

                        <h3 className="mt-4 text-lg font-black text-slate-950">
                            Drop your photos here
                        </h3>

                        <p className="mt-2 text-sm font-semibold text-slate-500">
                            Or select multiple images
                            from your device.
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            name="images"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            multiple
                            required
                            onChange={(event) =>
                                handleFiles(
                                    event.target.files
                                )
                            }
                            className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#C1121F] file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
                        />
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-black text-slate-800">
                                    Selected Photos
                                </p>

                                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-[#C1121F]">
                                    {
                                        selectedFiles.length
                                    }{" "}
                                    selected
                                </span>
                            </div>

                            <div className="mt-3 max-h-56 space-y-2 overflow-y-auto">
                                {selectedFiles.map(
                                    (file, index) => (
                                        <div
                                            key={`${file.name}-${index}`}
                                            className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-bold text-slate-700">
                                                    {
                                                        file.name
                                                    }
                                                </p>

                                                <p className="text-xs font-semibold text-slate-400">
                                                    {formatFileSize(
                                                        file.size
                                                    )}
                                                </p>
                                            </div>

                                            <span className="text-green-600">
                                                ✓
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    <p className="text-xs font-semibold leading-5 text-slate-500">
                        Accepted formats: JPG, PNG and
                        WEBP. Maximum file size is 5MB
                        per image.
                    </p>

                    <UploadButton
                        count={selectedFiles.length}
                    />
                </form>
            </Modal>

            <Modal
                open={youtubeOpen}
                onClose={() =>
                    setYoutubeOpen(false)
                }
                title="Add YouTube Video"
                subtitle="Paste a standard YouTube, Shorts or youtu.be link."
            >
                <form
                    action={async (formData) => {
                        try {
                            await addYouTubeVideo(
                                formData
                            );

                            setYoutubeOpen(false);
                        } catch (error) {
                            console.error(error);

                            alert(
                                error instanceof Error
                                    ? error.message
                                    : "Failed to add YouTube video."
                            );
                        }
                    }}
                    className="space-y-4"
                >
                    <input
                        type="hidden"
                        name="albumId"
                        value={album.id}
                    />

                    <FormField label="YouTube URL">
                        <Input
                            name="youtubeUrl"
                            type="url"
                            required
                            placeholder="https://www.youtube.com/watch?v=..."
                        />
                    </FormField>

                    <FormField label="Video Title">
                        <Input
                            name="title"
                            placeholder="Example: AGM Opening Ceremony"
                        />
                    </FormField>

                    <FormField label="Caption">
                        <textarea
                            name="caption"
                            rows={4}
                            placeholder="Optional description of the video..."
                            className={FIELD_CLASS}
                        />
                    </FormField>

                    <YouTubeButton />
                </form>
            </Modal>

            <Modal
                open={Boolean(editItem)}
                onClose={() =>
                    setEditItem(null)
                }
                title="Edit Gallery Media"
                subtitle="Update the title or caption displayed on the public gallery."
            >
                {editItem && (
                    <form
                        action={async (
                            formData
                        ) => {
                            try {
                                await updateGalleryItem(
                                    formData
                                );

                                setEditItem(null);
                            } catch (error) {
                                console.error(error);

                                alert(
                                    error instanceof
                                        Error
                                        ? error.message
                                        : "Failed to update gallery item."
                                );
                            }
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="hidden"
                            name="id"
                            value={editItem.id}
                        />

                        <FormField label="Title">
                            <Input
                                name="title"
                                defaultValue={
                                    editItem.title ||
                                    ""
                                }
                                placeholder="Media title"
                            />
                        </FormField>

                        <FormField label="Caption">
                            <textarea
                                name="caption"
                                rows={5}
                                defaultValue={
                                    editItem.caption ||
                                    ""
                                }
                                placeholder="Write a caption..."
                                className={
                                    FIELD_CLASS
                                }
                            />
                        </FormField>

                        <UpdateButton />
                    </form>
                )}
            </Modal>

            <Modal
                open={Boolean(previewItem)}
                onClose={() =>
                    setPreviewItem(null)
                }
                title={
                    previewItem?.title ||
                    "Gallery Preview"
                }
                subtitle={
                    previewItem?.caption ||
                    undefined
                }
            >
                {previewItem && (
                    <div className="overflow-hidden rounded-2xl bg-slate-950">
                        {previewItem.type ===
                            "IMAGE" ? (
                            <img
                                src={
                                    previewItem.imageUrl ||
                                    ""
                                }
                                alt={
                                    previewItem.title ||
                                    album.title
                                }
                                className="max-h-[70vh] w-full object-contain"
                            />
                        ) : (
                            <div className="aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${previewItem.youtubeId}`}
                                    title={
                                        previewItem.title ||
                                        "YouTube video"
                                    }
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="h-full w-full"
                                />
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}

function MediaCard({
    item,
    index,
    totalItems,
    albumCover,
    onPreview,
    onEdit,
    setAlbumCover,
    deleteGalleryItem,
    moveGalleryItem,
}: {
    item: GalleryItem;
    index: number;
    totalItems: number;
    albumCover: string | null;
    onPreview: () => void;
    onEdit: () => void;
    setAlbumCover: ServerAction;
    deleteGalleryItem: ServerAction;
    moveGalleryItem: ServerAction;
}) {
    const displayImage =
        item.type === "IMAGE"
            ? item.imageUrl
            : item.thumbnailUrl;

    const isCover =
        item.type === "IMAGE" &&
        item.imageUrl === albumCover;

    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <button
                type="button"
                onClick={onPreview}
                className="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-slate-100 text-left"
            >
                {displayImage ? (
                    <img
                        src={displayImage}
                        alt={
                            item.title ||
                            "Gallery media"
                        }
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm font-black text-slate-400">
                        No preview
                    </div>
                )}

                <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-full bg-slate-950/85 px-3 py-1 text-[10px] font-black uppercase text-white backdrop-blur">
                        {item.type === "IMAGE"
                            ? "Photo"
                            : "YouTube"}
                    </span>

                    {isCover && (
                        <span className="rounded-full bg-[#C1121F] px-3 py-1 text-[10px] font-black uppercase text-white">
                            Album Cover
                        </span>
                    )}
                </div>

                {item.type === "YOUTUBE" && (
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#C1121F] text-xl text-white shadow-xl">
                        ▶
                    </span>
                )}
            </button>

            <div className="p-4">
                <h3 className="line-clamp-1 text-sm font-black text-slate-950">
                    {item.title ||
                        (item.type === "IMAGE"
                            ? "Gallery Photo"
                            : "Gallery Video")}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-slate-500">
                    {item.caption ||
                        "No caption added."}
                </p>

                <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                    <span className="text-[10px] font-black uppercase text-slate-500">
                        Position
                    </span>

                    <span className="text-xs font-black text-slate-950">
                        {item.order + 1}
                    </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                    <form action={moveGalleryItem}>
                        <input
                            type="hidden"
                            name="id"
                            value={item.id}
                        />

                        <input
                            type="hidden"
                            name="direction"
                            value="LEFT"
                        />

                        <button
                            type="submit"
                            disabled={index === 0}
                            className="w-full cursor-pointer rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            ← Move Left
                        </button>
                    </form>

                    <form action={moveGalleryItem}>
                        <input
                            type="hidden"
                            name="id"
                            value={item.id}
                        />

                        <input
                            type="hidden"
                            name="direction"
                            value="RIGHT"
                        />

                        <button
                            type="submit"
                            disabled={
                                index ===
                                totalItems - 1
                            }
                            className="w-full cursor-pointer rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Move Right →
                        </button>
                    </form>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={onEdit}
                        className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                    >
                        Edit Details
                    </button>

                    <button
                        type="button"
                        onClick={onPreview}
                        className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                    >
                        Preview
                    </button>
                </div>

                {item.type === "IMAGE" &&
                    !isCover && (
                        <form
                            action={setAlbumCover}
                            className="mt-2"
                        >
                            <input
                                type="hidden"
                                name="itemId"
                                value={item.id}
                            />

                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-lg bg-amber-50 px-3 py-2 text-xs font-black text-amber-800 transition hover:bg-amber-100"
                            >
                                Set as Album Cover
                            </button>
                        </form>
                    )}

                <form
                    action={deleteGalleryItem}
                    onSubmit={(event) => {
                        const confirmed =
                            window.confirm(
                                "Delete this gallery item? This action cannot be undone."
                            );

                        if (!confirmed) {
                            event.preventDefault();
                        }
                    }}
                    className="mt-2"
                >
                    <input
                        type="hidden"
                        name="id"
                        value={item.id}
                    />

                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-xs font-black text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white"
                    >
                        Delete Media
                    </button>
                </form>
            </div>
        </article>
    );
}

const FIELD_CLASS =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100";

function Input(
    props: React.InputHTMLAttributes<HTMLInputElement>
) {
    return (
        <input
            {...props}
            className={FIELD_CLASS}
        />
    );
}

function FormField({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-black text-slate-700">
                {label}
            </label>

            {children}
        </div>
    );
}

function UploadButton({
    count,
}: {
    count: number;
}) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={
                pending || count === 0
            }
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending && <Spinner />}

            {pending
                ? "Uploading Photos..."
                : `Upload ${count || ""} Photo${count === 1 ? "" : "s"
                }`}
        </button>
    );
}

function YouTubeButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending && <Spinner />}

            {pending
                ? "Adding Video..."
                : "Add YouTube Video"}
        </button>
    );
}

function UpdateButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending && <Spinner />}

            {pending
                ? "Updating..."
                : "Update Media"}
        </button>
    );
}

function Spinner() {
    return (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
    );
}

function StatCard({
    title,
    value,
    tone,
}: {
    title: string;
    value: number | string;
    tone:
    | "blue"
    | "green"
    | "red"
    | "amber";
}) {
    const styles = {
        blue: {
            backgroundColor: "#EEF6FF",
            borderColor: "#C7E0FF",
            color: "#2563EB",
        },
        green: {
            backgroundColor: "#F0FDF4",
            borderColor: "#BBF7D0",
            color: "#15803D",
        },
        red: {
            backgroundColor: "#FEF2F2",
            borderColor: "#FECACA",
            color: "#B91C1C",
        },
        amber: {
            backgroundColor: "#FFF8E6",
            borderColor: "#FCD34D",
            color: "#B45309",
        },
    };

    return (
        <div
            style={styles[tone]}
            className="rounded-2xl border p-5 shadow-sm"
        >
            <p className="text-sm font-semibold opacity-80">
                {title}
            </p>

            <h2 className="mt-2 text-2xl font-black">
                {value}
            </h2>
        </div>
    );
}

function CategoryBadge({
    category,
}: {
    category: GalleryCategory;
}) {
    const labels: Record<
        GalleryCategory,
        string
    > = {
        EVENTS: "Events",
        AGM: "AGM",
        CONFERENCE: "Conference",
        TRAINING: "Training",
        AWARDS: "Awards",
        COMMUNITY: "Community",
        OTHER: "Other",
    };

    return (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase text-slate-700">
            {labels[category]}
        </span>
    );
}

function StatusBadge({
    published,
}: {
    published: boolean;
}) {
    return published ? (
        <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-black uppercase text-green-700">
            Published
        </span>
    ) : (
        <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase text-amber-700">
            Draft
        </span>
    );
}

function EmptyMedia({
    hasSearch,
    onUpload,
}: {
    hasSearch: boolean;
    onUpload: () => void;
}) {
    return (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <div className="text-5xl">
                🖼️
            </div>

            <h3 className="mt-4 text-xl font-black text-slate-950">
                {hasSearch
                    ? "No matching media found"
                    : "This album has no media"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500">
                {hasSearch
                    ? "Try changing your search phrase."
                    : "Upload gallery photos or add a YouTube video to begin building this album."}
            </p>

            {!hasSearch && (
                <button
                    type="button"
                    onClick={onUpload}
                    className="mt-5 cursor-pointer rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white transition hover:bg-red-800"
                >
                    + Upload First Photos
                </button>
            )}
        </div>
    );
}

function formatDate(
    value: Date | string
) {
    return new Date(
        value
    ).toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function formatFileSize(bytes: number) {
    if (bytes === 0) {
        return "0 bytes";
    }

    const units = [
        "bytes",
        "KB",
        "MB",
        "GB",
    ];

    const index = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    const value =
        bytes / Math.pow(1024, index);

    return `${value.toFixed(
        index === 0 ? 0 : 1
    )} ${units[index]}`;
}
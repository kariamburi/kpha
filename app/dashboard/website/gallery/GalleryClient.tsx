"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import Modal from "../../components/Modal";

type GalleryCategory =
    | "EVENTS"
    | "AGM"
    | "CONFERENCE"
    | "TRAINING"
    | "AWARDS"
    | "COMMUNITY"
    | "OTHER";

type GalleryItemSummary = {
    id: string;
    type: "IMAGE" | "YOUTUBE";
};

type GalleryAlbumItem = {
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
    items: GalleryItemSummary[];
};

type GalleryClientProps = {
    albums: GalleryAlbumItem[];
    saveGalleryAlbum: (
        formData: FormData
    ) => void | Promise<void>;
    deleteGalleryAlbum: (
        formData: FormData
    ) => void | Promise<void>;
};

export default function GalleryClient({
    albums,
    saveGalleryAlbum,
    deleteGalleryAlbum,
}: GalleryClientProps) {
    const [open, setOpen] = useState(false);

    const [selectedAlbum, setSelectedAlbum] =
        useState<GalleryAlbumItem | null>(null);

    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");

    function openAddModal() {
        setSelectedAlbum(null);
        setOpen(true);
    }

    function openEditModal(album: GalleryAlbumItem) {
        setSelectedAlbum(album);
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
        setSelectedAlbum(null);
    }

    const filteredAlbums = useMemo(() => {
        const normalizedQuery = query
            .trim()
            .toLowerCase();

        return albums.filter((album) => {
            const matchesQuery =
                !normalizedQuery ||
                album.title
                    .toLowerCase()
                    .includes(normalizedQuery) ||
                album.slug
                    .toLowerCase()
                    .includes(normalizedQuery) ||
                album.description
                    ?.toLowerCase()
                    .includes(normalizedQuery);

            const matchesStatus =
                !status ||
                (status === "PUBLISHED" &&
                    album.published) ||
                (status === "DRAFT" &&
                    !album.published) ||
                (status === "FEATURED" &&
                    album.featured);

            const matchesCategory =
                !category ||
                album.category === category;

            return (
                matchesQuery &&
                matchesStatus &&
                matchesCategory
            );
        });
    }, [albums, query, status, category]);

    const totalImages = albums.reduce(
        (total, album) =>
            total +
            album.items.filter(
                (item) => item.type === "IMAGE"
            ).length,
        0
    );

    const totalVideos = albums.reduce(
        (total, album) =>
            total +
            album.items.filter(
                (item) => item.type === "YOUTUBE"
            ).length,
        0
    );

    return (
        <div className="space-y-5">
            <header className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <Link
                    href="/dashboard/website"
                    className="text-sm font-black text-[#C1121F] transition hover:text-red-800"
                >
                    ← Back to Website CMS
                </Link>

                <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <p className="text-sm font-black text-slate-500">
                            AHPK Website CMS
                        </p>

                        <h1 className="mt-1 text-3xl font-black text-slate-950">
                            Gallery Albums
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-500">
                            Create photo albums and organize
                            images and YouTube videos from AHPK
                            events, training sessions, awards and
                            conferences.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openAddModal}
                        className="cursor-pointer rounded-2xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-red-800"
                    >
                        + Add Gallery Album
                    </button>
                </div>
            </header>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Albums"
                    value={albums.length}
                    tone="blue"
                />

                <StatCard
                    title="Published"
                    value={
                        albums.filter(
                            (album) => album.published
                        ).length
                    }
                    tone="green"
                />

                <StatCard
                    title="Photos"
                    value={totalImages}
                    tone="amber"
                />

                <StatCard
                    title="YouTube Videos"
                    value={totalVideos}
                    tone="red"
                />
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 border-b border-slate-300 bg-slate-100 px-4 py-2 text-sm font-black text-slate-800">
                    Search Gallery
                </div>

                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px_190px_auto]">
                    <input
                        value={query}
                        onChange={(event) =>
                            setQuery(event.target.value)
                        }
                        placeholder="Search album title, description or slug..."
                        className="h-11 rounded-md border border-slate-300 px-3 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    />

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                        className="h-11 rounded-md border border-slate-300 px-3 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">
                            All Categories
                        </option>

                        {CATEGORY_OPTIONS.map((item) => (
                            <option
                                key={item.value}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(event.target.value)
                        }
                        className="h-11 rounded-md border border-slate-300 px-3 text-sm font-semibold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100"
                    >
                        <option value="">All Status</option>
                        <option value="PUBLISHED">
                            Published
                        </option>
                        <option value="DRAFT">Draft</option>
                        <option value="FEATURED">
                            Featured
                        </option>
                    </select>

                    <button
                        type="button"
                        onClick={() => {
                            setQuery("");
                            setCategory("");
                            setStatus("");
                        }}
                        className="h-11 cursor-pointer rounded-md border border-slate-300 px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                    >
                        Reset
                    </button>
                </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-950">
                            Gallery Albums
                        </h2>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                            {filteredAlbums.length} album
                            {filteredAlbums.length === 1
                                ? ""
                                : "s"}{" "}
                            found
                        </p>
                    </div>
                </div>

                {filteredAlbums.length === 0 ? (
                    <EmptyGallery
                        onAddAlbum={openAddModal}
                    />
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredAlbums.map((album) => {
                            const imageCount =
                                album.items.filter(
                                    (item) =>
                                        item.type === "IMAGE"
                                ).length;

                            const videoCount =
                                album.items.filter(
                                    (item) =>
                                        item.type === "YOUTUBE"
                                ).length;

                            return (
                                <article
                                    key={album.id}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                        {album.coverImageUrl ? (
                                            <img
                                                src={
                                                    album.coverImageUrl
                                                }
                                                alt={album.title}
                                                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <div className="text-center">
                                                    <span className="text-4xl">
                                                        🖼️
                                                    </span>

                                                    <p className="mt-2 text-xs font-black uppercase tracking-wider text-slate-400">
                                                        No Cover Image
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                                            <CategoryBadge
                                                category={
                                                    album.category
                                                }
                                            />

                                            {album.featured && (
                                                <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black uppercase text-slate-950 shadow-sm">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="line-clamp-2 text-lg font-black text-slate-950">
                                                    {album.title}
                                                </h3>

                                                <p className="mt-1 truncate text-xs font-semibold text-slate-500">
                                                    /gallery/
                                                    {album.slug}
                                                </p>
                                            </div>

                                            <StatusBadge
                                                published={
                                                    album.published
                                                }
                                            />
                                        </div>

                                        {album.description && (
                                            <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-600">
                                                {
                                                    album.description
                                                }
                                            </p>
                                        )}

                                        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3">
                                            <MediaMetric
                                                label="Photos"
                                                value={imageCount}
                                            />

                                            <MediaMetric
                                                label="Videos"
                                                value={videoCount}
                                            />

                                            <MediaMetric
                                                label="Total"
                                                value={
                                                    album.items.length
                                                }
                                            />
                                        </div>

                                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                            <p className="text-xs font-bold text-slate-500">
                                                {album.eventDate
                                                    ? formatDate(
                                                        album.eventDate
                                                    )
                                                    : "No event date"}
                                            </p>

                                            <p className="text-xs font-bold text-slate-400">
                                                Order {album.order}
                                            </p>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                            <Link
                                                href={`/dashboard/website/gallery/${album.id}`}
                                                className="flex items-center justify-center rounded-xl bg-[#C1121F] px-3 py-2.5 text-xs font-black text-white transition hover:bg-red-800"
                                            >
                                                Manage Media
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openEditModal(
                                                        album
                                                    )
                                                }
                                                className="cursor-pointer rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-black text-slate-800 transition hover:bg-slate-200"
                                            >
                                                Edit Album
                                            </button>

                                            <Link
                                                href={`/gallery/${album.slug}`}
                                                target="_blank"
                                                className="flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                                            >
                                                View Public
                                            </Link>

                                            <DeleteAlbumForm
                                                album={album}
                                                deleteGalleryAlbum={
                                                    deleteGalleryAlbum
                                                }
                                            />
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            <Modal
                open={open}
                onClose={closeModal}
                title={
                    selectedAlbum
                        ? "Edit Gallery Album"
                        : "Add Gallery Album"
                }
                subtitle={
                    selectedAlbum
                        ? "Update this gallery album's details and publishing settings."
                        : "Create an album before adding photos and YouTube videos."
                }
            >
                <form
                    action={async (formData) => {
                        try {
                            await saveGalleryAlbum(formData);
                            closeModal();
                        } catch (error) {
                            console.error(error);

                            alert(
                                error instanceof Error
                                    ? error.message
                                    : "Failed to save gallery album."
                            );
                        }
                    }}
                    className="space-y-4"
                >
                    {selectedAlbum && (
                        <input
                            type="hidden"
                            name="id"
                            value={selectedAlbum.id}
                        />
                    )}

                    <FormField label="Album Title">
                        <Input
                            name="title"
                            required
                            placeholder="Example: AHPK Annual General Meeting 2026"
                            defaultValue={
                                selectedAlbum?.title || ""
                            }
                        />
                    </FormField>

                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField label="Category">
                            <select
                                name="category"
                                defaultValue={
                                    selectedAlbum?.category ||
                                    "EVENTS"
                                }
                                className={FIELD_CLASS}
                            >
                                {CATEGORY_OPTIONS.map(
                                    (item) => (
                                        <option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                )}
                            </select>
                        </FormField>

                        <FormField label="Event Date">
                            <Input
                                name="eventDate"
                                type="date"
                                defaultValue={toDateInputValue(
                                    selectedAlbum?.eventDate ||
                                    null
                                )}
                            />
                        </FormField>
                    </div>

                    <FormField label="Display Order">
                        <Input
                            name="order"
                            type="number"
                            min={0}
                            defaultValue={
                                selectedAlbum?.order ?? 0
                            }
                            placeholder="0"
                        />

                        <p className="mt-2 text-xs font-semibold text-slate-500">
                            Albums with smaller numbers appear
                            first.
                        </p>
                    </FormField>

                    <FormField label="Album Description">
                        <textarea
                            name="description"
                            rows={5}
                            placeholder="Describe this gallery album..."
                            defaultValue={
                                selectedAlbum?.description || ""
                            }
                            className={FIELD_CLASS}
                        />
                    </FormField>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <label className="block text-sm font-black text-slate-700">
                            Album Cover Image
                        </label>

                        {selectedAlbum?.coverImageUrl ? (
                            <div className="mt-3 flex items-center gap-3">
                                <img
                                    src={
                                        selectedAlbum.coverImageUrl
                                    }
                                    alt={selectedAlbum.title}
                                    className="h-20 w-28 rounded-xl border border-slate-200 object-cover"
                                />

                                <div>
                                    <p className="text-sm font-bold text-slate-700">
                                        Current cover image
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-slate-500">
                                        Upload another image to
                                        replace it.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-5 text-center text-sm font-semibold text-slate-500">
                                No album cover selected.
                            </div>
                        )}

                        <input
                            type="hidden"
                            name="existingCoverImageUrl"
                            value={
                                selectedAlbum?.coverImageUrl ||
                                ""
                            }
                        />

                        <input
                            type="file"
                            name="coverImage"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-[#C1121F] file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
                        />

                        <p className="mt-2 text-xs font-semibold text-slate-500">
                            JPG, PNG or WEBP. Maximum size 5MB.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <input
                                name="featured"
                                type="checkbox"
                                defaultChecked={
                                    selectedAlbum?.featured ||
                                    false
                                }
                                className="mt-1"
                            />

                            <span>
                                <span className="block text-sm font-black text-slate-800">
                                    Featured Album
                                </span>

                                <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">
                                    Highlight this album on the
                                    homepage.
                                </span>
                            </span>
                        </label>

                        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <input
                                name="published"
                                type="checkbox"
                                defaultChecked={
                                    selectedAlbum
                                        ? selectedAlbum.published
                                        : true
                                }
                                className="mt-1"
                            />

                            <span>
                                <span className="block text-sm font-black text-slate-800">
                                    Published
                                </span>

                                <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">
                                    Make this album visible on the
                                    public website.
                                </span>
                            </span>
                        </label>
                    </div>

                    <SaveAlbumButton
                        isEdit={Boolean(selectedAlbum)}
                    />
                </form>
            </Modal>
        </div>
    );
}

const CATEGORY_OPTIONS: Array<{
    value: GalleryCategory;
    label: string;
}> = [
        {
            value: "EVENTS",
            label: "Events",
        },
        {
            value: "AGM",
            label: "Annual General Meeting",
        },
        {
            value: "CONFERENCE",
            label: "Conference",
        },
        {
            value: "TRAINING",
            label: "Training",
        },
        {
            value: "AWARDS",
            label: "Awards",
        },
        {
            value: "COMMUNITY",
            label: "Community",
        },
        {
            value: "OTHER",
            label: "Other",
        },
    ];

const FIELD_CLASS =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none transition focus:border-[#C1121F] focus:ring-2 focus:ring-red-100";

function SaveAlbumButton({
    isEdit,
}: {
    isEdit: boolean;
}) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#C1121F] px-5 py-4 text-sm font-black text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
            {pending && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}

            {pending
                ? isEdit
                    ? "Updating Album..."
                    : "Creating Album..."
                : isEdit
                    ? "Update Album"
                    : "Create Album"}
        </button>
    );
}

function DeleteAlbumForm({
    album,
    deleteGalleryAlbum,
}: {
    album: GalleryAlbumItem;
    deleteGalleryAlbum: (
        formData: FormData
    ) => void | Promise<void>;
}) {
    return (
        <form
            action={deleteGalleryAlbum}
            onSubmit={(event) => {
                const confirmed = window.confirm(
                    `Delete "${album.title}" and all its gallery items? This cannot be undone.`
                );

                if (!confirmed) {
                    event.preventDefault();
                }
            }}
        >
            <input
                type="hidden"
                name="id"
                value={album.id}
            />

            <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-red-50 px-3 py-2.5 text-xs font-black text-[#C1121F] transition hover:bg-[#C1121F] hover:text-white"
            >
                Delete
            </button>
        </form>
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

function StatCard({
    title,
    value,
    tone,
}: {
    title: string;
    value: number;
    tone: "blue" | "green" | "amber" | "red";
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
        amber: {
            backgroundColor: "#FFF8E6",
            borderColor: "#FCD34D",
            color: "#B45309",
        },
        red: {
            backgroundColor: "#FEF2F2",
            borderColor: "#FECACA",
            color: "#B91C1C",
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

function StatusBadge({
    published,
}: {
    published: boolean;
}) {
    return published ? (
        <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-[10px] font-black uppercase text-green-700">
            Published
        </span>
    ) : (
        <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase text-amber-700">
            Draft
        </span>
    );
}

function CategoryBadge({
    category,
}: {
    category: GalleryCategory;
}) {
    const label =
        CATEGORY_OPTIONS.find(
            (item) => item.value === category
        )?.label || category;

    return (
        <span className="rounded-full bg-slate-950/85 px-3 py-1 text-[10px] font-black uppercase text-white backdrop-blur">
            {label}
        </span>
    );
}

function MediaMetric({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="text-center">
            <p className="text-lg font-black text-slate-950">
                {value}
            </p>

            <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">
                {label}
            </p>
        </div>
    );
}

function EmptyGallery({
    onAddAlbum,
}: {
    onAddAlbum: () => void;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <div className="text-5xl">🖼️</div>

            <h3 className="mt-4 text-xl font-black text-slate-950">
                No gallery albums found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500">
                Create an album, then upload photos or add
                YouTube videos using the media manager.
            </p>

            <button
                type="button"
                onClick={onAddAlbum}
                className="mt-5 cursor-pointer rounded-xl bg-[#C1121F] px-5 py-3 text-sm font-black text-white transition hover:bg-red-800"
            >
                + Create First Album
            </button>
        </div>
    );
}

function formatDate(value: Date | string) {
    return new Date(value).toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function toDateInputValue(
    value: Date | string | null
) {
    if (!value) {
        return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(
        2,
        "0"
    );
    const day = `${date.getDate()}`.padStart(2, "0");

    return `${year}-${month}-${day}`;
}
"use server";

import { mkdir, unlink, writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { GalleryCategory } from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

/**
 * Same upload root being used by Events.
 *
 * Example:
 * /home/ahpk/uploads
 */
function uploadsRoot() {
    return process.env.UPLOADS_DIR || "/home/ahpk/uploads";
}

/**
 * Convert a public Gallery URL:
 *
 * /uploads/gallery/covers/file.jpg
 *
 * into:
 *
 * /home/ahpk/uploads/gallery/covers/file.jpg
 */
function publicPathToFilePath(
    publicUrl?: string | null
) {
    if (!publicUrl) {
        return null;
    }

    if (!publicUrl.startsWith("/uploads/gallery/")) {
        return null;
    }

    const relativePath = publicUrl.replace(
        "/uploads/",
        ""
    );

    return path.join(
        uploadsRoot(),
        relativePath
    );
}

function createSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function getOptionalString(
    formData: FormData,
    name: string
) {
    const value = formData.get(name);

    if (typeof value !== "string") {
        return null;
    }

    const normalized = value.trim();

    return normalized || null;
}

function parseOptionalDate(
    value: FormDataEntryValue | null
) {
    if (
        typeof value !== "string" ||
        !value.trim()
    ) {
        return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date;
}

function parseOrder(
    value: FormDataEntryValue | null
) {
    if (typeof value !== "string") {
        return 0;
    }

    const parsed = Number.parseInt(
        value,
        10
    );

    return Number.isFinite(parsed)
        ? parsed
        : 0;
}

function isGalleryCategory(
    value: string
): value is GalleryCategory {
    return Object.values(
        GalleryCategory
    ).includes(
        value as GalleryCategory
    );
}

async function generateUniqueSlug(
    title: string,
    currentId?: string
) {
    const baseSlug =
        createSlug(title) ||
        `gallery-${Date.now()}`;

    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const existing =
            await prisma.galleryAlbum.findUnique({
                where: {
                    slug,
                },
                select: {
                    id: true,
                },
            });

        if (
            !existing ||
            existing.id === currentId
        ) {
            return slug;
        }

        counter += 1;

        slug = `${baseSlug}-${counter}`;
    }
}

/**
 * Upload Gallery album cover.
 *
 * Physical:
 * /home/ahpk/uploads/gallery/covers/file.jpg
 *
 * Public:
 * /uploads/gallery/covers/file.jpg
 */
async function uploadGalleryImage(
    file: File
) {
    if (!file || file.size === 0) {
        return "";
    }

    if (
        !ALLOWED_IMAGE_TYPES.includes(
            file.type
        )
    ) {
        throw new Error(
            "Only JPG, PNG and WEBP images are allowed."
        );
    }

    if (file.size > MAX_IMAGE_SIZE) {
        throw new Error(
            "Image must not exceed 5MB."
        );
    }

    const extensionByMime: Record<
        string,
        string
    > = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
    };

    const extension =
        extensionByMime[file.type] ||
        "jpg";

    const fileName =
        `${Date.now()}-${randomUUID()}.${extension}`;

    /**
     * IMPORTANT:
     * Do NOT save in process.cwd()/public.
     *
     * Save exactly like Events.
     */
    const uploadDirectory = path.join(
        uploadsRoot(),
        "gallery",
        "covers"
    );

    await mkdir(
        uploadDirectory,
        {
            recursive: true,
        }
    );

    const absoluteFilePath = path.join(
        uploadDirectory,
        fileName
    );

    const bytes =
        await file.arrayBuffer();

    await writeFile(
        absoluteFilePath,
        Buffer.from(bytes)
    );

    return `/uploads/gallery/covers/${fileName}`;
}

/**
 * Delete Gallery file from persistent
 * uploads folder.
 */
async function deleteLocalImage(
    imageUrl?: string | null
) {
    const filePath =
        publicPathToFilePath(imageUrl);

    if (!filePath) {
        return;
    }

    try {
        if (fs.existsSync(filePath)) {
            await unlink(filePath);
        }
    } catch (error) {
        console.error(
            "DELETE_GALLERY_IMAGE_ERROR",
            error
        );
    }
}

export async function saveGalleryAlbum(
    formData: FormData
) {
    const id = getOptionalString(
        formData,
        "id"
    );

    const title = getOptionalString(
        formData,
        "title"
    );

    if (!title) {
        throw new Error(
            "Album title is required."
        );
    }

    const description =
        getOptionalString(
            formData,
            "description"
        );

    const requestedCategory =
        getOptionalString(
            formData,
            "category"
        ) || "EVENTS";

    const category =
        isGalleryCategory(
            requestedCategory
        )
            ? requestedCategory
            : GalleryCategory.EVENTS;

    const eventDate =
        parseOptionalDate(
            formData.get(
                "eventDate"
            )
        );

    const order = parseOrder(
        formData.get("order")
    );

    const featured =
        formData.get("featured") ===
        "on";

    const published =
        formData.get("published") ===
        "on";

    const coverFile =
        formData.get(
            "coverImage"
        ) as File | null;

    let coverImageUrl =
        getOptionalString(
            formData,
            "existingCoverImageUrl"
        );

    let oldImageUrl = "";

    /**
     * UPDATE
     */
    if (id) {
        const existingAlbum =
            await prisma.galleryAlbum.findUnique({
                where: {
                    id,
                },
            });

        if (!existingAlbum) {
            throw new Error(
                "Gallery album was not found."
            );
        }

        oldImageUrl =
            existingAlbum.coverImageUrl ||
            "";

        /**
         * Keep actual DB image unless
         * we're replacing it.
         */
        coverImageUrl =
            existingAlbum.coverImageUrl;

        if (
            coverFile &&
            coverFile.size > 0
        ) {
            coverImageUrl =
                await uploadGalleryImage(
                    coverFile
                );
        }

        const slug =
            await generateUniqueSlug(
                title,
                id
            );

        await prisma.galleryAlbum.update({
            where: {
                id,
            },
            data: {
                title,
                slug,
                description,
                coverImageUrl,
                category,
                eventDate,
                featured,
                published,
                order,
            },
        });

        /**
         * Delete old image only AFTER
         * database update succeeds.
         */
        if (
            coverImageUrl &&
            oldImageUrl &&
            coverImageUrl !== oldImageUrl
        ) {
            await deleteLocalImage(
                oldImageUrl
            );
        }
    }

    /**
     * CREATE
     */
    else {
        if (
            coverFile &&
            coverFile.size > 0
        ) {
            coverImageUrl =
                await uploadGalleryImage(
                    coverFile
                );
        }

        const slug =
            await generateUniqueSlug(
                title
            );

        await prisma.galleryAlbum.create({
            data: {
                title,
                slug,
                description,
                coverImageUrl,
                category,
                eventDate,
                featured,
                published,
                order,
            },
        });
    }

    revalidatePath("/");
    revalidatePath(
        "/dashboard/website/gallery"
    );
    revalidatePath("/gallery");
}

export async function deleteGalleryAlbum(
    formData: FormData
) {
    const id = getOptionalString(
        formData,
        "id"
    );

    if (!id) {
        throw new Error(
            "Gallery album ID is required."
        );
    }

    const album: any =
        await prisma.galleryAlbum.findUnique({
            where: {
                id,
            },
            include: {
                items: {
                    select: {
                        imageUrl: true,
                        thumbnailUrl: true,
                    },
                },
            },
        });

    if (!album) {
        throw new Error(
            "Gallery album was not found."
        );
    }

    await prisma.galleryAlbum.delete({
        where: {
            id,
        },
    });

    /**
     * Delete album cover.
     */
    await deleteLocalImage(
        album.coverImageUrl
    );

    /**
     * Delete album media.
     */
    for (const item of album.items) {
        await deleteLocalImage(
            item.imageUrl
        );

        if (item.thumbnailUrl) {
            await deleteLocalImage(
                item.thumbnailUrl
            );
        }
    }

    revalidatePath("/");
    revalidatePath(
        "/dashboard/website/gallery"
    );
    revalidatePath("/gallery");
}
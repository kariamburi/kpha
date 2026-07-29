"use server";


import { mkdir, unlink, writeFile } from "fs/promises";
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

function createSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function getOptionalString(formData: FormData, name: string) {
    const value = formData.get(name);

    if (typeof value !== "string") {
        return null;
    }

    const normalized = value.trim();

    return normalized || null;
}

function parseOptionalDate(value: FormDataEntryValue | null) {
    if (typeof value !== "string" || !value.trim()) {
        return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date;
}

function parseOrder(value: FormDataEntryValue | null) {
    if (typeof value !== "string") {
        return 0;
    }

    const parsed = Number.parseInt(value, 10);

    return Number.isFinite(parsed) ? parsed : 0;
}

function isGalleryCategory(value: string): value is GalleryCategory {
    return Object.values(GalleryCategory).includes(
        value as GalleryCategory
    );
}

async function generateUniqueSlug(title: string, currentId?: string) {
    const baseSlug = createSlug(title) || `gallery-${Date.now()}`;

    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const existing = await prisma.galleryAlbum.findUnique({
            where: {
                slug,
            },
            select: {
                id: true,
            },
        });

        if (!existing || existing.id === currentId) {
            return slug;
        }

        counter += 1;
        slug = `${baseSlug}-${counter}`;
    }
}

async function uploadGalleryImage(file: File) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        throw new Error("Only JPG, PNG and WEBP images are allowed.");
    }

    if (file.size > MAX_IMAGE_SIZE) {
        throw new Error("Image must not exceed 5MB.");
    }

    const extensionByMime: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
    };

    const extension = extensionByMime[file.type] || "jpg";
    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;

    const relativeDirectory = path.join(
        "uploads",
        "gallery",
        "covers"
    );

    const absoluteDirectory = path.join(
        process.cwd(),
        "public",
        relativeDirectory
    );

    await mkdir(absoluteDirectory, {
        recursive: true,
    });

    const absoluteFilePath = path.join(
        absoluteDirectory,
        fileName
    );

    const bytes = await file.arrayBuffer();

    await writeFile(
        absoluteFilePath,
        Buffer.from(bytes)
    );

    return `/${relativeDirectory.replaceAll("\\", "/")}/${fileName}`;
}

async function deleteLocalImage(imageUrl: string | null | undefined) {
    if (!imageUrl || !imageUrl.startsWith("/uploads/")) {
        return;
    }

    try {
        const relativePath = imageUrl.replace(/^\/+/, "");

        const absolutePath = path.join(
            process.cwd(),
            "public",
            relativePath
        );

        await unlink(absolutePath);
    } catch (error) {
        console.warn("Could not delete gallery image:", error);
    }
}

export async function saveGalleryAlbum(formData: FormData) {
    const id = getOptionalString(formData, "id");

    const title = getOptionalString(formData, "title");

    if (!title) {
        throw new Error("Album title is required.");
    }

    const description = getOptionalString(
        formData,
        "description"
    );

    const requestedCategory =
        getOptionalString(formData, "category") || "EVENTS";

    const category = isGalleryCategory(requestedCategory)
        ? requestedCategory
        : GalleryCategory.EVENTS;

    const eventDate = parseOptionalDate(
        formData.get("eventDate")
    );

    const order = parseOrder(formData.get("order"));

    const featured = formData.get("featured") === "on";
    const published = formData.get("published") === "on";

    const existingImageUrl = getOptionalString(
        formData,
        "existingCoverImageUrl"
    );

    const coverFile = formData.get("coverImage");

    let coverImageUrl = existingImageUrl;

    if (
        coverFile instanceof File &&
        coverFile.size > 0
    ) {
        const newImageUrl = await uploadGalleryImage(coverFile);

        if (
            existingImageUrl &&
            existingImageUrl !== newImageUrl
        ) {
            await deleteLocalImage(existingImageUrl);
        }

        coverImageUrl = newImageUrl;
    }

    const slug = await generateUniqueSlug(
        title,
        id || undefined
    );

    const data = {
        title,
        slug,
        description,
        coverImageUrl,
        category,
        eventDate,
        featured,
        published,
        order,
    };

    if (id) {
        const existingAlbum =
            await prisma.galleryAlbum.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                },
            });

        if (!existingAlbum) {
            throw new Error("Gallery album was not found.");
        }

        await prisma.galleryAlbum.update({
            where: {
                id,
            },
            data,
        });
    } else {
        await prisma.galleryAlbum.create({
            data,
        });
    }

    revalidatePath("/dashboard/website/gallery");
    revalidatePath("/gallery");
}

export async function deleteGalleryAlbum(
    formData: FormData
) {
    const id = getOptionalString(formData, "id");

    if (!id) {
        throw new Error("Gallery album ID is required.");
    }

    const album: any = await prisma.galleryAlbum.findUnique({
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
        throw new Error("Gallery album was not found.");
    }

    await prisma.galleryAlbum.delete({
        where: {
            id,
        },
    });

    await deleteLocalImage(album.coverImageUrl);

    for (const item of album.items) {
        await deleteLocalImage(item.imageUrl);

        if (
            item.thumbnailUrl &&
            item.thumbnailUrl.startsWith("/uploads/")
        ) {
            await deleteLocalImage(item.thumbnailUrl);
        }
    }

    revalidatePath("/dashboard/website/gallery");
    revalidatePath("/gallery");
}
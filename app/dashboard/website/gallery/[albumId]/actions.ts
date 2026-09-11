"use server";

import { GalleryMediaType } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import fs from "fs";
import { revalidatePath } from "next/cache";
import path from "path";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

/**
 * Same persistent uploads directory
 * being used successfully by Events.
 */
function uploadsRoot() {
    return process.env.UPLOADS_DIR || "/home/ahpk/uploads";
}

function getString(
    formData: FormData,
    name: string
) {
    const value = formData.get(name);

    if (typeof value !== "string") {
        return "";
    }

    return value.trim();
}

function getOptionalString(
    formData: FormData,
    name: string
) {
    const value = getString(formData, name);

    return value || null;
}

function getYouTubeId(url: string) {
    const normalizedUrl = url.trim();

    const patterns = [
        /youtube\.com\/watch\?v=([^&]+)/i,
        /youtube\.com\/embed\/([^?&/]+)/i,
        /youtube\.com\/shorts\/([^?&/]+)/i,
        /youtu\.be\/([^?&/]+)/i,
    ];

    for (const pattern of patterns) {
        const match = normalizedUrl.match(pattern);

        if (match?.[1]) {
            return match[1];
        }
    }

    try {
        const parsedUrl = new URL(normalizedUrl);

        if (
            parsedUrl.hostname.includes("youtube.com")
        ) {
            return parsedUrl.searchParams.get("v");
        }

        if (
            parsedUrl.hostname.includes("youtu.be")
        ) {
            return parsedUrl.pathname
                .replace(/^\/+/, "")
                .split("/")[0];
        }
    } catch {
        return null;
    }

    return null;
}

/**
 * Convert:
 *
 * /uploads/gallery/ALBUM-ID/file.jpg
 *
 * to:
 *
 * /home/ahpk/uploads/gallery/ALBUM-ID/file.jpg
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

/**
 * Upload an image into:
 *
 * /home/ahpk/uploads/gallery/{albumId}/
 *
 * while returning:
 *
 * /uploads/gallery/{albumId}/file.jpg
 */
async function uploadGalleryImage(
    file: File,
    albumId: string
) {
    if (!file || file.size === 0) {
        throw new Error(
            "The selected image is empty."
        );
    }

    if (
        !ALLOWED_IMAGE_TYPES.includes(
            file.type
        )
    ) {
        throw new Error(
            `${file.name}: only JPG, PNG and WEBP images are allowed.`
        );
    }

    if (file.size > MAX_IMAGE_SIZE) {
        throw new Error(
            `${file.name}: image must not exceed 5MB.`
        );
    }

    const extensions: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
    };

    const extension =
        extensions[file.type] || "jpg";

    const fileName =
        `${Date.now()}-${randomUUID()}.${extension}`;

    /**
     * IMPORTANT:
     *
     * Do not use:
     * process.cwd()/public/uploads
     *
     * Use the persistent uploads directory.
     */
    const absoluteDirectory = path.join(
        uploadsRoot(),
        "gallery",
        albumId
    );

    await mkdir(
        absoluteDirectory,
        {
            recursive: true,
        }
    );

    const absolutePath = path.join(
        absoluteDirectory,
        fileName
    );

    const bytes =
        await file.arrayBuffer();

    await writeFile(
        absolutePath,
        Buffer.from(bytes)
    );

    return `/uploads/gallery/${albumId}/${fileName}`;
}

/**
 * Delete a local Gallery image from
 * the persistent uploads directory.
 */
async function deleteLocalFile(
    fileUrl?: string | null
) {
    const absolutePath =
        publicPathToFilePath(fileUrl);

    if (!absolutePath) {
        return;
    }

    try {
        if (fs.existsSync(absolutePath)) {
            await unlink(absolutePath);
        }
    } catch (error) {
        console.error(
            "DELETE_GALLERY_FILE_ERROR",
            error
        );
    }
}
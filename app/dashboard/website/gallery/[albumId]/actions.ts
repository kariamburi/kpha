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

async function getNextOrder(albumId: string) {
    const lastItem =
        await prisma.galleryItem.findFirst({
            where: {
                albumId,
            },
            orderBy: {
                order: "desc",
            },
            select: {
                order: true,
            },
        });

    return (lastItem?.order ?? -1) + 1;
}

function revalidateGallery(albumId: string) {
    revalidatePath(
        `/dashboard/website/gallery/${albumId}`
    );

    revalidatePath(
        "/dashboard/website/gallery"
    );

    revalidatePath("/gallery");
}

export async function uploadGalleryImages(
    formData: FormData
) {
    const albumId = getString(
        formData,
        "albumId"
    );

    if (!albumId) {
        throw new Error(
            "Gallery album ID is required."
        );
    }

    const album =
        await prisma.galleryAlbum.findUnique({
            where: {
                id: albumId,
            },
            select: {
                id: true,
                coverImageUrl: true,
            },
        });

    if (!album) {
        throw new Error(
            "Gallery album was not found."
        );
    }

    const files = formData
        .getAll("images")
        .filter(
            (item): item is File =>
                item instanceof File &&
                item.size > 0
        );

    if (files.length === 0) {
        throw new Error(
            "Please select at least one image."
        );
    }

    let nextOrder =
        await getNextOrder(albumId);

    const uploadedImages: Array<{
        imageUrl: string;
        title: string;
        order: number;
    }> = [];

    try {
        for (const file of files) {
            const imageUrl =
                await uploadGalleryImage(
                    file,
                    albumId
                );

            uploadedImages.push({
                imageUrl,
                title: file.name
                    .replace(/\.[^/.]+$/, "")
                    .replace(/[-_]+/g, " "),
                order: nextOrder,
            });

            nextOrder += 1;
        }

        await prisma.$transaction(
            async (tx) => {
                for (
                    const uploadedImage
                    of uploadedImages
                ) {
                    await tx.galleryItem.create({
                        data: {
                            albumId,
                            type:
                                GalleryMediaType.IMAGE,
                            imageUrl:
                                uploadedImage.imageUrl,
                            title:
                                uploadedImage.title,
                            order:
                                uploadedImage.order,
                        },
                    });
                }

                if (
                    !album.coverImageUrl &&
                    uploadedImages[0]
                ) {
                    await tx.galleryAlbum.update({
                        where: {
                            id: albumId,
                        },
                        data: {
                            coverImageUrl:
                                uploadedImages[0]
                                    .imageUrl,
                        },
                    });
                }
            }
        );
    } catch (error) {
        for (
            const uploadedImage
            of uploadedImages
        ) {
            await deleteLocalFile(
                uploadedImage.imageUrl
            );
        }

        console.error(
            "UPLOAD_GALLERY_IMAGES_ERROR",
            error
        );

        throw error;
    }

    revalidateGallery(albumId);
}

export async function addYouTubeVideo(
    formData: FormData
) {
    const albumId = getString(
        formData,
        "albumId"
    );

    const youtubeUrl = getString(
        formData,
        "youtubeUrl"
    );

    const title = getOptionalString(
        formData,
        "title"
    );

    const caption = getOptionalString(
        formData,
        "caption"
    );

    if (!albumId) {
        throw new Error(
            "Gallery album ID is required."
        );
    }

    if (!youtubeUrl) {
        throw new Error(
            "YouTube URL is required."
        );
    }

    const youtubeId =
        getYouTubeId(youtubeUrl);

    if (!youtubeId) {
        throw new Error(
            "Enter a valid YouTube video URL."
        );
    }

    const album =
        await prisma.galleryAlbum.findUnique({
            where: {
                id: albumId,
            },
            select: {
                id: true,
            },
        });

    if (!album) {
        throw new Error(
            "Gallery album was not found."
        );
    }

    const existingVideo =
        await prisma.galleryItem.findFirst({
            where: {
                albumId,
                type:
                    GalleryMediaType.YOUTUBE,
                youtubeId,
            },
            select: {
                id: true,
            },
        });

    if (existingVideo) {
        throw new Error(
            "This YouTube video is already in the album."
        );
    }

    const order =
        await getNextOrder(albumId);

    await prisma.galleryItem.create({
        data: {
            albumId,
            type:
                GalleryMediaType.YOUTUBE,
            youtubeUrl,
            youtubeId,
            thumbnailUrl:
                `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
            title:
                title ||
                "AHPK Gallery Video",
            caption,
            order,
        },
    });

    revalidateGallery(albumId);
}

export async function updateGalleryItem(
    formData: FormData
) {
    const id = getString(
        formData,
        "id"
    );

    const title = getOptionalString(
        formData,
        "title"
    );

    const caption = getOptionalString(
        formData,
        "caption"
    );

    if (!id) {
        throw new Error(
            "Gallery item ID is required."
        );
    }

    const item =
        await prisma.galleryItem.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                albumId: true,
            },
        });

    if (!item) {
        throw new Error(
            "Gallery item was not found."
        );
    }

    await prisma.galleryItem.update({
        where: {
            id,
        },
        data: {
            title,
            caption,
        },
    });

    revalidateGallery(item.albumId);
}

export async function setAlbumCover(
    formData: FormData
) {
    const itemId = getString(
        formData,
        "itemId"
    );

    if (!itemId) {
        throw new Error(
            "Gallery item ID is required."
        );
    }

    const item =
        await prisma.galleryItem.findUnique({
            where: {
                id: itemId,
            },
            select: {
                id: true,
                albumId: true,
                type: true,
                imageUrl: true,
            },
        });

    if (!item) {
        throw new Error(
            "Gallery item was not found."
        );
    }

    if (
        item.type !==
        GalleryMediaType.IMAGE ||
        !item.imageUrl
    ) {
        throw new Error(
            "Only an uploaded image can be used as the album cover."
        );
    }

    await prisma.galleryAlbum.update({
        where: {
            id: item.albumId,
        },
        data: {
            coverImageUrl:
                item.imageUrl,
        },
    });

    revalidateGallery(item.albumId);
}

export async function deleteGalleryItem(
    formData: FormData
) {
    const id = getString(
        formData,
        "id"
    );

    if (!id) {
        throw new Error(
            "Gallery item ID is required."
        );
    }

    const item: any =
        await prisma.galleryItem.findUnique({
            where: {
                id,
            },
            include: {
                album: {
                    select: {
                        id: true,
                        coverImageUrl: true,
                    },
                },
            },
        });

    if (!item) {
        throw new Error(
            "Gallery item was not found."
        );
    }

    await prisma.galleryItem.delete({
        where: {
            id,
        },
    });

    if (
        item.imageUrl &&
        item.album.coverImageUrl ===
        item.imageUrl
    ) {
        const replacementImage =
            await prisma.galleryItem.findFirst({
                where: {
                    albumId:
                        item.albumId,
                    type:
                        GalleryMediaType.IMAGE,
                    imageUrl: {
                        not: null,
                    },
                },
                orderBy: {
                    order: "asc",
                },
                select: {
                    imageUrl: true,
                },
            });

        await prisma.galleryAlbum.update({
            where: {
                id: item.albumId,
            },
            data: {
                coverImageUrl:
                    replacementImage?.imageUrl ||
                    null,
            },
        });
    }

    await deleteLocalFile(
        item.imageUrl
    );

    if (
        item.thumbnailUrl?.startsWith(
            "/uploads/"
        )
    ) {
        await deleteLocalFile(
            item.thumbnailUrl
        );
    }

    await normalizeItemOrder(
        item.albumId
    );

    revalidateGallery(item.albumId);
}

export async function moveGalleryItem(
    formData: FormData
) {
    const id = getString(
        formData,
        "id"
    );

    const direction = getString(
        formData,
        "direction"
    );

    if (
        !id ||
        !["LEFT", "RIGHT"].includes(
            direction
        )
    ) {
        throw new Error(
            "Invalid gallery item movement."
        );
    }

    const item =
        await prisma.galleryItem.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                albumId: true,
                order: true,
            },
        });

    if (!item) {
        throw new Error(
            "Gallery item was not found."
        );
    }

    const adjacentItem =
        await prisma.galleryItem.findFirst({
            where: {
                albumId:
                    item.albumId,

                ...(direction === "LEFT"
                    ? {
                        order: {
                            lt: item.order,
                        },
                    }
                    : {
                        order: {
                            gt: item.order,
                        },
                    }),
            },

            orderBy: {
                order:
                    direction === "LEFT"
                        ? "desc"
                        : "asc",
            },

            select: {
                id: true,
                order: true,
            },
        });

    if (!adjacentItem) {
        return;
    }

    await prisma.$transaction([
        prisma.galleryItem.update({
            where: {
                id: item.id,
            },
            data: {
                order:
                    adjacentItem.order,
            },
        }),

        prisma.galleryItem.update({
            where: {
                id:
                    adjacentItem.id,
            },
            data: {
                order:
                    item.order,
            },
        }),
    ]);

    revalidateGallery(item.albumId);
}

async function normalizeItemOrder(
    albumId: string
) {
    const items =
        await prisma.galleryItem.findMany({
            where: {
                albumId,
            },

            orderBy: [
                {
                    order: "asc",
                },
                {
                    createdAt: "asc",
                },
            ],

            select: {
                id: true,
            },
        });

    await prisma.$transaction(
        items.map(
            (item, index) =>
                prisma.galleryItem.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        order:
                            index,
                    },
                })
        )
    );
}
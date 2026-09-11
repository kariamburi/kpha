"use server";

import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
    mkdir,
    unlink,
    writeFile,
} from "fs/promises";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

const MAX_IMAGE_SIZE =
    5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

function uploadsRoot() {
    return (
        process.env.UPLOADS_DIR ||
        "/home/ahpk/uploads"
    );
}

function getString(
    formData: FormData,
    name: string
) {
    const value =
        formData.get(name);

    if (
        typeof value !== "string"
    ) {
        return "";
    }

    return value.trim();
}

function getOptionalString(
    formData: FormData,
    name: string
) {
    const value =
        getString(
            formData,
            name
        );

    return value || null;
}

function getNumber(
    formData: FormData,
    name: string,
    fallback = 0
) {
    const value =
        getString(
            formData,
            name
        );

    const number =
        Number.parseInt(
            value,
            10
        );

    return Number.isFinite(
        number
    )
        ? number
        : fallback;
}

function publicPathToFilePath(
    publicUrl?: string | null
) {
    if (!publicUrl) {
        return null;
    }

    if (
        !publicUrl.startsWith(
            "/uploads/homepage/"
        )
    ) {
        return null;
    }

    const relativePath =
        publicUrl.replace(
            "/uploads/",
            ""
        );

    return path.join(
        uploadsRoot(),
        relativePath
    );
}

async function deleteHomepageImage(
    publicUrl?: string | null
) {
    const filePath =
        publicPathToFilePath(
            publicUrl
        );

    if (!filePath) {
        return;
    }

    try {
        if (
            fs.existsSync(
                filePath
            )
        ) {
            await unlink(
                filePath
            );
        }
    } catch (error) {
        console.error(
            "DELETE_HOMEPAGE_IMAGE_ERROR",
            error
        );
    }
}

async function uploadHomepageImage(
    file: File,
    folder:
        | "slides"
        | "welcome"
) {
    if (
        !file ||
        file.size === 0
    ) {
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

    if (
        file.size >
        MAX_IMAGE_SIZE
    ) {
        throw new Error(
            "Image must not exceed 5MB."
        );
    }

    const extensions: Record<
        string,
        string
    > = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
    };

    const extension =
        extensions[
        file.type
        ] || "jpg";

    const fileName =
        `${Date.now()}-${randomUUID()}.${extension}`;

    const uploadDirectory =
        path.join(
            uploadsRoot(),
            "homepage",
            folder
        );

    await mkdir(
        uploadDirectory,
        {
            recursive: true,
        }
    );

    const absolutePath =
        path.join(
            uploadDirectory,
            fileName
        );

    const bytes =
        await file.arrayBuffer();

    await writeFile(
        absolutePath,
        Buffer.from(
            bytes
        )
    );

    return `/uploads/homepage/${folder}/${fileName}`;
}

function revalidateHomepage() {
    revalidatePath("/");

    revalidatePath(
        "/dashboard/website/homepage"
    );
}

/**
 * CREATE / UPDATE HERO SLIDE
 */
export async function saveHomepageHeroSlide(
    formData: FormData
) {
    const id =
        getOptionalString(
            formData,
            "id"
        );

    const title =
        getString(
            formData,
            "title"
        );

    const description =
        getString(
            formData,
            "description"
        );

    const buttonLabel =
        getOptionalString(
            formData,
            "buttonLabel"
        );

    const buttonHref =
        getOptionalString(
            formData,
            "buttonHref"
        );

    const order =
        getNumber(
            formData,
            "order",
            0
        );

    const active =
        formData.get(
            "active"
        ) === "on";

    if (!title) {
        throw new Error(
            "Slide title is required."
        );
    }

    if (!description) {
        throw new Error(
            "Slide description is required."
        );
    }

    const imageFile =
        formData.get(
            "image"
        ) as File | null;

    if (id) {
        const existing =
            await prisma
                .homepageHeroSlide
                .findUnique({
                    where: {
                        id,
                    },
                });

        if (!existing) {
            throw new Error(
                "Homepage slide was not found."
            );
        }

        let imageUrl =
            existing.imageUrl;

        if (
            imageFile &&
            imageFile.size > 0
        ) {
            imageUrl =
                await uploadHomepageImage(
                    imageFile,
                    "slides"
                );
        }

        await prisma
            .homepageHeroSlide
            .update({
                where: {
                    id,
                },
                data: {
                    title,
                    description,
                    imageUrl,
                    buttonLabel,
                    buttonHref,
                    order,
                    active,
                },
            });

        if (
            imageUrl !==
            existing.imageUrl
        ) {
            await deleteHomepageImage(
                existing.imageUrl
            );
        }
    } else {
        if (
            !imageFile ||
            imageFile.size === 0
        ) {
            throw new Error(
                "Slide image is required."
            );
        }

        const imageUrl =
            await uploadHomepageImage(
                imageFile,
                "slides"
            );

        await prisma
            .homepageHeroSlide
            .create({
                data: {
                    title,
                    description,
                    imageUrl,
                    buttonLabel,
                    buttonHref,
                    order,
                    active,
                },
            });
    }

    revalidateHomepage();
}

/**
 * DELETE HERO SLIDE
 */
export async function deleteHomepageHeroSlide(
    formData: FormData
) {
    const id =
        getString(
            formData,
            "id"
        );

    if (!id) {
        throw new Error(
            "Slide ID is required."
        );
    }

    const existing =
        await prisma
            .homepageHeroSlide
            .findUnique({
                where: {
                    id,
                },
            });

    if (!existing) {
        throw new Error(
            "Slide was not found."
        );
    }

    await prisma
        .homepageHeroSlide
        .delete({
            where: {
                id,
            },
        });

    await deleteHomepageImage(
        existing.imageUrl
    );

    revalidateHomepage();
}

/**
 * HOMEPAGE WELCOME SECTION
 */
export async function saveHomepageContent(
    formData: FormData
) {
    const welcomeLabel =
        getOptionalString(
            formData,
            "welcomeLabel"
        );

    const welcomeTitle =
        getOptionalString(
            formData,
            "welcomeTitle"
        );

    const welcomeText =
        getOptionalString(
            formData,
            "welcomeText"
        );

    const welcomeSecondaryText =
        getOptionalString(
            formData,
            "welcomeSecondaryText"
        );

    const primaryButtonLabel =
        getOptionalString(
            formData,
            "primaryButtonLabel"
        );

    const primaryButtonHref =
        getOptionalString(
            formData,
            "primaryButtonHref"
        );

    const secondaryButtonLabel =
        getOptionalString(
            formData,
            "secondaryButtonLabel"
        );

    const secondaryButtonHref =
        getOptionalString(
            formData,
            "secondaryButtonHref"
        );

    const imageFile =
        formData.get(
            "welcomeImage"
        ) as File | null;

    const existing =
        await prisma
            .homepageContent
            .findUnique({
                where: {
                    id: 1,
                },
            });

    let welcomeImageUrl =
        existing?.welcomeImageUrl ||
        null;

    if (
        imageFile &&
        imageFile.size > 0
    ) {
        welcomeImageUrl =
            await uploadHomepageImage(
                imageFile,
                "welcome"
            );
    }

    await prisma
        .homepageContent
        .upsert({
            where: {
                id: 1,
            },
            update: {
                welcomeLabel,
                welcomeTitle,
                welcomeText,
                welcomeSecondaryText,
                welcomeImageUrl,
                primaryButtonLabel,
                primaryButtonHref,
                secondaryButtonLabel,
                secondaryButtonHref,
            },
            create: {
                id: 1,
                welcomeLabel,
                welcomeTitle,
                welcomeText,
                welcomeSecondaryText,
                welcomeImageUrl,
                primaryButtonLabel,
                primaryButtonHref,
                secondaryButtonLabel,
                secondaryButtonHref,
            },
        });

    if (
        existing
            ?.welcomeImageUrl &&
        welcomeImageUrl &&
        welcomeImageUrl !==
        existing
            .welcomeImageUrl
    ) {
        await deleteHomepageImage(
            existing
                .welcomeImageUrl
        );
    }

    revalidateHomepage();
}
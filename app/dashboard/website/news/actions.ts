"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

async function uploadNewsImage(file: File) {
    if (!file || file.size === 0) return "";

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG and WEBP images are allowed.");
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        throw new Error("Image must be less than 3MB.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "news");
    await mkdir(uploadDir, { recursive: true });

    await writeFile(path.join(uploadDir, fileName), buffer);

    return `/uploads/news/${fileName}`;
}

export async function saveNewsPost(formData: FormData) {
    const id = String(formData.get("id") || "");
    const title = String(formData.get("title") || "").trim();
    const excerpt = String(formData.get("excerpt") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const published = formData.get("published") === "on";

    let imageUrl = String(formData.get("existingImageUrl") || "").trim();

    const imageFile = formData.get("image") as File | null;

    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadNewsImage(imageFile);
    }

    if (!title || !content) {
        throw new Error("Title and content are required.");
    }

    const slug = slugify(title);

    if (id) {
        const existing = await prisma.newsPost.findUnique({
            where: { id },
        });

        await prisma.newsPost.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                imageUrl,
                published,
                publishedAt:
                    published && !existing?.publishedAt
                        ? new Date()
                        : existing?.publishedAt,
            },
        });
    } else {
        await prisma.newsPost.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                imageUrl,
                published,
                publishedAt: published ? new Date() : null,
            },
        });
    }

    revalidatePath("/dashboard/website/news");
    revalidatePath("/news");
    revalidatePath(`/news/${slug}`);
}

export async function deleteNewsPost(formData: FormData) {
    const id = String(formData.get("id") || "");
    if (!id) return;

    await prisma.newsPost.delete({
        where: { id },
    });

    revalidatePath("/dashboard/website/news");
    revalidatePath("/news");
}
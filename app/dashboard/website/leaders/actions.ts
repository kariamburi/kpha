"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { mkdir, writeFile, unlink } from "fs/promises";
import fs from "fs";
import path from "path";
import crypto from "crypto";

function publicPathToFilePath(publicUrl?: string | null) {
    if (!publicUrl) return null;
    if (!publicUrl.startsWith("/uploads/leaders/")) return null;

    return path.join(process.cwd(), "public", publicUrl);
}

async function deleteLeaderImage(publicUrl?: string | null) {
    const filePath = publicPathToFilePath(publicUrl);

    if (!filePath) return;

    try {
        if (fs.existsSync(filePath)) {
            await unlink(filePath);
        }
    } catch (error) {
        console.error("DELETE_LEADER_IMAGE_ERROR", error);
    }
}

async function uploadLeaderImage(file: File) {
    if (!file || file.size === 0) return "";

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG and WEBP images are allowed.");
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        throw new Error("Image must be less than 5MB.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "leaders");
    await mkdir(uploadDir, { recursive: true });

    await writeFile(path.join(uploadDir, fileName), buffer);

    return `/uploads/leaders/${fileName}`;
}

export async function saveLeader(formData: FormData) {
    const id = String(formData.get("id") || "");
    const name = String(formData.get("name") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const bio = String(formData.get("bio") || "").trim();
    const existingImageUrl = String(formData.get("imageUrl") || "").trim();
    const order = Number(formData.get("order") || 0);
    const active = formData.get("active") === "on";

    if (!name || !title) {
        throw new Error("Name and title are required.");
    }

    const imageFile = formData.get("imageFile") as File | null;

    let imageUrl = existingImageUrl;
    let oldImageUrl = "";

    if (id) {
        const existing = await prisma.leader.findUnique({
            where: { id },
        });

        if (!existing) throw new Error("Leader not found.");

        oldImageUrl = existing.imageUrl || "";

        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadLeaderImage(imageFile);
        }

        await prisma.leader.update({
            where: { id },
            data: {
                name,
                title,
                bio,
                imageUrl,
                order,
                active,
            },
        });

        if (imageUrl && oldImageUrl && imageUrl !== oldImageUrl) {
            await deleteLeaderImage(oldImageUrl);
        }
    } else {
        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadLeaderImage(imageFile);
        }

        await prisma.leader.create({
            data: {
                name,
                title,
                bio,
                imageUrl,
                order,
                active,
            },
        });
    }

    revalidatePath("/");
    revalidatePath("/dashboard/website/leaders");
    revalidatePath("/leadership");
}

export async function deleteLeader(formData: FormData) {
    const id = String(formData.get("id") || "");
    if (!id) return;

    const existing = await prisma.leader.findUnique({
        where: { id },
    });

    if (!existing) return;

    await prisma.leader.delete({
        where: { id },
    });

    await deleteLeaderImage(existing.imageUrl);

    revalidatePath("/");
    revalidatePath("/dashboard/website/leaders");
    revalidatePath("/leadership");
}
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

async function uploadLeaderImage(file: File) {
    if (!file || file.size === 0) return "";

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG and WEBP images are allowed.");
    }

    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file.size > maxSize) {
        throw new Error("Image must be less than 2MB.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "leaders");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

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

    const imageFile = formData.get("imageFile") as File | null;
    const uploadedImageUrl =
        imageFile && imageFile.size > 0 ? await uploadLeaderImage(imageFile) : "";

    const imageUrl = uploadedImageUrl || existingImageUrl;

    if (!name || !title) throw new Error("Name and title are required.");

    if (id) {
        await prisma.leader.update({
            where: { id },
            data: { name, title, bio, imageUrl, order, active },
        });
    } else {
        await prisma.leader.create({
            data: { name, title, bio, imageUrl, order, active },
        });
    }

    revalidatePath("/dashboard/website/leaders");
    revalidatePath("/leadership");
}

export async function deleteLeader(formData: FormData) {
    const id = String(formData.get("id") || "");
    if (!id) return;

    await prisma.leader.delete({ where: { id } });

    revalidatePath("/dashboard/website/leaders");
    revalidatePath("/leadership");
}
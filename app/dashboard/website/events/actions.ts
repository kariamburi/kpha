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

async function uploadEventImage(file: File) {
    if (!file || file.size === 0) return "";

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG and WEBP images are allowed.");
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        throw new Error("Image must be less than 2MB.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "events");
    await mkdir(uploadDir, { recursive: true });

    await writeFile(path.join(uploadDir, fileName), buffer);

    return `/uploads/events/${fileName}`;
}

export async function saveEvent(formData: FormData) {
    const id = String(formData.get("id") || "");
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const venue = String(formData.get("venue") || "").trim();
    const eventDate = String(formData.get("eventDate") || "");
    const endDate = String(formData.get("endDate") || "");

    let imageUrl = String(formData.get("existingImageUrl") || "").trim();

    const imageFile = formData.get("image") as File | null;

    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadEventImage(imageFile);
    }

    const cpdPoints = Number(formData.get("cpdPoints") || 0);
    const capacity = Number(formData.get("capacity") || 0);
    const fee = Number(formData.get("fee") || 0);
    const published = formData.get("published") === "on";

    if (!title || !description || !eventDate) {
        throw new Error("Title, description and event date are required.");
    }

    const slug = slugify(title);

    if (id) {
        await prisma.event.update({
            where: { id },
            data: {
                title,
                slug,
                description,
                venue,
                eventDate: new Date(eventDate),
                endDate: endDate ? new Date(endDate) : null,
                imageUrl,
                cpdPoints,
                capacity: capacity || null,
                fee,
                published,
            },
        });
    } else {
        await prisma.event.create({
            data: {
                title,
                slug,
                description,
                venue,
                eventDate: new Date(eventDate),
                endDate: endDate ? new Date(endDate) : null,
                imageUrl,
                cpdPoints,
                capacity: capacity || null,
                fee,
                published,
            },
        });
    }

    revalidatePath("/dashboard/website/events");
    revalidatePath("/events");
    revalidatePath(`/events/${slug}`);
}

export async function deleteEvent(formData: FormData) {
    const id = String(formData.get("id") || "");
    if (!id) return;

    await prisma.event.delete({
        where: { id },
    });

    revalidatePath("/dashboard/website/events");
    revalidatePath("/events");
}
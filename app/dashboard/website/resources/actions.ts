"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveResource(formData: FormData) {
    const id = String(formData.get("id") || "");
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const fileUrl = String(formData.get("fileUrl") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const published = formData.get("published") === "on";

    if (!title || !fileUrl) {
        throw new Error("Title and file URL are required.");
    }

    if (id) {
        await prisma.resource.update({
            where: { id },
            data: { title, description, fileUrl, category, published },
        });
    } else {
        await prisma.resource.create({
            data: { title, description, fileUrl, category, published },
        });
    }

    revalidatePath("/dashboard/website/resources");
    revalidatePath("/resources");
}

export async function deleteResource(formData: FormData) {
    const id = String(formData.get("id") || "");
    if (!id) return;

    await prisma.resource.delete({
        where: { id },
    });

    revalidatePath("/dashboard/website/resources");
    revalidatePath("/resources");
}
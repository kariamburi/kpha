"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function saveWebsitePage(formData: FormData) {
    const id = String(formData.get("id") || "");
    const slug = String(formData.get("slug") || "").trim().toLowerCase();
    const title = String(formData.get("title") || "").trim();
    const subtitle = String(formData.get("subtitle") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const seoTitle = String(formData.get("seoTitle") || "").trim();
    const seoDesc = String(formData.get("seoDesc") || "").trim();
    const published = formData.get("published") === "on";

    if (!slug || !title) {
        throw new Error("Slug and title are required.");
    }

    if (id) {
        await prisma.websitePage.update({
            where: { id },
            data: { slug, title, subtitle, content, imageUrl, seoTitle, seoDesc, published },
        });
    } else {
        await prisma.websitePage.create({
            data: { slug, title, subtitle, content, imageUrl, seoTitle, seoDesc, published },
        });
    }

    revalidatePath("/");
    revalidatePath(`/${slug}`);
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/dashboard/website/pages");
}

export async function deleteWebsitePage(formData: FormData) {
    const id = String(formData.get("id") || "");
    if (!id) return;

    await prisma.websitePage.delete({ where: { id } });

    revalidatePath("/dashboard/website/pages");
}
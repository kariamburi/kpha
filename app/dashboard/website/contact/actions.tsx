"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveContactSettings(formData: FormData) {
    const title = String(formData.get("title") || "").trim();
    const subtitle = String(formData.get("subtitle") || "").trim();
    const content = String(formData.get("content") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();

    await prisma.websitePage.upsert({
        where: { slug: "contact" },
        update: {
            title,
            subtitle,
            content,
            imageUrl,
            published: true,
        },
        create: {
            slug: "contact",
            title: title || "Contact AHPK",
            subtitle,
            content,
            imageUrl,
            published: true,
        },
    });

    await prisma.contactSetting.upsert({
        where: { id: "main" },
        update: {
            address: String(formData.get("address") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            phone1: String(formData.get("phone1") || "").trim(),
            phone2: String(formData.get("phone2") || "").trim(),
            facebookUrl: String(formData.get("facebookUrl") || "").trim(),
            twitterUrl: String(formData.get("twitterUrl") || "").trim(),
            linkedinUrl: String(formData.get("linkedinUrl") || "").trim(),
            instagramUrl: String(formData.get("instagramUrl") || "").trim(),
            mapUrl: String(formData.get("mapUrl") || "").trim(),
        },
        create: {
            id: "main",
            address: String(formData.get("address") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            phone1: String(formData.get("phone1") || "").trim(),
            phone2: String(formData.get("phone2") || "").trim(),
            facebookUrl: String(formData.get("facebookUrl") || "").trim(),
            twitterUrl: String(formData.get("twitterUrl") || "").trim(),
            linkedinUrl: String(formData.get("linkedinUrl") || "").trim(),
            instagramUrl: String(formData.get("instagramUrl") || "").trim(),
            mapUrl: String(formData.get("mapUrl") || "").trim(),
        },
    });

    revalidatePath("/contact");
    revalidatePath("/dashboard/website/contact");
}
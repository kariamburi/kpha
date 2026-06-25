import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SettingsCategoryClient from "./SettingsCategoryClient";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

async function uploadSignature(file: File) {
    "use server";

    if (!file || file.size === 0) return "";

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only PNG, JPG or WEBP signature images are allowed.");
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        throw new Error("Signature image must be less than 1MB.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "signatures");
    await mkdir(uploadDir, { recursive: true });

    await writeFile(path.join(uploadDir, fileName), buffer);

    return `/signatures/${fileName}`;
}

async function saveCertificateSettings(formData: FormData) {
    "use server";

    const existing = await prisma.certificateSetting.upsert({
        where: { id: "main" },
        update: {},
        create: { id: "main" },
    });

    const chairpersonName = String(formData.get("chairpersonName") || "").trim();
    const secretaryName = String(formData.get("secretaryName") || "").trim();

    let chairpersonSignature = existing.chairpersonSignature || "";
    let secretarySignature = existing.secretarySignature || "";

    const chairFile = formData.get("chairpersonSignature") as File | null;
    const secretaryFile = formData.get("secretarySignature") as File | null;

    if (chairFile && chairFile.size > 0) {
        chairpersonSignature = await uploadSignature(chairFile);
    }

    if (secretaryFile && secretaryFile.size > 0) {
        secretarySignature = await uploadSignature(secretaryFile);
    }

    await prisma.certificateSetting.update({
        where: { id: "main" },
        data: {
            chairpersonName,
            secretaryName,
            chairpersonSignature,
            secretarySignature,
        },
    });

    revalidatePath("/dashboard/settings");
}

async function addCategory(formData: FormData) {
    "use server";

    await prisma.membershipCategory.create({
        data: {
            name: String(formData.get("name") || "").trim(),
            description: String(formData.get("description") || "").trim(),
            annualFee: Number(formData.get("annualFee") || 0),
            active: true,
        },
    });

    revalidatePath("/dashboard/settings");
}

async function updateCategory(formData: FormData) {
    "use server";

    await prisma.membershipCategory.update({
        where: { id: String(formData.get("id")) },
        data: {
            name: String(formData.get("name") || "").trim(),
            description: String(formData.get("description") || "").trim(),
            annualFee: Number(formData.get("annualFee") || 0),
        },
    });

    revalidatePath("/dashboard/settings");
}

async function toggleCategory(formData: FormData) {
    "use server";

    const id = String(formData.get("id"));
    const active = String(formData.get("active")) === "true";

    await prisma.membershipCategory.update({
        where: { id },
        data: { active: !active },
    });

    revalidatePath("/dashboard/settings");
}

async function deleteCategory(formData: FormData) {
    "use server";

    const id = String(formData.get("id"));

    const used = await prisma.membershipCategory.findUnique({
        where: { id },
        select: {
            _count: {
                select: {
                    members: true,
                    applications: true,
                },
            },
        },
    });

    if (used && (used._count.members > 0 || used._count.applications > 0)) {
        await prisma.membershipCategory.update({
            where: { id },
            data: { active: false },
        });
    } else {
        await prisma.membershipCategory.delete({ where: { id } });
    }

    revalidatePath("/dashboard/settings");
}

export default async function SettingsPage() {
    const categories = await prisma.membershipCategory.findMany({
        orderBy: { annualFee: "asc" },
    });

    const certificateSettings = await prisma.certificateSetting.upsert({
        where: { id: "main" },
        update: {},
        create: { id: "main" },
    });

    return (
        <SettingsCategoryClient
            categories={categories}
            certificateSettings={certificateSettings}
            addCategory={addCategory}
            updateCategory={updateCategory}
            toggleCategory={toggleCategory}
            deleteCategory={deleteCategory}
            saveCertificateSettings={saveCertificateSettings}
        />
    );
}
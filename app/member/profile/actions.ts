"use server";

import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { requireMemberSession } from "../session";
import crypto from "crypto";
async function getMemberId() {
    return await requireMemberSession();
}

function clean(value: FormDataEntryValue | null) {
    return String(value || "").trim();
}



function uploadsRoot() {
    return process.env.UPLOADS_DIR || "/home/ahpk/uploads";
}

async function saveProfileImage(file: File | null) {
    if (!file || file.size === 0) return null;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG and WEBP images are allowed.");
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        throw new Error("Profile image must be less than 5MB.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extMap: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
    };

    const ext = extMap[file.type] || "jpg";
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const uploadDir = path.join(uploadsRoot(), "profile-images");
    await mkdir(uploadDir, { recursive: true });

    await writeFile(path.join(uploadDir, fileName), buffer);

    return `/uploads/profile-images/${fileName}`;
}

export async function updateMemberProfileDetails(formData: FormData) {
    const memberId = await getMemberId();

    const fullName = clean(formData.get("fullName"));
    const email = clean(formData.get("email"));
    const phone = clean(formData.get("phone"));
    const county = clean(formData.get("county"));
    const position = clean(formData.get("position"));
    const employer = clean(formData.get("employer"));
    const isDirectoryVisible = formData.get("isDirectoryVisible") === "on";

    const imageFile = formData.get("profileImage") as File | null;
    const profileImageUrl = await saveProfileImage(imageFile);

    await prisma.member.update({
        where: { id: memberId },
        data: {
            fullName,
            email,
            phone,
            county,
            position,
            employer,
            isDirectoryVisible,
            ...(profileImageUrl ? { profileImageUrl } : {}),
        },
    });

    await createAuditLog({
        action: "MEMBER_PROFILE_UPDATED",
        entityType: "Member",
        entityId: memberId,
        metadata: {
            fullName,
            email,
            phone,
            county,
            position,
            employer,
            isDirectoryVisible,
            profileImageUpdated: Boolean(profileImageUrl),
        },
    });

    revalidatePath("/member/profile");
    revalidatePath("/directory");
    revalidatePath("/dashboard/audit-logs");
}

export async function addMemberEducation(formData: FormData) {
    const memberId = await getMemberId();

    await prisma.memberEducation.create({
        data: {
            memberId,
            level: clean(formData.get("level")),
            institution: clean(formData.get("institution")),
            year: clean(formData.get("year")),
            achievement: clean(formData.get("achievement")),
        },
    });

    revalidatePath("/member/profile");
}

export async function deleteMemberEducation(formData: FormData) {
    const memberId = await getMemberId();
    const id = clean(formData.get("id"));

    const item = await prisma.memberEducation.findFirst({
        where: { id, memberId },
    });

    if (!item) throw new Error("Education record not found.");

    await prisma.memberEducation.delete({
        where: { id },
    });

    revalidatePath("/member/profile");
}

export async function addMemberWorkExperience(formData: FormData) {
    const memberId = await getMemberId();

    const startDate = clean(formData.get("startDate"));
    const endDate = clean(formData.get("endDate"));

    await prisma.memberWorkExperience.create({
        data: {
            memberId,
            company: clean(formData.get("company")),
            position: clean(formData.get("position")),
            year: clean(formData.get("year")),
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null,
        },
    });

    revalidatePath("/member/profile");
}

export async function deleteMemberWorkExperience(formData: FormData) {
    const memberId = await getMemberId();
    const id = clean(formData.get("id"));

    const item = await prisma.memberWorkExperience.findFirst({
        where: { id, memberId },
    });

    if (!item) throw new Error("Work experience record not found.");

    await prisma.memberWorkExperience.delete({
        where: { id },
    });

    revalidatePath("/member/profile");
}
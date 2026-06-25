"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function generateMemberNumber() {
    const year = new Date().getFullYear();
    const count = await prisma.member.count();

    return `AHPK-${year}-${String(count + 1).padStart(5, "0")}`;
}

function addOneYear(date: Date) {
    const next = new Date(date);
    next.setFullYear(next.getFullYear() + 1);
    return next;
}

export async function createMember(formData: FormData) {
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const categoryId = String(formData.get("categoryId") || "").trim();
    const status = String(formData.get("status") || "ACTIVE") as
        | "ACTIVE"
        | "EXPIRED"
        | "SUSPENDED";

    const expiryDateRaw = String(formData.get("expiryDate") || "").trim();

    if (!fullName || !categoryId) {
        throw new Error("Full name and category are required.");
    }

    const joinDate = new Date();
    const expiryDate = expiryDateRaw ? new Date(expiryDateRaw) : addOneYear(joinDate);
    const memberNumber = await generateMemberNumber();

    await prisma.member.create({
        data: {
            fullName,
            email: email || null,
            phone: phone || null,
            categoryId,
            memberNumber,
            joinDate,
            expiryDate,
            status,
        },
    });

    revalidatePath("/dashboard/members");
}
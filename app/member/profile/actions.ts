"use server";

import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateMemberDirectoryProfile(formData: FormData) {
    const cookieStore = await cookies();
    const memberId = cookieStore.get("memberId")?.value;

    if (!memberId) {
        throw new Error("Not authenticated.");
    }

    const county = String(formData.get("county") || "").trim();
    const position = String(formData.get("position") || "").trim();
    const employer = String(formData.get("employer") || "").trim();
    const isDirectoryVisible = formData.get("isDirectoryVisible") === "on";

    await prisma.member.update({
        where: { id: memberId },
        data: {
            county,
            position,
            employer,
            isDirectoryVisible,
        },
    });

    await createAuditLog({
        action: "MEMBER_PROFILE_UPDATED",
        entityType: "Member",
        entityId: memberId,
        metadata: {
            county,
            position,
            employer,
            isDirectoryVisible,
        },
    });

    revalidatePath("/member/profile");
    revalidatePath("/directory");
    revalidatePath("/dashboard/audit-logs");
}
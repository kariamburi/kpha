"use server";

import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export async function toggleDirectoryVisibility(formData: FormData) {
    const memberId = String(formData.get("memberId") || "");
    const visible = formData.get("visible") === "true";

    if (!memberId) return;

    const member = await prisma.member.update({
        where: { id: memberId },
        data: {
            isDirectoryVisible: visible,
        },
    });

    await createAuditLog({
        action: visible ? "MEMBER_DIRECTORY_SHOWN" : "MEMBER_DIRECTORY_HIDDEN",
        entityType: "Member",
        entityId: member.id,
        metadata: {
            memberNumber: member.memberNumber,
            fullName: member.fullName,
            isDirectoryVisible: visible,
        },
    });

    revalidatePath("/dashboard/member-directory");
    revalidatePath("/directory");
    revalidatePath("/dashboard/audit-logs");
}
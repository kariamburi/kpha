"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { isSuperAdmin } from "@/lib/roles";

export async function deleteAuditLog(formData: FormData) {
    const user = await getAuthUser();

    if (!user || !isSuperAdmin(user.role)) {
        throw new Error("Unauthorized");
    }

    const id = String(formData.get("id") || "");

    if (!id) {
        throw new Error("Audit log ID is required");
    }

    await prisma.auditLog.delete({
        where: { id },
    });

    revalidatePath("/dashboard/audit-logs");
}
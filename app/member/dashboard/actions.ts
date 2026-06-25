"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireMemberSession } from "../session";

export async function markNotificationRead(formData: FormData) {
    const memberId = await requireMemberSession();
    const notificationId = String(formData.get("notificationId") || "");

    if (!notificationId) return;

    await prisma.notification.updateMany({
        where: {
            id: notificationId,
            memberId,
        },
        data: {
            read: true,
        },
    });

    revalidatePath("/member/dashboard");
}
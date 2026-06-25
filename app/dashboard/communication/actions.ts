"use server";

import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export async function createAnnouncement(formData: FormData) {
    const title = String(formData.get("title") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const type = String(formData.get("type") || "GENERAL") as
        | "GENERAL"
        | "RENEWAL"
        | "EVENT"
        | "POLICY"
        | "NEWSLETTER";
    const published = formData.get("published") === "on";

    if (!title || !message) {
        throw new Error("Title and message are required.");
    }

    const announcement = await prisma.announcement.create({
        data: {
            title,
            message,
            type,
            published,
        },
    });

    await createAuditLog({
        action: "ANNOUNCEMENT_CREATED",
        entityType: "Announcement",
        entityId: announcement.id,
        metadata: { title, type, published },
    });

    revalidatePath("/dashboard/communication");
    revalidatePath("/member/dashboard");
    revalidatePath("/dashboard/audit-logs");
}

export async function deleteAnnouncement(formData: FormData) {
    const id = String(formData.get("id") || "");
    if (!id) return;

    await prisma.announcement.delete({
        where: { id },
    });

    await createAuditLog({
        action: "ANNOUNCEMENT_DELETED",
        entityType: "Announcement",
        entityId: id,
    });

    revalidatePath("/dashboard/communication");
    revalidatePath("/member/dashboard");
    revalidatePath("/dashboard/audit-logs");
}

export async function createNotificationForAllMembers(formData: FormData) {
    const title = String(formData.get("title") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!title || !message) {
        throw new Error("Title and message are required.");
    }

    const members = await prisma.member.findMany({
        where: {
            status: "ACTIVE",
        },
        select: {
            id: true,
        },
    });

    if (members.length > 0) {
        await prisma.notification.createMany({
            data: members.map((member) => ({
                memberId: member.id,
                title,
                message,
            })),
        });
    }

    await createAuditLog({
        action: "NOTIFICATION_SENT_TO_ALL_MEMBERS",
        entityType: "Notification",
        metadata: {
            title,
            recipients: members.length,
        },
    });

    revalidatePath("/dashboard/communication");
    revalidatePath("/member/dashboard");
    revalidatePath("/dashboard/audit-logs");
}

export async function createEmailCampaign(formData: FormData) {
    const subject = String(formData.get("subject") || "").trim();
    const body = String(formData.get("body") || "").trim();
    const audience = String(formData.get("audience") || "ALL_MEMBERS").trim();

    if (!subject || !body) {
        throw new Error("Subject and body are required.");
    }

    const campaign = await prisma.emailCampaign.create({
        data: {
            subject,
            body,
            audience,
            sent: false,
            sentAt: null,
        },
    });

    await createAuditLog({
        action: "EMAIL_CAMPAIGN_CREATED",
        entityType: "EmailCampaign",
        entityId: campaign.id,
        metadata: { subject, audience },
    });

    revalidatePath("/dashboard/communication");
    revalidatePath("/dashboard/audit-logs");
}

export async function markCampaignSent(formData: FormData) {
    const id = String(formData.get("id") || "");
    if (!id) return;

    await prisma.emailCampaign.update({
        where: { id },
        data: {
            sent: true,
            sentAt: new Date(),
        },
    });

    await createAuditLog({
        action: "EMAIL_CAMPAIGN_MARKED_SENT",
        entityType: "EmailCampaign",
        entityId: id,
    });

    revalidatePath("/dashboard/communication");
    revalidatePath("/dashboard/audit-logs");
}
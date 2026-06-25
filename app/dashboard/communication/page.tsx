import { prisma } from "@/lib/prisma";
import {
    createAnnouncement,
    createEmailCampaign,
    createNotificationForAllMembers,
    deleteAnnouncement,
    markCampaignSent,
} from "./actions";
import CommunicationClient from "./CommunicationClient";

export default async function CommunicationPage() {
    const [announcements, campaigns, notificationsCount] = await Promise.all([
        prisma.announcement.findMany({
            orderBy: { createdAt: "desc" },
        }),
        prisma.emailCampaign.findMany({
            orderBy: { createdAt: "desc" },
        }),
        prisma.notification.count(),
    ]);

    return (
        <CommunicationClient
            announcements={announcements}
            campaigns={campaigns}
            notificationsCount={notificationsCount}
            createAnnouncement={createAnnouncement}
            createEmailCampaign={createEmailCampaign}
            createNotificationForAllMembers={createNotificationForAllMembers}
            deleteAnnouncement={deleteAnnouncement}
            markCampaignSent={markCampaignSent}
        />
    );
}
import { prisma } from "@/lib/prisma";
import { deleteWebsitePage, saveWebsitePage } from "./actions";
import WebsitePagesClient from "./WebsitePagesClient";


export default async function AdminWebsitePagesPage() {
    const pages = await prisma.websitePage.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <WebsitePagesClient
            pages={pages}
            saveWebsitePage={saveWebsitePage}
            deleteWebsitePage={deleteWebsitePage}
        />
    );
}
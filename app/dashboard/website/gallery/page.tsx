import { prisma } from "@/lib/prisma";
import { deleteGalleryAlbum, saveGalleryAlbum } from "./actions";
import GalleryClient from "./GalleryClient";


export const dynamic = "force-dynamic";

export default async function GalleryDashboardPage() {
    const albums: any = await prisma.galleryAlbum.findMany({
        orderBy: [
            {
                order: "asc",
            },
            {
                eventDate: "desc",
            },
            {
                createdAt: "desc",
            },
        ],
        include: {
            items: {
                select: {
                    id: true,
                    type: true,
                },
            },
        },
    });

    return (
        <GalleryClient
            albums={albums}
            saveGalleryAlbum={saveGalleryAlbum}
            deleteGalleryAlbum={deleteGalleryAlbum}
        />
    );
}

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MediaClient from "./MediaClient";
import { addYouTubeVideo, deleteGalleryItem, moveGalleryItem, setAlbumCover, updateGalleryItem, uploadGalleryImages } from "./actions";
export const dynamic = "force-dynamic";

type PageProps = {
    params: Promise<{
        albumId: string;
    }>;
};

export default async function GalleryMediaPage({
    params,
}: PageProps) {
    const { albumId } = await params;

    const album: any = await prisma.galleryAlbum.findUnique({
        where: {
            id: albumId,
        },
        include: {
            items: {
                orderBy: [
                    {
                        order: "asc",
                    },
                    {
                        createdAt: "asc",
                    },
                ],
            },
        },
    });

    if (!album) {
        notFound();
    }

    return (
        <MediaClient
            album={album}
            uploadGalleryImages={uploadGalleryImages}
            addYouTubeVideo={addYouTubeVideo}
            updateGalleryItem={updateGalleryItem}
            deleteGalleryItem={deleteGalleryItem}
            setAlbumCover={setAlbumCover}
            moveGalleryItem={moveGalleryItem}
        />
    );
}
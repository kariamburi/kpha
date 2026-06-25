import { prisma } from "@/lib/prisma";
import { deleteNewsPost, saveNewsPost } from "./actions";
import NewsClient from "./NewsClient";

export default async function AdminNewsPage() {
    const posts = await prisma.newsPost.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <NewsClient
            posts={posts}
            saveNewsPost={saveNewsPost}
            deleteNewsPost={deleteNewsPost}
        />
    );
}
import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://ahpk.or.ke";

    const publicPages = [
        "",
        "/about",
        "/executive-summary",
        "/corporate-statements",
        "/directory",
        "/events",
        "/resources",
        "/news",
        "/leadership",
        "/apply",
        "/verify",
        "/contact",
    ];

    const [newsPosts, events, memberSectionPages] = await Promise.all([
        prisma.newsPost.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true, createdAt: true },
        }),

        prisma.event.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true, createdAt: true },
        }),

        prisma.websitePage.findMany({
            where: {
                published: true,
                slug: {
                    notIn: [
                        "home",
                        "about",
                        "executive-summary",
                        "corporate-statements",
                        "contact",
                    ],
                },
            },
            select: { slug: true, updatedAt: true, createdAt: true },
        }),
    ]);

    const staticRoutes: MetadataRoute.Sitemap = publicPages.map((page) => ({
        url: `${baseUrl}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority:
            page === ""
                ? 1
                : ["/apply", "/verify", "/directory"].includes(page)
                    ? 0.9
                    : 0.8,
    }));

    const newsRoutes: MetadataRoute.Sitemap = newsPosts.map((post) => ({
        url: `${baseUrl}/news/${post.slug}`,
        lastModified: post.updatedAt || post.createdAt,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
        url: `${baseUrl}/events/${event.slug}`,
        lastModified: event.updatedAt || event.createdAt,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const memberSectionRoutes: MetadataRoute.Sitemap = memberSectionPages.map((page) => ({
        url: `${baseUrl}/members-section/${page.slug}`,
        lastModified: page.updatedAt || page.createdAt,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [
        ...staticRoutes,
        ...newsRoutes,
        ...eventRoutes,
        ...memberSectionRoutes,
    ];
}
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/dashboard",
                "/dashboard/",
                "/member/profile",
                "/member/profile/",
                "/member/dashboard/",
                "/member/certificates/",
                "/member/payments",
                "/member/renewal",
            ],
        },
        sitemap: "https://ahpk.or.ke/sitemap.xml",
        host: "https://ahpk.or.ke",
    };
}
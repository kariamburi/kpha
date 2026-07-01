import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MemberSectionContentPage from "@/app/components/public/MemberSectionContentPage";
import BreadcrumbJsonLd from "@/app/components/seo/BreadcrumbJsonLd";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const page = await prisma.websitePage.findUnique({
        where: { slug },
    });

    if (!page || !page.published) {
        return {
            title: "Page Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const description =
        page.subtitle ||
        page.content?.replace(/\s+/g, " ").slice(0, 160) ||
        "AHPK members section information and resources.";

    return {
        title: page.title,
        description,
        alternates: {
            canonical: `/members-section/${slug}`,
        },
        openGraph: {
            title: page.title,
            description,
            url: `/members-section/${slug}`,
            type: "article",
            images: page.imageUrl
                ? [
                    {
                        url: page.imageUrl,
                        width: 1200,
                        height: 630,
                        alt: page.title,
                    },
                ]
                : ["/images/og-image.jpg"],
        },
        twitter: {
            card: "summary_large_image",
            title: page.title,
            description,
            images: page.imageUrl ? [page.imageUrl] : ["/images/og-image.jpg"],
        },
    };
}

export default async function MembersSectionPage({ params }: Props) {
    const { slug } = await params;

    const page = await prisma.websitePage.findUnique({
        where: { slug },
    });

    if (!page || !page.published) notFound();

    return (<>
        <BreadcrumbJsonLd
            items={[
                { name: "Home", url: "/" },
                { name: "Members Section", url: "/members-section" },
                { name: page.title, url: `/members-section/${slug}` },
            ]}
        />
        <MemberSectionContentPage
            eyebrow="Members Section"
            title={page.title}
            subtitle={page.subtitle}
            content={page.content}
            activePath={`/members-section/${slug}`}
        /></>
    );
}
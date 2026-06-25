import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import WebsiteContentPage from "../../components/public/WebsiteContentPage";
import MemberSectionContentPage from "@/app/components/public/MemberSectionContentPage";

export default async function MembersSectionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const page = await prisma.websitePage.findUnique({
        where: { slug },
    });

    if (!page || !page.published) notFound();

    return (
        <MemberSectionContentPage
            eyebrow="Members Section"
            title={page.title}
            subtitle={page.subtitle}
            content={page.content}
            activePath={`/members-section/${slug}`}
        />
    );
}
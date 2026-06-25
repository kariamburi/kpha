import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import WebsiteContentPage from "../components/public/WebsiteContentPage";

export default async function CorporateStatementsPage() {
    const page = await prisma.websitePage.findUnique({
        where: { slug: "corporate-statements" },
    });

    if (!page || !page.published) notFound();

    return (
        <WebsiteContentPage
            eyebrow="About AHPK"
            title={page.title}
            subtitle={page.subtitle}
            content={page.content}
            activePath="/corporate-statements"
        />
    );
}
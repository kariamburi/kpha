import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ApplyClient from "./ApplyClient";
import BreadcrumbJsonLd from "../components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
    title: "Apply for Membership",
    description:
        "Review AHPK membership requirements, prepare your documents, and apply online to the Association of Hotel Professionals Kenya.",
    alternates: { canonical: "/apply" },
};

export default async function ApplyPage() {
    const categories = await prisma.membershipCategory.findMany({
        where: { active: true },
        orderBy: { annualFee: "asc" },
    });

    return (
        <>
            <BreadcrumbJsonLd items={[
                { name: "Home", url: "/" },
                { name: "Apply for Membership", url: "/apply" },
            ]} />
            <ApplyClient categories={categories} />
        </>
    );
}

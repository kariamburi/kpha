import { prisma } from "@/lib/prisma";
import ApplyClient from "./ApplyClient";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Apply for Membership",
    description:
        "Apply online for AHPK membership and join the Association of Hotel Professionals Kenya through the digital membership application portal.",
    alternates: {
        canonical: "/apply",
    },
};
export default async function ApplyPage() {
    const categories = await prisma.membershipCategory.findMany({
        where: { active: true },
        orderBy: { annualFee: "asc" },
    });

    return <ApplyClient categories={categories} />;
}
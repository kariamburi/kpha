import { prisma } from "@/lib/prisma";
import ApplyClient from "./ApplyClient";

export default async function ApplyPage() {
    const categories = await prisma.membershipCategory.findMany({
        where: { active: true },
        orderBy: { annualFee: "asc" },
    });

    return <ApplyClient categories={categories} />;
}
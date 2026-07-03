import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

type TokenPayload = {
    id: string;
    email: string;
    role: string;
};

export async function getAuthUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("ahpk_token")?.value;

    if (!token) return null;

    const payload = verifyToken<TokenPayload>(token);
    if (!payload?.id) return null;

    const member = await prisma.member.findUnique({
        where: { id: payload.id },
        select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            adminRole: true,
            adminStatus: true,
            createdAt: true,
        },
    });

    if (!member || member.adminStatus !== "ACTIVE" || !member.adminRole) {
        return null;
    }

    return {
        id: member.id,
        name: member.fullName,
        email: member.email,
        phone: member.phone,
        role: member.adminRole,
        status: member.adminStatus,
        createdAt: member.createdAt,
    };
}
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

    const user = await prisma.user.findUnique({
        where: { id: payload.id },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            createdAt: true,
        },
    });

    if (!user || user.status !== "ACTIVE") return null;

    return user;
}
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { Role, UserStatus } from "@/app/generated/prisma/client";


type TokenPayload = {
    id: string;
    email?: string;
    role?: string;
};

export type AuthUser = {
    id: string;
    fullName: string;
    name: string;
    email: string;
    phone: string | null;
    adminRole: Role;
    adminStatus: UserStatus;
};

export async function getAuthUser(): Promise<AuthUser | null> {
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
        },
    });

    if (!member || member.adminStatus !== "ACTIVE" || !member.adminRole) {
        return null;
    }
    const safeEmail = member.email || "";
    const safeName = member.fullName || safeEmail || "Admin User";

    return {
        id: member.id,
        fullName: safeName,
        name: safeName,
        email: safeEmail,
        phone: member.phone,
        adminRole: member.adminRole,
        adminStatus: member.adminStatus,
    };
}
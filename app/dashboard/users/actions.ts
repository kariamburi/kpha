"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { isSuperAdmin } from "@/lib/roles";
import { hashPassword } from "@/lib/password";

async function requireSuperAdmin() {
    const user = await getAuthUser();

    if (!user || !isSuperAdmin(user.adminRole)) {
        throw new Error("Unauthorized");
    }

    return user;
}

function generateTempPassword() {
    return `AHPK-${Math.random().toString(36).slice(2, 8)}-${Date.now()
        .toString()
        .slice(-4)}`;
}

export async function updateMemberAdminAccess(formData: FormData) {
    const currentUser = await requireSuperAdmin();

    const id = String(formData.get("id") || "").trim();
    const adminRole = String(formData.get("adminRole") || "").trim();
    const adminStatus = String(formData.get("adminStatus") || "INACTIVE").trim();

    if (!id) throw new Error("Member ID is required");

    if (id === currentUser.id && adminStatus !== "ACTIVE") {
        throw new Error("You cannot disable your own admin access.");
    }

    if (adminRole && !["SUPER_ADMIN", "ADMIN", "FINANCE"].includes(adminRole)) {
        throw new Error("Invalid admin role");
    }

    if (!["ACTIVE", "INACTIVE", "SUSPENDED"].includes(adminStatus)) {
        throw new Error("Invalid admin status");
    }

    const member = await prisma.member.findUnique({
        where: { id },
        include: { user: true },
    });

    if (!member) throw new Error("Member not found");

    let userId = member.userId;

    if (adminRole && !userId) {
        if (!member.email) {
            throw new Error("Member must have an email before admin access can be enabled.");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: member.email.toLowerCase() },
        });

        if (existingUser) {
            userId = existingUser.id;
        } else {
            const tempPassword = generateTempPassword();
            const hashedPassword = await hashPassword(tempPassword);

            const user = await prisma.user.create({
                data: {
                    name: member.fullName || "AHPK Admin",
                    email: member.email.toLowerCase(),
                    phone: member.phone || null,
                    password: hashedPassword,
                    role: adminRole as any,
                    status: "ACTIVE",
                },
            });

            userId = user.id;
        }
    }

    if (adminRole && userId) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                name: member.fullName || "AHPK Admin",
                email: member.email || undefined,
                phone: member.phone || null,
                role: adminRole as any,
                status: adminStatus as any,
            },
        });
    }

    await prisma.member.update({
        where: { id },
        data: {
            userId,
            adminRole: adminRole ? (adminRole as any) : null,
            adminStatus: adminRole ? (adminStatus as any) : "INACTIVE",
        },
    });

    revalidatePath("/dashboard/users");
    revalidatePath("/member/dashboard");
}

export async function removeMemberAdminAccess(formData: FormData) {
    const currentUser = await requireSuperAdmin();

    const id = String(formData.get("id") || "").trim();

    if (!id) throw new Error("Member ID is required");

    if (id === currentUser.id) {
        throw new Error("You cannot remove your own admin access.");
    }

    const member = await prisma.member.findUnique({
        where: { id },
    });

    if (member?.userId) {
        await prisma.user.update({
            where: { id: member.userId },
            data: {
                role: "MEMBER",
                status: "INACTIVE",
            },
        });
    }

    await prisma.member.update({
        where: { id },
        data: {
            adminRole: null,
            adminStatus: "INACTIVE",
        },
    });

    revalidatePath("/dashboard/users");
    revalidatePath("/member/dashboard");
}
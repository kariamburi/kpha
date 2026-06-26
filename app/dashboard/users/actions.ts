"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { getAuthUser } from "@/lib/auth";
import { isSuperAdmin } from "@/lib/roles";

async function requireSuperAdmin() {
    const user = await getAuthUser();

    if (!user || !isSuperAdmin(user.role)) {
        throw new Error("Unauthorized");
    }

    return user;
}

export async function createDashboardUser(formData: FormData) {
    await requireSuperAdmin();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const role = String(formData.get("role") || "ADMIN");
    const password = String(formData.get("password") || "");

    if (!name || !email || !password) {
        throw new Error("Name, email and password are required");
    }

    if (!["SUPER_ADMIN", "ADMIN", "FINANCE"].includes(role)) {
        throw new Error("Invalid dashboard role");
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
        data: {
            name,
            email,
            phone: phone || null,
            role: role as any,
            status: "ACTIVE",
            password: hashedPassword,
        },
    });

    revalidatePath("/dashboard/users");
}

export async function updateDashboardUser(formData: FormData) {
    await requireSuperAdmin();

    const id = String(formData.get("id") || "");
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const role = String(formData.get("role") || "ADMIN");
    const status = String(formData.get("status") || "ACTIVE");

    if (!id || !name || !email) {
        throw new Error("Missing required fields");
    }

    if (!["SUPER_ADMIN", "ADMIN", "FINANCE"].includes(role)) {
        throw new Error("Invalid dashboard role");
    }

    if (!["ACTIVE", "INACTIVE", "SUSPENDED"].includes(status)) {
        throw new Error("Invalid status");
    }

    await prisma.user.update({
        where: { id },
        data: {
            name,
            email,
            phone: phone || null,
            role: role as any,
            status: status as any,
        },
    });

    revalidatePath("/dashboard/users");
}

export async function resetDashboardUserPassword(formData: FormData) {
    await requireSuperAdmin();

    const id = String(formData.get("id") || "");
    const password = String(formData.get("password") || "");

    if (!id || !password) {
        throw new Error("Password is required");
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
        where: { id },
        data: {
            password: hashedPassword,
        },
    });

    revalidatePath("/dashboard/users");
}

export async function deleteDashboardUser(formData: FormData) {
    const currentUser = await requireSuperAdmin();

    const id = String(formData.get("id") || "");

    if (!id) {
        throw new Error("User ID is required");
    }

    if (id === currentUser.id) {
        throw new Error("You cannot delete your own account");
    }

    await prisma.user.delete({
        where: { id },
    });

    revalidatePath("/dashboard/users");
}
"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { isSuperAdmin } from "@/lib/roles";

function deletePublicFile(fileUrl?: string | null) {
    if (!fileUrl) return;

    try {
        const cleanPath = fileUrl.startsWith("/") ? fileUrl.slice(1) : fileUrl;
        const filePath = path.join(process.cwd(), "public", cleanPath);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.error("DELETE_APPLICATION_FILE_ERROR", error);
    }
}

export async function deleteApplication(formData: FormData) {
    const user = await getAuthUser();

    if (!user || !isSuperAdmin(user.role)) {
        throw new Error("Unauthorized");
    }

    const id = String(formData.get("id") || "");

    if (!id) {
        throw new Error("Application ID is required");
    }

    const application = await prisma.membershipApplication.findUnique({
        where: { id },
        select: {
            id: true,
            idDocumentUrl: true,
            qualificationDocUrl: true,
            cvDocumentUrl: true,
        },
    });

    if (!application) {
        throw new Error("Application not found");
    }

    deletePublicFile(application.idDocumentUrl);
    deletePublicFile(application.qualificationDocUrl);
    deletePublicFile(application.cvDocumentUrl);

    await prisma.membershipApplication.delete({
        where: { id },
    });

    revalidatePath("/dashboard/applications");
}
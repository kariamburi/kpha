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
        console.error("DELETE_CERTIFICATE_FILE_ERROR", error);
    }
}

export async function deleteCertificate(formData: FormData) {
    const user = await getAuthUser();

    if (!user || !isSuperAdmin(user.role)) {
        throw new Error("Unauthorized");
    }

    const id = String(formData.get("id") || "");

    if (!id) {
        throw new Error("Certificate ID is required");
    }

    const certificate = await prisma.certificate.findUnique({
        where: { id },
        select: {
            id: true,
            pdfUrl: true,
        },
    });

    if (!certificate) {
        throw new Error("Certificate not found");
    }

    deletePublicFile(certificate.pdfUrl);

    await prisma.certificate.delete({
        where: { id },
    });

    revalidatePath("/dashboard/certificates");
}
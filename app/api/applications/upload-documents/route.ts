import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const applicationId = String(formData.get("applicationId") || "");
        const idDocument = formData.get("idDocument") as File | null;
        const qualificationDoc = formData.get("qualificationDoc") as File | null;
        const cvDocument = formData.get("cvDocument") as File | null;

        if (!applicationId || !idDocument || !qualificationDoc || !cvDocument) {
            return NextResponse.json(
                { ok: false, error: "Missing required documents." },
                { status: 400 }
            );
        }

        const uploadDir = path.join(
            process.cwd(),
            "public",
            "uploads",
            "applications",
            applicationId
        );

        await mkdir(uploadDir, { recursive: true });

        async function saveFile(file: File, name: string) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const ext = path.extname(file.name) || ".pdf";
            const fileName = `${name}-${Date.now()}${ext}`;
            const filePath = path.join(uploadDir, fileName);

            await writeFile(filePath, buffer);

            return `/uploads/applications/${applicationId}/${fileName}`;
        }

        const idDocumentUrl = await saveFile(idDocument, "id-document");
        const qualificationDocUrl = await saveFile(qualificationDoc, "qualification");
        const cvDocumentUrl = await saveFile(cvDocument, "cv");

        await prisma.membershipApplication.update({
            where: { id: applicationId },
            data: {
                idDocumentUrl,
                qualificationDocUrl,
                cvDocumentUrl,
            },
        });

        await createAuditLog({
            action: "APPLICATION_DOCUMENTS_UPLOADED",
            entityType: "MembershipApplication",
            entityId: applicationId,
            metadata: {
                idDocumentUrl,
                qualificationDocUrl,
                cvDocumentUrl,
            },
        });

        return NextResponse.json({
            ok: true,
            idDocumentUrl,
            qualificationDocUrl,
            cvDocumentUrl,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { ok: false, error: "Failed to upload documents." },
            { status: 500 }
        );
    }
}
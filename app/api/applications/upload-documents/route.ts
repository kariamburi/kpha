import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function uploadsRoot() {
    return process.env.UPLOADS_DIR || "/home/ahpk/uploads";
}

const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
];

const maxFileSize = 10 * 1024 * 1024;

function getExtension(file: File) {
    const extension = path.extname(file.name).toLowerCase();

    if ([".pdf", ".jpg", ".jpeg", ".png"].includes(extension)) {
        return extension;
    }

    switch (file.type) {
        case "application/pdf":
            return ".pdf";

        case "image/png":
            return ".png";

        case "image/jpeg":
        case "image/jpg":
            return ".jpg";

        default:
            return "";
    }
}

function validateFile(file: File, label: string) {
    if (!file || file.size === 0) {
        throw new Error(`${label} is required.`);
    }

    if (!allowedTypes.includes(file.type)) {
        throw new Error(`${label} must be a PDF, JPG or PNG file.`);
    }

    if (file.size > maxFileSize) {
        throw new Error(`${label} must be less than 10MB.`);
    }

    const extension = getExtension(file);

    if (!extension) {
        throw new Error(`${label} has an unsupported file extension.`);
    }

    return extension;
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const applicationId = String(
            formData.get("applicationId") || ""
        ).trim();

        const idDocument = formData.get("idDocument") as File | null;
        const qualificationDoc = formData.get(
            "qualificationDoc"
        ) as File | null;
        const cvDocument = formData.get("cvDocument") as File | null;

        if (
            !applicationId ||
            !idDocument ||
            !qualificationDoc ||
            !cvDocument
        ) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "Missing required documents.",
                },
                {
                    status: 400,
                }
            );
        }

        const application = await prisma.membershipApplication.findUnique({
            where: {
                id: applicationId,
            },
            select: {
                id: true,
            },
        });

        if (!application) {
            return NextResponse.json(
                {
                    ok: false,
                    error: "Membership application was not found.",
                },
                {
                    status: 404,
                }
            );
        }

        const uploadDir = path.join(
            uploadsRoot(),
            "applications",
            applicationId
        );

        await mkdir(uploadDir, {
            recursive: true,
        });

        async function saveFile(
            file: File,
            name: string,
            label: string
        ) {
            const extension = validateFile(file, label);

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${name}-${crypto.randomUUID()}${extension}`;
            const filePath = path.join(uploadDir, fileName);

            await writeFile(filePath, buffer);

            return `/uploads/applications/${applicationId}/${fileName}`;
        }

        const idDocumentUrl = await saveFile(
            idDocument,
            "id-document",
            "ID document"
        );

        const qualificationDocUrl = await saveFile(
            qualificationDoc,
            "qualification",
            "Qualification document"
        );

        const cvDocumentUrl = await saveFile(
            cvDocument,
            "cv",
            "CV document"
        );

        await prisma.membershipApplication.update({
            where: {
                id: applicationId,
            },
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
        console.error("UPLOAD_APPLICATION_DOCUMENTS_ERROR", error);

        return NextResponse.json(
            {
                ok: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to upload documents.",
            },
            {
                status: 500,
            }
        );
    }
}
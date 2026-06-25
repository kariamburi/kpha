import { prisma } from "@/lib/prisma";

type AuditInput = {
    userId?: string | null;
    action: string;
    entityType: string;
    entityId?: string | null;
    metadata?: unknown;
};

export async function createAuditLog({
    userId = null,
    action,
    entityType,
    entityId = null,
    metadata,
}: AuditInput) {
    await prisma.auditLog.create({
        data: {
            userId,
            action,
            entityType,
            entityId,
            metadata: metadata ? JSON.stringify(metadata) : null,
        },
    });
}
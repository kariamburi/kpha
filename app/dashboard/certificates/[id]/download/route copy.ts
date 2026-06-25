export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import QRCode from "qrcode";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const certificate = await prisma.certificate.findUnique({
        where: { id },
        include: {
            member: {
                include: {
                    user: true,
                    category: true,
                },
            },
        },
    });

    if (!certificate) notFound();

    const chunks: Buffer[] = [];

    const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 50,
    });

    const pdfBufferPromise = new Promise<Buffer>((resolve, reject) => {
        doc.on("data", (chunk: any) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", reject);
    });

    const memberName =
        certificate.member.fullName || certificate.member.user?.name || "Member";

    const category = certificate.member.category?.name || "Membership";

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verifyUrl = `${baseUrl}/verify/${certificate.verificationCode}`;

    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        margin: 1,
        width: 120,
    });



    doc
        .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
        .lineWidth(3)
        .stroke("#C1121F");

    const logoPath = path.join(process.cwd(), "app", "assets", "logo.png");

    if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath);
        const logoBase64 = logoBuffer.toString("base64");
        const logoDataUrl = `data:image/png;base64,${logoBase64}`;

        doc.image(logoDataUrl, doc.page.width / 2 - 45, 45, {
            width: 90,
        });
    }

    doc.y = 145;

    doc
        .fontSize(18)
        .fillColor("#C1121F")
        .text("Association of Hotel Professionals Kenya", {
            align: "center",
        });

    doc.moveDown(0.8);

    doc
        .fontSize(34)
        .fillColor("#111111")
        .text("CERTIFICATE OF MEMBERSHIP", {
            align: "center",
        });

    doc.moveDown(1.2);

    doc
        .fontSize(16)
        .fillColor("#555555")
        .text("This is to certify that", {
            align: "center",
        });

    doc.moveDown(0.6);

    doc
        .fontSize(30)
        .fillColor("#111111")
        .text(memberName.toUpperCase(), {
            align: "center",
        });

    doc.moveDown(0.6);

    doc
        .fontSize(16)
        .fillColor("#555555")
        .text(`is a registered ${category} of AHPK.`, {
            align: "center",
        });

    doc.fontSize(12).fillColor("#111111");

    const leftX = 80;
    const rightX = 300;

    doc.fontSize(12).fillColor("#111111");

    doc.text(
        `Member No: ${certificate.member.memberNumber}`,
        leftX,
        410
    );

    doc.text(
        `Issue Date: ${certificate.issueDate.toLocaleDateString()}`,
        rightX,
        410
    );

    doc.text(
        `Certificate No: ${certificate.certificateNumber}`,
        leftX,
        440
    );

    doc.text(
        `Expiry Date: ${certificate.expiryDate.toLocaleDateString()}`,
        rightX,
        440
    );

    doc.text(
        `Verification Code: ${certificate.verificationCode}`,
        leftX,
        470
    );
    doc.image(qrDataUrl, 500, 395, {
        width: 95,
        height: 95,
    });

    doc
        .fontSize(9)
        .fillColor("#777777")
        .text("Scan to verify", 498, 492, {
            width: 100,
            align: "center",
        });

    doc
        .fontSize(9)
        .fillColor("#777777")
        .text(
            "Verify this certificate using the verification code or QR code on the AHPK portal.",
            50,
            510,
            {
                width: doc.page.width - 100,
                align: "center",
                lineBreak: false,
            }
        );

    doc.end();

    const pdfBuffer = await pdfBufferPromise;
    await createAuditLog({
        action: "CERTIFICATE_DOWNLOADED",
        entityType: "Certificate",
        entityId: certificate.id,
        metadata: {
            certificateNumber: certificate.certificateNumber,
            memberId: certificate.memberId,
            memberNumber: certificate.member.memberNumber,
            memberName,
        },
    });
    return new Response(new Uint8Array(pdfBuffer), {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${certificate.certificateNumber}.pdf"`,
        },
    });
}
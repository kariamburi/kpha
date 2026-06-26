export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import QRCode from "qrcode";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-KE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

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
    const certificateSettings = await prisma.certificateSetting.upsert({
        where: { id: "main" },
        update: {},
        create: { id: "main" },
    });
    const chunks: Buffer[] = [];

    const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 40,
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
        width: 130,
    });

    const pageW = doc.page.width;
    const pageH = doc.page.height;

    // Background
    doc.rect(0, 0, pageW, pageH).fill("#fffdf8");

    // Decorative borders
    doc.save();
    doc.rect(18, 18, pageW - 36, pageH - 36).lineWidth(3).stroke("#C1121F");
    doc.rect(28, 28, pageW - 56, pageH - 56).lineWidth(1).stroke("#F3C64E");
    doc.rect(38, 38, pageW - 76, pageH - 76).lineWidth(1.2).stroke("#111111");
    doc.restore();

    // Corner decorations
    const cornerSize = 54;
    doc.save().lineWidth(4).strokeColor("#C1121F");
    doc.moveTo(52, 52).lineTo(52 + cornerSize, 52).stroke();
    doc.moveTo(52, 52).lineTo(52, 52 + cornerSize).stroke();

    doc.moveTo(pageW - 52, 52).lineTo(pageW - 52 - cornerSize, 52).stroke();
    doc.moveTo(pageW - 52, 52).lineTo(pageW - 52, 52 + cornerSize).stroke();

    doc.moveTo(52, pageH - 52).lineTo(52 + cornerSize, pageH - 52).stroke();
    doc.moveTo(52, pageH - 52).lineTo(52, pageH - 52 - cornerSize).stroke();

    doc.moveTo(pageW - 52, pageH - 52).lineTo(pageW - 52 - cornerSize, pageH - 52).stroke();
    doc.moveTo(pageW - 52, pageH - 52).lineTo(pageW - 52, pageH - 52 - cornerSize).stroke();
    doc.restore();

    // Soft decorative watermark
    doc.save();
    doc.circle(pageW - 130, 125, 95).fillOpacity(0.06).fill("#C1121F");
    doc.circle(120, pageH - 110, 80).fillOpacity(0.05).fill("#F3C64E");
    doc.restore();

    // Logo
    const logoPath = path.join(process.cwd(), "app", "assets", "logo.png");

    if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath);
        const logoBase64 = logoBuffer.toString("base64");
        const logoDataUrl = `data:image/png;base64,${logoBase64}`;

        doc.image(logoDataUrl, pageW / 2 - 42, 45, {
            width: 84,
        });
    }

    // Heading
    doc.fontSize(17)
        .fillColor("#C1121F")
        .font("Helvetica-Bold")
        .text("Association of Hotel Professionals Kenya", 70, 128, {
            width: pageW - 140,
            align: "center",
        });

    doc.fontSize(10)
        .fillColor("#111111")
        .font("Helvetica-Bold")
        .text("(AHPK)", 70, 150, {
            width: pageW - 140,
            align: "center",
            characterSpacing: 2,
        });

    doc.fontSize(40)
        .fillColor("#111111")
        .font("Times-Bold")
        .text("Certificate of Membership", 70, 178, {
            width: pageW - 140,
            align: "center",
        });

    // Decorative title line
    doc.save();
    doc.moveTo(250, 230).lineTo(pageW - 250, 230).lineWidth(1.5).stroke("#F3C64E");
    doc.restore();

    // Certificate body
    doc.fontSize(15)
        .fillColor("#444444")
        .font("Helvetica")
        .text("This is to certify that", 100, 250, {
            width: pageW - 200,
            align: "center",
        });

    doc.fontSize(32)
        .fillColor("#C1121F")
        .font("Times-Bold")
        .text(memberName.toUpperCase(), 100, 282, {
            width: pageW - 200,
            align: "center",
        });

    doc.moveTo(230, 324).lineTo(pageW - 230, 324).lineWidth(1).stroke("#999999");

    doc.fontSize(15)
        .fillColor("#444444")
        .font("Helvetica")
        .text(
            `of membership no. ${certificate.member.memberNumber} is a duly registered ${category} of the Association of Hotel Professionals Kenya.`,
            115,
            342,
            {
                width: pageW - 230,
                align: "center",
                lineGap: 4,
            }
        );

    doc.fontSize(13)
        .fillColor("#111111")
        .font("Helvetica-Bold")
        .text(
            `Valid from ${formatDate(certificate.issueDate)} to ${formatDate(certificate.expiryDate)}`,
            115,
            390,
            {
                width: pageW - 230,
                align: "center",
            }
        );

    // Details boxes
    const boxY = 415;
    const boxH = 58;
    const gap = 14;
    const boxW = 170;
    const startX = 74;

    const details = [
        ["Member No.", certificate.member.memberNumber],
        ["Certificate No.", certificate.certificateNumber],
        ["Verification Code", certificate.verificationCode],
    ];

    details.forEach(([label, value], index) => {
        const x = startX + index * (boxW + gap);

        doc.roundedRect(x, boxY, boxW, boxH, 12).fillAndStroke("#FFF7F7", "#F2D4D4");

        doc.fontSize(8)
            .fillColor("#C1121F")
            .font("Helvetica-Bold")
            .text(label.toUpperCase(), x + 12, boxY + 12, {
                width: boxW - 24,
            });

        doc.fontSize(11)
            .fillColor("#111111")
            .font("Helvetica-Bold")
            .text(value, x + 12, boxY + 30, {
                width: boxW - 24,
            });
    });

    // QR box
    const qrX = pageW - 200;
    const qrY = 410;

    doc.roundedRect(qrX - 12, qrY - 12, 140, 142, 16).fillAndStroke("#FFFFFF", "#E6E6E6");

    doc.image(qrDataUrl, qrX, qrY, {
        width: 116,
        height: 116,
    });

    doc.fontSize(8.5)
        .fillColor("#555555")
        .font("Helvetica-Bold")
        .text("Scan the code to verify this certificate", qrX - 6, qrY + 120, {
            width: 130,
            align: "center",
        });

    // Signatures from Settings
    const chairpersonName = certificateSettings.chairpersonName || "Chairperson";
    const secretaryName = certificateSettings.secretaryName || "Secretary";



    const signatureY = 475;
    const lineY = 515;
    const labelY = 521;
    const roleY = 533;

    const signatureW = 175;
    const signatureH = 45;

    const chairX = 95;
    const secretaryX = 350;

    function publicPathToFilePath(publicUrl?: string | null) {
        if (!publicUrl) return null;

        const cleanPath = publicUrl.startsWith("/")
            ? publicUrl.slice(1)
            : publicUrl;

        return path.join(process.cwd(), "public", cleanPath);
    }

    function imageFileToDataUrl(filePath: string) {
        const imageBuffer = fs.readFileSync(filePath);
        const ext = path.extname(filePath).replace(".", "").toLowerCase();

        const mime =
            ext === "jpg" || ext === "jpeg"
                ? "image/jpeg"
                : ext === "webp"
                    ? "image/webp"
                    : "image/png";

        return `data:${mime};base64,${imageBuffer.toString("base64")}`;
    }

    const chairSignaturePath = publicPathToFilePath(
        certificateSettings.chairpersonSignature
    );

    const secretarySignaturePath = publicPathToFilePath(
        certificateSettings.secretarySignature
    );

    if (chairSignaturePath && fs.existsSync(chairSignaturePath)) {
        doc.image(imageFileToDataUrl(chairSignaturePath), chairX, signatureY, {
            fit: [signatureW, signatureH],
            align: "center",
            valign: "center",
        });
    }

    if (secretarySignaturePath && fs.existsSync(secretarySignaturePath)) {
        doc.image(imageFileToDataUrl(secretarySignaturePath), secretaryX, signatureY, {
            fit: [signatureW, signatureH],
            align: "center",
            valign: "center",
        });
    }

    doc.moveTo(chairX, lineY)
        .lineTo(chairX + signatureW, lineY)
        .lineWidth(1)
        .stroke("#111111");

    doc.fontSize(7)
        .fillColor("#777777")
        .font("Helvetica-Bold")
        .text(chairpersonName, chairX, labelY, {
            width: signatureW,
            align: "center",
            lineBreak: false,
        });

    doc.fontSize(8)
        .fillColor("#555555")
        .font("Helvetica-Bold")
        .text("Chairperson", chairX, roleY, {
            width: signatureW,
            align: "center",
            lineBreak: false,
        });

    doc.moveTo(secretaryX, lineY)
        .lineTo(secretaryX + signatureW, lineY)
        .lineWidth(1)
        .stroke("#111111");

    doc.fontSize(7)
        .fillColor("#777777")
        .font("Helvetica-Bold")
        .text(secretaryName, secretaryX, labelY, {
            width: signatureW,
            align: "center",
            lineBreak: false,
        });

    doc.fontSize(8)
        .fillColor("#555555")
        .font("Helvetica-Bold")
        .text("Secretary", secretaryX, roleY, {
            width: signatureW,
            align: "center",
            lineBreak: false,
        });

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
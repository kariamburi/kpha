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
        margin: 0,
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
        width: 150,
    });

    const pageW = doc.page.width;
    const pageH = doc.page.height;

    const red = "#C1121F";
    const darkRed = "#8F0610";
    const black = "#111111";
    const gold = "#D6A12A";
    const lightGold = "#F3C64E";
    const cream = "#FFFDF8";

    // Background
    doc.rect(0, 0, pageW, pageH).fill(cream);

    // Soft diagonal background pattern
    doc.save();
    doc.strokeColor("#F4EBDD").lineWidth(0.4).opacity(0.45);
    for (let x = -pageH; x < pageW; x += 12) {
        doc.moveTo(x, pageH).lineTo(x + pageH, 0).stroke();
    }
    doc.restore();

    // Premium curved top-left ribbons
    doc.save();
    doc.fillColor(black);
    doc.moveTo(0, 0)
        .lineTo(260, 0)
        .bezierCurveTo(115, 30, 30, 120, 0, 240)
        .lineTo(0, 0)
        .fill();

    doc.fillColor(red);
    doc.moveTo(0, 0)
        .lineTo(230, 0)
        .bezierCurveTo(100, 35, 28, 115, 0, 205)
        .lineTo(0, 0)
        .fill();

    doc.strokeColor(gold).lineWidth(4);
    doc.moveTo(0, 210).bezierCurveTo(40, 110, 105, 42, 235, 0).stroke();

    doc.strokeColor(lightGold).lineWidth(1.3);
    doc.moveTo(0, 185).bezierCurveTo(35, 95, 95, 35, 205, 0).stroke();
    doc.restore();

    // Premium curved bottom-right ribbons
    doc.save();
    doc.fillColor(black);
    doc.moveTo(pageW, pageH)
        .lineTo(pageW - 280, pageH)
        .bezierCurveTo(pageW - 125, pageH - 25, pageW - 35, pageH - 120, pageW, pageH - 250)
        .lineTo(pageW, pageH)
        .fill();

    doc.fillColor(red);
    doc.moveTo(pageW, pageH)
        .lineTo(pageW - 235, pageH)
        .bezierCurveTo(pageW - 105, pageH - 35, pageW - 25, pageH - 110, pageW, pageH - 210)
        .lineTo(pageW, pageH)
        .fill();

    doc.strokeColor(gold).lineWidth(4);
    doc.moveTo(pageW - 260, pageH)
        .bezierCurveTo(pageW - 120, pageH - 35, pageW - 35, pageH - 115, pageW, pageH - 230)
        .stroke();

    doc.strokeColor(lightGold).lineWidth(1.3);
    doc.moveTo(pageW - 220, pageH)
        .bezierCurveTo(pageW - 95, pageH - 35, pageW - 25, pageH - 100, pageW, pageH - 190)
        .stroke();
    doc.restore();

    // Top-right hanging ribbon
    doc.save();
    const ribbonX = pageW - 150;
    doc.fillColor(red);
    doc.rect(ribbonX, 0, 70, 145).fill();
    doc.fillColor(darkRed);
    doc.rect(ribbonX + 6, 0, 58, 145).fill();
    doc.fillColor(red);
    doc.moveTo(ribbonX + 6, 145)
        .lineTo(ribbonX + 35, 112)
        .lineTo(ribbonX + 64, 145)
        .lineTo(ribbonX + 64, 0)
        .lineTo(ribbonX + 6, 0)
        .fill();

    doc.strokeColor(gold).lineWidth(2);
    doc.moveTo(ribbonX + 8, 0).lineTo(ribbonX + 8, 135).stroke();
    doc.moveTo(ribbonX + 62, 0).lineTo(ribbonX + 62, 135).stroke();
    doc.moveTo(ribbonX + 8, 135)
        .lineTo(ribbonX + 35, 105)
        .lineTo(ribbonX + 62, 135)
        .stroke();
    doc.restore();

    // Elegant double frame
    doc.save();
    doc.strokeColor(gold).lineWidth(2);
    doc.roundedRect(22, 22, pageW - 44, pageH - 44, 8).stroke();

    doc.strokeColor(lightGold).lineWidth(0.8);
    doc.roundedRect(30, 30, pageW - 60, pageH - 60, 6).stroke();

    doc.strokeColor(gold).lineWidth(1.2);
    doc.roundedRect(42, 42, pageW - 84, pageH - 84, 5).stroke();
    doc.restore();

    // Decorative corner ornaments
    const ornament = (x: number, y: number, flipX = false, flipY = false) => {
        doc.save();
        doc.translate(x, y);
        doc.scale(flipX ? -1 : 1, flipY ? -1 : 1);
        doc.strokeColor(gold).lineWidth(1.4);
        doc.moveTo(0, 0).lineTo(34, 0).quadraticCurveTo(48, 0, 48, 14).lineTo(48, 34).stroke();
        doc.moveTo(10, 10).lineTo(30, 10).quadraticCurveTo(38, 10, 38, 18).lineTo(38, 30).stroke();
        doc.restore();
    };

    ornament(38, 38);
    ornament(pageW - 38, 38, true, false);
    ornament(38, pageH - 38, false, true);
    ornament(pageW - 38, pageH - 38, true, true);

    // Logo watermark
    const logoPath = path.join(process.cwd(), "app", "assets", "logo.png");

    if (fs.existsSync(logoPath)) {
        const logoDataUrl = imageFileToDataUrl(logoPath);

        doc.save();
        doc.opacity(0.045);
        doc.image(logoDataUrl, pageW / 2 - 130, pageH / 2 - 120, {
            width: 260,
        });
        doc.restore();
    }

    // Header branding
    if (fs.existsSync(logoPath)) {
        const logoDataUrl = imageFileToDataUrl(logoPath);

        doc.image(logoDataUrl, pageW / 2 - 145, 52, {
            width: 82,
        });
    }

    doc.save();
    doc.strokeColor("#222222").lineWidth(1.1);
    doc.moveTo(pageW / 2 - 42, 58).lineTo(pageW / 2 - 42, 128).stroke();
    doc.restore();

    doc.fontSize(28)
        .fillColor(red)
        .font("Helvetica-Bold")
        .text("AHPK", pageW / 2 - 18, 58, {
            width: 250,
            align: "left",
        });

    doc.fontSize(14)
        .fillColor(black)
        .font("Helvetica-Bold")
        .text("ASSOCIATION OF\nHOTEL PROFESSIONALS\nKENYA", pageW / 2 - 18, 90, {
            width: 250,
            align: "left",
            lineGap: 2,
        });

    // Title
    doc.fontSize(37)
        .fillColor(black)
        .font("Times-Bold")
        .text("CERTIFICATE OF MEMBERSHIP", 90, 168, {
            width: pageW - 180,
            align: "center",
            characterSpacing: 0.5,
        });

    // Presented line
    doc.save();
    const midY = 222;
    doc.strokeColor(gold).lineWidth(1.2);
    doc.moveTo(pageW / 2 - 210, midY).lineTo(pageW / 2 - 100, midY).stroke();
    doc.moveTo(pageW / 2 + 100, midY).lineTo(pageW / 2 + 210, midY).stroke();
    doc.fillColor(gold);
    doc.circle(pageW / 2 - 215, midY, 3).fill();
    doc.circle(pageW / 2 - 95, midY, 3).fill();
    doc.circle(pageW / 2 + 95, midY, 3).fill();
    doc.circle(pageW / 2 + 215, midY, 3).fill();
    doc.restore();

    doc.fontSize(11)
        .fillColor(black)
        .font("Times-Bold")
        .text("THIS IS TO CERTIFY THAT", pageW / 2 - 90, 213, {
            width: 180,
            align: "center",
            characterSpacing: 4,
        });

    // Member name
    doc.fontSize(31)
        .fillColor(red)
        .font("Times-BoldItalic")
        .text(memberName.toUpperCase(), 85, 252, {
            width: pageW - 170,
            align: "center",
        });

    doc.save();
    doc.strokeColor(gold).lineWidth(0.8);
    doc.moveTo(175, 312).lineTo(pageW - 175, 312).stroke();

    doc.fillColor(gold);
    doc.fontSize(16)
        .font("Times-Roman")
        .text("❦", pageW / 2 - 15, 302, {
            width: 30,
            align: "center",
        });
    doc.restore();

    // Body content
    doc.fontSize(15)
        .fillColor("#222222")
        .font("Times-Roman")
        .text(
            `of membership no. ${certificate.member.memberNumber} is a duly registered ${category} of the Association of Hotel Professionals Kenya.`,
            135,
            335,
            {
                width: pageW - 270,
                align: "center",
                lineGap: 5,
            }
        );

    doc.fontSize(12.5)
        .fillColor(black)
        .font("Helvetica-Bold")
        .text(
            `Valid from ${formatDate(certificate.issueDate)} to ${formatDate(certificate.expiryDate)}`,
            120,
            388,
            {
                width: pageW - 240,
                align: "center",
            }
        );

    // Details footer
    const footerY = 430;
    const detailW = 165;
    const detailGap = 14;
    const totalW = detailW * 3 + detailGap * 2;
    const detailStartX = pageW / 2 - totalW / 2;

    const details = [
        ["Member No.", certificate.member.memberNumber],
        ["Certificate No.", certificate.certificateNumber],
        ["Verification Code", certificate.verificationCode],
    ];

    details.forEach(([label, value], index) => {
        const x = detailStartX + index * (detailW + detailGap);

        doc.roundedRect(x, footerY, detailW, 48, 10).fillAndStroke("#FFFFFF", "#E8C878");

        doc.fontSize(7.5)
            .fillColor(red)
            .font("Helvetica-Bold")
            .text(label.toUpperCase(), x + 12, footerY + 10, {
                width: detailW - 24,
                align: "center",
            });

        doc.fontSize(10)
            .fillColor(black)
            .font("Helvetica-Bold")
            .text(value, x + 12, footerY + 27, {
                width: detailW - 24,
                align: "center",
            });
    });

    // QR verification box
    const qrX = pageW - 170;
    const qrY = 406;

    doc.roundedRect(qrX - 10, qrY - 10, 120, 136, 14).fillAndStroke("#FFFFFF", "#D6A12A");

    doc.image(qrDataUrl, qrX + 3, qrY, {
        width: 94,
        height: 94,
    });

    doc.fontSize(7.5)
        .fillColor("#555555")
        .font("Helvetica-Bold")
        .text("SCAN TO VERIFY", qrX - 2, qrY + 99, {
            width: 104,
            align: "center",
        });

    // Gold seal
    const sealX = pageW / 2;
    const sealY = 508;

    doc.save();
    doc.fillColor("#D6A12A");
    doc.circle(sealX, sealY, 42).fill();

    doc.fillColor("#F7D56A");
    doc.circle(sealX, sealY, 35).fill();

    doc.fillColor("#FFFFFF");
    doc.circle(sealX, sealY, 27).fill();

    if (fs.existsSync(logoPath)) {
        const logoDataUrl = imageFileToDataUrl(logoPath);
        doc.image(logoDataUrl, sealX - 22, sealY - 22, {
            width: 44,
            height: 44,
        });
    }

    doc.strokeColor("#B98614").lineWidth(2);
    doc.circle(sealX, sealY, 42).stroke();
    doc.circle(sealX, sealY, 35).stroke();
    doc.restore();

    // Seal ribbons
    doc.save();
    doc.fillColor(red);
    doc.moveTo(sealX - 28, sealY + 34)
        .lineTo(sealX - 45, sealY + 88)
        .lineTo(sealX - 18, sealY + 74)
        .lineTo(sealX - 4, sealY + 93)
        .lineTo(sealX + 5, sealY + 42)
        .fill();

    doc.moveTo(sealX + 28, sealY + 34)
        .lineTo(sealX + 45, sealY + 88)
        .lineTo(sealX + 18, sealY + 74)
        .lineTo(sealX + 4, sealY + 93)
        .lineTo(sealX - 5, sealY + 42)
        .fill();

    doc.strokeColor(gold).lineWidth(1);
    doc.moveTo(sealX - 28, sealY + 34).lineTo(sealX - 45, sealY + 88).stroke();
    doc.moveTo(sealX + 28, sealY + 34).lineTo(sealX + 45, sealY + 88).stroke();
    doc.restore();

    // Signatures
    const chairpersonName = certificateSettings.chairpersonName || "Chairperson";
    const secretaryName = certificateSettings.secretaryName || "Secretary";

    const signatureY = 488;
    const lineY = 526;
    const labelY = 533;
    const roleY = 549;

    const signatureW = 185;
    const signatureH = 42;

    const chairX = 82;
    const secretaryX = pageW - 267;

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

    doc.strokeColor(gold).lineWidth(1.1);
    doc.moveTo(chairX, lineY).lineTo(chairX + signatureW, lineY).stroke();

    doc.fontSize(7.5)
        .fillColor("#555555")
        .font("Helvetica-Bold")
        .text(chairpersonName, chairX, labelY, {
            width: signatureW,
            align: "center",
            lineBreak: false,
        });

    doc.fontSize(9)
        .fillColor(black)
        .font("Helvetica-Bold")
        .text("CHAIRPERSON", chairX, roleY, {
            width: signatureW,
            align: "center",
            lineBreak: false,
        });

    doc.strokeColor(gold).lineWidth(1.1);
    doc.moveTo(secretaryX, lineY).lineTo(secretaryX + signatureW, lineY).stroke();

    doc.fontSize(7.5)
        .fillColor("#555555")
        .font("Helvetica-Bold")
        .text(secretaryName, secretaryX, labelY, {
            width: signatureW,
            align: "center",
            lineBreak: false,
        });

    doc.fontSize(9)
        .fillColor(black)
        .font("Helvetica-Bold")
        .text("SECRETARY", secretaryX, roleY, {
            width: signatureW,
            align: "center",
            lineBreak: false,
        });

    doc.fontSize(8)
        .fillColor("#555555")
        .font("Helvetica")
        .text(`Issued on ${formatDate(certificate.issueDate)}`, secretaryX, roleY + 18, {
            width: signatureW,
            align: "center",
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
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const name = String(body.name || "").trim();
        const email = String(body.email || "").trim();
        const subject = String(body.subject || "").trim();
        const message = String(body.message || "").trim();

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { ok: false, error: "Please fill in all fields." },
                { status: 400 }
            );
        }

        const contact = await prisma.contactSetting.findUnique({
            where: { id: "main" },
        });

        const to = contact?.email || "info@kenyahoteliers.com";

        await sendMail({
            to,
            subject: `Website Enquiry: ${subject}`,
            html: `
                <h2>New Contact Form Message</h2>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("CONTACT_FORM_ERROR", error);

        return NextResponse.json(
            { ok: false, error: "Failed to send message." },
            { status: 500 }
        );
    }
}
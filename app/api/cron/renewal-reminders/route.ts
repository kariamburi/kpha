import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

const reminderDays = [30, 14, 7, 0];

function dateRangeForDaysFromNow(days: number) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);

    const start = new Date(targetDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(targetDate);
    end.setHours(23, 59, 59, 999);

    return { start, end };
}

export async function GET(req: Request) {
    const authHeader = req.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json(
            { ok: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    let emailSent = 0;
    let notificationsCreated = 0;

    for (const days of reminderDays) {
        const { start, end } = dateRangeForDaysFromNow(days);

        const members = await prisma.member.findMany({
            where: {
                status: "ACTIVE",
                expiryDate: {
                    gte: start,
                    lte: end,
                },
            },
            include: {
                category: true,
            },
        });

        for (const member of members) {
            const expiryDate = member.expiryDate.toLocaleDateString("en-KE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });

            const title =
                days === 0
                    ? "AHPK Membership Expires Today"
                    : `AHPK Membership Renewal Reminder - ${days} Days Left`;

            const message =
                days === 0
                    ? `Your AHPK membership expires today (${expiryDate}). Please renew your membership to continue enjoying active member benefits.`
                    : `Your AHPK membership will expire on ${expiryDate}. You have ${days} day${days === 1 ? "" : "s"} left to renew.`;

            const reminderKey = `renewal-${member.id}-${days}-${member.expiryDate.toISOString().slice(0, 10)}`;

            await prisma.notification.upsert({
                where: {
                    memberId_reminderKey: {
                        memberId: member.id,
                        reminderKey,
                    },
                },
                update: {},
                create: {
                    memberId: member.id,
                    title,
                    message,
                    reminderKey,
                },
            });
            notificationsCreated++;

            if (member.email) {
                await sendMail({
                    to: member.email,
                    subject: title,
                    html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
              <h2 style="color:#C1121F;">${title}</h2>

              <p>Dear ${member.fullName || "Member"},</p>

              <p>${message}</p>

              <p>
                Please log in to your member portal to renew your membership.
              </p>

              <p>Regards,<br/>AHPK Secretariat</p>
            </div>
          `,
                });

                emailSent++;
            }
        }
    }

    return NextResponse.json({
        ok: true,
        checkedDays: reminderDays,
        emailsSent: emailSent,
        notificationsCreated,
    });
}
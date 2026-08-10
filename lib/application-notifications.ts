import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

type PendingApplicationNotification = {
    applicationId: string;
    fullName?: string | null;
    email?: string | null;
    phone?: string | null;
    categoryName?: string | null;
    position?: string | null;
    employer?: string | null;
};

export async function notifyAdminsOfPendingApplication({
    applicationId,
    fullName,
    email,
    phone,
    categoryName,
    position,
    employer,
}: PendingApplicationNotification) {
    try {
        /*
         * Notify only ACTIVE administrators who
         * are responsible for application review.
         *
         * FINANCE is intentionally excluded.
         */
        const administrators =
            await prisma.member.findMany({
                where: {
                    adminStatus: "ACTIVE",

                    adminRole: {
                        in: [
                            "SUPER_ADMIN",
                            "ADMIN",
                        ],
                    },

                    email: {
                        not: null,
                    },
                },

                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    adminRole: true,
                },
            });

        /*
         * Remove duplicate email addresses.
         */
        const recipients = Array.from(
            new Map(
                administrators
                    .filter(
                        (
                            administrator,
                        ) =>
                            Boolean(
                                administrator.email,
                            ),
                    )
                    .map(
                        (
                            administrator,
                        ) => [
                                administrator.email!.toLowerCase(),
                                administrator,
                            ],
                    ),
            ).values(),
        );

        if (
            recipients.length === 0
        ) {
            console.warn(
                "PENDING_APPLICATION_NOTIFICATION_SKIPPED: No active ADMIN or SUPER_ADMIN email recipients found.",
                {
                    applicationId,
                },
            );

            return {
                ok: true,
                sent: 0,
            };
        }

        const baseUrl =
            (
                process.env
                    .NEXT_PUBLIC_APP_URL ||
                "http://localhost:3000"
            ).replace(
                /\/$/,
                "",
            );

        /*
         * Your application review route.
         */
        const reviewUrl =
            `${baseUrl}/dashboard/applications/${applicationId}`;

        let sent = 0;

        for (
            const administrator of recipients
        ) {
            if (
                !administrator.email
            ) {
                continue;
            }

            try {
                await sendMail({
                    to:
                        administrator.email,

                    subject:
                        "New AHPK Membership Application Pending Review",

                    html: `
                        <div
                            style="
                                font-family:Arial,sans-serif;
                                line-height:1.6;
                                color:#111111;
                                max-width:680px;
                                margin:0 auto;
                            "
                        >
                            <div
                                style="
                                    border-top:5px solid #C1121F;
                                    padding:24px;
                                    border-left:1px solid #eeeeee;
                                    border-right:1px solid #eeeeee;
                                    border-bottom:1px solid #eeeeee;
                                "
                            >
                                <p
                                    style="
                                        margin:0;
                                        font-size:12px;
                                        font-weight:700;
                                        letter-spacing:2px;
                                        color:#C1121F;
                                    "
                                >
                                    AHPK ADMIN PORTAL
                                </p>

                                <h2
                                    style="
                                        margin:8px 0 8px;
                                        font-size:24px;
                                        color:#111111;
                                    "
                                >
                                    Membership Application Pending Review
                                </h2>

                                <p
                                    style="
                                        margin:0 0 18px;
                                        color:#555555;
                                    "
                                >
                                    Dear ${administrator.fullName ||
                        "Administrator"
                        },
                                </p>

                                <p
                                    style="
                                        margin-bottom:18px;
                                        color:#444444;
                                    "
                                >
                                    A new AHPK membership application has
                                    been completed and is awaiting
                                    administrative review.
                                </p>

                                <table
                                    style="
                                        width:100%;
                                        border-collapse:collapse;
                                        margin:18px 0;
                                    "
                                >
                                    ${row(
                            "Applicant",
                            fullName ||
                            "Not provided",
                        )}

                                    ${row(
                            "Email",
                            email ||
                            "Not provided",
                        )}

                                    ${row(
                            "Phone",
                            phone ||
                            "Not provided",
                        )}

                                    ${row(
                            "Membership Category",
                            categoryName ||
                            "Not provided",
                        )}

                                    ${row(
                            "Current Position",
                            position ||
                            "Not provided",
                        )}

                                    ${row(
                            "Current Employer",
                            employer ||
                            "Not provided",
                        )}

                                    ${row(
                            "Application Status",
                            "PENDING REVIEW",
                        )}
                                </table>

                                <div
                                    style="
                                        margin-top:24px;
                                    "
                                >
                                    <a
                                        href="${reviewUrl}"
                                        style="
                                            display:inline-block;
                                            background:#C1121F;
                                            color:#ffffff;
                                            text-decoration:none;
                                            font-weight:700;
                                            padding:12px 20px;
                                        "
                                    >
                                        Review Application
                                    </a>
                                </div>

                                <p
                                    style="
                                        margin-top:24px;
                                        font-size:13px;
                                        color:#777777;
                                    "
                                >
                                    Please log in to the AHPK Admin Portal
                                    to review the applicant's information,
                                    documents and membership eligibility.
                                </p>

                                <p
                                    style="
                                        margin-top:20px;
                                        color:#444444;
                                    "
                                >
                                    Regards,<br />
                                    <strong>AHPK Digital Membership Portal</strong>
                                </p>
                            </div>
                        </div>
                    `,
                });

                sent++;
            } catch (
            recipientError
            ) {
                console.error(
                    "PENDING_APPLICATION_ADMIN_EMAIL_ERROR",
                    {
                        applicationId,
                        recipient:
                            administrator.email,
                        error:
                            recipientError,
                    },
                );
            }
        }

        return {
            ok: true,
            sent,
        };
    } catch (error) {
        /*
         * Notification failure must never make
         * an otherwise valid application fail.
         */
        console.error(
            "PENDING_APPLICATION_NOTIFICATION_ERROR",
            {
                applicationId,
                error,
            },
        );

        return {
            ok: false,
            sent: 0,
        };
    }
}

function row(
    label: string,
    value: string,
) {
    return `
        <tr>
            <td
                style="
                    width:42%;
                    padding:9px 10px;
                    border:1px solid #eeeeee;
                    background:#f8f8f8;
                    font-size:13px;
                    font-weight:700;
                    color:#555555;
                "
            >
                ${escapeHtml(label)}
            </td>

            <td
                style="
                    padding:9px 10px;
                    border:1px solid #eeeeee;
                    font-size:13px;
                    font-weight:600;
                    color:#111111;
                "
            >
                ${escapeHtml(value)}
            </td>
        </tr>
    `;
}

function escapeHtml(
    value: string,
) {
    return value
        .replace(
            /&/g,
            "&amp;",
        )
        .replace(
            /</g,
            "&lt;",
        )
        .replace(
            />/g,
            "&gt;",
        )
        .replace(
            /"/g,
            "&quot;",
        )
        .replace(
            /'/g,
            "&#039;",
        );
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

function csvValue(
    value: string | number | null | undefined,
) {
    const text = String(
        value ?? "",
    ).replaceAll('"', '""');

    return `"${text}"`;
}

function formatDate(
    value: Date | null,
) {
    if (!value) return "";

    return value.toLocaleString("en-KE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function safeFilename(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export async function GET(
    request: Request,
    context: RouteContext,
) {
    const { id } = await context.params;

    const event = await prisma.event.findUnique({
        where: {
            id,
        },
        include: {
            registrations: {
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
    });

    if (!event) {
        return NextResponse.json(
            {
                ok: false,
                error: "Event not found.",
            },
            {
                status: 404,
            },
        );
    }

    const headings = [
        "Booking Number",
        "Participant Name",
        "Phone",
        "Email",
        "Organisation",
        "Membership Number",
        "Amount",
        "Payment Status",
        "Payment Method",
        "Payment Reference",
        "Booking Status",
        "Paid At",
        "Registration Date",
        "Additional Details",
    ];

    const rows = event.registrations.map(
        (registration) => [
            registration.bookingNumber,
            registration.fullName,
            registration.phone,
            registration.email,
            registration.organisation,
            registration.membershipNumber ||
            "Non-member",
            registration.amount,
            registration.paymentStatus,
            registration.paymentMethod,
            registration.paymentReference,
            registration.status,
            formatDate(registration.paidAt),
            formatDate(
                registration.createdAt,
            ),
            registration.paymentDetails,
        ],
    );

    const csv = [
        headings.map(csvValue).join(","),
        ...rows.map((row) =>
            row.map(csvValue).join(","),
        ),
    ].join("\r\n");

    const filename = `${safeFilename(event.title) ||
        "event"
        }-bookings.csv`;

    return new NextResponse(
        `\uFEFF${csv}`,
        {
            status: 200,
            headers: {
                "Content-Type":
                    "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control":
                    "no-store, max-age=0",
            },
        },
    );
}
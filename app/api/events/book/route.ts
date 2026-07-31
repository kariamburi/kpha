import crypto from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function generateBookingNumber() {
    const year = new Date().getFullYear();

    const suffix = crypto
        .randomUUID()
        .replaceAll("-", "")
        .slice(0, 8)
        .toUpperCase();

    return `AHPK-EVT-${year}-${suffix}`;
}

function normalizeEmail(value: unknown) {
    return String(value || "")
        .trim()
        .toLowerCase();
}

function normalizePhone(value: unknown) {
    return String(value || "")
        .trim()
        .replace(/[^\d+]/g, "");
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const eventId = String(
            body.eventId || "",
        ).trim();

        const fullName = String(
            body.fullName || "",
        ).trim();

        const email = normalizeEmail(body.email);
        const phone = normalizePhone(body.phone);

        const organisation = String(
            body.organisation || "",
        ).trim();

        const membershipNumber = String(
            body.membershipNumber || "",
        ).trim();

        const paymentDetails = String(
            body.paymentDetails || "",
        ).trim();

        if (
            !eventId ||
            !fullName ||
            !email ||
            !phone ||
            !organisation
        ) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "Please complete all required booking fields.",
                },
                { status: 400 },
            );
        }

        const event = await prisma.event.findFirst({
            where: {
                id: eventId,
                published: true,
            },
            include: {
                _count: {
                    select: {
                        registrations: true,
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
                { status: 404 },
            );
        }

        if (
            event.capacity !== null &&
            event._count.registrations >=
            event.capacity
        ) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "This event is currently fully booked.",
                },
                { status: 409 },
            );
        }

        const amount = Math.max(
            Number(event.fee || 0),
            0,
        );

        const bookingNumber =
            generateBookingNumber();

        const registration: any =
            await prisma.eventRegistration.create({
                data: {
                    eventId: event.id,
                    bookingNumber,
                    fullName,
                    phone,
                    email,
                    organisation,
                    membershipNumber:
                        membershipNumber &&
                            membershipNumber.toLowerCase() !==
                            "none"
                            ? membershipNumber
                            : null,
                    paymentDetails:
                        paymentDetails || null,
                    amount,

                    status:
                        amount > 0
                            ? "PENDING"
                            : "CONFIRMED",

                    paymentStatus:
                        amount > 0 ? "PENDING" : "PAID",

                    paymentMethod:
                        amount > 0
                            ? "PAYSTACK"
                            : "FREE",

                    paidAt:
                        amount > 0 ? null : new Date(),
                },
            });

        if (amount <= 0) {
            return NextResponse.json({
                ok: true,
                bookingNumber:
                    registration.bookingNumber,
            });
        }

        const appUrl =
            process.env.NEXT_PUBLIC_APP_URL ||
            process.env.APP_URL ||
            "https://ahpk.or.ke";

        const paystackResponse = await fetch(
            "https://api.paystack.co/transaction/initialize",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: registration.email,

                    // Paystack expects the lowest currency unit.
                    amount: Math.round(amount * 100),

                    currency: "KES",

                    reference: `EVENT-${registration.id}-${Date.now()}`,

                    callback_url: `${appUrl}/events/payment/callback`,

                    metadata: {
                        paymentType:
                            "EVENT_REGISTRATION",
                        registrationId:
                            registration.id,
                        bookingNumber:
                            registration.bookingNumber,
                        eventId: event.id,
                        eventSlug: event.slug,
                        eventTitle: event.title,
                        participantName:
                            registration.fullName,
                    },
                }),
                cache: "no-store",
            },
        );

        const paystackData =
            await paystackResponse.json();

        if (
            !paystackResponse.ok ||
            !paystackData.status ||
            !paystackData.data
                ?.authorization_url
        ) {
            await prisma.eventRegistration.delete({
                where: {
                    id: registration.id,
                },
            });

            console.error(
                "EVENT_PAYSTACK_INITIALIZATION_ERROR",
                paystackData,
            );

            return NextResponse.json(
                {
                    ok: false,
                    error:
                        paystackData.message ||
                        "Failed to initialize payment.",
                },
                { status: 502 },
            );
        }

        await prisma.eventRegistration.update({
            where: {
                id: registration.id,
            },
            data: {
                paymentReference:
                    paystackData.data.reference,
            },
        });

        return NextResponse.json({
            ok: true,
            bookingNumber:
                registration.bookingNumber,
            authorizationUrl:
                paystackData.data.authorization_url,
            reference:
                paystackData.data.reference,
        });
    } catch (error) {
        console.error(
            "CREATE_EVENT_BOOKING_ERROR",
            error,
        );

        return NextResponse.json(
            {
                ok: false,
                error:
                    "Unable to create the event booking.",
            },
            { status: 500 },
        );
    }
}
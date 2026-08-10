import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const {
            applicationId,
        } = await req.json();

        if (!applicationId) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "Application ID is required",
                },
                {
                    status: 400,
                },
            );
        }

        const application =
            await prisma.membershipApplication.findUnique({
                where: {
                    id:
                        applicationId,
                },

                include: {
                    category:
                        true,
                },
            });

        if (
            !application ||
            !application.category
        ) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "Application or category not found",
                },
                {
                    status: 404,
                },
            );
        }

        if (!application.email) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "Applicant email is required",
                },
                {
                    status: 400,
                },
            );
        }

        /*
         * =====================================================
         * REQUIRE PROFESSIONAL DETAILS
         * =====================================================
         */

        if (
            !application.qualification ||
            !application.institution ||
            !application.position ||
            !application.employer ||
            !application.experience
        ) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "Please complete education, current employment and professional experience details before payment.",
                },
                {
                    status: 400,
                },
            );
        }

        /*
         * =====================================================
         * REQUIRE DATA PROTECTION CONSENT
         * =====================================================
         */

        if (
            !application.dataProtectionConsent
        ) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "Data protection consent is required before payment.",
                },
                {
                    status: 400,
                },
            );
        }

        /*
         * Make sure a timestamp exists once
         * consent has been provided.
         */
        if (
            !application.consentedAt
        ) {
            await prisma.membershipApplication.update({
                where: {
                    id:
                        application.id,
                },

                data: {
                    consentedAt:
                        new Date(),
                },
            });
        }

        /*
         * =====================================================
         * PAYMENT AMOUNT
         * =====================================================
         */

        const amount =
            Math.round(
                application.category
                    .annualFee * 100,
            );

        /*
         * Free categories should not reach Paystack.
         */
        if (amount <= 0) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "This membership category does not require online payment.",
                },
                {
                    status: 400,
                },
            );
        }

        const secretKey =
            process.env
                .PAYSTACK_SECRET_KEY;

        if (!secretKey) {
            console.error(
                "PAYSTACK_SECRET_KEY is missing",
            );

            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "Payment service is not configured.",
                },
                {
                    status: 500,
                },
            );
        }

        const appUrl =
            process.env
                .NEXT_PUBLIC_APP_URL;

        if (!appUrl) {
            console.error(
                "NEXT_PUBLIC_APP_URL is missing",
            );

            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "Application URL is not configured.",
                },
                {
                    status: 500,
                },
            );
        }

        /*
         * =====================================================
         * INITIALIZE PAYSTACK
         * =====================================================
         */

        const res =
            await fetch(
                "https://api.paystack.co/transaction/initialize",
                {
                    method:
                        "POST",

                    headers: {
                        Authorization:
                            `Bearer ${secretKey}`,

                        "Content-Type":
                            "application/json",
                    },

                    body:
                        JSON.stringify({
                            email:
                                application.email,

                            amount,

                            currency:
                                "KES",

                            callback_url:
                                `${appUrl}/apply/payment/callback`,

                            metadata: {
                                applicationId:
                                    application.id,

                                fullName:
                                    application.fullName,

                                category:
                                    application.category
                                        .name,

                                currentPosition:
                                    application.position,

                                currentEmployer:
                                    application.employer,

                                dataProtectionConsent:
                                    application.dataProtectionConsent,
                            },
                        }),
                },
            );

        const data =
            await res.json();

        if (
            !res.ok ||
            !data.status
        ) {
            return NextResponse.json(
                {
                    ok: false,
                    error:
                        data.message ||
                        "Failed to initialize payment",
                },
                {
                    status: 400,
                },
            );
        }

        /*
         * =====================================================
         * SAVE PAYMENT REFERENCE
         * =====================================================
         */

        await prisma.membershipApplication.update({
            where: {
                id:
                    application.id,
            },

            data: {
                paymentReference:
                    data.data
                        .reference,

                paymentStatus:
                    "PENDING",
            },
        });

        return NextResponse.json({
            ok: true,

            authorizationUrl:
                data.data
                    .authorization_url,

            reference:
                data.data
                    .reference,
        });
    } catch (error) {
        console.error(
            "PAYSTACK_INIT_ERROR",
            error,
        );

        return NextResponse.json(
            {
                ok: false,
                error:
                    "Failed to initialize payment",
            },
            {
                status: 500,
            },
        );
    }
}
import { prisma } from "../../lib/prisma";

const SUPER_ADMIN_EMAIL =
    "paul.irungu.thumbi@gmail.com";

/*
 * Use the ID/passport number you want to enter
 * on the member login screen.
 *
 * Change this to your preferred TEST value.
 */
const SUPER_ADMIN_ID_NUMBER =
    "24026526";

const SUPER_ADMIN_NAME =
    "Paul Irungu";

const SUPER_ADMIN_PHONE =
    "0700000000";

function calendarYearValidity(year: number) {
    return {
        start: new Date(
            year,
            0,
            1,
            0,
            0,
            0,
            0,
        ),

        end: new Date(
            year,
            11,
            31,
            23,
            59,
            59,
            999,
        ),
    };
}

async function main() {
    console.log(
        "🌱 Starting AHPK seed...",
    );

    const currentYear =
        new Date().getFullYear();

    const validity =
        calendarYearValidity(
            currentYear,
        );

    /*
     * =====================================================
     * 1. GET OR CREATE MEMBERSHIP CATEGORY
     * =====================================================
     *
     * The Member model requires categoryId.
     *
     * We use Fellow Member here for testing.
     * Change the name if your desired category differs.
     */
    let category =
        await prisma.membershipCategory.findFirst({
            where: {
                name: {
                    equals:
                        "Fellow Member",
                    mode:
                        "insensitive",
                },
            },
        });

    if (!category) {
        category =
            await prisma.membershipCategory.create({
                data: {
                    name:
                        "Fellow Member",

                    description:
                        "Fellow membership category",

                    annualFee:
                        0,

                    active:
                        true,
                },
            });

        console.log(
            "✅ Fellow Member category created",
        );
    } else {
        console.log(
            "✅ Existing Fellow Member category found",
        );
    }

    /*
     * =====================================================
     * 2. FIND EXISTING MEMBER
     * =====================================================
     */
    let member =
        await prisma.member.findFirst({
            where: {
                email: {
                    equals:
                        SUPER_ADMIN_EMAIL,

                    mode:
                        "insensitive",
                },
            },
        });

    /*
     * =====================================================
     * 3. CREATE OR UPDATE SUPER ADMIN MEMBER
     * =====================================================
     */
    if (!member) {
        /*
         * Generate a test member number.
         *
         * Make sure this value is not already used.
         */
        let memberNumber =
            `AHPK-${currentYear}-ADMIN01`;

        const numberExists =
            await prisma.member.findUnique({
                where: {
                    memberNumber,
                },
            });

        if (numberExists) {
            memberNumber =
                `AHPK-${currentYear}-ADMIN-${Date.now()}`;
        }

        member =
            await prisma.member.create({
                data: {
                    fullName:
                        SUPER_ADMIN_NAME,

                    email:
                        SUPER_ADMIN_EMAIL,

                    phone:
                        SUPER_ADMIN_PHONE,

                    categoryId:
                        category.id,

                    memberNumber,

                    /*
                     * This is the member's original
                     * joining date.
                     *
                     * Do not change this during renewal.
                     */
                    joinDate:
                        new Date(),

                    /*
                     * Membership is valid through
                     * 31 December of the current year.
                     */
                    expiryDate:
                        validity.end,

                    status:
                        "ACTIVE",

                    adminRole:
                        "SUPER_ADMIN",

                    adminStatus:
                        "ACTIVE",

                    /*
                     * Optional professional profile
                     * details for testing the new
                     * LinkedIn-style member page.
                     */
                    county:
                        "Nairobi",

                    position:
                        "Hospitality Professional",

                    employer:
                        "Association of Hotel Professionals Kenya",

                    isDirectoryVisible:
                        true,
                },
            });

        console.log(
            `✅ Super Admin member created: ${member.memberNumber}`,
        );
    } else {
        member =
            await prisma.member.update({
                where: {
                    id:
                        member.id,
                },

                data: {
                    fullName:
                        SUPER_ADMIN_NAME,

                    phone:
                        SUPER_ADMIN_PHONE,

                    categoryId:
                        category.id,

                    /*
                     * Do NOT overwrite joinDate here.
                     * Existing Membership Since date
                     * should remain unchanged.
                     */

                    expiryDate:
                        validity.end,

                    status:
                        "ACTIVE",

                    adminRole:
                        "SUPER_ADMIN",

                    adminStatus:
                        "ACTIVE",

                    county:
                        member.county ||
                        "Nairobi",

                    position:
                        member.position ||
                        "Hospitality Professional",

                    employer:
                        member.employer ||
                        "Association of Hotel Professionals Kenya",

                    isDirectoryVisible:
                        true,
                },
            });

        console.log(
            "✅ Existing member promoted/updated to SUPER_ADMIN",
        );
    }

    /*
     * =====================================================
     * 4. CREATE OR UPDATE APPROVED/PAID APPLICATION
     * =====================================================
     *
     * THIS IS REQUIRED BY YOUR CURRENT MEMBER LOGIN.
     *
     * Login checks:
     *
     * email
     * idNumber
     * status = APPROVED
     * paymentStatus = PAID
     */
    const existingApplication =
        await prisma.membershipApplication.findFirst({
            where: {
                email: {
                    equals:
                        SUPER_ADMIN_EMAIL,

                    mode:
                        "insensitive",
                },

                idNumber:
                    SUPER_ADMIN_ID_NUMBER,
            },

            orderBy: {
                createdAt:
                    "desc",
            },
        });

    let application;

    if (existingApplication) {
        application =
            await prisma.membershipApplication.update({
                where: {
                    id:
                        existingApplication.id,
                },

                data: {
                    fullName:
                        SUPER_ADMIN_NAME,

                    email:
                        SUPER_ADMIN_EMAIL,

                    phone:
                        SUPER_ADMIN_PHONE,

                    idNumber:
                        SUPER_ADMIN_ID_NUMBER,

                    categoryId:
                        category.id,

                    status:
                        "APPROVED",

                    paymentStatus:
                        "PAID",

                    paymentReference:
                        existingApplication.paymentReference ||
                        "SEED-SUPER-ADMIN",

                    position:
                        "Hospitality Professional",

                    experience:
                        "System Super Administrator",

                    remarks:
                        "Seeded Super Admin test account",
                },
            });

        console.log(
            "✅ Existing membership application updated to APPROVED + PAID",
        );
    } else {
        application =
            await prisma.membershipApplication.create({
                data: {
                    fullName:
                        SUPER_ADMIN_NAME,

                    email:
                        SUPER_ADMIN_EMAIL,

                    phone:
                        SUPER_ADMIN_PHONE,

                    idNumber:
                        SUPER_ADMIN_ID_NUMBER,

                    categoryId:
                        category.id,

                    status:
                        "APPROVED",

                    paymentStatus:
                        "PAID",

                    paymentReference:
                        "SEED-SUPER-ADMIN",

                    position:
                        "Hospitality Professional",

                    experience:
                        "System Super Administrator",

                    remarks:
                        "Seeded Super Admin test account",
                },
            });

        console.log(
            "✅ Approved/paid membership application created",
        );
    }

    /*
     * =====================================================
     * 5. OPTIONAL TEST CERTIFICATE
     * =====================================================
     *
     * Useful because we are currently testing:
     *
     * - Member dashboard
     * - Certificate page
     * - Membership Since
     * - Valid From
     * - Valid Until
     * - QR verification
     */
    const existingCertificate =
        await prisma.certificate.findFirst({
            where: {
                memberId:
                    member.id,

                issueDate: {
                    gte:
                        validity.start,
                    lte:
                        validity.end,
                },
            },
        });

    let certificate =
        existingCertificate;

    if (!certificate) {
        let certificateNumber =
            `CERT-${currentYear}-ADMIN01`;

        const certificateNumberExists =
            await prisma.certificate.findUnique({
                where: {
                    certificateNumber,
                },
            });

        if (
            certificateNumberExists
        ) {
            certificateNumber =
                `CERT-${currentYear}-ADMIN-${Date.now()}`;
        }

        let verificationCode =
            `AHPK-ADMIN${currentYear}`;

        const codeExists =
            await prisma.certificate.findUnique({
                where: {
                    verificationCode,
                },
            });

        if (codeExists) {
            verificationCode =
                `AHPK-${crypto
                    .randomUUID()
                    .slice(0, 8)
                    .toUpperCase()}`;
        }

        certificate =
            await prisma.certificate.create({
                data: {
                    memberId:
                        member.id,

                    certificateNumber,

                    /*
                     * New AHPK rule:
                     * 01 January → 31 December.
                     */
                    issueDate:
                        validity.start,

                    expiryDate:
                        validity.end,

                    verificationCode,
                },
            });

        console.log(
            `✅ Test certificate created: ${certificate.certificateNumber}`,
        );
    } else {
        /*
         * Correct an existing current-year
         * test certificate to Jan–Dec.
         */
        certificate =
            await prisma.certificate.update({
                where: {
                    id:
                        certificate.id,
                },

                data: {
                    issueDate:
                        validity.start,

                    expiryDate:
                        validity.end,
                },
            });

        console.log(
            `✅ Current-year certificate already exists: ${certificate.certificateNumber}`,
        );
    }

    /*
     * =====================================================
     * FINAL TEST DETAILS
     * =====================================================
     */
    console.log("");
    console.log(
        "==============================================",
    );
    console.log(
        "✅ AHPK SUPER ADMIN TEST ACCOUNT READY",
    );
    console.log(
        "==============================================",
    );

    console.log(
        `Email: ${SUPER_ADMIN_EMAIL}`,
    );

    console.log(
        `ID / Passport: ${SUPER_ADMIN_ID_NUMBER}`,
    );

    console.log(
        `Member No: ${member.memberNumber}`,
    );

    console.log(
        `Role: ${member.adminRole}`,
    );

    console.log(
        `Admin Status: ${member.adminStatus}`,
    );

    console.log(
        `Membership Status: ${member.status}`,
    );

    console.log(
        `Membership Since: ${member.joinDate.getFullYear()}`,
    );

    console.log(
        `Valid From: 01 January ${currentYear}`,
    );

    console.log(
        `Valid Until: 31 December ${currentYear}`,
    );

    console.log(
        `Certificate: ${certificate.certificateNumber}`,
    );

    console.log(
        `Verification Code: ${certificate.verificationCode}`,
    );

    console.log(
        `Application: ${application.status} / ${application.paymentStatus}`,
    );

    console.log(
        "==============================================",
    );

    console.log("");
    console.log(
        "Seed completed successfully ✅",
    );
}

main()
    .catch((error) => {
        console.error(
            "❌ SEED ERROR",
            error,
        );

        process.exit(1);
    })
    .finally(
        async () => {
            await prisma.$disconnect();
        },
    );
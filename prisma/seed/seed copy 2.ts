import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/password";

async function main() {
    const categories = [
        {
            name: "Honorary Member",
            description:
                "Captains of the industry who have served in senior positions and maintained the integrity and reputation of the hospitality industry.",
            annualFee: 0,
            active: true,
        },
        {
            name: "Fellow Member",
            description:
                "Senior hospitality professionals who have served in leadership positions and contributed significantly to the profession.",
            annualFee: 0,
            active: true,
        },
        {
            name: "Full Member",
            description:
                "Practicing chief executive officers, managing directors, general managers, unit managers and consultants with reputable career progression.",
            annualFee: 5000,
            active: true,
        },
        {
            name: "Associate Member",
            description:
                "Companies doing business with the hotel industry, including training institutions and industry suppliers subject to vetting criteria.",
            annualFee: 10000,
            active: true,
        },
        {
            name: "Student Member",
            description:
                "Students undertaking AHPK accredited programs of study in hospitality and tourism.",
            annualFee: 2000,
            active: true,
        },
    ];

    for (const category of categories) {
        await prisma.membershipCategory.upsert({
            where: { name: category.name },
            update: category,
            create: category,
        });
    }

    console.log("Seed completed successfully");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
import { prisma } from "../../lib/prisma";


async function main() {
    const superAdminMember = await prisma.member.findFirst({
        where: {
            email: {
                equals: "paul.irungu.thumbi@gmail.com",
                mode: "insensitive",
            },
        },
    });

    if (superAdminMember) {
        await prisma.member.updateMany({
            where: {
                email: {
                    equals: "paul.irungu.thumbi@gmail.com",
                    mode: "insensitive",
                },
            },
            data: {
                adminRole: "SUPER_ADMIN",
                adminStatus: "ACTIVE",
            },
        });

        console.log("✅ paul.irungu.thumbi@gmail.com promoted to SUPER_ADMIN");
    } else {
        console.log("⚠️ Member paul.irungu.thumbi@gmail.com not found. Create/approve member first.");
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
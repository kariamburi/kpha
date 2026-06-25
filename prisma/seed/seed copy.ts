import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/password";

async function main() {
    const password = await hashPassword("Admin@12345");

    await prisma.user.upsert({
        where: { email: "admin@ahpk.or.ke" },
        update: {},
        create: {
            name: "AHPK Super Admin",
            email: "admin@ahpk.or.ke",
            phone: "0728820092",
            password,
            role: "SUPER_ADMIN",
            status: "ACTIVE",
        },
    });

    const categories = [
        {
            name: "Hospitality Professional",
            description: "For professionals working in the hospitality industry.",
            annualFee: 5000,
        },
        {
            name: "Consultant",
            description: "For hospitality consultants and advisors.",
            annualFee: 10000,
        },
        {
            name: "Corporate Member",
            description: "For hotels, institutions, and corporate organizations.",
            annualFee: 20000,
        },
        {
            name: "Student Member",
            description: "For hospitality students and trainees.",
            annualFee: 2000,
        },
    ];

    for (const category of categories) {
        await prisma.membershipCategory.upsert({
            where: { name: category.name },
            update: category,
            create: category,
        });
    }

    await prisma.websitePage.upsert({
        where: { slug: "contact" },
        update: {
            title: "Contact AHPK",
            subtitle:
                "Reach out to the Association of Hotel Professionals Kenya for membership, certification, events and general enquiries.",
            content:
                "Send your enquiry and the AHPK Secretariat will respond as soon as possible.",
            published: true,
        },
        create: {
            slug: "contact",
            title: "Contact AHPK",
            subtitle:
                "Reach out to the Association of Hotel Professionals Kenya for membership, certification, events and general enquiries.",
            content:
                "Send your enquiry and the AHPK Secretariat will respond as soon as possible.",
            published: true,
        },
    });

    await prisma.contactSetting.upsert({
        where: { id: "main" },
        update: {
            address:
                "The Clarion Hotel Building, Second Floor, Moi Avenue\nP.O. Box 8747 - 00200, City Square, Nairobi, Kenya",
            email: "info@ahpk.or.ke",
            phone1: "+254 785 707 378",
            phone2: "+254 710 800 800",
            facebookUrl: "",
            twitterUrl: "",
            linkedinUrl: "",
            instagramUrl: "",
            mapUrl: "",
        },
        create: {
            id: "main",
            address:
                "The Clarion Hotel Building, Second Floor, Moi Avenue\nP.O. Box 8747 - 00200, City Square, Nairobi, Kenya",
            email: "info@ahpk.or.ke",
            phone1: "+254 785 707 378",
            phone2: "+254 710 800 800",
            facebookUrl: "",
            twitterUrl: "",
            linkedinUrl: "",
            instagramUrl: "",
            mapUrl: "",
        },
    });
    const websitePages = [
        {
            slug: "about",
            title: "Who We Are",
            subtitle: "AHPK is a professional body for hotel and hospitality professionals in Kenya.",
            content: `The Association of Hotel Professionals-Kenya is a professional body, whose membership is drawn from key individual professionals and practitioners in the hotel industry.

It is registered under the Societies Act, with the aim to regulate, lobby and secure its members rightful place and offer a voice for professionals who are both active in service, retired or in consultancy with an extension to reach out and consider institutions of higher learning preparing undergraduates to join the industry.

The association has been acknowledged globally as one of the fastest growing hospitality professional bodies and a major contributor to employment and sustainable economic and social development.

The association is registered under the name ASSOCIATION OF HOTEL PROFESSIONALS-KENYA and abbreviated as AHPK. It was registered vide certificate number 48570 dated 16 September 2016 by the office of the Registrar General.

AHPK works to develop, advance and implement the objectives of the hotel industry and works with government agencies at regional, national and county levels.`,
            seoTitle: "Who We Are | AHPK",
            seoDesc: "Learn about the Association of Hotel Professionals Kenya.",
        },
        {
            slug: "executive-summary",
            title: "Executive Summary",
            subtitle: "The background and formation journey of AHPK.",
            content: `Following the forum held on 10th January 2015 by hotel professional colleagues from the wider hospitality industry, an idea was mooted to form and register a professional association tasked with the mandate to regulate and give a voice to professionals in this industry.

The association’s objective is to create community goodwill, provide its members with career and professional growth and empowerment through networking and partnering in business with other members within and outside the profession.

The forum appointed a steering committee to pursue this idea and commence the search of a suitable name and upon securing one, seek a letter of no objection from the Tourism Regulatory Authority.

A meeting was convened where several names were floated and it was decided to settle for the Association of Hotel Professionals - Kenya, since the majority of founder members were from the hotel industry backgrounds.`,
            seoTitle: "Executive Summary | AHPK",
            seoDesc: "Read the executive summary and formation background of AHPK.",
        },
        {
            slug: "corporate-statements",
            title: "Corporate Statements",
            subtitle: "Vision, mission, values, goals and objectives of AHPK.",
            content: `VISION STATEMENT

To be a forum and centre of modern hotel professional excellence for sustenance of efficient and cohesive world class hospitality standards positioned for the 21st century and beyond.

MISSION STATEMENT

To promote, nurture and harness the immense expertise and knowledge available amongst professionals practicing in the industry and pass it to future generation in pursuit of their career in the spirit of corporate social responsibility.

CORE VALUES

Leadership and Excellence.
Professionalism.
Service and Quality.
Teamwork and Loyalty.
Integrity, Adroitness and Honesty.
Respect and Dignity.

GOALS AND OBJECTIVES

To give a voice to managers in the profession on matters aimed at enhancing professional empowerment.

To act as a lobby group in the articulation of industry matters in collaboration with government and relevant industry agencies.

To participate in regulating the performance of the industry so as to harmonize and create a level playing field.

To nurture and harness expertise and knowledge from skilled veterans and share it with the industry.

To promote and enhance the spirit of corporate social responsibilities within the hotel industry.`,
            seoTitle: "Corporate Statements | AHPK",
            seoDesc: "View AHPK vision, mission, values, goals and objectives.",
        },
    ];

    for (const page of websitePages) {
        await prisma.websitePage.upsert({
            where: { slug: page.slug },
            update: {
                title: page.title,
                subtitle: page.subtitle,
                content: page.content,
                seoTitle: page.seoTitle,
                seoDesc: page.seoDesc,
                published: true,
            },
            create: {
                ...page,
                published: true,
            },
        });
    }

    const oldLeaders = [
        {
            name: "Robert M. Kinyua",
            title: "Chairman",
            bio: "Msc. Hospitality Management\nCEO - The Clarion Hotel, Nairobi, Kenya",
            imageUrl: "/uploads/leaders/robert-kinyua.jpg",
            order: 1,
        },
        {
            name: "Wilson Mwangi",
            title: "Hon. Secretary",
            imageUrl: "/uploads/leaders/wilson-mwangi.jpg",
            bio: "Msc. Business Management\nDirector of Hospitality Services - Kenyatta University",
            order: 2,
        },
        {
            name: "Charles Kinyua",
            title: "Treasurer",
            bio: "Msc. Business Management\nGM - Bahari Dhow Beach Villas",
            imageUrl: "/uploads/leaders/charles-kinyua.jpg",
            order: 3,
        },
        {
            name: "Raphael Oduol",
            title: "Vice Chairman Operations",
            bio: "Msc. Hospitality Management",
            imageUrl: "/uploads/leaders/raphael-oduol.jpg",
            order: 4,
        },
        {
            name: "Dr. Florence Njau",
            title: "Vice Corporate Affairs",
            bio: "Msc. Hospitality Management\nConsultant in hospitality Management",
            imageUrl: "/uploads/leaders/florence-njau.jpg",
            order: 5,
        },
        {
            name: "Elizabeth Ayany",
            title: "Org. Secretary",
            bio: "Msc Business Management",
            imageUrl: "/uploads/leaders/elizabeth-ayany.jpg",
            order: 6,
        },
        {
            name: "Joseph Ndunda",
            title: "Asst. Secretary",
            bio: "Msc. Hospitality Management\nIndependent Hospitality Consultant",
            imageUrl: "/uploads/leaders/joseph-ndunda.jpg",
            order: 7,
        },
        {
            name: "Eunah Munene",
            title: "Executive Committee Member",
            bio: "Bsc. Hospitality Management\nCatering Manager, Co-operative University",
            imageUrl: "/uploads/leaders/eunah-munene.jpg",
            order: 8,
        },
    ];

    for (const leader of oldLeaders) {
        const existingLeader = await prisma.leader.findFirst({
            where: {
                name: leader.name,
                title: leader.title,
            },
        });

        if (existingLeader) {
            await prisma.leader.update({
                where: { id: existingLeader.id },
                data: {
                    bio: leader.bio,
                    imageUrl: leader.imageUrl,
                    order: leader.order,
                    active: true,
                },
            });
        } else {
            await prisma.leader.create({
                data: {
                    ...leader,
                    active: true,
                },
            });
        }
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
"use server";

import crypto from "crypto";
import path from "path";

import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";
import { requireMemberSession } from "../session";

async function getMemberId() {
    return await requireMemberSession();
}

function clean(
    value: FormDataEntryValue | null,
) {
    return String(
        value || "",
    ).trim();
}

function uploadsRoot() {
    return (
        process.env.UPLOADS_DIR ||
        "/home/ahpk/uploads"
    );
}

async function saveProfileImage(
    file: File | null,
) {
    if (
        !file ||
        file.size === 0
    ) {
        return null;
    }

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
    ];

    if (
        !allowedTypes.includes(
            file.type,
        )
    ) {
        throw new Error(
            "Only JPG, PNG and WEBP images are allowed.",
        );
    }

    const maxSize =
        5 * 1024 * 1024;

    if (
        file.size > maxSize
    ) {
        throw new Error(
            "Profile image must be less than 5MB.",
        );
    }

    const bytes =
        await file.arrayBuffer();

    const buffer =
        Buffer.from(bytes);

    const extMap: Record<
        string,
        string
    > = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
    };

    const ext =
        extMap[file.type] ||
        "jpg";

    const fileName =
        `${crypto.randomUUID()}.${ext}`;

    const uploadDir =
        path.join(
            uploadsRoot(),
            "profile-images",
        );

    await mkdir(
        uploadDir,
        {
            recursive: true,
        },
    );

    await writeFile(
        path.join(
            uploadDir,
            fileName,
        ),
        buffer,
    );

    return `/uploads/profile-images/${fileName}`;
}

/* =========================================================
   UPDATE MEMBER PROFILE
========================================================= */

export async function updateMemberProfileDetails(
    formData: FormData,
) {
    const memberId =
        await getMemberId();

    const fullName =
        clean(
            formData.get(
                "fullName",
            ),
        );

    const email =
        clean(
            formData.get(
                "email",
            ),
        );

    const phone =
        clean(
            formData.get(
                "phone",
            ),
        );

    const county =
        clean(
            formData.get(
                "county",
            ),
        );

    const position =
        clean(
            formData.get(
                "position",
            ),
        );

    const employer =
        clean(
            formData.get(
                "employer",
            ),
        );

    const isDirectoryVisible =
        formData.get(
            "isDirectoryVisible",
        ) === "on";

    const imageFile =
        formData.get(
            "profileImage",
        ) as File | null;

    const profileImageUrl =
        await saveProfileImage(
            imageFile,
        );

    await prisma.member.update({
        where: {
            id: memberId,
        },

        data: {
            fullName,
            email,
            phone,
            county,

            /*
             * Current employment
             */
            position,
            employer,

            isDirectoryVisible,

            ...(profileImageUrl
                ? {
                    profileImageUrl,
                }
                : {}),
        },
    });

    await createAuditLog({
        action:
            "MEMBER_PROFILE_UPDATED",

        entityType:
            "Member",

        entityId:
            memberId,

        metadata: {
            fullName,
            email,
            phone,
            county,

            currentPosition:
                position,

            currentEmployer:
                employer,

            isDirectoryVisible,

            profileImageUpdated:
                Boolean(
                    profileImageUrl,
                ),
        },
    });

    revalidateMemberProfilePages(
        memberId,
    );
}

/* =========================================================
   ADD EDUCATION
========================================================= */

export async function addMemberEducation(
    formData: FormData,
) {
    const memberId =
        await getMemberId();

    const level =
        clean(
            formData.get(
                "level",
            ),
        );

    const institution =
        clean(
            formData.get(
                "institution",
            ),
        );

    const year =
        clean(
            formData.get(
                "year",
            ),
        );

    const achievement =
        clean(
            formData.get(
                "achievement",
            ),
        );

    if (
        !level &&
        !institution
    ) {
        throw new Error(
            "Please provide education details.",
        );
    }

    const education =
        await prisma.memberEducation.create({
            data: {
                memberId,

                level:
                    level ||
                    null,

                institution:
                    institution ||
                    null,

                /*
                 * Education year stays.
                 * Client only requested removal
                 * of years of work experience.
                 */
                year:
                    year ||
                    null,

                achievement:
                    achievement ||
                    null,
            },
        });

    await createAuditLog({
        action:
            "MEMBER_EDUCATION_ADDED",

        entityType:
            "MemberEducation",

        entityId:
            education.id,

        metadata: {
            memberId,
            level,
            institution,
            year,
            achievement,
        },
    });

    revalidateMemberProfilePages(
        memberId,
    );
}

/* =========================================================
   DELETE EDUCATION
========================================================= */

export async function deleteMemberEducation(
    formData: FormData,
) {
    const memberId =
        await getMemberId();

    const id =
        clean(
            formData.get(
                "id",
            ),
        );

    if (!id) {
        throw new Error(
            "Education record ID is required.",
        );
    }

    const item =
        await prisma.memberEducation.findFirst({
            where: {
                id,
                memberId,
            },
        });

    if (!item) {
        throw new Error(
            "Education record not found.",
        );
    }

    await prisma.memberEducation.delete({
        where: {
            id,
        },
    });

    await createAuditLog({
        action:
            "MEMBER_EDUCATION_DELETED",

        entityType:
            "MemberEducation",

        entityId:
            id,

        metadata: {
            memberId,
            level:
                item.level,
            institution:
                item.institution,
        },
    });

    revalidateMemberProfilePages(
        memberId,
    );
}

/* =========================================================
   ADD WORK EXPERIENCE
========================================================= */

export async function addMemberWorkExperience(
    formData: FormData,
) {
    const memberId =
        await getMemberId();

    const company =
        clean(
            formData.get(
                "company",
            ),
        );

    const position =
        clean(
            formData.get(
                "position",
            ),
        );

    const description =
        clean(
            formData.get(
                "description",
            ),
        );

    const startDate =
        clean(
            formData.get(
                "startDate",
            ),
        );

    const endDate =
        clean(
            formData.get(
                "endDate",
            ),
        );

    if (
        !company &&
        !position &&
        !description
    ) {
        throw new Error(
            "Please provide work experience details.",
        );
    }

    if (
        startDate &&
        endDate &&
        new Date(endDate) <
        new Date(startDate)
    ) {
        throw new Error(
            "End date cannot be earlier than start date.",
        );
    }

    const experience =
        await prisma.memberWorkExperience.create({
            data: {
                memberId,

                /*
                 * Employer / organisation.
                 * Institution remains only
                 * under education.
                 */
                company:
                    company ||
                    null,

                position:
                    position ||
                    null,

                /*
                 * Professional experience /
                 * responsibilities.
                 */
                description:
                    description ||
                    null,

                startDate:
                    startDate
                        ? new Date(
                            startDate,
                        )
                        : null,

                endDate:
                    endDate
                        ? new Date(
                            endDate,
                        )
                        : null,

                /*
                 * Do not collect years of experience.
                 * Keep legacy column empty.
                 */
                year:
                    null,
            },
        });

    await createAuditLog({
        action:
            "MEMBER_WORK_EXPERIENCE_ADDED",

        entityType:
            "MemberWorkExperience",

        entityId:
            experience.id,

        metadata: {
            memberId,
            employer:
                company,
            position,
            description,
            startDate:
                experience.startDate,
            endDate:
                experience.endDate,
        },
    });

    revalidateMemberProfilePages(
        memberId,
    );
}

/* =========================================================
   DELETE WORK EXPERIENCE
========================================================= */

export async function deleteMemberWorkExperience(
    formData: FormData,
) {
    const memberId =
        await getMemberId();

    const id =
        clean(
            formData.get(
                "id",
            ),
        );

    if (!id) {
        throw new Error(
            "Work experience record ID is required.",
        );
    }

    const item =
        await prisma.memberWorkExperience.findFirst({
            where: {
                id,
                memberId,
            },
        });

    if (!item) {
        throw new Error(
            "Work experience record not found.",
        );
    }

    await prisma.memberWorkExperience.delete({
        where: {
            id,
        },
    });

    await createAuditLog({
        action:
            "MEMBER_WORK_EXPERIENCE_DELETED",

        entityType:
            "MemberWorkExperience",

        entityId:
            id,

        metadata: {
            memberId,

            employer:
                item.company,

            position:
                item.position,

            description:
                item.description,
        },
    });

    revalidateMemberProfilePages(
        memberId,
    );
}

/* =========================================================
   REVALIDATION
========================================================= */

function revalidateMemberProfilePages(
    memberId: string,
) {
    revalidatePath(
        "/member/profile",
    );

    revalidatePath(
        "/member/dashboard",
    );

    /*
     * Public directory listing.
     */
    revalidatePath(
        "/directory",
    );

    /*
     * Admin member page.
     */
    revalidatePath(
        `/dashboard/members/${memberId}`,
    );

    revalidatePath(
        "/dashboard/members",
    );

    revalidatePath(
        "/dashboard/audit-logs",
    );
}
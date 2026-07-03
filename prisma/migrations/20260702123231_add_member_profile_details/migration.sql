-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "profileImageUrl" TEXT;

-- CreateTable
CREATE TABLE "MemberEducation" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "level" TEXT,
    "institution" TEXT,
    "year" TEXT,
    "achievement" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberWorkExperience" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "company" TEXT,
    "position" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "year" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberWorkExperience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemberEducation" ADD CONSTRAINT "MemberEducation_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberWorkExperience" ADD CONSTRAINT "MemberWorkExperience_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

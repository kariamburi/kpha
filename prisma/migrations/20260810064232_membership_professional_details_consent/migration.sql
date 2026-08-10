-- AlterTable
ALTER TABLE "MemberWorkExperience" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "MembershipApplication" ADD COLUMN     "consentedAt" TIMESTAMP(3),
ADD COLUMN     "dataProtectionConsent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "employer" TEXT;

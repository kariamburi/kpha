/*
  Warnings:

  - You are about to drop the column `documentUrl` on the `MembershipApplication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MembershipApplication" DROP CONSTRAINT "MembershipApplication_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "MembershipApplication" DROP CONSTRAINT "MembershipApplication_userId_fkey";

-- AlterTable
ALTER TABLE "MembershipApplication" DROP COLUMN "documentUrl",
ADD COLUMN     "cvDocumentUrl" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "idDocumentUrl" TEXT,
ADD COLUMN     "idNumber" TEXT,
ADD COLUMN     "paymentReference" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "qualificationDocUrl" TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MembershipApplication" ADD CONSTRAINT "MembershipApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipApplication" ADD CONSTRAINT "MembershipApplication_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MembershipCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

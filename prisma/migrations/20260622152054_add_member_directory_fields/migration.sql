-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "county" TEXT,
ADD COLUMN     "employer" TEXT,
ADD COLUMN     "isDirectoryVisible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "position" TEXT;

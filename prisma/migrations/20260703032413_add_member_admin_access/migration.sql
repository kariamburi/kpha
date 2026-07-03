-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "adminRole" "Role",
ADD COLUMN     "adminStatus" "UserStatus" NOT NULL DEFAULT 'INACTIVE';

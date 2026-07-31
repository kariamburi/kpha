/*
  Warnings:

  - A unique constraint covering the columns `[bookingNumber]` on the table `EventRegistration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingNumber` to the `EventRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `EventRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `EventRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `EventRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `EventRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventBookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EventPaymentMethod" AS ENUM ('PAYSTACK', 'FREE', 'MANUAL');

-- DropForeignKey
ALTER TABLE "EventRegistration" DROP CONSTRAINT "EventRegistration_memberId_fkey";

-- DropIndex
DROP INDEX "EventRegistration_eventId_memberId_key";

-- AlterTable
ALTER TABLE "EventRegistration" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "bookingNumber" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "membershipNumber" TEXT,
ADD COLUMN     "organisation" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentDetails" TEXT,
ADD COLUMN     "paymentMethod" "EventPaymentMethod",
ADD COLUMN     "paymentReference" TEXT,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" "EventBookingStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "memberId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EventRegistration_bookingNumber_key" ON "EventRegistration"("bookingNumber");

-- CreateIndex
CREATE INDEX "EventRegistration_eventId_idx" ON "EventRegistration"("eventId");

-- CreateIndex
CREATE INDEX "EventRegistration_email_idx" ON "EventRegistration"("email");

-- CreateIndex
CREATE INDEX "EventRegistration_phone_idx" ON "EventRegistration"("phone");

-- CreateIndex
CREATE INDEX "EventRegistration_paymentStatus_idx" ON "EventRegistration"("paymentStatus");

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

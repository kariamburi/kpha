/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `MembershipCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MembershipCategory_name_key" ON "MembershipCategory"("name");

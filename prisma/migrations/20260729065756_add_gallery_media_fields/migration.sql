/*
  Warnings:

  - The values [PHOTO,VIDEO] on the enum `GalleryMediaType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `coverUrl` on the `GalleryAlbum` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl` on the `GalleryItem` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GalleryMediaType_new" AS ENUM ('IMAGE', 'YOUTUBE');
ALTER TABLE "public"."GalleryItem" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "GalleryItem" ALTER COLUMN "type" TYPE "GalleryMediaType_new" USING ("type"::text::"GalleryMediaType_new");
ALTER TYPE "GalleryMediaType" RENAME TO "GalleryMediaType_old";
ALTER TYPE "GalleryMediaType_new" RENAME TO "GalleryMediaType";
DROP TYPE "public"."GalleryMediaType_old";
COMMIT;

-- DropIndex
DROP INDEX "GalleryAlbum_category_published_createdAt_idx";

-- DropIndex
DROP INDEX "GalleryAlbum_published_createdAt_idx";

-- AlterTable
ALTER TABLE "GalleryAlbum" DROP COLUMN "coverUrl",
ADD COLUMN     "coverImageUrl" TEXT,
ALTER COLUMN "category" SET DEFAULT 'EVENTS';

-- AlterTable
ALTER TABLE "GalleryItem" DROP COLUMN "mediaUrl",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "youtubeId" TEXT,
ADD COLUMN     "youtubeUrl" TEXT,
ALTER COLUMN "type" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "GalleryAlbum_published_idx" ON "GalleryAlbum"("published");

-- CreateIndex
CREATE INDEX "GalleryAlbum_featured_idx" ON "GalleryAlbum"("featured");

-- CreateIndex
CREATE INDEX "GalleryAlbum_category_idx" ON "GalleryAlbum"("category");

-- CreateIndex
CREATE INDEX "GalleryAlbum_eventDate_idx" ON "GalleryAlbum"("eventDate");

-- CreateIndex
CREATE INDEX "GalleryItem_albumId_idx" ON "GalleryItem"("albumId");

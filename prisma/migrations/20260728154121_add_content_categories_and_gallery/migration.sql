-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('GENERAL', 'AGM', 'CONFERENCE', 'TRAINING', 'WORKSHOP', 'WEBINAR');

-- CreateEnum
CREATE TYPE "NewsCategory" AS ENUM ('LATEST', 'NOTICES', 'CHAIRMAN_MESSAGES', 'INDUSTRY_UPDATES', 'PRESS_RELEASES');

-- CreateEnum
CREATE TYPE "GalleryCategory" AS ENUM ('EVENTS', 'AGM', 'CONFERENCE', 'TRAINING', 'AWARDS', 'COMMUNITY', 'OTHER');

-- CreateEnum
CREATE TYPE "GalleryMediaType" AS ENUM ('PHOTO', 'VIDEO');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "category" "EventCategory" NOT NULL DEFAULT 'GENERAL';

-- AlterTable
ALTER TABLE "NewsPost" ADD COLUMN     "category" "NewsCategory" NOT NULL DEFAULT 'LATEST';

-- CreateTable
CREATE TABLE "GalleryAlbum" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "coverUrl" TEXT,
    "category" "GalleryCategory" NOT NULL DEFAULT 'OTHER',
    "eventDate" TIMESTAMP(3),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "type" "GalleryMediaType" NOT NULL DEFAULT 'PHOTO',
    "mediaUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "title" TEXT,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GalleryAlbum_slug_key" ON "GalleryAlbum"("slug");

-- CreateIndex
CREATE INDEX "GalleryAlbum_published_createdAt_idx" ON "GalleryAlbum"("published", "createdAt");

-- CreateIndex
CREATE INDEX "GalleryAlbum_category_published_createdAt_idx" ON "GalleryAlbum"("category", "published", "createdAt");

-- CreateIndex
CREATE INDEX "GalleryItem_albumId_order_idx" ON "GalleryItem"("albumId", "order");

-- CreateIndex
CREATE INDEX "GalleryItem_type_idx" ON "GalleryItem"("type");

-- CreateIndex
CREATE INDEX "Event_published_eventDate_idx" ON "Event"("published", "eventDate");

-- CreateIndex
CREATE INDEX "Event_category_published_eventDate_idx" ON "Event"("category", "published", "eventDate");

-- CreateIndex
CREATE INDEX "NewsPost_published_publishedAt_idx" ON "NewsPost"("published", "publishedAt");

-- CreateIndex
CREATE INDEX "NewsPost_category_published_publishedAt_idx" ON "NewsPost"("category", "published", "publishedAt");

-- AddForeignKey
ALTER TABLE "GalleryItem" ADD CONSTRAINT "GalleryItem_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "GalleryAlbum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

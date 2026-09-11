-- CreateTable
CREATE TABLE "HomepageHeroSlide" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "buttonLabel" TEXT,
    "buttonHref" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomepageHeroSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomepageContent" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "welcomeLabel" TEXT,
    "welcomeTitle" TEXT,
    "welcomeText" TEXT,
    "welcomeSecondaryText" TEXT,
    "welcomeImageUrl" TEXT,
    "primaryButtonLabel" TEXT,
    "primaryButtonHref" TEXT,
    "secondaryButtonLabel" TEXT,
    "secondaryButtonHref" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomepageContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HomepageHeroSlide_active_order_idx" ON "HomepageHeroSlide"("active", "order");

-- CreateTable
CREATE TABLE "ContactSetting" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "address" TEXT,
    "email" TEXT,
    "phone1" TEXT,
    "phone2" TEXT,
    "facebookUrl" TEXT,
    "twitterUrl" TEXT,
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,
    "mapUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSetting_pkey" PRIMARY KEY ("id")
);

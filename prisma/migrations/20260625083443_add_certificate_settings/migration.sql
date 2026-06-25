-- CreateTable
CREATE TABLE "CertificateSetting" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "chairpersonName" TEXT,
    "chairpersonSignature" TEXT,
    "secretaryName" TEXT,
    "secretarySignature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CertificateSetting_pkey" PRIMARY KEY ("id")
);

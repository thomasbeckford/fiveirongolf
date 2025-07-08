-- CreateEnum
CREATE TYPE "PageSection" AS ENUM ('GENERAL', 'HERO', 'ACTIVITIES', 'GALLERY', 'HOURS', 'MEMBERSHIP', 'INSTRUCTORS', 'MULTISPORT', 'DUCKPIN', 'REVIEWS', 'FEATURES', 'FOOTER');

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "timezone" TEXT,
    "telephone" TEXT,
    "experiences" TEXT[],
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seo" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "Seo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "page" "PageSection" NOT NULL,
    "content" JSONB NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "locationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_slug_key" ON "Location"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Seo_locationId_key" ON "Seo"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Section_locationId_page_key" ON "Section"("locationId", "page");

-- AddForeignKey
ALTER TABLE "Seo" ADD CONSTRAINT "Seo_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "clientType" TEXT,
    "projectType" TEXT,
    "budget" DOUBLE PRECISION,
    "deadline" TIMESTAMP(3),
    "existingSite" TEXT,
    "status" "ContactStatus" NOT NULL DEFAULT 'NEW',

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

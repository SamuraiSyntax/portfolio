-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "annualRevenue" DOUBLE PRECISION,
ADD COLUMN     "assignedTo" TEXT,
ADD COLUMN     "attachments" TEXT[],
ADD COLUMN     "companySize" TEXT,
ADD COLUMN     "competitors" TEXT[],
ADD COLUMN     "contractValue" DOUBLE PRECISION,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "lastContact" TIMESTAMP(3),
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "marketingSource" TEXT,
ADD COLUMN     "newsletter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nextFollowUp" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "objectives" TEXT[],
ADD COLUMN     "position" TEXT,
ADD COLUMN     "preferredContactMethod" TEXT,
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "projectScope" TEXT,
ADD COLUMN     "quotationAmount" DOUBLE PRECISION,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "targetAudience" TEXT,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "userAgent" TEXT;

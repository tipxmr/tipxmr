/*
  Warnings:

  - The `paidStatus` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `planType` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Donation_settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaidStatuses" AS ENUM ('paid', 'unpaid', 'canceled');

-- CreateEnum
CREATE TYPE "PlanTypes" AS ENUM ('basic', 'premium');

-- DropForeignKey
ALTER TABLE "Donation_settings" DROP CONSTRAINT "Donation_settings_streamer_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "paidStatus",
ADD COLUMN     "paidStatus" "PaidStatuses",
DROP COLUMN "planType",
ADD COLUMN     "planType" "PlanTypes";

-- DropTable
DROP TABLE "Donation_settings";

-- DropEnum
DROP TYPE "Paid_statuses";

-- DropEnum
DROP TYPE "Plan_types";

-- CreateTable
CREATE TABLE "DonationSettings" (
    "streamer" VARCHAR(12) NOT NULL,
    "secondPrice" INTEGER DEFAULT 0,
    "charPrice" DOUBLE PRECISION DEFAULT 0,
    "charLimit" INTEGER DEFAULT 140,
    "minAmount" INTEGER DEFAULT 0,
    "gifsMinAmount" DOUBLE PRECISION DEFAULT 0,
    "goal" DOUBLE PRECISION DEFAULT 0,
    "goalProgress" REAL DEFAULT 0,
    "goalReached" BOOLEAN DEFAULT false,

    CONSTRAINT "DonationSettings_pkey" PRIMARY KEY ("streamer")
);

-- AddForeignKey
ALTER TABLE "DonationSettings" ADD CONSTRAINT "DonationSettings_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

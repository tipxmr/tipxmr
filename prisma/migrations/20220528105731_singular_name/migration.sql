/*
  Warnings:

  - The `status` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `name` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paidStatus` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `planType` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `platform` column on the `Stream` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `language` column on the `Stream` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Streamer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `DonationSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StreamCategory" AS ENUM ('gaming', 'learning', 'talk', 'erotics');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('english', 'german', 'french', 'italian');

-- CreateEnum
CREATE TYPE "PaidStatus" AS ENUM ('paid', 'unpaid', 'canceled');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('basic', 'premium');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('youtube', 'twitch', 'chaturbate', 'selfhosted');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'closed');

-- DropForeignKey
ALTER TABLE "DonationSettings" DROP CONSTRAINT "DonationSettings_streamer_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "status",
ADD COLUMN     "status" "Status";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "name" "StreamCategory";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "paidStatus",
ADD COLUMN     "paidStatus" "PaidStatus",
DROP COLUMN "planType",
ADD COLUMN     "planType" "PlanType";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "platform",
ADD COLUMN     "platform" "Platform",
DROP COLUMN "language",
ADD COLUMN     "language" "Language";

-- AlterTable
ALTER TABLE "Streamer" DROP COLUMN "status",
ADD COLUMN     "status" "Status";

-- DropTable
DROP TABLE "DonationSettings";

-- DropEnum
DROP TYPE "Categories";

-- DropEnum
DROP TYPE "Languages";

-- DropEnum
DROP TYPE "PaidStatuses";

-- DropEnum
DROP TYPE "PlanTypes";

-- DropEnum
DROP TYPE "Platforms";

-- DropEnum
DROP TYPE "Statuses";

-- CreateTable
CREATE TABLE "DonationSetting" (
    "streamer" VARCHAR(12) NOT NULL,
    "secondPrice" INTEGER DEFAULT 0,
    "charPrice" DOUBLE PRECISION DEFAULT 0,
    "charLimit" INTEGER DEFAULT 140,
    "minAmount" INTEGER DEFAULT 0,
    "gifsMinAmount" DOUBLE PRECISION DEFAULT 0,
    "goal" DOUBLE PRECISION DEFAULT 0,
    "goalProgress" REAL DEFAULT 0,
    "goalReached" BOOLEAN DEFAULT false,

    CONSTRAINT "DonationSetting_pkey" PRIMARY KEY ("streamer")
);

-- AddForeignKey
ALTER TABLE "DonationSetting" ADD CONSTRAINT "DonationSetting_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

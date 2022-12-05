/*
  Warnings:

  - Made the column `url` on table `DonationSetting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DonationSetting" ALTER COLUMN "url" SET NOT NULL;

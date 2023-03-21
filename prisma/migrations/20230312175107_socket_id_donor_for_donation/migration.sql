/*
  Warnings:

  - Made the column `streamer` on table `Donation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subaddress` on table `Donation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "socketDonor" VARCHAR(20),
ALTER COLUMN "streamer" SET NOT NULL,
ALTER COLUMN "subaddress" SET NOT NULL;

-- CreateIndex
CREATE INDEX "streamer_name" ON "Streamer"("name");

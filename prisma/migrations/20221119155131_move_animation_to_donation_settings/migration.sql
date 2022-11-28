/*
  Warnings:

  - You are about to drop the `Animation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Animation" DROP CONSTRAINT "Animation_streamer_fkey";

-- AlterTable
ALTER TABLE "DonationSetting" ADD COLUMN     "color" VARCHAR(10),
ADD COLUMN     "size" INTEGER,
ADD COLUMN     "url" TEXT;

-- DropTable
DROP TABLE "Animation";

-- Insert UUID in url column for existing users
UPDATE "DonationSetting"
SET url=gen_random_uuid()
WHERE url IS NULL;
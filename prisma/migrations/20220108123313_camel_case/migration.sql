/*
  Warnings:

  - You are about to drop the column `display_time_seconds` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `giphy_url` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `char_limit` on the `Donation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `char_price` on the `Donation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `gifs_min_amount` on the `Donation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `goal_progress` on the `Donation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `goal_reached` on the `Donation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `min_amount` on the `Donation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `second_price` on the `Donation_settings` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `paid_status` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `plan_type` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `last_sync_height` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `restore_height` on the `Wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "display_time_seconds",
DROP COLUMN "giphy_url",
ADD COLUMN     "displayTimeSeconds" INTEGER,
ADD COLUMN     "giphyUrl" VARCHAR(100);

-- AlterTable
ALTER TABLE "Donation_settings" DROP COLUMN "char_limit",
DROP COLUMN "char_price",
DROP COLUMN "gifs_min_amount",
DROP COLUMN "goal_progress",
DROP COLUMN "goal_reached",
DROP COLUMN "min_amount",
DROP COLUMN "second_price",
ADD COLUMN     "charLimit" INTEGER,
ADD COLUMN     "charPrice" DOUBLE PRECISION,
ADD COLUMN     "gifsMinAmount" DOUBLE PRECISION,
ADD COLUMN     "goalProgress" REAL,
ADD COLUMN     "goalReached" BOOLEAN,
ADD COLUMN     "minAmount" INTEGER,
ADD COLUMN     "secondPrice" INTEGER;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "end_date",
DROP COLUMN "paid_status",
DROP COLUMN "plan_type",
DROP COLUMN "start_date",
ADD COLUMN     "endDate" TIMESTAMP(6),
ADD COLUMN     "paidStatus" "Paid_statuses",
ADD COLUMN     "planType" "Plan_types",
ADD COLUMN     "startDate" TIMESTAMP(6);

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "last_sync_height",
DROP COLUMN "restore_height",
ADD COLUMN     "lastSyncHeight" INTEGER,
ADD COLUMN     "restoreHeight" INTEGER;

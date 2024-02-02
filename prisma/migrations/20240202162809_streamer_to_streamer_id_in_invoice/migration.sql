/*
  Warnings:

  - You are about to drop the column `streamer` on the `Invoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_streamer_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "streamer",
ADD COLUMN     "streamerId" VARCHAR(12);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

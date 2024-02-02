/*
  Warnings:

  - You are about to drop the column `streamerId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_streamerId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "streamerId",
ADD COLUMN     "invoiceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `DonationSetting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DonationSetting_url_key" ON "DonationSetting"("url");

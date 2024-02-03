/*
  Warnings:

  - The primary key for the `Stream` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `streamer` on the `Stream` table. All the data in the column will be lost.
  - Added the required column `streamerId` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_streamer_fkey";

-- AlterTable
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_pkey",
DROP COLUMN "streamer",
ADD COLUMN     "streamerId" VARCHAR(12) NOT NULL,
ADD CONSTRAINT "Stream_pkey" PRIMARY KEY ("streamerId");

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

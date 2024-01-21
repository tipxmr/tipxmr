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

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "streamer" VARCHAR(12),
    "name" "StreamCategory",

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "streamer" VARCHAR(12) NOT NULL,
    "socketDonor" VARCHAR(20),
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "message" VARCHAR(256) DEFAULT '',
    "displayTimeSeconds" INTEGER DEFAULT 0,
    "subaddress" VARCHAR(95) NOT NULL,
    "confirmations" INTEGER DEFAULT 0,
    "giphyUrl" VARCHAR(100) DEFAULT '',
    "donor" VARCHAR(24) DEFAULT '',
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "played" TIMESTAMP(3),

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

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
    "url" TEXT NOT NULL,
    "size" INTEGER,
    "color" VARCHAR(10),

    CONSTRAINT "DonationSetting_pkey" PRIMARY KEY ("streamer")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "streamer" VARCHAR(12),
    "startDate" TIMESTAMP(6),
    "endDate" TIMESTAMP(6),
    "planType" "PlanType",
    "paidStatus" "PaidStatus",
    "subaddress" VARCHAR(95),

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "streamer" VARCHAR(12) NOT NULL,
    "url" VARCHAR(100),
    "platform" "Platform",
    "language" "Language",
    "category" INTEGER,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("streamer")
);

-- CreateTable
CREATE TABLE "Streamer" (
    "id" VARCHAR(12) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "alias" VARCHAR(24) NOT NULL,
    "socket" VARCHAR(20),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status",

    CONSTRAINT "Streamer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "streamer" VARCHAR(12) NOT NULL,
    "restoreHeight" INTEGER DEFAULT 0,
    "lastSyncHeight" INTEGER DEFAULT 0,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("streamer")
);

-- CreateIndex
CREATE UNIQUE INDEX "DonationSetting_url_key" ON "DonationSetting"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_name_key" ON "Streamer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_alias_key" ON "Streamer"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_socket_key" ON "Streamer"("socket");

-- CreateIndex
CREATE INDEX "streamer_name" ON "Streamer"("name");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DonationSetting" ADD CONSTRAINT "DonationSetting_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

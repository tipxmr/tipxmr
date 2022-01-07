-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('Gaming', 'Learning', 'Talk', 'Erotics');

-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('English', 'German', 'French', 'Italian');

-- CreateEnum
CREATE TYPE "Paid_statuses" AS ENUM ('paid', 'unpaid', 'canceled');

-- CreateEnum
CREATE TYPE "Plan_types" AS ENUM ('basic', 'premium');

-- CreateEnum
CREATE TYPE "Platforms" AS ENUM ('YouTube', 'Twitch', 'Chaturbate', 'Selfhosted');

-- CreateEnum
CREATE TYPE "Statuses" AS ENUM ('active', 'closed');

-- CreateTable
CREATE TABLE "Account" (
    "streamer" VARCHAR(12) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "status" "Statuses",

    CONSTRAINT "Account_pkey" PRIMARY KEY ("streamer")
);

-- CreateTable
CREATE TABLE "Animation" (
    "id" SERIAL NOT NULL,
    "streamer" VARCHAR(12),
    "size" INTEGER,
    "color" VARCHAR(10),

    CONSTRAINT "Animation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "streamer" VARCHAR(12),
    "name" "Categories",

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "streamer" VARCHAR(12),
    "amount" DOUBLE PRECISION NOT NULL,
    "message" VARCHAR(256),
    "display_time_seconds" INTEGER,
    "subaddress" VARCHAR(95),
    "confirmations" INTEGER,
    "giphy_url" VARCHAR(100),
    "donor" VARCHAR(24),
    "timestamp" TIMESTAMP(6),

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation_settings" (
    "streamer" VARCHAR(12) NOT NULL,
    "second_price" INTEGER,
    "char_price" DOUBLE PRECISION,
    "char_limit" INTEGER,
    "min_amount" INTEGER,
    "gifs_min_amount" DOUBLE PRECISION,
    "goal" DOUBLE PRECISION,
    "goal_progress" REAL,
    "goal_reached" BOOLEAN,

    CONSTRAINT "Donation_settings_pkey" PRIMARY KEY ("streamer")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "streamer" VARCHAR(12),
    "start_date" TIMESTAMP(6),
    "end_date" TIMESTAMP(6),
    "plan_type" "Plan_types",
    "paid_status" "Paid_statuses",
    "subaddress" VARCHAR(95),

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "streamer" VARCHAR(12) NOT NULL,
    "url" VARCHAR(100),
    "platform" "Platforms",
    "language" "Languages",
    "category" INTEGER,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("streamer")
);

-- CreateTable
CREATE TABLE "Streamer" (
    "id" VARCHAR(12) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "alias" VARCHAR(24) NOT NULL,
    "socket" VARCHAR(20),

    CONSTRAINT "Streamer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "streamer" VARCHAR(12) NOT NULL,
    "restore_height" INTEGER,
    "last_sync_height" INTEGER,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("streamer")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_name_key" ON "Streamer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_alias_key" ON "Streamer"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_socket_key" ON "Streamer"("socket");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Animation" ADD CONSTRAINT "Animation_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Donation_settings" ADD CONSTRAINT "Donation_settings_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_streamer_fkey" FOREIGN KEY ("streamer") REFERENCES "Streamer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

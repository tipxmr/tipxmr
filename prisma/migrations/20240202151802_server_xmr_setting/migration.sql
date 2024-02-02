-- CreateTable
CREATE TABLE "ServerXmrSetting" (
    "id" SERIAL NOT NULL,
    "currentSubaddressIndex" INTEGER NOT NULL DEFAULT 1,
    "restoreHeight" INTEGER NOT NULL DEFAULT 2000000,

    CONSTRAINT "ServerXmrSetting_pkey" PRIMARY KEY ("id")
);

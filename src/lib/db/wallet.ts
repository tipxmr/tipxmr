import { Wallet } from "@prisma/client";
import prisma from "../prisma";

export const getStreamers = () => prisma.streamer.findMany({});

export const getWallet = async (streamer: Wallet["streamer"]) => {
  // TODO manual error handeling
  return await prisma.wallet.findUnique({
    where: {
      streamer,
    },
  });
};

export const updateWalletSettings = (
  streamer: Wallet["streamer"],
  data: {
    lastSyncHeight?: Wallet["lastSyncHeight"];
    restoreHeight?: Wallet["restoreHeight"];
  }
) => {
  console.log(`DB Streamer: ${streamer}`);
  console.log(`DB Data: `, data);
  return prisma?.wallet.update({
    where: {
      streamer,
    },
    data,
  });
};

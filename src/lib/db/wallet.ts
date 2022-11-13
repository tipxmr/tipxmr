import { Wallet } from "@prisma/client";

import prisma from "../prisma";

type WalletSettingsUpdate = Pick<Wallet, "lastSyncHeight" | "restoreHeight">;

export const getStreamers = () => prisma.streamer.findMany({});

export const getWallet = async (streamer: Wallet["streamer"]) => {
  // TODO manual error handeling
  return prisma.wallet.findUnique({
    where: {
      streamer,
    },
  });
};

export const updateWalletSettings = (
  streamer: Wallet["streamer"],
  data: WalletSettingsUpdate
) => {
  return prisma?.wallet.update({
    where: {
      streamer,
    },
    data,
  });
};

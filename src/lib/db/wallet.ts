import { Wallet } from "@prisma/client";
import prisma from "../prisma";

export const getStreamers = () => prisma.streamer.findMany({});

export const getWallet = (streamer: Wallet["streamer"]) => {
  // TODO manual error handeling
  return prisma.wallet.findUnique({
    where: {
      streamer,
    },
  });
};

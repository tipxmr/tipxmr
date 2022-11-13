import { Streamer } from "@prisma/client";

import prisma from "../prisma";

type StreamerEssentials = Pick<Streamer, "name" | "alias" | "socket">;

export const getStreamers = () => prisma.streamer.findMany({});

export const getStreamer = (id: Streamer["id"]) => {
  // TODO manual error handeling
  return prisma.streamer.findUnique({
    where: {
      id,
    },
  });
};

export const removeStreamer = (id: Streamer["id"]) => {
  return prisma.streamer.delete({
    where: {
      id,
    },
  });
};

export const createStreamer = (
  id: Streamer["id"],
  data: StreamerEssentials
) => {
  // TODO implement current blockheight - 10 here as the default restoreHeight for the wallet
  return prisma?.streamer.create({
    data: {
      id,
      ...data,
      Account: { create: {} },
      wallet: { create: {} },
      donationSetting: { create: {} },
    },
  });
};

export const updateStreamer = (
  id: Streamer["id"],
  data: StreamerEssentials
) => {
  return prisma?.streamer.update({
    where: {
      id,
    },
    data,
  });
};

export const getStreamerByName = (name: Streamer["name"]) => {
  return prisma.streamer.findUnique({
    where: {
      name,
    },
  });
};

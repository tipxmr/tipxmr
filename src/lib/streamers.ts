import prisma from "./prisma";
import { Streamer } from "../data/types";

export const getStreamers = () => prisma.streamer.findMany({});

export const getStreamer = (id: Streamer["id"]) => {
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
  data: {
    name: Streamer["name"];
    alias: Streamer["alias"];
    socket?: Streamer["socket"];
  }
) => {
  return prisma?.streamer.create({
    data: {
      id,
      ...data,
    },
  });
};

export const updateStreamer = (
  id: Streamer["id"],
  data: {
    name: Streamer["name"];
    alias: Streamer["alias"];
    socket?: Streamer["socket"];
  }
) => {
  return prisma?.streamer.update({
    where: {
      id,
    },
    data,
  });
};

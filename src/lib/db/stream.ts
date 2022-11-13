import { Stream } from "@prisma/client";

import prisma from "../prisma";

export const getStreamByStreamer = async (streamer: Stream["streamer"]) => {
  // TODO manual error handeling
  return prisma.stream.findUnique({
    where: {
      streamer,
    },
  });
};

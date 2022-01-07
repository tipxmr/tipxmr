import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    prisma?.streamer.findMany({}).then((streamers) => {
      res.status(200).json(streamers);
    });
  }
}

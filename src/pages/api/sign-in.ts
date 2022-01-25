import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  if ("hash" in body && typeof body.hash === "string") {
    const id = body.hash as string;

    try {
      const streamer = await prisma.streamer.findUnique({
        where: { id },
      });

      if (streamer) {
        res.status(200).json(streamer);
      } else {
        res.status(404).json(false);
      }
    } catch (reason) {
      console.error(reason);
      res.status(500).json(false);
    }
  } else {
    res.status(500).json(false);
  }
}

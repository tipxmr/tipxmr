import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    loginPostHandler(req, res);
  } else {
    res.status(404).end();
  }
}

export const loginPostHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { hashedSeed } = req.body;
  prisma?.streamer
    .findUnique({
      where: {
        id: hashedSeed.slice(0, 11),
      },
      include: {
        account: true,
        wallet: true,
      },
    })
    .then((streamer) => {
      if (streamer) {
        res.status(200).json(streamer);
      } else {
        res.status(401).end();
      }
    });
};

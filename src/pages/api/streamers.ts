import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    streamerGetHandler(req, res);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const streamerGetHandler = (req: NextApiRequest, res: NextApiResponse) => {
  prisma?.streamer.findMany({}).then((streamers) => {
    res.status(200).json(streamers);
  });
};

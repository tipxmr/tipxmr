import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    streamersGetHandler(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const streamersGetHandler = (req: NextApiRequest, res: NextApiResponse) => {
  prisma?.streamer.findMany({}).then((streamers) => {
    res.status(200).json(streamers);
  });
};

import { Streamer } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { createStreamer, getStreamers } from "~/lib/db/streamer";

const handler: NextApiHandler = async (req, res) => {
  console.log(req.query);
  switch (req.method) {
    case "GET":
      streamerGetHandler(req, res);
      break;
    case "POST":
      streamerPostHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const streamerGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const streamers = await getStreamers();
    res.status(200).json(streamers);
  } catch (reason) {
    console.warn(reason);
    res.status(500).json({ error: "failed to load data" });
  }
};

const streamerPostHandler = async (
  req: Omit<NextApiRequest, "body"> & {
    body: Pick<Streamer, "id" | "alias" | "name">;
  },
  res: NextApiResponse
) => {
  const { id, name, alias } = req.body;
  try {
    const result = await createStreamer(id, {
      name,
      alias,
      socket: `${Date.now()}`,
    });

    res.json({ isLoggedIn: true, ...result });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: "failed to load data" });
  }
};

export default handler;

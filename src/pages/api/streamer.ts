import { Streamer } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getStreamers, createStreamer } from "../../lib/streamers";

type ResponseData = Streamer[] | { error: string };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    streamerGetHandler(req, res);
  } else if (req.method === "POST") {
    streamerPostHandler(req, res);
  } else {
    res.setHeader("Allow", ["GET, POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const streamerGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const streamers = await getStreamers();
    res.status(200).json(streamers);
  } catch (reason) {
    res.status(500).json({ error: "failed to load data" });
  }
};

const streamerPostHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, name, alias, socket } = req.body;
  const result = await createStreamer(String(id), { name, alias, socket });
  res.status(200).json(result);
};

export default handler;

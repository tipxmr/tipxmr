import { Streamer } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getStreamers } from "../../lib/streamers";

type ResponseData = Streamer[] | { error: string };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const streamers = await getStreamers();
      res.status(200).json(streamers);
    } catch (reason) {
      res.status(500).json({ error: "failed to load data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;

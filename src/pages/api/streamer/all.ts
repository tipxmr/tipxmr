import { Streamer } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getStreamers } from "~/lib/db/streamer";

type ResponseData = Streamer[] | { error: string };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    streamerGetHandler(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} not Allowed`);
  }
}

const streamerGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const streamers = await getStreamers();
    res.status(200).json({ data: streamers });
  } catch (reason) {
    res.status(500).json({ error: "failed to load data" });
  }
};

export default handler;

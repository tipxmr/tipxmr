import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { getStreamerByName } from "~/lib/db/streamer";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      streamerGetHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const streamerGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { name } = req.query;
    const streamer = await getStreamerByName(String(name));

    res.status(200).json({ data: streamer });
  } catch (reason) {
    res.status(500).json({ error: "failed to load" });
  }
};

export default handler;

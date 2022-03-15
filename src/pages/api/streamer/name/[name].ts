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
  const { name } = req.query;
  const result = await getStreamerByName(String(name));

  res.status(200).json(result);
};

export default handler;

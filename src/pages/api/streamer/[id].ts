import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  getStreamer,
  removeStreamer,
  updateStreamer,
} from "~/lib/db/streamer";

const handler: NextApiHandler = async (req, res) => {
  console.log(req.query);
  switch (req.method) {
    case "GET":
      streamerGetHandler(req, res);
      break;
    case "PUT":
      streamerPutHandler(req, res);
      break;
    case "DELETE":
      streamerDeleteHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const streamerGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const id  = req.query.id as string;
    const streamer = await getStreamer(id);

    res.status(200).json(streamer);
  } catch (reason) {
    console.warn(reason);
    res.status(500).json({ message: "failed to load data" });
  }
};

/* const streamerPostHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id  = req.query.id as string;
  const { name, alias, socket } = req.body;
  const result = await createStreamer(id, { name, alias, socket });

  res.json(result);
}; */

const streamerDeleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id  = req.query.id as string;
  const result = await removeStreamer(id);

  res.json(result);
};

const streamerPutHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id  = req.query.id as string;
  const { name, alias, socket } = req.body;
  const result = await updateStreamer(id, { name, alias, socket });

  res.json(result);
};

export default handler;

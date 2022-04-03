import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  createStreamer,
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
    case "POST":
      streamerPostHandler(req, res);
      break;
    case "PUT":
      streamerPutHandler(req, res);
      break;
    case "DELETE":
      streamerDeleteHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const streamerGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  const result = await getStreamer(String(id));

  res.json(result);
};

const streamerPostHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  const { name, alias, socket } = req.body;
  console.log({ id, name, alias, socket });
  const result = await createStreamer(String(id), { name, alias, socket });

  res.json(result);
};

const streamerDeleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  const result = await removeStreamer(String(id));

  res.json(result);
};

const streamerPutHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  const { name, alias, socket } = req.body;
  const result = await updateStreamer(String(id), { name, alias, socket });

  res.json(result);
};

export default handler;

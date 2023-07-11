import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import prisma from "~/lib/prisma";

const handler: NextApiHandler = async (req, res) => {
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
  res: NextApiResponse,
) => {
  try {
    const id = req.query.id as string;
    const streamer = await prisma?.streamer.findUniqueOrThrow({
      where: { id },
    });

    res.status(200).json(streamer);
  } catch (reason) {
    console.warn(reason);
    res.status(500).json({ message: "failed to load data" });
  }
};

const streamerDeleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const id = req.query.id as string;

  if (!id) {
    res.status(400).json({ error: "Missing id on request query" });
    throw Error("Provide a streamer id to delete");
  }

  try {
    const result = await prisma?.streamer.delete({ where: { id } });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Streamer could not be deleted`, error });
  }
};

const streamerPutHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const id = req.query.id as string;

  if (!id) {
    res.status(400).json({ error: "Missing id on request query" });
    throw Error("Provide a streamer id");
  }

  try {
    const { name, alias, socket } = req.body;
    const updatedStreamer = await prisma?.streamer.update({
      where: { id },
      data: { name, alias, socket },
    });
    res.json(updatedStreamer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Streamer could not be updated`, error });
  }
};

export default handler;

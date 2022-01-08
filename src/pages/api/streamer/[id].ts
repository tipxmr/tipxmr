import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
}

const streamerGetHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  prisma?.streamer
    .findUnique({
      where: {
        id: String(id),
      },
    })
    .then((streamers) => {
      res.status(200).json(streamers);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const streamerPostHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, alias, socket } = req.body;
  prisma?.streamer
    .create({
      data: {
        id,
        name,
        alias,
        socket: socket || "",
      },
    })
    .then((streamer) => {
      res.status(200).json(streamer);
    });
};

const streamerDeleteHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  prisma?.streamer
    .delete({
      where: {
        id,
      },
    })
    .then((streamer) => {
      res.status(200).json(streamer);
    });
};

const streamerPutHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, alias, socket } = req.body;
  prisma?.streamer
    .update({
      where: {
        id,
      },
      data: {
        name,
        alias,
        socket: socket || "",
      },
    })
    .then((streamer) => {
      res.status(200).json(streamer);
    });
};

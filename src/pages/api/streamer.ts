import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    streamerGetHandler(req, res);
  } else if (req.method === "POST") {
    streamerPostHandler(req, res);
  } else if (req.method === "DELETE") {
    streamerDeleteHandler(req, res);
  } else if (req.method === "PUT") {
    streamerPutHandler(req, res);
  } else {
    res.status(404).end();
  }
}

const streamerGetHandler = (req: NextApiRequest, res: NextApiResponse) => {
  prisma?.streamer.findMany({}).then((streamers) => {
    res.status(200).json(streamers);
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

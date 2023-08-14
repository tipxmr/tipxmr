import { Streamer } from "@prisma/client";
import * as monerojs from "monero-javascript";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import prisma from "~/lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      streamerGetHandler(req, res);
      break;
    case "POST":
      streamerPostHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const streamerGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const allStreamers = await prisma?.streamer.findMany();
    res.status(200).json(allStreamers);
  } catch (reason) {
    console.warn(reason);
    res.status(500).json({ message: `failed to load streamers`, reason });
  }
};

const streamerPostHandler = async (
  req: Omit<NextApiRequest, "body"> & {
    body: Pick<Streamer, "id" | "alias" | "name">;
  },
  res: NextApiResponse,
) => {
  const { id, name, alias } = req.body;
  try {
    const newStreamer = await prisma?.streamer.create({
      data: {
        id,
        name,
        alias,
      },
    });

    if (!newStreamer) {
      res.status(500).json({ message: "Failed to create new streamer" });
      return;
    }

    const donationSettings = await prisma?.donationSetting.create({
      data: {
        streamer: newStreamer.id,
      },
    });

    /* const daemon = await monerojs.connectToDaemonRpc({
      uri: "http://node.sethforprivacy.com:38089",
    });

    const lastBlockHeight = await daemon.getHeight(); */

    const walletSettings = await prisma?.wallet.create({
      data: {
        streamer: newStreamer.id,
        restoreHeight: 1400159, // lastBlockHeight - 20 || 0,
        lastSyncHeight: 0,
      },
    });

    if (!donationSettings || !walletSettings) {
      res.status(500).json({ message: "Failed to create new streamer" });
      return;
    }

    res.json({ isLoggedIn: true, ...newStreamer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create new streamer", error });
  }
};

export default handler;

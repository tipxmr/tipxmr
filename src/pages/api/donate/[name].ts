import { Donation } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import prisma from "~/lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      donationGetHandler(req, res);
      break;
    case "POST":
      donationPostHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const donationGetHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { name } = req.query;

  if (!name) {
    res.status(400).json({ error: "Missing name on request query" });
    return;
  }

  const result = await prisma.donation.findFirstOrThrow({
    where: { streamer_donationTostreamer: { name: String(name) } },
  });
  res.json(result);
};

const donationPostHandler = async (
  req: Omit<NextApiRequest, "body"> & {
    body: Pick<Donation, "socketDonor" | "subaddress">;
  },
  res: NextApiResponse,
) => {
  const { name } = req.query;
  const { socketDonor, subaddress } = req.body;

  if (!name) {
    res.status(400).json({ error: "Missing name on request query" });
    return;
  }

  if (!socketDonor || !subaddress) {
    res.status(400).json({ error: "Missing data on request body" });
    return;
  }

  const streamer = await prisma.streamer.findFirstOrThrow({
    where: { name: String(name) },
  });

  const result = await prisma?.donation.create({
    data: {
      streamer: streamer.id,
      subaddress: subaddress,
      socketDonor: socketDonor,
    },
  });

  res.json(result);
};

export default handler;

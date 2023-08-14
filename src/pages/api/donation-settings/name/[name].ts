import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import prisma from "~/lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      getStreamerDonationSettings(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const getStreamerDonationSettings = async (
  request: NextApiRequest,
  response: NextApiResponse,
) => {
  const { name } = request.query;

  if (!name) {
    response.status(400).json({ error: "Missing name on request query" });
    throw Error("Provide a streamer name");
  }

  try {
    const donationSettings = await prisma?.donationSetting.findFirst({
      where: { streamer_donation_settingsTostreamer: { name: String(name) } },
    });

    if (donationSettings) {
      response.status(200).json(donationSettings);
      return;
    }

    response.status(404).json({ error: "DontationSettings not found by name" });
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response.status(500).json({
        message: `DontationSettings could not be fetched: ${message}`,
        error,
      });
    }
  }
};

export default handler;

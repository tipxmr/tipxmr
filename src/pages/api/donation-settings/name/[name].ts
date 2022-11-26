import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { getDonationSettings } from "~/lib/db/donationSettings";

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
  response: NextApiResponse
) => {
  const name = request.query.name as string;

  if (!name) throw Error("Provide a streamer name");

  try {
    const donationSettings = await getDonationSettings(name);

    if (donationSettings) {
      response.status(200).json(donationSettings);
      return;
    }

    response.status(404).json({ error: "DontationSettings not found by name" });
    throw new Error("DontationSettings not found by name");
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response
        .status(500)
        .json({ error: `DontationSettings could not be fetched ${message}` });
    }
  }
};

export default handler;

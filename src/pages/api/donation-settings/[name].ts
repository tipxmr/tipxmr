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
  const { name } = request.query;

  try {
    const donationSettings = await getDonationSettings(String(name));

    if (donationSettings) {
      response.status(200).json({ donationSettings });
    }

    throw new Error("This user does not exist");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response
        .status(500)
        .json({ error: `failed to create streamer, ${message}` });
    }
    console.error(error);
  }
};

export default handler;

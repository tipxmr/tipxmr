import { DonationSetting } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import {
  DonationSettingUpdate,
  updateDonationSettings,
} from "~/lib/db/donationSettings";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "PUT":
      updateStreamerSettings(req, res);
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

async function updateStreamerSettings(
  request: Omit<NextApiRequest, "body"> & { body: DonationSettingUpdate },
  response: NextApiResponse
) {
  const session = await unstable_getServerSession(
    request,
    response,
    authOptions
  );

  // TODO: Build middleware to check if user is logged in
  if (!session) {
    response.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  try {
    const { body } = request;
    const result = await updateDonationSettings(String(user.id), body);
    response.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response
        .status(500)
        .json({ error: `failed to create streamer, ${message}` });
    }
  }
}

export default handler;

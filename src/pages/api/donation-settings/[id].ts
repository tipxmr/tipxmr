import { DonationSetting } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import prisma from "~/lib/prisma";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "PUT":
      updateDonationSettings(req, res);
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

async function updateDonationSettings(
  request: Omit<NextApiRequest, "body"> & { body: Partial<DonationSetting> },
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);

  if (!session?.user) {
    response.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  try {
    const { body } = request;
    const result = await prisma?.donationSetting.update({
      where: {
        streamer: session.user?.id,
      },
      data: body,
    });
    response.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response
        .status(500)
        .json({ error: `failed to update donation settings, ${message}` });
    }
  }
}

export default handler;

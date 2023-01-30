import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { clamp } from "ramda";

import prisma from "~/lib/prisma";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      getDonationHistory(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

async function getDonationHistory(
  request: Omit<NextApiRequest, "body">,
  response: NextApiResponse
) {
  const user = await getServerSession(request, response, authOptions);

  // TODO: Build middleware to check if user is logged in
  if (!user || user.isLoggedIn === false) {
    response.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  try {
    const limitParam = parseInt(request.query.limit as string);
    const maxLimit = 10000;
    const defaultLimit = 100;
    const limit = clamp(1, maxLimit, limitParam || defaultLimit);

    const indexParam = parseInt(request.query.index as string);
    const defaultIndex = 0;
    const index = indexParam || defaultIndex;

    const [donations, total] = await prisma.$transaction([
      prisma.donation.findMany({
        orderBy: [{ timestamp: "desc" }],
        where: {
          streamer: String(user.id),
        },
        take: limit,
        skip: index,
      }),
      prisma.donation.count({
        where: {
          streamer: String(user.id),
        },
      }),
    ]);

    response.status(200).json({
      pageCount: Math.ceil(total / limit),
      rows: donations,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response
        .status(500)
        .json({ error: `failed to fetch donations, ${message}` });
    }
  }
}

export default handler;

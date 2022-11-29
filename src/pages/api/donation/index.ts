import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { clamp } from "ramda";

import { getDonations } from "~/lib/db/donation";
import { withSessionRoute } from "~/lib/withSession";

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
  const user = request.session.user;

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
    const donations = await getDonations(String(user.id), limit);
    response.status(200).json(donations);
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

export default withSessionRoute(handler);

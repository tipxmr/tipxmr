import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import prisma from "~/lib/prisma";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      handlePost(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

async function handlePost(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, authOptions);
  const user = session?.user;

  if (!user) {
    response.status(401).json({
      message: "Not Authenticated",
    });
    console.log("Not Authenticated", session);
    return;
  }

  try {
    const { body } = request;

    const { data } = body?.walletSettings;

    const result = await prisma?.wallet.update({
      where: { streamer: user.id },
      data,
    });

    response.status(200).json({ result });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response
        .status(500)
        .json({ error: `failed to create streamer, ${message}` });
    }
    console.error(error);
  }
}

export default handler;

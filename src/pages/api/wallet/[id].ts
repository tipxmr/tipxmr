import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import prisma from "~/lib/prisma";

import { authOptions } from "../auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;

  if (!session?.user || session.user?.id !== id) {
    res.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  if (!id) {
    res.status(400).json({ error: "Missing streamer id on request query" });
    throw Error("Provide a streamer id");
  }

  switch (req.method) {
    case "GET":
      getWallet(req, res);
      break;
    case "PUT":
      updateWallet(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const getWallet = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { id } = request.query;

  try {
    const walletSettings = await prisma?.wallet.findUnique({
      where: { streamer: String(id) },
    });

    response.status(200).json(walletSettings);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response.status(500).json({ error: message });
    }
    console.error(error);
  }
};

const updateWallet = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { id } = request.query;

  try {
    const wallet = await prisma?.wallet.update({
      where: { streamer: String(id) },
      data: request.body,
    });

    response.status(200).json(wallet);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response.status(500).json({ error: message });
    }
    console.error(error);
  }
};

export default handler;

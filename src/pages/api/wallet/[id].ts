import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      getWallet(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const getWallet = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { id } = request.query;

  if (!id) {
    response.status(400).json({ error: "Missing id on request query" });
    throw Error("Provide a wallet id");
  }

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

export default handler;

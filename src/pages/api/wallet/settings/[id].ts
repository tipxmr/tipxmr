import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { getWallet } from "~/lib/db/wallet";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      getWalletInfo(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const getWalletInfo = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { id } = request.query;

  if (!id) throw new Error("Provide a streamer id");

  try {
    const walletSettings = await getWallet(String(id));
    console.log("Got wallet settings", walletSettings);

    if (walletSettings) {
      response.status(200).json({ data: walletSettings });
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

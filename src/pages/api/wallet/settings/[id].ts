import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "~/lib/session";
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
  const user = request.session.user;
  if (!user || user.isLoggedIn === false) {
    response.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  const { id } = request.query;

  if (!id) throw new Error("Provide a streamer id");

  try {
    const walletSettings = await getWallet(String(id));
    console.log("Got wallet settings", walletSettings);

    if (walletSettings) {
      response.status(200).json({ walletSettings });
      return;
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

export default withIronSessionApiRoute(handler, sessionOptions);

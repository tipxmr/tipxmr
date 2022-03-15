// First tries to get info about the account from the db
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getAccount } from "~/lib/db/account";
import { getDonationSettings } from "~/lib/db/donationSettings";
import { getWallet } from "~/lib/db/wallet";
import { sessionOptions } from "~/lib/session";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      getStreamerSettings(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

async function getStreamerSettings(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const user = request.session.user;
  if (!user || user.isLoggedIn === false) {
    response.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  try {
    const account = await getAccount(String(user.id));
    const donationSettings = await getDonationSettings(String(user.id));
    const wallet = await getWallet(String(user.id));

    console.log(donationSettings);
    response.status(200).json({ account, donationSettings, wallet });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const { message } = error;
      response
        .status(500)
        .json({ error: `failed to create streamer, ${message}` });
    }
    console.error(error);
  }

  response.json({ secret: "you're looking good today" });
}

export default withIronSessionApiRoute(getStreamerSettings, sessionOptions);

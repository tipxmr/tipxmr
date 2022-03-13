// First tries to get info about the account from the db
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "~/lib/session";
import { getSettings } from "~/lib/streamerSettings"


const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      getStreamerSettings(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}

async function getStreamerSettings(request: NextApiRequest, response: NextApiResponse) {
  const user = request.session.user;

  if (!user || user.isLoggedIn === false) {
    response.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  response.json({ secret: "you're looking good today" });
}

export default withIronSessionApiRoute(getStreamerSettings, sessionOptions);

import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "~/lib/session";


async function secretRoute(request: NextApiRequest, response: NextApiResponse) {
  const user = request.session.user;

  if (!user || user.isLoggedIn === false) {
    response.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  response.json({ secret: "you're looking good today" });
}

export default withIronSessionApiRoute(secretRoute, sessionOptions);

import { NextApiRequest, NextApiResponse } from "next";

import { User } from "~/lib/config";
import { withSessionRoute } from "~/lib/withSession";

export default withSessionRoute(logoutRoute);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}

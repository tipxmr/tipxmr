import { NextApiRequest, NextApiResponse } from "next";
import { PartialStreamer } from "~/lib/config";
import { withSessionRoute } from "~/lib/withSession";

export default withSessionRoute(logoutRoute);

function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<PartialStreamer>
) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}

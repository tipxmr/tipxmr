import { NextApiRequest, NextApiResponse } from "next";

import { withSessionRoute } from "~/lib/withSession";

export default withSessionRoute(sessionRoute);

async function sessionRoute(req: NextApiRequest, res: NextApiResponse) {
  res.json({ session: req?.session });
}

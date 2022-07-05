import { NextApiRequest, NextApiResponse } from "next";
import { User } from "~/lib/config";
import { withSessionRoute } from "~/lib/withSession";

export default withSessionRoute(userRoute);

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { session } = req;
  if (session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed

    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}

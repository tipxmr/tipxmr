import type { User } from "~/pages/apiuser";
import prisma from "~/lib/prisma"

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.hash as string;

  try {
    const streamer = await prisma.streamer.findUnique({
      where: { id },
      rejectOnNotFound: true
    });


    const user = { ...streamer, isLoggedIn: true } as User;

    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

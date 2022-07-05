import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "~/lib/withSession";
import { User } from "~/lib/config";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id as string;

  try {
    const streamer = await prisma.streamer.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });

    const user = { ...streamer, isLoggedIn: true } as User;

    req.session.user = user;
    await req.session.save();
    res.send(user);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: (error as Error).message });
  }
}

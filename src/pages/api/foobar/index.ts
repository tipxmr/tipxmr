import Boom from "@hapi/boom";
import { NextApiRequest } from "next";
import { Response } from "undici";

import prisma from "~/lib/prisma";
import wrapHandler from "~/lib/server/route/handler";

async function handler(request: NextApiRequest) {
  const id = request.query.id as string;

  const streamer = await prisma.streamer.findUnique({
    where: {
      id,
    },
  });

  if (streamer) {
    return Response.json(streamer);
  }

  throw Boom.notFound();
}

export default wrapHandler(handler);

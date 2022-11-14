import { PrismaClient } from "@prisma/client";
import { getIronSession } from "iron-session";
import { ServerResponse } from "node:http";
import type { Server } from "socket.io";
import invariant from "tiny-invariant";

import { ironOptions } from "../../config";
import { Namespaces } from "./nsp";

const prisma = new PrismaClient();

function setupStreamer({ streamerNsp }: Namespaces, io: Server) {
  streamerNsp.use(async (socket, next) => {
    // TODO: Is this recommended?
    const session = await getIronSession(
      socket.request,
      { headersSent: false } as ServerResponse,
      ironOptions
    );

    if (session?.user ?? false) {
      socket.request.session = session;
      next();
    } else {
      next(Error("Unauthenticated"));
    }
  });

  streamerNsp.on("connection", (socket) => {
    socket.on("online", async (socketId) => {
      invariant(socket.request.session.user, "Expected user to be logged in");

      const { id } = socket.request.session.user;

      const result = await prisma.streamer.update({
        where: { id },
        data: {
          isOnline: true,
          socket: socketId,
        },
      });

      console.log(result);
    });

    socket.on("offline", async () => {
      invariant(socket.request.session.user, "Expected user to be logged in");

      const { id } = socket.request.session.user;

      const result = await prisma.streamer.update({
        where: { id },
        data: {
          isOnline: false,
          socket: "",
        },
      });

      console.log(result);
    });

    socket.on("disconnect", (reason) => {
      console.error(reason);
    });
  });
}

export default setupStreamer;

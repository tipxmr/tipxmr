import { PrismaClient } from "@prisma/client";
import { getIronSession } from "iron-session";
import { ServerResponse } from "node:http";
import { Server, Socket } from "socket.io";
import { ironOptions } from "../../config";

const prisma = new PrismaClient();

function setupStreamer(io: Server) {
  const streamerNsp = io.of("/streamer");

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

  streamerNsp.on("connection", onConnection);
}

function onConnection(socket: Socket) {
  console.log("streamer:connect");

  socket.on("streamer:online", async (socketId: string) => {
    console.log("streamer:online");
    console.log(socket.request.session.user);

    if (socket.request.session.user) {
      const { id } = socket.request.session.user;

      const result = await prisma.streamer.update({
        where: { id },
        data: {
          isOnline: true,
          socket: socketId,
        },
      });

      console.log(result);
    }
  });

  socket.on("streamer:offline", async () => {
    console.log("streamer:offline");
    console.log(socket.request.session.user);

    if (socket.request.session.user) {
      const { id } = socket.request.session.user;

      const result = await prisma.streamer.update({
        where: { id },
        data: {
          isOnline: false,
        },
      });

      console.log(result);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("streamer:disconnect");
    console.error(reason);
  });
}

export default setupStreamer;

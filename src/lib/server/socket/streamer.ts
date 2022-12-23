// import { ServerResponse } from "node:http";

import { PrismaClient, Streamer } from "@prisma/client";
import { Session } from "next-auth";
import { unstable_getServerSession } from "next-auth/next";
import type { Server } from "socket.io";
import invariant from "tiny-invariant";

import { authOptions } from "~/pages/api/auth/[...nextauth]";

import { Namespaces } from "./nsp";

const prisma = new PrismaClient();

declare module "http" {
  interface IncomingMessage {
    session:
      | (Session & {
          user?: Streamer;
        })
      | null;
  }
}

async function setupStreamer({ streamerNsp }: Namespaces, io: Server) {
  streamerNsp.use(async (socket, next) => {
    // TODO: Is this recommended?

    // TODO: Does this work?
    const session = await unstable_getServerSession(
      socket.request,
      { getHeader() {}, setCookie() {}, setHeader() {} },
      // socket.response,
      // { headersSent: false } as ServerResponse,
      authOptions
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
      invariant(socket.request.session?.user, "Expected user to be logged in");

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
      invariant(socket.request.session?.user, "Expected user to be logged in");

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

    socket.on("fetched", ({ donaterSocketId, subaddress }) => {
      donationNsp.to(donaterSocketId).emit("created", subaddress);
    });

    socket.on("disconnect", (reason) => {
      console.error(reason);
    });
  });
}

export default setupStreamer;

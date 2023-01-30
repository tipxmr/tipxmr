import { PrismaClient, Streamer } from "@prisma/client";
import cookie from "cookie";
import { IncomingMessage } from "http";
import { NextApiResponse } from "next";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
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

type Cookies = Partial<{ [key: string]: string }>;

async function setupStreamer(
  { streamerNsp, donationNsp }: Namespaces,
  io: Server
) {
  streamerNsp.use(async (socket, next) => {
    const request = {
      headers: socket.request.headers,
      cookies: cookie.parse(socket.request.headers.cookie ?? ""),
    } as IncomingMessage & { cookies: Cookies };

    const response = {} as NextApiResponse;

    response.getHeader = function getHeader() {
      return undefined;
    };

    response.setHeader = function setHeader() {
      return {} as NextApiResponse<any>;
    };

    // FIXME: Temporary solution to get NextAuth and Socket.IO working together
    const session = await getServerSession(request, response, authOptions);

    if (session?.user) {
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

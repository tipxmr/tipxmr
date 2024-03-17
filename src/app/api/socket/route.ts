import setupSocket from "~/server/socket";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

export type SocketServer = HTTPServer & {
  io?: IOServer;
};

export type SocketWithIO = NetSocket & {
  server: SocketServer;
};

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: SocketWithIO;
};

const socketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  const socketServer = res.socket.server;

  if (socketServer.io) {
    console.log("socket.io already initialized, skipping");
    res.end();
    return;
  }

  const io = new ServerIO(socketServer, {
    path: "/api/socket",
    serveClient: false,
    addTrailingSlash: false,
  });

  res.socket.server.io = io;

  setupSocket(io);
};

export default socketHandler;

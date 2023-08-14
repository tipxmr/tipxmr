import setupSocket from "lib/server/socket";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseWithSocket } from "../../types/next";

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

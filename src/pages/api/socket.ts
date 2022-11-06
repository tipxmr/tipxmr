import { NextApiRequest } from "next";
import { NextApiResponseWithSocket } from "../../types/next";
import { Server as ServerIO } from "socket.io";

import setupSocket from "lib/server/socket";

const socketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;

    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    });

    res.socket.server.io = io;

    setupSocket(io);
  } else {
    console.log("Socket is already running");
  }

  res.end();
};

export default socketHandler;

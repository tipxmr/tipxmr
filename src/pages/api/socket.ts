import setupSocket from "lib/server/socket";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseWithSocket } from "../../types/next";

const socketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;

    const io = new ServerIO(httpServer, {
      path: "/api/socket",
      serveClient: false,
    });

    res.socket.server.io = io;

    setupSocket(io);
  } 
  res.end();
};

export default socketHandler;

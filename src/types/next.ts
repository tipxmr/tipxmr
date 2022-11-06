import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { NextApiResponse } from "next";
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

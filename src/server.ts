import next from "next";
import { createServer } from "node:http";
import { parse } from "node:url";
import { Server } from "socket.io";
import setupSocket from "./lib/server/socket";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((request, response) => {
    const url = parse(request?.url ?? "", true);
    handle(request, response, url);
  });

  const io = new Server(httpServer, {
    path: "/ws",
  });

  setupSocket(io);

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });

  httpServer.on("error", (reason) => {
    console.error(reason);
  });
});

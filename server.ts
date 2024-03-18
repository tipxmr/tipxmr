import next from "next";
import { createServer } from "http";
import { Server } from "socket.io";
import { env } from "~/env";

const httpServer = createServer();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const PORT = env.WEBSOCKET_PORT ?? 3001;
const io = new Server(httpServer, {});
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  io.on("connection", (socket) => {
    console.log("client connected via websocket");
  });

  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

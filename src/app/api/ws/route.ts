import { type WebSocket } from "ws";
import { type IncomingMessage } from "http";
import { type WebSocketServer } from "ws";

export function SOCKET(
  client: WebSocket,
  request: IncomingMessage,
  server: WebSocketServer,
) {
  console.log("A client connected!");

  client.on("message", (message) => {
    client.send(message);
  });

  client.on("close", () => {
    console.log("A client disconnected!");
  });
}

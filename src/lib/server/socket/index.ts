import { Server } from "socket.io";

import setupDonation from "./donation";
import setupStreamer from "./streamer";

function setupSocket(io: Server) {
  setupStreamer(io);
  setupDonation(io);
}

export default setupSocket;

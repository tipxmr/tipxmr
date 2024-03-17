import type { Server } from "socket.io";

import setupDonation from "./donation";
import { DonationNsp, Namespaces, StreamerNsp } from "./namespace";
import setupStreamer from "./streamer";

function setupSocket(io: Server) {
  const streamerNsp: StreamerNsp = io.of("/streamer");
  const donationNsp: DonationNsp = io.of("/donation");

  const namespaces = {
    streamerNsp,
    donationNsp,
  } as Namespaces;

  setupStreamer(namespaces, io);
  setupDonation(namespaces, io);
}

export default setupSocket;

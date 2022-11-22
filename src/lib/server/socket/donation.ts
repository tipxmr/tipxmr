import type { Server } from "socket.io";

import { Namespaces } from "./nsp";

function setupDonation({ donationNsp, streamerNsp }: Namespaces, io: Server) {
  donationNsp.on("connection", (socket) => {
    socket.on("create", async (id) => {
      const streamer = await prisma?.streamer.findUnique({
        where: {
          id,
        },
      });

      // TODO get the by name for the socket id
      // TODO emit an event to the streamer that a new
      // socket
      // .to()

      if (streamer?.socket) {
        streamerNsp.to(streamer.socket).emit("fetch", socket.id);
      }
    });
  });
}

export default setupDonation;

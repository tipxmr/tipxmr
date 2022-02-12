import { Server } from "socket.io";

// function donationHandler(io, socket) {
//     const createOrder = (payload) => {    // ...  }
//         const readOrder = (orderId, callback) => {    // ...  }

//       return {
//         createOrder,
//         readOrder,
//       };
// }

// export default donationHandler

function setupDonation(io: Server) {
  const donationNsp = io.of("/donation");

  donationNsp.on("connection", (socket) => {
    socket.on("subaddress:create", (streamer) => {
      console.log({ streamer });

      // socket
      // .to()

      io.to(streamer.socket).emit("subaddress:fetch", socket.id);
    });

    socket.on("subaddress:fetched", (subaddress) => {
      io.to(subaddress.socket).emit("subaddress:created", subaddress);
    });
  });
}

export default setupDonation;

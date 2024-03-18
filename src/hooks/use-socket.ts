import { Streamer } from "@prisma/client";
import { useEffect } from "react";
import { io } from "socket.io-client";

import { queryClient } from "~/app/provider";
import { useWallet } from "~/context/useWalletContext";
import { DonationSocket, StreamerSocket } from "~/server/socket/namespace";
// import { transactionAddressAtom, walletAtom } from "~/store";

const streamerKeys = {
  all: ["streamer"] as const,
  online: () => [...streamerKeys.all, "online"] as const,
  subaddress: () => [...streamerKeys.all, "subaddress"] as const,
};

export default streamerKeys;
export const useStreamerSocket = () => {
  const { wallet } = useWallet();

  useEffect(() => {
    const socket: StreamerSocket = io("http://localhost:3001/streamer", {
      path: "/api/socket",
    });

    socket.on("connect_error", (reason) => {
      console.error(reason.message);
    });

    socket.on("connect", () => {
      socket.emit("online", socket.id ?? "");
      queryClient.invalidateQueries(streamerKeys.online());
    });

    socket.on("disconnect", () => {
      socket.emit("offline");
      queryClient.invalidateQueries(streamerKeys.online());
    });

    socket.on("fetch", async (donaterSocketId) => {
      // FIXME: This will work, but only for a single required subaddress
      // Maybe create an array as queue for pending subaddress generations
      // We could push the socketIds into the state to know where the
      // new address belongs to
      const subaddress = await wallet?.createSubaddress(0, "test");
      const address = subaddress?.getAddress();

      if (address) {
        socket.emit("fetched", {
          donaterSocketId,
          subaddress: address,
        });
      }
    });

    // socket.onAny((event, ...args) => {
    //   console.log("event");
    //   console.log(event);
    //   console.log(args);
    // });

    return () => {
      socket.emit("offline");
      socket.disconnect();
    };
  }, []);
};

export function useDonationSocket(streamerId: Streamer["id"]) {
  // const setTransactionAddress = useSetAtom(transactionAddressAtom);

  useEffect(() => {
    console.log({ streamerId });

    if (!streamerId) {
      return;
    }

    const socket: DonationSocket = io("http://localhost:3001/donation", {
      path: "/api/socket",
    });

    socket.on("connect", () => {
      socket.emit("create", streamerId);
    });

    socket.on("created", (subaddress: string) => {
      // TODO not sure if this works like this...
    });

    return () => {
      socket.disconnect();
    };
  }, [
    // setTransactionAddress,
    streamerId,
  ]);
}

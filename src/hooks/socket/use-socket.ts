import { Streamer } from "@prisma/client";
import { useAtom } from "jotai";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { io } from "socket.io-client";

import { queryClient } from "~/app/layout";
import streamerKeys from "~/features/streamer/queries";
import { DonationSocket, StreamerSocket } from "~/lib/server/socket/nsp";
import { transactionAddressAtom, walletAtom } from "~/store";

export const useStreamerSocket = () => {
  const [wallet] = useAtom(walletAtom);

  useEffect(() => {
    const socket: StreamerSocket = io("http://localhost:3000/streamer", {
      path: "/api/socket",
    });

    socket.on("connect_error", (reason) => {
      console.error(reason.message);
    });

    socket.on("connect", () => {
      socket.emit("online", socket.id);
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
      const address = await subaddress?.getAddress();

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
  const setTransactionAddress = useSetAtom(transactionAddressAtom);

  useEffect(() => {
    console.log({ streamerId });

    if (!streamerId) {
      return;
    }

    const socket: DonationSocket = io("http://localhost:3000/donation", {
      path: "/api/socket",
    });

    socket.on("connect", () => {
      socket.emit("create", streamerId);
    });

    socket.on("created", (subaddress: string) => {
      setTransactionAddress(subaddress);
    });

    return () => {
      socket.disconnect();
    };
  }, [streamerId]);
}

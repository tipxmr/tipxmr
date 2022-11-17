import { Streamer } from "@prisma/client";
import { useEffect } from "react";
import { io } from "socket.io-client";

import { queryClient } from "~/app/layout";
import streamerKeys from "~/features/streamer/queries";
import { DonationSocket, StreamerSocket } from "~/lib/server/socket/nsp";

export const useStreamerSocket = () => {
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

    socket.on("fetch", (...args) => {
      // FIXME: This will work, but only for a single required subaddress
      // Maybe create an array as queue for pending subaddress generations
      // We could push the socketIds into the state to know where the
      // new address belongs to
      queryClient.setQueryData(streamerKeys.subaddress(), "");
    });

    socket.onAny((event, ...args) => {
      console.log("event");
      console.log(event);
      console.log(args);
    });

    // websocket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);

    //   queryClient.setQueriesData(data.entity, (oldData) => {
    //     const update = (entity) =>
    //       entity.id === data.id ? { ...entity, ...data.payload } : entity;
    //     return Array.isArray(oldData) ? oldData.map(update) : update(oldData);
    //   });
    // };

    return () => {
      socket.emit("offline");
      socket.disconnect();
    };
  }, []);
};

export function useDonationSocket(streamerId: Streamer["id"]) {
  // const streamerId = queryClient.getQueryData<Streamer["id"]>([
  //   "donation",
  //   "streamer",
  // ]);

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
      console.log({ subaddress });
    });

    return () => {
      socket.disconnect();
    };
  }, [streamerId]);
}

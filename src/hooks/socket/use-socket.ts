import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

import streamerKeys from "~/features/streamer/queries";
import {
  StreamerClientToServerEvents,
  StreamerServerToClientEvents,
} from "~/lib/server/socket/streamer";

type StreamerSocket = Socket<
  StreamerServerToClientEvents,
  StreamerClientToServerEvents
>;

const useFooSocket = () => {
  const queryClient = useQueryClient();

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
  }, [queryClient]);
};

export default useFooSocket;

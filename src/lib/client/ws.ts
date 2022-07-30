import { Streamer } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

const DONATION_WS_URL = "http://localhost:3000/donation";
const DONATION_WS_CLIENT = "/ws";

function useWebsocket(recipient ?: Streamer["id"]) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryDefaults(["foobar"], {
      staleTime: Infinity,
    });
  }, [queryClient]);

  useEffect(() => {
    if (!recipient) {
      return;
    }

    const socket = io(DONATION_WS_URL, {
      path: DONATION_WS_CLIENT,
    });

    socket.on("connect", () => {
      socket.emit("subaddress:create", recipient);
    });

    socket.onAny((event, { entity, id }) => {
      console.log(event);
      console.log({ entity, id });

      // const queryKey = [...entity, id].filter(Boolean)
      // queryClient.invalidateQueries(queryKey);
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient, recipient]);
}

export default useWebsocket;

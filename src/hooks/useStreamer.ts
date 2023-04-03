import { Streamer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useStreamer(id: Streamer["id"] | undefined) {
  return useQuery({
    queryKey: ["streamer", id],
    queryFn: () => axios.get(`/api/streamer/${id}`).then((res) => res.data),
    enabled: Boolean(id),
    onError(err) {
      console.error(err);
    },
  });
}

import { Streamer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useStreamerByName(name: Streamer["name"]) {
  return useQuery<Streamer, AxiosError>({
    queryKey: ["streamer", name],
    queryFn: () =>
      axios.get(`/api/streamer/name/${name}`).then((res) => res.data),
    enabled: Boolean(name ?? ""),
    onError(err) {
      console.error(err);
    },
  });
}

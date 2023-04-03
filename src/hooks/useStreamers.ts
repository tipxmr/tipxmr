import { Streamer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useStreamers() {
  return useQuery<Streamer, AxiosError>({
    queryKey: ["streamers"],
    queryFn: () => axios.get(`/api/streamer`).then((res) => res.data),
  });
}

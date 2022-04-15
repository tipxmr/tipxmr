import { Streamer } from "@prisma/client";
import { useQuery } from "react-query";
import fetchJson from "~/lib/fetchJson";

async function fetchStreamers(): Promise<Streamer[]> {
  const { data } = await fetchJson<any>(`/api/streamer/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export default function useStreamers() {
  return useQuery(["streamers"], fetchStreamers);
}

import { Streamer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import fetchJson from "~/lib/fetchJson";

async function fetchStreamers() {
  return fetchJson<Streamer[]>(`/api/streamer`);
}

export default function useStreamers() {
  return useQuery(["streamers"], fetchStreamers);
}

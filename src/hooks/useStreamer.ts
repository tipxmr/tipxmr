import { Streamer } from "@prisma/client";
import { useQuery } from "react-query";
import fetchJson from "~/lib/fetchJson";

async function fetchStreamer(
  id: Streamer["id"] | undefined
): Promise<Streamer> {
  if (typeof id === "undefined") Promise.reject(new Error("Invalid ID"));

  const { data } = await fetchJson<any>(`/api/streamer/${id}`);
  return data;
}

export default function useStreamer(id: Streamer["id"] | undefined) {
  return useQuery(["streamer", id], () => fetchStreamer(id));
}

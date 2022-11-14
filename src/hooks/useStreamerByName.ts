import { Streamer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import fetchJson from "~/lib/fetchJson";

async function fetchStreamerByName(name: Streamer["name"]) {
  const { data } = await fetchJson<{ data: Streamer }>(
    `/api/streamer/name/${name}`
  );

  return data;
}

export default function useStreamerByName(name: Streamer["name"]) {
  return useQuery({
    queryKey: ["streamer", name],
    queryFn: () => fetchStreamerByName(name ?? ""),
    enabled: Boolean(name ?? ""),
  });
}

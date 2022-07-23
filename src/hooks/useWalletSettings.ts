import { Streamer, Wallet } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import fetchJson from "~/lib/fetchJson";

async function fetchWalletSettings(
  id: Streamer["id"] | undefined
): Promise<Wallet> {
  if (typeof id === "undefined") return Promise.reject(new Error("Invalid id"));

  const { data } = await fetchJson<any>(`/api/wallet/settings/${id}`);
  return data;
}

export default function useWalletSettings(id: Streamer["id"] | undefined) {
  return useQuery(["streamer", id], () => fetchWalletSettings(id));
}

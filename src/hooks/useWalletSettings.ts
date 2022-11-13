import { Streamer, Wallet } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import fetchJson from "~/lib/fetchJson";

async function fetchWalletSettings(
  id: Streamer["id"] | undefined
): Promise<Wallet> {
  const { data } = await fetchJson<any>(`/api/wallet/settings/${id}`);
  return data;
}

export default function useWalletSettings(id?: Streamer["id"]) {
  return useQuery<Wallet, Error>({
    queryKey: ["streamer", id],
    queryFn: () => fetchWalletSettings(id ?? ""),
    enabled: Boolean(id),
  });
}

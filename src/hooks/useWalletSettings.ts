import { Streamer, Wallet } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useWalletSettings(id?: Streamer["id"]) {
  return useQuery<Wallet, AxiosError>({
    queryKey: ["streamer", id],
    queryFn: () => axios.get(`/api/wallet/${id}`).then((res) => res.data),
    enabled: Boolean(id),
    onError: (err) => console.error(err),
  });
}

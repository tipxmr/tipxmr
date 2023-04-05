import { DonationSetting, Streamer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function useDonationSettings(name?: Streamer["name"]) {
  return useQuery<DonationSetting, AxiosError>({
    queryKey: ["streamer", name],
    enabled: Boolean(name),
    queryFn: () =>
      axios.get(`/api/donation-settings/name/${name}`).then((res) => res.data),
    onError: (err) => console.error(err),
  });
}

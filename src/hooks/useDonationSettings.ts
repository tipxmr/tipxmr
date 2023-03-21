import { DonationSetting, Streamer } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import fetchJson from "~/lib/fetchJson";

async function fetchDonationSettings(
  name: Streamer["name"]
): Promise<DonationSetting> {
  return fetchJson<DonationSetting>(`/api/donation-settings/name/${name}`);
}

export default function useDonationSettings(name?: Streamer["name"]) {
  console.log(`Trying to get the donation settings for ${name}`);
  return useQuery<DonationSetting, Error>({
    queryKey: ["streamer", name],
    enabled: Boolean(name),
    queryFn: () => fetchDonationSettings(name ?? ""),
  });
}

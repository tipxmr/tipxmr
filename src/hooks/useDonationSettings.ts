import { DonationSetting, Streamer } from "@prisma/client";
import { useQuery } from "react-query";
import fetchJson from "~/lib/fetchJson";

async function fetchDonationSettings(
  name?: Streamer["name"]
): Promise<DonationSetting> {
  if (name) {
    return fetchJson<DonationSetting>(`/api/donation-settings/name/${name}`);
  }
  throw Error("name is required");
}

export default function useDonationSettings(name?: Streamer["name"]) {
  console.log(`Trying to get the donation settings for ${name}`);
  return useQuery<DonationSetting, Error>(["streamer", name], () =>
    fetchDonationSettings(name)
  );
}

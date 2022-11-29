/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Donation } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import fetchJson from "~/lib/fetchJson";

async function fetchDonations(limit = 100): Promise<Donation[]> {
  return fetchJson(`/api/donation?limit=${limit}`);
}

export default function useTxHistory(limit = 100) {
  return useQuery<Donation[], Error>({
    queryKey: ["donationHistory", limit],
    queryFn: () => fetchDonations(limit),
  });
}

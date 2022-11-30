/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Donation } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import fetchJson from "~/lib/fetchJson";

interface Options {
  limit?: number;
  index?: number;
}

interface History {
  rows: Donation[];
  pageCount: number;
}

async function fetchDonations(options: Options): Promise<History> {
  const query = new URLSearchParams(Object.entries(options));
  return fetchJson(`/api/donation?${query}`);
}

export default function useTxHistory({ limit = 1, index = 0 }: Options) {
  const options = { limit, index };

  return useQuery<History, Error>({
    queryKey: ["donationHistory", options],
    queryFn: () => fetchDonations(options),
    keepPreviousData: true,
  });
}

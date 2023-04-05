/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Donation } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface Options {
  limit?: number;
  index?: number;
}

interface History {
  rows: Donation[];
  pageCount: number;
}

async function fetchDonations(options: Options): Promise<History> {
  const res = await axios.get(`/api/donation`, {
    params: {
      limit: options.limit,
      index: options.index,
    },
  });
  return res.data;
}

export default function useTxHistory({ limit = 1, index = 0 }: Options) {
  const options = { limit, index };

  return useQuery<History, AxiosError>({
    queryKey: ["donationHistory", options],
    queryFn: () => fetchDonations(options),
    onError: (err) => console.error(err),
    keepPreviousData: true,
  });
}

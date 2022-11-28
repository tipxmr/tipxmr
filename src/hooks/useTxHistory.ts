import { Donation, Streamer } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import fetchJson from '~/lib/fetchJson'

async function fetchDonations(id: Streamer['id']): Promise<Donation[]> {
  return fetchJson(`/api/donations/${id}`)
}

export default function useDonations(id?: Streamer['id']) {
  console.log(`Trying to get the donation history for ${id}`)
  return useQuery<Donation[], Error>({
    queryKey: ['donationHistory', id],
    queryFn: () => fetchDonations(id ?? ''),
    enabled: Boolean(id),
  })
}

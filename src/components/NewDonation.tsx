"use client";

import { Streamer } from "@prisma/client";
import { useAtomValue } from "jotai";
import QrCode from "qrcode";
import { useQuery } from "react-query";

import DonationMask from "~/components/Donation";
import { useDonationSocket } from "~/hooks/socket/use-socket";
import { createMoneroTransactionUri } from "~/lib/xmr";
import { transactionAddressAtom } from "~/store";

async function toQrCode(data: string) {
  return QrCode.toDataURL(data, { scale: 25 });
}

function NewDonation({ streamer }: { streamer: Streamer }) {
  // Guard so streamer is ALWAYS DEFINED
  useDonationSocket(streamer.id);

  const transactionAddress = useAtomValue(transactionAddressAtom);

  const transactionUri = createMoneroTransactionUri({
    address: transactionAddress,
    amount: 239.39014,
    description: "donation",
  });

  const { data: code } = useQuery({
    queryKey: ["qrcode", transactionUri],
    queryFn: () => toQrCode(transactionUri),
    enabled: Boolean(transactionAddress),
  });

  return (
    <DonationMask
      streamer={streamer}
      txAddress={transactionAddress}
      code={code}
    />
  );
}

export default NewDonation;

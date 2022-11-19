"use client";

import { Streamer } from "@prisma/client";
import { useEffect } from "react";

import { queryClient } from "~/app/layout";
import DonationMask from "~/components/Donation";
import { useDonationSocket } from "~/hooks/socket/use-socket";

const transactionAddress =
  "46BeWrHpwXmHDpDEUmZBWZfoQpdc6HaERCNmx1pEYL2rAcuwufPN9rXHHtyUA4QVy66qeFQkn6sfK8aHYjA3jk3o1Bv16em";

function NewDonation({ streamer, code }: { streamer: Streamer; code: string }) {
  // Guard so streamer is ALWAYS DEFINED
  //   console.log("Foobar");
  useDonationSocket(streamer.id);

  //   useEffect(() => {
  //     if (streamer?.id) {
  //       queryClient.setQueryData(["donation", "streamer"], streamer.id);
  //     }
  //   }, [streamer?.id]);

  return (
    <DonationMask
      streamer={streamer}
      txAddress={transactionAddress}
      code={code}
    />
  );
}

export default NewDonation;

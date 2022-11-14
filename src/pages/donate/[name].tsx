import { CircularProgress } from "@mui/material";
import { Streamer } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import QrCode from "qrcode";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import DonationMask from "~/components/Donation";
import Redirect from "~/components/Redirect";
import { useBarSocket } from "~/hooks/socket/use-socket";
import useStreamerByName from "~/hooks/useStreamerByName";

import { createMoneroTransactionUri } from "~/lib/xmr";
import { queryClient } from "../_app";

async function toQrCode(data: string) {
  return QrCode.toDataURL(data, { scale: 25 });
}

const transactionAddress =
  "46BeWrHpwXmHDpDEUmZBWZfoQpdc6HaERCNmx1pEYL2rAcuwufPN9rXHHtyUA4QVy66qeFQkn6sfK8aHYjA3jk3o1Bv16em";

function Foobar({ streamer, code }: { streamer: Streamer; code: string }) {
  // Guard so streamer is ALWAYS DEFINED
  console.log("Foobar");
  useBarSocket();

  return (
    <DonationMask
      streamer={streamer}
      txAddress={transactionAddress}
      code={code}
    />
  );
}

const DonateTo: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const { status, data: streamer, error } = useStreamerByName(name);

  const [code, setCode] = useState<string>("");

  const transactionUri = createMoneroTransactionUri({
    address: transactionAddress,
    amount: 239.39014,
    description: "donation",
  });

  useEffect(() => {
    if (streamer?.id) {
      queryClient.setQueryData(["donation", "streamer"], streamer.id);
    }
  }, [streamer?.id]);

  useEffect(() => {
    if (streamer) {
      toQrCode(transactionUri).then(setCode);
    }
  }, [transactionUri, streamer]);

  if (status === "error" && error instanceof Error) {
    console.error({ error });
    return <Redirect to="/donate" />;
  }

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (!streamer || !code) {
    return <CircularProgress />;
  }

  return <Foobar streamer={streamer} code={code} />;
};

export default DonateTo;

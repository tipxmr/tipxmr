import { CircularProgress } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import QrCode from "qrcode";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import DonationMask from "~/components/Donation";
import Redirect from "~/components/Redirect";
import useStreamerByName from "~/hooks/useStreamerByName";

import { createMoneroTransactionUri } from "~/lib/xmr";

async function toQrCode(data: string) {
  return QrCode.toDataURL(data, { scale: 25 });
}

const DonateTo: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const { status, data: streamer, error } = useStreamerByName(name);

  const [code, setCode] = useState<string>();

  const transactionAddress =
    "46BeWrHpwXmHDpDEUmZBWZfoQpdc6HaERCNmx1pEYL2rAcuwufPN9rXHHtyUA4QVy66qeFQkn6sfK8aHYjA3jk3o1Bv16em";
  const transactionUri = createMoneroTransactionUri({
    address: transactionAddress,
    amount: 239.39014,
    description: "donation",
  });

  useEffect(() => {
    if (!streamer) {
      return;
    }

    const socket = io("http://localhost:3000/donation", {
      path: "/api/socket",
    });

    socket.on("connect", () => {
      socket.emit("subaddress:create", streamer.id);
    });

    socket.on("subaddress:created", (subaddress: string) => {
      console.log({ subaddress });
    });

    return () => {
      socket.disconnect();
    };
  }, [streamer]);

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

  return (
    <DonationMask
      streamer={streamer}
      txAddress={transactionAddress}
      code={code}
    />
  );
};

export default DonateTo;

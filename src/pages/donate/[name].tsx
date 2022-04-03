import { CircularProgress } from "@mui/material";
import { Streamer } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import QrCode from "qrcode";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useSWR from "swr";
import { DonationMask } from "~/components";

import { createMoneroTransactionUri } from "~/lib/xmr";

async function toQrCode(data: string) {
  return QrCode.toDataURL(data, { scale: 25 });
}

const DonateTo: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const { data: streamer, error } = useSWR<Streamer>(
    `/api/streamer/name/${name}`
  );
  const [code, setCode] = useState<string>();

  const isLoading = !error && !streamer;
  const isError = error;

  const transactionAddress =
    "46BeWrHpwXmHDpDEUmZBWZfoQpdc6HaERCNmx1pEYL2rAcuwufPN9rXHHtyUA4QVy66qeFQkn6sfK8aHYjA3jk3o1Bv16em";
  const transactionUri = createMoneroTransactionUri({
    address: transactionAddress,
    amount: 239.39014,
    description: "donation",
  });

  if (isError) {
    console.error(error);
  }

  useEffect(() => {
    if (isError) {
      router.push("/donate");
    }
  }, [isError, router]);

  useEffect(() => {
    if (!isLoading && !streamer) {
      router.push("/donate");
    }
  }, [isLoading, streamer, router]);

  useEffect(() => {
    if (!streamer) {
      return;
    }

    const socket = io("http://localhost:3000/donation", {
      path: "/ws",
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

  if (isLoading) {
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

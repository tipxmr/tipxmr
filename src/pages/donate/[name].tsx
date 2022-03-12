import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Streamer } from "@prisma/client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import QrCode from "qrcode";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useSWR from "swr";

import { createMoneroTransactionUri } from "~/lib/xmr";

async function toQrCode(data: string) {
  return QrCode.toDataURL(data, { scale: 25 });
}

const DonateTo: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const { data, error } = useSWR<Streamer>(`/api/streamer/name/${name}`);
  const [code, setCode] = useState<string>();

  const streamer = data;
  const isLoading = !error && !streamer;
  const isError = error;

  const transactionAddress =
    "46BeWrHpwXmHDpDEUmZBWZfoQpdc6HaERCNmx1pEYL2rAcuwufPN9rXHHtyUA4QVy66qeFQkn6sfK8aHYjA3jk3o1Bv16em";
  const transactionUri = createMoneroTransactionUri({
    address: transactionAddress,
    amount: 239.39014,
    description: "donation",
  });

  console.log({ data, error, name });

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
    <Container>
      <Grid>
        <Typography>Donate to {streamer?.alias}</Typography>

        <Typography>Send XMR 0.13 (€4.50) to the following address:</Typography>

        <TextField
          fullWidth
          defaultValue={transactionAddress}
          helperText={<a href={transactionUri}>Open with Wallet</a>}
          inputProps={{
            readOnly: true,
            sx: {
              fontFamily: "monospace",
              textAlign: "center",
            },
          }}
        />

        <Box sx={{ position: "relative", textAlign: "center" }}>
          {code && (
            <Image
              src={code}
              alt=""
              title=""
              objectFit="contain"
              width={512}
              height={512}
            />
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex" }}>
          <Link href={`/donate`} passHref>
            <Button component="a">Back</Button>
          </Link>

          <Box sx={{ mx: "auto" }} />

          <Link href={`/donate`} passHref>
            <LoadingButton component="a" loading>
              Next
            </LoadingButton>
          </Link>
        </Box>
      </Grid>
    </Container>
  );
};

export default DonateTo;

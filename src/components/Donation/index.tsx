import { Grid, Typography } from "@mui/material";
import { Streamer } from "@prisma/client";
import { FC } from "react";
import StreamerChip from "~/components/StreamerChip";
import Subaddress from "~/components/Subaddress";
import PaperWrapper from "~/components/PaperWrapper";

import Image from "next/image";

interface IDonationMask {
  streamer: Streamer | undefined;
  txAddress: string;
  code: any;
}

const DonationMask: FC<IDonationMask> = ({ streamer, txAddress, code }) => {
  return (
    <PaperWrapper>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Donate to</Typography>
          <StreamerChip name={streamer?.alias} />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Send XMR 0.13 (€4.50) to the following address:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {txAddress && <Subaddress address={txAddress} />}
        </Grid>

        <Grid item xs={12}>
          {code && (
            <Image
              src={code}
              alt=""
              title=""
              objectFit="contain"
              width={256}
              height={256}
            />
          )}
        </Grid>
      </Grid>
    </PaperWrapper>
  );
};

export default DonationMask;

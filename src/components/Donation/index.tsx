import { Grid, Typography } from "@mui/material";
import { Streamer } from "@prisma/client";
import { FC } from "react";
import StreamerChip from "~/components/StreamerChip";
import Subaddress from "~/components/Subaddress";
import Image from "next/image";

interface DonationMaskProps {
  streamer: Streamer | undefined;
  txAddress: string;
  code: any;
}

const DonationMask: FC<DonationMaskProps> = ({ streamer, txAddress, code }) => {
  return (
    <div className="tip-border rounded-md p-2">
      <p>
        Donate to
        <StreamerChip name={streamer?.alias} />
      </p>

      <p>Send XMR 0.13 (€4.50) to the following address:</p>
      {txAddress && <Subaddress address={txAddress} />}
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
    </div>
  );
};

export default DonationMask;

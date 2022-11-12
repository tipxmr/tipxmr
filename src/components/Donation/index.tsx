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
    <div className="tip-border flex flex-col items-center space-y-4 rounded-lg md:py-2 lg:py-8">
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
    </div>
  );
};

export default DonationMask;

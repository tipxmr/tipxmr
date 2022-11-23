"use client";

import { Streamer } from "@prisma/client";
import Image from "next/image";
import type { FC } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

import StreamerChip from "~/components/StreamerChip";
import Subaddress from "~/components/Subaddress";

interface DonationMaskProps {
  streamer: Streamer | undefined;
  txAddress: string;
  code: string;
}

const DonationMask: FC<DonationMaskProps> = ({ streamer, txAddress, code }) => {
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

  return (
    <div className="tip-border m-2 flex flex-col items-center space-y-4 rounded-lg md:py-2 lg:py-8">
      <div>
        Donate to
        <StreamerChip name={streamer?.alias} />
      </div>

      <p>Send XMR 0.13 (€4.50) to the following address:</p>

      <Subaddress address={txAddress} />

      <Image
        src={code}
        alt=""
        title=""
        objectFit="contain"
        width={256}
        height={256}
      />
    </div>
  );
};

export default DonationMask;

"use client";

import { useEffect, useState } from "react";

import * as qrcode from "qrcode";
import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";

interface Props {
  moneroUri: string;
}

const QrCode = ({ moneroUri }: Props) => {
  const [generatedQR, setGeneratedQR] = useState<string>();

  useEffect(() => {
    const generateQRCode = async () => {
      const qr = await qrcode.toDataURL(moneroUri, {
        version: 12,
        width: 200,
      });

      setGeneratedQR(() => qr);
    };
    generateQRCode().catch(console.error);
  }, [moneroUri]);

  if (!generatedQR) return null;

  return (
    <div className="mx-auto w-[200px] lg:w-[300px]">
      <AspectRatio ratio={1 / 1}>
        <Image
          src={generatedQR}
          alt="address QR code"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 50px) 50vw, 33vw"
          className="mx-auto rounded-md border-2 border-dashed border-border"
        />
      </AspectRatio>
    </div>
  );
};
export default QrCode;

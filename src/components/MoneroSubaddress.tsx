"use client";

import CopyableString from "~/components/CopyableString";

interface Props {
  uri?: string;
  subaddress: string;
}

export default function MoneroSubaddress({ subaddress }: Props) {
  return (
    <div className="font-sm flex flex-col  p-1 text-center font-bold">
      <CopyableString input={subaddress} stringType="subaddress" />
    </div>
  );
}

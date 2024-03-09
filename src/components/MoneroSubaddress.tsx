"use client";

import { Suspense } from "react";
import CopyableString from "~/components/CopyableString";

interface MoneroSubaddressProps {
  uri?: string;
  subaddress: string;
}

export default function MoneroSubaddress({
  subaddress,
}: MoneroSubaddressProps) {
  return (
    <Suspense fallback={"Nothing here..."}>
      <div className="font-sm flex flex-col  p-1 text-center font-bold">
        <CopyableString input={subaddress} stringType="subaddress" />
      </div>
    </Suspense>
  );
}

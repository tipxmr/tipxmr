"use client";

import { type PlanType, type Invoice } from "@prisma/client";
import { Wallet2Icon } from "lucide-react";
import Link from "next/link";
import MoneroSubaddress from "~/components/MoneroSubaddress";
import QrCode from "~/components/QrCode";
import { buttonVariants } from "~/components/ui/button";
import { constructMoneroUri } from "~/lib/utils";

type InvoiceTabProps = { delta?: number } & Pick<
  Invoice,
  "payedAmount" | "expectedAmount" | "subaddress"
>;

const InvoiceTab = ({
  payedAmount,
  subaddress,
  expectedAmount,
  delta,
}: InvoiceTabProps) => {
  if (
    typeof expectedAmount !== "number" ||
    !subaddress ||
    typeof payedAmount !== "number"
  )
    return null;

  const percentPayed = (payedAmount / expectedAmount) * 100;
  const moneroUri = constructMoneroUri(subaddress, "test", expectedAmount);
  return (
    <>
      <div className="mt-6 flex flex-col justify-center gap-4">
        <MoneroSubaddress uri={moneroUri} subaddress={subaddress} />

        <div className="flex justify-center">
          <Link href={moneroUri} className={buttonVariants()}>
            <Wallet2Icon className="mr-2" />
            Click to open wallet
          </Link>
        </div>
        <QrCode moneroUri={moneroUri} />
      </div>
    </>
  );
};

export default InvoiceTab;

"use client";
import { Invoice } from "@prisma/client";
import { Wallet2Icon } from "lucide-react";
import Link from "next/link";
import MoneroSubaddress from "~/components/MoneroSubaddress";
import QrCode from "~/components/QrCode";
import { buttonVariants } from "~/components/ui/button";
import { constructMoneroUri } from "~/lib/utils";

type FundingGoalProps = { delta?: number } & Pick<
  Invoice,
  "payedAmount" | "expectedAmount" | "subaddress"
>;

const FundingGoal = ({
  payedAmount,
  subaddress,
  expectedAmount,
  delta,
}: FundingGoalProps) => {
  if (
    typeof expectedAmount !== "number" ||
    !subaddress ||
    typeof payedAmount !== "number"
  )
    return null;

  const percentPayed = (payedAmount / expectedAmount) * 100;
  const moneroUri = constructMoneroUri(subaddress);
  return (
    <>
      <div className="flex-row text-3xl font-bold sm:text-5xl">
        {payedAmount} <span className="text-2xl tracking-tight">XMR</span>
        <span className="text-xl font-bold tracking-tight">{delta} XMR</span> to
        reach goal {percentPayed}%
      </div>
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

export default FundingGoal;

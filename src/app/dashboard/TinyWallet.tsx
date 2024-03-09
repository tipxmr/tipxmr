"use client";

import { BlocksIcon, PercentIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import MoneroSubaddress from "~/components/MoneroSubaddress";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useWallet } from "~/context/useWalletContext";
import { cn } from "~/lib/utils";

const TinyWallet = () => {
  const { wallet, currentBlock, endHeight, percentage, isSyncing } =
    useWallet();
  const [subaddress, setSubaddress] = useState<string | undefined>("");

  const createSubaddress = () => {
    toast("generating subaddress!");
    wallet
      ?.createSubaddress(0)
      .then((addr) => {
        setSubaddress(addr.getAddress());
      })
      .catch(console.error);
  };
  return (
    <div
      className={cn("space-y-8 rounded-md border-2 p-4", {
        "border-8 border-dotted border-green-400": isSyncing,
      })}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          metric={endHeight}
          metricSuffix="blocks"
          label="End Height"
          icon={<BlocksIcon />}
        />

        <MetricCard
          metric={currentBlock}
          metricSuffix="blocks"
          label="Current Block"
          icon={<BlocksIcon />}
        />
        <MetricCard
          metric={percentage}
          metricSuffix="%"
          label="Sync Percentage"
          icon={<PercentIcon />}
        />
      </div>

      <MaxWidthWrapper className="flex flex-1 flex-col  justify-center gap-4">
        <MoneroSubaddress subaddress={subaddress} />
        <Button onClick={createSubaddress}>Subaddress</Button>
      </MaxWidthWrapper>
    </div>
  );
};

export default TinyWallet;

interface MetricCardProps {
  metric?: number | string;
  metricSuffix: string;
  label: string;
  icon: ReactNode;
}

function MetricCard({ metric, metricSuffix, label, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex w-full flex-1 justify-between">
          <CardTitle>{label}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold tracking-tight">
          {metric?.toString()}
        </p>
      </CardContent>
      <CardFooter className="text-muted-foreground">{metricSuffix}</CardFooter>
    </Card>
  );
}

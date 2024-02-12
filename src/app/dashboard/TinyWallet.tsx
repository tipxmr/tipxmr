"use client";

import { BlocksIcon, PercentIcon } from "lucide-react";
import { ReactNode, useState } from "react";
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

const TinyWallet = () => {
  const {
    wallet,
    currentBlock,
    endHeight,
    percentage,
    syncState,
    setDoRefetch,
    doRefetch,
  } = useWallet();
  const [subaddress, setSubaddress] = useState<string | undefined>("");

  const createSubaddress = () => {
    wallet
      ?.createSubaddress(0)
      .then((addr) => {
        setSubaddress(addr.getAddress());
      })
      .catch(console.error);
  };
  return (
    <>
      {syncState ? "connected!" : "not connected"}
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
          metric={(percentage ?? 0) * 100}
          metricSuffix="%"
          label="Sync Percentage"
          icon={<PercentIcon />}
        />
      </div>

      {subaddress ? (
        <MoneroSubaddress subaddress={subaddress} />
      ) : (
        "no subaddress"
      )}
      <Button onClick={createSubaddress}>Subaddress</Button>
      <Button onClick={() => (setDoRefetch ? setDoRefetch(!doRefetch) : null)}>
        Refetch
      </Button>
    </>
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

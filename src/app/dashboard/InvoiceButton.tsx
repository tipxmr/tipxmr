"use client";

import { type PlanType, type Streamer } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface Props {
  streamerId: Streamer["id"];
  planType: PlanType;
}

const InvoiceButton = ({ streamerId, planType }: Props) => {
  const { mutate } = api.invoice.create.useMutation({});

  const handleClick = () => {
    console.log("clicked");
    const invoice = mutate({
      streamerId,
      planType,
    });

    console.log({ invoice });
  };

  return <Button onClick={handleClick}>Get Invoice</Button>;
};

export default InvoiceButton;

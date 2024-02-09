"use client";

import { type PlanType, type Streamer } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface Props {
  streamerId: Streamer["id"];
  planType: PlanType;
}

const InvoiceButton = ({ streamerId, planType }: Props) => {
  const utils = api.useUtils();
  const { mutate } = api.invoice.create.useMutation({
    onSuccess: () => utils.invoice.mostRecentInvoice.invalidate(),
  });

  const handleClick = () => {
    mutate({
      streamerId,
      planType,
    });
  };

  return <Button onClick={handleClick}>Get Invoice</Button>;
};

export default InvoiceButton;

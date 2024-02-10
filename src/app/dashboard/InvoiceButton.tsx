"use client";

import { type PlanType } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface Props {
  planType: PlanType;
}

const InvoiceButton = ({ planType }: Props) => {
  const utils = api.useUtils();
  const { mutate } = api.invoice.create.useMutation({
    onSuccess: () => utils.invoice.mostRecentInvoice.invalidate(),
  });

  const handleClick = () => {
    mutate({
      planType,
    });
  };

  return <Button onClick={handleClick}>Get Invoice</Button>;
};

export default InvoiceButton;

"use client";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const InvoiceButton = () => {
  const utils = api.useUtils();
  const { mutate } = api.invoice.createBlank.useMutation({
    onSuccess: () => utils.invoice.mostRecent.invalidate(),
  });

  const handleClick = () => {
    mutate();
  };

  return <Button onClick={handleClick}>Get Invoice</Button>;
};

export default InvoiceButton;

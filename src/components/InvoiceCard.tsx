"use client";

import { type Invoice } from "@prisma/client";
import FundingGoal from "~/components/FundingGoal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface Props {
  invoice: Invoice;
}

const InvoiceCard = ({ invoice }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Most recent invoice</CardTitle>
        <CardDescription>Here is your current account status</CardDescription>
        <CardContent>
          {invoice.paidStatus === "paid" ? (
            <>You are all paid up and ready to go!</>
          ) : (
            <FundingGoal {...invoice} />
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default InvoiceCard;

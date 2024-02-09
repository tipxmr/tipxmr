"use client";

import InvoiceButton from "~/app/dashboard/InvoiceButton";
import FundingGoal from "~/components/FundingGoal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

const InvoiceCard = ({ id }: { id?: string }) => {
  const { data: invoice } = api.invoice.mostRecentInvoice.useQuery();
  if (!id) return null;
  if (!invoice) return <InvoiceButton streamerId={id} planType="basic" />;
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

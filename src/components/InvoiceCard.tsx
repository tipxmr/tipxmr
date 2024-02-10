"use client";

import InvoiceButton from "~/app/dashboard/InvoiceButton";
import FundingGoal from "~/components/FundingGoal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { LightbulbIcon } from "lucide-react";

const InvoiceCard = ({ id }: { id?: string }) => {
  const { data: invoice } = api.invoice.mostRecentInvoice.useQuery();
  if (!id) return null;
  if (!invoice) return <InvoiceButton streamerId={id} planType="basic" />;
  return (
    <>
      <Tabs defaultValue="premium">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <LightbulbIcon className="mr-2" size={20} />
              <CardDescription className="">
                Select the account type that you want to use, and press the
                button when you have sent your payment.
              </CardDescription>
            </div>
            <TabsList className="justify-around">
              <TabsTrigger value="basic" className="grow">
                Basic
              </TabsTrigger>
              <TabsTrigger value="premium" className="grow">
                Premium
              </TabsTrigger>
            </TabsList>
            <CardContent>
              <TabsContent value="basic">
                <FundingGoal {...invoice} expectedAmount={10} />
              </TabsContent>
              <TabsContent value="premium">
                <FundingGoal {...invoice} expectedAmount={100} />
              </TabsContent>
            </CardContent>
          </CardHeader>
        </Card>
      </Tabs>
    </>
  );
};

export default InvoiceCard;

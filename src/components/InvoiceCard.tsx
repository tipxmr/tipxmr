"use client";

import InvoiceButton from "~/app/dashboard/InvoiceButton";
import FundingGoal from "~/components/FundingGoal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  CheckCheckIcon,
  CloverIcon,
  FileCogIcon,
  LightbulbIcon,
  MinimizeIcon,
  SearchCheckIcon,
  StarHalfIcon,
  TestTube2Icon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Invoice } from "@prisma/client";

const basicBenefits = [
  {
    id: 1,
    icon: <SearchCheckIcon />,
    title: "Start exploring",
    content:
      "The basic accounts offers all that you need to start monero-tizing your streams",
  },

  {
    id: 2,
    icon: <StarHalfIcon />,
    title: "Limited functionality",
    content:
      "You can show donations in your stream, but are limited with customizability",
  },

  {
    id: 3,
    icon: <MinimizeIcon />,
    title: "Minimalistic",
    content:
      "Best plan if you just want to receive donations for your live streams, without the fuzz",
  },
];

const premiumBenefits = [
  {
    icon: <CloverIcon />,
    id: 1,
    title: "All of the features",
    content:
      "The premium account offers you all the functionality TipXMR can offer",
  },
  {
    id: 2,
    icon: <FileCogIcon />,
    title: "Customize your experience",
    content:
      "Take control of your stream monero-tization by fine-tuning parameters for donations",
  },
  {
    id: 3,
    icon: <TestTube2Icon />,
    title: "Bleeding edge",
    content:
      "Be the first to experience new features of TipXMR, like moderators for your donations and much more!",
  },
];

const InvoiceCard = ({ invoice }: { invoice?: Invoice }) => {
  const [isPickComplete, setIsPickComplete] = useState(false);
  if (!invoice) return <InvoiceButton />;
  return (
    <>
      <Tabs defaultValue="premium">
        <Card>
          <CardHeader>
            <CardDescription className="text-left">
              Select the account type that you want to use, and then confirm
              your payment
            </CardDescription>
            <TabsList className="justify-around">
              <TabsTrigger
                value="basic"
                disabled={isPickComplete}
                className="grow"
              >
                Basic
              </TabsTrigger>
              <TabsTrigger
                value="premium"
                disabled={isPickComplete}
                className="grow"
              >
                Premium
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="basic">
              <div className="flex-row text-3xl font-bold sm:text-5xl">
                <span className="capitalize tracking-tight">Basic</span>:{" "}
                {0.001} XMR per month
              </div>
              <Benefits benefits={basicBenefits} />
              <FundingGoal {...invoice} expectedAmount={0.001} />
            </TabsContent>
            <TabsContent value="premium">
              <div className="flex-row text-3xl font-bold sm:text-5xl">
                <span className="capitalize tracking-tight">premium</span>:{" "}
                {0.1} XMR per month
              </div>
              <Benefits benefits={premiumBenefits} />
              <FundingGoal {...invoice} expectedAmount={0.1} />
            </TabsContent>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => {
                setIsPickComplete(true);
                // TODO update the invoice with the selected plan
              }}
            >
              <CheckCheckIcon className="mr-2" />I sent the payment
            </Button>
          </CardFooter>
        </Card>
      </Tabs>
    </>
  );
};

export default InvoiceCard;

interface BenefitsProps {
  benefits: {
    id: number;
    icon: React.ReactNode;
    title: string;
    content: string;
  }[];
}

function Benefits({ benefits }: BenefitsProps) {
  return (
    <div className="mx-auto my-6 flex w-full flex-col items-center justify-center gap-4 md:w-[500px]">
      {benefits.map(({ id, title, content, icon }) => (
        <div key={id} className="flex gap-2 rounded-md border p-4">
          <div className="mr-2 w-8 self-center">{icon}</div>
          <div className="flex flex-col">
            <h2 className="font-semibold">{title}</h2>
            <p>{content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

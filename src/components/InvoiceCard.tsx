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
import {
  CheckIcon,
  CloverIcon,
  FileCogIcon,
  MinimizeIcon,
  SearchCheckIcon,
  StarHalfIcon,
  TestTube2Icon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { type Invoice } from "@prisma/client";
import { toast } from "sonner";

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
  const [isPickComplete, setIsPickComplete] = useState(
    !!invoice?.expectedAmount,
  );
  const [chosenPlanType, setChosenPlanType] = useState(invoice?.planType);

  if (!invoice) return <InvoiceButton />;
  return (
    <>
      <Tabs defaultValue="premium">
        <Card>
          <CardHeader>
            <CardDescription className="text-left">
              {isPickComplete ? (
                <>
                  <span className="font-semibold">
                    You chose the {chosenPlanType} plan
                  </span>
                  . We are currently waiting for payment to confirm in a
                  block...
                </>
              ) : (
                <>
                  Select the account type that you want to use, and then confirm
                  your payment
                </>
              )}
            </CardDescription>
            <TabsList className="h-16 justify-around">
              <TabsTrigger
                value="basic"
                disabled={isPickComplete}
                className="h-14 grow text-xl font-semibold"
              >
                Basic
              </TabsTrigger>
              <TabsTrigger
                value="premium"
                disabled={isPickComplete}
                className="h-14 grow text-xl font-semibold"
              >
                Premium
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="basic">
              <div className="w-full text-center text-3xl font-bold lg:text-5xl">
                {0.001} XMR per month
              </div>
              <Benefits benefits={basicBenefits} />
              <FundingGoal {...invoice} expectedAmount={0.001} />

              <div className="mt-8 flex justify-center">
                <UserConfirmButton
                  planType="basic"
                  invoiceId={invoice.id}
                  disabled={isPickComplete}
                  setDisabled={setIsPickComplete}
                  setPlanType={setChosenPlanType}
                />
              </div>
            </TabsContent>
            <TabsContent value="premium">
              <div className="w-full text-center text-3xl font-bold lg:text-5xl">
                {0.1} XMR per month
              </div>
              <Benefits benefits={premiumBenefits} />
              <FundingGoal {...invoice} expectedAmount={0.1} />

              <div className="mt-8 flex justify-center">
                <UserConfirmButton
                  planType="premium"
                  invoiceId={invoice.id}
                  disabled={isPickComplete}
                  setDisabled={setIsPickComplete}
                  setPlanType={setChosenPlanType}
                />
              </div>
            </TabsContent>
          </CardContent>
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

type UserConfirmButtonProps = {
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setPlanType: React.Dispatch<
    React.SetStateAction<"basic" | "premium" | null | undefined>
  >;
  planType: "basic" | "premium";
  invoiceId: number;
};

function UserConfirmButton({
  disabled,
  setDisabled,
  planType,
  invoiceId,
  setPlanType,
}: UserConfirmButtonProps) {
  const { mutate } = api.invoice.userConfirm.useMutation({
    onSuccess: () => {
      toast("We are now awaiting your payment to confirm");
    },
  });
  return (
    <Button
      disabled={disabled}
      onClick={() => {
        toast(`You chose the ${planType} plan.`);
        setDisabled(true);
        setPlanType(planType);
        mutate({ planType, id: invoiceId });
      }}
      className="mx-auto"
    >
      <CheckIcon className="mr-2" />I sent the payment
    </Button>
  );
}

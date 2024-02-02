import Link from "next/link";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { getServerAuthSession } from "~/server/auth";

export default async function RegistrationPage() {
  const session = await getServerAuthSession();
  if (session?.user?.id) redirect("/dashboard");

  return (
    <div className="container max-w-md text-center">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>

      <div className="mx-auto my-8 flex w-72 flex-col gap-4">
        <RegistrationTooltip
          link="/registration/new"
          title="Register with new wallet"
          content={<NewWalletTooltip />}
        />
        <RegistrationTooltip
          link="/registration/view-only"
          title="Register with existing private view key"
          content={<ViewKeyTooltip />}
        />
        <RegistrationTooltip
          link="/registration/existing"
          title="Register with existing seed"
          content={<ExistingSeedTooltip />}
        />
      </div>
    </div>
  );
}

function RegistrationTooltip({
  content,
  link,
  title,
}: {
  content: ReactNode;
  title: string;
  link: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href={link} className={buttonVariants({ variant: "default" })}>
            {title}
          </Link>
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const NewWalletTooltip = () => (
  <div className="max-w-md p-4">
    <strong>Recommended: </strong>Create a fresh wallet for TipXMR donations.
    This ensures separation of concerns for your wallets. The new wallet is
    generated in <em>your</em> browser. TipXMR can never see your seed phrase.
  </div>
);

const ViewKeyTooltip = () => (
  <div className="max-w-md p-4">
    {" "}
    <strong>Advanced: </strong>
    Minimal setup to receive live donations. With this option your private spend
    key is never exposed. However, you should still create a fresh wallet for
    TipXMR use.
  </div>
);

const ExistingSeedTooltip = () => (
  <div className="max-w-md p-4">
    {" "}
    <strong>Discouraged: </strong>Entering a seed with XMR on it is a bad idea.
    You should not mix a personal wallet with your TipXMR donations. If you
    choose this option, you should create a new wallet yourself.
  </div>
);

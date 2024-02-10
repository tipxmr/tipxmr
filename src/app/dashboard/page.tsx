import InvoiceCard from "~/components/InvoiceCard";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Separator } from "~/components/ui/separator";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import DonationSettingForm from "./DonationSettingForm";
import StreamForm from "./StreamForm";
import { PartyPopperIcon } from "lucide-react";
import { Suspense } from "react";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session?.user) return <>No session</>;

  const dashboardInfo = await api.streamer.dashboard.query();

  const invoice = await api.invoice.mostRecent.query();

  return (
    <MaxWidthWrapper className="my-6 flex flex-col gap-4">
      {invoice.paidStatus !== "paid" ? (
        <Alert>
          <AlertTitle className="text-3xl font-bold tracking-tight">
            <PartyPopperIcon className="mr-2 inline h-8 w-8" />
            Yay! You just created your TipXMR account!
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            To start using it, you need to select a payment plan and activate
            your account with a payment.
          </AlertDescription>
        </Alert>
      ) : null}
      <Suspense fallback={<p>Loading invoice</p>}>
        <InvoiceCard invoice={invoice} />
      </Suspense>
      <Separator />
      {/* Stream Settings */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {dashboardInfo?.stream ? <StreamForm /> : null}
        {dashboardInfo?.donationSetting ? <DonationSettingForm /> : null}
      </div>
      <Separator />
    </MaxWidthWrapper>
  );
}

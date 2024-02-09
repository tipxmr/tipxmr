import InvoiceCard from "~/components/InvoiceCard";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import UserCard from "~/components/UserCard";
import { Separator } from "~/components/ui/separator";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import InvoiceButton from "./InvoiceButton";
import StreamForm from "./StreamForm";
import DonationSettingForm from "./DonationSettingForm";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session?.user) return <>No session</>;

  const mostRecentInvoice = await api.invoice.mostRecentInvoice.query({
    streamerId: session.user?.id,
  });

  const dashboardInfo = await api.streamer.dashboard.query();

  return (
    <MaxWidthWrapper className="my-6 flex flex-col gap-4">
      {mostRecentInvoice?.paidStatus !== "paid" ? (
        <Alert>
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You need to pay to use TipXMR.</AlertDescription>
        </Alert>
      ) : null}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {!!session?.user && <UserCard user={session.user} />}
        {!!mostRecentInvoice ? (
          <InvoiceCard invoice={mostRecentInvoice} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <h1>Here should be the invoice 🏗</h1>
            <InvoiceButton streamerId={session.user.id} planType="basic" />
          </div>
        )}
      </section>
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

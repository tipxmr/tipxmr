import InvoiceCard from "~/components/InvoiceCard";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import UserCard from "~/components/UserCard";
import { Separator } from "~/components/ui/separator";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import InvoiceButton from "./InvoiceButton";
import StreamForm from "./StreamForm";
import DonationSettingForm from "./DonationSettingForm";
import xmrWallet from "~/server/xmrWallet";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session?.user) return <>No session</>;

  const mostRecentInvoice = await api.invoice.mostRecentInvoice.query({
    streamerId: session.user?.id,
  });

  const dashboardInfo = await api.streamer.dashboard.query();
  const invoice = await api.invoice.create.mutate({
    streamerId: session.user.id,
    planType: "basic",
  });
  /* const subaddress = (await xmrWallet.createSubaddress(0)).getAddress();
   * console.log({ subaddress }); */

  console.log({ invoice });
  return (
    <MaxWidthWrapper className="my-6 flex flex-col gap-4">
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

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

  const dashboardInfo = await api.streamer.dashboard.query();

  return (
    <MaxWidthWrapper className="my-6 flex flex-col gap-4">
      <InvoiceCard id={session.user.id ?? "123"} />
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

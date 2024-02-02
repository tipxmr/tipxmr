import InvoiceCard from "~/components/InvoiceCard";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import UserCard from "~/components/UserCard";
import { Separator } from "~/components/ui/separator";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  if (!session?.user) return <>No session</>;

  const mostRecentInvoice = await api.invoice.mostRecentInvoice.query({
    streamerId: session.user?.id,
  });

  return (
    <MaxWidthWrapper className="my-6 flex flex-col gap-4">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {!!session?.user && <UserCard user={session.user} />}
        {!!mostRecentInvoice ? (
          <InvoiceCard invoice={mostRecentInvoice} />
        ) : (
          <div className="flex items-center justify-center">
            <h1>Here should be the invoice 🏗</h1>
          </div>
        )}
      </section>
      <Separator />
    </MaxWidthWrapper>
  );
}

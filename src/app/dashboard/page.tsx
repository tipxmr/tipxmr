import { redirect } from "next/navigation";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import User from "~/components/User";
import { getServerAuthSession } from "~/server/auth";

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  /* if (!session) redirect("/login"); */
  console.log({ session });
  return (
    <MaxWidthWrapper>
      Dashboard
      {JSON.stringify({ session })}
      <User />
    </MaxWidthWrapper>
  );
}

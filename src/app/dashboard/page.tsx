import LogoutButton from "~/components/LogoutButton";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import User from "~/components/User";

export default async function DashboardPage() {
  return (
    <MaxWidthWrapper className="my-6 flex flex-col gap-4">
      <h1 className="text-3xl">Dashboard</h1>
      <User />
      <LogoutButton />
    </MaxWidthWrapper>
  );
}

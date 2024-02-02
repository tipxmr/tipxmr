import FundingGoal from "~/components/FundingGoal";
import LogoutButton from "~/components/LogoutButton";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import User from "~/components/User";

export default async function DashboardPage() {
  return (
    <MaxWidthWrapper className="my-6 flex flex-col gap-4">
      <h1 className="text-3xl">Dashboard</h1>
      <User />
      <FundingGoal
        expectedAmount={1}
        payedAmount={0.5}
        subaddress={"123123"}
        delta={0.5}
        key={1}
      />
      <LogoutButton />
    </MaxWidthWrapper>
  );
}

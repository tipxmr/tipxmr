import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import User from "~/components/User";
import { getServerAuthSession } from "~/server/auth";

const DashboardPage = () => {
  const session = getServerAuthSession();
  return (
    <MaxWidthWrapper>
      Dashboard
      {JSON.stringify({ session })}
      <User />
    </MaxWidthWrapper>
  );
};

export default DashboardPage;

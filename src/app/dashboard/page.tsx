import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { getServerAuthSession } from "~/server/auth";

const DashboardPage = () => {
  const session = getServerAuthSession();
  return (
    <MaxWidthWrapper>
      Dashboard
      {JSON.stringify({ session })}
    </MaxWidthWrapper>
  );
};

export default DashboardPage;

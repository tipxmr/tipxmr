import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = getServerAuthSession();
  return (
    <MaxWidthWrapper>
      <>{JSON.stringify(session)}</>

      <h1 className="text-3xl"> Homepage</h1>
    </MaxWidthWrapper>
  );
}

import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = getServerAuthSession();
  return <MaxWidthWrapper>{JSON.stringify(session)}Homepage</MaxWidthWrapper>;
}

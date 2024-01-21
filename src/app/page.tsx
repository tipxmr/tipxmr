import { unstable_noStore as noStore } from "next/cache";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

export default async function Home() {
  return <MaxWidthWrapper>Homepage</MaxWidthWrapper>;
}

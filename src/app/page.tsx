import type { NextPage } from "next";
import Link from "next/link";

import HeroUnit from "~/components/HeroUnit";

const Home: NextPage = () => {
  return (
    <>
      <HeroUnit title="TipXMR" text="Monetize your streams with Monero!" />

      <Link
        href="/overview"
        className="text-sky-600 no-underline hover:underline"
      >
        See who&apos;s streaming
      </Link>

      <Link
        href="/donate"
        className="text-sky-600 no-underline hover:underline"
      >
        Want to donate? Follow me
      </Link>
    </>
  );
};

export default Home;

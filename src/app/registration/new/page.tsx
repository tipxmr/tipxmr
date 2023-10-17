"use client";

import Link from "next/link";
import type { NextPage } from "next/types";

import FullWalletCreation from "~/components/FullWalletCreation";
import useUser from "~/lib/useUser";

const RegistrationNewPage: NextPage = () => {
  useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  return (
    <main className="container max-w-md text-center">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      <FullWalletCreation />
      <Link href="/registration">
        <button className="btn-primary mt-2 w-full">Go back</button>
      </Link>
    </main>
  );
};

export default RegistrationNewPage;

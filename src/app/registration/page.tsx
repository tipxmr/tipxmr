"use client";

import Link from "next/link";
import type { NextPage } from "next/types";

import useUser from "~/lib/useUser";

const RegistrationPage: NextPage = () => {
  useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  return (
    <div className="container max-w-md text-center">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>

      <div className="mx-auto my-8 flex w-72 flex-col gap-4">
        <Link href="/registration/new">
          <button className="btn-primary w-full">
            Register with new wallet
          </button>
        </Link>

        <Link href="/registration/existing">
          <button className="btn-primary w-full">
            Register with existing seed
          </button>
        </Link>

        <Link href="/registration/view-only">
          <button className="btn-primary w-full">
            Register with existing private view key
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;

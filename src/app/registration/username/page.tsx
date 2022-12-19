"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { NextPage } from "next/types";

import UsernameDisplaynameInput from "~/components/UsernameDisplaynameInput";
import useUser from "~/lib/useUser";
import { truncatedHashIdAtom } from "~/store";

const RegistrationUsernamePage: NextPage = () => {
  const router = useRouter();
  useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  const truncatedHashId = useAtomValue(truncatedHashIdAtom);
  if (!truncatedHashId) {
    return (
      <div>
        <p>return to registration</p>
        <Link href="/registration">
          <button className="btn-primary mt-2 w-full">Go back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-md text-center">
      <h1 className="mb-2 text-3xl">Register to TipXMR</h1>
      <p>{`You don't need to provide any personal data to use TipXMR.`}</p>
      <UsernameDisplaynameInput />
      <button className="btn-primary mt-2 w-full" onClick={() => router.back()}>
        Go back
      </button>
    </div>
  );
};

export default RegistrationUsernamePage;

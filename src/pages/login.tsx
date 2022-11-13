import { NextPage } from "next";
import { FormEvent } from "react";

import Login from "~/components/Login";
import { FetchError } from "~/lib/fetchJson";
import useUser from "~/lib/useUser";
import { getMnemonicHash } from "~/lib/xmr";

const LoginPage: NextPage = () => {
  const { mutate: mutateUser } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let seed = data.get("seed") as string;
    seed = seed.trim();
    const understood = data.get("understood");
    if (!understood) {
      alert("Sorry, you must agree to proceed");
      return;
    }

    // TODO handle the "remembered status"
    const remember = data.get("remember");

    const truncatedHashedSeed = getMnemonicHash(seed).slice(0, 11);
    try {
      mutateUser(truncatedHashedSeed);
    } catch (reason) {
      if (reason instanceof FetchError) {
        console.error(reason);
      } else {
        console.error("An unexpected error happened:", reason);
      }
    }
  };

  return <Login handleSubmit={handleSubmit} />;
};

export default LoginPage;

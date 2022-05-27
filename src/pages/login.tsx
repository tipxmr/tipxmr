import { getMnemonicHash } from "~/lib/xmr";
import Login from "~/components/Login";
import { NextPage } from "next";
import { FormEvent } from "react";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import useUser from "~/lib/useUser";
import { User } from "~/lib/config";
import { useMutation } from "react-query";
import { Streamer } from "@prisma/client";

async function loginUser(id: Streamer["id"] | undefined): Promise<User> {
  const body = { hash: id };

  const user = await fetchJson<User>("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return user;
}

const LoginPage: NextPage = () => {
  /* const mutation = useMutation(loginUser) */
  const { user } = useUser({ redirectTo: "/dashboard", redirectIfFound: true });

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
      loginUser(truncatedHashedSeed);
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

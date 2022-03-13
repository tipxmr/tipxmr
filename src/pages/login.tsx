import { getMnemonicHash } from "~/lib/xmr";
import { Login } from "~/components";
import { NextPage } from "next";
import { useEffect, FormEvent } from "react";
import { User } from "./api/user";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import { useRouter } from "next/router";
import useUser from "~/lib/useUser";

const LoginPage: NextPage = () => {
  const { user: session, mutateUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (session && session.isLoggedIn) {
      router.push("/dashboard");
    }
  }, [session, router]);

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
    const body = {
      hash: truncatedHashedSeed,
    };

    try {
      const user = await fetchJson<User>("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      mutateUser(user);
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

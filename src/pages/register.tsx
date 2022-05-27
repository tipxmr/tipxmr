import { NextPage } from "next";
import { useAtom } from "jotai";
import { FormEvent } from "react";
import Register from "~/components/RegisterStepper";
import {
  displayNameAtom,
  truncatedHashedSeedAtom,
  userNameAtom,
} from "~/store";
import useUser from "~/lib/useUser";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import { Streamer } from "@prisma/client";
import { User } from "~/lib/config";
import { ErrorBoundary } from "react-error-boundary";

const Home: NextPage = () => {
  const { mutateUser } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  const [userName] = useAtom(userNameAtom);
  const [displayName] = useAtom(displayNameAtom);
  const [truncatedHashedSeed] = useAtom(truncatedHashedSeedAtom);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /* const name = data.get("name") as string;
     * const alias = data.get("alias") as string; */
    const name = userName;
    const alias = displayName;

    const understood = data.get("understood");
    if (!understood) {
      // TODO validate this on the field
      alert("Sorry, you must agree to proceed");
      return;
    }

    console.log({ data, name, alias, truncatedHashedSeed });
    try {
      const { streamer } = await fetchJson<{
        streamer: Streamer;
      }>(`/api/streamer/${truncatedHashedSeed}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: truncatedHashedSeed,
          name: name,
          alias: alias,
        }),
      });

      // TODO streamer already exists handling

      if (streamer) {
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
      }
    } catch (reason) {
      if (reason instanceof FetchError) {
        console.error(reason);
      } else {
        console.error("An unexpected error happened:", reason);
      }
    }
    /*
     *    const res = await fetchJson(`/api/streamer`, {
     *      method: "POST",
     *      body: JSON.stringify({
     *      }),
     *    });
     */
    // TODO navigate the streamer to the login
  };

  return <Register handleSubmit={handleSubmit} />;
};

const Wrapper: NextPage = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => <div>{error.message}</div>}
      onError={console.log}
    >
      <Home />
    </ErrorBoundary>
  );
};

export default Wrapper;

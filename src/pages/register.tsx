import { NextPage } from "next";
import { useAtom } from "jotai";
import { FormEvent, useEffect } from "react";
import Register from "~/components/RegisterStepper";
import {
  displayNameAtom,
  truncatedHashedSeedAtom,
  userNameAtom,
} from "~/store";
import useCreateUser from "~/hooks/useCreateUser";

import { ErrorBoundary } from "react-error-boundary";

const Home: NextPage = () => {
  // TODO rewrite into custom hook to use react-query
  const createUser = useCreateUser();

  useEffect(() => {
    console.log("createUser: ", createUser);
  }, [createUser]);

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
    createUser.mutate({ id: truncatedHashedSeed, name, alias });
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

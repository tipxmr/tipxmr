import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import useUser from "~/lib/useUser";
import Head from "next/head";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import { User } from "./api/user";

const hash =
  "b8185a25bbe3b4206e490558ab50b0567deca446d15282e92c5c66fde6693399".slice(
    0,
    11
  );

const Home: NextPage = () => {
  const { user: session, mutateUser } = useUser();

  async function signOut() {
    const user = await fetchJson<User>("/api/logout", { method: "POST" });
    mutateUser(user, false);
  }

  async function signIn() {
    const body = {
      hash,
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

  return (
    <Container>
      <Head>
        <title>Dashboard</title>
      </Head>

      {session?.isLoggedIn ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}

      <Typography variant="h4">Session</Typography>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Container>
  );
};

export default Home;

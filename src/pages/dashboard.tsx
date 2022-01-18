import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log({ session });

  return (
    <Container>
      <Head>
        <title>Dashboard</title>
      </Head>

      {session?.user ? (
        <button onClick={() => signOut({ redirect: false })}>Logout</button>
      ) : (
        <button
          onClick={() =>
            signIn("credentials", { redirect: false, hash: "aabbccddeeff" })
          }
        >
          Login
        </button>
      )}

      <Typography variant="h4">Session</Typography>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Container>
  );
};

export default Home;

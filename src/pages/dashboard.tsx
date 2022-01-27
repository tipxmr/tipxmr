import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

const hash = "b8185a25bbe3b4206e490558ab50b0567deca446d15282e92c5c66fde6693399".slice(0, 11)

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
            signIn("credentials", { redirect: false, hash })
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

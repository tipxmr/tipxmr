import { io } from "socket.io-client";
import { IsOnlineBadge } from "~/components";
import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Head from "next/head";
import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import useUser from "~/lib/useUser";

const hash =
  "b8185a25bbe3b4206e490558ab50b0567deca446d15282e92c5c66fde6693399".slice(
    0,
    11
  );

function useSocket() {
  useEffect(() => {
    const socket = io("http://localhost:3000/streamer", {
      path: "/ws",
    });

    socket.on("connect_error", (reason) => {
      console.error(reason.message);
    });

    socket.on("connect", () => {
      console.log("connected");
      socket.emit("streamer:online", socket.id);
    });

    socket.on("disconnect", () => {
      socket.emit("streamer:offline");
    });

    return () => {
      console.log("disconnect");
      socket.emit("streamer:offline");
      socket.disconnect();
    };
  }, []);

  return;
}


const Home: NextPage = () => {
  const { user: session, mutateUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if the user is not logged in
    if (session && !session.isLoggedIn) {
      router.push('/login');
    }
  }, [session, router])

  if (session && session.isLoggedIn) {
    return (
      <Container>
        <Head>
          <title>Dashboard</title>
        </Head>

        <Fragment>
          <Typography variant="h4">Welcome, {session.alias}</Typography>
          <Typography variant="h5">Your ID: {session.id}</Typography>
          <IsOnlineBadge isOnline={!session?.isOnline} />
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </Fragment>
      </Container>
    );
  }
  return <Typography variant="h2">Please log in</Typography>
};

export default Home;

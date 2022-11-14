import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import IsOnlineBadge from "~/components/IsOnlineBadge";
import streamerKeys from "~/features/streamer/queries";
import useFooSocket from "~/hooks/socket/use-socket";
import useUser from "~/lib/useUser";

const Home: NextPage = () => {
  useFooSocket();

  const { user: session } = useUser({ redirectTo: "/login" });

  const foobar = useQuery({
    queryKey: streamerKeys.subaddress(),
    queryFn: () => "",
    enabled: false,
  });

  useEffect(() => {
    console.log({ foobar: foobar.data });
  }, [foobar.data]);

  if (session && session.isLoggedIn) {
    return (
      <Container>
        <Head>
          <title>Dashboard</title>
        </Head>

        <>
          <Typography variant="h4">Welcome, {session.alias}</Typography>
          <Typography variant="h5">Your ID: {session.id}</Typography>
          <IsOnlineBadge isOnline={!!session?.isOnline} />
        </>
      </Container>
    );
  }
  return <Typography variant="h2">Please log in</Typography>;
};

export default Home;

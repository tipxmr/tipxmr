"use client";

import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import IsOnlineBadge from "~/components/IsOnlineBadge";
import streamerKeys from "~/features/streamer/queries";
import { useStreamerSocket } from "~/hooks/socket/use-socket";
import useUser from "~/lib/useUser";

const Home: NextPage = () => {
  useStreamerSocket();

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
      <div className="container">
        <Head>
          <title>Dashboard</title>
        </Head>

        <h4>Welcome, {session.alias}</h4>
        <h5>Your ID: {session.id}</h5>
        <IsOnlineBadge isOnline={!!session?.isOnline} />
      </div>
    );
  }
  return <h2>Please log in</h2>;
};

export default Home;

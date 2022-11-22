"use client";

import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useEffect } from "react";

import IsOnlineBadge from "~/components/IsOnlineBadge";
import streamerKeys from "~/features/streamer/queries";
import { useStreamerSocket } from "~/hooks/socket/use-socket";
import useUser from "~/lib/useUser";

const Home: NextPage = () => {
  useStreamerSocket();

  const { user } = useUser({ redirectTo: "/login" });

  const foobar = useQuery({
    queryKey: streamerKeys.subaddress(),
    queryFn: () => "",
    enabled: false,
  });

  useEffect(() => {
    console.log({ foobar: foobar.data });
  }, [foobar.data]);

  if (user && user.isLoggedIn) {
    return (
      <div className="container">
        <h4>Welcome, {user.alias}</h4>
        <h5>Your ID: {user.id}</h5>
        <IsOnlineBadge isOnline={!!user?.isOnline} />
      </div>
    );
  }
  return <h2>Please log in</h2>;
};

export default Home;

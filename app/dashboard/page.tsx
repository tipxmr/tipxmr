"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { io } from "socket.io-client";

import IsOnlineBadge from "~/components/IsOnlineBadge";
import useUser from "~/lib/useUser";

function useSocket() {
  useEffect(() => {
    const socket = io("http://localhost:3000/streamer", {
      path: "/api/socket",
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
  useSocket();

  const { user: session } = useUser({ redirectTo: "/login" });

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

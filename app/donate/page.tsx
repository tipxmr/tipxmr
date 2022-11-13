"use client";

import { UpdateIcon } from "@radix-ui/react-icons";
import type { NextPage } from "next";
import Link from "next/link";

import Redirect from "~/components/Redirect";
import useStreamers from "~/hooks/useStreamers";

const Donate: NextPage = () => {
  const { status, data: streamers, error } = useStreamers();

  if (status === "error" && error instanceof Error) {
    console.error({ error });
    return <Redirect to="/overview" />;
  }

  if (status === "loading") {
    return <UpdateIcon className="animate-spin" />;
  }

  return (
    <div className="container">
      <div className="flex flex-row space-x-4">
        {streamers &&
          streamers.map((streamer) => (
            <div className="tip-border rounded-md p-4" key={streamer.id}>
              <h2>{streamer.name}</h2>
              <Link
                className="text-orange hover:text-gray-700"
                href={`/donate/${encodeURIComponent(streamer.name)}`}
              >
                Donate
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Donate;

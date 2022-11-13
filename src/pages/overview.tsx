import type { NextPage } from "next";

import StreamerCard from "~/components/StreamerCard";
import useStreamers from "~/hooks/useStreamers";

const Home: NextPage = () => {
  const { status, data: streamers = [], error } = useStreamers();

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error" && error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-wrap gap-4 py-8">
      {streamers.map((streamer) => (
        <StreamerCard key={streamer.id} streamer={streamer} />
      ))}
    </div>
  );
};

export default Home;

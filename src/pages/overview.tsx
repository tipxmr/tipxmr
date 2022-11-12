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
    <div className="grid grid-cols-6 gap-4 py-8">
      {streamers.map((streamer) => (
        <div
          key={streamer.id}
          className="xs:col-span-12 sm:col-span-6 md:col-span-4"
        >
          <StreamerCard streamer={streamer} />
        </div>
      ))}
    </div>
  );
};

export default Home;

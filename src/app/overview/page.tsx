import StreamerCard from "~/components/StreamerCard";
import prisma from "~/lib/prisma";

// This page can not be dynamically rendered, because it is treated as a static page
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#data-fetching-without-fetch
export const revalidate = 10; // revalidate 10 seconds

async function Home() {
  const streamers = await prisma.streamer.findMany({
    where: { isOnline: true },
  });

  return (
    <div className="flex flex-wrap gap-4 py-8">
      {!!streamers.length ? (
        streamers.map((streamer) => (
          <StreamerCard key={streamer.id} streamer={streamer} />
        ))
      ) : (
        <h2>There are no streamers online right now. Come back later!</h2>
      )}
    </div>
  );
}

export default Home;

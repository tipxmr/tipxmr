import StreamerCard from "~/components/StreamerCard";
import prisma from "~/lib/prisma";

async function Home() {
  const streamers = await prisma.streamer.findMany();

  return (
    <div className="flex flex-wrap gap-4 py-8">
      {streamers.map((streamer) => (
        <StreamerCard key={streamer.id} streamer={streamer} />
      ))}
    </div>
  );
}

export default Home;

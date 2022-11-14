import Link from "next/link";

import prisma from "~/lib/prisma";

async function Donate() {
  const streamers = await prisma.streamer.findMany();

  return (
    <div className="container">
      <div className="flex flex-row space-x-4">
        {streamers.map((streamer) => (
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
}

export default Donate;

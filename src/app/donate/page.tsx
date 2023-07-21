import Link from "next/link";

import prisma from "~/lib/prisma";

// This page can not be dynamically rendered, because it is treated as a static page
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#data-fetching-without-fetch
export const revalidate = 10 // revalidate 10 seconds

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

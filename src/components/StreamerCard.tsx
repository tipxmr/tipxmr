import { Streamer } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const StreamerCard = ({ streamer }: { streamer: Streamer }) => {
  const { alias, name, status, isOnline } = streamer;

  return (
    <div className="w-96 rounded-md bg-white p-4">
      <div className="flex justify-between">
        {alias}
        {isOnline ? (
          <span className="badge-priamry">Online</span>
        ) : (
          <span className="badge-secondary">Offline</span>
        )}
      </div>

      <div className="relative h-64">
        <Image
          src="https://via.placeholder.com/350x200.png"
          className="object-contain"
          alt={name}
          fill
        />
      </div>

      <div>
        <h2 className="mb-1.5">{status ?? "I ❤️ TipXMR"}</h2>
      </div>

      <Link href={`/donate/${name}`}><div className="btn-primary text-center">
        watch {alias} now
      </div>
      </Link>
    </div>
  );
};

export default StreamerCard;

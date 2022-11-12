import { Streamer } from "@prisma/client";
import Image from "next/image";

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
        <h4>{name}</h4>
        <h5 className="mb-1.5">{status ?? "I ❤️ TipXMR"}</h5>
      </div>

      <div>
        <button className="btn-primary">watch now</button>
      </div>
    </div>
  );
};

export default StreamerCard;

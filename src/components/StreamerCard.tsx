import { Streamer } from "@prisma/client";
import Image from "next/image";

const StreamerCard = ({ streamer }: { streamer: Streamer }) => {
  const { alias, status } = streamer;

  return (
    <div className="tip-border w-64 rounded-md bg-white px-4">
      <div className="relative my-2 h-32">
        <Image
          src="https://via.placeholder.com/350x200.png"
          className="object-contain"
          alt={`${alias}-thumbnail`}
          fill
        />
      </div>

      <div>
        <h2>{alias}</h2>
        <p className="mb-2">{status ?? "I ❤️ TipXMR"}</p>
      </div>
      {/*
      <div className="text-end">
        <span>{streamValue} XMR raised</span>
        <h5 className="mb-1.5"></h5>
      </div> */}

      <div className="mb-2 flex justify-center">
        <button className="btn-primary">watch now</button>
      </div>
    </div>
  );
};

export default StreamerCard;

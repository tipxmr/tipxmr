import { Streamer } from "@prisma/client";
import { FC } from "react";
import { AvatarIcon } from "@radix-ui/react-icons";

interface StreamerChipProps {
  name: Streamer["name"] | undefined;
}

// TODO take the actual streamer avatar
const StreamerChip: FC<StreamerChipProps> = ({ name }) => {
  return (
    <div className="tip-border m-2 inline rounded-lg p-2">
      <AvatarIcon className="mr-1 inline" />
      {name}
    </div>
  );
};

export default StreamerChip;

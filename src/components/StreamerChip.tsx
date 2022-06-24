import { Avatar, Chip } from "@mui/material";
import AvatarImage from "../img/avatar.png";
import { Streamer } from "@prisma/client";
import { FC } from "react";

interface StreamerChipProps {
  name: Streamer["name"] | undefined;
}

// TODO take the actual streamer avatar
const StreamerChip: FC<StreamerChipProps> = ({ name }) => {
  return <Chip avatar={<Avatar alt={`${name} avatar`} />} label={name} />;
};

export default StreamerChip;

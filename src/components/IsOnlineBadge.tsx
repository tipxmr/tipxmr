import { FC } from "react";
import Button from "@mui/material/Button";

interface IIsOnlineBadge {
  isOnline: boolean;
}

const IsOnlineBadge: FC<IIsOnlineBadge> = ({ isOnline }) => {
  return (
    <Button
      variant={isOnline ? "contained" : "outlined"}
      color={isOnline ? "success" : "error"}
    >
      {isOnline ? "online" : "offline"}
    </Button>
  );
};

export default IsOnlineBadge;

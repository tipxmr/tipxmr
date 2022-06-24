import { FC } from "react";
import Button from "@mui/material/Button";

interface IsOnlineBadgeProps {
  isOnline?: boolean;
}

const IsOnlineBadge: FC<IsOnlineBadgeProps> = ({ isOnline }) => {
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

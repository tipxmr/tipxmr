import { FC } from "react";

interface IsOnlineBadgeProps {
  isOnline?: boolean;
}

const IsOnlineBadge: FC<IsOnlineBadgeProps> = ({ isOnline }) => {
  return (
    <span className={isOnline ? "badge-primary" : "badge-secondary"}>
      {isOnline ? "Online" : "Offline"}
    </span>
  );
};

export default IsOnlineBadge;

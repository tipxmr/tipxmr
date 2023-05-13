"use client";

import IsOnlineBadge from "~/components/IsOnlineBadge";
import { useStreamerSocket } from "~/hooks/socket/use-socket";
import useUser from "~/lib/useUser";


const DashboardPage = () => {
  useStreamerSocket();

  const { user } = useUser({ redirectTo: "/login" });

  if (user && user.isLoggedIn) {
    return (
      <div className="mx-auto">
        <p>Welcome, {user.alias}</p>
        <p>Your Id: {user.id}</p>
        <p>Your Socket Id: {user.socket}</p>
        <IsOnlineBadge isOnline={!!user?.isOnline} />
      </div>
    );
  }

  return <h2>Please log in</h2>;
};

export default DashboardPage;

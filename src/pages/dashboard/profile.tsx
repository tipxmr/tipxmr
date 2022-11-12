import { NextPage } from "next";

import IsOnlineBadge from "~/components/IsOnlineBadge";
import useUser from "~/lib/useUser";

const Profile: NextPage = () => {
  // TODO create a profile with some of the stats from the db
  // Creation Date
  // username and display name
  // status
  const { user } = useUser({ redirectTo: "/login" });
  return (
    <>
      <h3>Your TipXMR Profile</h3>
      <ul
        role="list"
        className="list-disc space-y-3 pl-5 text-slate-400 marker:text-sky-400"
      >
        <li>Your unique Tipxmr ID: {user?.id}</li>
        <li>Username: {user?.name}</li>
        <li>Alias: {user?.alias}</li>
        <li>Last account update at: {user?.updatedAt}</li>
        <li>
          Current wallet status: <IsOnlineBadge isOnline={user?.isOnline} />
        </li>
        <li>
          Current logged-in status:{" "}
          <IsOnlineBadge isOnline={user?.isLoggedIn} />
        </li>
        <li>Current Socket Connection: {user?.socket}</li>
      </ul>
    </>
  );
};

export default Profile;

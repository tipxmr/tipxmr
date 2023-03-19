import { NextPage } from "next";

import ProfileCard from "~/components/ProfileCard";
import useUser from "~/lib/useUser";

const Profile: NextPage = () => {
  // TODO create a profile with some of the stats from the db
  // Creation Date
  // username and display name
  // status
  const { user: streamer } = useUser({ redirectTo: "/login" });
  if (!streamer) return <div>No user found</div>;
  return <ProfileCard streamer={streamer} />;
};

export default Profile;

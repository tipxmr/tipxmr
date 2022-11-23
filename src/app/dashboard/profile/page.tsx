"use client";

import { NextPage } from "next";

import ProfileCard from "~/components/ProfileCard";
import useUser from "~/lib/useUser";

const Profile: NextPage = () => {
  // TODO create a profile with some of the stats from the db
  // Creation Date
  // username and display name
  // status
  const { user } = useUser({ redirectTo: "/login" });
  return <>{user && <ProfileCard {...user} />}</>;
};

export default Profile;

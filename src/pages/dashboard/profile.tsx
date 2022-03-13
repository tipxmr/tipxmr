import { NextPage } from "next";
import useUser from "~/lib/useUser";

const Profile: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  return <></>;
};

export default Profile;

import { NextPage } from "next";
import useUser from "~/lib/useUser";

const Settings: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  return <></>;
};

export default Settings;

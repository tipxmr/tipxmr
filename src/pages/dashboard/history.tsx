import { NextPage } from "next";
import useUser from "~/lib/useUser";

const History: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  return <></>;
};

export default History;

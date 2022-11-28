"use client";

import { NextPage } from "next";
import useDonations from "~/hooks/useTxHistory";
import useUser from "~/lib/useUser";


const History: NextPage = () => {
  // TODO fetch the tx history of the user
  const { user } = useUser()
  const { data: donations } = useDonations(user?.id)
  console.log(donations)
  return (
    <>
      <p>Here will be a table of all the received transactions</p>
    </>
  );
};

export default History;

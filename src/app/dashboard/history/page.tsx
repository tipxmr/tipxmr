"use client";

import { NextPage } from "next";

import useUser from "~/lib/useUser";

const History: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  return (
    <>
      <p>Here will be a table of all the received transactions</p>
    </>
  );
};

export default History;

"use client";

import useUser from "~/lib/useUser";

const User = () => {
  const { user } = useUser();
  return <>Client user: {JSON.stringify(user)}</>;
};

export default User;

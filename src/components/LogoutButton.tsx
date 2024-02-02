"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const LogoutButton = () => {
  return (
    <Button variant="destructive" onClick={() => signOut()}>
      Log out
    </Button>
  );
};

export default LogoutButton;

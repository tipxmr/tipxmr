"use client";

import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { clearWalletLocalStorage } from "~/lib/utils";

const LogoutButton = () => {
  const handleLogout = () => {
    clearWalletLocalStorage();
    signOut();
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Log out
    </Button>
  );
};

export default LogoutButton;

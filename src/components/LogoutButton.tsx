"use client";

import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { useWallet } from "~/context/useWalletContext";
import { clearWalletLocalStorage } from "~/lib/utils";

const LogoutButton = () => {
  const walletContext = useWallet();

  const handleLogout = async () => {
    try {
      await walletContext.wallet?.stopSyncing();
      clearWalletLocalStorage();
      signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Log out
    </Button>
  );
};

export default LogoutButton;

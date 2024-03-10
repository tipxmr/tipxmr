"use client";

import { useEffect } from "react";
import BackButton from "~/components/BackButton";
import FullWalletCreation from "~/components/FullWalletCreation";
import { clearWalletLocalStorage } from "~/lib/utils";

export default function RegistrationNewPage() {
  useEffect(() => {
    clearWalletLocalStorage();
  }, []);

  return (
    <>
      <FullWalletCreation />
      <BackButton />
    </>
  );
}

"use client";

import { useWallet } from "~/context/useWalletContext";

const TinyWallet = () => {
  const wallet = useWallet();
  console.log("TinyWallet: ", wallet);
  return <></>;
};

export default TinyWallet;

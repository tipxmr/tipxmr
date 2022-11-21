"use client";

import { useAtom } from "jotai";
import type { MoneroSubaddress } from "monero-javascript";
import { NextPage } from "next";
import { Suspense, useState } from "react";

import Subaddress from "~/components/Subaddress";
import TipxmrWallet from "~/components/wallet";
import useBalanceListener from "~/hooks/useBalanceListener";
import useSyncListener from "~/hooks/useSyncListener";
import useTransactionListener from "~/hooks/useTransactionListener";
import useXmrWallet from "~/hooks/useXMRWallet";
import useUser from "~/lib/useUser";
import { isSyncRunningAtom, walletAtom } from "~/store";

const WalletPage: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const [wallet] = useAtom(walletAtom);
  const [isSyncing] = useAtom(isSyncRunningAtom);
  const [currentAddress, setCurrentAddress] = useState<
    MoneroSubaddress | string
  >("");

  //useXmrWallet();
  useSyncListener();
  useTransactionListener();
  useBalanceListener();

  const generateAddress = async () => {
    if (!wallet) return;
    const addr = await wallet.createSubaddress(0, "test");
    const subaddress = await addr.getAddress();
    console.log(
      "🚀 ~ file: page.tsx ~ line 36 ~ generateAddress ~ subaddress",
      subaddress
    );
    setCurrentAddress(subaddress);
  };

  return (
    <>
      <Suspense fallback="Loading...">
        {user && user.isLoggedIn && <TipxmrWallet />}
      </Suspense>
      <button
        role="button"
        className="btn-primary"
        disabled={!wallet && !isSyncing}
        onClick={generateAddress}
      >
        Generate new Subaddress
      </button>
      {currentAddress && <Subaddress address={String(currentAddress)} />}
    </>
  );
};

export default WalletPage;

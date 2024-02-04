"use client";

import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";

import MoneroSubaddress from "~/components/MoneroSubaddress";
import { createWalletStateListener } from "~/hooks/wallet";
import { walletAtom } from "~/lib/store";

const {
  Provider: PrimaryWalletStateProvider,
  useWalletStateListener: usePrimaryWalletStateListener,
  useSetWallet: useSetPrimaryWallet,
} = createWalletStateListener();

const Page = () => {
  const wallet = useAtomValue(walletAtom);

  useSetPrimaryWallet(wallet);

  const percentDone = usePrimaryWalletStateListener((state) => {
    return state.sync.percentDone;
  });

  const isDone = useMemo(() => percentDone === 100, [percentDone]);

  const [currentAddress, setCurrentAddress] = useState("");

  const disabled = useMemo(() => {
    return (wallet ?? false) && !isDone;
  }, [wallet, isDone]);

  const generateAddress = async () => {
    if (!wallet) return;

    const addr = await wallet.createSubaddress(0, "test");
    const subaddress = await addr.getAddress();

    setCurrentAddress(subaddress);
  };

  return (
    <>
      <div>Progress: {percentDone}%</div>
      <button
        role="button"
        className="btn-primary"
        disabled={disabled}
        onClick={generateAddress}
      >
        Generate new Subaddress
      </button>
      {currentAddress && (
        <MoneroSubaddress subaddress={String(currentAddress)} />
      )}
    </>
  );
};

function PageWithWallet() {
  return (
    <PrimaryWalletStateProvider>
      <Page />
    </PrimaryWalletStateProvider>
  );
}

export default PageWithWallet;

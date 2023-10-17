"use client";

import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";

import Subaddress from "~/components/Subaddress";
import { createWalletStateListener } from "~/lib/hooks/xmr/wallet";
import { walletAtom } from "~/store";

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
    <section>
      <div>Progress: {percentDone}%</div>
      <button
        role="button"
        className="btn-primary"
        disabled={disabled}
        onClick={generateAddress}
      >
        Generate new Subaddress
      </button>
      {currentAddress && <Subaddress address={String(currentAddress)} />}
    </section>
  );
};

function PageWithWallet() {
  return (
    <main>
      <PrimaryWalletStateProvider>
        <Page />
      </PrimaryWalletStateProvider>
    </main>
  );
}

export default PageWithWallet;

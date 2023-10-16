import { useAtom } from "jotai";
import { MoneroWalletFull, MoneroWalletListener } from "monero-ts";
import { useEffect } from "react";

import {
  isSyncRunningAtom,
  progressAtom,
  syncEndHeightAtom,
  syncHeightAtom,
  syncStartHeightAtom,
  walletAtom,
} from "~/store";

const useSyncListener = () => {
  const [xmrWallet] = useAtom(walletAtom);
  const [progress, setProgress] = useAtom(progressAtom);
  const [isSyncing, setIsSyncing] = useAtom(isSyncRunningAtom);
  const [endHeight, setEndHeight] = useAtom(syncEndHeightAtom);
  const [startHeight, setStartHeight] = useAtom(syncStartHeightAtom);
  const [syncHeight, setSyncHeight] = useAtom(syncHeightAtom);

  useEffect(() => {
    const listener = new (class extends MoneroWalletListener {
      async onSyncProgress(
        height: number,
        startHeight: number,
        endHeight: number,
        percentDone: number,
        message: string,
      ) {
        const percentage = Math.floor(percentDone * 100);
        setProgress(percentage);
        setSyncHeight(height);
        setEndHeight(endHeight);
        setStartHeight(startHeight);
        setIsSyncing(message === "Synchronizing"); // TODO better handeling for messages
      }
    })();

    async function sync() {
      if (!xmrWallet) {
        throw new Error("Tried to sync wallet, but no wallet was set");
      }

      console.info("Set wallet sucessfully");

      await xmrWallet.addListener(listener);
      if (xmrWallet instanceof MoneroWalletFull) {
        await xmrWallet.setRestoreHeight(startHeight);
      }
      await xmrWallet.startSyncing();
    }

    sync();

    return () => {
      xmrWallet?.stopSyncing();
    };
  }, [
    setEndHeight,
    setIsSyncing,
    setProgress,
    setStartHeight,
    setSyncHeight,
    startHeight,
    xmrWallet,
  ]);
  return xmrWallet;
};

export default useSyncListener;

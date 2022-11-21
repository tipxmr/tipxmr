import { useAtom } from "jotai";
import { useEffect } from "react";

import { createSyncProgressListener } from "~/lib/xmr";
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
    const listener = createSyncProgressListener(
      (height, startHeight, endHeight, percentDone, message: string) => {
        const percentage = Math.floor(percentDone * 100);
        setProgress(percentage);
        setSyncHeight(height);
        setEndHeight(endHeight);
        setStartHeight(startHeight);
        setIsSyncing(message === "Synchronizing"); // TODO better handeling for messages
      }
    );

    async function sync() {
      if (xmrWallet) {
        console.info("Set wallet sucessfully");

        await xmrWallet.addListener(listener);
        await xmrWallet.setSyncHeight(startHeight);
        await xmrWallet.startSyncing();

        console.log("From useXmrWallet - listener is set: ", { xmrWallet });
      }
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

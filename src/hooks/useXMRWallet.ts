import { createSyncProgressListener, open } from "~/lib/xmr";
import { useAtom } from "jotai";
import {
  isSyncRunningAtom,
  progressAtom,
  syncEndHeightAtom,
  syncHeightAtom,
  syncStartHeightAtom,
  walletAtom,
} from "~/store";
import { useEffect } from "react";

export const useXmrWallet = (seedPhrase: string) => {
  const [xmrWallet, setXmrWallet] = useAtom(walletAtom);
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
        console.log("message from listener: ", message);
      }
    );

    async function openWallet() {
      const wallet = await open(seedPhrase);
      // setXmrWallet(wallet);
      setXmrWallet(wallet);
      console.info("Set wallet sucessfully");
    }

    openWallet();

    return () => {
      xmrWallet?.close();
    };
  }, []);
  return xmrWallet;
};

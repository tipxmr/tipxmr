import { LoadingButton } from "@mui/lab";
import { Button, Input, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { NextPage } from "next";
import { Suspense, useEffect } from "react";
import { TipxmrWallet } from "~/components";
import useUser from "~/lib/useUser";
import { createSyncProgressListener } from "~/lib/xmr";
import {
  balanceAtom,
  isSyncRunningAtom,
  mnemonicAtom,
  openWalletAtom,
  progressAtom,
  progressListener,
  syncEndHeightAtom,
  syncHeightAtom,
  syncStartHeightAtom,
  walletAtom,
} from "~/store";

const SimpleWallet: NextPage = () => {
  /* useUser({
   *     redirectTo: "/dashboard",
   * });
   */
  const testPhrase =
    "rays oneself enigma vats onto awoken utensils lobster italics ripped oneself certain point answers putty inwardly menu solved upgrade patio oatmeal masterful toffee utensils patio";
  const [mnemnoic, setMnemonic] = useAtom(mnemonicAtom);
  const [_, setXmrWallet] = useAtom(openWalletAtom);
  const [wallet] = useAtom(walletAtom);
  const [progressOld] = useAtom(progressAtom);
  const [isSyncing] = useAtom(isSyncRunningAtom);
  const [syncHeight] = useAtom(syncHeightAtom);
  const [syncEndHeight] = useAtom(syncEndHeightAtom);
  const [syncStartHeight] = useAtom(syncStartHeightAtom);
  const [balance] = useAtom(balanceAtom);

  const [progress, addProgress] = useAtom(progressListener);

  console.log({ progressOld });
  const handleWalletLoad = () => {
    if (!mnemnoic) {
      setMnemonic(testPhrase);
      console.log({ mnemnoic });
    }

    if (mnemnoic) {
      setXmrWallet(mnemnoic);
      console.log("Successfully set the walletAtom: ", { wallet });
    }
  };

  return (
    <>
      <Typography variant="h2">Here goes the simple wallet</Typography>
      <Button onClick={handleWalletLoad}>Set Wallet</Button>
      {mnemnoic && <Typography variant="body1">{mnemnoic}</Typography>}
      {wallet && (
        <>
          <TipxmrWallet
            startHeight={syncStartHeight}
            balance={balance}
            isSynced={!isSyncing}
            height={syncHeight}
            percentDone={progress}
            endHeight={syncEndHeight}
          />
        </>
      )}
    </>
  );
};

export default SimpleWallet;

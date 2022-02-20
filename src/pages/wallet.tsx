// TODO: 
import { Typography } from "@mui/material";
import { atom, useAtom } from "jotai";
import { MoneroWalletFull } from "monero-javascript";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  createBalancesChangedListener,
  createOutputReceivedListener,
  createSyncProgressListener,
  open,
} from "~/lib/xmr";

const MNEMONIC =
  "aimless erected efficient eluded richly return cage unveil seismic zodiac hotel ringing jingle echo rims maze tapestry inline bomb eldest woken zero older onslaught ringing";

const Transaction = ({ wallet }: { wallet?: MoneroWalletFull }) => {
  useEffect(() => {
    (async () => {
      const listener = createOutputReceivedListener((output) => {
        const { inTxPool, isLocked, isIncoming } = output.state.tx.state;

        if (inTxPool && isLocked && isIncoming) {
          console.log({
            subaddressIndex: output.getSubaddressIndex(),
            amount: output.getAmount().toString(),
          });
        }
      });

      await wallet.addListener(listener);

      const subaddress = await wallet.createSubaddress(0, "foobar");
      const address = await subaddress.getAddress();

      console.log({ subaddress: address });
    })();

    (async () => {
      const listener = createBalancesChangedListener(
        (newBalance: BigInteger, newUnlockedBalance: BigInteger) => {
          console.log({
            newBalance: newBalance.toString(),
            newUnlockedBalance: newUnlockedBalance.toString(),
          });
        }
      );

      await wallet.addListener(listener);
    })();
  }, [wallet]);

  return null;
};

const mnemonicAtom = atom("")
const progressAtom = atom(0);
const syncHeightAtom = atom(0);
const isSyncRunningAtom = atom(false);
const walletAtom = atom<MoneroWalletFull | undefined>(undefined);

const openWalletAtom = atom(async (get) => {
  const mnemonic = get(mnemonicAtom)

  if (mnemonic) {
    return open(mnemonic);
  }
  
  return undefined;
})

const WalletPage: NextPage = () => {
  const [progress, setProgress] = useAtom(progressAtom);
  const [myWallet, setMyWallet] = useAtom(walletAtom);

  // const [progress, setProgress] = useState(0);
  // const [xmrWallet, setXmrWallet] = useState<MoneroWalletFull>();

  const isDone = progress === 100;

  useEffect(() => {
    const listener = createSyncProgressListener(
      (
        height: number,
        startHeight: number,
        endHeight: number,
        percentDone: number,
        message: string
      ) => {
        const percentage = Math.floor(percentDone * 100);
        setProgress(percentage);
      }
    );

    async function foobar() {
      const wallet = await open(MNEMONIC);
      // setXmrWallet(wallet);
      setMyWallet(wallet);
      const primaryAddress = await wallet.getPrimaryAddress();

      await wallet.addListener(listener);
      await wallet.setSyncHeight(995039);
      await wallet.startSyncing();

      console.log({ primaryAddress });

      return () => {
        wallet.stopSyncing();
      };
    }

    const unsubscribe = foobar();

    return () => {
      // unsubscribe();
    };
  }, []);

  return (
    <>
      <h2>Wallet</h2>
      <Typography>Progress: {progress}%</Typography>
      {isDone ? <Transaction wallet={myWallet} /> : null}
    </>
  );
};

export default WalletPage;

// const walletAtom = atom(
//   (get) => {
//     return null;
//   },
//   (get, set, update) => {
//     return null
//   }
// )
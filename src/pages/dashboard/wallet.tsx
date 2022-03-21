// TODO:
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import {
  balanceAtom,
  mnemonicAtom,
  syncEndHeightAtom,
  progressAtom,
  syncHeightAtom,
  isSyncRunningAtom,
  walletAtom,
  openWalletAtom,
} from "~/store";
import { MoneroWalletFull } from "monero-javascript";
import { TipxmrWallet } from "~/components";
import { NextPage } from "next";
import { useEffect } from "react";
import {
  createBalancesChangedListener,
  createOutputReceivedListener,
  createSyncProgressListener,
  open,
} from "~/lib/xmr";
import useUser from "~/lib/useUser";

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

const WalletPage: NextPage = () => {
  const { user: session } = useUser({ redirectTo: "/login" });

  const [progress, setProgress] = useAtom(progressAtom);
  const [myWallet, setMyWallet] = useAtom(walletAtom);
  const [isSyncing] = useAtom(isSyncRunningAtom);
  const [syncHeight, setSyncHeight] = useAtom(syncHeightAtom);
  const [syncEndHeight] = useAtom(syncEndHeightAtom);
  const [balance, setBalance] = useAtom(balanceAtom);

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
        setSyncHeight(height);
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
      {session && session.isLoggedIn && (
        <TipxmrWallet
          balance={balance}
          isSynced={isDone && !isSyncing}
          height={syncHeight}
          percentDone={progress}
          endHeight={syncEndHeight}
        ></TipxmrWallet>
      )}
      {isDone ? <Transaction wallet={myWallet} /> : null}
    </>
  );
};

export default WalletPage;

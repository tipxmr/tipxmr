import { useAtom } from "jotai";
import { MoneroWalletListener } from "monero-ts";
import { useEffect } from "react";

import { balanceAtom, lockedBalanceAtom, walletAtom } from "~/store";

const useBalanceListener = () => {
  const [xmrWallet] = useAtom(walletAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  const [lockedBalance, setLockedBalance] = useAtom(lockedBalanceAtom);

  useEffect(() => {
    const balanceListener = new (class extends MoneroWalletListener {
      async onBalancesChanged(
        newBalance: bigint,
        newUnlockedBalance: bigint,
      ): Promise<void> {
        setBalance(Number(newUnlockedBalance));
        setLockedBalance(Number(newBalance));

        console.log({
          newBalance: newBalance.toString(),
          newUnlockedBalance: newUnlockedBalance.toString(),
        });
      }
    })();

    async function sync() {
      if (xmrWallet !== undefined) {
        await xmrWallet?.addListener(balanceListener);

        console.log("From useBalanceListener - listener is set: ", {
          xmrWallet,
        });
      }
    }

    sync();

    return () => {
      xmrWallet?.removeListener(balanceListener);
    };
  }, []);
  return xmrWallet;
};

export default useBalanceListener;

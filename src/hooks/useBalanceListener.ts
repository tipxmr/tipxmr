import { createBalancesChangedListener } from "~/lib/xmr";
import { useAtom } from "jotai";
import { balanceAtom, lockedBalanceAtom, walletAtom } from "~/store";
import { useEffect } from "react";

export const useBalanceListener = () => {
  const [xmrWallet] = useAtom(walletAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  const [lockedBalance, setLockedBalance] = useAtom(lockedBalanceAtom);

  useEffect(() => {
    const listener = createBalancesChangedListener(
      (newBalance: BigInteger, newUnlockedBalance: BigInteger) => {
        setBalance(Number(newUnlockedBalance));
        setLockedBalance(Number(newBalance));

        console.log({
          newBalance: newBalance.toString(),
          newUnlockedBalance: newUnlockedBalance.toString(),
        });
      }
    );

    async function sync() {
      if (xmrWallet !== undefined) {
        await xmrWallet.addListener(listener);

        console.log("From useBalanceListener - listener is set: ", {
          xmrWallet,
        });
      }
    }

    sync();

    return () => {
      xmrWallet?.removeListener(listener);
    };
  }, []);
  return xmrWallet;
};

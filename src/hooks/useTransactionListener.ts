import { createOutputReceivedListener } from "~/lib/xmr";
import { useAtom } from "jotai";
import { walletAtom } from "~/store";
import { useEffect } from "react";

const useTransactionListener = () => {
  const [xmrWallet] = useAtom(walletAtom);
  useEffect(() => {
    const listener = createOutputReceivedListener((output) => {
      console.log({ output });
      // if (inTxPool && isLocked && isIncoming) {
      //   console.log({
      //     subaddressIndex: output.getSubaddressIndex(),
      //     amount: output.getAmount().toString(),
      //   })
      // }
    });

    async function sync() {
      console.log("Output Listner: ", xmrWallet);
      if (xmrWallet !== undefined) {
        console.info("Set wallet sucessfully");

        await xmrWallet.addListener(listener);

        console.log("From TransactionListner - listener is set: ", {
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

export default useTransactionListener;

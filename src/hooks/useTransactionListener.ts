import { useAtom } from "jotai";
import { MoneroOutputWallet, MoneroWalletListener } from "monero-ts";
import { useEffect } from "react";

import { walletAtom } from "~/store";

const useTransactionListener = () => {
  const [xmrWallet] = useAtom(walletAtom);
  useEffect(() => {
    const outoutRevievedListener = new (class extends MoneroWalletListener {
      async onOutputReceived(output: MoneroOutputWallet): Promise<void> {
        console.log({ output });
        // if (inTxPool && isLocked && isIncoming) {
        //   console.log({
        //     subaddressIndex: output.getSubaddressIndex(),
        //     amount: output.getAmount().toString(),
        //   })
        // }
      }
    })();

    async function sync() {
      console.log("Output Listner: ", xmrWallet);
      if (xmrWallet !== undefined) {
        console.info("Set wallet sucessfully");

        await xmrWallet?.addListener(outoutRevievedListener);

        console.log("From TransactionListner - listener is set: ", {
          xmrWallet,
        });
      }
    }

    sync();

    return () => {
      xmrWallet?.removeListener(outoutRevievedListener);
    };
  }, [xmrWallet]);
  return xmrWallet;
};

export default useTransactionListener;

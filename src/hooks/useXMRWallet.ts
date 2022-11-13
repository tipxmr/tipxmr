import { useAtom } from "jotai";
import { useEffect } from "react";

import { open } from "~/lib/xmr";
import { mnemonicAtom, walletAtom } from "~/store";

const useXmrWallet = () => {
  const [seedPhrase] = useAtom(mnemonicAtom);
  const [xmrWallet, setXmrWallet] = useAtom(walletAtom);

  useEffect(() => {
    async function openWallet() {
      const wallet = await open(seedPhrase);
      setXmrWallet(wallet);
      console.info("Set wallet sucessfully");
    }

    openWallet();

    return () => {
      xmrWallet?.close();
    };
  }, []);
};

export default useXmrWallet;

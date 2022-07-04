import { open } from "~/lib/xmr";
import { useAtom } from "jotai";
import { mnemonicAtom, walletAtom } from "~/store";
import { useEffect } from "react";

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

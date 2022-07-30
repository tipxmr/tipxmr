import { open } from "~/lib/xmr";
import { useAtom } from "jotai";
import { mnemonicAtom, walletAtom } from "~/store";
import { useEffect } from "react";
import { MoneroTxConfig } from "monero-javascript";

const useXmrWallet = () => {
  const [seedPhrase] = useAtom(mnemonicAtom);
  const [xmrWallet, setXmrWallet] = useAtom(walletAtom);

  console.log("useXmrWallet")

  useEffect(() => {
    async function openWallet() {
      const wallet = await open(seedPhrase);
      setXmrWallet(wallet);
      console.info("Set wallet sucessfully");
    }

    console.log("open")
    openWallet();

    return () => {
      xmrWallet?.close();
    };
  }, [seedPhrase, xmrWallet, setXmrWallet]);

  useEffect(() => {
    async function foobar() {
      if (xmrWallet) {
        const config = new MoneroTxConfig({
          address: "73a4nWuvkYoYoksGurDjKZQcZkmaxLaKbbeiKzHnMmqKivrCzq5Q2JtJG1UZNZFqLPbQ3MiXCk2Q5bdwdUNSr7X9QrPubkn",
          note: "FOOBAR <3 XMR",
          amount: BigInt(1).toString(),
        });

        console.log({config})

        const uri = await xmrWallet.createPaymentUri(config);

        console.log({uri})
      }
    }
      
    foobar();
  }, [xmrWallet]);
};

export default useXmrWallet;

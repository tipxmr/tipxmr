import { useAtom } from "jotai";
import { MoneroSubaddress } from "monero-javascript";
import { NextPage } from "next";
import { Suspense, useState } from "react";

import Subaddress from "~/components/Subaddress";
import TipxmrWallet from "~/components/wallet";
import useBalanceListener from "~/hooks/useBalanceListener";
import useSyncListener from "~/hooks/useSyncListener";
import useTransactionListener from "~/hooks/useTransactionListener";
import useXmrWallet from "~/hooks/useXMRWallet";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import useUser from "~/lib/useUser";
import { isSyncRunningAtom, mnemonicAtom, walletAtom } from "~/store";

const testSeed =
  "typist error soothe tribal peeled rhino begun decay gopher yeti height tuxedo ferry etiquette pram bailed sneeze mostly urchins pheasants kisses ammo voice voted etiquette";
const WalletPage: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const [myWallet] = useAtom(walletAtom);
  const [isSyncing] = useAtom(isSyncRunningAtom);
  const [mnemonic, setMnemonic] = useAtom(mnemonicAtom);
  const [currentAddress, setCurrentAddress] = useState<
    MoneroSubaddress | string
  >("");

  if (!mnemonic) setMnemonic(testSeed);

  useXmrWallet();
  useSyncListener();
  useTransactionListener();
  useBalanceListener();

  const generateAddress = async () => {
    if (myWallet) {
      const addr = await myWallet.createSubaddress(0, "test");
      const subaddress = await addr.getAddress();

      setCurrentAddress(subaddress);

      const body = {
        streamer: user?.id,
        data: { subaddress },
      };

      try {
        const result = await fetchJson(`/api/donate/${user?.id}`, {
          method: "POST",
          body,
        });

        console.log(result);
      } catch (reason) {
        if (reason instanceof FetchError) {
          console.error(reason);
        } else {
          console.error("An unexpected error happened:", reason);
        }
      }
    }
  };

  return (
    <>
      <Suspense fallback="Loading...">
        {user && user.isLoggedIn && <TipxmrWallet />}
      </Suspense>
      <button
        role="button"
        className="btn-primary"
        disabled={!myWallet && !isSyncing}
        onClick={generateAddress}
      >
        Generate new Subaddress
      </button>
      {currentAddress && <Subaddress address={String(currentAddress)} />}
    </>
  );
};

export default WalletPage;

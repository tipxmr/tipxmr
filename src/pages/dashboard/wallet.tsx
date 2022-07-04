import { useAtom } from "jotai";
import { isSyncRunningAtom, walletAtom, mnemonicAtom } from "~/store";
import { MoneroSubaddress } from "monero-javascript";
import Subaddress from "~/components/Subaddress";
import TipxmrWallet from "~/components/wallet";
import { NextPage } from "next";
import { Suspense, useState } from "react";
import useUser from "~/lib/useUser";
import { Button } from "@mui/material";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import useSyncListener from "~/hooks/useSyncListener";
import useTransactionListener from "~/hooks/useTransactionListener";
import useXmrWallet from "~/hooks/useXMRWallet";
import useBalanceListener from "~/hooks/useBalanceListener";

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
          body
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
      <Button
        disabled={!myWallet && !isSyncing}
        variant="contained"
        color="primary"
        onClick={generateAddress}
      >
        Generate new Subaddress
      </Button>
      {currentAddress && <Subaddress address={String(currentAddress)} />}
    </>
  );
};

export default WalletPage;

import { atom, useAtom } from "jotai";
import { MoneroWalletFull } from "monero-javascript"

const mnemonicAtom = atom("")
const progressAtom = atom(0);
const syncHeightAtom = atom(0);
const isSyncRunningAtom = atom(false);
const walletAtom = atom<MoneroWalletFull | undefined>(undefined);

const openWalletAtom = atom(async (get) => {
  const mnemonic = get(mnemonicAtom)

  if (mnemonic) {
    return open(mnemonic);
  }

  return undefined;
})

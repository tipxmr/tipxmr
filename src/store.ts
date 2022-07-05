import { atom } from "jotai";
import { MoneroWalletFull } from "monero-javascript";

import { createWallet, getMnemonicHash, open } from "./lib/xmr";

// --- ATOMS
export const mnemonicAtom = atom("");
export const progressAtom = atom(0);
export const balanceAtom = atom(0);
export const lockedBalanceAtom = atom(0);
export const syncHeightAtom = atom(0);
export const syncEndHeightAtom = atom(0);
export const syncStartHeightAtom = atom(1102410);
export const isSyncRunningAtom = atom(false);
export const walletAtom = atom<MoneroWalletFull | undefined>(undefined);

export const openWalletAtom = atom(null, async (get, set, update) => {
  const mnemonic = get(mnemonicAtom);
  console.log("atom mnemonic", { mnemonic });

  if (mnemonic) {
    const wallet = await open(mnemonic);
    set(walletAtom, wallet);
    return wallet;
  }
});
export const seedLangAtom = atom("English");

export const seedAtom = atom("");
export const seedPhraseAtom = atom("");
export const truncatedHashedSeedAtom = atom(async (get) => {
  const seedPhrase = get(generatedSeedPhraseAtom);
  const truncatedHashedSeed = getMnemonicHash(seedPhrase).slice(0, 11);
  return truncatedHashedSeed;
});
export const generatedSeedPhraseAtom = atom(async (get) => {
  const seedLang = get(seedLangAtom);
  const seedPhrase = await createWallet(seedLang);
  return seedPhrase;
});
export const userNameAtom = atom("");
export const displayNameAtom = atom("");

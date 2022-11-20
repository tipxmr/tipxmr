import { atom } from "jotai";
import { MoneroWalletFull, MoneroWalletKeys } from "monero-javascript";

import { createWalletFromScratch, hashSha256, open } from "./lib/xmr";

// --- ATOMS
export const mnemonicAtom = atom("");
export const progressAtom = atom(0);
export const balanceAtom = atom(0);
export const lockedBalanceAtom = atom(0);
export const syncHeightAtom = atom(0);
export const syncEndHeightAtom = atom(0);
export const syncStartHeightAtom = atom(1102410);
export const isSyncRunningAtom = atom(false);
export const userNameAtom = atom("");
export const displayNameAtom = atom("");
export const walletAtom = atom<MoneroWalletFull | MoneroWalletKeys | null>(
  null
);
export const seedLangAtom = atom("English");

export const hashIdAtom = atom("");
export const truncatedHashIdAtom = atom((get) => get(hashIdAtom).slice(0, 11));

export const generatedSeedPhraseAtom = atom(async (get) => {
  const seedLang = get(seedLangAtom);
  const fullWallet = await createWalletFromScratch(seedLang);
  return fullWallet.getMnemonic();
});

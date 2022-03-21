import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { atom } from "jotai";
import { MoneroWalletFull } from "monero-javascript";

import counter from "./features/counter";
import { createWallet } from "./lib/xmr";

export function makeStore() {
  return configureStore({
    reducer: { counter },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;

// --- ATOMS
export const mnemonicAtom = atom("");
export const progressAtom = atom(0);
export const balanceAtom = atom(0);
export const syncHeightAtom = atom(0);
export const syncEndHeightAtom = atom(0);
export const syncStartHeightAtom = atom(0);
export const isSyncRunningAtom = atom(false);
export const walletAtom = atom<MoneroWalletFull | undefined>(undefined);

export const openWalletAtom = atom(async (get) => {
  const mnemonic = get(mnemonicAtom);

  if (mnemonic) {
    return open(mnemonic);
  }

  return undefined;
});
export const seedLangAtom = atom("English");

export const seedAtom = atom("");
export const seedPhraseAtom = atom("");
// export const seedPhraseAtom = atom(
//   async (get) => { },
//   async (get, set) => {
//     const seedLang = get(seedLangAtom);
//     const seedPhrase = await createWallet(seedLang);
//     set(seedPhraseAtom, seedPhrase);
//   }
// );

export const generatedSeedPhraseAtom = atom(async (get) => {
  const seedLang = get(seedLangAtom);
  const seedPhrase = await createWallet(seedLang);
  console.log("Atom | seedphrase: ", seedPhrase);

  if (seedLang) return seedLang;
  return undefined;
});
// export const seedPhraseAtom: any = atom((get) => get(seedPhrase),
//   (get, set, newPhrase) => {
//     console.log("new Phrase: ", newPhrase)
//     set(seedPhrase, newPhrase)
//   });

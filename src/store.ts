import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { atom } from "jotai";
import { MoneroWalletFull, MoneroWalletListener } from "monero-javascript";

import counter from "./features/counter";
import {
  createBalancesChangedListener,
  createSyncProgressListener,
  createWallet,
  getMnemonicHash,
  open,
} from "./lib/xmr";

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

// --- Jotai ---
// Wallet
export const mnemonicAtom = atom("");
export const progressAtom = atom(0);
export const balanceAtom = atom(0);
export const syncHeightAtom = atom(0);
export const syncEndHeightAtom = atom(0);
export const syncStartHeightAtom = atom(0);
export const isSyncRunningAtom = atom(false);
export const seedLangAtom = atom("English");
export const seedAtom = atom("");
export const seedPhraseAtom = atom("");
export const walletAtom = atom<MoneroWalletFull | undefined>(undefined);

// async
export const openWalletAtom = atom(null, async (get, set, mnemonic) => {
  if (typeof mnemonic == "string") {
    const wallet = await open(mnemonic); // ⚠️ needs to be awaited
    set(walletAtom, wallet);
  }
});
export const progressListener = atom<MoneroWalletListener | undefined>(
  undefined,
  async (get, set, update) => {
    const wallet = get(walletAtom);
    if (!wallet) return;

    const listener = createSyncProgressListener((height, percentDone) => {
      const percentage = Math.floor(percentDone * 100);
      set(progressAtom, percentage);
      set(syncHeightAtom, height);
    });

    const walletListener = await wallet.addListener(listener);

    set(progressListener, walletListener);
  }
);

export const blanceChangedListener = atom<MoneroWalletListener | undefined>(
  undefined
);
export const addBalancedChangedListener = atom(
  null,
  async (get, set, update) => {
    const wallet = get(walletAtom);
    if (!wallet) throw new Error("Sorry, no wallet");

    const listener = createBalancesChangedListener(
      (newBalance: BigInteger, newUnlockedBalance: BigInteger) => {
        console.log({
          newBalance: newBalance.toString(),
          newUnlockedBalance: newUnlockedBalance.toString(),
        });
      }
    );

    const balanceListener = await wallet?.addListener(listener);
    set(blanceChangedListener, balanceListener);
  }
);

export const OutputReceivedListener = atom<MoneroWalletListener | undefined>(
  undefined
);
export const addOutputReceivedListener = atom(
  null,
  async (get, set, update) => {}
);

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

// User
export const userNameAtom = atom("");
export const displayNameAtom = atom("");

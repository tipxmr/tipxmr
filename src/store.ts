import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { atom } from "jotai";

import counter from "./features/counter";

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

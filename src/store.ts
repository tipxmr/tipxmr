import { atom } from "jotai";
import { MoneroWalletFull, MoneroWalletKeys } from "monero-javascript";

import { buildIdentifierHash } from "./lib/xmr";

// --- ATOMS
export const walletAtom = atom<MoneroWalletFull | MoneroWalletKeys | null>(
  null,
);

export const truncatedHashIdAtom = atom(async (get) => {
  const fullWallet = get(walletAtom);
  if (!fullWallet) return null;
  const privateViewKey = await fullWallet.getPrivateViewKey();
  const primaryAddress = await fullWallet.getPrimaryAddress();
  return buildIdentifierHash(privateViewKey, primaryAddress);
});

export const progressAtom = atom(0);
export const balanceAtom = atom(0);
export const lockedBalanceAtom = atom(0);
export const syncHeightAtom = atom(0);
export const syncEndHeightAtom = atom(0);
export const syncStartHeightAtom = atom(1102410);
export const isSyncRunningAtom = atom(false);
export const userNameAtom = atom("");
export const displayNameAtom = atom("");

export const transactionAddressAtom = atom("");

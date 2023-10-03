import Hex from "crypto-js/enc-hex";
import sha256 from "crypto-js/sha256";
import {
  createWalletFull,
  createWalletKeys,
  MoneroWalletFull,
} from "monero-ts";

const stagenetNode = {
  networkType: "stagenet",
  password: "pass123",
  serverUri: "http://localhost:38081",
  serverUsername: "superuser",
  serverPassword: "abctesting123",
  rejectUnauthorized: false, // e.g. local development
};

// --- Helper
export const hashSha256 = (seed: string) => Hex.stringify(sha256(seed));
export const buildIdentifierHash = (
  privateViewKey: string,
  primaryAddress: string,
) => hashSha256(`${privateViewKey}${primaryAddress}`).slice(0, 12);

// --- Wallet stuff
export const createWalletFromScratch = async (lang = "English") => {
  const walletFull = await createWalletFull({
    // seed omitted => generate random wallet
    language: lang,
    ...stagenetNode,
  });
  return walletFull;
};

export const createViewOnlyWallet = async (
  privateViewKey: string,
  primaryAddress: string,
) => {
  const walletFull = await createWalletKeys({
    networkType: "stagenet",
    privateViewKey,
    primaryAddress,
  });
  return walletFull;
};

export const open = async (seed: string) => {
  return createWalletFull({
    seed,
    ...stagenetNode,
  });
};

export const generateSubaddress = async ({
  accountIndex,
  label,
  wallet,
}: {
  accountIndex: number;
  label: string;
  wallet: MoneroWalletFull;
}) => wallet.createSubaddress(accountIndex, label);

export const createMoneroTransactionUri = ({
  address,
  amount,
  description,
}: {
  address: string;
  amount: number;
  description: string;
}) => {
  return `monero:${address}?tx_amount=${amount}&tx_description=${description}`;
};

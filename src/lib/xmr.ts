import { createHash } from "crypto";
import {
  createWalletFull,
  createWalletKeys,
  type MoneroWalletConfig,
  type MoneroWalletFull,
} from "monero-ts";
import { env } from "~/env";

export const stagenetNode: Partial<MoneroWalletConfig> = {
  networkType: "stagenet",
  server: {
    uri: env.NEXT_PUBLIC_MONERO_DAEMON_URL,
    username: env.NEXT_PUBLIC_MONERO_DAEMON_USER,
    password: env.NEXT_PUBLIC_MONERO_DAEMON_PASSWORD,
  },
};

// --- Helper
export const hashSha256 = (seed: string) =>
  createHash("sha256").update(seed).digest("hex");
export const buildIdentifierHash = (
  privateViewKey: string,
  primaryAddress: string,
) => hashSha256(`${privateViewKey}${primaryAddress}`).slice(0, 12);

// --- Wallet stuff
export const createWalletFromScratch = async (lang = "English") => {
  const walletFull = await createWalletFull({
    // seed omitted => generate random wallet
    language: lang,
    password: "pass123",
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

import Hex from "crypto-js/enc-hex";
import sha256 from "crypto-js/sha256";
import type {
  BalancesChangedListener,
  MoneroWalletFull,
  MoneroWalletKeys,
  OutputReceivedListener,
  SyncProgressListener,
} from "monero-javascript";
import {
  createWalletFull,
  createWalletKeys,
  MoneroWalletListener,
} from "monero-javascript";

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
export const createWalletFromScratch = async (
  lang = "English",
): Promise<MoneroWalletFull> => {
  const walletFull = await createWalletFull({
    // mnemonic omitted => generate random wallet
    language: lang,
    ...stagenetNode,
  });
  return walletFull;
};

export const createViewOnlyWallet = async (
  privateViewKey: string,
  primaryAddress: string,
): Promise<MoneroWalletKeys> => {
  const walletFull = await createWalletKeys({
    networkType: "stagenet",
    privateViewKey,
    primaryAddress,
  });
  return walletFull;
};

export const open = async (mnemonic: string) => {
  return createWalletFull({
    mnemonic,
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

// --- Listeners
export const createSyncProgressListener = (
  onSyncProgress: SyncProgressListener,
) =>
  new (class extends MoneroWalletListener {
    onSyncProgress(
      height: number,
      startHeight: number,
      endHeight: number,
      percentDone: number,
      message: string,
    ) {
      onSyncProgress(height, startHeight, endHeight, percentDone, message);
    }
  })() as MoneroWalletListener;

export const createBalancesChangedListener = (
  onBalancesChanged: BalancesChangedListener,
) =>
  new (class extends MoneroWalletListener {
    onBalancesChanged(newBalance: BigInteger, newUnlockedBalance: BigInteger) {
      onBalancesChanged(newBalance, newUnlockedBalance);
    }
  })() as MoneroWalletListener;

export const createOutputReceivedListener = (
  onOutputReceived: OutputReceivedListener,
) =>
  new (class extends MoneroWalletListener {
    onOutputReceived(output: any) {
      // onOutputReceived(output)
      const amount = output.getAmount();
      const txHash = output.getTx().getHash();
      const isConfirmed = output.getTx().isConfirmed();
      const isLocked = output.getTx().isLocked();
      onOutputReceived(output);
      return { amount, txHash, isConfirmed, isLocked };
    }
  })() as MoneroWalletListener;

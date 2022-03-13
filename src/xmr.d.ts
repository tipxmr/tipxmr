// https://github.com/woodser/monero-deposit-scanner/blob/f9362e5594b87d6817b53d111818f51869fc9914/src/main/moduleDeclaration.d.ts

declare module "monero-javascript" {
  export enum MoneroTxPriority {
    DEFAULT = 0,
    UNIMPORTANT = 1,
    NORMAL = 2,
    ELEVATED = 3,
  }

  export interface MoneroTxConfig {
    accountIndex: number;
    amount: BigInt;
    address: string;
    relay: boolean;
    priority: MoneroTxPriority;
  }

  export interface MoneroTxWallet {}

  export interface MoneroWalletConfig {
    mnemonic?: string;
    networkType: string;
    password: string;
    serverUri: string;
    serverUsername: string;
    serverPassword: string;
    language?: string;
    rejectUnauthorized: boolean;
  }

  declare class MoneroSubaddress {
    getAddress(): string;
  }

  declare interface MoneroWallet {
    createTx(config: MoneroTxConfig): MoneroTxWallet;
    close();
    addListener(listener: MoneroWalletListener);
  }

  declare class MoneroWalletFull implements MoneroWallet {
    async close();
    async getMnemonic(): string;
    async getPrimaryAddress(): string;
    async addListener(listener: MoneroWalletListener);
    async removeListener(listener: MoneroWalletListener);
    async startSyncing();
    async stopSyncing();
    async getListeners(): MoneroWalletListener[];
    async setSyncHeight(height: number);
    async getDaemonConnection(): unknown;
    async isConnectedToDaemon(): boolean;

    async getTxs(): unknown[];
    async createSubaddress(accountIdx: number, label: string): MoneroSubaddress;
  }

  export function createWalletFull(
    config: MoneroWalletConfig
  ): MoneroWalletFull;

  export type SyncProgressListener = (
    height: number,
    startHeight: number,
    endHeight: number,
    percentDone: number,
    message: string
  ) => void;
  export type BalancesChangedListener = (
    newBalance: BigInteger,
    newUnlockedBalance: BigInteger
  ) => void;
  export type OutputReceivedListener = (output: MoneroWallet) => void;

  declare abstract class MoneroWalletListener {
    // async onBalancesChanged: BalancesChangedListener;

    async onBalancesChanged(
      newBalance: BigInteger,
      newUnlockedBalance: BigInteger
    ): void;
    async onSyncProgress(
      height: number,
      startHeight: number,
      endHeight: number,
      percentDone: number,
      message: string
    ): void;
    async onNewBlock(height: number): void;
    async onOutputReceived(output: MoneroWallet): void;
  }

  // declare class BigInteger {
  //   BigInteger(): Uint8Array;
  //   BigInteger(n: number): Uint8Array;
  // }
}

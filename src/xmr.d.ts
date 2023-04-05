// https://github.com/woodser/monero-deposit-scanner/blob/f9362e5594b87d6817b53d111818f51869fc9914/src/main/moduleDeclaration.d.ts

declare module "monero-javascript" {
  export const MoneroTxPriority = {
    DEFAULT: 0,
    UNIMPORTANT: 1,
    NORMAL: 2,
    ELEVATED: 3,
  } as const

  export interface MoneroTxConfig {
    accountIndex: number;
    amount: bigint;
    address: string;
    relay: boolean;
    priority: MoneroTxPriority;
  }

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

  export interface MoneroWalletKeysConfig {
    mnemonic?: string;
    networkType: string;
    language?: string;
    primaryAddress: string;
    privateViewKey: string;
  }

  export interface MoneroDaemonRpcConfig {
    uri: string;
    username?: string;
    password?: string;
    rejectUnauthorized?: boolean;
  }

  declare class MoneroSubaddress {
    async getAddress(): Promise<string>;
  }

  declare interface MoneroWallet {
    createTx(config: MoneroTxConfig): MoneroTxWallet;
    close();
    addListener(listener: MoneroWalletListener);
  }

  declare class MoneroWalletKeys implements MoneroWallet {
    async addListener(listener: MoneroWalletListener);
    async close();
    async createSubaddress(
      accountIdx: number,
      label: string
    ): Promise<MoneroSubaddress>;
    async createTx(config: MoneroTxConfig): Promise<MoneroTxWallet>;
    async getDaemonConnection(): Promise<unknown>;
    async getListeners(): MoneroWalletListener[];
    async getPrimaryAddress(): Promise<string>;
    async getPrivateViewKey(): Promise<string>;
    async getTxs(): Promise<unknown[]>;
    async isConnectedToDaemon(): Promise<boolean>;
    async isViewOnly(): Promise<boolean>;
    async removeListener(listener: MoneroWalletListener);
    async setRestoreHeight(height: number);
    async startSyncing();
    async stopSyncing();
  }

  declare class MoneroWalletFull
    extends MoneroWalletKeys
    implements MoneroWallet {
    async getMnemonic(): Promise<string>;
  }

  declare class MoneroDaemonRpc {
    async getHeight(): Promise<number>;
  }

  export async function createWalletFull(
    config: MoneroWalletConfig
  ): Promise<MoneroWalletFull>;

  export async function createWalletKeys(
    config: MoneroWalletKeysConfig
  ): Promise<MoneroWalletKeys>;

  export async function connectToDaemonRpc(
    config: MoneroDaemonRpcConfig
  ): Promise<MoneroDaemonRpc>;

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
    async onOutputSent(output: MoneroWallet): void;
  }
}

import {
  MoneroWalletListener,
  MoneroWalletRpc,
  connectToWalletRpc,
} from "monero-ts";

export class Wallet {
  private static instance: MoneroWalletRpc;

  private constructor() {
    return Wallet.init();
  }
  static async init() {
    // sanity check
    const serverWalletFileName = process.env.SERVER_WALLET_FILE_NAME;
    const serverWalletPassword = process.env.SERVER_WALLET_PASSWORD;
    const serverRpcUri = process.env.SERVER_WALLET_RPC_URI;

    if (!serverWalletFileName || !serverWalletPassword)
      throw Error("Missing server secrets");

    // Connect to Wallet RPC
    const walletRpc = await connectToWalletRpc({ uri: serverRpcUri });
    const wallet = await walletRpc.openWallet({
      password: serverWalletPassword,
      path: serverWalletFileName,
    });

    Wallet.instance = wallet;

    Wallet.instance.addListener(
      new (class extends MoneroWalletListener {
        async onSyncProgress(
          height: number,
          startHeight: number,
          endHeight: number,
          percentDone: number,
          message: string,
        ): Promise<void> {
          // logic
          console.log({ height });

          const percentage = Math.floor(percentDone * 100);
          if (percentage === 100) {
            await Wallet.instance.save();
          }
        }
      })(),
    );
    await Wallet.instance.startSyncing();
    console.log("starting sync");

    return wallet;
  }

  static async getInstance(): Promise<MoneroWalletRpc> {
    if (!Wallet.instance) {
      Wallet.instance = await Wallet.init();
    }

    console.log("Got wallet instance", Wallet.instance);
    return Wallet.instance;
  }

  public static async createNewAddress(index: number) {
    const wallet = await Wallet.getInstance();

    return wallet.getSubaddress(0, index);
  }
}

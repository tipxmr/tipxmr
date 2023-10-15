import {
  openWalletFull,
  MoneroWalletFull,
  MoneroRpcConnection,
  MoneroWalletListener,
  createWalletFull,
} from "monero-ts";
import { stagenetNode } from "./xmr";

// import {
//   convertBigIntToXmrFloat,
//   createSyncProgressListener,
//   createOutputReceivedListener,
// } from 'src/lib/xmr'
import { prisma } from "~/lib/prisma";
import path from "path";

export class Wallet {
  private static instance: MoneroWalletFull;

  private constructor() {
    return Wallet.init();
  }
  static async init() {
    // sanity check
    const serverWalletFilePath = process.env.SERVER_WALLET_FILE_PATH;
    const serverWalletPassword = process.env.SERVER_WALLET_PASSWORD;

    if (!serverWalletFilePath || !serverWalletPassword)
      throw Error("Missing server secrets");

    console.log({
      serverWalletFilePath,
      serverWalletPassword,
    });

    // Open the wallet and init the listeners
    const wallet = await openWalletFull({
      ...stagenetNode,

      path: serverWalletFilePath,
      password: serverWalletPassword,
    }).catch((err) => {
      console.error(err);
      throw new Error(
        "Cannot open server wallet, check your .env and monero/[walletFile] setup.",
        err,
      );
    });

    Wallet.instance = wallet;

    wallet.addListener(
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
            await wallet.save();
          }
        }
      })(),
    );
    // await wallet.addListener(syncProgressListener);
    await wallet.sync(20000);
    console.log("starting sync");

    return wallet;
  }

  static async getInstance(): Promise<MoneroWalletFull> {
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

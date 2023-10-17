import { MoneroWalletListener } from "monero-ts";
import { NextApiHandler } from "next";
import { Wallet } from "~/lib/serverWallet";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      const start = performance.now();
      const wallet = await Wallet.getInstance();
      const addr = (await wallet.createSubaddress(0)).getAddress();

      await wallet.sync(
        new (class extends MoneroWalletListener {
          async onSyncProgress(
            height: number,
            startHeight: number,
            endHeight: number,
            percentDone: number,
            message: string,
          ) {
            console.log({ height, startHeight });
            // feed a progress bar?
          }
        })() as MoneroWalletListener,
      );
      const listeners = wallet.getListeners();

      res.status(201).json({
        message: "Wallet initializing",
        time: new Date(),
        newAddr: `${addr.slice(0, 5)}...${addr.slice(
          addr.length - 5,
          addr.length,
        )}`,
        listeners: JSON.stringify(listeners),
        timeElapsed: performance.now() - start,
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

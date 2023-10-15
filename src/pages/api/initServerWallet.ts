import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Wallet } from "~/lib/serverWallet";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      const start = performance.now();
      await Wallet.getInstance();
      const addr = await Wallet.createNewAddress(1);

      res.status(201).json({
        message: "Wallet initializing",
        time: new Date(),
        newAddr: addr.getAddress().slice(0, 5).at(0),
        timeElapsed: performance.now() - start,
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

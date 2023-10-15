import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Wallet } from "~/lib/serverWallet";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await Wallet.getInstance();
      const addr = await Wallet.createNewAddress(1);

      res.status(201).json({
        message: "Wallet initializing",
        time: new Date(),
        newAddr: addr.getAddress(),
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

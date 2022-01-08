import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Wallet } from "../../data/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    walletGetHandler(req, res);
  } else if (req.method === "PUT") {
    walletPutHandler(req, res);
  } else {
    res.status(404).end();
  }
}

const walletGetHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (id) {
    prisma?.wallet
      .findUnique({
        where: {
          streamer: id.slice(0, 11),
        },
      })
      .then((wallet) => {
        res.status(200).json(wallet);
      });
  }
};

const walletPutHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { wallet } = req.body;
  if (wallet) {
    prisma?.wallet
      .update({
        where: {
          streamer: wallet.id,
        },
        data: {
          streamer: wallet.id,
          restoreHeight: wallet.restoreHeight,
          lastSyncHeight: wallet.lastSyncHeight,
        },
      })
      .then((wallet) => {
        res.status(200).json(wallet);
      });
  }
};

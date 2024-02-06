/* This file handles the logic for the monero wallet running on the
 * server and checking the income of transactions to pay invoices */
import {
  connectToWalletRpc,
  type MoneroWalletRpc,
  MoneroWalletListener,
  type MoneroOutputWallet,
} from "monero-ts";
import { db } from "~/server/db";
import { env } from "~/env";
import { type Invoice } from "@prisma/client";

async function initWallet() {
  const walletRpc = await connectToWalletRpc({
    uri: env.MONERO_RPC_URI,
    rejectUnauthorized: false,
  });

  // TODO set onBalanceReceived listener and credit the appropriate account

  const wallet = await walletRpc.openWallet({
    path: env.MONERO_WALLET_PATH,
    password: env.MONERO_WALLET_PW,
  });
  await wallet.addListener(
    new (class extends MoneroWalletListener {
      async onOutputReceived(output: MoneroOutputWallet) {
        // --- Parse the transaction
        const targetAddressIndex = output.getSubaddressIndex();
        const subaddress = (
          await wallet.getSubaddress(0, targetAddressIndex)
        ).getAddress();
        const amount = convertBigIntToXmrFloat(output.getAmount());
        const transactionKey = output.getKeyImage().getHex();
        const isConfirmed = output.getTx().getIsConfirmed();
        const isLocked = output.getTx().getIsLocked();

        // --- Existing Tx or new?
        const existingTx = await db.transaction.findFirst({
          where: { transactionKey },
        });

        const relatedFeedItem = await db.invoice.findFirst({
          where: { subaddress },
        });

        await db.transaction.upsert({
          where: { transactionKey: transactionKey },
          update: { isConfirmed, isUnlocked: !isLocked },
          create: {
            transactionKey: transactionKey,
            isConfirmed,
            isUnlocked: !isLocked,
            amount: Number(amount),
          },
        });

        if (existingTx) return;
        await updateInvoiceWithTx(relatedFeedItem, amount);

        // --- Finishing up
        await wallet.save();
      }
    })(),
  );
  return wallet;
}

async function updateInvoiceWithTx(invoice: Invoice | null, amount: number) {
  // new tx was received, update the amount of the invoice + unlocking logic
  if (!invoice) return;

  const newAmount = (invoice?.payedAmount ?? 0) + amount;

  const isPayed =
    !!invoice?.expectedAmount && invoice?.expectedAmount <= newAmount;

  await db.invoice.update({
    where: { id: invoice.id },
    data: {
      paidStatus: isPayed ? "paid" : "unpaid",
      payedAmount: newAmount,
    },
  });

  // revalidatePath("/"); // not sure if we need this here at all
}

export async function getFreshSubaddress(
  moneroWallet: MoneroWalletRpc,
): Promise<string> {
  const { currentSubaddressIndex } = await db.serverXmrSetting.findFirstOrThrow(
    {
      where: { id: 1 },
    },
  );

  const newSubaddress = moneroWallet.getSubaddress(0, currentSubaddressIndex);
  const newIndex = currentSubaddressIndex + 1;

  await db.serverXmrSetting.update({
    where: { id: 1 },
    data: {
      currentSubaddressIndex: newIndex,
    },
  });

  return (await newSubaddress).getAddress();
}

export function convertBigIntToXmrFloat(amount: bigint) {
  return parseFloat((Number(amount) / 1000000000000).toFixed(12));
}

const globalForXmrWallet = globalThis as unknown as {
  xmrWallet: MoneroWalletRpc;
};

export function calculateDeltaToGoal(amount = 0, goal: number | null) {
  if (!goal) return 0;
  return parseFloat(
    ((goal * 1000000000000 - amount * 1000000000000) / 1000000000000).toFixed(
      12,
    ),
  );
}

// helper for develop, see https://github.com/woodser/monero-ts/issues/181
export const xmrWallet = globalForXmrWallet.xmrWallet ?? (await initWallet());

if (env.NODE_ENV !== "production") globalForXmrWallet.xmrWallet = xmrWallet;
export default xmrWallet;

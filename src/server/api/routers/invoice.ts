import { MoneroWalletRpc } from "monero-ts";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const invoiceRouter = createTRPCRouter({
  createBlank: protectedProcedure.mutation(async ({ ctx }) => {
    const data = await createNewInvoice(ctx.serverWallet, ctx.session.user.id);
    const invoice = await ctx.db.invoice.create({
      data,
    });
    revalidatePath("/dashboard");
    return invoice;
  }),
  confirm: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.invoice.update({
        where: { id: input.id, streamerId: ctx.session.user.id },
        data: {},
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.invoice.findMany({
      where: { streamerId: ctx.session?.user?.id },
    });
  }),
  mostRecent: protectedProcedure.query(async ({ ctx }) => {
    const existingInvoice = await ctx.db.invoice.findFirst({
      where: {
        streamerId: ctx.session?.user?.id,
      },
      orderBy: { endDate: "desc" },
      take: 1,
      include: {
        transaction: true,
      },
    });

    // Streamer already has an invoice
    if (existingInvoice) return existingInvoice;

    // Create new invoice for streamer
    const data = await createNewInvoice(ctx.serverWallet, ctx.session.user.id);
    console.log({ data });
    const invoice = await ctx.db.invoice.create({
      data,
    });
    return invoice;
  }),
});

async function createNewInvoice(wallet: MoneroWalletRpc, userId: string) {
  const subaddress = (await wallet.createSubaddress(0)).getAddress();

  return {
    streamerId: userId,
    subaddress,
  };
}

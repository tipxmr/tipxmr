import { MoneroWalletRpc } from "monero-ts";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PRICE_BASIC, PRICE_PREMIUM } from "~/config/constants";
import { add } from "date-fns";

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
  userConfirm: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        planType: z.enum(["basic", "premium"]),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { planType } = input;

      const expectedAmount = planType === "basic" ? PRICE_BASIC : PRICE_PREMIUM;

      const startDate = new Date();
      const endDate = add(startDate, { months: 1 });

      return ctx.db.invoice.update({
        where: { id: input.id, streamerId: ctx.session.user.id },
        data: {
          planType,
          startDate,
          endDate,
          expectedAmount,
        },
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

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import xmrWallet from "~/server/xmrWallet";

export const invoiceRouter = createTRPCRouter({
  // TODO protect these procedures!
  create: publicProcedure
    .input(
      z.object({
        streamerId: z.string(),
        planType: z.enum(["basic", "premium"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // FIXME not working
      // const subaddress = (await xmrWallet.createSubaddress(0)).getAddress();
      // console.log({ subaddress });

      const data = {
        ...input,
        // subaddress,
      };
      return ctx.db.invoice.create({
        data,
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        streamerId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.invoice.findMany({
        where: { streamerId: input.streamerId },
      });
    }),
  mostRecentInvoice: publicProcedure
    .input(
      z.object({
        streamerId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.invoice.findFirst({
        where: {
          streamerId: input.streamerId,
        },
        orderBy: { endDate: "desc" },
        take: 1,
        include: {
          transaction: true,
        },
      });
    }),
});

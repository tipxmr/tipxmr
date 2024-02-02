import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import xmrWallet, { getFreshSubaddress } from "~/server/xmrWallet";

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
      const subaddress = await getFreshSubaddress(xmrWallet);

      const data = {
        ...input,
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

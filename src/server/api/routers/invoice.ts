import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
      const subaddress = (
        await ctx.serverWallet.createSubaddress(0)
      ).getAddress();

      const data = {
        ...input,
        subaddress,
      };
      const invoice = await ctx.db.invoice.create({
        data,
      });
      revalidatePath("/dashboard");
      return invoice;
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.invoice.findMany({
      where: { streamerId: ctx.session?.user?.id },
    });
  }),
  mostRecentInvoice: protectedProcedure.query(({ ctx }) => {
    return ctx.db.invoice.findFirst({
      where: {
        streamerId: ctx.session?.user?.id,
      },
      orderBy: { endDate: "desc" },
      take: 1,
      include: {
        transaction: true,
      },
    });
  }),
});

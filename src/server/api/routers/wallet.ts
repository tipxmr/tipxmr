import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const walletRouter = createTRPCRouter({
  getLastHeight: protectedProcedure.query(({ ctx }) => {
    return ctx.db.wallet.findUnique({
      where: {
        streamer: ctx.session.user.id,
      },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        lastSyncHeight: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.wallet.upsert({
        where: { streamer: ctx.session.user.id },
        update: input,
        create: {
          ...input,
          streamer: ctx.session.user.id,
        },
      });
    }),
});

import { z } from "zod";
import { UpdateStream } from "~/schemas";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const streamRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.stream.delete({ where: { streamerId: input.id } });
    }),
  update: protectedProcedure.input(UpdateStream).mutation(({ ctx, input }) => {
    const { url, platform, language } = input;
    return ctx.db.stream.update({
      where: { streamerId: ctx.session.user.id },
      data: { url, platform, language },
    });
  }),
});

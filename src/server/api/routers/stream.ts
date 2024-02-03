import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const streamRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.stream.delete({ where: { id: input.id } });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        url: z
          .string()
          .max(100, { message: "Maximum 100 characters allowed" })
          .optional(),
        platform: z
          .enum(["youtube", "twitch", "chaturbate", "selfhosted"])
          .optional(),
        language: z.enum(["english", "german", "french", "italian"]).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { url, platform, language } = input;
      return ctx.db.stream.update({
        where: { streamerId: input.id },
        data: { url, platform, language },
      });
    }),
});

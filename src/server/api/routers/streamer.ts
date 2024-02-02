import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const streamerRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.streamer.findMany();
  }),
  getByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.streamer.findUniqueOrThrow({ where: { name: input.name } });
    }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.streamer.findUniqueOrThrow({ where: { id: input.id } });
    }),
  // TODO this probably should not be left unsecured
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.streamer.delete({ where: { name: input.id } });
    }),
  // Registration
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        alias: z.string(),
        id: z.string().length(12),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.streamer.create({
        data: input,
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        alias: z.string(),
        socket: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.streamer.update({
        where: { id: input.id },
        data: { name: input.name, alias: input.alias, socket: input.socket },
      });
    }),
  // TODO should this be protected?
});

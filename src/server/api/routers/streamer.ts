import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const streamerRouter = createTRPCRouter({
  getAllStreamers: publicProcedure.query(({ ctx }) => {
    return ctx.db.streamer.findMany();
  }),
  getStreamerByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.streamer.findUniqueOrThrow({ where: { name: input.name } });
    }),

  getStreamerById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.streamer.findUniqueOrThrow({ where: { name: input.id } });
    }),
  // TODO this probably should not be left unsecured
  deleteStreamer: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.streamer.delete({ where: { name: input.id } });
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), alias: z.string(), id: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.streamer.create({
        data: input,
      });
    }),
  updateStreamer: protectedProcedure
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
});

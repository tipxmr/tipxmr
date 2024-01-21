import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const donationRouter = createTRPCRouter({
  getDonationHistory: protectedProcedure.query(async ({ ctx }) => {
    const [donations, total] = await ctx.db.$transaction([
      ctx.db.donation.findMany({
        orderBy: [{ timestamp: "desc" }],
        where: {
          streamer: String(ctx.session.user.id),
        },
        // TODO implement skip and limit if necessary
        // take: limit,
        // skip: index,
      }),
      ctx.db.donation.count({
        where: {
          streamer: String(ctx.session.user.id),
        },
      }),
    ]);

    return { donations, total };
  }),
});

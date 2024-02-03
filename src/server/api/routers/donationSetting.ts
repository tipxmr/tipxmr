import { UpdateDonationSetting } from "~/schemas";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dontationSettingRouter = createTRPCRouter({
  getDonationSetting: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.donationSetting?.findUnique({
      where: {
        streamer: ctx.session.user?.id,
      },
    });
  }),

  update: protectedProcedure
    .input(UpdateDonationSetting)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.donationSetting.update({
        where: {
          streamer: ctx.session.user?.id,
        },
        data: input,
      });
    }),
});

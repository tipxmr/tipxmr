import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const serverWalletRouter = createTRPCRouter({
  getCurrentBlockHeight: publicProcedure.query(({ ctx }) => {
    return ctx.serverWallet.getHeight();
  }),
});

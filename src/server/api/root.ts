import { createTRPCRouter } from "~/server/api/trpc";
import { streamerRouter } from "~/server/api/routers/streamer";
import { donationRouter } from "~/server/api/routers/donation";
import { dontationSettingRouter } from "~/server/api/routers/donationSetting";
import { invoiceRouter } from "~/server/api/routers/invoice";
import { streamRouter } from "~/server/api/routers/stream";
import { walletRouter } from "~/server/api/routers/wallet";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  streamer: streamerRouter,
  stream: streamRouter,
  donation: donationRouter,
  donationSetting: dontationSettingRouter,
  invoice: invoiceRouter,
  wallet: walletRouter,
  // TODO impolement these routers if applicable
  // donate: donateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

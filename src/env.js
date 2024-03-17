import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL",
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    DOMAIN: z.string(),
    WEBSOCKET_PORT: z.coerce.number().default(3001),
    CORS_ORIGIN: z.string(),
    MONERO_RPC_URI: z.string(),
    MONERO_WALLET_PATH: z.string(),
    MONERO_WALLET_PW: z.string(),
    MONERO_WALLET_SEED: z.string(),
    MONERO_DAEMON_URL: z.string().default("http://localhost:38081"),
    MONERO_DAEMON_USER: z.string().default("tipxmr"),
    MONERO_DAEMON_PASSWORD: z.string().default("tipxmr"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),

    NEXT_PUBLIC_MONERO_DAEMON_URL: z.string().default("http://localhost:38081"),
    NEXT_PUBLIC_MONERO_DAEMON_USER: z.string().default("tipxmr"),
    NEXT_PUBLIC_MONERO_DAEMON_PASSWORD: z.string().default("tipxmr"),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    WEBSOCKET_PORT: process.env.WEBSOCKET_PORT,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DOMAIN: process.env.DOMAIN,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    MONERO_RPC_URI: process.env.MONERO_RPC_URI,
    MONERO_WALLET_PATH: process.env.MONERO_WALLET_PATH,
    MONERO_WALLET_PW: process.env.MONERO_WALLET_PW,
    MONERO_WALLET_SEED: process.env.MONERO_WALLET_SEED,
    MONERO_DAEMON_URL: process.env.MONERO_DAEMON_URL,
    MONERO_DAEMON_USER: process.env.MONERO_DAEMON_USER,
    MONERO_DAEMON_PASSWORD: process.env.MONERO_DAEMON_PASSWORD,

    NEXT_PUBLIC_MONERO_DAEMON_URL: process.env.MONERO_DAEMON_URL,
    NEXT_PUBLIC_MONERO_DAEMON_USER: process.env.MONERO_DAEMON_USER,
    NEXT_PUBLIC_MONERO_DAEMON_PASSWORD: process.env.MONERO_DAEMON_PASSWORD,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

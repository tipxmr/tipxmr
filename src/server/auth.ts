import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Invoice, Streamer } from "@prisma/client";

import { db } from "~/server/db";
import { type DefaultSession } from "next-auth";
import { env } from "~/env";
import { api } from "~/trpc/server";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  // interface Session {
  //   user?: Streamer;
  // }

  interface Session extends DefaultSession {
    user?: Streamer;
    invoice?: Invoice;
  }

  interface User {
    id: string;
    // accountNumber: string;
    // isValid: boolean;
    // validUntil?: Date;
    // moneroSubaddress: string;
    // ...other properties
    // role: UserRole;
  }
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  jwt: {
    secret: env.NEXTAUTH_SECRET,
    maxAge: 3000,
  },
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        // this will only evaluate on first login
        token.accessToken = account.access_token;
        token.user = user;

        const mostRecentInvoice = await api.invoice.mostRecentInvoice.query({
          streamerId: user.id,
        });

        if (!mostRecentInvoice) {
          // new streamer, does not have an invoice yet
        }

        token.invoice = mostRecentInvoice;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as Streamer;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        identifierHash: { label: "Identifier Hash", type: "text" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = await api.streamer.getById.query({
          id: credentials?.identifierHash ?? "",
        });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

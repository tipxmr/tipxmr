import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Streamer } from "@prisma/client";

import { db } from "~/server/db";
import { DefaultSession } from "next-auth";

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
    user?: Streamer & DefaultSession["user"];
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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      console.log(token, user);
      if (user) {
        token.user = user;
      }

      return token;
    },
    session(args) {
      console.log("in session: ", { args });

      if (args.token.user) {
        args.session.user = args.token.user as Streamer;
      }

      return args.session;
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
        console.log({ credentials });
        // Add logic here to look up the user from the credentials supplied
        const user = await db?.streamer?.findUnique({
          where: {
            id: credentials?.identifierHash,
          },
        });

        console.log({ user });

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

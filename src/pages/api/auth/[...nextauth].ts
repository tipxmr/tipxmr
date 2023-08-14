import type { Streamer } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "~/lib/prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      console.log(
        "🚀 ~ file: [...nextauth].ts:15 ~ jwt ~ token, user",
        token,
        user,
      );
      if (user) {
        token.user = user;
      }

      return token;
    },
    session({ session, user, token }) {
      console.log(
        "🚀 ~ file: [...nextauth].ts:27 ~ session ~ session, user, token",
        session,
        user,
        token,
      );

      if (token.user) {
        session.user = token.user as Streamer;
      }

      return session;
    },
  },
  // Configure one or more authentication providers
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
        console.log(
          "🚀 ~ file: [...nextauth].ts:54 ~ authorize ~ credentials",
          credentials,
        );
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma?.streamer.findUnique({
          where: {
            id: credentials?.identifierHash,
          },
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

export default NextAuth(authOptions);

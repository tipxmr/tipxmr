import { Streamer } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user?: Streamer;
  }
}

import { Streamer } from "@prisma/client";
import type { IronSessionOptions } from "iron-session";

export const ironOptions: IronSessionOptions = {
  password: "process.env.SECRET_COOKIE_PASSWORD123",
  cookieName: "tipxmr_ident",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: PartialStreamer;
    id: Streamer["id"];
  }
}

export type PartialStreamer = Partial<Streamer> & { isLoggedIn: boolean };

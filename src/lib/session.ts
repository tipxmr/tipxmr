// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import type { User } from "~/pages/api/user";

export const sessionOptions: IronSessionOptions = {
  // password: process.env.SECRET_COOKIE_PASSWORD as string,
  // FIXME: this is a temporary workaround for missing env variables
  password: "process.env.SECRET_COOKIE_PASSWORD",
  cookieName: "iron-session/examples/next.js",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

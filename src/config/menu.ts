export const SHOW_STATE = {
  LOGGED_IN: "loggedIn",
  ALWAYS: "always",
  LOGGED_OUT: "loggedOut",
} as const;

export const MENU_ITEMS = [
  {
    href: "/login",
    title: "Login",
    description: "For streamers: Log into your existing TipXMR account.",
    showState: SHOW_STATE.LOGGED_OUT,
  },
  {
    href: "/registration",
    title: "Sign up",
    description:
      "For streamers: Join the TipXMR platform and start monero-tizing your streams in minutes!",
    showState: SHOW_STATE.LOGGED_OUT,
  },
  {
    href: "/streams",
    title: "Streams",
    description:
      "See who is streaming right now and send them a tip in Monero via TipXMR!",
    showState: SHOW_STATE.ALWAYS,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    description: "Go to the central point of control for your TipXMR account",
    showState: SHOW_STATE.LOGGED_IN,
  },
];

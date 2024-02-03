"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

import LogoutButton from "~/components/LogoutButton";
import { MenuIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Streamer } from "@prisma/client";
import Link from "next/link";

interface Props {
  user?: Pick<Streamer, "alias" | "id">;
}

const SHOW_STATE = {
  LOGGED_IN: "loggedIn",
  ALWAYS: "always",
  LOGGED_OUT: "loggedOut",
} as const;

const MENU_ITEMS = [
  {
    href: "/login",
    title: "Login",
    description: "For streamers: Log into your existing TipXMR account.",
    showState: SHOW_STATE.LOGGED_OUT,
  },
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
const CustomNavigationMenu = ({ user }: Props) => {
  return (
    <NavigationMenu className="md:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <MenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="p-6  lg:grid-cols-1">
              {/* Show always menu items */}
              {MENU_ITEMS.filter(
                (item) => item.showState === SHOW_STATE.ALWAYS,
              ).map(({ href, title, description }) => (
                <ListItem href={href} title={title}>
                  {description}
                </ListItem>
              ))}
              {/* Logged Out Menu Items */}
              {!user?.id ? (
                MENU_ITEMS.filter(
                  (item) => item.showState === SHOW_STATE.LOGGED_OUT,
                ).map(({ href, title, description }) => (
                  <ListItem key={title} href={href} title={title}>
                    {description}
                  </ListItem>
                ))
              ) : (
                <>
                  {/* Logged in Menu Items */}
                  {MENU_ITEMS.filter(
                    (item) => item.showState === SHOW_STATE.LOGGED_IN,
                  ).map(({ href, title, description }) => (
                    <ListItem key={title} href={href} title={title}>
                      {description}
                    </ListItem>
                  ))}
                  <LogoutButton />
                </>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default CustomNavigationMenu;

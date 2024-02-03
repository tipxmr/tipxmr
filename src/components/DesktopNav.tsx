"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

import LogoutButton from "~/components/LogoutButton";
import { type Streamer } from "@prisma/client";
import Link from "next/link";
import { MENU_ITEMS, SHOW_STATE } from "~/config/menu";

interface Props {
  user?: Pick<Streamer, "alias" | "id">;
}

const DesktopNav = ({ user }: Props) => {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {/* Show always menu items */}
        {MENU_ITEMS.filter((item) => item.showState === SHOW_STATE.ALWAYS).map(
          ({ href, title }) => (
            <NavigationMenuItem key={href}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ),
        )}

        {/* Logged Out Menu Items */}
        {!user?.id ? (
          MENU_ITEMS.filter(
            (item) => item.showState === SHOW_STATE.LOGGED_OUT,
          ).map(({ href, title }) => (
            <NavigationMenuItem key={href}>
              <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))
        ) : (
          <>
            {/* Logged in Menu Items */}
            {MENU_ITEMS.filter(
              (item) => item.showState === SHOW_STATE.LOGGED_IN,
            ).map(({ href, title }) => (
              <NavigationMenuItem key={href}>
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <LogoutButton />
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default DesktopNav;

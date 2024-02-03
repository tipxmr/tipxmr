"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

import LogoutButton from "~/components/LogoutButton";
import { MenuIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Streamer } from "@prisma/client";
import { MENU_ITEMS, SHOW_STATE } from "~/config/menu";

interface Props {
  user?: Pick<Streamer, "alias" | "id">;
}

const MobileNav = ({ user }: Props) => {
  return (
    <NavigationMenu className="lg:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <MenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[200px] p-6 lg:grid-cols-1">
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

export default MobileNav;

"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Logo from "../img/logo.png";
import Image from "next/image";
import Link from "next/link";
import fetchJson from "~/lib/fetchJson";
import useUser from "~/lib/useUser";
import { User } from "~/lib/config";
import { useEffect, useState } from "react";
import clsx from "clsx";

type pages = { page: string; href: string }[];
const default_pages: pages = [
  { page: "Overview", href: "/overview" },
  { page: "Donate", href: "/donate" },
];

const logged_out_pages: pages = [
  ...default_pages,
  { page: "Register", href: "/register" },
  { page: "Login", href: "/login" },
];

const logged_in_pages: pages = [
  ...default_pages,
  { page: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const { user: session, mutate: mutateUser } = useUser();
  const [menuItems, setMenuItems] = useState(logged_out_pages);

  useEffect(() => {
    if (!session?.isLoggedIn) {
      setMenuItems(logged_out_pages);
    } else {
      setMenuItems(logged_in_pages);
    }
  }, [session, setMenuItems]);

  return (
    <NavigationMenu.Root className="p-2 mx-auto">
      <NavigationMenu.List className="flex flex-row gap-4 justify-center text-lg flex-wrap">
        {menuItems.map(({ page, href }) => (
          <Link key={page} href={href}>
            <NavigationMenu.Item
              className={clsx(
                "border-gray-700 border-solid border-2 py-2 px-4 rounded-md hover:bg-gray-700 hover:text-orange-400 w-32 text-center",
                window.location.pathname === href && "bg-orange-400"
              )}
            >
              {page}
            </NavigationMenu.Item>
          </Link>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Navbar;

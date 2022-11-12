"use client";

import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Logo from "../img/logo.png";
import Image from "next/image";
import Link from "next/link";
import fetchJson from "~/lib/fetchJson";
import useUser from "~/lib/useUser";
import { User } from "~/lib/config";
import { useEffect, useState } from "react";
import clsx from "clsx";

type Pages = { page: string; href: string }[];

const default_pages: Pages = [
  { page: "Overview", href: "/overview" },
  { page: "Donate", href: "/donate" },
];

const logged_out_pages: Pages = [
  ...default_pages,
  { page: "Register", href: "/register" },
  { page: "Login", href: "/login" },
];

const logged_in_pages: Pages = [
  ...default_pages,
  { page: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const { user: session, mutate: mutateUser } = useUser();
  const [menuItems, setMenuItems] = useState(logged_out_pages);
  const pathname = usePathname();

  useEffect(() => {
    if (!session?.isLoggedIn) {
      setMenuItems(logged_out_pages);
    } else {
      setMenuItems(logged_in_pages);
    }
  }, [session, setMenuItems]);

  //const menuItems2 = session?.isLoggedIn ? logged_in_pages : logged_out_pages;

  return (
    <NavigationMenu.Root className="mx-auto p-2">
      <NavigationMenu.List className="flex flex-row flex-wrap justify-center gap-4 text-lg">
        {menuItems.map(({ page, href }) => (
          <Link key={page} href={href}>
            <NavigationMenu.Item
              className={clsx(
                "w-32 rounded-md border-2 border-solid border-gray-700 px-4 py-2 text-center hover:bg-gray-700 hover:text-orange-400",
                pathname === href && "bg-orange-400"
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

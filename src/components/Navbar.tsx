"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import useUser from "~/lib/useUser";

import Logo from "../img/logo.png";

type Pages = { page: string; href: string }[];

const default_pages: Pages = [
  { page: "Livestreams", href: "/overview" },
  { page: "Donate", href: "/donate" },
];

const logged_out_pages: Pages = [
  ...default_pages,
  { page: "Register", href: "/registration" },
  { page: "Login", href: "/login" },
];

const logged_in_pages: Pages = [
  ...default_pages,
  { page: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const { user: session } = useUser();
  const pathname = usePathname();
  const menuItems = session?.isLoggedIn ? logged_in_pages : logged_out_pages;

  return (
    <div className="mt-4 flex flex-col items-center justify-around md:flex-row ">
      <NavigationMenu.Root className="start relative flex flex-row items-center p-2">
        <NavigationMenu.List className="flex list-none flex-row flex-wrap justify-center gap-4 rounded-md text-lg">
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

      <Link href="/" className="mx-4">
        <Image src={Logo} alt="TipXMR Logo" width={250} />
      </Link>
    </div>
  );
};

export default Navbar;

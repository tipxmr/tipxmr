"use client";

import { CaretDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { User } from "~/lib/config";
import fetchJson from "~/lib/fetchJson";
import useUser from "~/lib/useUser";

import Logo from "../img/logo.png";

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
  const pathname = usePathname();
  const menuItems = session?.isLoggedIn ? logged_in_pages : logged_out_pages;

  const signOut = async () => {
    await fetchJson<User>("/api/logout", {
      method: "POST",
    });
    mutateUser(undefined);
  };

  return (
    <NavigationMenu.Root className="flex flex-row justify-between p-2">
      <Link href="/">
        <Image src={Logo} alt="TipXMR Logo" width={250} />
      </Link>

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

      <NavigationMenu.List>
        <NavigationMenu.Item className="w-36 rounded-md border-2 border-solid border-gray-700 px-4 py-2 text-center hover:bg-gray-700 hover:text-orange-400">
          <NavigationMenu.Trigger className="flex flex-row items-center">
            My Account <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul className="cursor-pointer">
              {session?.isLoggedIn && (
                <li>
                  <span onClick={() => signOut()}>Logout</span>
                </li>
              )}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Navbar;

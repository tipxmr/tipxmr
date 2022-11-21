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
  { page: "Register", href: "/registration" },
  { page: "Login", href: "/login" },
];

const logged_in_pages: Pages = [
  ...default_pages,
  { page: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const { user: session, mutate: mutateUser } = useUser({
    redirectTo: "/login",
  });
  const pathname = usePathname();
  const menuItems = session?.isLoggedIn ? logged_in_pages : logged_out_pages;

  const signOut = async () => {
    await fetchJson<User>("/api/logout", {
      method: "POST",
    });
    mutateUser(undefined);
  };

  return (
    <NavigationMenu.Root className="relative flex flex-row justify-between p-2">
      <Link href="/">
        <Image src={Logo} alt="TipXMR Logo" width={250} />
      </Link>

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

      <NavigationMenu.List className="flex list-none justify-center text-lg">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex flex-row items-center justify-between gap-1 rounded-md border-2 border-solid border-gray-700 px-4 py-2 text-center hover:bg-gray-700 hover:text-orange-400">
            My Account{" "}
            {session?.isLoggedIn && (
              <CaretDownIcon className="relative" aria-hidden />
            )}
          </NavigationMenu.Trigger>
          {session?.isLoggedIn && (
            <NavigationMenu.Content className="visible absolute mt-2 w-full rounded-md border-2 border-solid border-gray-700 ease-in hover:bg-gray-700 hover:text-orange-400">
              <ul className="grid cursor-pointer list-none">
                {session?.isLoggedIn && (
                  <li className="block select-none p-2 outline-none">
                    <p className="font-medium" onClick={() => signOut()}>
                      Logout
                    </p>
                  </li>
                )}
              </ul>
            </NavigationMenu.Content>
          )}
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Navbar;
